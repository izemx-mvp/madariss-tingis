import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Bus,
  Clock,
  ExternalLink,
  HeartPulse,
  Palette,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Utensils,
} from "lucide-react";
import trilinguismeImg from "@/assets/trilinguisme.jpg";
import masterChefImg from "@/assets/master-chef-junior.jpg";
import sportImg from "@/assets/sport-1.jpg";
import theatreImg from "@/assets/theatre-1.jpg";
import echecsImg from "@/assets/echecs-1.jpg";
import musiqueImg from "@/assets/musique-1.jpg";
import { SCHOOL_YEAR, doors, schedules, site } from "@/data/site";
import { Action, Badge, NoteMargin, Reveal, SectionLabel } from "@/components/site/blocks/primitives";
import { StatCounter } from "@/components/site/blocks/StatCounter";
import { WaveDivider } from "@/components/site/blocks/WaveDivider";
import { cn } from "@/lib/utils";

/* 6 — Chiffres */
export function Chiffres() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className="grid-paper absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-site relative section-pad">
        <SectionLabel chapter="04">En quelques repères</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-4xl md:text-5xl">Ce qui structure notre école</h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCounter value={3} label="cycles" sub="Maternelle, primaire, collège–lycée" />
          <StatCounter value={3} label="langues d'enseignement" sub="Arabe, français, anglais" />
          <StatCounter value={100} prefix="≈ " suffix=" %" label="de réussite" sub="Années certifiantes 2024/2025" />
          <div className="grid place-items-center rounded-3xl border-[3px] border-dashed border-teal-500/60 bg-white/70 p-6 text-center">
            <p className="font-display text-xl text-teal-700">Démarche ISO 21001</p>
            <p className="mt-2 text-sm text-ink-600">Lancée en {SCHOOL_YEAR} — certification en cours</p>
          </div>
        </div>
      </div>
      <WaveDivider fill="paper" />
    </section>
  );
}

/* 7 — Une journée à Madariss Tingis */
export function Journee() {
  const [level, setLevel] = useState(schedules[1].id);
  const current = schedules.find((s) => s.id === level) ?? schedules[0];

  const steps = [
    { time: doors.open, label: "Ouverture des portes" },
    { time: current.week.split(": ")[1].split(" – ")[0], label: "Début des cours" },
    { time: doors.close, label: "Fermeture des portes" },
    { time: current.week.split(" – ")[1], label: "Fin de journée (lun–jeu)" },
  ];

  return (
    <section className="container-site section-pad">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel chapter="05">Le rythme</SectionLabel>
          <h2 className="mt-6 max-w-xl font-display text-4xl md:text-5xl">Une journée à {site.name}</h2>
        </div>
        <NoteMargin rotate={-3}>le vendredi est plus court !</NoteMargin>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Choisir un niveau">
        {schedules.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={level === s.id}
            onClick={() => setLevel(s.id)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-bold transition-colors",
              level === s.id ? "bg-teal-900 text-white" : "border border-line bg-white text-ink-600 hover:bg-sand",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-line bg-white p-6 shadow-soft md:p-10">
        <ol className="relative grid gap-8 md:grid-cols-4">
          <span className="absolute top-5 right-0 left-0 hidden h-0.5 bg-line md:block" aria-hidden="true" />
          {steps.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative"
            >
              <span className="relative z-10 grid size-10 place-items-center rounded-full bg-coral-600 font-display text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 font-display text-2xl text-teal-700">{s.time}</p>
              <p className="text-sm text-ink-600">{s.label}</p>
            </motion.li>
          ))}
        </ol>
        <div className="mt-8 grid gap-3 rounded-2xl bg-sand p-5 text-sm md:grid-cols-2">
          <p>
            <strong>Lundi à jeudi :</strong> {current.week.split(": ")[1]}
          </p>
          <p>
            <strong>Vendredi :</strong> {current.friday.split(": ")[1]}
          </p>
        </div>
        <div className="mt-6">
          <Action to="/horaires" variant="tertiary">
            Voir tous les horaires
          </Action>
        </div>
      </div>
    </section>
  );
}

/* 8 — Langues et pédagogie */
const langues = [
  { label: "Arabe", sample: "مدارس طنجيس", arabic: true, text: "L'excellence dans la langue d'enseignement officielle." },
  { label: "Français", sample: "Réussir demain", arabic: false, text: "Une maîtrise renforcée, à l'écrit comme à l'oral." },
  { label: "Anglais", sample: "Open to the world", arabic: false, text: "Une ouverture sur le monde, dès le plus jeune âge." },
];

