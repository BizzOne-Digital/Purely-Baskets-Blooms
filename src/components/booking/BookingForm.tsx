"use client";

import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createBooking } from "@/actions/bookings";
import { bookingSchema, type BookingInput } from "@/validations/booking";
import { BUDGET_RANGES, PREFERRED_CONTACT_METHODS } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { StepProgress } from "@/components/editorial/StepProgress";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { cn } from "@/lib/utils";
import { Calendar, Truck, Sparkles } from "lucide-react";
import { ORDER_TIMELINE, PAYMENT_INFO } from "@/lib/order-policy";
import type { ServiceType } from "@/types";

const STEPS = ["Occasion", "Details", "Inspiration", "Review"];

const SERVICE_OPTIONS: {
  value: ServiceType;
  label: string;
  image: string;
}[] = [
  { value: "custom_floral", label: "Custom Arrangement", image: "/products/blush-garden.jpg" },
  { value: "corporate_gifting", label: "Corporate / Subscription", image: "/products/corporate-welcome-basket.jpg" },
  { value: "riwaaz_collection", label: "Riwaaz Collection", image: "/products/ritual-bloom-tray.jpg" },
  { value: "floral_subscription", label: "Floral Subscription", image: "/products/champagne-rose-box.jpg" },
];

export function BookingForm() {
  const searchParams = useSearchParams();
  const defaultService = (searchParams.get("service") as ServiceType) ?? "custom_floral";
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: defaultService,
      preferredContactMethod: "email",
      inspirationImages: [],
    },
  });

  const formData = watch();
  const selectedService = watch("serviceType");

  const nextStep = async () => {
    const fields: (keyof BookingInput)[][] = [
      ["serviceType", "eventDate", "budgetRange"],
      ["customerName", "customerEmail", "customerPhone", "preferredContactMethod"],
      ["occasion", "eventLocation", "preferredColors", "floralStyle", "message"],
      [],
    ];
    const valid = await trigger(fields[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    setSubmitting(true);
    const result = await createBooking(data);
    setSubmitting(false);
    if (result.success) {
      toast.success("Your booking request has been submitted!");
      setStep(0);
    } else {
      toast.error(result.error ?? "Submission failed");
    }
  };

  return (
    <>
      <section className="w-full max-w-full overflow-x-hidden border-b border-deep-ink/10 bg-ivory">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center md:px-8 md:py-16">
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            Custom Florals — bringing your vision to life
          </DisplayHeading>
          <p className="mt-4 text-sm leading-relaxed text-deep-ink/70 md:text-base">
            Share your occasion, palette, and ideas. We will confirm timeline, pricing, and payment
            details with you directly.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full min-w-0 max-w-7xl overflow-x-hidden px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 space-y-4 rounded-2xl border border-deep-ink/10 bg-blush/25 p-5 text-sm text-deep-ink/75">
            <p>
              <Calendar className="mr-2 inline h-4 w-4 text-deep-berry" />
              <strong className="text-deep-berry">{ORDER_TIMELINE.headline}:</strong>{" "}
              {ORDER_TIMELINE.custom}
            </p>
            <p>
              <Truck className="mr-2 inline h-4 w-4 text-deep-berry" />
              {ORDER_TIMELINE.standard}
            </p>
            <p>
              <Sparkles className="mr-2 inline h-4 w-4 text-deep-berry" />
              <strong className="text-deep-berry">{PAYMENT_INFO.headline}:</strong>{" "}
              {PAYMENT_INFO.customQuote} {PAYMENT_INFO.manual}
            </p>
          </div>
              <div className="rounded-3xl border border-champagne/35 bg-ivory/90 p-6 shadow-xl shadow-blush/10 backdrop-blur-sm md:p-8">
                <StepProgress steps={STEPS} currentStep={step} className="mb-8" />

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {step === 0 ? (
                    <>
                      <p className="font-display text-lg font-semibold text-deep-berry">
                        What are we creating?
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {SERVICE_OPTIONS.map((option) => {
                          const selected = selectedService === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setValue("serviceType", option.value)}
                              className={cn(
                                "overflow-hidden rounded-2xl border text-left transition-all",
                                selected
                                  ? "border-deep-berry ring-2 ring-deep-berry/20"
                                  : "border-champagne/50 hover:border-dusty-rose/50"
                              )}
                            >
                              <div className="relative aspect-square">
                                <Image
                                  src={option.image}
                                  alt={option.label}
                                  fill
                                  className="object-cover"
                                  sizes="200px"
                                />
                              </div>
                              <p className="px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-deep-berry">
                                {option.label}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input label="Event Date" type="date" {...register("eventDate")} />
                        <Select
                          label="Budget Range"
                          {...register("budgetRange")}
                          options={[
                            { value: "", label: "Select budget range" },
                            ...BUDGET_RANGES.map((b) => ({ value: b.value, label: b.label })),
                          ]}
                        />
                      </div>
                    </>
                  ) : null}

                  {step === 1 ? (
                    <>
                      <Input
                        label="Full Name"
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
                        label="Preferred Contact"
                        {...register("preferredContactMethod")}
                        options={PREFERRED_CONTACT_METHODS.map((m) => ({
                          value: m.value,
                          label: m.label,
                        }))}
                      />
                    </>
                  ) : null}

                  {step === 2 ? (
                    <>
                      <Input label="Occasion" {...register("occasion")} />
                      <Input label="Event Location" {...register("eventLocation")} />
                      <Input label="Preferred Colours" {...register("preferredColors")} />
                      <Input
                        label="Floral Style"
                        {...register("floralStyle")}
                        placeholder="e.g. Romantic, Modern, Traditional"
                      />
                      <Textarea
                        label="Tell Us About Your Vision"
                        {...register("message")}
                        error={errors.message?.message}
                      />
                      <Textarea label="Special Requirements" {...register("specialRequirements")} />
                    </>
                  ) : null}

                  {step === 3 ? (
                    <div className="space-y-4 text-sm">
                      <h3 className="font-display text-lg font-semibold text-deep-berry">
                        Review Your Request
                      </h3>
                      <dl className="space-y-2 text-deep-ink/70">
                        <div>
                          <dt className="inline font-medium">Service: </dt>
                          <dd className="inline">{formData.serviceType}</dd>
                        </div>
                        <div>
                          <dt className="inline font-medium">Name: </dt>
                          <dd className="inline">{formData.customerName}</dd>
                        </div>
                        <div>
                          <dt className="inline font-medium">Email: </dt>
                          <dd className="inline">{formData.customerEmail}</dd>
                        </div>
                        {formData.occasion ? (
                          <div>
                            <dt className="inline font-medium">Occasion: </dt>
                            <dd className="inline">{formData.occasion}</dd>
                          </div>
                        ) : null}
                        <div>
                          <dt className="inline font-medium">Message: </dt>
                          <dd className="mt-1 block">{formData.message}</dd>
                        </div>
                      </dl>
                    </div>
                  ) : null}

                  <div className="flex justify-between pt-4">
                    {step > 0 ? (
                      <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>
                        Back
                      </Button>
                    ) : (
                      <div />
                    )}
                    {step < STEPS.length - 1 ? (
                      <Button type="button" onClick={nextStep}>
                        Continue
                      </Button>
                    ) : (
                      <Button type="submit" isLoading={submitting}>
                        Submit Request
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              <div className="mt-6 flex flex-wrap gap-6 text-xs text-deep-ink/55">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-marigold" />
                  Personalized guidance
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-marigold" />
                  Advance orders
                </span>
                <span className="inline-flex items-center gap-2">
                  <Truck className="h-4 w-4 text-marigold" />
                  GTA delivery
                </span>
              </div>
        </div>
      </section>
    </>
  );
}
