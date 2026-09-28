import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function HomeVisionCta() {
  return (
    <section className="relative overflow-hidden border-t border-deep-ink/10 bg-gradient-to-br from-blush/50 via-blush/30 to-ivory py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
        <DisplayHeading as="h2" size="section" className="text-deep-berry">
          Have a vision in mind?
        </DisplayHeading>
        <Link href="/booking" className="mt-8 inline-block">
          <Button size="lg">Get a custom quote →</Button>
        </Link>
      </div>
    </section>
  );
}
