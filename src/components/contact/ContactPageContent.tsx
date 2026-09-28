"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { submitContactForm } from "@/actions/contact";
import { contactSchema, type ContactInput } from "@/validations/contact";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { BRAND } from "@/lib/constants";
import { Mail, Truck } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import Image from "next/image";

interface ContactFormProps {
  email: string;
  instagramUrl: string;
  deliveryArea?: string;
  phoneVisible: boolean;
  phoneNumber?: string;
}

const HELP_OPTIONS = [
  { value: "", label: "What can we help with?" },
  { value: "custom_order", label: "Custom floral design" },
  { value: "corporate", label: "Corporate / subscriptions" },
  { value: "riwaaz", label: "The Riwaaz Collection" },
  { value: "other", label: "Other" },
];

export function ContactPageContent({
  email,
  instagramUrl,
  deliveryArea,
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
    <section className="border-b border-deep-ink/10 bg-pure-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            Let&apos;s create something beautiful
          </DisplayHeading>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-deep-ink/70 md:text-base">
            Questions, special requests, or a vision to share? We&apos;d love to hear from you.
          </p>
          <div className="flower-surface relative mt-8 aspect-square max-w-sm overflow-hidden rounded-sm ring-1 ring-deep-ink/10">
            <Image
              src="/pages/contact/background.jpg"
              alt=""
              fill
              className="object-contain p-4"
              sizes="400px"
            />
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-sm border border-deep-ink/10 bg-ivory/50 p-6 md:p-8"
          >
            <Input label="Name" {...register("name")} error={errors.name?.message} />
            <Input
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-deep-ink/65">
                Topic
              </label>
              <select
                {...register("subject")}
                className="w-full rounded-xl border border-deep-ink/12 bg-pure-white px-4 py-3 text-sm text-deep-ink outline-none focus:border-deep-berry focus:ring-2 focus:ring-deep-berry/15"
              >
                {HELP_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <Textarea
              label="Message"
              {...register("message")}
              error={errors.message?.message}
              rows={5}
            />
            <Button type="submit" isLoading={submitting} className="w-full" size="lg">
              Send message →
            </Button>
          </form>

          <ul className="mt-8 space-y-4 text-sm text-deep-ink/70">
            <li>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-3 hover:text-deep-berry">
                <Mail className="h-4 w-4" />
                {email}
              </a>
            </li>
            <li>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 hover:text-deep-berry"
              >
                <InstagramIcon className="h-4 w-4" />
                {BRAND.instagram}
              </a>
            </li>
            <li className="inline-flex items-center gap-3">
              <Truck className="h-4 w-4" />
              {deliveryArea ?? BRAND.deliveryArea}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
