import { useEffect, useMemo, useState } from "react";
import { AlarmClock, CalendarDays, DoorClosed, DoorOpen, Sun, UserCheck } from "lucide-react";
import { HeroInteractive } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { StepsRoad } from "@/components/site/blocks/StepsRoad";
import { ComparisonTable } from "@/components/site/blocks/ComparisonTable";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { doors, schedules } from "@/data/site";
import { cn } from "@/lib/utils";
import heroHoraires from "@/assets/hero-horaires.jpg";
import cycleCollege from "@/assets/cycle-college-lycee.jpg";

const toMinutes = (h: string) => {
  const [a, b] = h.split("h");
  return Number(a) * 60 + Number(b || 0);
};

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const sec = now ? now.getSeconds() : 0;
  const min = now ? now.getMinutes() : 0;
  const hr = now ? now.getHours() % 12 : 0;

  return (
    <div className="mx-auto w-fit rounded-[2.5rem] border border-white/20 bg-white/10 p-8 backdrop-blur">
      <div className="relative grid size-56 place-items-center rounded-full border-[6px] border-white/30 bg-white/10 md:size-64">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-3 w-0.5 rounded bg-white/50"
            style={{ transform: `rotate(${i * 30}deg) translateY(-6.4rem)` }}
          />
        ))}
        <span
          className="absolute bottom-1/2 left-1/2 h-14 w-[3px] origin-bottom rounded-full bg-white"
          style={{ transform: `translateX(-50%) rotate(${hr * 30 + min * 0.5}deg)` }}
        />
        <span
          className="absolute bottom-1/2 left-1/2 h-20 w-[3px] origin-bottom rounded-full bg-white/90"
          style={{ transform: `translateX(-50%) rotate(${min * 6}deg)` }}
        />
        <span
          className="absolute bottom-1/2 left-1/2 h-[5.5rem] w-[2px] origin-bottom rounded-full bg-coral-500 transition-transform duration-300"
          style={{ transform: `translateX(-50%) rotate(${sec * 6}deg)` }}
        />
        <span className="size-3 rounded-full bg-coral-500" />
      </div>
      <p className="mt-6 text-center font-display text-3xl text-white tabular-nums">
        {now ? now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) : "--:--"}
      </p>
      <p className="mt-1 text-center text-sm text-white/70">Heure de Tanger</p>
    </div>
  );
}

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

