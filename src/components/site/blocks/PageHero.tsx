import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ArabicWatermark, NoteMargin, Reveal, SectionLabel, Stamp } from "./primitives";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { WaveDivider } from "./WaveDivider";

type Common = {
  chapter: string;
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  crumbs: Crumb[];
  note?: string | undefined;
  actions?: ReactNode;
  children?: ReactNode;
};

/* ============ A — image en onglet, texte à gauche ============ */

export function HeroSplit({
  chapter,
  eyebrow,
  title,
  lead,
  crumbs,
  note,
  actions,
  image,
  imageAlt,
  badge,
  children,
}: Common & { image: string; imageAlt: string; badge?: string | undefined }) {
  return (
    <header className="relative overflow-hidden bg-sand pt-8 pb-4">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <ArabicWatermark className="absolute -top-6 right-6 text-7xl md:text-9xl" />
      <div className="container-site relative">
        <Breadcrumb items={crumbs} />
        <div className="mt-8 grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <Reveal>
            <SectionLabel chapter={chapter}>{eyebrow}</SectionLabel>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-xl text-lg text-ink-600">{lead}</p>
            {note ? <NoteMargin className="mt-4 block">{note}</NoteMargin> : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
            {children}
          </Reveal>
          <Reveal delay={0.12}>
            <div className="relative">
              <div className="tab-shape border-4 border-white shadow-lift">
                <img
                  src={image}
                  alt={imageAlt}
                  width={1600}
                  height={912}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              {badge ? (
                <div className="absolute -bottom-5 -left-5 max-w-[14rem] rounded-2xl bg-coral-600 px-5 py-3 text-sm font-bold text-white shadow-lift">
                  {badge}
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
      <WaveDivider fill="paper" />
    </header>
  );
}

/* ============ B — image plein cadre + voile ============ */

export function HeroFull({
  chapter,
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  image,
  imageAlt,
  stamp,
  children,
}: Common & { image: string; imageAlt: string; stamp?: string[] | undefined }) {
  return (
    <header className="relative overflow-hidden bg-teal-900">
      <img
        src={image}
        alt={imageAlt}
        width={1600}
        height={912}
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-900/90 via-teal-900/70 to-coral-700/50"
        aria-hidden="true"
      />
      <div className="zellige absolute inset-0" aria-hidden="true" />
      <div className="container-site relative pt-8 pb-24 md:pb-32">
        <Breadcrumb items={crumbs} tone="light" />
        <div className="mt-14 max-w-3xl">
          <SectionLabel chapter={chapter} tone="light">
            {eyebrow}
          </SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-4xl leading-[1.04] text-white md:text-7xl"
          >
            {title}
          </motion.h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">{lead}</p>
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          {children}
        </div>
        {stamp ? <Stamp lines={stamp} className="absolute top-10 right-6 hidden md:grid md:size-36" /> : null}
      </div>
      <WaveDivider fill="paper" />
    </header>
  );
}

/* ============ C — typographique / document ============ */

export function HeroDocument({
  chapter,
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  meta,
  image,
  imageAlt,
  children,
}: Common & { meta?: { label: string; value: string }[] | undefined; image?: string | undefined; imageAlt?: string | undefined }) {
  return (
    <header className="relative overflow-hidden bg-paper pt-8">
      <div className="paper-lines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-site relative pb-16 md:pb-24">
        <Breadcrumb items={crumbs} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <Reveal>
            <SectionLabel chapter={chapter}>{eyebrow}</SectionLabel>
            <h1 className="mt-6 font-display text-4xl leading-[1.04] md:text-7xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-600">{lead}</p>
            {meta ? (
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
                {meta.map((m) => (
                  <div key={m.label}>
                    <dt className="text-xs font-bold tracking-[0.16em] text-ink-600 uppercase">{m.label}</dt>
                    <dd className="mt-1 font-display text-lg text-teal-900">{m.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {actions ? <div className="no-print mt-8 flex flex-wrap gap-3">{actions}</div> : null}
            {children}
          </Reveal>
          {image ? (
            <Reveal delay={0.1} className="no-print">
              <div className="tab-shape-alt rotate-1 border-4 border-white shadow-lift">
                <img
                  src={image}
                  alt={imageAlt ?? ""}
                  width={1600}
                  height={912}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
      <WaveDivider fill="sand" />
    </header>
  );
}

/* ============ D — motif + icônes flottantes ============ */

export function HeroPattern({
  chapter,
  eyebrow,
  title,
  lead,
  crumbs,
  note,
  actions,
  icons,
  image,
  imageAlt,
  children,
}: Common & { icons: LucideIcon[]; image: string; imageAlt: string }) {
  const positions = [
    "left-[4%] top-[18%]",
    "right-[8%] top-[12%]",
    "left-[14%] bottom-[16%]",
    "right-[16%] bottom-[22%]",
    "left-[46%] top-[6%]",
  ];
  return (
    <header className="relative overflow-hidden bg-paper pt-8">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {icons.slice(0, 5).map((Icon, i) => (
          <motion.span
            key={i}
            className={cn("absolute grid size-16 place-items-center rounded-2xl bg-white shadow-soft", positions[i])}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          >
            <Icon className={cn("size-7", i % 2 ? "text-teal-700" : "text-coral-600")} strokeWidth={1.6} />
          </motion.span>
        ))}
      </div>
      <div className="container-site relative pb-16 md:pb-24">
        <Breadcrumb items={crumbs} />
        <div className="mx-auto mt-14 max-w-3xl text-center">
          <SectionLabel chapter={chapter} className="justify-center">
            {eyebrow}
          </SectionLabel>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] md:text-6xl">{title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-600">{lead}</p>
          {note ? <NoteMargin className="mt-4 block">{note}</NoteMargin> : null}
          {actions ? <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div> : null}
        </div>
        <Reveal delay={0.12} className="mx-auto mt-12 max-w-4xl">
          <div className="tab-shape border-4 border-white shadow-lift">
            <img src={image} alt={imageAlt} width={1600} height={912} className="aspect-[16/8] w-full object-cover" />
          </div>
        </Reveal>
        {children}
      </div>
      <WaveDivider fill="sand" />
    </header>
  );
}

/* ============ E — interactif (contenu libre à droite) ============ */

export function HeroInteractive({
  chapter,
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  image,
  imageAlt,
  panel,
}: Common & { image: string; imageAlt: string; panel: ReactNode }) {
  return (
    <header className="relative overflow-hidden bg-teal-900">
      <img
        src={image}
        alt={imageAlt}
        width={1600}
        height={912}
        className="absolute inset-0 size-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-teal-900/70" aria-hidden="true" />
      <div className="zellige absolute inset-0" aria-hidden="true" />
      <div className="container-site relative pt-8 pb-24">
        <Breadcrumb items={crumbs} tone="light" />
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionLabel chapter={chapter} tone="light">
              {eyebrow}
            </SectionLabel>
            <h1 className="mt-6 font-display text-4xl leading-[1.05] text-white md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/85">{lead}</p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          <div>{panel}</div>
        </div>
      </div>
      <WaveDivider fill="paper" />
    </header>
  );
}
