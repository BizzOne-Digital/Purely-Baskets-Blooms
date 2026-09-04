"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitContactForm } from "@/actions/contact";
import { contactSchema, type ContactInput } from "@/validations/contact";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { GoldFrame } from "@/components/editorial/GoldFrame";
import { LotusMark } from "@/components/editorial/LotusMark";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { BRAND } from "@/lib/constants";
import { Mail, Phone, Truck } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface ContactFormProps {
  email: string;
  instagramUrl: string;
  deliveryArea?: string;
  phoneVisible: boolean;
  phoneNumber?: string;
}

const HELP_OPTIONS = [
  { value: "", label: "What can we help with?" },
  { value: "custom_order", label: "Custom Order" },
  { value: "event", label: "Event / Wedding" },
  { value: "corporate", label: "Corporate Gifting" },
  { value: "riwaaz", label: "The Riwaaz Collection" },
  { value: "other", label: "Other" },
];

function ContactInfoRow({
  href,
  icon,
  children,
}: {
  href?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const content = (
    <span className="inline-flex items-center gap-4 text-sm text-deep-ink/70">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-champagne/60 bg-ivory/80">
        {icon}
      </span>
      {children}
    </span>
  );

  if (href) {
    return (
      <a href={href} className="block transition-colors hover:text-deep-berry" target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

export function ContactPageContent({
  email,
  instagramUrl,
  deliveryArea,
  phoneVisible,
  phoneNumber,
}: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    const result = await submitContactForm(data);
    setSubmitting(false);
    if (result.success) {
      toast.success("Message sent! We'll be in touch soon.");
      reset();
    } else {
      toast.error(result.error ?? "Failed to send message");
    }
  };

  return (
    <section className="relative min-h-[720px] overflow-hidden border-b border-champagne/25 md:min-h-[820px]">
      <Image
        src="/pages/contact/background.jpg"
        alt=""
        fill
        priority
        className="hero-cover-image brightness-[1.02] saturate-[1.03]"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/88 via-ivory/72 to-ivory/35 md:via-ivory/55 md:to-ivory/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/30 via-transparent to-ivory/10" />
      <div className="editorial-botanical-lines absolute inset-0 opacity-35" aria-hidden />
      <div className="editorial-fabric-swash pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 opacity-50" aria-hidden />
      <div className="editorial-fabric-swash pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rotate-180 opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll className="lg:pt-6">
            <DisplayHeading as="h1" size="page" className="max-w-lg leading-[1.06]">
              We&apos;d Love to Hear Your Vision
            </DisplayHeading>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-champagne/80" />
              <LotusMark size="sm" className="text-marigold" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-champagne/80" />
            </div>

            <p className="max-w-md text-base leading-relaxed text-deep-ink/70 md:text-lg">
              Whether you&apos;re planning a celebration, arranging a corporate gift or looking for
              something completely custom, start the conversation with us.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <GoldFrame className="bg-ivory/95">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-3">
                <Input label="Your Name" {...register("name")} error={errors.name?.message} />
                <Input
                  label="Email Address"
                  type="email"
                  {...register("email")}
                  error={errors.email?.message}
                />
                <div>
                  <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-deep-ink/60">
                    What can we help with?
                  </label>
                  <select
                    {...register("subject")}
                    className="w-full rounded-xl border border-champagne/50 bg-ivory px-4 py-3 text-sm outline-none focus:border-dusty-rose/60"
                  >
                    {HELP_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Textarea
                  label="Tell us about your idea"
                  {...register("message")}
                  error={errors.message?.message}
                  rows={5}
                />
                <Button type="submit" isLoading={submitting} className="w-full gap-2" size="lg">
                  Send Your Message
                  <LotusMark size="sm" className="text-champagne" />
                </Button>
              </form>
            </GoldFrame>

            <div className="mt-8 space-y-5 border-t border-champagne/30 pt-6">
              <ContactInfoRow href={`mailto:${email}`} icon={<Mail className="h-4 w-4 text-marigold" />}>
                {email}
              </ContactInfoRow>
              <ContactInfoRow
                href={instagramUrl}
                icon={<InstagramIcon className="h-4 w-4" />}
              >
                {BRAND.instagram}
              </ContactInfoRow>
              {phoneVisible && phoneNumber ? (
                <ContactInfoRow icon={<Phone className="h-4 w-4 text-marigold" />}>
                  {phoneNumber}
                </ContactInfoRow>
              ) : null}
              <ContactInfoRow icon={<Truck className="h-4 w-4 text-marigold" />}>
                {deliveryArea ?? "Delivery throughout the GTA and surrounding cities"}
              </ContactInfoRow>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
