import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { DecorativeBlobs } from "@/components/animations/DecorativeBlobs";
import { Button } from "@/components/ui/Button";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function BookingCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-berry/15 via-plum/10 to-coral/20" />
      <GradientMesh variant="plum" />
      <DecorativeBlobs variant="berry" />
      <div className="relative mx-auto max-w-3xl px-4 text-center md:px-8">
        <RevealOnScroll>
          <Eyebrow variant="champagne">Let&apos;s Create Together</Eyebrow>
          <DisplayHeading as="h2" size="section" className="mt-3">
            Ready to Bring Your Vision to Life?
          </DisplayHeading>
          <p className="mt-6 text-deep-ink/70">
            Whether it&apos;s a wedding, corporate event, or a custom arrangement — we&apos;d love
            to hear from you. Book a complimentary consultation with our floral design team.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/booking">
              <Button size="lg">Book a Consultation</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
