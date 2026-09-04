import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { HOME_PROCESS_STEPS } from "@/lib/home-content";

export function HomeProcessSection() {
  return (
    <section className="border-y border-champagne/25 bg-ivory py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-10 text-center md:mb-12">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            Created With You, For You
          </DisplayHeading>
        </RevealOnScroll>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_PROCESS_STEPS.map((step, i) => (
            <RevealOnScroll key={step.step} delay={i * 0.08} className="text-center">
              <LotusMark size="sm" className="mx-auto text-marigold" />
              <p className="mt-3 font-display text-3xl font-semibold text-deep-berry/25">{step.step}</p>
              <h3 className="mt-2 font-display text-lg font-semibold text-deep-berry">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-deep-ink/65">{step.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
