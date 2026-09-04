"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHero
        eyebrow="Something went wrong"
        eyebrowVariant="coral"
        title="We're Sorry"
        description="An unexpected error occurred. Please try again or return to the homepage."
        gradient="coral"
      >
        <AlertCircle className="mx-auto h-12 w-12 text-coral/60" />
      </PageHero>

      <PageSection tone="subtle" containerClassName="py-12 text-center">
        <RevealOnScroll>
          <div className="flex justify-center gap-4">
            <Button onClick={reset} variant="outline">
              Try Again
            </Button>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </RevealOnScroll>
      </PageSection>
    </>
  );
}
