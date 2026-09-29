import type { LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./primitives";

export type IconCard = {
  icon: LucideIcon;
  title: string;
  text: string;
  note?: string | undefined;
  to?: string | undefined;
  image?: string | undefined;
};

export function IconCardGrid({
  cards,
  columns = 3,
  numbered = false,
}: {
  cards: IconCard[];
  columns?: 2 | 3 | 4;
  numbered?: boolean;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

  return (
    <div className={cn("grid gap-6", cols[columns])}>
      {cards.map((card, i) => {
        const Icon = card.icon;
        const inner = (
          <>
            {card.image ? (
              <img
                src={card.image}
                alt=""
                loading="lazy"
                className="mb-5 h-40 w-full rounded-2xl object-cover"
              />
            ) : null}
            <div className="flex items-center justify-between">
              <span className="grid size-14 place-items-center rounded-2xl bg-coral-50 text-coral-600 transition-colors duration-300 group-hover:bg-coral-600 group-hover:text-white">
                <Icon className="size-7" strokeWidth={1.6} />
              </span>
              {numbered ? (
                <span className="font-display text-4xl font-bold text-line">{String(i + 1).padStart(2, "0")}</span>
              ) : null}
              {card.to ? <ArrowUpRight className="size-5 text-teal-700" strokeWidth={1.8} /> : null}
            </div>
            <h3 className="mt-5 font-display text-xl">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{card.text}</p>
            {card.note ? <span className="hand-note mt-4 block">{card.note}</span> : null}
          </>
        );

        const cls =
          "group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift";

        return (
          <Reveal key={card.title} delay={i * 0.06}>
            {card.to ? (
              <Link to={card.to as never} className={cls}>
                {inner}
              </Link>
            ) : (
              <article className={cls}>{inner}</article>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
