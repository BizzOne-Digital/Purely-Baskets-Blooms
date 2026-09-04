'use client';

import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'default';
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  loading = false,
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => !loading && !isLoading && onOpenChange(false)}
      />
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
              variant === 'danger' ? 'bg-red-100 text-red-600' : 'bg-[#F5D6DC] text-[#7A2048]'
            )}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#241920]">{title}</h3>
            {description && (
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={loading || isLoading}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loading || isLoading}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50',
                  variant === 'danger'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-[#7A2048] hover:bg-[#481936]'
                )}
              >
                {loading || isLoading ? 'Processing...' : confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
