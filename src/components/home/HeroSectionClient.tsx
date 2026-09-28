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
}: {
  images: readonly string[];
  activeIndex: number;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === activeIndex ? "Floral arrangement" : ""}
          fill
          priority={i === 0}
          className={`object-cover object-right transition-opacity duration-1000 ease-in-out ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes={sizes}
        />
      ))}
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
      <div className="absolute bottom-5 right-0 top-[4.75rem] hidden w-[54%] md:block md:top-[5.25rem] md:bottom-8 lg:top-[5.75rem] lg:w-[56%]">
        <HeroSlides
          images={images}
          activeIndex={activeIndex}
          sizes="60vw"
        />
      </div>

      <div className="relative z-10 flex min-h-[min(72vh,640px)] w-full max-w-full min-w-0 flex-col px-4 pb-10 pt-[6.25rem] md:min-h-[min(78vh,680px)] md:max-w-[46%] md:justify-start md:pb-16 md:pl-8 md:pr-4 md:pt-[7.5rem] lg:pt-[8.25rem]">
        <h1 className="max-w-full break-words font-display text-[1.65rem] font-semibold leading-[1.15] text-deep-berry sm:text-[1.85rem] md:text-[2.65rem] lg:text-[2.85rem]">
          {hero.heading}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-deep-ink/65 md:mt-5 md:text-lg">
          {hero.subheading}
        </p>
        <div className="mt-7 flex w-full max-w-full min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8">
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

      <div className="w-full max-w-full min-w-0 px-4 pb-8 md:hidden">
        <div className="relative aspect-[4/3] w-full max-w-full overflow-hidden rounded-sm">
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
