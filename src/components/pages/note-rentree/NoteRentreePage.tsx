import { Award, CalendarDays, GraduationCap, MonitorSmartphone, Users } from "lucide-react";
import { HeroFull } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { PullQuote } from "@/components/site/blocks/PullQuote";
import { StickyTOC } from "@/components/site/blocks/StickyTOC";
import { StatCounter } from "@/components/site/blocks/StatCounter";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { SCHOOL_YEAR, site } from "@/data/site";
import heroRentree from "@/assets/hero-note-rentree.jpg";
import valeursCour from "@/assets/valeurs-cour.jpg";

export function NoteRentreePage() {
  return (
    <>
      <HeroFull
        chapter="02"
        eyebrow="Vie scolaire"
        title={`Note de rentrée ${SCHOOL_YEAR}`}
        lead="Le mot de l'équipe de Madariss Tingis aux familles, à l'ouverture de la nouvelle année scolaire."
        crumbs={[{ label: "Vie scolaire" }, { label: "Note de rentrée" }]}
        image={heroRentree}
        imageAlt="Familles et enseignants le jour de la rentrée"
        stamp={["Rentrée", SCHOOL_YEAR]}
        actions={
          <>
            <Action href={site.pronote} variant="light">
              Accéder à Pronote
            </Action>
            <Action to="/calendrier" variant="secondary" className="border-white text-white hover:bg-white/10">
              Voir le calendrier
            </Action>
          </>
        }
      />

      <Section
        tone="sand"
        chapter="03"
        eyebrow="Cette année"
        title="Les trois nouveautés"
        lead={`Ce qui change concrètement à Madariss Tingis pour l'année ${SCHOOL_YEAR}.`}
      >
        <IconCardGrid
          columns={3}
          numbered
          cards={[
            {
              icon: Award,
              title: "Démarche ISO 21001",
              text: `L'école engage une démarche de certification ISO 21001, dédiée aux organisations éducatives. Le chantier démarre en ${SCHOOL_YEAR}.`,
              note: "un cap qualité",
            },
            {
              icon: Users,
              title: "Formation annuelle des enseignants",
              text: "Le programme de formation de l'équipe pédagogique est renouvelé, avec Monsieur Abdelkader FARHANI.",
            },
            {
              icon: MonitorSmartphone,
              title: "Pronote",
              text: "Pronote devient l'outil privilégié de communication entre l'école et les parents : suivi, notes, informations.",
            },
          ]}
        />
      </Section>

      <Section tone="paper" pattern="grid" chapter="04" eyebrow="La lettre" title="Le mot de l'équipe">
        <div className="grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <StickyTOC
            title="Dans cette lettre"
            items={[
              { id: "lettre-accueil", label: "Bienvenue" },
              { id: "lettre-bilan", label: "Le bilan de l'an passé" },
              { id: "lettre-approche", label: "Notre approche" },
              { id: "lettre-equipe", label: "La ressource humaine" },
            ]}
          />

          <Reveal>
            <article className="relative overflow-hidden rounded-[2rem] border border-line bg-paper p-8 shadow-lift md:p-14">
              <div className="paper-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="relative space-y-6 text-lg leading-relaxed text-ink-600">
                <p className="font-display text-2xl text-teal-900">Chers parents, chers élèves,</p>

                <div id="lettre-accueil" className="scroll-mt-32 space-y-4">
                  <p>
                    Nous souhaitons la bienvenue à toutes les familles nouvellement inscrites à Madariss Tingis, et nous
                    remercions chaleureusement les parents qui nous renouvellent leur confiance, parfois depuis de
                    nombreuses années. Votre fidélité est l'un des moteurs de notre travail.
                  </p>
                </div>

                <div id="lettre-bilan" className="scroll-mt-32 space-y-4">
                  <p>
                    L'année 2024/2025 a été riche en activités périscolaires : théâtre, échecs, musique, sport et
                    projets de classe ont rythmé le quotidien des élèves. Elle s'est conclue par un taux de réussite
                    avoisinant 100 % pour les années certifiantes.
                  </p>
                </div>

                <div id="lettre-approche" className="scroll-mt-32 space-y-4">
                  <p>
                    Notre approche reste centrée sur les besoins de l'élève. Chaque enfant avance à son rythme, avec un
                    accompagnement pédagogique et personnel, et l'objectif constant de former une tête bien faite.
                  </p>
                </div>

                <div id="lettre-equipe" className="scroll-mt-32 space-y-4">
                  <p>
                    Cette année, nous poursuivons la valorisation de notre ressource humaine : le programme de formation
                    annuelle des enseignants est renouvelé, et la démarche ISO 21001 nous engage à évaluer et améliorer
                    nos pratiques de manière continue.
                  </p>
                  <p>Nous vous souhaitons à toutes et à tous une excellente année scolaire.</p>
                </div>

                <div className="pt-6">
                  <p className="hand-note text-3xl text-teal-700">L'équipe Madariss Tingis</p>
                  <p className="mt-1 text-sm text-ink-600">Tanger, rentrée {SCHOOL_YEAR}</p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand" chapter="05" eyebrow="L'an passé" title="Une année 2024/2025 réussie">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <img
              src={valeursCour}
              alt="Élèves de Madariss Tingis dans la cour"
              loading="lazy"
              className="tab-shape w-full border-4 border-white object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-5 sm:grid-cols-2">
              <StatCounter value={100} suffix=" %" label="Taux de réussite" sub="Années certifiantes 2024/2025 (≈ 100 %)" />
              <StatCounter value={4} label="Activités phares" sub="Théâtre, échecs, musique, sport" />
            </div>
            <NoteMargin className="mt-6 block">merci à tous, élèves et familles</NoteMargin>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper">
        <PullQuote
          quote="Une tête bien faite plutôt qu'une tête bien pleine."
          author="Le fil conducteur de notre pédagogie"
          tone="teal"
        />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Action href={site.pronote}>
            <MonitorSmartphone className="size-4" strokeWidth={1.8} /> Accéder à Pronote
          </Action>
          <Action to="/calendrier" variant="secondary">
            <CalendarDays className="size-4" strokeWidth={1.8} /> Voir le calendrier
          </Action>
        </div>
      </Section>

      <CtaBand
        title="Prêts pour la nouvelle année ?"
        text="Les listes de fournitures, les horaires et le règlement sont disponibles sur le site."
        primary={{ to: "/fournitures-manuels", label: "Fournitures & manuels" }}
        secondary={{ to: "/horaires", label: "Les horaires" }}
      />

      <RelatedPages
        links={[
          { to: "/vacances-scolaires", label: "Vacances scolaires", desc: "Le rythme de l'année scolaire." },
          { to: "/projet-ecole", label: "Projet d'école", desc: "La démarche qualité et les axes pédagogiques." },
          { to: "/nos-eleves", label: "Nos élèves", desc: "Les activités et les réussites de l'année." },
        ]}
      />

      <span className="hidden">
        <GraduationCap aria-hidden="true" />
      </span>
    </>
  );
}
