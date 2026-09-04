import type { SerializedTestimonial } from "@/lib/storefront";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
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
    <section className="bg-ivory py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-10 text-center md:mb-12">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Words From Beautiful Moments
          </DisplayHeading>
        </RevealOnScroll>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <RevealOnScroll key={`${item.name}-${i}`} delay={i * 0.08} className="text-center">
              <span className="font-display text-5xl leading-none text-marigold/80">&ldquo;</span>
              <p className="mt-2 text-sm leading-relaxed text-deep-ink/70 italic md:text-base">
                {item.quote}
              </p>
              <p className="mt-5 font-display text-base font-semibold text-deep-berry">{item.name}</p>
              {item.role ? (
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-deep-ink/45">{item.role}</p>
              ) : null}
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
