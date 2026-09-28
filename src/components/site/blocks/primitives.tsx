import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------- Reveal : apparition au scroll ---------------- */

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Label de section "chapitre de manuel" ---------------- */

export function SectionLabel({
  chapter,
  children,
  tone = "coral",
  className,
}: {
  chapter: string;
  children: ReactNode;
  tone?: "coral" | "teal" | "light";
  className?: string;
}) {
  const tones = {
    coral: "text-coral-700 border-coral-500/40",
    teal: "text-teal-700 border-teal-500/50",
    light: "text-white/80 border-white/30",
  } as const;
  return (
    <div className={cn("flex items-center gap-3 text-xs font-bold tracking-[0.18em] uppercase", tones[tone], className)}>
      <span className={cn("grid size-8 place-items-center rounded-full border", tones[tone])}>{chapter}</span>
      <span>{children}</span>
    </div>
  );
}

/* ---------------- Annotation manuscrite ---------------- */

export function NoteMargin({
  children,
  className,
  rotate = -4,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={cn("hand-note inline-block", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/* ---------------- Tampon rond ---------------- */

export function Stamp({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div
      className={cn(
        "grid size-28 -rotate-12 place-items-center rounded-full border-[3px] border-dashed border-coral-500/70 bg-paper/85 text-center text-coral-700 shadow-soft backdrop-blur",
        className,
      )}
    >
      <span className="px-3 font-display text-sm leading-tight font-bold">
        {lines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </span>
    </div>
  );
}

/* ---------------- Calligraphie en filigrane ---------------- */

export function ArabicWatermark({ className, text = "مدارس طنجيس" }: { className?: string; text?: string }) {
  return (
    <span
      lang="ar"
      dir="rtl"
      aria-hidden="true"
      className={cn("arabic pointer-events-none select-none text-teal-500/10", className)}
    >
      {text}
    </span>
  );
}

/* ---------------- Boutons ---------------- */

type ActionProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary" | "light";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300";

const variants = {
  primary: "bg-coral-600 text-white hover:bg-coral-700 shadow-soft hover:shadow-lift",
  secondary: "border-2 border-teal-700 text-teal-700 hover:bg-teal-50",
  tertiary: "px-0 py-1 text-teal-700 hover:text-coral-700 underline decoration-wavy underline-offset-8",
  light: "bg-white text-teal-900 hover:bg-teal-50 shadow-soft",
} as const;

export function Action({
  to,
  href,
  children,
  variant = "primary",
  className,
  arrow = true,
  onClick,
  type = "button",
}: ActionProps) {
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
      ) : null}
    </>
  );
  const cls = cn(base, variants[variant], className);

  if (to) {
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

/* ---------------- Badge ---------------- */

export function Badge({ children, tone = "coral" }: { children: ReactNode; tone?: "coral" | "teal" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase",
        tone === "coral" ? "bg-coral-50 text-coral-700" : "bg-teal-50 text-teal-700",
      )}
    >
      {children}
    </span>
  );
}
