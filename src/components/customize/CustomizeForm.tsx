"use client";

import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { submitCustomizeRequest } from "@/actions/customize";
import { customizeSchema, type CustomizeInput } from "@/validations/customize";
import {
  CUSTOMIZE_POLICY,
  earliestCustomizeEventDate,
  formatDateInputValue,
} from "@/lib/customize-policy";
import { PREFERRED_CONTACT_METHODS } from "@/lib/constants";
import { PAYMENT_INFO } from "@/lib/order-policy";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { ReferenceImageUpload } from "@/components/customize/ReferenceImageUpload";

export function CustomizeForm() {
  const minEventDate = useMemo(() => earliestCustomizeEventDate(), []);
  const minDateValue = formatDateInputValue(minEventDate);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CustomizeInput>({
    resolver: zodResolver(customizeSchema),
    defaultValues: {
      preferredContactMethod: "email",
      inspirationImages: [] as CustomizeInput["inspirationImages"],
    },
  });

  const onSubmit = async (data: CustomizeInput) => {
    setSubmitting(true);
    const result = await submitCustomizeRequest(data);
    setSubmitting(false);

    if (result.success) {
      toast.success("Your customize request was sent! We will email you soon.");
      reset({
        preferredContactMethod: "email",
        inspirationImages: [],
      });
      return;
    }

    toast.error(result.error ?? "Something went wrong. Please try again.");
  };

  return (
    <>
      <section className="w-full max-w-full overflow-x-hidden border-b border-deep-ink/10 bg-ivory">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center md:px-8 md:py-16">
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            Customize your florals
          </DisplayHeading>
          <p className="mt-4 text-sm leading-relaxed text-deep-ink/70 md:text-base">
            Tell us about your event, share up to three reference photos, and we will design
            something unique with you.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full min-w-0 max-w-3xl overflow-x-hidden px-4 py-14 md:px-8 md:py-20">
        <div
          className="mb-8 rounded-2xl border border-deep-berry/25 bg-deep-berry/5 p-5 text-sm text-deep-ink/85"
          role="note"
        >
          <p className="flex items-start gap-2 font-semibold text-deep-berry">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" />
            {CUSTOMIZE_POLICY.headline}
          </p>
          <p className="mt-2 pl-6 leading-relaxed">{CUSTOMIZE_POLICY.notice}</p>
        </div>

        <div className="mb-8 space-y-3 rounded-2xl border border-deep-ink/10 bg-blush/20 p-5 text-sm text-deep-ink/75">
          <p>
            <Sparkles className="mr-2 inline h-4 w-4 text-deep-berry" />
            {CUSTOMIZE_POLICY.references}
          </p>
          <p>
            <Calendar className="mr-2 inline h-4 w-4 text-deep-berry" />
            {PAYMENT_INFO.customQuote} {PAYMENT_INFO.manual}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-3xl border border-champagne/35 bg-ivory/90 p-6 shadow-xl shadow-blush/10 md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              {...register("customerName")}
              error={errors.customerName?.message}
            />
            <Input
              label="Email"
              type="email"
              {...register("customerEmail")}
              error={errors.customerEmail?.message}
            />
            <Input
              label="Phone"
              type="tel"
              {...register("customerPhone")}
              error={errors.customerPhone?.message}
            />
            <Select
              label="Preferred contact"
              {...register("preferredContactMethod")}
              options={PREFERRED_CONTACT_METHODS.map((m) => ({
                value: m.value,
                label: m.label,
              }))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Occasion / event type"
              placeholder="e.g. Birthday, wedding, corporate"
              {...register("occasion")}
              error={errors.occasion?.message}
            />
            <Input
              label="Event date"
              type="date"
              min={minDateValue}
              {...register("eventDate")}
              error={errors.eventDate?.message}
            />
            <div className="sm:col-span-2">
              <Input
                label="Event location"
                placeholder="City, venue, or delivery address"
                {...register("eventLocation")}
                error={errors.eventLocation?.message}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Preferred colours"
              placeholder="Optional"
              {...register("preferredColors")}
            />
            <Input
              label="Floral style"
              placeholder="Romantic, modern, traditional…"
              {...register("floralStyle")}
            />
          </div>

          <Controller
            name="inspirationImages"
            control={control}
            render={({ field }) => (
              <ReferenceImageUpload
                value={field.value ?? []}
                onChange={field.onChange}
                error={errors.inspirationImages?.message}
              />
            )}
          />

          <Textarea
            label="Notes about your references"
            placeholder="What should we take from these photos? Colours, shape, mood…"
            rows={3}
            {...register("referenceNotes")}
          />

          <Textarea
            label="Describe your vision"
            rows={5}
            {...register("message")}
            error={errors.message?.message}
          />

          <Button type="submit" size="lg" className="w-full sm:w-auto" isLoading={submitting}>
            Send customize request
          </Button>
        </form>
      </section>
    </>
  );
}
