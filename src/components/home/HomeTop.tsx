import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, Languages } from "lucide-react";
import heroImg from "@/assets/hero-accueil.jpg";
import valeursImg from "@/assets/valeurs-cour.jpg";
import matImg from "@/assets/cycle-maternelle.jpg";
import primImg from "@/assets/cycle-primaire.jpg";
import colImg from "@/assets/cycle-college-lycee.jpg";
import { SCHOOL_YEAR, commitments, cycles, site, values } from "@/data/site";
import { Action, ArabicWatermark, NoteMargin, Reveal, SectionLabel, Stamp } from "@/components/site/blocks/primitives";
import { WaveDivider } from "@/components/site/blocks/WaveDivider";
import { cn } from "@/lib/utils";

/* 1 — HERO asymétrique */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="paper-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <ArabicWatermark className="absolute -top-10 -right-6 text-[8rem] leading-none md:text-[16rem]" />

      <div className="container-site relative grid gap-12 pt-14 pb-24 md:grid-cols-[1.05fr_1fr] md:items-center md:pt-20 md:pb-32">
        <div>
          <SectionLabel chapter="✦" tone="coral">
            École privée à Tanger · Maternelle → Lycée
          </SectionLabel>
          <h1 className="mt-6 font-display text-[2.4rem] leading-[1.05] md:text-6xl">
            Apprendre aujourd'hui,{" "}
            <span className="hand-underline text-coral-600">réussir demain…</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink-600">
            Préparez-vous à briller en {SCHOOL_YEAR} ! Rejoignez-nous pour une année de succès, portée par un programme
            marocain officiel, un français renforcé et un anglais valorisé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Action to="/inscription">Inscrire mon enfant</Action>
            <Action to="/projet-ecole" variant="secondary">
              Découvrir l'école
            </Action>
          </div>
        </div>

        <div className="relative">
          <motion.img
            src={heroImg}
            alt="Une enseignante et quatre élèves de primaire autour d'une table dans une classe lumineuse"
            width={1600}
            height={912}
            className="tab-shape w-full object-cover shadow-lift"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-soft backdrop-blur md:-left-10"
          >
            <span className="grid size-10 place-items-center rounded-full bg-coral-50 text-coral-700">
              <GraduationCap className="size-5" strokeWidth={1.75} />
            </span>
            <span className="text-sm font-semibold">Maternelle → Lycée</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="absolute -top-5 -left-2 flex items-center gap-3 rounded-2xl border border-line bg-white/95 px-4 py-3 shadow-soft backdrop-blur md:-left-12"
          >
            <span className="grid size-10 place-items-center rounded-full bg-teal-50 text-teal-700">
              <Languages className="size-5" strokeWidth={1.75} />
            </span>
            <span className="text-sm font-semibold">Français renforcé · Anglais</span>
          </motion.div>

          <Stamp lines={["Rentrée", SCHOOL_YEAR]} className="absolute -right-2 -bottom-10 md:-right-8" />
        </div>
      </div>

      <WaveDivider fill="paper" />
    </section>
  );
}

/* 3 — Vision & valeurs */
export function Vision() {
  return (
    <section className="container-site section-pad">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionLabel chapter="01">Notre vision</SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">
            Découvrez notre vision et nos <span className="hand-underline-teal">valeurs</span>
          </h2>
          <p className="mt-6 text-lg text-ink-600">
            Cinq repères simples guident nos décisions, du plus petit de la maternelle au futur bachelier.
          </p>
          <img
            src={valeursImg}
            alt="Groupe d'élèves de tous âges assis dans la cour arborée de l'école"
            loading="lazy"
            width={1408}
            height={1056}
            className="tab-shape-alt mt-8 w-full object-cover shadow-soft"
          />
        </div>

        <ul className="space-y-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <li
                className="group relative rounded-2xl border border-line bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:rotate-[0.6deg]"
                style={{ transform: `rotate(${i % 2 ? -0.5 : 0.5}deg)` }}
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand font-display font-bold text-coral-700">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl">{v.title}</h3>
                    <p className="mt-1 text-ink-600">{v.text}</p>
                  </div>
                </div>
                <NoteMargin className="absolute -top-3 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                  {v.note}
                </NoteMargin>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 4 — Mission */
export function Mission() {
  return (
    <section className="relative">
      <WaveDivider fill="teal" />
      <div className="relative overflow-hidden bg-teal-900 text-white">
        <div className="zellige absolute inset-0" aria-hidden="true" />
        <div className="container-site relative py-20 md:py-28">
          <SectionLabel chapter="02" tone="light">
            Notre mission
          </SectionLabel>
          <h2 className="mt-6 max-w-3xl font-display text-4xl text-white md:text-6xl">
            Former pour un avenir meilleur
          </h2>
          <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {commitments.map((c, i) => (
              <li key={c}>
                <div className="group flex items-baseline gap-6 py-5 transition-colors">
                  <span className="font-display text-sm text-teal-500">0{i + 1}</span>
                  <span className="font-display text-2xl text-white/60 transition-colors duration-300 group-hover:text-white md:text-4xl">
                    {c}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Action to="/mission" variant="light">
              Découvrir notre mission
            </Action>
          </div>
        </div>
      </div>
      <WaveDivider fill="paper" />
    </section>
  );
}

/* 5 — Cycles (accordéon horizontal) */
const cycleImages = [
  { src: matImg, alt: "Enfants de maternelle dans un coin lecture coloré" },
  { src: primImg, alt: "Élèves de primaire en travail de groupe sur un projet" },
  { src: colImg, alt: "Adolescents en cours de sciences dans un laboratoire" },
];

export function Cycles() {
  const [active, setActive] = useState(0);
  return (
    <section className="container-site section-pad">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel chapter="03">Nos cycles</SectionLabel>
          <h2 className="mt-6 max-w-xl font-display text-4xl md:text-5xl">Un parcours continu, de 4 ans au baccalauréat</h2>
        </div>
        <Action to="/cycles" variant="tertiary">
          Voir tous les cycles
        </Action>
      </div>

      <div className="mt-12 flex flex-col gap-4 md:h-[460px] md:flex-row">
        {cycles.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={`Découvrir le cycle ${c.title}`}
            className={cn(
              "group relative overflow-hidden rounded-3xl text-left transition-all duration-500",
              "h-64 md:h-full",
              active === i ? "md:flex-[2.4]" : "md:flex-[1]",
            )}
          >
            <img
              src={cycleImages[i].src}
              alt={cycleImages[i].alt}
              loading="lazy"
              width={1200}
              height={912}
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/40 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-6">
              <span className="block font-display text-2xl text-white md:text-3xl">{c.title}</span>
              <span
                className={cn(
                  "mt-2 block max-w-sm text-sm text-white/85 transition-all duration-500",
                  active === i ? "opacity-100" : "opacity-0 md:max-h-0",
                )}
              >
                {c.lead} {c.text}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-teal-900">
                Découvrir
              </span>
            </span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-ink-600">
        {site.name} suit le programme marocain officiel avec un accent fort sur la maîtrise du français.
      </p>
    </section>
  );
}
