import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function AboutPageHero() {
  return (
    <section className="w-full overflow-x-hidden border-b border-deep-ink/10 bg-ivory">
      <div className="mx-auto flex max-w-3xl flex-col px-4 py-14 text-center md:px-8 md:py-20">
        <RevealOnScroll>
          <DisplayHeading as="h1" size="page" className="text-deep-berry">
            Beauty, Made Meaningful
          </DisplayHeading>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-deep-ink/70 md:text-lg">
            Every arrangement begins with a story, a feeling and a reason to celebrate.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
