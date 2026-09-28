'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Ticket,
  Calendar,
  MessageSquare,
  Star,
  Image,
  FolderTree,
  Layers,
  Settings,
  ExternalLink,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/brand/BrandLogo';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { label: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Categories', href: '/admin/categories', icon: FolderTree },
  { label: 'Collections', href: '/admin/collections', icon: Layers },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const content = (
    <>
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <BrandLogo size="md" className="max-w-[240px]" />
        {onClose && (
          <button type="button" onClick={onClose} className="text-[#F5D6DC] lg:hidden">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-[#7A2048] text-white'
                  : 'text-[#F5D6DC]/80 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#F5D6DC]/70 hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" />
          View Storefront
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-[#241920] lg:flex">
        {content}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col bg-[#241920] shadow-xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
