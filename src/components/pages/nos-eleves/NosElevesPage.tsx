import { ChefHat, Drama, Music4, Puzzle, Sparkles, Target, Trophy, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HeroSplit } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { MasonryGallery } from "@/components/site/blocks/MasonryGallery";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { StatCounter } from "@/components/site/blocks/StatCounter";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import heroEleves from "@/assets/hero-nos-eleves.jpg";
import sport from "@/assets/sport-1.jpg";
import theatre from "@/assets/theatre-1.jpg";
import echecs from "@/assets/echecs-1.jpg";
import musique from "@/assets/musique-1.jpg";
import cour from "@/assets/valeurs-cour.jpg";
import masterChef from "@/assets/master-chef-junior.jpg";

const qualites = [
  {
    icon: Users,
    title: "Le travail d'équipe",
    text: "Apprendre à répartir les rôles, à écouter et à porter un projet à plusieurs : la classe devient un collectif.",
    note: "on va plus loin ensemble",
  },
  {
    icon: Target,
    title: "L'autonomie",
    text: "Organiser son travail, chercher avant de demander, se relire : les gestes qui rendent un élève libre.",
    note: "chercher d'abord",
  },
  {
    icon: Sparkles,
    title: "La créativité",
    text: "Proposer, essayer, se tromper, recommencer autrement. Les activités artistiques y ont une place centrale.",
    note: "oser proposer",
  },
  {
    icon: Trophy,
    title: "Le goût de l'effort",
    text: "Le travail bien fait est reconnu et valorisé : l'élève apprend que la persévérance produit des résultats.",
    note: "l'effort paie",
  },
];