const pedagogie = ["Projets interdisciplinaires", "Travail en équipe", "Autonomie", "Créativité"];

export function Langues() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <WaveDivider fill="sand" flip />
      <div className="container-site grid gap-12 pt-4 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <SectionLabel chapter="06">Langues & pédagogie</SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">Trois langues, une même exigence</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {langues.map((l, i) => (
              <Reveal key={l.label} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-white p-5 shadow-soft">
                  <p
                    className={cn("font-display text-2xl text-coral-600", l.arabic && "arabic text-3xl")}
                    lang={l.arabic ? "ar" : undefined}
                    dir={l.arabic ? "rtl" : undefined}
                  >
                    {l.sample}
                  </p>
                  <h3 className="mt-3 font-display text-xl">{l.label}</h3>
                  <p className="mt-1 text-sm text-ink-600">{l.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {pedagogie.map((p) => (
              <li key={p} className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={trilinguismeImg}
          alt="Élèves lisant des livres à la bibliothèque de l'école"
          loading="lazy"
          width={1408}
          height={1056}
          className="tab-shape w-full object-cover shadow-lift"
        />
      </div>
      <WaveDivider fill="paper" />
    </section>
  );
}

/* 9 — Au-delà des cours (bento) */
const activites = [
  { to: "/sport", label: "Sport", img: sportImg, alt: "Match de football entre élèves dans la cour", span: "md:col-span-2 md:row-span-2" },
  { to: "/musique", label: "Musique", img: musiqueImg, alt: "Chorale d'élèves en salle de musique", span: "" },
  { to: "/theatre", label: "Théâtre", img: theatreImg, alt: "Élèves sur scène en costumes", span: "" },
  { to: "/echecs", label: "Échecs", img: echecsImg, alt: "Deux élèves concentrés devant un échiquier", span: "md:col-span-2" },
];

export function AuDelaDesCours() {
  return (
    <section className="container-site section-pad">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <SectionLabel chapter="07">Au-delà des cours</SectionLabel>
          <h2 className="mt-6 max-w-xl font-display text-4xl md:text-5xl">Des talents qui s'expriment</h2>
        </div>
        <Action to="/photos" variant="tertiary">
          Voir la galerie
        </Action>
      </div>

      <div className="mt-12 grid auto-rows-[200px] gap-4 md:grid-cols-4">
        {activites.map((a) => (
          <Link
            key={a.to}
            to={a.to as never}
            className={cn("group relative overflow-hidden rounded-3xl", a.span)}
          >
            <img src={a.img} alt={a.alt} loading="lazy" width={1200} height={912} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-teal-900/85 to-transparent" />
            <span className="absolute bottom-5 left-5 font-display text-2xl text-white transition-transform duration-300 group-hover:-translate-y-1">
              {a.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* 10 — Espace parents & services */
const services = [
  { to: "/restauration", label: "Restauration", icon: Utensils, text: "Le service de cantine de l'école." },
  { to: "/transport-scolaire", label: "Transport scolaire", icon: Bus, text: "Se rendre à l'école en sécurité." },
  { to: "/assistance-medicale", label: "Assistance médicale", icon: HeartPulse, text: "Santé, hygiène et bien-être." },
  { to: "/horaires", label: "Horaires", icon: Clock, text: "Journée et semaine par niveau." },
];

export function EspaceParents() {
  return (
    <section className="relative overflow-hidden bg-sand">
      <WaveDivider fill="sand" flip />
      <div className="container-site pt-4 pb-20">
        <SectionLabel chapter="08">Espace parents</SectionLabel>
        <h2 className="mt-6 max-w-2xl font-display text-4xl md:text-5xl">Tout ce dont les familles ont besoin</h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <a
            href={site.pronote}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative overflow-hidden rounded-3xl bg-teal-900 p-8 text-white shadow-lift md:p-10"
          >
            <div className="zellige absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <Badge tone="teal">Outil privilégié</Badge>
              <h3 className="mt-4 font-display text-3xl text-white md:text-4xl">Pronote</h3>
              <p className="mt-3 max-w-md text-white/80">
                Notes, absences, devoirs et communication avec l'équipe éducative : le suivi quotidien de votre enfant.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-teal-900">
                Ouvrir Pronote <ExternalLink className="size-4" strokeWidth={1.75} />
              </span>
            </div>
          </a>

          <a
            href={site.massar}
            target="_blank"
            rel="noreferrer noopener"
            className="flex flex-col justify-between rounded-3xl border border-line bg-white p-8 shadow-soft transition-transform duration-300 hover:-translate-y-1"
          >
            <div>
              <span className="grid size-11 place-items-center rounded-full bg-coral-50 text-coral-700">
                <ShieldCheck className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-2xl">Massar</h3>
              <p className="mt-2 text-ink-600">Le service officiel du ministère de l'Éducation nationale.</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-teal-700">
              Accéder à Massar <ExternalLink className="size-4" strokeWidth={1.75} />
            </span>
          </a>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.to}
              to={s.to as never}
              className="rounded-3xl border border-line bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid size-11 place-items-center rounded-full bg-teal-50 text-teal-700">
                <s.icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 font-display text-xl">{s.label}</h3>
              <p className="mt-1 text-sm text-ink-600">{s.text}</p>
            </Link>
          ))}
        </div>
      </div>
      <WaveDivider fill="paper" />
    </section>
  );
}

/* 11 — Mot de l'équipe + événement */
export function MotEtEvenement() {
  return (
    <section className="container-site section-pad">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative rounded-3xl border border-line bg-white p-8 shadow-soft md:p-12">
          <span className="absolute -top-4 left-8 grid size-10 place-items-center rounded-full bg-coral-600 text-white">
            <Sparkles className="size-5" strokeWidth={1.75} />
          </span>
          <SectionLabel chapter="09">Le mot de l'équipe</SectionLabel>
          <blockquote className="mt-6 font-display text-3xl leading-snug md:text-4xl">
            « Nous préférons <span className="hand-underline text-coral-600">une tête bien faite</span> plutôt qu'une tête
            bien pleine. »
          </blockquote>
          <p className="mt-6 font-semibold">L'équipe {site.name}</p>
          <Action to="/note-de-rentree-2025-2026" variant="tertiary" className="mt-4">
            Lire la note de rentrée
          </Action>
        </div>

        <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
          <img
            src={masterChefImg}
            alt="Enfants en toque et tablier cuisinant avec un chef"
            loading="lazy"
            width={1408}
            height={1056}
            className="h-64 w-full object-cover"
          />
          <div className="p-8">
            <Badge tone="teal">Bientôt</Badge>
            <h3 className="mt-3 font-display text-2xl md:text-3xl">
              Master Chef Junior arrive bientôt à {site.name} !
            </h3>
            <p className="mt-3 text-ink-600">
              Un atelier gourmand où nos élèves enfilent la toque : lire une consigne, doser, coopérer et présenter son
              travail.
            </p>
            <Action to="/evenements" className="mt-6">
              Voir l'événement
            </Action>
          </div>
        </article>
      </div>
    </section>
  );
}

/* 12 — Inscription */
const etapes = [
  { n: 1, label: "Demande d'inscription", text: "En ligne, en quelques minutes." },
  { n: 2, label: "Test de niveau", text: "Un test d'accès au niveau demandé." },
  { n: 3, label: "Dossier", text: "Fiche de renseignements et certificat de radiation." },
  { n: 4, label: "Inscription définitive", text: "Règlement des droits annuels d'inscription." },
];

export function InscriptionBand() {
  return (
    <section className="relative">
      <WaveDivider fill="coral" />
      <div className="gradient-signature relative overflow-hidden">
        <div className="container-site relative py-16 text-white md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel chapter="10" tone="light">
                Inscription
              </SectionLabel>
              <h2 className="mt-6 max-w-xl font-display text-4xl text-white md:text-5xl">
                Quatre étapes, et c'est parti
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              <UsersRound className="size-4" strokeWidth={1.75} /> Priorité aux frères et sœurs
            </span>
          </div>

          <ol className="relative mt-12 grid gap-8 md:grid-cols-4">
            <span
              className="absolute top-6 right-0 left-0 hidden border-t-2 border-dashed border-white/40 md:block"
              aria-hidden="true"
            />
            {etapes.map((e, i) => (
              <Reveal key={e.n} delay={i * 0.08}>
                <li>
                  <span className="relative z-10 grid size-12 place-items-center rounded-full bg-white font-display text-lg font-bold text-coral-600">
                    {e.n}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-white">{e.label}</h3>
                  <p className="mt-1 text-sm text-white/85">{e.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-3">
            <Action to="/inscription" variant="light">
              Faire une demande d'inscription
            </Action>
            <Action to="/contact" variant="secondary" className="border-white text-white hover:bg-white/10">
              Nous contacter
            </Action>
          </div>

          <p className="mt-10 flex items-center gap-2 text-sm text-white/80">
            <Palette className="size-4" strokeWidth={1.75} /> {site.address}
          </p>
        </div>
      </div>
      <WaveDivider fill="paper" />
    </section>
  );
}
