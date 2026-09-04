"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/actions/newsletter";
import { LotusMark } from "@/components/editorial/LotusMark";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

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
    <section className="relative overflow-hidden bg-[#FDFBF7]">
      <div className="relative min-h-[360px] md:min-h-[400px]">
        <Image
          src="/shop-hero.jpg"
          alt=""
          fill
          className="hero-cover-image brightness-[1.1] saturate-[1.1]"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7]/98 via-[#FDFBF7]/88 via-42% to-[#FDFBF7]/15 md:via-[#FDFBF7]/72 md:to-transparent" />
        <div className="editorial-botanical-lines pointer-events-none absolute inset-0 opacity-35" aria-hidden />

        <div className="relative z-10 mx-auto flex min-h-[360px] max-w-7xl items-center px-4 py-14 md:min-h-[400px] md:px-8 md:py-16">
          <div className="max-w-xl">
            <DisplayHeading as="h2" size="section" className="text-deep-berry md:text-4xl">
              A Little Beauty, Delivered
            </DisplayHeading>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-champagne/80" />
              <LotusMark size="sm" className="text-marigold" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-champagne/80" />
            </div>

            <p className="max-w-md text-sm leading-relaxed text-deep-ink/70 md:text-base">
              Be the first to discover new collections, seasonal florals and thoughtful inspiration.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-lg flex-col gap-2 rounded-2xl border border-champagne/80 bg-ivory/90 p-3 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-1.5 sm:pl-4"
            >
              <Mail className="h-4 w-4 shrink-0 text-marigold" aria-hidden />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-sm text-deep-ink outline-none placeholder:text-deep-ink/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-deep-berry px-4 py-2.5 text-sm font-semibold text-ivory transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto sm:px-5"
              >
                {loading ? "..." : "Join the List"}
                <LotusMark size="sm" className="text-champagne" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