export function NosElevesPage() {
  return (
    <>
      <HeroSplit
        chapter="07"
        eyebrow="Vie scolaire"
        title="Nos élèves : créativité & leadership"
        lead="Ce que nos élèves développent au-delà des programmes : le travail d'équipe, l'autonomie, la créativité et le goût de l'effort."
        crumbs={[{ label: "Vie scolaire" }, { label: "Nos élèves" }]}
        note="l'école, c'est aussi ce qu'on devient"
        image={heroEleves}
        imageAlt="Trois élèves de Madariss Tingis, créatifs et confiants"
        badge="Créativité & leadership"
        actions={
          <>
            <Action to="/photos">Galerie photos</Action>
            <Action to="/evenements" variant="secondary">
              Nos événements
            </Action>
          </>
        }
      />

      <Section
        tone="paper"
        pattern="grid"
        chapter="08"
        eyebrow="Ce qu'ils développent"
        title="Quatre qualités travaillées chaque jour"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {qualites.map((q, i) => {
            const Icon = q.icon;
            return (
              <Reveal key={q.title} delay={i * 0.07}>
                <article className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-10">
                  <span
                    className="absolute -top-4 -right-1 font-display text-[6rem] leading-none font-bold text-sand"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <span className="relative grid size-16 place-items-center rounded-3xl bg-coral-50 text-coral-600">
                    <Icon className="size-8" strokeWidth={1.5} />
                  </span>
                  <h3 className="relative mt-6 font-display text-2xl md:text-3xl">{q.title}</h3>
                  <p className="relative mt-3 text-ink-600">{q.text}</p>
                  <NoteMargin className="relative mt-5 block">{q.note}</NoteMargin>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        tone="sand"
        chapter="09"
        eyebrow="Espaces d'expression"
        title="Quatre lieux pour se découvrir"
        lead="Chaque activité ouvre une porte différente."
      >
        <IconCardGrid
          columns={4}
          cards={[
            { icon: Drama, title: "Théâtre", text: "Prendre la parole, habiter un rôle, gagner en confiance.", to: "/theatre", image: theatre },
            { icon: Puzzle, title: "Échecs", text: "Anticiper, se concentrer, accepter de perdre pour progresser.", to: "/echecs", image: echecs },
            { icon: Music4, title: "Musique", text: "Écouter, s'accorder aux autres, développer sa sensibilité.", to: "/musique", image: musique },
            { icon: Trophy, title: "Sport", text: "L'esprit d'équipe, le respect des règles et le goût de l'effort.", to: "/sport", image: sport },
          ]}
        />
      </Section>

      <Section tone="paper" pattern="lines" chapter="10" eyebrow="Temps fort" title="Master Chef Junior">
        <Reveal>
          <article className="grid overflow-hidden rounded-[2.5rem] border border-line bg-white shadow-lift lg:grid-cols-2">
            <img
              src={masterChef}
              alt="Les élèves lors de l'événement Master Chef Junior"
              loading="lazy"
              className="h-full min-h-72 w-full object-cover"
            />
            <div className="p-8 md:p-12">
              <span className="inline-flex items-center gap-2 rounded-full bg-coral-50 px-4 py-1.5 text-xs font-bold tracking-wide text-coral-700 uppercase">
                <ChefHat className="size-4" strokeWidth={1.8} /> Événement scolaire
              </span>
              <h3 className="mt-5 font-display text-3xl md:text-4xl">Master Chef Junior</h3>
              <p className="mt-4 text-ink-600">
                Un concours culinaire où les élèves组 forment des équipes, imaginent une recette et la présentent devant
                un jury. Créativité, organisation et travail d'équipe, tout y passe.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/evenements/$slug"
                  params={{ slug: "master-chef-junior" }}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:bg-coral-700"
                >
                  Découvrir l'événement
                </Link>
                <Action to="/evenements" variant="secondary">
                  Tous les événements
                </Action>
              </div>
            </div>
          </article>
        </Reveal>
      </Section>

      <Section
        tone="sand"
        chapter="11"
        eyebrow="Le mur des talents"
        title="L'école en images"
        lead="Cliquez sur une photo pour l'agrandir ; naviguez au clavier ou par glissement."
      >
        <MasonryGallery
          images={[
            { src: theatre, alt: "Atelier théâtre", caption: "Atelier théâtre" },
            { src: echecs, alt: "Tournoi d'échecs", caption: "Tournoi d'échecs" },
            { src: sport, alt: "Séance de sport", caption: "Séance de sport" },
            { src: musique, alt: "Atelier musique", caption: "Atelier musique" },
            { src: cour, alt: "Récréation dans la cour", caption: "Récréation dans la cour" },
            { src: masterChef, alt: "Master Chef Junior", caption: "Master Chef Junior" },
          ]}
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <Action to="/photos">Toute la galerie photos</Action>
          <Action to="/videos" variant="secondary">
            Galerie vidéo
          </Action>
        </div>
      </Section>

      <Section tone="paper" chapter="12" eyebrow="Réussir ensemble" title="Une année qui compte">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              <StatCounter value={100} suffix=" %" label="Taux de réussite" sub="Années certifiantes 2024/2025 (≈ 100 %)" />
              <StatCounter value={4} label="Espaces d'expression" sub="Théâtre, échecs, musique, sport" />
            </div>
            <NoteMargin className="mt-6 block">bravo à tous nos élèves</NoteMargin>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={cour}
              alt="Élèves rassemblés dans la cour de l'école"
              loading="lazy"
              className="tab-shape-alt w-full border-4 border-white object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Votre enfant a sa place ici"
        text="Découvrez les conditions d'admission et déposez une demande d'inscription."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/conditions-admission", label: "Conditions d'admission" }}
      />

      <RelatedPages
        links={[
          { to: "/photos", label: "Galerie photos", desc: "Les moments forts de la vie scolaire." },
          { to: "/evenements", label: "Événements scolaires", desc: "Ce qui se prépare cette année." },
          { to: "/mission", label: "Notre mission", desc: "Les valeurs qui portent ces qualités." },
        ]}
      />
    </>
  );
}
