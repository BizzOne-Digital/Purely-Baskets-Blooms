"use client";

import { SmoothScroll } from "@/components/animations/SmoothScroll";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
