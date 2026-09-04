import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { HOME_SERVICES } from "@/lib/home-content";
import { cn } from "@/lib/utils";

export function HomeServicesMosaic() {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <RevealOnScroll className="mb-10 text-center md:mb-12">
          <DisplayHeading as="h2" size="section" className="text-deep-berry">
            More Than Flowers
          </DisplayHeading>
        </RevealOnScroll>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {HOME_SERVICES.map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 0.08}>
              <Link
                href={service.href}
                className={cn(
                  "group relative grid min-h-[220px] overflow-hidden rounded-2xl border border-champagne/30 md:min-h-[260px]",
                  service.tone === "plum" ? "bg-plum text-ivory" : "bg-[#F7F0E8] text-deep-ink"
                )}
              >
                <div className="relative z-10 flex flex-col justify-center p-6 md:max-w-[55%] md:p-8">
                  <h3 className="font-display text-xl font-semibold md:text-2xl">{service.title}</h3>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      service.tone === "plum" ? "text-ivory/75" : "text-deep-ink/70"
                    )}
                  >
                    {service.description}
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 h-[78%] w-[52%] overflow-hidden rounded-tl-3xl md:h-full md:w-[48%]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-left brightness-[1.06] transition-transform duration-700 group-hover:scale-[1.03] sm:object-center"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                  <div
                    className={cn(
                      "absolute inset-0",
                      service.tone === "plum"
                        ? "bg-gradient-to-l from-transparent via-plum/20 to-plum/80"
                        : "bg-gradient-to-l from-transparent via-[#F7F0E8]/10 to-[#F7F0E8]/75"
                    )}
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
