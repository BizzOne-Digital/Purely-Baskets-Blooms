import { DisplayHeading } from "@/components/ui/DisplayHeading";

export function ShopHeroBanner() {
  return (
    <section className="w-full max-w-full overflow-x-hidden border-b border-deep-ink/10 bg-ivory">
      <div className="mx-auto min-w-0 w-full max-w-3xl px-4 py-12 text-center md:px-8 md:py-16">
        <DisplayHeading as="h1" size="page" className="text-deep-berry">
          Shop Flowers &amp; Gifts
        </DisplayHeading>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-deep-ink/70 md:text-base">
          Curated from our live collection — birthdays, sympathy, corporate, and special occasions.
        </p>
      </div>
    </section>
  );
}
