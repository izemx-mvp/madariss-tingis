import { useEffect, useState } from "react";
import {
  Baby,
  BookOpen,
  Brain,
  Calculator,
  FlaskConical,
  Globe2,
  GraduationCap,
  Handshake,
  Languages,
  Palette,
  PencilRuler,
  Sigma,
  Target,
} from "lucide-react";
import { HeroSplit } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { ComparisonTable } from "@/components/site/blocks/ComparisonTable";
import { TimelineVertical } from "@/components/site/blocks/Timeline";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { cn } from "@/lib/utils";
import heroCycles from "@/assets/hero-cycles.jpg";
import cycleMaternelle from "@/assets/cycle-maternelle.jpg";
import cyclePrimaire from "@/assets/cycle-primaire.jpg";
import cycleCollege from "@/assets/cycle-college-lycee.jpg";

const sections = [
  { id: "maternelle", label: "Maternelle" },
  { id: "primaire", label: "Primaire" },
  { id: "college-lycee", label: "Collège – Lycée" },
];

function StickyTabs() {
  const [active, setActive] = useState("maternelle");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-140px 0px -60% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <div className="sticky top-[4.5rem] z-30 border-y border-line bg-paper/90 backdrop-blur">
      <div className="container-site flex gap-2 overflow-x-auto py-3">
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300",
              active === s.id ? "bg-coral-600 text-white shadow-soft" : "text-ink-600 hover:bg-sand",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CyclesPage() {
  return (
    <>
      <HeroSplit
        chapter="03"
        eyebrow="Présentation"
        title="Nos cycles"
        lead="Maternelle, primaire, collège et lycée : quatre âges, un même fil conducteur, jusqu'au baccalauréat scientifique."
        crumbs={[{ label: "Présentation" }, { label: "Cycles" }]}
        note="tous les âges, une même école"
        image={heroCycles}
        imageAlt="Élèves de tous âges dans la cour de Madariss Tingis"
        badge="De la maternelle au baccalauréat"
        actions={
          <>
            <Action to="/conditions-admission">Conditions d'admission</Action>
            <Action to="/horaires" variant="secondary">
              Les horaires par niveau
            </Action>
          </>
        }
      />

      <StickyTabs />

      {/* MATERNELLE */}
      <Section
        id="maternelle"
        tone="paper"
        pattern="grid"
        chapter="04"
        eyebrow="Maternelle"
        title="Une maison commune où chaque enfant se sent chez lui"
      >
        <SplitFeature
          eyebrow="Les premiers pas"
          title="Entrer dans les apprentissages en confiance"
          text={
            <p>
              En maternelle, l'enfant apprend d'abord à se sentir bien. L'école devient une maison commune : un lieu
              familier où il ose parler, essayer, se tromper et recommencer.
            </p>
          }
          image={cycleMaternelle}
          imageAlt="Salle de classe de maternelle"
          note="on commence par se sentir bien"
        />

        <div className="mt-16">
          <h3 className="font-display text-2xl md:text-3xl">Cinq apprentissages fondateurs</h3>
          <div className="mt-8">
            <IconCardGrid
              columns={3}
              cards={[
                { icon: BookOpen, title: "Le plaisir de lire", text: "Découvrir les histoires et les livres avant même de savoir lire seul." },
                { icon: PencilRuler, title: "Écrire", text: "Apprendre le geste, la trace, puis les premiers mots." },
                { icon: Palette, title: "Exprimer sa personnalité", text: "Prendre la parole, montrer ce qu'on aime, oser dire." },
                { icon: Calculator, title: "Compter et résoudre", text: "Compter, comparer et résoudre ses premiers problèmes." },
                { icon: Handshake, title: "Vivre ensemble", text: "Partager, attendre son tour, aider et se faire aider." },
                { icon: Baby, title: "L'éveil aux arts", text: "Dessin, musique et création : l'imaginaire au travail." },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* PRIMAIRE */}
      <Section
        id="primaire"
        tone="sand"
        chapter="05"
        eyebrow="Primaire"
        title="Le programme officiel, avec un français renforcé"
        lead="Trois engagements de l'école, et quatre chantiers quotidiens en classe."
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="rounded-[2rem] border border-line bg-white p-8 shadow-soft">
              <h3 className="font-display text-2xl">Nos engagements au primaire</h3>
              <ul className="mt-6 space-y-4">
                {[
                  "Une formation intellectuelle, morale et citoyenne",
                  "Une éducation humaniste : excellence, respect, ouverture culturelle, penser par soi-même",
                  "Le programme officiel marocain, avec un français renforcé et l'anglais",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-1 size-2.5 shrink-0 rounded-full bg-coral-600" />
                    <span className="text-ink-600">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="text-xs font-bold tracking-[0.16em] text-teal-700 uppercase">Place des langues</p>
                {[
                  { lang: "Arabe", pct: 100, color: "bg-teal-700" },
                  { lang: "Français renforcé", pct: 85, color: "bg-coral-600" },
                  { lang: "Anglais", pct: 55, color: "bg-teal-500" },
                ].map((l) => (
                  <div key={l.lang} className="mt-4">
                    <div className="flex justify-between text-sm font-bold text-ink-900">
                      <span>{l.lang}</span>
                    </div>
                    <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sand">
                      <div className={cn("h-full rounded-full", l.color)} style={{ width: `${l.pct}%` }} />
                    </div>
                  </div>
                ))}
                <NoteMargin className="mt-4 block">trois langues, dès le plus jeune âge</NoteMargin>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <img
              src={cyclePrimaire}
              alt="Classe de primaire à Madariss Tingis"
              loading="lazy"
              className="tab-shape mb-10 aspect-[16/10] w-full border-4 border-white object-cover shadow-lift"
            />
            <h3 className="mb-6 font-display text-2xl">Dans nos classes, les enseignants œuvrent à…</h3>
            <TimelineVertical
              items={[
                { label: "Étape 1", title: "Construire le socle commun", text: "Lire, écrire, compter et raisonner : les bases sur lesquelles tout repose." },
                { label: "Étape 2", title: "Accompagner chaque élève", text: "Un accompagnement pédagogique et personnel, ajusté aux besoins de l'élève." },
                { label: "Étape 3", title: "Travailler en projet et en équipe", text: "Des travaux interdisciplinaires qui relient les matières entre elles." },
                { label: "Étape 4", title: "Apprendre le vivre-ensemble", text: "Le respect, l'entraide et la reconnaissance du travail bien fait." },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      {/* COLLÈGE – LYCÉE */}
      <Section
        id="college-lycee"
        tone="paper"
        pattern="lines"
        chapter="06"
        eyebrow="Collège – Lycée"
        title="Cap sur le baccalauréat scientifique"
        lead="Les grandes années où l'élève construit son autonomie intellectuelle et son projet d'orientation."
      >
        <BentoGrid
          items={[
            {
              title: "Un baccalauréat scientifique",
              text: "Sciences mathématiques, sciences physiques et sciences de la vie et de la Terre : trois voies pour un même cap.",
              icon: FlaskConical,
              span: "lg",
              tone: "teal",
            },
            {
              title: "Trois langues d'enseignement",
              text: "Arabe, français et anglais accompagnent l'élève jusqu'au baccalauréat.",
              icon: Languages,
              span: "sm",
              tone: "sand",
            },
            {
              title: "Quatre compétences travaillées",
              text: "Abstraction, analyse, synthèse et esprit critique.",
              icon: Brain,
              span: "sm",
            },
            {
              title: "Ouverture aux réalités du monde",
              text: "Les enseignements s'ancrent dans le réel : sciences, société, environnement.",
              image: cycleCollege,
              imageAlt: "Lycéens en salle de sciences",
              span: "lg",
            },
            {
              title: "Un projet personnel",
              text: "Chaque élève apprend à formuler ce qu'il veut faire, et pourquoi.",
              icon: Target,
              span: "md",
              tone: "coral",
            },
            {
              title: "Une orientation universitaire réussie",
              text: "L'objectif : entrer dans l'enseignement supérieur avec un dossier et un cap clairs.",
              icon: GraduationCap,
              span: "md",
              tone: "grid",
            },
          ]}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Sigma, title: "Sciences mathématiques", text: "La voie de l'abstraction et de la démonstration." },
            { icon: FlaskConical, title: "Sciences physiques", text: "Comprendre la matière, l'énergie et leurs lois." },
            { icon: Globe2, title: "Sciences de la vie et de la Terre", text: "Le vivant, la santé et l'environnement." },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="h-full rounded-3xl border-2 border-dashed border-teal-500/40 bg-white/70 p-6">
                  <Icon className="size-7 text-teal-700" strokeWidth={1.6} />
                  <h4 className="mt-4 font-display text-lg">{f.title}</h4>
                  <p className="mt-2 text-sm text-ink-600">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="sand" chapter="07" eyebrow="Synthèse" title="En un coup d'œil">
        <ComparisonTable
          columns={["Maternelle", "Primaire", "Collège – Lycée"]}
          caption="Les horaires détaillés, niveau par niveau, sont présentés sur la page Horaires."
          rows={[
            {
              label: "Ce qui se joue",
              cells: [
                "Se sentir chez soi, entrer dans les apprentissages",
                "Construire le socle commun et l'autonomie",
                "Abstraction, analyse, esprit critique, orientation",
              ],
            },
            {
              label: "Langues",
              cells: ["Éveil et expression orale", "Programme officiel, français renforcé, anglais", "Trois langues d'enseignement"],
            },
            {
              label: "Horaires",
              cells: [
                "Lun–jeu 8h30–15h30 · Ven 8h30–13h30",
                "Lun–jeu 8h30–15h30 (sauf 6e) · Ven 8h30–13h30",
                "Collège et 6e : lun–jeu 8h00–16h00 · Lycée : 8h30–15h30",
              ],
            },
            {
              label: "Activités",
              cells: ["Éveil aux arts, jeux collectifs", "Théâtre, musique, sport, échecs", "Théâtre, échecs, sport, projets d'équipe"],
            },
          ]}
        />
      </Section>

      <CtaBand
        title="Quel cycle pour votre enfant ?"
        text="Un test d'accès au niveau permet de situer l'élève avant l'inscription définitive."
        primary={{ to: "/conditions-admission", label: "Conditions d'admission" }}
        secondary={{ to: "/inscription", label: "Demande d'inscription" }}
      />

      <RelatedPages
        links={[
          { to: "/horaires", label: "Horaires", desc: "La journée et la semaine, niveau par niveau." },
          { to: "/fournitures-manuels", label: "Fournitures & manuels", desc: "Les listes par cycle et la BCD." },
          { to: "/projet-ecole", label: "Projet d'école", desc: "Les quatre axes pédagogiques." },
        ]}
      />
    </>
  );
}
