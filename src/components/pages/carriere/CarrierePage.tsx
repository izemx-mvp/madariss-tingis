import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Award,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  FileUp,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Lightbulb,
  Send,
  UserSearch,
  Users,
} from "lucide-react";
import { HeroFull } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { StepsRoad } from "@/components/site/blocks/StepsRoad";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { Field, SelectInput, TextArea, TextInput, phoneRegex } from "@/components/site/forms/fields";
import { site, telHref } from "@/data/site";
import { cn } from "@/lib/utils";
import heroProjetEcole from "@/assets/hero-projet-ecole.jpg";
import heroAccueil from "@/assets/hero-accueil.jpg";

/* ---------- Domaines (interactif) ---------- */

const domains = [
  {
    id: "enseignement",
    label: "Enseignement",
    icon: GraduationCap,
    text: "De la maternelle au lycée, en arabe, en français et en anglais : des enseignants qui accompagnent chaque élève vers la réussite.",
    points: ["Maternelle et primaire", "Collège et lycée (filières scientifiques)", "Langues : arabe, français, anglais"],
  },
  {
    id: "vie-scolaire",
    label: "Vie scolaire",
    icon: Users,
    text: "Accueil, encadrement et suivi des élèves au quotidien, dans le respect du règlement et des valeurs de l'école.",
    points: ["Accueil et encadrement des élèves", "Suivi des absences et du quotidien", "Activités et temps forts de l'année"],
  },
  {
    id: "administration",
    label: "Administration et services",
    icon: Building2,
    text: "Secrétariat, comptabilité et services aux familles : les équipes qui font tourner l'école chaque jour.",
    points: ["Secrétariat et accueil des familles", "Service comptable", "Services : restauration, transport"],
  },
];

function DomainTabs() {
  const [id, setId] = useState(domains[0]?.id ?? "");
  const current = domains.find((d) => d.id === id) ?? domains[0];
  if (!current) return null;
  const Icon = current.icon;
  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="flex flex-col gap-3">
        {domains.map((d) => {
          const DIcon = d.icon;
          const on = d.id === current.id;
          return (
            <button
              key={d.id}
              type="button"
              aria-pressed={on}
              onClick={() => setId(d.id)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                on ? "border-coral-600 bg-coral-600 text-white shadow-lift" : "border-line bg-white hover:border-teal-500/60",
              )}
            >
              <span className={cn("grid size-12 place-items-center rounded-xl", on ? "bg-white/15" : "bg-teal-50 text-teal-700")}>
                <DIcon className="size-6" strokeWidth={1.6} />
              </span>
              <span className="font-display text-lg">{d.label}</span>
            </button>
          );
        })}
      </div>
      <Reveal key={current.id}>
        <div className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-10">
          <Icon className="absolute -right-6 -bottom-6 size-44 text-teal-50" strokeWidth={1} />
          <div className="relative">
            <h3 className="font-display text-3xl">{current.label}</h3>
            <p className="mt-3 text-ink-600">{current.text}</p>
            <ul className="mt-6 space-y-3">
              {current.points.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-teal-700" strokeWidth={1.8} />
                  {p}
                </li>
              ))}
            </ul>
            <NoteMargin className="mt-6 block">candidatures spontanées bienvenues</NoteMargin>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ---------- Formulaire de candidature ---------- */

const MAX_CV = 5 * 1024 * 1024;
const schema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom complet.").max(120),
  email: z.string().trim().email("Adresse email invalide."),
  telephone: z.string().trim().regex(phoneRegex, "Numéro invalide (ex. 06 12 34 56 78)."),
  domaine: z.string().min(1, "Choisissez un domaine."),
  sujet: z.string().trim().min(3, "Précisez l'objet de votre candidature.").max(150),
  message: z.string().trim().min(20, "Présentez-vous en quelques lignes (20 caractères minimum).").max(3000),
  cv: z
    .custom<FileList>()
    .refine((f) => f instanceof FileList && f.length === 1, "Ajoutez votre CV.")
    .refine((f) => !(f instanceof FileList) || !f[0] || /\.(pdf|docx)$/i.test(f[0].name), "Format accepté : PDF ou DOCX.")
    .refine((f) => !(f instanceof FileList) || !f[0] || f[0].size <= MAX_CV, "5 Mo maximum."),
  consentement: z.literal(true, { error: "Votre accord est nécessaire." }),
});
type Values = z.infer<typeof schema>;

