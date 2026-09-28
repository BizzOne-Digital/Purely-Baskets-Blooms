"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "bg-ivory/95 backdrop-blur-md border border-champagne/50 text-deep-ink shadow-xl font-sans",
          title: "font-medium",
          description: "text-deep-ink/70",
          success: "border-botanical/30",
          error: "border-coral/30",
        },
      }}
      richColors
      closeButton
    />
  );
}
