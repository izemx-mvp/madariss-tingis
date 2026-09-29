import {
  Award,
  Baby,
  BookMarked,
  GraduationCap,
  Languages,
  MonitorSmartphone,
  Palette,
  PencilRuler,
  School,
  Users,
} from "lucide-react";
import { HeroPattern } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { TimelineHorizontal } from "@/components/site/blocks/Timeline";
import { TabsPill } from "@/components/site/blocks/TabsPill";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { SCHOOL_YEAR, site } from "@/data/site";
import heroProjet from "@/assets/hero-projet-ecole.jpg";
import partenariat from "@/assets/partenariat-parents.jpg";
import cycleMaternelle from "@/assets/cycle-maternelle.jpg";
import cyclePrimaire from "@/assets/cycle-primaire.jpg";
import cycleCollege from "@/assets/cycle-college-lycee.jpg";
import trilinguisme from "@/assets/trilinguisme.jpg";

const parcours = [
  {
    label: "Premiers pas",
    title: "Maternelle",
    text: "Une maison commune où chaque enfant se sent chez lui : le plaisir de lire, d'écrire, de compter et d'exprimer sa personnalité.",
    icon: Baby,
  },
  {
    label: "Le socle",
    title: "Primaire",
    text: "Le programme officiel marocain avec un français renforcé, un accompagnement personnel et des travaux en projet et en équipe.",
    icon: PencilRuler,
  },
  {
    label: "L'approfondissement",
    title: "Collège",
    text: "L'élève apprend à abstraire, analyser, synthétiser et exercer son esprit critique, dans trois langues d'enseignement.",
    icon: BookMarked,
  },
  {
    label: "Le cap",
    title: "Lycée",
    text: "La préparation du baccalauréat scientifique : sciences mathématiques, sciences physiques et sciences de la vie et de la Terre.",
    icon: School,
  },
  {
    label: "L'après",
    title: "Orientation universitaire",
    text: "Chaque élève construit un projet personnel et une orientation universitaire réussie, ouverte sur les réalités du monde.",
    icon: GraduationCap,
  },
];

const axes = [
  {
    id: "intellectuelle",
    label: "Formation intellectuelle",
    title: "Une formation intellectuelle, morale et citoyenne",
    text: "L'école ne se contente pas de transmettre des savoirs : elle forme un citoyen. Le travail intellectuel s'accompagne d'une exigence morale et d'une conscience citoyenne, apprises dans la classe comme dans la cour.",
    points: [
      "Un socle commun de connaissances solide et exigeant",
      "Le respect des règles comme apprentissage de la vie en société",
      "La reconnaissance du travail bien fait",
    ],
    image: cyclePrimaire,
    alt: "Élèves en classe de primaire",
  },
  {
    id: "humaniste",
    label: "Éducation humaniste",
    title: "Une éducation humaniste",
    text: "Excellence, respect, ouverture culturelle et capacité à penser par soi-même : nos élèves apprennent autant à raisonner qu'à écouter.",
    points: [
      "L'excellence comme exigence, jamais comme compétition",
      "Le respect de l'autre et l'ouverture culturelle",
      "Apprendre à penser par soi-même",
    ],
    image: cycleMaternelle,
    alt: "Atelier d'éveil en maternelle",
  },
  {
    id: "langues",
    label: "Français et anglais",
    title: "La maîtrise du français, l'anglais ouvert sur le monde",
    text: "Le programme officiel marocain est servi par un français renforcé, et l'anglais accompagne l'élève vers les réalités internationales.",
    points: [
      "Un français renforcé dès les premières années",
      "Un anglais tourné vers l'ouverture internationale",
      "Trois langues d'enseignement au collège et au lycée",
    ],
    image: trilinguisme,
    alt: "Travail des langues à Madariss Tingis",
  },
  {
    id: "vivre-ensemble",
    label: "Vivre-ensemble",
    title: "Le vivre-ensemble, tous les jours",
    text: "Travail d'équipe, autonomie, créativité, goût de l'effort et reconnaissance du travail bien fait : ces qualités se construisent en groupe.",
    points: [
      "Le travail d'équipe et l'autonomie",
      "La créativité et le goût de l'effort",
      "La reconnaissance du travail bien fait",
    ],
    image: cycleCollege,
    alt: "Élèves du collège et du lycée",
  },
];