function ApplicationForm() {
  const [done, setDone] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched" });
  const file = watch("cv")?.[0];

  // MVP : aucune donnée n'est envoyée ni enregistrée, on affiche uniquement la confirmation.
  const onSubmit = async (v: Values) => {
    await new Promise((r) => setTimeout(r, 700));
    setDone(v.nom);
  };

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-teal-500/40 bg-white p-10 text-center shadow-lift">
        <span className="grid size-16 place-items-center rounded-full bg-teal-50 text-teal-700">
          <CheckCircle2 className="size-8" strokeWidth={1.5} />
        </span>
        <h3 className="mt-5 font-display text-3xl">Candidature envoyée !</h3>
        <p className="mt-3 max-w-md text-ink-600">
          Merci {done}. Votre candidature a bien été transmise. Nous vous contacterons si votre profil correspond à nos
          besoins.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setDone(null);
          }}
          className="mt-6 text-sm font-bold text-teal-700 underline decoration-wavy underline-offset-8 hover:text-coral-700"
        >
          Envoyer une autre candidature
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 rounded-[2rem] border border-line bg-white p-7 shadow-soft md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" htmlFor="c-nom" error={errors.nom?.message}>
          <TextInput id="c-nom" autoComplete="name" invalid={!!errors.nom} {...register("nom")} />
        </Field>
        <Field label="Email" htmlFor="c-email" error={errors.email?.message}>
          <TextInput id="c-email" type="email" autoComplete="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="Téléphone" htmlFor="c-tel" error={errors.telephone?.message}>
          <TextInput id="c-tel" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" invalid={!!errors.telephone} {...register("telephone")} />
        </Field>
        <Field label="Domaine" htmlFor="c-domaine" error={errors.domaine?.message}>
          <SelectInput id="c-domaine" defaultValue="" invalid={!!errors.domaine} {...register("domaine")}>
            <option value="" disabled>
              Choisir un domaine
            </option>
            {domains.map((d) => (
              <option key={d.id} value={d.label}>
                {d.label}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>
      <Field label="Objet" htmlFor="c-sujet" error={errors.sujet?.message}>
        <TextInput id="c-sujet" placeholder="Ex. Enseignant(e) de français au primaire" invalid={!!errors.sujet} {...register("sujet")} />
      </Field>
      <Field label="Message" htmlFor="c-message" error={errors.message?.message}>
        <TextArea id="c-message" placeholder="Votre parcours, vos motivations…" invalid={!!errors.message} {...register("message")} />
      </Field>
      <Field label="CV" htmlFor="c-cv" error={errors.cv?.message as string | undefined}>
        <label
          htmlFor="c-cv"
          className={cn(
            "flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed p-5 transition-colors",
            errors.cv ? "border-coral-500 bg-coral-50" : file ? "border-teal-500 bg-teal-50" : "border-line bg-paper hover:border-teal-500/60",
          )}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-teal-700 shadow-soft">
            <FileUp className="size-6" strokeWidth={1.6} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-bold">{file ? file.name : "Choisir un fichier"}</span>
            <span className="text-sm text-ink-600">PDF ou DOCX, 5 Mo maximum</span>
          </span>
        </label>
        <input id="c-cv" type="file" accept=".pdf,.docx" className="sr-only" {...register("cv")} />
      </Field>
      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-paper p-4">
          <input type="checkbox" className="mt-1 size-5 accent-[var(--coral-600)]" {...register("consentement")} />
          <span className="text-sm text-ink-600">
            J'accepte que Madariss Tingis traite ces informations pour étudier ma candidature, conformément à la loi 09-08.
          </span>
        </label>
        {errors.consentement ? (
          <p role="alert" className="mt-1.5 text-sm font-bold text-coral-700">
            {errors.consentement.message}
          </p>
        ) : null}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:bg-coral-700 disabled:opacity-60"
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer ma candidature"} <Send className="size-4" />
      </button>
    </form>
  );
}

/* ---------- Page ---------- */

export function CarrierePage() {
  return (
    <>
      <HeroFull
        chapter="01"
        eyebrow="Carrière"
        title="Rejoignez l'équipe Madariss Tingis"
        lead="Enseignants, vie scolaire, administration : nous cherchons des personnes engagées pour accompagner chaque élève vers la réussite."
        crumbs={[{ label: "Carrière" }]}
        image={heroProjetEcole}
        imageAlt="Réunion de l'équipe pédagogique autour d'une table"
        stamp={["On", "recrute !"]}
        actions={
          <a href="#candidature" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 shadow-soft hover:bg-teal-50">
            Déposer ma candidature
          </a>
        }
      />

      <Section tone="paper" pattern="grid" chapter="02" eyebrow="Pourquoi nous rejoindre" title="Grandir avec l'école">
        <BentoGrid
          items={[
            { title: "Une formation chaque année", text: "Un programme de formation annuelle des enseignants, renouvelé chaque rentrée.", icon: BookOpenCheck, span: "lg", tone: "coral" },
            { title: "Une démarche qualité", text: "Démarche de certification ISO 21001 lancée en 2026/2027.", icon: Award, span: "sm", tone: "white" },
            { title: "Des outils modernes", text: "Pronote pour le lien avec les familles.", icon: Laptop, span: "sm", tone: "sand" },
            { title: "Une communauté unie", text: "Une équipe solidaire, tournée vers la réussite de chaque élève.", icon: HeartHandshake, span: "sm", tone: "teal" },
            { title: "Un projet éducatif innovant", text: "Allier tradition et innovation pédagogique.", icon: Lightbulb, span: "md", tone: "grid" },
            { title: "Au quotidien", image: heroAccueil, imageAlt: "Une enseignante et ses élèves", text: "Une équipe au service des élèves, chaque jour.", span: "md", tone: "white" },
          ]}
        />
      </Section>

      <Section tone="sand" chapter="03" eyebrow="Nos métiers" title="Trois domaines, un même projet">
        <DomainTabs />
      </Section>

      <Section tone="paper" chapter="04" eyebrow="Le parcours" title="Comment se passe une candidature">
        <StepsRoad
          steps={[
            { icon: Send, title: "Vous postulez", text: "Remplissez le formulaire ci-dessous et joignez votre CV." },
            { icon: UserSearch, title: "Nous étudions", text: "L'équipe de direction étudie chaque candidature avec attention." },
            { icon: HeartHandshake, title: "Nous revenons vers vous", text: "Si votre profil correspond à nos besoins, nous vous contactons." },
          ]}
        />
      </Section>

      <Section id="candidature" tone="teal" pattern="zellige" chapter="05" eyebrow="Candidature spontanée" title="Envoyez-nous votre candidature" className="scroll-mt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <p className="text-lg text-white/85">
              Aucune offre ne correspond exactement à votre profil ? Les candidatures spontanées sont étudiées toute
              l'année.
            </p>
            <div className="mt-8 space-y-3">
              <a href={`mailto:${site.email}`} className="block rounded-2xl bg-white/10 p-4 text-white hover:bg-white/15">
                <span className="block text-xs font-bold text-white/70">Email</span>
                <span className="break-all">{site.email}</span>
              </a>
              <a href={telHref(site.phones[0] ?? "")} className="block rounded-2xl bg-white/10 p-4 text-white hover:bg-white/15">
                <span className="block text-xs font-bold text-white/70">Téléphone</span>
                {site.phones[0]}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ApplicationForm />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Envie d'en savoir plus sur notre projet ?"
        text="Découvrez notre mission et nos valeurs avant de postuler."
        primary={{ to: "/mission", label: "Notre mission" }}
        secondary={{ to: "/projet-ecole", label: "Projet d'école" }}
        tone="coral"
      />

      <RelatedPages
        links={[
          { to: "/mission", label: "Mission", desc: "Former pour un avenir meilleur." },
          { to: "/projet-ecole", label: "Projet d'école", desc: "Nos axes pédagogiques." },
          { to: "/contact", label: "Contact", desc: "Une question ? Écrivez-nous." },
        ]}
      />
    </>
  );
}
