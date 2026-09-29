import { useState } from "react";
import { Bell, CalendarCheck2, CalendarDays, Landmark, MonitorSmartphone, Users } from "lucide-react";
import { HeroDocument } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { TimelineVertical } from "@/components/site/blocks/Timeline";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { pronoteNotice, schoolYearPeriods } from "@/data/calendar";
import { SCHOOL_YEAR, site } from "@/data/site";
import { cn } from "@/lib/utils";
import heroVacances from "@/assets/hero-vacances.jpg";
import valeursCour from "@/assets/valeurs-cour.jpg";

const filters = ["Tout", "Vacances", "Rentrée", "Examens"] as const;

export function VacancesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Vacances");
  const visible = schoolYearPeriods.filter((p) => filter === "Tout" || p.type === filter);

  return (
    <>
      <HeroDocument
        chapter="06"
        eyebrow="Vie scolaire"
        title="Vacances scolaires"
        lead="Le rythme de l'année scolaire, de septembre à juin. Seule la rentrée est confirmée à ce jour ; les autres périodes sont communiquées via Pronote."
        crumbs={[{ label: "Vie scolaire" }, { label: "Vacances scolaires" }]}
        meta={[
          { label: "Année scolaire", value: SCHOOL_YEAR },
          { label: "Confirmé", value: "Rentrée de septembre" },
          { label: "Le reste", value: "Via Pronote" },
        ]}
        image={heroVacances}
        imageAlt="Agenda de l'année scolaire ouvert sur un bureau"
        actions={
          <>
            <Action href={site.pronote}>Ouvrir Pronote</Action>
            <Action to="/calendrier" variant="secondary">
              Le calendrier complet
            </Action>
          </>
        }
      />

      <Section
        tone="sand"
        chapter="07"
        eyebrow="L'année"
        title="De septembre à juin"
        lead="Une frise du déroulé de l'année scolaire, avec l'état de chaque période."
      >
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <TimelineVertical
              items={schoolYearPeriods.map((p) => ({
                label: p.month,
                title: p.title,
                text: p.date ? `${p.date} — ${p.text}` : `${pronoteNotice}. ${p.text}`,
              }))}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={heroVacances}
              alt="Planification de l'année scolaire"
              loading="lazy"
              className="tab-shape sticky top-28 w-full border-4 border-white object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      <Section
        tone="paper"
        pattern="grid"
        chapter="08"
        eyebrow="Le fonctionnement"
        title="Comment sont fixées les dates"
        lead="Trois principes, sans surprise pour les familles."
      >
        <IconCardGrid
          columns={3}
          numbered
          cards={[
            {
              icon: Landmark,
              title: "Le calendrier officiel",
              text: "Les périodes de congés suivent le calendrier officiel de l'enseignement scolaire.",
            },
            {
              icon: MonitorSmartphone,
              title: "La communication via Pronote",
              text: "Dès qu'une date est arrêtée, elle est transmise aux familles par Pronote, l'outil privilégié de communication.",
              note: "pensez à activer les notifications",
            },
            {
              icon: Users,
              title: "L'organisation des familles",
              text: "Les dates sont annoncées suffisamment tôt pour vous permettre d'organiser les déplacements et la garde.",
            },
          ]}
        />
      </Section>

      <Section
        tone="sand"
        chapter="09"
        eyebrow="Mini-calendrier"
        title="Filtrer les périodes de l'année"
        lead="Par défaut, seules les périodes de vacances sont affichées."
      >
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300",
                filter === f ? "bg-teal-900 text-white shadow-soft" : "bg-white text-ink-600 hover:text-coral-700",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <article
                className={cn(
                  "flex h-full gap-5 rounded-3xl border bg-white p-6 shadow-soft",
                  p.date ? "border-teal-500/50" : "border-line",
                )}
              >
                <span
                  className={cn(
                    "grid size-14 shrink-0 place-items-center rounded-2xl",
                    p.date ? "bg-teal-50 text-teal-700" : "bg-sand text-ink-600",
                  )}
                >
                  {p.date ? <CalendarCheck2 className="size-6" strokeWidth={1.6} /> : <CalendarDays className="size-6" strokeWidth={1.6} />}
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.16em] text-coral-700 uppercase">{p.month}</p>
                  <h3 className="mt-1 font-display text-xl">{p.title}</h3>
                  <p className="mt-1 text-sm font-bold text-teal-700">{p.date ?? pronoteNotice}</p>
                  <p className="mt-2 text-sm text-ink-600">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {visible.length === 0 ? <p className="mt-8 text-ink-600">Aucune période de ce type pour le moment.</p> : null}
        <NoteMargin className="mt-6 block">tout arrive d'abord sur Pronote</NoteMargin>
      </Section>

      <Section tone="paper" chapter="10" eyebrow="Rester informé" title="Ne rien manquer de l'année">
        <SplitFeature
          eyebrow="Pronote"
          title="Les dates arrivent directement dans Pronote"
          text={
            <p>
              Pronote est l'outil privilégié de communication entre l'école et les parents. Les périodes de congés, les
              dates d'examens et les informations pratiques y sont publiées dès qu'elles sont arrêtées.
            </p>
          }
          points={[
            "Les dates de vacances y sont annoncées en premier",
            "Les informations de rentrée et d'examens y sont centralisées",
            "L'administration reste joignable par téléphone et par email",
          ]}
          image={valeursCour}
          imageAlt="Élèves de Madariss Tingis dans la cour"
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <Action href={site.pronote}>
              <Bell className="size-4" strokeWidth={1.8} /> Ouvrir Pronote
            </Action>
            <Action to="/contact" variant="secondary">
              Contacter l'administration
            </Action>
          </div>
        </SplitFeature>
      </Section>

      <CtaBand
        title="Restez informé : ouvrez Pronote"
        text="Les dates de vacances y sont publiées dès qu'elles sont confirmées par l'école."
        primary={{ href: site.pronote, label: "Accéder à Pronote" }}
        secondary={{ to: "/calendrier", label: "Voir le calendrier" }}
      />

      <RelatedPages
        links={[
          { to: "/calendrier", label: "Calendrier", desc: "Les temps forts de l'année scolaire." },
          { to: "/horaires", label: "Horaires", desc: "La journée et la semaine, niveau par niveau." },
          { to: "/note-de-rentree-2026-2027", label: "Note de rentrée", desc: "Le mot de l'équipe pour l'année en cours." },
        ]}
      />
    </>
  );
}
