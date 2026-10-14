import Link from "next/link";
import { Clock } from "lucide-react";

export function HomeLeadTimeNotice() {
  return (
    <section className="border-b border-deep-ink/10 bg-blush/20 py-8 md:py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center md:px-8">
        <Clock className="h-5 w-5 text-deep-berry" aria-hidden />
        <div className="space-y-4 text-sm leading-relaxed text-neutral-900 md:text-base">
          <p>
            At Purely Baskets &amp; Blooms, every piece is thoughtfully custom created to bring your
            vision to life. From selecting fresh flowers to choosing colours and finishing touches,
            we take care with every detail to make your arrangement personal and meaningful.
          </p>
          <p>
            We require a minimum of 48 hours&apos; notice for all orders, allowing us time to source
            your flowers and carefully create your piece. Share your occasion, preferred colours,
            style, and budget with us, and let&apos;s create something beautiful together.
          </p>
        </div>
        <Link
          href="/booking"
          className="text-sm font-semibold text-deep-berry underline underline-offset-4 hover:text-plum"
        >
          Start a custom request →
        </Link>
      </div>
    </section>
  );
}