export function ProjetEcolePage() {
  return (
    <>
      <HeroPattern
        chapter="02"
        eyebrow="Présentation"
        title="Le projet d'école"
        lead="De la maternelle au baccalauréat, un parcours pensé d'un seul tenant, quatre axes pédagogiques et une démarche qualité engagée."
        crumbs={[{ label: "Présentation" }, { label: "Projet d'école" }]}
        note="un fil conducteur, douze années durant"
        icons={[PencilRuler, Languages, Palette, BookMarked, GraduationCap]}
        image={heroProjet}
        imageAlt="Élèves travaillant sur un projet interdisciplinaire"
        actions={
          <>
            <Action to="/cycles">Voir les cycles en détail</Action>
            <Action to="/mission" variant="secondary">
              Notre mission
            </Action>
          </>
        }
      />

      <Section
        tone="sand"
        chapter="03"
        eyebrow="Le parcours"
        title="De la maternelle au baccalauréat"
        lead="Cliquez sur une étape pour découvrir ce qui s'y joue."
      >
        <TimelineHorizontal items={parcours} />
      </Section>

      <Section
        tone="paper"
        pattern="grid"
        chapter="04"
        eyebrow="Nos axes"
        title="Quatre axes pédagogiques"
        lead="Ils structurent l'enseignement à tous les niveaux de l'école."
        align="center"
      >
        <TabsPill
          tabs={axes.map((axe) => ({
            id: axe.id,
            label: axe.label,
            content: (
              <SplitFeature
                eyebrow={axe.label}
                title={axe.title}
                text={<p>{axe.text}</p>}
                points={axe.points}
                image={axe.image}
                imageAlt={axe.alt}
              />
            ),
          }))}
        />
      </Section>

      <Section
        tone="teal"
        pattern="zellige"
        chapter="05"
        eyebrow="Démarche qualité"
        title="Une école qui s'évalue elle-même"
        lead="Trois chantiers concrets engagés pour l'année scolaire en cours."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Award,
              title: "Démarche ISO 21001",
              text: `Une certification dédiée aux organisations éducatives. La démarche a été lancée en ${SCHOOL_YEAR}.`,
            },
            {
              icon: Users,
              title: "Formation annuelle des enseignants",
              text: "Un programme de formation renouvelé chaque année pour faire évoluer les pratiques de classe.",
            },
            {
              icon: MonitorSmartphone,
              title: "Pronote",
              text: "L'outil privilégié de communication entre l'école et les familles : suivi, notes et informations.",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <article className="h-full rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur">
                  <span className="grid size-14 place-items-center rounded-2xl bg-white/15 text-white">
                    <Icon className="size-7" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Action href={site.pronote} variant="light">
            Ouvrir Pronote
          </Action>
        </div>
      </Section>

      <Section
        tone="paper"
        chapter="06"
        eyebrow="Le partenariat"
        title="École, parents, élève : un triangle"
        lead="Rien ne fonctionne si l'un des trois sommets manque."
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <svg viewBox="0 0 320 300" className="absolute inset-0 size-full" aria-hidden="true">
                <path
                  d="M160 42 L288 252 L32 252 Z"
                  fill="none"
                  stroke="var(--teal-500)"
                  strokeWidth="3"
                  strokeDasharray="8 10"
                  strokeLinejoin="round"
                />
              </svg>
              {[
                { label: "L'école", sub: "Enseigner et accompagner", pos: "left-1/2 top-0 -translate-x-1/2", tone: "bg-coral-600 text-white" },
                { label: "Les parents", sub: "Suivre et soutenir", pos: "right-0 bottom-0", tone: "bg-teal-700 text-white" },
                { label: "L'élève", sub: "S'engager et progresser", pos: "left-0 bottom-0", tone: "bg-white text-teal-900 border border-line" },
              ].map((node) => (
                <div
                  key={node.label}
                  className={`absolute ${node.pos} grid size-32 place-items-center rounded-full p-3 text-center shadow-lift ${node.tone}`}
                >
                  <span>
                    <span className="block font-display text-base font-bold">{node.label}</span>
                    <span className="mt-1 block text-[0.7rem] leading-tight opacity-80">{node.sub}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <img
              src={partenariat}
              alt="Des parents échangent avec une enseignante"
              loading="lazy"
              className="tab-shape-alt w-full border-4 border-white object-cover shadow-lift"
            />
            <p className="mt-6 text-ink-600">
              Pronote est l'outil privilégié de communication entre l'école et les parents. Pour tout le reste,
              l'administration reste joignable par téléphone et par email.
            </p>
            <NoteMargin className="mt-4 block">on avance mieux à trois</NoteMargin>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand" chapter="07" eyebrow="En pratique" title="Poursuivre la visite">
        <IconCardGrid
          columns={3}
          cards={[
            {
              icon: School,
              title: "Nos cycles",
              text: "Maternelle, primaire, collège et lycée : le détail de chaque niveau.",
              to: "/cycles",
            },
            {
              icon: BookMarked,
              title: "Règlement intérieur",
              text: "Admission, fréquentation, hygiène et vie scolaire : le texte complet.",
              to: "/reglement-interieur",
            },
            {
              icon: GraduationCap,
              title: "Conditions d'admission",
              text: "Les quatre étapes de l'inscription et les pièces du dossier.",
              to: "/conditions-admission",
            },
          ]}
        />
      </Section>

      <CtaBand
        title="Un projet qui vous parle ?"
        text="Déposez une demande d'inscription ou venez rencontrer l'équipe."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
      />

      <RelatedPages
        links={[
          { to: "/mission", label: "Notre mission", desc: "Les trois piliers et les six engagements." },
          { to: "/cycles", label: "Nos cycles", desc: "De la maternelle au baccalauréat scientifique." },
          { to: "/note-de-rentree-2026-2027", label: "Note de rentrée", desc: "Les nouveautés de l'année scolaire." },
        ]}
      />
    </>
  );
}
