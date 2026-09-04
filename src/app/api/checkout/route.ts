import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Order, Product } from '@/models';
import { isStripeEnabled, createCheckoutSession } from '@/lib/stripe';
import { sendOrderEmails } from '@/lib/email';
import {
  getClientIdentifier,
  rateLimit,
  createRateLimitResponse,
} from '@/lib/rate-limit';
import { checkoutSchema } from '@/validations/order';
import {
  decrementProductStock,
  getNextOrderNumber,
  processCheckoutPricing,
} from '@/lib/order-checkout';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIdentifier(request.headers);
    const limit = rateLimit(`checkout:${ip}`, {
      limit: 10,
      windowMs: 60_000,
    });

    if (!limit.success) {
      return createRateLimitResponse(limit.retryAfterMs ?? 60_000);
    }

    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const totals = await processCheckoutPricing(parsed.data);
    const orderNumber = await getNextOrderNumber();

    const productIds = parsed.data.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } }).lean();

    const order = await Order.create({
      orderNumber,
      status: 'new',
      paymentStatus:
        parsed.data.paymentMethod === 'stripe' && isStripeEnabled()
          ? 'pending'
          : 'manual_invoice',
      paymentMethod: parsed.data.paymentMethod,
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail,
      customerPhone: parsed.data.customerPhone,
      recipientName: parsed.data.recipientName,
      deliveryAddress: parsed.data.deliveryAddress,
      preferredDeliveryDate: parsed.data.preferredDeliveryDate,
      occasion: parsed.data.occasion,
      giftMessage: parsed.data.giftMessage,
      deliveryInstructions: parsed.data.deliveryInstructions,
      billingAddress: parsed.data.billingAddress,
      items: totals.items,
      pricing: {
        subtotal: totals.subtotal,
        discountAmount: totals.discount,
        deliveryCharge: totals.deliveryFee,
        taxAmount: totals.tax,
        total: totals.total,
        couponCode: totals.couponCode,
        couponId: totals.couponId,
      },
      orderNotes: parsed.data.orderNotes,
    });

    await decrementProductStock(parsed.data, products);

    if (isStripeEnabled() && parsed.data.paymentMethod === 'stripe') {
      const session = await createCheckoutSession({
        order: {
          _id: order._id,
          orderNumber: order.orderNumber,
          customerEmail: order.customerEmail,
          pricing: order.pricing,
          items: order.items,
        },
        successPath: `/order-confirmation/${order.orderNumber}`,
        cancelPath: '/checkout?cancelled=true',
      });

      await Order.findByIdAndUpdate(order._id, {
        stripeSessionId: session.id,
      });

      return NextResponse.json({
        orderId: order._id.toString(),
        orderNumber: order.orderNumber,
        paymentMethod: 'stripe',
        checkoutUrl: session.url,
      });
    }

    try {
      await sendOrderEmails(order);
    } catch (emailError) {
      console.error('Checkout email error:', emailError);
    }

    return NextResponse.json({
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
      paymentMethod: 'manual',
      total: totals.total,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Checkout failed. Please try again.',
      },
      { status: 500 }
    );
  }
}
