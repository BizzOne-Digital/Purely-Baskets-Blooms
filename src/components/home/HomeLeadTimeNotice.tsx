import Link from "next/link";
import { Clock } from "lucide-react";

export function HomeLeadTimeNotice() {
  return (
    <section className="border-b border-deep-ink/10 bg-blush/20 py-8 md:py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 text-center md:px-8">
        <Clock className="h-5 w-5 text-deep-berry" aria-hidden />
        <p className="text-sm leading-relaxed text-neutral-900 md:text-base">
          <strong className="font-semibold">48 hours notice on every order.</strong> As a small
          studio, we craft each arrangement with care — share your date early, and for fully custom
          designs we&apos;ll bring your vision to life together.
        </p>
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
