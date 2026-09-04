import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive?: boolean };
  className?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[#F5D6DC]/60 bg-white p-5 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-[#241920]">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                'mt-1 text-xs font-medium',
                trend.positive ? 'text-[#31594B]' : 'text-gray-500'
              )}
            >
              {trend.value}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F5D6DC]/50 text-[#7A2048]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
