import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";

export type RoadStep = {
  title: string;
  text: string;
  icon?: LucideIcon | undefined;
};

/** Étapes reliées par une route en pointillés. */
export function StepsRoad({ steps }: { steps: RoadStep[] }) {
  return (
    <div className="relative">
      {/* route en pointillés */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-14 hidden h-24 w-full lg:block"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M40 60 C 220 -10, 380 130, 600 50 S 980 -10, 1160 60"
          fill="none"
          stroke="var(--teal-500)"
          strokeWidth="3"
          strokeDasharray="10 12"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={i * 0.08}>
              <li
                className={cn(
                  "h-full rounded-3xl border border-line bg-white p-6 shadow-soft",
                  i % 2 === 1 && "lg:mt-16",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-full bg-coral-600 font-display text-lg font-bold text-white shadow-soft">
                    {i + 1}
                  </span>
                  {Icon ? <Icon className="size-6 text-teal-700" strokeWidth={1.6} /> : null}
                </div>
                <h3 className="mt-5 font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
