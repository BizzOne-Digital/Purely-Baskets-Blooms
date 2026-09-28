'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatPrice } from '@/lib/utils';

interface SalesChartProps {
  data: Array<{ date: string; revenue: number; orders: number }>;
}

export function SalesChart({ data }: SalesChartProps) {
  const formatted = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString('en-CA', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formatted} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7A2048" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7A2048" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5D6DC" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#F5D6DC' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#666' }}
            axisLine={{ stroke: '#F5D6DC' }}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #F5D6DC',
              fontSize: '13px',
            }}
            formatter={(value) => [formatPrice(Number(value) || 0), 'Revenue']}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#7A2048"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
