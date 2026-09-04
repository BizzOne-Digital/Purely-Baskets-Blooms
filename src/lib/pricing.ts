import type {
  ICoupon,
  IProduct,
  ISiteSettings,
  PricingInput,
  PricingResult,
} from "@/types";
import type { CheckoutInput } from "@/validations/order";
import { connectDB } from "@/lib/mongodb";
import Coupon from "@/models/Coupon";
import Product from "@/models/Product";
import { getEffectiveUnitPrice, roundCurrency } from "@/lib/utils";

export interface CouponValidationResult {
  valid: boolean;
  coupon?: ICoupon;
  message?: string;
  discountAmount?: number;
}

export function calculateLineTotal(
  unitPrice: number,
  quantity: number,
  sizePriceModifier = 0,
  addOns: { price: number; quantity: number }[] = []
): number {
  const addOnTotal = addOns.reduce(
    (sum, addOn) => sum + addOn.price * addOn.quantity,
    0
  );
  const itemTotal = (unitPrice + sizePriceModifier) * quantity + addOnTotal;
  return roundCurrency(itemTotal);
}

export function getProductEffectivePrice(product: Pick<
  IProduct,
  "basePrice" | "salePrice" | "saleStartDate" | "saleEndDate" | "priceType"
>): number | null {
  if (product.priceType === "quote") return null;
  return getEffectiveUnitPrice(
    product.basePrice,
    product.salePrice,
    product.saleStartDate,
    product.saleEndDate
  );
}

export function validateCoupon(
  coupon: ICoupon | null | undefined,
  subtotal: number,
  customerEmail?: string,
  options?: {
    productIds?: string[];
    categoryIds?: string[];
    customerUsageCount?: number;
  }
): CouponValidationResult {
  if (!coupon) {
    return { valid: false, message: "Invalid coupon code" };
  }

  const now = new Date();

  if (!coupon.isActive) {
    return { valid: false, message: "This coupon is no longer active" };
  }

  if (now < new Date(coupon.startDate)) {
    return { valid: false, message: "This coupon is not yet valid" };
  }

  if (now > new Date(coupon.expiryDate)) {
    return { valid: false, message: "This coupon has expired" };
  }

  if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
    return { valid: false, message: "This coupon has reached its usage limit" };
  }

  if (
    coupon.perCustomerLimit &&
    options?.customerUsageCount !== undefined &&
    options.customerUsageCount >= coupon.perCustomerLimit
  ) {
    return {
      valid: false,
      message: "You have already used this coupon the maximum number of times",
    };
  }

  if (coupon.minimumSpend && subtotal < coupon.minimumSpend) {
    return {
      valid: false,
      message: `Minimum spend of $${coupon.minimumSpend.toFixed(2)} required`,
    };
  }

  if (coupon.applicableProducts.length > 0 && options?.productIds) {
    const applicable = coupon.applicableProducts.map(String);
    const hasMatch = options.productIds.some((id) => applicable.includes(id));
    if (!hasMatch) {
      return {
        valid: false,
        message: "This coupon does not apply to items in your cart",
      };
    }
  }

  if (coupon.applicableCategories.length > 0 && options?.categoryIds) {
    const applicable = coupon.applicableCategories.map(String);
    const hasMatch = options.categoryIds.some((id) => applicable.includes(id));
    if (!hasMatch) {
      return {
        valid: false,
        message: "This coupon does not apply to items in your cart",
      };
    }
  }

  const discountAmount = calculateCouponDiscount(coupon, subtotal);

  return {
    valid: true,
    coupon,
    discountAmount,
    message: "Coupon applied successfully",
  };
}

export function calculateCouponDiscount(
  coupon: Pick<ICoupon, "discountType" | "discountValue" | "maximumDiscount">,
  subtotal: number,
  deliveryCharge = 0
): number {
  let discount = 0;

  switch (coupon.discountType) {
    case "percentage":
      discount = subtotal * (coupon.discountValue / 100);
      break;
    case "fixed":
      discount = coupon.discountValue;
      break;
    case "free_delivery":
      discount = deliveryCharge;
      break;
    default:
      discount = 0;
  }

  if (coupon.maximumDiscount && coupon.discountType === "percentage") {
    discount = Math.min(discount, coupon.maximumDiscount);
  }

  discount = Math.min(discount, subtotal + deliveryCharge);

  return roundCurrency(Math.max(0, discount));
}

