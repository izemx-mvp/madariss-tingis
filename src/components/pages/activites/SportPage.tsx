import { useState } from "react";
import { motion } from "motion/react";
import { Activity, Dumbbell, Flag, HeartPulse, Medal, Scale, Timer, Trophy, Users } from "lucide-react";
import { HeroFull } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { MasonryGallery } from "@/components/site/blocks/MasonryGallery";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";
import { cn } from "@/lib/utils";
import { ActivitiesBand } from "./ActivitiesBand";

const disciplines = [
  {
    id: "football",
    label: "Football",
    icon: Trophy,
    title: "Jouer collectif",
    text: "Se placer, passer, soutenir un coéquipier : le football apprend que l'on gagne ensemble.",
    skills: ["Coopération", "Placement", "Fair-play"],
  },
  {
    id: "basket",
    label: "Basket",
    icon: Activity,
    title: "Vitesse et précision",
    text: "Dribbler, feinter, viser juste : le basket développe l'adresse et la prise de décision rapide.",
    skills: ["Adresse", "Réactivité", "Communication"],
  },
  {
    id: "athletisme",
    label: "Athlétisme",
    icon: Timer,
    title: "Se dépasser",
    text: "Courir, sauter, lancer : chacun progresse à son rythme et mesure ses propres progrès.",
    skills: ["Endurance", "Persévérance", "Confiance"],
  },
  {
    id: "gym",
    label: "Gymnastique",
    icon: Dumbbell,
    title: "Maîtriser son corps",
    text: "Équilibre, souplesse et coordination : la gymnastique demande concentration et rigueur.",
    skills: ["Équilibre", "Coordination", "Concentration"],
  },
];

function DisciplinePicker() {
  const [id, setId] = useState(disciplines[0]?.id ?? "");
  const current = disciplines.find((d) => d.id === id) ?? disciplines[0];
  if (!current) return null;
  const Icon = current.icon;

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="grid grid-cols-2 gap-4">
        {disciplines.map((d) => {
          const DIcon = d.icon;
          const on = d.id === current.id;
          return (
            <button
              key={d.id}
              type="button"
              aria-pressed={on}
              onClick={() => setId(d.id)}
              className={cn(
                "flex aspect-square flex-col items-center justify-center gap-3 rounded-[2rem] border-2 transition-all duration-300",
                on ? "border-coral-600 bg-coral-600 text-white shadow-lift" : "border-line bg-white text-teal-900 hover:border-teal-500",
              )}
            >
              <DIcon className="size-10" strokeWidth={1.4} />
              <span className="font-display text-xl">{d.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={current.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] bg-teal-900 p-8 text-white md:p-12"
      >
        <div className="zellige absolute inset-0" aria-hidden="true" />
        <Icon className="absolute -right-6 -bottom-6 size-48 text-white/5" strokeWidth={1} />
        <div className="relative">
          <p className="text-sm font-bold text-teal-500">{current.label}</p>
          <h3 className="mt-2 font-display text-4xl text-white">{current.title}</h3>
          <p className="mt-4 text-lg text-white/85">{current.text}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {current.skills.map((s) => (
              <span key={s} className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SportPage() {
  return (
    <>
      <HeroFull
        chapter="01"
        eyebrow="Activités"
        title="Le sport, école de l'équipe"
        lead="Courir, jouer, perdre, recommencer, gagner ensemble : le sport apprend l'effort et le respect des règles autant que la forme physique."
        crumbs={[{ label: "Activités" }, { label: "Sport" }]}
        image={media.sport.hero.src}
        imageAlt={media.sport.hero.alt}
        stamp={["Esprit", "d'équipe"]}
        actions={
          <>
            <Action to="/photos" variant="light">
              Voir les photos
            </Action>
            <Action to="/inscription" variant="secondary" className="border-white text-white hover:bg-white/10">
              Inscrire mon enfant
            </Action>
          </>
        }
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {disciplines.map((d) => (
            <span key={d.id} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">
              {d.label}
            </span>
          ))}
        </div>
      </HeroFull>

      <Section tone="paper" pattern="grid" chapter="02" eyebrow="Les disciplines" title="Choisissez un sport" lead="Chaque discipline travaille des qualités différentes.">
        <DisciplinePicker />
      </Section>

      <Section tone="white" chapter="03" eyebrow="Pourquoi le sport" title="Bien plus qu'une dépense d'énergie">
        <BentoGrid
          items={[
            { title: "L'esprit d'équipe", text: "Jouer pour les autres, se faire confiance, partager la victoire comme la défaite.", icon: Users, span: "lg", tone: "coral" },
            { title: "L'effort", text: "Persévérer, s'entraîner, progresser.", icon: Medal, span: "sm", tone: "sand" },
            { title: "Le respect des règles", text: "Arbitre, adversaires, coéquipiers : le fair-play avant tout.", icon: Scale, span: "sm", tone: "white" },
            { title: "La santé", text: "Bouger chaque semaine pour grandir en forme.", icon: HeartPulse, span: "sm", tone: "teal" },
            { title: "Sur le terrain", image: media.sport.hero.src, imageAlt: media.sport.hero.alt, text: "Des moments intenses, partagés entre élèves.", span: "sm", tone: "white" },
          ]}
        />
      </Section>

      <Section tone="paper" chapter="04" eyebrow="En images" title="Sur le terrain">
        <MasonryGallery images={media.sport.gallery} />
        <div className="mt-8 flex items-center gap-3">
          <Flag className="size-5 text-coral-600" strokeWidth={1.7} />
          <NoteMargin>cliquez sur une photo pour l'agrandir</NoteMargin>
        </div>
      </Section>

      <ActivitiesBand current="sport" chapter="05" />

      <CtaBand
        title="Votre enfant a l'esprit sportif ?"
        text="Découvrez une école où l'on apprend aussi sur le terrain."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/nos-eleves", label: "Nos élèves" }}
        tone="coral"
      />
    </>
  );
}