export function HorairesPage() {
  const [levelId, setLevelId] = useState(schedules[0]?.id ?? "");
  const level = useMemo(() => schedules.find((s) => s.id === levelId) ?? schedules[0], [levelId]);

  if (!level) return null;

  const dayStart = toMinutes(level.start);
  const dayEnd = toMinutes(level.end);
  const span = dayEnd - dayStart;
  const marks = [level.start, "10h00", "12h00", "14h00", level.end];

  return (
    <>
      <HeroInteractive
        chapter="05"
        eyebrow="Vie scolaire"
        title="Les horaires"
        lead="La journée et la semaine, niveau par niveau, avec l'ouverture et la fermeture des portes."
        crumbs={[{ label: "Vie scolaire" }, { label: "Horaires" }]}
        image={heroHoraires}
        imageAlt="Horloge dans un couloir de l'école"
        panel={<LiveClock />}
        actions={
          <>
            <Action to="/calendrier" variant="light">
              Voir le calendrier
            </Action>
            <Action to="/vacances-scolaires" variant="secondary" className="border-white text-white hover:bg-white/10">
              Vacances scolaires
            </Action>
          </>
        }
      />

      <Section
        tone="paper"
        pattern="grid"
        chapter="06"
        eyebrow="Votre niveau"
        title="Choisissez le niveau de votre enfant"
        lead="La frise et la grille de la semaine s'adaptent automatiquement."
        align="center"
      >
        <div className="mx-auto flex w-fit flex-wrap justify-center gap-2 rounded-full bg-sand p-2">
          {schedules.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setLevelId(s.id)}
              aria-pressed={s.id === levelId}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300",
                s.id === levelId ? "bg-coral-600 text-white shadow-soft" : "text-ink-600 hover:text-coral-700",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* frise de la journée */}
        <Reveal key={level.id} className="mt-12">
          <div className="rounded-[2rem] border border-line bg-white p-7 shadow-soft md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl">Une journée en {level.label.toLowerCase()}</h3>
              <p className="text-sm font-bold text-teal-700">
                Lundi – jeudi : {level.start} → {level.end}
              </p>
            </div>

            <div className="relative mt-10 h-16">
              <div className="absolute inset-x-0 top-6 h-4 overflow-hidden rounded-full bg-sand">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 to-coral-500 transition-all duration-700"
                  style={{ width: "100%" }}
                />
              </div>
              {marks.map((m) => {
                const pct = Math.min(Math.max(((toMinutes(m) - dayStart) / span) * 100, 0), 100);
                return (
                  <div key={m} className="absolute top-0" style={{ left: `${pct}%`, transform: "translateX(-50%)" }}>
                    <span className="block size-4 rounded-full border-4 border-white bg-teal-900 shadow-soft" style={{ marginTop: "1.5rem" }} />
                    <span className="mt-2 block text-xs font-bold whitespace-nowrap text-ink-600">{m}</span>
                  </div>
                );
              })}
            </div>

            {/* grille de la semaine */}
            <div className="mt-12 grid gap-3 sm:grid-cols-5">
              {days.map((d) => {
                const friday = d === "Vendredi";
                return (
                  <div
                    key={d}
                    className={cn(
                      "rounded-2xl border p-4 text-center transition-colors",
                      friday ? "border-coral-500/50 bg-coral-50" : "border-line bg-paper",
                    )}
                  >
                    <p className="text-xs font-bold tracking-wide text-ink-600 uppercase">{d}</p>
                    <p className={cn("mt-2 font-display text-lg", friday ? "text-coral-700" : "text-teal-900")}>
                      {friday ? level.fridayStart : level.start}
                    </p>
                    <p className="text-xs text-ink-600">→</p>
                    <p className={cn("font-display text-lg", friday ? "text-coral-700" : "text-teal-900")}>
                      {friday ? level.fridayEnd : level.end}
                    </p>
                  </div>
                );
              })}
            </div>
            <NoteMargin className="mt-6 block">le vendredi, la journée est plus courte</NoteMargin>
          </div>
        </Reveal>

        <div className="mt-12">
          <ComparisonTable
            columns={["Lundi – jeudi", "Vendredi"]}
            caption="Récapitulatif de tous les niveaux."
            rows={schedules.map((s) => ({
              label: s.label,
              cells: [`${s.start} – ${s.end}`, `${s.fridayStart} – ${s.fridayEnd}`],
            }))}
          />
        </div>
      </Section>

      <Section tone="sand" chapter="07" eyebrow="L'accueil" title="Les portes de l'école">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-10">
              <div className="flex items-center justify-between gap-6">
                <div className="text-center">
                  <span className="grid size-20 place-items-center rounded-3xl bg-teal-50 text-teal-700">
                    <DoorOpen className="size-10" strokeWidth={1.4} />
                  </span>
                  <p className="mt-4 font-display text-3xl text-teal-900">{doors.open}</p>
                  <p className="text-sm text-ink-600">Ouverture</p>
                </div>

                <div className="flex-1">
                  <div className="relative h-1.5 rounded-full bg-sand">
                    <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-teal-500 to-coral-500" />
                  </div>
                  <p className="mt-3 text-center text-sm font-bold text-ink-600">Fenêtre d'accueil des élèves</p>
                </div>

                <div className="text-center">
                  <span className="grid size-20 place-items-center rounded-3xl bg-coral-50 text-coral-600">
                    <DoorClosed className="size-10" strokeWidth={1.4} />
                  </span>
                  <p className="mt-4 font-display text-3xl text-coral-700">{doors.close}</p>
                  <p className="text-sm text-ink-600">Fermeture</p>
                </div>
              </div>
              <p className="mt-8 text-ink-600">
                Les portes ouvrent à {doors.open} et ferment à {doors.close}. Passé cette heure, l'élève doit être
                accompagné d'un adulte jusqu'au secrétariat — sauf en maternelle.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <img
              src={cycleCollege}
              alt="Arrivée des élèves à l'école"
              loading="lazy"
              className="tab-shape-alt w-full border-4 border-white object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      <Section
        tone="paper"
        pattern="lines"
        chapter="08"
        eyebrow="Les retards"
        title="En cas de retard"
        lead="La règle est simple et connue de tous les élèves."
      >
        <StepsRoad
          steps={[
            {
              icon: UserCheck,
              title: "Accompagné au secrétariat",
              text: "L'élève en retard est accompagné d'un adulte jusqu'au secrétariat, sauf en maternelle.",
            },
            {
              icon: AlarmClock,
              title: "Trois retards dans le mois",
              text: "Trois retards au cours d'un même mois entraînent un avertissement.",
            },
            {
              icon: DoorClosed,
              title: "Le quatrième retard",
              text: "Un quatrième retard entraîne le retrait d'un point de discipline.",
            },
          ]}
        />
      </Section>

      <Section tone="sand" chapter="09" eyebrow="Le vendredi" title="Une fin de semaine plus courte">
        <SplitFeature
          reverse
          eyebrow="Vendredi"
          title="La sortie est avancée à 13h30"
          text={
            <p>
              Le vendredi, tous les niveaux terminent à 13h30. Pensez à adapter le transport et, le cas échéant, la
              restauration de votre enfant ce jour-là.
            </p>
          }
          points={[
            "Sortie à 13h30 pour tous les niveaux le vendredi",
            "Les portes restent ouvertes de 7h45 à 8h40 le matin",
            "Les changements ponctuels sont annoncés via Pronote",
          ]}
          image={heroHoraires}
          imageAlt="Couloir de l'école en fin de matinée"
        >
          <div className="mt-8">
            <Action to="/transport-scolaire" variant="secondary">
              <Sun className="size-4" strokeWidth={1.8} /> Transport scolaire
            </Action>
          </div>
        </SplitFeature>
      </Section>

      <CtaBand
        title="Les temps forts de l'année"
        text="Retrouvez la rentrée, les périodes de congés et les événements dans le calendrier."
        primary={{ to: "/calendrier", label: "Voir le calendrier" }}
        secondary={{ to: "/vacances-scolaires", label: "Vacances scolaires" }}
      >
        <p className="mt-6 inline-flex items-center gap-2 text-white/80">
          <CalendarDays className="size-5" strokeWidth={1.7} /> Mis à jour pour l'année en cours
        </p>
      </CtaBand>

      <RelatedPages
        links={[
          { to: "/reglement-interieur", label: "Règlement intérieur", desc: "Titre II : fréquentation scolaire." },
          { to: "/transport-scolaire", label: "Transport scolaire", desc: "Se rendre à l'école et en revenir." },
          { to: "/restauration", label: "Restauration", desc: "Le service de cantine de l'école." },
        ]}
      />
    </>
  );
}
