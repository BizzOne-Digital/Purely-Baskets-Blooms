import type { SerializedTestimonial } from "@/lib/storefront";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HOME_TESTIMONIALS_FALLBACK } from "@/lib/home-content";

interface TestimonialsSectionProps {
  testimonials: SerializedTestimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items =
    testimonials.length > 0
      ? testimonials.slice(0, 3).map((t) => ({
          quote: t.content,
          name: t.name,
          role: t.role ?? "",
        }))
      : HOME_TESTIMONIALS_FALLBACK;

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-carbon-soft py-16 md:py-24">
      <div className="editorial-fabric-swash pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2" aria-hidden />
      <div className="relative mx-auto min-w-0 w-full max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-12 md:mb-14">
          <SectionHeader
            eyebrow="Kind Words"
            title="Words From Beautiful Moments"
            description="Real stories from celebrations we've been honoured to be part of."
          />
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => (
            <RevealOnScroll key={`${item.name}-${i}`} delay={i * 0.1}>
              <article className="glass-card group h-full rounded-sm p-8 text-center transition-all duration-500 hover:border-gold/35 hover:shadow-[0_0_40px_rgba(201,168,76,0.08)]">
                <span className="font-display text-5xl leading-none text-gold/70 transition-colors group-hover:text-gold">
                  &ldquo;
                </span>
                <p className="mt-3 text-sm leading-relaxed text-cream/75 italic md:text-base">
                  {item.quote}
                </p>
                <div className="mx-auto my-5 h-px w-10 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <p className="font-display text-base font-semibold text-gold-light">{item.name}</p>
                {item.role ? (
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cream/45">{item.role}</p>
                ) : null}
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
