'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { Order, Product } from '@/models';
import { sendEmail, sendOrderEmails, buildOrderStatusUpdateEmail } from '@/lib/email';
import {
  checkoutSchema,
  orderStatusUpdateSchema,
  paymentStatusUpdateSchema,
} from '@/validations/order';
import type { CheckoutInput } from '@/validations/order';
import {
  decrementProductStock,
  getNextOrderNumber,
  processCheckoutPricing,
} from '@/lib/order-checkout';
import {
  actionError,
  actionSuccess,
  serialize,
  type ActionResult,
} from './helpers';

export async function validateCheckout(
  input: unknown
): Promise<
  ActionResult<{
    subtotal: number;
    discount: number;
    deliveryFee: number;
    tax: number;
    total: number;
    couponCode?: string;
    items: Array<{
      productId: string;
      name: string;
      quantity: number;
      unitPrice: number;
      lineTotal: number;
    }>;
  }>
> {
  try {
    const parsed = checkoutSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    const totals = await processCheckoutPricing(parsed.data);

    return actionSuccess({
      subtotal: totals.subtotal,
      discount: totals.discount,
      deliveryFee: totals.deliveryFee,
      tax: totals.tax,
      total: totals.total,
      couponCode: totals.couponCode,
      items: totals.items.map((item) => ({
        productId: String(item.productId),
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: item.lineTotal,
      })),
    });
  } catch (error) {
    console.error('validateCheckout error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Checkout validation failed'
    );
  }
}

export async function createOrder(
  input: unknown
): Promise<ActionResult<{ orderId: string; orderNumber: string }>> {
  try {
    const parsed = checkoutSchema.safeParse(input);
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    const totals = await processCheckoutPricing(parsed.data);
    const orderNumber = await getNextOrderNumber();

    const productIds = parsed.data.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } }).lean();

    const order = await Order.create({
      orderNumber,
      status: 'new',
      paymentStatus:
        parsed.data.paymentMethod === 'stripe' ? 'pending' : 'manual_invoice',
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

    if (parsed.data.paymentMethod !== 'stripe') {
      try {
        await sendOrderEmails(order);
      } catch (emailError) {
        console.error('Order email error:', emailError);
      }
    }

    revalidatePath('/admin/orders');

    return actionSuccess({
      orderId: order._id.toString(),
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error('createOrder error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to create order'
    );
  }
}

export async function updateOrderStatus(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = orderStatusUpdateSchema.safeParse({
      orderId: id,
      ...(typeof input === 'object' && input !== null ? input : {}),
    });
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const update: Record<string, unknown> = { status: parsed.data.status };
    if (parsed.data.internalNotes) {
      update.internalNotes = parsed.data.internalNotes;
    }

    const order = await Order.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return actionError('Order not found');
    }

    try {
      const statusEmail = buildOrderStatusUpdateEmail(order, order.status);
      await sendEmail({
        to: order.customerEmail,
        subject: statusEmail.subject,
        html: statusEmail.html,
        text: statusEmail.text,
      });
    } catch (emailError) {
      console.error('Order status email error:', emailError);
    }

    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${id}`);

    return actionSuccess(serialize(order));
  } catch (error) {
    console.error('updateOrderStatus error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update order status'
    );
  }
}

export async function updatePaymentStatus(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireAdmin();
    const parsed = paymentStatusUpdateSchema.safeParse({
      orderId: id,
      ...(typeof input === 'object' && input !== null ? input : {}),
    });
    if (!parsed.success) {
      return actionError('Validation failed', parsed.error.flatten().fieldErrors);
    }

    await connectDB();

    const order = await Order.findByIdAndUpdate(
      id,
      { paymentStatus: parsed.data.paymentStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return actionError('Order not found');
    }

    revalidatePath('/admin/orders');
    revalidatePath(`/admin/orders/${id}`);

    return actionSuccess(serialize(order));
  } catch (error) {
    console.error('updatePaymentStatus error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to update payment status'
    );
  }
}

export async function resendOrderConfirmation(id: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await connectDB();

    const order = await Order.findById(id);
    if (!order) {
      return actionError('Order not found');
    }

    await sendOrderEmails(order);

    return actionSuccess({ sent: true });
  } catch (error) {
    console.error('resendOrderConfirmation error:', error);
    return actionError(
      error instanceof Error ? error.message : 'Failed to resend confirmation'
    );
  }
}

export type { CheckoutInput };
