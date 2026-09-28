import { connectDB } from '@/lib/mongodb';
import { Order, Product, Coupon, SiteSettings } from '@/models';
import {
  calculateLineTotal,
  calculateOrderPricing,
  getProductEffectivePrice,
} from '@/lib/pricing';
import { generateOrderNumber, parseOrderNumberSequence } from '@/lib/utils';
import type { CheckoutInput } from '@/validations/order';
import type { IProduct, ISiteSettings, OrderLineItem } from '@/types';

export async function getNextOrderNumber(): Promise<string> {
  await connectDB();
  const year = new Date().getFullYear();
  const prefix = `PBB-${year}-`;

  const lastOrder = await Order.findOne({
    orderNumber: { $regex: `^${prefix}` },
  })
    .sort({ orderNumber: -1 })
    .select('orderNumber')
    .lean();

  let sequence = 1;
  if (lastOrder?.orderNumber) {
    const parsed = parseOrderNumberSequence(lastOrder.orderNumber);
    if (parsed) sequence = parsed + 1;
  }

  return generateOrderNumber(sequence, year);
}

export interface CheckoutTotals {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  couponCode?: string;
  couponId?: string;
  items: OrderLineItem[];
}

export async function processCheckoutPricing(
  checkout: CheckoutInput,
  settings?: ISiteSettings | null
): Promise<CheckoutTotals> {
  await connectDB();

  const siteSettings =
    settings ?? (await SiteSettings.findOne().lean()) ?? null;

  const productIds = checkout.items.map((item) => item.productId);
  const products = await Product.find({
    _id: { $in: productIds },
    status: 'published',
  }).lean();

  if (products.length !== checkout.items.length) {
    throw new Error('One or more products are no longer available');
  }

  const orderItems: OrderLineItem[] = [];
  const pricingItems = [];

  for (const item of checkout.items) {
    const product = products.find(
      (p) => String(p._id) === item.productId
    ) as IProduct | undefined;

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.availability === 'out_of_stock') {
      throw new Error(`${product.name} is currently out of stock`);
    }

    if (
      product.stockQuantity != null &&
      product.stockQuantity < item.quantity &&
      product.availability !== 'made_to_order'
    ) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    const serverUnitPrice = getProductEffectivePrice(product);
    if (serverUnitPrice === null) {
      throw new Error(`Pricing is not available for ${product.name}`);
    }

    const lineTotal = calculateLineTotal(
      serverUnitPrice,
      item.quantity,
      item.sizePriceModifier ?? 0,
      item.selectedAddOns ?? []
    );

    orderItems.push({
      productId: product._id,
      slug: product.slug,
      name: product.name,
      imageUrl: product.mainImage.url,
      priceType: product.priceType,
      unitPrice: serverUnitPrice,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      sizePriceModifier: item.sizePriceModifier ?? 0,
      selectedColor: item.selectedColor,
      selectedOptions: item.selectedOptions ?? [],
      selectedAddOns: item.selectedAddOns ?? [],
      lineTotal,
      giftMessage: item.giftMessage,
      recipientName: item.recipientName,
      preferredDeliveryDate: item.preferredDeliveryDate
        ? new Date(item.preferredDeliveryDate)
        : undefined,
    });

    pricingItems.push({
      productId: item.productId,
      unitPrice: serverUnitPrice,
      quantity: item.quantity,
      sizePriceModifier: item.sizePriceModifier ?? 0,
      selectedAddOns: item.selectedAddOns ?? [],
    });
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const deliveryCharge = siteSettings?.deliveryCharge ?? 0;

  let coupon = null;
  if (checkout.couponCode) {
    coupon = await Coupon.findOne({
      code: checkout.couponCode.toUpperCase(),
    }).lean();
  }

  const pricing = calculateOrderPricing(
    {
      items: pricingItems,
      couponCode: checkout.couponCode,
      deliveryCharge,
      taxRate: siteSettings?.taxRate ?? 0,
    },
    coupon
  );

  if (checkout.couponCode && !pricing.couponApplied) {
    throw new Error(pricing.couponMessage ?? 'Invalid coupon code');
  }

  if (siteSettings?.minimumOrder && subtotal < siteSettings.minimumOrder) {
    throw new Error(
      `Minimum order amount is $${siteSettings.minimumOrder.toFixed(2)}`
    );
  }

  return {
    subtotal: pricing.subtotal,
    discount: pricing.discountAmount,
    deliveryFee: pricing.deliveryCharge,
    tax: pricing.taxAmount,
    total: pricing.total,
    couponCode: pricing.couponCode,
    couponId: pricing.couponId,
    items: orderItems,
  };
}

export async function decrementProductStock(
  checkout: CheckoutInput,
  products: Array<Pick<IProduct, '_id' | 'availability' | 'stockQuantity'>>
): Promise<void> {
  for (const item of checkout.items) {
    const product = products.find((p) => String(p._id) === item.productId);
    if (
      product &&
      product.stockQuantity != null &&
      product.availability !== 'made_to_order'
    ) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stockQuantity: -item.quantity },
      });
    }
  }
}
