"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/actions/newsletter";
import { LotusMark } from "@/components/editorial/LotusMark";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Button } from "@/components/ui/Button";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await subscribeNewsletter({ email });
    setLoading(false);
    if (result.success) {
      toast.success("Welcome to our community!");
      setEmail("");
    } else {
      toast.error(result.error ?? "Subscription failed");
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-gold/15 bg-carbon-soft">
      <div className="editorial-botanical-lines pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 py-14 text-center md:px-8 md:py-16">
        <DisplayHeading as="h2" size="section" className="md:text-4xl">
          A Little Beauty, Delivered
        </DisplayHeading>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/80" />
          <LotusMark size="sm" className="text-gold" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/80" />
        </div>

        <p className="max-w-md text-sm leading-relaxed text-cream/70 md:text-base">
          Be the first to discover new collections, seasonal florals and thoughtful inspiration.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex w-full max-w-lg flex-col gap-2 rounded-sm border border-gold/25 bg-carbon-elevated p-3 sm:flex-row sm:items-center sm:gap-2 sm:p-1.5 sm:pl-4"
        >
          <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-sm text-cream outline-none placeholder:text-cream/40"
          />
          <Button
            type="submit"
            disabled={loading}
            size="sm"
            className="w-full shrink-0 sm:w-auto"
          >
            {loading ? "..." : "Join the List"}
            <LotusMark size="sm" className="text-carbon" />
          </Button>
        </form>
      </div>
    </section>
  );
}
