import { useState } from "react";
import {
  BookOpenCheck,
  Compass,
  Globe2,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Sparkles,
  Sprout,
  Users,
} from "lucide-react";
import { HeroFull } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { PullQuote } from "@/components/site/blocks/PullQuote";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { values } from "@/data/site";
import { cn } from "@/lib/utils";
import heroMission from "@/assets/hero-mission.jpg";
import valeursCour from "@/assets/valeurs-cour.jpg";
import trilinguisme from "@/assets/trilinguisme.jpg";

const piliers = [
  {
    icon: Sprout,
    title: "Confiance cognitive et psychologique",
    text: "Un élève qui croit en ses capacités d'apprendre, et qui ose se tromper pour progresser. Tout part de là : la confiance en soi est le premier outil de travail.",
  },
  {
    icon: Landmark,
    title: "Une identité nationale enrichie",
    text: "Enraciné dans sa culture et sa langue, l'élève découvre son pays et l'enrichit par l'échange positif avec ce qui l'entoure.",
  },
  {
    icon: Globe2,
    title: "Ouverture régionale et internationale",
    text: "Un projet éducatif innovant, inspiré de programmes pédagogiques reconnus mondialement, qui prépare à un monde ouvert.",
  },
];

const engagementsBento = [
  {
    title: "Offrir une expérience éducative de qualité",
    text: "Des pratiques d'enseignement évaluées et renouvelées chaque année.",
    icon: BookOpenCheck,
    span: "lg" as const,
    tone: "teal" as const,
  },
  {
    title: "Accompagner chaque élève vers la réussite",
    text: "Un suivi pédagogique et personnel, au rythme de chacun.",
    icon: HeartHandshake,
    span: "sm" as const,
  },
  {
    title: "Développer les compétences de demain",
    text: "Abstraction, analyse, synthèse, esprit critique et travail en équipe.",
    icon: Lightbulb,
    span: "sm" as const,
    tone: "sand" as const,
  },
  {
    title: "Transmettre des valeurs fortes et durables",
    text: "Respect, tolérance, solidarité : elles se vivent au quotidien.",
    image: valeursCour,
    imageAlt: "Élèves dans la cour de l'école",
    span: "lg" as const,
  },
  {
    title: "Éveiller les talents, révéler les potentiels",
    text: "Théâtre, échecs, musique, sport : des espaces pour se découvrir.",
    icon: Sparkles,
    span: "md" as const,
    tone: "coral" as const,
  },
  {
    title: "Allier tradition et innovation pédagogique",
    text: "Le programme officiel marocain, servi par des méthodes actuelles.",
    icon: Compass,
    span: "md" as const,
    tone: "grid" as const,
  },
];

