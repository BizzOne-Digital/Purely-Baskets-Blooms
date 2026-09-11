import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { HOME_SERVICES } from "@/lib/home-content";
import { cn } from "@/lib/utils";

export function HomeServicesMosaic() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-carbon py-16 md:py-20">
      <div className="mx-auto min-w-0 w-full max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-10 text-center md:mb-12">
          <DisplayHeading as="h2" size="section">
            More Than Flowers
          </DisplayHeading>
        </RevealOnScroll>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {HOME_SERVICES.map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 0.08}>
              <Link
                href={service.href}
                className={cn(
                  "group relative grid min-h-[220px] overflow-hidden rounded-sm border md:min-h-[260px]",
                  service.tone === "plum"
                    ? "border-gold/25 bg-carbon-elevated text-cream"
                    : "border-gold/15 bg-carbon-soft text-cream"
                )}
              >
                <div className="relative z-10 flex flex-col justify-center p-6 md:max-w-[55%] md:p-8">
                  <h3 className="font-display text-xl font-semibold text-gold-light md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">
                    {service.description}
                  </p>
                </div>
                <div className="flower-surface absolute bottom-0 right-0 h-[78%] w-[52%] overflow-hidden rounded-tl-sm md:h-full md:w-[48%]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
