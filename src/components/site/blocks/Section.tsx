import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SectionLabel } from "./primitives";

export function Section({
  id,
  chapter,
  eyebrow,
  title,
  lead,
  tone = "paper",
  pattern,
  align = "left",
  children,
  className,
  aside,
}: {
  id?: string | undefined;
  chapter?: string | undefined;
  eyebrow?: string | undefined;
  title?: ReactNode;
  lead?: ReactNode;
  tone?: "paper" | "sand" | "white" | "teal";
  pattern?: "none" | "grid" | "lines" | "zellige";
  align?: "left" | "center";
  children?: ReactNode;
  className?: string | undefined;
  aside?: ReactNode;
}) {
  const tones = {
    paper: "bg-paper text-ink-900",
    sand: "bg-sand text-ink-900",
    white: "bg-white text-ink-900",
    teal: "bg-teal-900 text-white",
  } as const;

  return (
    <section id={id} className={cn("relative overflow-hidden section-pad", tones[tone], className)}>
      {pattern === "grid" ? <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" /> : null}
      {pattern === "lines" ? <div className="paper-lines pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" /> : null}
      {pattern === "zellige" ? <div className="zellige pointer-events-none absolute inset-0" aria-hidden="true" /> : null}

      <div className="container-site relative">
        {(chapter || eyebrow || title || lead) && (
          <Reveal>
            <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
              {chapter ? (
                <SectionLabel
                  chapter={chapter}
                  tone={tone === "teal" ? "light" : "coral"}
                  className={align === "center" ? "justify-center" : undefined}
                >
                  {eyebrow ?? ""}
                </SectionLabel>
              ) : null}
              {title ? (
                <h2 className={cn("mt-5 font-display text-3xl md:text-5xl", tone === "teal" && "text-white")}>{title}</h2>
              ) : null}
              {lead ? (
                <p className={cn("mt-4 text-lg", tone === "teal" ? "text-white/80" : "text-ink-600")}>{lead}</p>
              ) : null}
            </div>
          </Reveal>
        )}
        {aside}
        <div className={cn((chapter || title || lead) && "mt-12 md:mt-16")}>{children}</div>
      </div>
    </section>
  );
}
