import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Bus,
  CheckCircle2,
  ClipboardCheck,
  FileSignature,
  FileText,
  Home,
  MessageSquareText,
  Phone,
  Mail,
  Soup,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { HeroSplit } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { TimelineVertical } from "@/components/site/blocks/Timeline";
import { AccordionList } from "@/components/site/blocks/AccordionList";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { Field, SelectInput, TextArea, TextInput, levels, phoneRegex } from "@/components/site/forms/fields";
import { site, telHref } from "@/data/site";
import { cn } from "@/lib/utils";
import heroAdmission from "@/assets/hero-admission.jpg";

/* ---------- Schéma ---------- */

const schema = z.object({
  civilite: z.enum(["M.", "Mme", "Mlle"], { error: "Choisissez une civilité." }),
  nom: z.string().trim().min(2, "Indiquez votre nom.").max(80),
  prenom: z.string().trim().min(2, "Indiquez votre prénom.").max(80),
  telephone: z.string().trim().regex(phoneRegex, "Numéro invalide (ex. 06 12 34 56 78)."),
  email: z.string().trim().email("Adresse email invalide."),
  enfantPrenom: z.string().trim().min(2, "Indiquez le prénom de l'enfant.").max(80),
  enfantNom: z.string().trim().min(2, "Indiquez le nom de l'enfant.").max(80),
  dateNaissance: z
    .string()
    .min(1, "Indiquez la date de naissance.")
    .refine((v) => {
      const d = new Date(v);
      const now = new Date();
      return !Number.isNaN(d.getTime()) && d < now && d.getFullYear() > now.getFullYear() - 21;
    }, "Date de naissance invalide."),
  niveau: z.string().min(1, "Choisissez le niveau souhaité."),
  ecolePrecedente: z.string().trim().max(120).optional(),
  adresse: z.string().trim().min(5, "Indiquez votre adresse.").max(200),
  codePostal: z.string().trim().regex(/^\d{5}$/, "Code postal à 5 chiffres."),
  commune: z.string().trim().min(2, "Indiquez la commune.").max(80),
  services: z.array(z.enum(["restauration", "transport"])),
  commentaire: z.string().trim().max(1500, "1 500 caractères maximum.").optional(),
  consentement: z.literal(true, { error: "Votre accord est nécessaire pour envoyer la demande." }),
});

type FormValues = z.infer<typeof schema>;

const steps: { title: string; icon: typeof UserRound; fields: (keyof FormValues)[] }[] = [
  { title: "Parent", icon: UserRound, fields: ["civilite", "nom", "prenom", "telephone", "email"] },
  { title: "Enfant", icon: Baby, fields: ["enfantPrenom", "enfantNom", "dateNaissance", "niveau", "ecolePrecedente"] },
  { title: "Adresse", icon: Home, fields: ["adresse", "codePostal", "commune"] },
  { title: "Services", icon: Soup, fields: ["services"] },
  { title: "Envoi", icon: MessageSquareText, fields: ["commentaire", "consentement"] },
];

/* ---------- Formulaire en étapes ---------- */

function InscriptionForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<FormValues | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { services: [], ecolePrecedente: "", commentaire: "" },
  });

  const next = async () => {
    const ok = await trigger(steps[step]?.fields ?? []);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  // MVP : aucune donnée n'est envoyée ni enregistrée, on affiche uniquement la confirmation.
  const onSubmit = async (values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSent(values);
    document.getElementById("formulaire")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const services = watch("services") ?? [];
  const pct = ((step + 1) / steps.length) * 100;

  if (sent) {
    return (
      <Reveal>
        <div className="rounded-[2rem] border border-teal-500/40 bg-white p-8 text-center shadow-lift md:p-12">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-teal-50 text-teal-700">
            <CheckCircle2 className="size-10" strokeWidth={1.5} />
          </span>
          <h3 className="mt-6 font-display text-3xl md:text-4xl">Demande envoyée !</h3>
          <p className="mx-auto mt-3 max-w-lg text-ink-600">
            Merci {sent.civilite} {sent.nom}. Votre demande d'inscription pour {sent.enfantPrenom} a bien été transmise.
            L'administration vous recontactera pour organiser le test d'accès au niveau.
          </p>
          <dl className="mx-auto mt-8 grid max-w-lg gap-3 rounded-2xl bg-paper p-5 text-left text-sm sm:grid-cols-2">
            <div>
              <dt className="font-bold text-ink-600">Enfant</dt>
              <dd className="text-ink-900">
                {sent.enfantPrenom} {sent.enfantNom}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-ink-600">Niveau souhaité</dt>
              <dd className="text-ink-900">{sent.niveau}</dd>
            </div>
            <div>
              <dt className="font-bold text-ink-600">Téléphone</dt>
              <dd className="text-ink-900">{sent.telephone}</dd>
            </div>
            <div>
              <dt className="font-bold text-ink-600">Services</dt>
              <dd className="text-ink-900">
                {sent.services.length
                  ? sent.services.map((s) => (s === "restauration" ? "Restauration" : "Transport")).join(", ")
                  : "Aucun"}
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Action to="/conditions-admission">Préparer mon dossier</Action>
            <Action
              variant="secondary"
              onClick={() => {
                reset();
                setStep(0);
                setSent(null);
              }}
            >
              Nouvelle demande
            </Action>
          </div>
        </div>
      </Reveal>
    );
  }

  const err = (k: keyof FormValues) => errors[k]?.message as string | undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-[2rem] border border-line bg-white p-6 shadow-soft md:p-10">
      {/* progression */}
      <ol className="flex items-center justify-between gap-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const done = i < step;
          const on = i === step;
          return (
            <li key={s.title} className="flex flex-1 flex-col items-center gap-2 text-center">
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-full border-2 transition-all duration-300",
                  on && "scale-110 border-coral-600 bg-coral-600 text-white shadow-soft",
                  done && "border-teal-700 bg-teal-700 text-white",
                  !on && !done && "border-line bg-paper text-ink-600",
                )}
              >
                {done ? <CheckCircle2 className="size-5" /> : <Icon className="size-5" strokeWidth={1.7} />}
              </span>
              <span className={cn("hidden text-xs font-bold sm:block", on ? "text-coral-700" : "text-ink-600")}>{s.title}</span>
            </li>
          );
        })}
      </ol>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-sand">
        <div className="gradient-signature h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-3 text-sm font-bold text-ink-600">
        Étape {step + 1} sur {steps.length} · {steps[step]?.title}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
          className="mt-8"
        >
          {step === 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Civilité" htmlFor="civilite" error={err("civilite")} className="sm:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {(["M.", "Mme", "Mlle"] as const).map((c) => (
                    <label
                      key={c}
                      className="cursor-pointer rounded-full border border-line px-5 py-2.5 text-sm font-bold text-ink-600 transition-colors has-[:checked]:border-coral-600 has-[:checked]:bg-coral-600 has-[:checked]:text-white"
                    >
                      <input type="radio" value={c} className="sr-only" id={c === "M." ? "civilite" : undefined} {...register("civilite")} />
                      {c}
                    </label>
                  ))}
                </div>
              </Field>
              <Field label="Nom" htmlFor="nom" error={err("nom")}>
                <TextInput id="nom" autoComplete="family-name" invalid={!!errors.nom} {...register("nom")} />
              </Field>
              <Field label="Prénom" htmlFor="prenom" error={err("prenom")}>
                <TextInput id="prenom" autoComplete="given-name" invalid={!!errors.prenom} {...register("prenom")} />
              </Field>
              <Field label="Téléphone" htmlFor="telephone" error={err("telephone")}>
                <TextInput id="telephone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" invalid={!!errors.telephone} {...register("telephone")} />
              </Field>
              <Field label="Email" htmlFor="email" error={err("email")}>
                <TextInput id="email" type="email" autoComplete="email" placeholder="nom@exemple.com" invalid={!!errors.email} {...register("email")} />
              </Field>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Prénom de l'enfant" htmlFor="enfantPrenom" error={err("enfantPrenom")}>
                <TextInput id="enfantPrenom" invalid={!!errors.enfantPrenom} {...register("enfantPrenom")} />
              </Field>
              <Field label="Nom de l'enfant" htmlFor="enfantNom" error={err("enfantNom")}>
                <TextInput id="enfantNom" invalid={!!errors.enfantNom} {...register("enfantNom")} />
              </Field>
              <Field label="Date de naissance" htmlFor="dateNaissance" error={err("dateNaissance")}>
                <TextInput id="dateNaissance" type="date" invalid={!!errors.dateNaissance} {...register("dateNaissance")} />
              </Field>
              <Field label="Niveau souhaité" htmlFor="niveau" error={err("niveau")}>
                <SelectInput id="niveau" defaultValue="" invalid={!!errors.niveau} {...register("niveau")}>
                  <option value="" disabled>
                    Choisir un niveau
                  </option>
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="École précédente" htmlFor="ecolePrecedente" optional className="sm:col-span-2">
                <TextInput id="ecolePrecedente" {...register("ecolePrecedente")} />
              </Field>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Adresse" htmlFor="adresse" error={err("adresse")} className="sm:col-span-2">
                <TextInput id="adresse" autoComplete="street-address" invalid={!!errors.adresse} {...register("adresse")} />
              </Field>
              <Field label="Code postal" htmlFor="codePostal" error={err("codePostal")}>
                <TextInput id="codePostal" inputMode="numeric" autoComplete="postal-code" placeholder="90000" invalid={!!errors.codePostal} {...register("codePostal")} />
              </Field>
              <Field label="Commune" htmlFor="commune" error={err("commune")}>
                <TextInput id="commune" autoComplete="address-level2" placeholder="Tanger" invalid={!!errors.commune} {...register("commune")} />
              </Field>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <p className="text-ink-600">Souhaitez-vous des informations sur ces services ? (facultatif)</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  { id: "restauration" as const, label: "Restauration", text: "Le service de cantine de l'école.", icon: Soup },
                  { id: "transport" as const, label: "Transport scolaire", text: "Le trajet entre la maison et l'école.", icon: Bus },
                ].map((s) => {
                  const Icon = s.icon;
                  const on = services.includes(s.id);
                  return (
                    <label
                      key={s.id}
                      className={cn(
                        "flex cursor-pointer items-start gap-4 rounded-2xl border p-5 transition-all duration-300",
                        on ? "border-teal-500/60 bg-teal-50 shadow-soft" : "border-line bg-paper hover:border-coral-500/40",
                      )}
                    >
                      <input type="checkbox" value={s.id} className="sr-only" {...register("services")} />
                      <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", on ? "bg-teal-700 text-white" : "bg-white text-teal-700")}>
                        <Icon className="size-6" strokeWidth={1.6} />
                      </span>
                      <span>
                        <span className="block font-display text-lg">{s.label}</span>
                        <span className="text-sm text-ink-600">{s.text}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-5">
              <Field label="Commentaire" htmlFor="commentaire" optional error={err("commentaire")} hint="Une précision utile sur votre enfant ou votre demande.">
                <TextArea id="commentaire" invalid={!!errors.commentaire} {...register("commentaire")} />
              </Field>
              <div>
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-paper p-4">
                  <input type="checkbox" className="mt-1 size-5 accent-[var(--coral-600)]" {...register("consentement")} />
                  <span className="text-sm text-ink-600">
                    J'accepte que Madariss Tingis traite ces informations pour répondre à ma demande d'inscription,
                    conformément à la loi 09-08 relative à la protection des données personnelles.
                  </span>
                </label>
                {errors.consentement ? (
                  <p role="alert" className="mt-1.5 text-sm font-bold text-coral-700">
                    {errors.consentement.message}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-teal-700 transition-opacity hover:bg-teal-50 disabled:pointer-events-none disabled:opacity-0"
        >
          <ArrowLeft className="size-4" /> Retour
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="group inline-flex items-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all hover:bg-coral-700"
          >
            Continuer <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all hover:bg-coral-700 disabled:opacity-60"
          >
            {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande"}
            <CheckCircle2 className="size-4" />
          </button>
        )}
      </div>
    </form>
  );
}

/* ---------- Page ---------- */

export function InscriptionPage() {
  return (
    <>
      <HeroSplit
        chapter="01"
        eyebrow="Inscription"
        title={
          <>
            Demande <span className="hand-underline">d'inscription</span>
          </>
        }
        lead="Quelques minutes suffisent pour déposer votre demande. L'administration vous recontacte ensuite pour la suite du parcours."
        crumbs={[{ label: "Inscription" }, { label: "Demande d'inscription" }]}
        image={heroAdmission}
        imageAlt="Une famille accueillie au secrétariat de l'école"
        badge="Priorité aux frères et sœurs"
        note="5 étapes, c'est parti !"
        actions={
          <>
            <a
              href="#formulaire"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:bg-coral-700 hover:shadow-lift"
            >
              Commencer <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
            </a>
            <Action to="/conditions-admission" variant="secondary">
              Conditions d'admission
            </Action>
          </>
        }
      />

      <Section id="formulaire" tone="paper" pattern="lines" chapter="02" eyebrow="Formulaire" title="Votre demande en 5 étapes" className="scroll-mt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <InscriptionForm />

          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-line bg-sand p-7">
              <p className="font-display text-2xl">Et après ?</p>
              <div className="mt-6">
                <TimelineVertical
                  items={[
                    { label: "Étape 1", title: "Test de niveau", text: "L'administration vous contacte pour le test d'accès au niveau.", icon: ClipboardCheck },
                    { label: "Étape 2", title: "Le dossier", text: "Fiche de renseignements signée et, pour les nouveaux, certificat de radiation.", icon: FileText },
                    { label: "Étape 3", title: "Inscription définitive", text: "Après règlement des droits annuels d'inscription.", icon: FileSignature },
                  ]}
                />
              </div>
            </div>
            <div className="rounded-[2rem] bg-teal-900 p-7 text-white">
              <p className="font-display text-xl text-white">Une question ?</p>
              <a href={telHref(site.phones[0] ?? "")} className="mt-4 flex items-center gap-3 text-white/90 hover:text-white">
                <Phone className="size-5" strokeWidth={1.6} /> {site.phones[0]}
              </a>
              <a href={`mailto:${site.email}`} className="mt-2 flex items-center gap-3 break-all text-white/90 hover:text-white">
                <Mail className="size-5 shrink-0" strokeWidth={1.6} /> {site.email}
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        tone="sand"
        chapter="03"
        eyebrow="À préparer"
        title="Pour finaliser l'inscription"
        lead="Ces éléments vous seront demandés après le test de niveau (règlement intérieur, Titre I)."
      >
        <IconCardGrid
          cards={[
            { icon: FileSignature, title: "La fiche de renseignements", text: "Complétée et signée par le parent ou le tuteur légal." },
            { icon: FileText, title: "Le certificat de radiation", text: "De l'établissement précédent, pour les élèves nouvellement inscrits.", note: "nouveaux inscrits" },
            { icon: Wallet, title: "Les droits annuels", text: "Le règlement des droits annuels d'inscription rend l'inscription définitive." },
          ]}
        />
      </Section>

      <Section tone="paper" chapter="04" eyebrow="Questions fréquentes" title="Avant de vous lancer">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-coral-600 p-8 text-white shadow-lift">
              <div className="zellige absolute inset-0" aria-hidden="true" />
              <Users className="relative size-10" strokeWidth={1.4} />
              <p className="relative mt-5 font-display text-3xl text-white">Frères et sœurs prioritaires</p>
              <p className="relative mt-3 text-white/90">
                La priorité est accordée aux frères et sœurs des élèves déjà scolarisés à Madariss Tingis.
              </p>
              <NoteMargin className="relative mt-5 block text-white">précisez-le en commentaire !</NoteMargin>
            </div>
          </Reveal>
          <AccordionList
            defaultOpen="i-1"
            entries={[
              { id: "i-1", title: "La demande vaut-elle inscription ?", content: <p>Non : elle ouvre le parcours. L'inscription devient définitive après le test de niveau, le dossier complet et le règlement des droits annuels.</p> },
              { id: "i-2", title: "En quoi consiste le test d'accès ?", content: <p>Il permet de situer l'élève et de l'orienter vers la classe qui lui convient. L'administration vous en précise les modalités.</p> },
              { id: "i-3", title: "Comment se paie la scolarité ?", content: <p>Mensuellement, auprès du service comptable, avant le 05 du mois suivant. Le détail est sur la page Frais de scolarité.</p> },
              { id: "i-4", title: "Puis-je inscrire plusieurs enfants ?", content: <p>Oui : déposez une demande par enfant, ou précisez-le dans le commentaire.</p> },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Envie de visiter l'école avant de vous décider ?"
        text="L'administration vous accueille et répond à toutes vos questions."
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/cycles", label: "Découvrir les cycles" }}
        tone="gradient"
      />

      <RelatedPages
        links={[
          { to: "/conditions-admission", label: "Conditions d'admission", desc: "Les étapes et le dossier." },
          { to: "/frais-de-scolarite", label: "Frais de scolarité", desc: "Comment fonctionne le paiement." },
          { to: "/cycles", label: "Cycles", desc: "De la maternelle au lycée." },
        ]}
      />
    </>
  );
}
