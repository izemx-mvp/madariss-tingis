import { useEffect, useMemo, useState } from "react";
import {
  BellRing,
  BookOpenCheck,
  CalendarDays,
  ChefHat,
  Flag,
  GraduationCap,
  Palmtree,
  PartyPopper,
  Sun,
} from "lucide-react";
import { HeroInteractive } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { TimelineVertical } from "@/components/site/blocks/Timeline";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, Badge, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { pronoteNotice, schoolYearPeriods, type CalendarPeriod } from "@/data/calendar";
import { events } from "@/data/events";
import { media } from "@/data/media";
import { SCHOOL_YEAR, site } from "@/data/site";
import { cn } from "@/lib/utils";

/* ---------- Données dérivées ---------- */

const schoolMonths = [
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
] as const;

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/** "Octobre – Novembre" → [1, 2] (index dans l'année scolaire) */
function monthIndexes(label: string): number[] {
  const found = schoolMonths
    .map((m, i) => (normalize(label).includes(normalize(m)) ? i : -1))
    .filter((i) => i >= 0);
  if (found.length === 0) return [];
  const first = Math.min(...found);
  const last = Math.max(...found);
  return Array.from({ length: last - first + 1 }, (_, k) => first + k);
}

type Filter = "Tous" | CalendarPeriod["type"];
const filters: Filter[] = ["Tous", "Rentrée", "Vacances", "Examens", "Événement"];

const typeStyle: Record<CalendarPeriod["type"], { dot: string; chip: string; icon: typeof Flag }> = {
  Rentrée: { dot: "bg-coral-600", chip: "bg-coral-50 text-coral-700", icon: Flag },
  Vacances: { dot: "bg-teal-500", chip: "bg-teal-50 text-teal-700", icon: Palmtree },
  Examens: { dot: "bg-teal-900", chip: "bg-sand text-teal-900", icon: GraduationCap },
  Événement: { dot: "bg-coral-500", chip: "bg-coral-50 text-coral-700", icon: PartyPopper },
};

/** Les événements (Master Chef Junior…) rejoignent le calendrier sans date précise. */
const eventPeriods: CalendarPeriod[] = events.map((e) => ({
  id: `event-${e.slug}`,
  month: "",
  title: e.title.replace(/ !$/, ""),
  type: "Événement",
  date: e.date,
  text: e.lead,
}));

const allPeriods = [...schoolYearPeriods, ...eventPeriods];

/* ---------- Hero : aujourd'hui à l'école ---------- */

function TodayPanel() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const day = now?.getDay() ?? 1;
  const status =
    day === 0 || day === 6
      ? { label: "Week-end", text: "Pas de classe aujourd'hui. Bon repos !", icon: Sun }
      : day === 5
        ? { label: "Vendredi", text: "Journée plus courte : sortie à 13h30 pour tous les niveaux.", icon: BellRing }
        : { label: "Jour de classe", text: "Portes ouvertes de 7h45 à 8h40.", icon: BookOpenCheck };
  const Icon = status.icon;

  return (
    <div className="mx-auto w-full max-w-sm rounded-[2.5rem] border border-white/20 bg-white/10 p-8 text-center backdrop-blur">
      <p className="text-xs font-bold tracking-[0.18em] text-white/70 uppercase">Aujourd'hui</p>
      <p className="mt-3 font-display text-7xl text-white tabular-nums">{now ? now.getDate() : "--"}</p>
      <p className="font-display text-2xl text-white/90 capitalize">
        {now ? now.toLocaleDateString("fr-FR", { weekday: "long", month: "long" }) : " "}
      </p>
      <div className="mt-6 rounded-2xl bg-white/10 p-4">
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-coral-600 text-white">
          <Icon className="size-5" strokeWidth={1.7} />
        </span>
        <p className="mt-3 font-bold text-white">{status.label}</p>
        <p className="mt-1 text-sm text-white/80">{status.text}</p>
      </div>
    </div>
  );
}

/* ---------- L'année d'un coup d'œil (interactif) ---------- */

