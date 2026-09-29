import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bell,
  BookOpenCheck,
  CalendarDays,
  ChefHat,
  Clapperboard,
  Images,
  Mic,
  Music,
  Ruler,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { HeroPattern } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { TabsPill } from "@/components/site/blocks/TabsPill";
import { PullQuote } from "@/components/site/blocks/PullQuote";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, Badge, NoteMargin, Reveal, Stamp } from "@/components/site/blocks/primitives";
import { events } from "@/data/events";
import { media } from "@/data/media";
import { site } from "@/data/site";

function FollowPanel({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: typeof Bell;
  title: string;
  text: string;
  action: ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-4xl items-center gap-8 rounded-[2rem] border border-line bg-white p-8 shadow-soft md:grid-cols-[auto_1fr] md:p-10">
      <span className="grid size-20 place-items-center rounded-3xl bg-coral-50 text-coral-600">
        <Icon className="size-10" strokeWidth={1.4} />
      </span>
      <div>
        <h3 className="font-display text-2xl">{title}</h3>
        <p className="mt-2 text-ink-600">{text}</p>
        <div className="mt-6">{action}</div>
      </div>
    </div>
  );
}

export function EvenementsPage() {
  const featured = events[0];

  return (
    <>
      <HeroPattern
        chapter="01"
        eyebrow="Calendrier"
        title={
          <>
            Les événements <span className="hand-underline">de l'école</span>
          </>
        }
        lead="Ateliers, spectacles, rencontres : les temps forts qui font vivre Madariss Tingis au-delà de la classe."
        crumbs={[{ label: "Calendrier" }, { label: "Événements scolaires" }]}
        icons={[ChefHat, Music, Trophy, Clapperboard, Sparkles]}
        image={media.events.hero.src}
        imageAlt={media.events.hero.alt}
        note="on apprend aussi en faisant !"
        actions={
          <>
            <Action to="/calendrier">Voir le calendrier</Action>
            <Action to="/photos" variant="secondary">
              Galerie photos
            </Action>
          </>
        }
      />

      {featured ? (
        <Section tone="sand" chapter="02" eyebrow="À l'affiche" title="Le prochain rendez-vous">
          <Reveal>
            <article className="relative grid overflow-hidden rounded-[2.5rem] border border-line bg-white shadow-lift lg:grid-cols-[1.1fr_1fr]">
              <div className="relative min-h-[18rem]">
                <img
                  src={featured.image}
                  alt={featured.alt}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                <Stamp lines={["Bientôt", "à l'école"]} className="absolute top-5 left-5" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{featured.badge}</Badge>
                  {featured.tags.map((t) => (
                    <Badge key={t} tone="teal">
                      {t}
                    </Badge>
                  ))}
                </div>
                <h2 className="mt-5 font-display text-3xl md:text-4xl">{featured.title}</h2>
                <p className="mt-4 text-lg text-ink-600">{featured.lead}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-700">
                  <CalendarDays className="size-4" strokeWidth={1.8} />
                  {featured.date ?? "Date communiquée aux familles via Pronote"}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Action to={`/evenements/${featured.slug}`}>Lire l'article</Action>
                  <Action to="/calendrier" variant="tertiary" arrow={false}>
                    Voir le calendrier
                  </Action>
                </div>
              </div>
            </article>
          </Reveal>
        </Section>
      ) : null}

      <Section
        tone="paper"
        pattern="grid"
        chapter="03"
        eyebrow="Pourquoi ces événements"
        title="Apprendre autrement"
        lead="Un atelier de cuisine mobilise autant de compétences qu'une leçon : c'est tout l'esprit de nos événements."
      >
        <IconCardGrid
          columns={4}
          cards={[
            { icon: BookOpenCheck, title: "Lire une consigne", text: "Comprendre une recette, suivre des étapes dans l'ordre." },
            { icon: Ruler, title: "Mesurer et compter", text: "Doser, peser, partager : les maths deviennent concrètes." },
            { icon: Users, title: "Coopérer", text: "S'organiser en équipe, se répartir les rôles, s'entraider." },
            { icon: Mic, title: "Présenter", text: "Prendre la parole devant les autres et valoriser son travail." },
          ]}
        />
      </Section>

      <Section
        tone="sand"
        chapter="04"
        eyebrow="Rester informé"
        title="Ne manquez aucun temps fort"
        lead="Trois façons de suivre la vie de l'école."
        align="center"
      >
        <TabsPill
          tabs={[
            {
              id: "pronote",
              label: "Pronote",
              content: (
                <FollowPanel
                  icon={Bell}
                  title="Les informations pratiques sur Pronote"
                  text="Dates, organisation et niveaux concernés sont communiqués aux familles via Pronote, l'outil de communication de l'école."
                  action={
                    <Action href={site.pronote} variant="primary">
                      Ouvrir Pronote
                    </Action>
                  }
                />
              ),
            },
            {
              id: "calendrier",
              label: "Calendrier",
              content: (
                <FollowPanel
                  icon={CalendarDays}
                  title="Le calendrier de l'année"
                  text="Rentrée, périodes de congés, examens et événements : tous les temps forts réunis au même endroit."
                  action={<Action to="/calendrier">Voir le calendrier</Action>}
                />
              ),
            },
            {
              id: "galeries",
              label: "Galeries",
              content: (
                <FollowPanel
                  icon={Images}
                  title="Revivre les moments forts"
                  text="Photos et vidéos des activités, des spectacles et de la vie de l'école."
                  action={
                    <div className="flex flex-wrap gap-3">
                      <Action to="/photos">Photos</Action>
                      <Action to="/videos" variant="secondary">
                        Vidéos
                      </Action>
                    </div>
                  }
                />
              ),
            },
          ]}
        />
      </Section>

      <Section tone="paper" chapter="05" eyebrow="Notre conviction">
        <PullQuote
          quote="On retient mieux ce que l'on a fait de ses mains."
          author="L'équipe Madariss Tingis"
          note="et c'est encore mieux à plusieurs"
          tone="teal"
        />
      </Section>

      <Section tone="white" chapter="06" eyebrow="Souvenirs" title="Revivre nos moments forts">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { to: "/photos", label: "Galerie photos", desc: "Sport, théâtre, échecs, musique et vie scolaire.", img: media.events.photos },
            { to: "/videos", label: "Galerie vidéo", desc: "L'école en mouvement, spectacles et activités.", img: media.events.videos },
          ].map((card, i) => (
            <Reveal key={card.to} delay={i * 0.08}>
              <Link
                to={card.to as never}
                className="group relative block overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-shadow hover:shadow-lift"
              >
                <img
                  src={card.img.src}
                  alt={card.img.alt}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <h3 className="font-display text-3xl text-white">{card.label}</h3>
                    <p className="mt-1 text-white/80">{card.desc}</p>
                  </div>
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-teal-900 transition-transform group-hover:-translate-y-1">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex items-center gap-3">
          <Sparkles className="size-5 text-coral-600" strokeWidth={1.7} />
          <NoteMargin>d'autres événements arrivent bientôt…</NoteMargin>
        </div>
      </Section>

      <CtaBand
        title="Envie de vivre ces moments avec nous ?"
        text="Déposez une demande d'inscription ou venez rencontrer l'équipe."
        primary={{ to: "/inscription", label: "Inscrire mon enfant" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
        tone="coral"
      />

      <RelatedPages
        links={[
          { to: "/calendrier", label: "Calendrier", desc: "Les temps forts de l'année scolaire." },
          { to: "/nos-eleves", label: "Nos élèves", desc: "Créativité et leadership." },
          { to: "/sport", label: "Activités", desc: "Sport, théâtre, échecs et musique." },
        ]}
      />
    </>
  );
}
