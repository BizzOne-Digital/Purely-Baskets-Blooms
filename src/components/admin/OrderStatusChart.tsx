'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ORDER_STATUS_LABELS } from '@/lib/constants';
import type { OrderStatus } from '@/types';

const COLORS = ['#7A2048', '#D8758F', '#E8AE43', '#31594B', '#F08A78', '#481936', '#C62828'];

interface OrderStatusChartProps {
  data: Array<{ status: string; count: number }>;
}

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  const chartData = data.map((d) => ({
    name: ORDER_STATUS_LABELS[d.status as OrderStatus] ?? d.status,
    value: d.count,
  }));

  if (chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-500">
        No order data yet
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #F5D6DC',
              fontSize: '13px',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px' }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
