import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { NoteMargin, Reveal } from "./primitives";

export function SplitFeature({
  eyebrow,
  title,
  text,
  points,
  image,
  imageAlt,
  reverse = false,
  note,
  children,
  shape = "tab",
}: {
  eyebrow?: string | undefined;
  title: string;
  text?: ReactNode;
  points?: string[] | undefined;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  note?: string | undefined;
  children?: ReactNode;
  shape?: "tab" | "round";
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={cn(reverse && "lg:order-2")}>
        <div className="relative">
          <div
            className={cn(
              "border-4 border-white shadow-lift",
              shape === "tab" ? (reverse ? "tab-shape-alt" : "tab-shape") : "rounded-3xl overflow-hidden",
            )}
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          {note ? (
            <NoteMargin className="absolute -bottom-6 left-6 rounded-xl bg-paper px-3 py-1 shadow-soft">
              {note}
            </NoteMargin>
          ) : null}
        </div>
      </Reveal>

      <Reveal delay={0.1} className={cn(reverse && "lg:order-1")}>
        {eyebrow ? (
          <p className="text-xs font-bold tracking-[0.18em] text-coral-700 uppercase">{eyebrow}</p>
        ) : null}
        <h3 className="mt-3 font-display text-2xl md:text-4xl">{title}</h3>
        {text ? <div className="mt-4 text-ink-600">{text}</div> : null}
        {points ? (
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700">
                  <Check className="size-4" strokeWidth={2.5} />
                </span>
                <span className="text-ink-600">{p}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {children}
      </Reveal>
    </div>
  );
}
