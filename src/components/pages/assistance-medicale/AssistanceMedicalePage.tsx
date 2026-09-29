import { useState } from "react";
import {
  CalendarClock,
  ClipboardCheck,
  FileHeart,
  HeartPulse,
  Mail,
  Phone,
  PhoneCall,
  School,
  Scissors,
  ShieldCheck,
  Shirt,
  Siren,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { HeroSplit } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { StepsRoad } from "@/components/site/blocks/StepsRoad";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { AccordionList } from "@/components/site/blocks/AccordionList";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";
import { site, telHref } from "@/data/site";
import { cn } from "@/lib/utils";

/* ---------- Sélecteur de situation (élément interactif) ---------- */

type Situation = {
  id: string;
  label: string;
  icon: typeof CalendarClock;
  when: string;
  todo: string[];
  note: string;
};

const situations: Situation[] = [
  {
    id: "prevue",
    label: "Absence prévue",
    icon: CalendarClock,
    when: "Un rendez-vous médical ou une absence connue à l'avance.",
    todo: [
      "Informer à l'avance la direction et l'enseignant(e) de votre enfant.",
      "Au retour, remettre le justificatif au surveillant général.",
      "Votre enfant reprend les cours muni d'un billet d'excuse.",
    ],
    note: "prévenir tôt = tout le monde s'organise",
  },
  {
    id: "imprevue",
    label: "Malade ce matin",
    icon: PhoneCall,
    when: "Votre enfant se réveille malade ou un imprévu survient.",
    todo: [
      "Avertir l'école le jour même, par téléphone ou par email.",
      "Garder un certificat médical et/ou un justificatif écrit pour le retour.",
      "Le justificatif est remis au surveillant général, puis l'élève reçoit un billet d'excuse.",
    ],
    note: "un simple appel suffit le jour même",
  },
  {
    id: "longue",
    label: "Absence longue",
    icon: FileHeart,
    when: "Une maladie qui éloigne votre enfant de l'école plusieurs jours.",
    todo: [
      "Tenir l'école informée de la situation.",
      "Avant le retour en classe, fournir un certificat médical de non-contagion.",
      "Le certificat protège votre enfant comme l'ensemble de la classe.",
    ],
    note: "le certificat de non-contagion est obligatoire",
  },
  {
    id: "retour",
    label: "Retour en classe",
    icon: School,
    when: "Votre enfant est rétabli et revient à l'école.",
    todo: [
      "Remettre les justificatifs au surveillant général.",
      "Récupérer le billet d'excuse qui permet de rejoindre la classe.",
      "Consulter Pronote pour rattraper les cours et les devoirs.",
    ],
    note: "Pronote aide à rattraper",
  },
];

function SituationPicker() {
  const [id, setId] = useState(situations[0]?.id ?? "");
  const current = situations.find((s) => s.id === id) ?? situations[0];
  if (!current) return null;
  const Icon = current.icon;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div role="tablist" aria-label="Choisir une situation" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {situations.map((s) => {
          const SIcon = s.icon;
          const on = s.id === current.id;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setId(s.id)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                on
                  ? "border-coral-500/60 bg-white shadow-lift"
                  : "border-line bg-white/60 hover:border-teal-500/50 hover:bg-white",
              )}
            >
              <span
                className={cn(
                  "grid size-12 shrink-0 place-items-center rounded-2xl transition-colors",
                  on ? "bg-coral-600 text-white" : "bg-teal-50 text-teal-700",
                )}
              >
                <SIcon className="size-6" strokeWidth={1.6} />
              </span>
              <span className={cn("font-display text-lg", on ? "text-coral-700" : "text-ink-900")}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <Reveal key={current.id}>
        <div role="tabpanel" className="relative overflow-hidden rounded-[2rem] border border-line bg-white p-7 shadow-soft md:p-10">
          <div className="paper-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative">
            <span className="grid size-14 place-items-center rounded-2xl bg-coral-50 text-coral-600">
              <Icon className="size-7" strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 font-display text-2xl md:text-3xl">{current.label}</h3>
            <p className="mt-2 text-ink-600">{current.when}</p>
            <ol className="mt-7 space-y-4">
              {current.todo.map((t, i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-teal-700 font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-ink-900">{t}</span>
                </li>
              ))}
            </ol>
            <NoteMargin className="mt-7 block">{current.note}</NoteMargin>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Page ---------- */

export function AssistanceMedicalePage() {
  return (
    <>
      <HeroSplit
        chapter="01"
        eyebrow="Services"
        title={
          <>
            Santé et <span className="hand-underline">bien-être</span>
          </>
        }
        lead="La santé des élèves se protège à plusieurs : les familles préviennent, l'école accompagne, et chacun veille sur le groupe."
        crumbs={[{ label: "Services" }, { label: "Assistance médicale" }]}
        image={media.medical.hero.src}
        imageAlt={media.medical.hero.alt}
        badge="Une question ? L'administration vous répond"
        note="familles + école = élèves en forme"
        actions={
          <>
            <a
              href={telHref(site.phones[0] ?? "")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:bg-coral-700 hover:shadow-lift"
            >
              <Phone className="size-4" strokeWidth={1.8} /> Appeler l'école
            </a>
            <Action to="/reglement-interieur" variant="secondary">
              Le règlement intérieur
            </Action>
          </>
        }
      />

      <Section
        tone="paper"
        pattern="lines"
        chapter="02"
        eyebrow="Pas à pas"
        title="Si mon enfant est malade"
        lead="Quatre gestes simples, tirés du règlement intérieur, pour que l'absence se passe sereinement."
      >
        <StepsRoad
          steps={[
            {
              icon: PhoneCall,
              title: "Prévenir l'école",
              text: "Avertir l'école le jour même, par téléphone ou par email, dès que l'absence est connue.",
            },
            {
              icon: FileHeart,
              title: "Justifier l'absence",
              text: "Un certificat médical et/ou un justificatif écrit d'un parent, remis au surveillant général.",
            },
            {
              icon: ShieldCheck,
              title: "Absence longue",
              text: "Un certificat médical de non-contagion est demandé avant le retour en classe.",
            },
            {
              icon: UserRoundCheck,
              title: "Retour en classe",
              text: "L'élève reprend les cours muni d'un billet d'excuse, puis rattrape grâce à Pronote.",
            },
          ]}
        />
      </Section>

      <Section
        tone="sand"
        chapter="03"
        eyebrow="Votre situation"
        title="Que faire, concrètement ?"
        lead="Choisissez la situation qui correspond à la vôtre : la marche à suivre s'affiche."
      >
        <SituationPicker />
      </Section>

      <Section
        tone="paper"
        pattern="grid"
        chapter="04"
        eyebrow="Au quotidien"
        title="Les bons réflexes d'hygiène"
        lead="Des habitudes partagées qui protègent chaque élève et toute la classe."
      >
        <BentoGrid
          items={[
            {
              title: "Des cheveux propres",
              text: "Une attention particulière est portée à la propreté des cheveux, surtout chez les plus jeunes.",
              icon: Sparkles,
              span: "md",
              tone: "white",
            },
            {
              title: "Le dépistage des poux",
              text: "En maternelle et au primaire, l'école veille au dépistage. En cas de doute, prévenez l'administration.",
              icon: Scissors,
              span: "md",
              tone: "coral",
            },
            {
              title: "Une tenue propre et décente",
              text: "Chaque jour, une tenue propre et adaptée à la vie de l'école.",
              icon: Shirt,
              span: "sm",
              tone: "sand",
            },
            {
              title: "Protéger le groupe",
              text: "Après une maladie contagieuse, le certificat de non-contagion permet un retour en toute sécurité.",
              icon: HeartPulse,
              span: "sm",
              tone: "teal",
            },
            {
              title: "Des petits en confiance",
              image: media.medical.care.src,
              imageAlt: media.medical.care.alt,
              text: "Un cadre soigné où chaque enfant se sent chez lui.",
              span: "sm",
              tone: "white",
            },
          ]}
        />
      </Section>

      <Section tone="teal" pattern="zellige" chapter="05" eyebrow="Joindre l'école" title="Un doute, une question ? Appelez-nous">
        <div className="grid gap-5 md:grid-cols-3">
          {site.phones.map((phone, i) => (
            <Reveal key={phone} delay={i * 0.06}>
              <a
                href={telHref(phone)}
                className="group flex h-full items-center gap-5 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-coral-600 text-white">
                  <Phone className="size-6" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-xs font-bold tracking-[0.16em] text-white/70 uppercase">Téléphone</span>
                  <span className="mt-1 block font-display text-2xl text-white">{phone}</span>
                </span>
              </a>
            </Reveal>
          ))}
          <Reveal delay={0.12}>
            <a
              href={`mailto:${site.email}`}
              className="group flex h-full items-center gap-5 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-teal-500 text-white">
                <Mail className="size-6" strokeWidth={1.6} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold tracking-[0.16em] text-white/70 uppercase">Email</span>
                <span className="mt-1 block truncate font-display text-lg text-white">{site.email}</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex items-start gap-4 rounded-3xl border border-coral-500/40 bg-coral-600/20 p-6">
            <Siren className="mt-0.5 size-6 shrink-0 text-white" strokeWidth={1.6} />
            <p className="text-white/90">
              En cas d'urgence médicale, contactez d'abord les services d'urgence, puis prévenez l'école.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section
        tone="paper"
        chapter="06"
        eyebrow="Questions fréquentes"
        title="Vos questions, nos réponses"
        aside={
          <Reveal className="mt-8 hidden lg:block">
            <div className="flex items-center gap-4">
              <ClipboardCheck className="size-6 text-teal-700" strokeWidth={1.6} />
              <NoteMargin>tout est détaillé dans le règlement</NoteMargin>
            </div>
          </Reveal>
        }
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr]">
          <AccordionList
            defaultOpen="faq-1"
            entries={[
              {
                id: "faq-1",
                title: "Mon enfant est malade ce matin : que faire ?",
                content: (
                  <p>
                    Prévenez l'école le jour même, par téléphone ({site.phones[0]}) ou par email ({site.email}). Au retour,
                    remettez le justificatif au surveillant général.
                  </p>
                ),
              },
              {
                id: "faq-2",
                title: "Quel justificatif fournir au retour ?",
                content: (
                  <p>
                    Un certificat médical et/ou un justificatif écrit d'un parent, remis au surveillant général. Votre
                    enfant reprend ensuite les cours muni d'un billet d'excuse.
                  </p>
                ),
              },
              {
                id: "faq-3",
                title: "Et après une longue absence ?",
                content: (
                  <p>Un certificat médical attestant de la non-contagion est demandé avant le retour en classe.</p>
                ),
              },
              {
                id: "faq-4",
                title: "Mon enfant a des poux, comment faire ?",
                content: (
                  <p>
                    L'école porte une attention particulière à la propreté des cheveux et au dépistage des poux en
                    maternelle et au primaire. Prévenez l'administration pour agir ensemble et protéger la classe.
                  </p>
                ),
              },
            ]}
          />
          <Reveal delay={0.1} className="hidden lg:block">
            <img
              src={media.medical.hygiene.src}
              alt={media.medical.hygiene.alt}
              loading="lazy"
              className="tab-shape-alt w-full border-4 border-white object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Une information à transmettre sur la santé de votre enfant ?"
        text="L'administration est à votre écoute par téléphone, par email ou via le formulaire de contact."
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/reglement-interieur", label: "Lire le règlement" }}
        tone="coral"
      />

      <RelatedPages
        links={[
          { to: "/reglement-interieur", label: "Règlement intérieur", desc: "Titre II : absences et retards." },
          { to: "/horaires", label: "Horaires", desc: "La journée de votre enfant, niveau par niveau." },
          { to: "/restauration", label: "Restauration", desc: "Le service de cantine de l'école." },
        ]}
      />
    </>
  );
}
