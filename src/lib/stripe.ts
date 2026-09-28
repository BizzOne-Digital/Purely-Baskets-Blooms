import Stripe from "stripe";
import { absoluteUrl } from "@/lib/utils";
import type { IOrder } from "@/types";

let stripeClient: Stripe | null = null;

export function isStripeEnabled(): boolean {
  const enabled = process.env.STRIPE_ENABLED === "true";
  const hasSecret = Boolean(process.env.STRIPE_SECRET_KEY);
  const hasPublishable = Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  return enabled && hasSecret && hasPublishable;
}

export function getStripe(): Stripe {
  if (!isStripeEnabled()) {
    throw new Error(
      "Stripe is not enabled. Set STRIPE_ENABLED=true and provide Stripe API keys."
    );
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-08-26.dahlia",
      typescript: true,
    });
  }

  return stripeClient;
}

export interface CreateCheckoutSessionInput {
  order: Pick<IOrder, "_id" | "orderNumber" | "customerEmail" | "pricing" | "items">;
  successPath?: string;
  cancelPath?: string;
}

export async function createCheckoutSession(
  input: CreateCheckoutSessionInput
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe();
  const { order } = input;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    order.items.map((item) => ({
      price_data: {
        currency: "cad",
        product_data: {
          name: item.name,
          images: item.imageUrl ? [item.imageUrl] : undefined,
        },
        unit_amount: Math.round(item.unitPrice * 100),
      },
      quantity: item.quantity,
    }));

  if (order.pricing.deliveryCharge > 0) {
    lineItems.push({
      price_data: {
        currency: "cad",
        product_data: { name: "Delivery" },
        unit_amount: Math.round(order.pricing.deliveryCharge * 100),
      },
      quantity: 1,
    });
  }

  if (order.pricing.taxAmount > 0) {
    lineItems.push({
      price_data: {
        currency: "cad",
        product_data: { name: "Tax" },
        unit_amount: Math.round(order.pricing.taxAmount * 100),
      },
      quantity: 1,
    });
  }

  const successPath = input.successPath ?? `/order-confirmation/${order.orderNumber}`;
  const cancelPath = input.cancelPath ?? "/checkout";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: order.customerEmail,
    line_items: lineItems,
    metadata: {
      orderId: String(order._id),
      orderNumber: order.orderNumber,
    },
    success_url: absoluteUrl(`${successPath}?session_id={CHECKOUT_SESSION_ID}`),
    cancel_url: absoluteUrl(cancelPath),
    discounts:
      order.pricing.discountAmount > 0 && order.pricing.couponCode
        ? undefined
        : undefined,
  });

  return session;
}

export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured.");
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

export async function retrieveCheckoutSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  const stripe = getStripe();
  return stripe.checkout.sessions.retrieve(sessionId);
}

export function isPaymentSuccessful(
  session: Stripe.Checkout.Session
): boolean {
  return session.payment_status === "paid";
}

/** @alias getStripe */
export { getStripe as stripe };