export function calculateOrderPricing(
  input: PricingInput,
  coupon?: ICoupon | null
): PricingResult {
  const deliveryCharge = input.deliveryCharge ?? 0;
  const taxRate = input.taxRate ?? 0;

  const lineTotals = input.items.map((item) =>
    calculateLineTotal(
      item.unitPrice,
      item.quantity,
      item.sizePriceModifier ?? 0,
      item.selectedAddOns ?? []
    )
  );

  const subtotal = roundCurrency(
    lineTotals.reduce((sum, total) => sum + total, 0)
  );

  let discountAmount = 0;
  let couponApplied = false;
  let couponMessage: string | undefined;
  let couponCode: string | undefined;
  let couponId: string | undefined;

  if (coupon && input.couponCode) {
    const validation = validateCoupon(coupon, subtotal, undefined, {
      productIds: input.items.map((item) => item.productId),
    });

    if (validation.valid && validation.discountAmount !== undefined) {
      discountAmount = validation.discountAmount;
      couponApplied = true;
      couponMessage = validation.message;
      couponCode = coupon.code;
      couponId = String(coupon._id);
    } else {
      couponMessage = validation.message;
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = roundCurrency(taxableAmount * taxRate);
  const total = roundCurrency(
    taxableAmount + deliveryCharge + taxAmount
  );

  return {
    subtotal,
    discountAmount,
    deliveryCharge,
    taxAmount,
    total,
    couponApplied,
    couponCode,
    couponId,
    couponMessage,
    lineTotals,
  };
}

export function isCouponPubliclyVisible(
  coupon: Pick<
    ICoupon,
    "isActive" | "isPublic" | "displayOnWebsite" | "startDate" | "expiryDate"
  >
): boolean {
  if (!coupon.isActive || !coupon.isPublic || !coupon.displayOnWebsite) {
    return false;
  }

  const now = new Date();
  return now >= new Date(coupon.startDate) && now <= new Date(coupon.expiryDate);
}

export interface OrderTotalsResult {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  couponCode?: string;
  couponId?: string;
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
}

export async function calculateOrderTotals(
  checkout: CheckoutInput,
  settings?: ISiteSettings | null
): Promise<OrderTotalsResult> {
  await connectDB();

  const productIds = checkout.items.map((item) => item.productId);
  const products = await Product.find({
    _id: { $in: productIds },
    status: "published",
  }).lean();

  const pricingItems: PricingInput["items"] = [];
  const resultItems: OrderTotalsResult["items"] = [];

  for (const item of checkout.items) {
    const product = products.find(
      (p) => String(p._id) === item.productId
    ) as IProduct | undefined;

    if (!product) {
      throw new Error("One or more products are no longer available");
    }

    const unitPrice = getProductEffectivePrice(product);
    if (unitPrice === null) {
      throw new Error(`Pricing is not available for ${product.name}`);
    }

    const lineTotal = calculateLineTotal(
      unitPrice,
      item.quantity,
      item.sizePriceModifier ?? 0,
      item.selectedAddOns ?? []
    );

    pricingItems.push({
      productId: item.productId,
      unitPrice,
      quantity: item.quantity,
      sizePriceModifier: item.sizePriceModifier ?? 0,
      selectedAddOns: item.selectedAddOns ?? [],
    });

    resultItems.push({
      productId: item.productId,
      name: product.name,
      quantity: item.quantity,
      unitPrice,
      lineTotal,
    });
  }

  const deliveryCharge = settings?.deliveryCharge ?? 0;
  let coupon: ICoupon | null = null;

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
      taxRate: settings?.taxRate ?? 0,
    },
    coupon
  );

  if (checkout.couponCode && !pricing.couponApplied) {
    throw new Error(pricing.couponMessage ?? "Invalid coupon code");
  }

  return {
    subtotal: pricing.subtotal,
    discount: pricing.discountAmount,
    deliveryFee: pricing.deliveryCharge,
    tax: pricing.taxAmount,
    total: pricing.total,
    couponCode: pricing.couponCode,
    couponId: pricing.couponId,
    items: resultItems,
  };
}

export interface CouponOrderValidationResult extends CouponValidationResult {
  coupon?: ICoupon;
}

export async function validateCouponForOrder(
  code: string,
  subtotal: number,
  items?: Array<{ productId: string; categoryId?: string }>,
  customerEmail?: string
): Promise<CouponOrderValidationResult> {
  await connectDB();

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
  }).lean();

  const productIds = items?.map((item) => item.productId) ?? [];
  const categoryIds =
    items?.map((item) => item.categoryId).filter(Boolean) as string[] ?? [];

  let customerUsageCount: number | undefined;
  if (customerEmail && coupon?.perCustomerLimit) {
    const Order = (await import("@/models/Order")).default;
    customerUsageCount = await Order.countDocuments({
      customerEmail: customerEmail.toLowerCase(),
      "pricing.couponCode": coupon.code,
    });
  }

  const result = validateCoupon(coupon, subtotal, customerEmail, {
    productIds,
    categoryIds,
    customerUsageCount,
  });

  return {
    ...result,
    coupon: result.coupon ?? undefined,
  };
}
