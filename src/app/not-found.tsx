import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { Flower2 } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="404"
        eyebrowVariant="coral"
        title="Page Not Found"
        description="The page you're looking for may have been moved or no longer exists."
        gradient="warm"
      >
        <Flower2 className="mx-auto h-12 w-12 text-dusty-rose/40" />
      </PageHero>

      <PageSection tone="subtle" containerClassName="py-12 text-center">
        <RevealOnScroll>
          <Link href="/">
            <Button size="lg">Return Home</Button>
          </Link>
        </RevealOnScroll>
      </PageSection>
    </>
  );
}
