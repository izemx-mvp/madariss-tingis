import { cn } from "@/lib/utils";
import { ArabicWatermark, Reveal } from "./primitives";

export function PullQuote({
  quote,
  author,
  note,
  tone = "sand",
}: {
  quote: string;
  author?: string | undefined;
  note?: string | undefined;
  tone?: "sand" | "teal" | "paper";
}) {
  const dark = tone === "teal";
  return (
    <Reveal>
      <figure
        className={cn(
          "relative overflow-hidden rounded-[2.5rem] px-7 py-14 text-center md:px-16 md:py-20",
          dark ? "bg-teal-900" : tone === "sand" ? "bg-sand" : "bg-paper border border-line",
        )}
      >
        {dark ? <div className="zellige absolute inset-0" aria-hidden="true" /> : null}
        <ArabicWatermark className="absolute -right-4 -bottom-10 text-8xl md:text-[10rem]" />
        <span
          className={cn("font-display text-7xl leading-none md:text-8xl", dark ? "text-white/25" : "text-coral-500/30")}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote
          className={cn(
            "relative mx-auto -mt-6 max-w-4xl font-display text-2xl leading-tight md:text-5xl",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {quote}
        </blockquote>
        {author ? (
          <figcaption className={cn("mt-8 text-sm font-bold tracking-[0.16em] uppercase", dark ? "text-white/70" : "text-teal-700")}>
            {author}
          </figcaption>
        ) : null}
        {note ? <p className="hand-note mt-4">{note}</p> : null}
      </figure>
    </Reveal>
  );
}
