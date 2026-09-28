'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </SessionProvider>
  );
}
