import { useEffect, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Bus,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileSignature,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  ShoppingCart,
} from "lucide-react";
import { HeroSplit } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { AccordionList } from "@/components/site/blocks/AccordionList";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { Field, SelectInput, TextArea, TextInput, phoneRegex } from "@/components/site/forms/fields";
import { doors, site, telHref } from "@/data/site";
import heroAccueil from "@/assets/valeurs-cour.jpg";

const baseSubjects = ["Inscription", "Scolarité", "Restauration", "Transport scolaire", "Autre"];

const schema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom complet.").max(120),
  email: z.string().trim().email("Adresse email invalide."),
  telephone: z
    .string()
    .trim()
    .refine((v) => v === "" || phoneRegex.test(v), "Numéro invalide (ex. 06 12 34 56 78)."),
  objet: z.string().min(1, "Choisissez un objet."),
  message: z.string().trim().min(10, "Votre message est un peu court (10 caractères minimum).").max(3000),
});
type Values = z.infer<typeof schema>;

/* ---------- Formulaire ---------- */

function ContactForm() {
  const search = useSearch({ strict: false }) as { objet?: string };
  const preset = search.objet?.trim();
  const subjects = preset && !baseSubjects.includes(preset) ? [preset, ...baseSubjects] : baseSubjects;
  const [done, setDone] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched", defaultValues: { objet: preset ?? "", telephone: "" } });

  useEffect(() => {
    if (preset) setValue("objet", preset);
  }, [preset, setValue]);

  // MVP : aucune donnée n'est envoyée ni enregistrée, on affiche uniquement la confirmation.
  const onSubmit = async (v: Values) => {
    await new Promise((r) => setTimeout(r, 600));
    setDone(v.nom);
  };

  if (done) {
    return (
      <div className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-[2rem] border border-teal-500/40 bg-white p-10 text-center shadow-lift">
        <span className="grid size-16 place-items-center rounded-full bg-teal-50 text-teal-700">
          <CheckCircle2 className="size-8" strokeWidth={1.5} />
        </span>
        <h3 className="mt-5 font-display text-3xl">Message envoyé !</h3>
        <p className="mt-3 max-w-md text-ink-600">Merci {done}. L'administration vous répondra dans les meilleurs délais.</p>
        <button
          type="button"
          onClick={() => {
            reset({ objet: preset ?? "", telephone: "" });
            setDone(null);
          }}
          className="mt-6 text-sm font-bold text-teal-700 underline decoration-wavy underline-offset-8 hover:text-coral-700"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 rounded-[2rem] border border-line bg-white p-7 shadow-soft md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" htmlFor="ct-nom" error={errors.nom?.message}>
          <TextInput id="ct-nom" autoComplete="name" invalid={!!errors.nom} {...register("nom")} />
        </Field>
        <Field label="Email" htmlFor="ct-email" error={errors.email?.message}>
          <TextInput id="ct-email" type="email" autoComplete="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="Téléphone" htmlFor="ct-tel" optional error={errors.telephone?.message}>
          <TextInput id="ct-tel" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" invalid={!!errors.telephone} {...register("telephone")} />
        </Field>
        <Field label="Objet" htmlFor="ct-objet" error={errors.objet?.message}>
          <SelectInput id="ct-objet" invalid={!!errors.objet} {...register("objet")}>
            <option value="" disabled>
              Choisir un objet
            </option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>
      <Field label="Message" htmlFor="ct-message" error={errors.message?.message}>
        <TextArea id="ct-message" placeholder="Votre question…" invalid={!!errors.message} {...register("message")} />
      </Field>
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:bg-coral-700 disabled:opacity-60"
      >
        {isSubmitting ? "Envoi en cours…" : "Envoyer le message"} <Send className="size-4" />
      </button>
    </form>
  );
}

/* ---------- Page ---------- */

export function ContactPage() {
  const cards = [
    { icon: MapPin, label: "Adresse", value: site.address, href: site.mapsLink, external: true },
    ...site.phones.map((p) => ({ icon: Phone, label: "Téléphone", value: p, href: telHref(p), external: false })),
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  ];

  return (
    <>
      <HeroSplit
        chapter="01"
        eyebrow="Contact"
        title={
          <>
            Parlons de <span className="hand-underline">votre enfant</span>
          </>
        }
        lead="Une question sur l'inscription, la scolarité ou les services ? L'administration vous répond par téléphone, par email ou via le formulaire."
        crumbs={[{ label: "Contact" }]}
        image={heroAccueil}
        imageAlt="La cour arborée de Madariss Tingis"
        badge="Route de Rabat, Ziaten, Tanger"
        actions={
          <>
            <a
              href={telHref(site.phones[0] ?? "")}
              className="inline-flex items-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-coral-700"
            >
              <Phone className="size-4" /> {site.phones[0]}
            </a>
            <a href="#formulaire" className="inline-flex items-center gap-2 rounded-full border-2 border-teal-700 px-6 py-3 text-sm font-bold text-teal-700 hover:bg-teal-50">
              Écrire un message
            </a>
          </>
        }
      />

      <Section id="formulaire" tone="paper" pattern="lines" chapter="02" eyebrow="Écrivez-nous" title="Envoyer un message" className="scroll-mt-24">
        <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <ContactForm />
          <div className="space-y-3 lg:sticky lg:top-28">
            {cards.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={`${c.label}-${i}`} delay={i * 0.05}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-coral-50 text-coral-600 transition-colors group-hover:bg-coral-600 group-hover:text-white">
                      <Icon className="size-5" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold text-ink-600">{c.label}</span>
                      <span className="block break-words font-semibold text-ink-900">{c.value}</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
            <div className="flex items-start gap-4 rounded-2xl bg-teal-900 p-5 text-white">
              <Clock className="mt-0.5 size-5 shrink-0 text-teal-500" strokeWidth={1.7} />
              <p className="text-sm">
                Portes ouvertes de {doors.open} à {doors.close}.<br />
                Le vendredi, sortie à 13h30.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand" chapter="03" eyebrow="Nous trouver" title="Comment venir à l'école">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-lift">
              <iframe title="Carte : Madariss Tingis, Tanger" src={site.maps} loading="lazy" className="h-[26rem] w-full" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="space-y-4">
              {[
                { icon: Navigation, title: "Route de Rabat", text: "Au km 5,5 de la route de Rabat, dans le quartier de Ziaten." },
                { icon: ShoppingCart, title: "Le repère", text: "L'école se trouve derrière Aswak Assalam." },
                { icon: Bus, title: "Sans voiture ?", text: "Renseignez-vous sur le transport scolaire proposé par l'école." },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <li key={s.title} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal-700 font-display font-bold text-white">{i + 1}</span>
                    <span>
                      <span className="flex items-center gap-2 font-display text-lg">
                        <Icon className="size-4 text-coral-600" strokeWidth={1.8} /> {s.title}
                      </span>
                      <span className="text-sm text-ink-600">{s.text}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Action href={site.mapsLink}>Itinéraire Google Maps</Action>
              <Action to="/transport-scolaire" variant="secondary">
                Transport scolaire
              </Action>
            </div>
            <NoteMargin className="mt-6 block">à bientôt à l'école !</NoteMargin>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" chapter="04" eyebrow="Accès rapide" title="Vous cherchez peut-être…">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { href: site.pronote, icon: ExternalLink, title: "Pronote", text: "Le suivi quotidien de votre enfant.", tone: "bg-teal-900 text-white" },
            { href: site.massar, icon: ExternalLink, title: "Massar", text: "Le service officiel du ministère.", tone: "bg-white text-ink-900 border border-line" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <a key={c.title} href={c.href} target="_blank" rel="noreferrer noopener" className={`group flex flex-col justify-between gap-6 rounded-[2rem] p-7 shadow-soft transition-transform hover:-translate-y-1 ${c.tone}`}>
                <Icon className="size-7" strokeWidth={1.5} />
                <span>
                  <span className="block font-display text-2xl">{c.title}</span>
                  <span className="mt-1 block text-sm opacity-80">{c.text}</span>
                </span>
              </a>
            );
          })}
          <Link to={"/inscription" as never} className="group flex flex-col justify-between gap-6 rounded-[2rem] bg-coral-600 p-7 text-white shadow-soft transition-transform hover:-translate-y-1">
            <FileSignature className="size-7" strokeWidth={1.5} />
            <span>
              <span className="block font-display text-2xl">Demande d'inscription</span>
              <span className="mt-1 block text-sm text-white/85">Le formulaire en ligne, en 5 étapes.</span>
            </span>
          </Link>
        </div>
      </Section>

      <Section tone="white" chapter="05" eyebrow="Questions fréquentes" title="Avant de nous écrire">
        <div className="mx-auto max-w-3xl">
          <AccordionList
            defaultOpen="c-1"
            entries={[
              { id: "c-1", title: "Comment inscrire mon enfant ?", content: <p>Déposez une demande en ligne sur la page Demande d'inscription. L'administration vous recontacte pour le test d'accès au niveau.</p> },
              { id: "c-2", title: "Comment obtenir la grille tarifaire ?", content: <p>Faites la demande sur la page Frais de scolarité ou contactez l'administration : la grille vous est transmise selon le niveau.</p> },
              { id: "c-3", title: "Mon enfant sera absent, qui prévenir ?", content: <p>Avertissez l'école le jour même par téléphone ou par email. Les détails sont sur la page Assistance médicale.</p> },
              { id: "c-4", title: "Peut-on visiter l'école ?", content: <p>Contactez l'administration pour convenir d'un rendez-vous.</p> },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Prêt à nous rejoindre ?"
        text="Déposez votre demande d'inscription en quelques minutes."
        primary={{ to: "/inscription", label: "Inscrire mon enfant" }}
        secondary={{ to: "/cycles", label: "Découvrir les cycles" }}
        tone="gradient"
      />
    </>
  );
}
