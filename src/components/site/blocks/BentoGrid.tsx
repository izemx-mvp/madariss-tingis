import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";

export type BentoItem = {
  title: string;
  text?: string | undefined;
  icon?: LucideIcon | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
  span?: "sm" | "md" | "lg" | "tall";
  tone?: "white" | "sand" | "teal" | "coral" | "grid";
  extra?: ReactNode;
};

const spans: Record<NonNullable<BentoItem["span"]>, string> = {
  sm: "md:col-span-2",
  md: "md:col-span-3",
  lg: "md:col-span-4",
  tall: "md:col-span-2 md:row-span-2",
};

const tones: Record<NonNullable<BentoItem["tone"]>, string> = {
  white: "bg-white text-ink-900 border-line",
  sand: "bg-sand text-ink-900 border-line",
  teal: "bg-teal-900 text-white border-teal-900",
  coral: "bg-coral-600 text-white border-coral-600",
  grid: "bg-paper text-ink-900 border-line grid-paper",
};

export function BentoGrid({ items, className }: { items: BentoItem[]; className?: string | undefined }) {
  return (
    <div className={cn("grid auto-rows-[minmax(11rem,auto)] gap-5 md:grid-cols-6", className)}>
      {items.map((item, i) => {
        const Icon = item.icon;
        const dark = item.tone === "teal" || item.tone === "coral";
        return (
          <Reveal
            key={item.title}
            delay={i * 0.05}
            className={cn(spans[item.span ?? "md"], "min-w-0")}
          >
            <article
              className={cn(
                "relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift",
                tones[item.tone ?? "white"],
              )}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  loading="lazy"
                  className="mb-5 h-36 w-full rounded-2xl object-cover"
                />
              ) : null}
              {Icon ? (
                <span
                  className={cn(
                    "mb-4 grid size-12 shrink-0 place-items-center rounded-2xl",
                    dark ? "bg-white/15 text-white" : "bg-coral-50 text-coral-600",
                  )}
                >
                  <Icon className="size-6" strokeWidth={1.6} />
                </span>
              ) : null}
              <h3 className={cn("font-display text-xl", dark && "text-white")}>{item.title}</h3>
              {item.text ? (
                <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/85" : "text-ink-600")}>
                  {item.text}
                </p>
              ) : null}
              {item.extra ? <div className="mt-auto pt-4">{item.extra}</div> : null}
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