export function MissionPage() {
  const [openValue, setOpenValue] = useState(0);

  return (
    <>
      <HeroFull
        chapter="01"
        eyebrow="Présentation"
        title="Notre mission"
        lead="Former un élève confiant, enraciné dans son identité et ouvert sur le monde, à travers un projet éducatif innovant."
        crumbs={[{ label: "Présentation" }, { label: "Mission" }]}
        image={heroMission}
        imageAlt="Une classe attentive à Madariss Tingis, Tanger"
        actions={
          <>
            <Action to="/projet-ecole" variant="light">
              Découvrir le projet d'école
            </Action>
            <Action to="/inscription" variant="secondary" className="border-white text-white hover:bg-white/10">
              Demande d'inscription
            </Action>
          </>
        }
      />

      {/* 2 — manifeste typographique */}
      <Section tone="paper" pattern="lines" chapter="02" eyebrow="Le manifeste" title="Ce que nous voulons pour chaque élève">
        <Reveal>
          <p className="max-w-5xl font-display text-2xl leading-[1.25] md:text-[2.75rem]">
            Former un élève{" "}
            <span className="hand-underline text-coral-700">confiant en ses capacités cognitives et psychologiques</span>,
            capable d'enrichir son{" "}
            <span className="hand-underline-teal text-teal-700">identité nationale</span> par la découverte et l'échange
            positif avec son <span className="hand-underline text-coral-700">environnement régional et international</span>,
            à travers un projet éducatif innovant inspiré de{" "}
            <span className="hand-underline-teal text-teal-700">programmes pédagogiques reconnus mondialement</span>.
          </p>
        </Reveal>
        <div className="mt-10 flex items-center gap-4">
          <img
            src={trilinguisme}
            alt="Travail en langues à Madariss Tingis"
            loading="lazy"
            className="tab-shape h-40 w-64 border-4 border-white object-cover shadow-soft"
          />
          <NoteMargin>trois langues, un seul objectif&nbsp;: comprendre le monde</NoteMargin>
        </div>
      </Section>

      {/* 3 — les 3 piliers */}
      <Section
        tone="sand"
        chapter="03"
        eyebrow="Les fondations"
        title="Trois piliers qui tiennent tout l'édifice"
        lead="Notre mission tient en trois convictions, indissociables les unes des autres."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {piliers.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-white p-8 shadow-soft">
                  <span
                    className="absolute -top-6 -right-2 font-display text-[7rem] leading-none font-bold text-coral-50"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="relative grid size-16 place-items-center rounded-3xl bg-teal-50 text-teal-700">
                    <Icon className="size-8" strokeWidth={1.5} />
                  </span>
                  <h3 className="relative mt-6 font-display text-2xl">{p.title}</h3>
                  <p className="relative mt-3 text-ink-600">{p.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 4 — engagements en bento */}
      <Section
        tone="paper"
        pattern="grid"
        chapter="04"
        eyebrow="Nos engagements"
        title="Six engagements tenus au quotidien"
      >
        <BentoGrid items={engagementsBento} />
      </Section>

      {/* 5 — valeurs en hexagones cliquables */}
      <Section
        tone="sand"
        chapter="05"
        eyebrow="Nos valeurs"
        title="Cinq valeurs, à toucher du doigt"
        lead="Cliquez sur une valeur pour lire ce qu'elle change concrètement pour votre enfant."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
          <div className="mx-auto flex max-w-sm flex-wrap justify-center gap-4">
            {values.map((v, i) => (
              <button
                key={v.title}
                type="button"
                onClick={() => setOpenValue(i)}
                aria-pressed={openValue === i}
                className={cn(
                  "grid size-28 place-items-center p-3 text-center text-xs font-bold transition-all duration-300 md:size-32",
                  openValue === i
                    ? "bg-coral-600 text-white shadow-lift"
                    : "bg-white text-teal-900 shadow-soft hover:bg-teal-50",
                )}
                style={{ clipPath: "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)" }}
              >
                {v.title.split(" ").slice(0, 3).join(" ")}
              </button>
            ))}
          </div>

          <Reveal key={openValue}>
            <div className="rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-10">
              <span className="grid size-12 place-items-center rounded-2xl bg-coral-50 text-coral-600">
                <Users className="size-6" strokeWidth={1.6} />
              </span>
              <h3 className="mt-5 font-display text-2xl md:text-3xl">{values[openValue]?.title}</h3>
              <p className="mt-4 text-lg text-ink-600">{values[openValue]?.text}</p>
              <NoteMargin className="mt-5 block">{values[openValue]?.note}</NoteMargin>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 6 — citation */}
      <Section tone="paper">
        <PullQuote
          quote="Apprendre aujourd'hui, réussir demain…"
          author="Madariss Tingis — Tanger"
          note="notre devise depuis toujours"
          tone="teal"
        />
        <div className="mt-10 flex justify-center">
          <Action to="/projet-ecole">
            Voir comment cela se traduit dans le projet d'école
          </Action>
        </div>
      </Section>

      <CtaBand
        title="Envie de rencontrer l'équipe ?"
        text="L'administration répond à vos questions et vous présente l'école."
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/projet-ecole", label: "Le projet d'école" }}
      />

      <RelatedPages
        links={[
          { to: "/projet-ecole", label: "Projet d'école", desc: "Nos quatre axes pédagogiques et la démarche qualité." },
          { to: "/cycles", label: "Nos cycles", desc: "De la maternelle au baccalauréat scientifique." },
          { to: "/nos-eleves", label: "Nos élèves", desc: "Créativité, leadership et espaces d'expression." },
        ]}
      />
    </>
  );
}
