'use client';

import { signOut } from 'next-auth/react';
import { Menu, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  user?: { name?: string | null; email?: string | null };
  actions?: React.ReactNode;
}

export function AdminHeader({
  title,
  subtitle,
  onMenuClick,
  user,
  actions,
}: AdminHeaderProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/admin/login' });
    toast.success('Signed out');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#F5D6DC]/60 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              type="button"
              onClick={onMenuClick}
              className="rounded-lg p-2 text-[#7A2048] hover:bg-[#FFF9F4] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-semibold text-[#241920]">{title}</h1>
            {subtitle && (
              <p className="text-xs text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {actions}
          {user && (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5D6DC] text-[#7A2048]">
                <User className="h-4 w-4" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[#241920]">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 rounded-lg border border-[#F5D6DC] px-3 py-1.5 text-sm text-[#7A2048] hover:bg-[#FFF9F4]"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
