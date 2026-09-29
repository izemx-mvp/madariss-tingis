import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BellRing, Building2, CalendarClock, CheckCircle2, FileSignature, Printer, Send, Wallet } from "lucide-react";
import { HeroDocument } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { AccordionList } from "@/components/site/blocks/AccordionList";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { Field, SelectInput, TextInput, levels, phoneRegex } from "@/components/site/forms/fields";
import { SCHOOL_YEAR } from "@/data/site";
import { cn } from "@/lib/utils";
import heroAdmission from "@/assets/hero-admission.jpg";

/* ---------- Échéancier interactif ---------- */

const months = ["Septembre", "Octobre", "Novembre", "Décembre", "Janvier", "Février", "Mars", "Avril", "Mai", "Juin"];
const nextMonth = (i: number): string => months[i + 1] ?? "Juillet";

function PaymentTimeline() {
  const [active, setActive] = useState(0);
  const [startYear, endYear] = SCHOOL_YEAR.split("/");
  const yearOf = (i: number) => (i <= 3 ? startYear : endYear);
  const dueYear = (i: number) => (i <= 2 ? startYear : endYear);

  return (
    <div>
      <div className="-mx-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">
        <ol className="relative flex min-w-[48rem] justify-between">
          <span className="absolute top-6 right-6 left-6 h-1 rounded-full bg-line" aria-hidden="true" />
          <span
            className="absolute top-6 left-6 h-1 rounded-full bg-coral-500 transition-all duration-500"
            style={{ width: `calc(${(active / (months.length - 1)) * 100}% - ${(active / (months.length - 1)) * 3}rem)` }}
            aria-hidden="true"
          />
          {months.map((m, i) => (
            <li key={m} className="relative">
              <button type="button" onClick={() => setActive(i)} aria-pressed={active === i} className="group flex flex-col items-center gap-2">
                <span
                  className={cn(
                    "grid size-12 place-items-center rounded-full border-4 border-paper font-display text-sm font-bold transition-all duration-300",
                    i <= active ? "bg-coral-600 text-white shadow-soft" : "bg-white text-ink-600 shadow-soft",
                    i === active && "scale-110",
                  )}
                >
                  {m.slice(0, 3)}
                </span>
                <span className={cn("text-xs font-bold", i === active ? "text-coral-700" : "text-ink-600 group-hover:text-teal-700")}>
                  {yearOf(i)}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <Reveal key={active} className="mt-10">
        <div className="grid items-center gap-6 rounded-[2rem] border border-line bg-white p-7 shadow-soft md:grid-cols-[1fr_auto_1fr] md:p-10">
          <div>
            <p className="text-sm font-bold text-ink-600">Mois de scolarité</p>
            <p className="mt-1 font-display text-3xl text-teal-900">
              {months[active]} {yearOf(active)}
            </p>
          </div>
          <CalendarClock className="size-10 text-coral-600 md:mx-auto" strokeWidth={1.4} />
          <div className="rounded-2xl bg-coral-50 p-5">
            <p className="text-sm font-bold text-coral-700">À régler avant le</p>
            <p className="mt-1 font-display text-3xl text-coral-700">
              05 {nextMonth(active).toLowerCase()} {dueYear(active)}
            </p>
          </div>
        </div>
      </Reveal>
      <NoteMargin className="mt-6 block">cliquez sur un mois pour voir son échéance</NoteMargin>
    </div>
  );
}

/* ---------- Formulaire "Recevoir la grille tarifaire" ---------- */

const schema = z.object({
  nom: z.string().trim().min(2, "Indiquez votre nom complet.").max(120),
  email: z.string().trim().email("Adresse email invalide."),
  telephone: z.string().trim().regex(phoneRegex, "Numéro invalide (ex. 06 12 34 56 78)."),
  niveau: z.string().min(1, "Choisissez le niveau concerné."),
});
type FeeValues = z.infer<typeof schema>;

function FeeRequestForm() {
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeeValues>({ resolver: zodResolver(schema), mode: "onTouched" });

  // MVP : aucune donnée n'est envoyée ni enregistrée, on affiche uniquement la confirmation.
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-teal-500/40 bg-white p-10 text-center shadow-lift">
        <span className="grid size-16 place-items-center rounded-full bg-teal-50 text-teal-700">
          <CheckCircle2 className="size-8" strokeWidth={1.5} />
        </span>
        <h3 className="mt-5 font-display text-3xl">Demande envoyée !</h3>
        <p className="mt-3 max-w-sm text-ink-600">
          Merci. L'administration vous transmettra la grille tarifaire correspondant au niveau choisi.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setDone(false);
          }}
          className="mt-6 text-sm font-bold text-teal-700 underline decoration-wavy underline-offset-8 hover:text-coral-700"
        >
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 rounded-[2rem] border border-line bg-white p-7 shadow-soft md:p-9">
      <Field label="Nom complet" htmlFor="f-nom" error={errors.nom?.message}>
        <TextInput id="f-nom" autoComplete="name" invalid={!!errors.nom} {...register("nom")} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Email" htmlFor="f-email" error={errors.email?.message}>
          <TextInput id="f-email" type="email" autoComplete="email" invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field label="Téléphone" htmlFor="f-tel" error={errors.telephone?.message}>
          <TextInput id="f-tel" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" invalid={!!errors.telephone} {...register("telephone")} />
        </Field>
      </div>
      <Field label="Niveau concerné" htmlFor="f-niveau" error={errors.niveau?.message}>
        <SelectInput id="f-niveau" defaultValue="" invalid={!!errors.niveau} {...register("niveau")}>
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
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-all hover:bg-coral-700 disabled:opacity-60"
      >
        {isSubmitting ? "Envoi en cours…" : "Recevoir la grille tarifaire"}
        <Send className="size-4" />
      </button>
    </form>
  );
}