function YearPlanner() {
  const [filter, setFilter] = useState<Filter>("Tous");
  const [month, setMonth] = useState(0);
  const [startYear, endYear] = SCHOOL_YEAR.split("/");

  const byMonth = useMemo(
    () =>
      schoolMonths.map((_, i) =>
        schoolYearPeriods.filter(
          (p) => monthIndexes(p.month).includes(i) && (filter === "Tous" || p.type === filter),
        ),
      ),
    [filter],
  );

  const selected = byMonth[month] ?? [];
  const yearOf = (i: number) => (i <= 3 ? startYear : endYear);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all duration-300",
              filter === f
                ? "border-coral-600 bg-coral-600 text-white shadow-soft"
                : "border-line bg-white text-ink-600 hover:border-teal-500/60",
            )}
          >
            {f !== "Tous" ? <span className={cn("size-2.5 rounded-full", typeStyle[f].dot)} /> : null}
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {schoolMonths.map((m, i) => {
          const items = byMonth[i] ?? [];
          const on = month === i;
          return (
            <button
              key={m}
              type="button"
              aria-pressed={on}
              onClick={() => setMonth(i)}
              className={cn(
                "flex min-h-[7.5rem] flex-col rounded-2xl border p-4 text-left transition-all duration-300",
                on ? "border-coral-500/60 bg-white shadow-lift" : "border-line bg-white/70 hover:bg-white",
              )}
            >
              <span className="text-xs font-bold text-ink-600">{yearOf(i)}</span>
              <span className={cn("font-display text-lg", on ? "text-coral-700" : "text-ink-900")}>{m}</span>
              <span className="mt-auto flex flex-wrap gap-1.5 pt-3">
                {items.map((p) => (
                  <span key={p.id} className={cn("size-3 rounded-full", typeStyle[p.type].dot)} title={p.title} />
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <Reveal key={`${month}-${filter}`} className="mt-8">
        <div className="rounded-[2rem] border border-line bg-white p-7 shadow-soft md:p-9">
          <h3 className="font-display text-2xl">
            {schoolMonths[month]} {yearOf(month)}
          </h3>
          {selected.length === 0 ? (
            <p className="mt-4 text-ink-600">
              Aucun temps fort {filter !== "Tous" ? `de type « ${filter} » ` : ""}n'est annoncé pour ce mois à ce jour.
              Les informations ponctuelles sont communiquées via Pronote.
            </p>
          ) : (
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {selected.map((p) => {
                const Icon = typeStyle[p.type].icon;
                return (
                  <li key={p.id} className="flex gap-4 rounded-2xl bg-paper p-5">
                    <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", typeStyle[p.type].chip)}>
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="font-display text-lg">{p.title}</p>
                      <p className="mt-1 text-sm text-ink-600">{p.text}</p>
                      <p className="mt-2 text-sm font-bold text-teal-700">{p.date ?? pronoteNotice}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Le mois en cours : rythme de la semaine ---------- */

function MonthRhythm() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const ref = now ?? new Date(2026, 8, 1);

  const year = ref.getFullYear();
  const monthIdx = ref.getMonth();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const offset = (new Date(year, monthIdx, 1).getDay() + 6) % 7; // lundi = 0
  const cells = [...Array.from({ length: offset }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
      <Reveal>
        <div className="rounded-[2rem] border border-line bg-white p-6 shadow-soft md:p-8">
          <p className="font-display text-2xl capitalize">
            {ref.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
          </p>
          <div className="mt-6 grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-ink-600">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1.5">
            {cells.map((d, i) => {
              if (d === null) return <span key={`e-${i}`} />;
              const col = i % 7;
              const weekend = col >= 5;
              const friday = col === 4;
              const today = now !== null && d === now.getDate();
              return (
                <span
                  key={d}
                  className={cn(
                    "grid aspect-square place-items-center rounded-xl text-sm font-bold",
                    weekend && "bg-sand/70 text-ink-600/60",
                    friday && "bg-coral-50 text-coral-700",
                    !weekend && !friday && "bg-teal-50 text-teal-900",
                    today && "ring-2 ring-coral-600 ring-offset-2",
                  )}
                >
                  {d}
                </span>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <ul className="space-y-4">
          {[
            { cls: "bg-teal-50 text-teal-900", label: "Lundi → jeudi", text: "Journée complète, selon le niveau." },
            { cls: "bg-coral-50 text-coral-700", label: "Vendredi", text: "Sortie à 13h30 pour tous les niveaux." },
            { cls: "bg-sand text-ink-600", label: "Samedi et dimanche", text: "Pas de classe." },
          ].map((l) => (
            <li key={l.label} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4">
              <span className={cn("size-11 shrink-0 rounded-xl", l.cls)} aria-hidden="true" />
              <span>
                <span className="block font-bold">{l.label}</span>
                <span className="text-sm text-ink-600">{l.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <NoteMargin className="mt-6 block">le cercle corail, c'est aujourd'hui</NoteMargin>
        <div className="mt-6">
          <Action to="/horaires" variant="secondary">
            Les horaires détaillés
          </Action>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Page ---------- */

export function CalendrierPage() {
  return (
    <>
      <HeroInteractive
        chapter="01"
        eyebrow="Calendrier"
        title={`L'année ${SCHOOL_YEAR}`}
        lead="Rentrée, congés, examens et événements : les temps forts de l'année scolaire réunis au même endroit."
        crumbs={[{ label: "Calendrier" }]}
        image={media.events.library.src}
        imageAlt={media.events.library.alt}
        panel={<TodayPanel />}
        actions={
          <>
            <Action href={site.pronote} variant="light">
              Ouvrir Pronote
            </Action>
            <Action to="/vacances-scolaires" variant="secondary" className="border-white text-white hover:bg-white/10">
              Vacances scolaires
            </Action>
          </>
        }
      />

      <Section
        tone="sand"
        chapter="02"
        eyebrow="Vue d'ensemble"
        title="L'année d'un coup d'œil"
        lead="Filtrez par type, puis cliquez sur un mois pour voir ce qui est prévu."
        align="center"
      >
        <YearPlanner />
      </Section>

      <Section
        tone="paper"
        pattern="grid"
        chapter="03"
        eyebrow="Ce mois-ci"
        title="Le rythme de la semaine"
        lead="Jours de classe, vendredis courts et week-ends, sur le mois en cours."
      >
        <MonthRhythm />
      </Section>

      <Section tone="white" chapter="04" eyebrow="À venir" title="Les prochains temps forts">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <TimelineVertical
            items={allPeriods.map((p) => ({
              label: p.date ?? (p.month || "Date à confirmer"),
              title: p.title,
              text: p.date ? p.text : `${p.text} ${pronoteNotice}.`,
              icon: typeStyle[p.type].icon,
            }))}
          />
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-paper shadow-soft">
              <img
                src={media.events.hero.src}
                alt={media.events.hero.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-6">
                <Badge>Bientôt</Badge>
                <p className="mt-3 flex items-center gap-2 font-display text-xl">
                  <ChefHat className="size-5 text-coral-600" strokeWidth={1.7} /> Master Chef Junior
                </p>
                <p className="mt-2 text-sm text-ink-600">La date sera communiquée aux familles via Pronote.</p>
                <div className="mt-5">
                  <Action to="/evenements/master-chef-junior" variant="tertiary">
                    Lire l'article
                  </Action>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand" chapter="05" eyebrow="Restez synchronisé">
        <SplitFeature
          eyebrow="Pronote"
          title="Les dates précises arrivent sur Pronote"
          text={
            <p>
              Pronote est l'outil de communication entre l'école et les familles. Les dates exactes des congés, des
              examens et des événements y sont publiées au fil de l'année.
            </p>
          }
          points={[
            "Les annonces de l'école en temps réel",
            "Les devoirs et le suivi de votre enfant",
            "Les changements ponctuels d'organisation",
          ]}
          image={media.events.library.src}
          imageAlt={media.events.library.alt}
          note="un réflexe à prendre !"
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <Action href={site.pronote}>Ouvrir Pronote</Action>
            <Action href={site.massar} variant="secondary">
              Massar
            </Action>
          </div>
        </SplitFeature>
      </Section>

      <CtaBand
        title="Une date à vérifier ?"
        text="L'administration vous répond par téléphone, par email ou via le formulaire de contact."
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/evenements", label: "Les événements" }}
        tone="gradient"
      >
        <p className="mt-6 inline-flex items-center gap-2 text-white/80">
          <CalendarDays className="size-5" strokeWidth={1.7} /> Mis à jour au fil de l'année
        </p>
      </CtaBand>

      <RelatedPages
        links={[
          { to: "/vacances-scolaires", label: "Vacances scolaires", desc: "Le rythme de l'année." },
          { to: "/evenements", label: "Événements scolaires", desc: "Ce qui se prépare à l'école." },
          { to: "/horaires", label: "Horaires", desc: "La journée et la semaine par niveau." },
        ]}
      />
    </>
  );
}
