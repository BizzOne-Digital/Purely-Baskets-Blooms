import { MarqueeBand } from "@/components/animations/MarqueeBand";
import { HOME_CATEGORIES } from "@/lib/home-content";

export function HomeCategoryStrip() {
  return <MarqueeBand items={HOME_CATEGORIES} speed="slow" />;
}
