import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";

export type TimelineItem = {
  label: string;
  title: string;
  text: string;
  icon?: LucideIcon | undefined;
};

/* -------- Frise horizontale (interactive) -------- */

export function TimelineHorizontal({ items }: { items: TimelineItem[] }) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div>
      <div className="relative">
        <div className="absolute top-7 right-0 left-0 hidden h-1 rounded-full bg-line md:block" aria-hidden="true" />
        <div
          className="absolute top-7 left-0 hidden h-1 rounded-full bg-coral-500 transition-all duration-500 md:block"
          style={{ width: `${((active + 0.5) / items.length) * 100}%` }}
          aria-hidden="true"
        />
        <ol className="relative grid gap-4 md:grid-cols-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            const on = i <= active;
            return (
              <li key={item.title} className="text-center">
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  className="group flex w-full flex-col items-center gap-3"
                >
                  <span
                    className={cn(
                      "grid size-14 place-items-center rounded-full border-4 border-paper transition-all duration-300",
                      on ? "bg-coral-600 text-white shadow-lift" : "bg-white text-ink-600 shadow-soft",
                      i === active && "scale-110",
                    )}
                  >
                    {Icon ? <Icon className="size-6" strokeWidth={1.7} /> : <span className="font-display font-bold">{i + 1}</span>}
                  </span>
                  <span
                    className={cn(
                      "font-display text-sm leading-tight md:text-base",
                      i === active ? "text-coral-700" : "text-ink-900 group-hover:text-teal-700",
                    )}
                  >
                    {item.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {current ? (
        <div className="mt-10 rounded-3xl border border-line bg-white p-7 shadow-soft md:p-10">
          <p className="text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">{current.label}</p>
          <h3 className="mt-3 font-display text-2xl md:text-3xl">{current.title}</h3>
          <p className="mt-3 max-w-3xl text-ink-600">{current.text}</p>
        </div>
      ) : null}
    </div>
  );
}

/* -------- Frise verticale -------- */

export function TimelineVertical({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-4 border-l-2 border-dashed border-teal-500/40 pl-8 md:ml-6 md:pl-12">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li key={item.title} className="relative pb-10 last:pb-0">
            <span className="absolute top-1 -left-[2.65rem] grid size-10 place-items-center rounded-full bg-teal-700 text-white shadow-soft md:-left-[3.65rem] md:size-12">
              {Icon ? <Icon className="size-5" strokeWidth={1.7} /> : <span className="font-display font-bold">{i + 1}</span>}
            </span>
            <Reveal delay={i * 0.05}>
              <p className="text-xs font-bold tracking-[0.16em] text-coral-700 uppercase">{item.label}</p>
              <h3 className="mt-2 font-display text-xl md:text-2xl">{item.title}</h3>
              <p className="mt-2 max-w-2xl text-ink-600">{item.text}</p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
