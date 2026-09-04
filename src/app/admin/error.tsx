'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F4] px-4">
      <div className="max-w-lg rounded-2xl border border-[#F5D6DC]/80 bg-white p-8 text-center shadow-lg">
        <h1 className="font-display text-2xl font-semibold text-[#7A2048]">Admin unavailable</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#241920]/70">
          The admin portal could not load. This is usually caused by missing production
          environment variables or a database connection issue on Vercel.
        </p>
        <p className="mt-4 rounded-lg bg-[#FFF9F4] px-3 py-2 text-left text-xs text-[#241920]/65">
          Check Vercel → Settings → Environment Variables:
          <br />
          MONGODB_URI, AUTH_SECRET, AUTH_URL, NEXT_PUBLIC_SITE_URL
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} variant="outline">
            Try again
          </Button>
          <Link href="/admin/login">
            <Button>Back to login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
