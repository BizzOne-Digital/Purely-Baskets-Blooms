import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { LotusMark } from "@/components/editorial/LotusMark";
import { cn } from "@/lib/utils";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute left-0 right-0 top-5 hidden h-px border-t border-dashed border-champagne/60 lg:block"
        aria-hidden
      />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <RevealOnScroll key={step.number} delay={i * 0.06}>
            <div className="relative text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-champagne/50 bg-ivory text-sm font-semibold text-deep-berry shadow-sm">
                {step.number}
              </div>
              <LotusMark size="sm" className="mx-auto mt-3" />
              <h3 className="mt-3 font-display text-base font-semibold text-deep-berry md:text-lg">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-deep-ink/60 md:text-sm">
                {step.description}
              </p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
}
