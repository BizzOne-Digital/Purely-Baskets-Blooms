'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { BrandLogo } from '@/components/brand/BrandLogo';

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid email or password');
        return;
      }

      toast.success('Welcome back!');
      router.push(callbackUrl);
      router.refresh();
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#241920] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <BrandLogo size="md" className="mx-auto" />
          <p className="mt-4 text-sm text-[#F5D6DC]/70">Admin Portal</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white p-8 shadow-xl"
        >
          <h2 className="mb-6 text-lg font-semibold text-[#241920]">Sign in</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-[#241920]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-[#241920]">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm focus:border-[#7A2048] focus:outline-none focus:ring-1 focus:ring-[#7A2048]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-[#7A2048] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#481936] disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
