'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, Package } from 'lucide-react';
import {
  updateOrderStatus,
  updatePaymentStatus,
  resendOrderConfirmation,
} from '@/actions/orders';
import { StatusBadge } from './StatusBadge';
import { formatPrice, formatPhoneNumber } from '@/lib/utils';
import {
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUSES,
  PAYMENT_STATUS_LABELS,
} from '@/lib/constants';
import type { IOrder, OrderStatus, PaymentStatus } from '@/types';

interface OrderDetailProps {
  order: IOrder;
}

export function OrderDetail({ order }: OrderDetailProps) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.paymentStatus);
  const [internalNotes, setInternalNotes] = useState(order.internalNotes ?? '');
  const [saving, setSaving] = useState(false);
  const [resending, setResending] = useState(false);

  const handleStatusUpdate = async () => {
    setSaving(true);
    const result = await updateOrderStatus(String(order._id), {
      status,
      internalNotes: internalNotes || undefined,
    });
    setSaving(false);

    if (result.success) {
      toast.success('Order status updated');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to update status');
    }
  };

  const handlePaymentUpdate = async () => {
    setSaving(true);
    const result = await updatePaymentStatus(String(order._id), { paymentStatus });
    setSaving(false);

    if (result.success) {
      toast.success('Payment status updated');
      router.refresh();
    } else {
      toast.error(result.error ?? 'Failed to update payment status');
    }
  };

  const handleResend = async () => {
    setResending(true);
    const result = await resendOrderConfirmation(String(order._id));
    setResending(false);

    if (result.success) {
      toast.success('Confirmation email sent');
    } else {
      toast.error(result.error ?? 'Failed to send email');
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]';
  const cardClass = 'rounded-xl border border-[#F5D6DC]/60 bg-white p-5';

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        {/* Order Items */}
        <div className={cardClass}>
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#7A2048]">
            <Package className="h-4 w-4" />
            Order Items
          </h2>
          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[#F5D6DC]">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#241920]">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × {formatPrice(item.unitPrice)}
                  </p>
                  {item.selectedSize && (
                    <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                  )}
                  {item.selectedColor && (
                    <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                  )}
                  {item.giftMessage && (
                    <p className="mt-1 text-xs italic text-gray-500">
                      Gift message: {item.giftMessage}
                    </p>
                  )}
                </div>
                <p className="font-medium text-[#241920]">{formatPrice(item.lineTotal)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Info */}
        <div className={cardClass}>
          <h2 className="mb-4 text-base font-semibold text-[#7A2048]">Customer Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-[#7A2048]" />
              <span>{formatPhoneNumber(order.customerPhone)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-[#7A2048]" />
              <a href={`mailto:${order.customerEmail}`} className="text-[#7A2048] hover:underline">
                {order.customerEmail}
              </a>
            </div>
            {order.recipientName && (
              <p className="text-sm text-gray-600">
                Recipient: <strong>{order.recipientName}</strong>
              </p>
            )}
            {order.occasion && (
              <p className="text-sm text-gray-600">Occasion: {order.occasion}</p>
            )}
          </div>
          {order.giftMessage && (
            <div className="mt-4 rounded-lg bg-[#FFF9F4] p-3 text-sm italic text-gray-600">
              &ldquo;{order.giftMessage}&rdquo;
            </div>
          )}
        </div>

        {/* Delivery */}
        <div className={cardClass}>
          <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#7A2048]">
            <MapPin className="h-4 w-4" />
            Delivery Address
          </h2>
          <address className="text-sm not-italic text-gray-600">
            {order.deliveryAddress.street}<br />
            {order.deliveryAddress.city}, {order.deliveryAddress.province}{' '}
            {order.deliveryAddress.postalCode}<br />
            {order.deliveryAddress.country ?? 'CA'}
          </address>
          {order.deliveryInstructions && (
            <p className="mt-3 text-sm text-gray-500">
              Instructions: {order.deliveryInstructions}
            </p>
          )}
          {order.preferredDeliveryDate && (
            <p className="mt-2 text-sm text-gray-500">
              Preferred delivery:{' '}
              {new Date(order.preferredDeliveryDate).toLocaleDateString('en-CA')}
            </p>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className={cardClass}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#7A2048]">Order Summary</h2>
            <StatusBadge status={order.status} />
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Order #</dt>
              <dd className="font-medium">{order.orderNumber}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Date</dt>
              <dd>{new Date(order.createdAt).toLocaleDateString('en-CA')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Subtotal</dt>
              <dd>{formatPrice(order.pricing.subtotal)}</dd>
            </div>
            {order.pricing.discountAmount > 0 && (
              <div className="flex justify-between text-green-700">
                <dt>Discount</dt>
                <dd>-{formatPrice(order.pricing.discountAmount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-500">Delivery</dt>
              <dd>{formatPrice(order.pricing.deliveryCharge)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Tax</dt>
              <dd>{formatPrice(order.pricing.taxAmount)}</dd>
            </div>
            <div className="flex justify-between border-t border-[#F5D6DC] pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd className="text-[#7A2048]">{formatPrice(order.pricing.total)}</dd>
            </div>
          </dl>
        </div>

        <div className={cardClass}>
          <h2 className="mb-4 text-base font-semibold text-[#7A2048]">Update Status</h2>
          <div className="space-y-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className={inputClass}
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Internal notes..."
              rows={3}
              className={inputClass}
            />
            <button
              type="button"
              onClick={handleStatusUpdate}
              disabled={saving}
              className="w-full rounded-lg bg-[#7A2048] px-4 py-2 text-sm font-medium text-white hover:bg-[#481936] disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Update Status'}
            </button>
          </div>
        </div>

        <div className={cardClass}>
          <h2 className="mb-4 text-base font-semibold text-[#7A2048]">Payment</h2>
          <div className="mb-3 flex items-center gap-2">
            <StatusBadge status={order.paymentStatus} />
            <span className="text-xs text-gray-500 capitalize">
              via {order.paymentMethod}
            </span>
          </div>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
            className={inputClass}
          >
            {PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {PAYMENT_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handlePaymentUpdate}
            disabled={saving}
            className="mt-3 w-full rounded-lg border border-[#7A2048] px-4 py-2 text-sm font-medium text-[#7A2048] hover:bg-[#FFF9F4] disabled:opacity-50"
          >
            Update Payment
          </button>
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <Mail className="h-4 w-4" />
          {resending ? 'Sending...' : 'Resend Confirmation'}
        </button>
      </div>
    </div>
  );
}
