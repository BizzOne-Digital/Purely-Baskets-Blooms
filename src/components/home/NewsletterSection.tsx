"use client";

import { useState } from "react";
import { toast } from "sonner";
import { subscribeNewsletter } from "@/actions/newsletter";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { DecorativeBlobs } from "@/components/animations/DecorativeBlobs";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function NewsletterSection() {
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
    <section className="relative overflow-hidden border-t border-champagne/30 py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-plum/8 via-blush/30 to-deep-berry/10" />
      <GradientMesh variant="berry" className="opacity-60" />
      <DecorativeBlobs variant="berry" />
      <div className="relative mx-auto max-w-xl px-4 text-center md:px-8">
        <RevealOnScroll>
          <Eyebrow variant="berry">Stay Connected</Eyebrow>
          <DisplayHeading as="h2" size="section" className="mt-3">
            Join Our Newsletter
          </DisplayHeading>
          <p className="mt-4 text-sm text-deep-ink/60">
            Be the first to know about new collections, seasonal offerings, and exclusive offers.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-ivory/80 backdrop-blur-sm"
            />
            <Button type="submit" isLoading={loading} className="shrink-0">
              Subscribe
            </Button>
          </form>
        </RevealOnScroll>
      </div>
    </section>
  );
}
