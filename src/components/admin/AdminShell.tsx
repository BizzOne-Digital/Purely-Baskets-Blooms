'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
interface AdminShellProps {
  children: React.ReactNode;
  user: { name?: string | null; email?: string | null };
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AdminShell({
  children,
  user,
  title = 'Dashboard',
  subtitle,
  actions,
}: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FFF9F4]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          actions={actions}
        />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