/* ---------- Page ---------- */

export function FraisPage() {
  return (
    <>
      <HeroDocument
        chapter="01"
        eyebrow="Inscription"
        title="Frais de scolarité"
        lead="Comment fonctionnent les droits d'inscription et le paiement de la scolarité. La grille tarifaire est transmise sur demande."
        crumbs={[{ label: "Inscription" }, { label: "Frais de scolarité" }]}
        meta={[
          { label: "Inscription", value: "Droits annuels" },
          { label: "Scolarité", value: "Paiement mensuel" },
          { label: "Échéance", value: "Avant le 05" },
        ]}
        image={heroAdmission}
        imageAlt="Une famille reçue au secrétariat de l'école"
        actions={
          <>
            <a
              href="#grille"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all duration-300 hover:bg-coral-700 hover:shadow-lift"
            >
              Recevoir la grille tarifaire
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-teal-700 px-6 py-3 text-sm font-bold text-teal-700 transition-all duration-300 hover:bg-teal-50"
            >
              <Printer className="size-4" /> Imprimer
            </button>
          </>
        }
      />

      <Section tone="sand" chapter="02" eyebrow="Le principe" title="Comment ça marche" lead="Trois règles simples, issues du règlement intérieur (Titre I).">
        <IconCardGrid
          cards={[
            { icon: FileSignature, title: "Les droits annuels d'inscription", text: "Réglés à l'inscription, ils rendent l'inscription définitive, avec la fiche de renseignements signée." },
            { icon: Building2, title: "Une scolarité mensuelle", text: "Les frais de scolarité sont réglés chaque mois auprès du service comptable de l'école." },
            { icon: BellRing, title: "Avant le 05 du mois suivant", text: "Chaque mois de scolarité est à régler avant le 05 du mois qui suit.", note: "la date à retenir !" },
          ]}
        />
      </Section>

      <Section tone="paper" pattern="grid" chapter="03" eyebrow="L'échéancier" title="Quand régler chaque mois ?" lead={`L'année ${SCHOOL_YEAR}, mois par mois.`}>
        <PaymentTimeline />
      </Section>

      <Section id="grille" tone="teal" pattern="zellige" chapter="04" eyebrow="La grille tarifaire" title="Recevez la grille correspondant à votre niveau" className="scroll-mt-24">
        <div className="grid items-stretch gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-center">
              <Wallet className="size-12 text-coral-500" strokeWidth={1.3} />
              <p className="mt-6 text-lg text-white/85">
                Les tarifs dépendent du niveau de votre enfant. Laissez vos coordonnées : l'administration vous transmet
                la grille à jour.
              </p>
              <ul className="mt-6 space-y-3 text-white/85">
                {["Réponse par email ou par téléphone", "Aucun engagement", "Un interlocuteur pour vos questions"].map((t) => (
                  <li key={t} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-teal-500" strokeWidth={1.8} /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <FeeRequestForm />
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" chapter="05" eyebrow="Questions fréquentes" title="Vos questions sur le paiement">
        <div className="mx-auto max-w-3xl">
          <AccordionList
            defaultOpen="p-1"
            entries={[
              { id: "p-1", title: "Où régler les frais de scolarité ?", content: <p>Auprès du service comptable de l'école, chaque mois.</p> },
              { id: "p-2", title: "Quelle est la date limite ?", content: <p>Le 05 du mois suivant le mois de scolarité. Exemple : le mois d'octobre se règle avant le 05 novembre.</p> },
              { id: "p-3", title: "Pourquoi les tarifs ne sont-ils pas affichés ?", content: <p>Ils varient selon le niveau. La grille à jour vous est transmise sur demande, via le formulaire ci-dessus ou par l'administration.</p> },
            ]}
          />
        </div>
      </Section>

      <CtaBand
        title="Prêt à inscrire votre enfant ?"
        text="Déposez votre demande en ligne en quelques minutes."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/conditions-admission", label: "Conditions d'admission" }}
        tone="coral"
      />

      <RelatedPages
        links={[
          { to: "/inscription", label: "Demande d'inscription", desc: "Le formulaire en ligne." },
          { to: "/conditions-admission", label: "Conditions d'admission", desc: "Les étapes et le dossier." },
          { to: "/reglement-interieur", label: "Règlement intérieur", desc: "Titre I : admission et inscription." },
        ]}
      />
    </>
  );
}
