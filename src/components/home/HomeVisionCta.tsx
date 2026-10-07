import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function HomeVisionCta() {
  return (
    <section className="relative w-full max-w-full overflow-x-hidden border-t border-deep-ink/10 bg-gradient-to-br from-blush/50 via-blush/30 to-ivory py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <DisplayHeading as="h2" size="section">
          Your vision, our craft
        </DisplayHeading>
        <p className="mt-4 text-sm leading-relaxed text-neutral-800 md:text-base">
          Custom orders are our specialty. Tell us about your occasion, palette, and ideas — we&apos;ll
          design something personal with at least 48 hours notice.
        </p>
        <Link href="/booking" className="mt-8 inline-block">
          <Button size="lg">Bring your vision to life →</Button>
        </Link>
      </div>
    </section>
  );
}
