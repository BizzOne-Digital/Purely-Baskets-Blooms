import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#F5D6DC] text-[#7A2048]',
  success: 'bg-[#E8F5E9] text-[#31594B]',
  warning: 'bg-[#FFF3E0] text-[#E8AE43]',
  danger: 'bg-[#FFEBEE] text-[#C62828]',
  info: 'bg-[#E3F2FD] text-[#1565C0]',
  neutral: 'bg-gray-100 text-gray-600',
};

const statusVariantMap: Record<string, BadgeVariant> = {
  new: 'info',
  confirmed: 'success',
  in_preparation: 'warning',
  ready: 'success',
  out_for_delivery: 'info',
  delivered: 'success',
  cancelled: 'danger',
  pending: 'warning',
  paid: 'success',
  failed: 'danger',
  refunded: 'neutral',
  manual_invoice: 'info',
  draft: 'neutral',
  published: 'success',
  contacted: 'info',
  quoted: 'warning',
  booked: 'success',
  closed: 'neutral',
  read: 'neutral',
  replied: 'success',
  active: 'success',
  inactive: 'neutral',
};

interface StatusBadgeProps {
  status: string;
  label?: string;
  variant?: BadgeVariant;
  className?: string;
}

export function StatusBadge({ status, label, variant, className }: StatusBadgeProps) {
  const resolvedVariant = variant ?? statusVariantMap[status] ?? 'default';
  const displayLabel =
    label ??
    status
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[resolvedVariant],
        className
      )}
    >
      {displayLabel}
    </span>
  );
}
