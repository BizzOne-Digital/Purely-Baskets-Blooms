"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const ROTATE_MS = 6000;

type HeroSectionClientProps = {
  images: readonly string[];
  hero: {
    heading: string;
    subheading: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
};

function HeroSlides({
  images,
  activeIndex,
  sizes,
  className,
  blendFromLeft = false,
}: {
  images: readonly string[];
  activeIndex: number;
  sizes: string;
  className?: string;
  blendFromLeft?: boolean;
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === activeIndex ? "Floral arrangement" : ""}
          fill
          priority={i === 0}
          className={`object-contain object-center bg-ivory p-1 transition-opacity duration-1000 ease-in-out md:object-contain md:p-3 ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes={sizes}
        />
      ))}
      {blendFromLeft ? (
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, #ffffff 0%, #ffffff 8%, rgba(255,255,255,0.92) 22%, rgba(255,255,255,0.55) 38%, rgba(255,255,255,0.15) 52%, transparent 68%)",
          }}
          aria-hidden
        />
      ) : null}
    </div>
  );
}

export function HeroSectionClient({ images, hero }: HeroSectionClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <>
      <div className="absolute bottom-5 right-0 top-[4.75rem] hidden w-[62%] max-w-[920px] md:block md:top-[5.25rem] md:bottom-8 lg:top-[5.75rem]">
        <HeroSlides
          images={images}
          activeIndex={activeIndex}
          sizes="60vw"
          blendFromLeft
        />
      </div>

      <div className="relative z-10 flex w-full max-w-full min-w-0 flex-col px-5 pb-6 pt-[5.75rem] sm:px-6 md:min-h-[min(78vh,680px)] md:max-w-[46%] md:justify-start md:pb-16 md:pl-8 md:pr-4 md:pt-[7.5rem] lg:pt-[8.25rem]">
        <h1 className="max-w-full text-balance font-display text-[1.75rem] font-semibold leading-[1.2] text-neutral-950 sm:text-[1.85rem] md:text-[2.65rem] md:leading-[1.15] lg:text-[2.85rem]">
          {hero.heading}
        </h1>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-neutral-800 sm:mt-4 sm:text-base md:mt-5 md:text-lg">
          {hero.subheading}
        </p>
        <div className="mt-5 flex w-full max-w-full min-w-0 flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
          <Link href={hero.primaryCtaHref} className="w-full min-w-0 sm:w-auto">
            <Button size="lg" className="w-full max-w-full sm:w-auto sm:min-w-[11rem]">
              {hero.primaryCtaLabel}
            </Button>
          </Link>
          <Link href={hero.secondaryCtaHref} className="w-full min-w-0 sm:w-auto">
            <Button size="lg" variant="outline" className="w-full max-w-full sm:w-auto">
              {hero.secondaryCtaLabel}
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full max-w-full min-w-0 px-5 pb-8 sm:px-6 md:hidden">
        <div className="relative aspect-[5/4] w-full max-w-full overflow-hidden rounded-sm sm:aspect-[4/3]">
          <HeroSlides
            images={images}
            activeIndex={activeIndex}
            sizes="(max-width: 768px) 100vw"
            className="absolute inset-0"
          />
        </div>
      </div>
    </>
  );
}
