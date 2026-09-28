import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function HomeVisionCta() {
  return (
    <section className="border-y border-deep-ink/10 bg-blush/40 py-14 md:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <DisplayHeading as="h2" size="section" className="text-deep-berry">
          Bringing your vision to life
        </DisplayHeading>
        <p className="mt-4 text-sm leading-relaxed text-deep-ink/70 md:text-base">
          Custom floral arrangements are our focus — share your palette, occasion, and ideas.
          We will design something beautiful together.
        </p>
        <Link href="/booking" className="mt-8 inline-block">
          <Button size="lg">Request a custom design →</Button>
        </Link>
      </div>
    </section>
  );
}
