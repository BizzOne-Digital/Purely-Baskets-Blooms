import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/models';
import {
  constructWebhookEvent,
  isStripeEnabled,
} from '@/lib/stripe';
import { sendOrderEmails } from '@/lib/email';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!isStripeEnabled()) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 400 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = constructWebhookEvent(body, signature);
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (!orderId) {
          console.error('Stripe session missing orderId metadata');
          break;
        }

        const order = await Order.findOneAndUpdate(
          {
            _id: orderId,
            paymentStatus: { $ne: 'paid' },
          },
          {
            paymentStatus: 'paid',
            status: 'confirmed',
            stripePaymentIntentId:
              typeof session.payment_intent === 'string'
                ? session.payment_intent
                : session.payment_intent?.id,
          },
          { new: true }
        );

        if (order) {
          try {
            await sendOrderEmails(order);
          } catch (emailError) {
            console.error('Webhook order email error:', emailError);
          }
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await Order.findOneAndUpdate(
            { _id: orderId, paymentStatus: 'pending' },
            { paymentStatus: 'failed' }
          );
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        if (orderId) {
          await Order.findOneAndUpdate(
            { _id: orderId, paymentStatus: { $ne: 'paid' } },
            { paymentStatus: 'failed' }
          );
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
