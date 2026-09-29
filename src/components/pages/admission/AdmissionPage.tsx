import {
  CalendarClock,
  ClipboardList,
  CreditCard,
  FileCheck2,
  HelpCircle,
  MonitorSmartphone,
  PenLine,
  Send,
  Users,
} from "lucide-react";
import { HeroSplit } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { StepsRoad } from "@/components/site/blocks/StepsRoad";
import { ChecklistInteractive } from "@/components/site/blocks/ChecklistInteractive";
import { AccordionList } from "@/components/site/blocks/AccordionList";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { site } from "@/data/site";
import heroAdmission from "@/assets/hero-admission.jpg";
import partenariat from "@/assets/partenariat-parents.jpg";

const faq = [
  {
    id: "faq-test",
    title: "Le test d'accès au niveau est-il obligatoire ?",
    content:
      "Oui. L'admission suppose la présentation des documents demandés et la réussite d'un test d'accès au niveau, qui permet de situer l'élève et de l'orienter vers la classe qui lui convient.",
  },
  {
    id: "faq-fratrie",
    title: "Mes autres enfants sont déjà scolarisés à l'école, cela change-t-il quelque chose ?",
    content:
      "Oui : la priorité est accordée aux frères et sœurs des élèves déjà scolarisés dans l'établissement.",
  },
  {
    id: "faq-radiation",
    title: "Le certificat de radiation est-il demandé à tout le monde ?",
    content:
      "Non. Il est demandé aux élèves nouvellement inscrits, qui arrivent d'un autre établissement.",
  },
  {
    id: "faq-definitive",
    title: "Quand mon inscription est-elle définitive ?",
    content:
      "Lorsque les trois éléments sont réunis : la fiche de renseignements complétée et signée, le certificat de radiation pour les nouveaux inscrits, et le règlement des droits annuels d'inscription.",
  },
  {
    id: "faq-paiement",
    title: "Comment se déroule le paiement après l'inscription ?",
    content:
      "Les frais de scolarité sont réglés mensuellement auprès du service comptable de l'école, avant le 05 du mois suivant.",
  },
];

export function AdmissionPage() {
  return (
    <>
      <HeroSplit
        chapter="03"
        eyebrow="Vie scolaire"
        title="Conditions d'admission"
        lead="Quatre étapes, trois pièces à réunir : voici comment se déroule une inscription à Madariss Tingis."
        crumbs={[{ label: "Vie scolaire" }, { label: "Conditions d'admission" }]}
        note="on vous accompagne à chaque étape"
        image={heroAdmission}
        imageAlt="Une famille reçue au bureau des inscriptions"
        badge="Priorité aux frères et sœurs"
        actions={
          <>
            <Action to="/inscription">Déposer une demande</Action>
            <Action to="/frais-de-scolarite" variant="secondary">
              Frais de scolarité
            </Action>
          </>
        }
      />

      <Section
        tone="paper"
        pattern="grid"
        chapter="04"
        eyebrow="Le parcours"
        title="Quatre étapes jusqu'à l'inscription"
        lead="Le chemin est court, mais chaque étape compte."
      >
        <StepsRoad
          steps={[
            {
              icon: Send,
              title: "La demande d'inscription",
              text: "Vous prenez contact avec l'école et déposez une demande d'inscription pour votre enfant.",
            },
            {
              icon: PenLine,
              title: "Le test d'accès au niveau",
              text: "Un test permet de situer l'élève et de l'orienter vers la classe qui lui correspond.",
            },
            {
              icon: ClipboardList,
              title: "La constitution du dossier",
              text: "Fiche de renseignements signée et, pour les nouveaux inscrits, certificat de radiation.",
            },
            {
              icon: FileCheck2,
              title: "L'inscription définitive",
              text: "Le règlement des droits annuels d'inscription rend l'inscription définitive.",
            },
          ]}
        />
      </Section>

      <Section
        tone="sand"
        chapter="05"
        eyebrow="Votre dossier"
        title="Mon dossier, pièce par pièce"
        lead="Cochez chaque pièce au fur et à mesure : l'anneau vous indique où vous en êtes."
      >
        <ChecklistInteractive
          title="Les trois pièces de l'inscription définitive"
          items={[
            {
              id: "fiche",
              label: "La fiche de renseignements complétée et signée",
              help: "Signée par le parent ou le tuteur légal.",
            },
            {
              id: "radiation",
              label: "Le certificat de radiation de l'école précédente",
              help: "Demandé uniquement aux élèves nouvellement inscrits.",
            },
            {
              id: "droits",
              label: "Le règlement des droits annuels d'inscription",
              help: "Il rend l'inscription définitive.",
            },
          ]}
        />
        <NoteMargin className="mt-6 block">un dossier complet, c'est une rentrée sereine</NoteMargin>
      </Section>

      <Section tone="paper" chapter="06" eyebrow="Ensuite" title="Après l'inscription">
        <SplitFeature
          reverse
          eyebrow="Le quotidien"
          title="Paiement mensuel et suivi par Pronote"
          text={
            <p>
              Une fois l'élève inscrit, la scolarité se règle mensuellement auprès du service comptable de l'école,
              avant le 05 du mois suivant. Le suivi de l'élève et la communication avec l'école passent par Pronote.
            </p>
          }
          points={[
            "Paiement mensuel auprès du service comptable, avant le 05 du mois suivant",
            "Pronote : l'outil privilégié de communication entre l'école et les parents",
            "L'administration reste joignable par téléphone et par email",
          ]}
          image={partenariat}
          imageAlt="Échange entre des parents et l'équipe de l'école"
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <Action href={site.pronote} variant="secondary">
              <MonitorSmartphone className="size-4" strokeWidth={1.8} /> Ouvrir Pronote
            </Action>
            <Action to="/frais-de-scolarite" variant="tertiary">
              Comprendre les frais de scolarité
            </Action>
          </div>
        </SplitFeature>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {[
            { icon: CreditCard, title: "Avant le 05", text: "La mensualité est réglée avant le 05 du mois suivant." },
            { icon: CalendarClock, title: "Chaque mois", text: "Le paiement s'effectue auprès du service comptable." },
            { icon: Users, title: "Frères et sœurs", text: "La priorité est accordée aux fratries déjà scolarisées." },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 0.07}>
                <div className="h-full rounded-3xl bg-teal-900 p-6 text-white">
                  <Icon className="size-7" strokeWidth={1.6} />
                  <h4 className="mt-4 font-display text-lg text-white">{c.title}</h4>
                  <p className="mt-2 text-sm text-white/80">{c.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section
        tone="sand"
        chapter="07"
        eyebrow="Vos questions"
        title="Les questions que se posent les familles"
        lead="Les réponses proviennent du règlement intérieur de l'école."
      >
        <div className="mx-auto max-w-3xl">
          <AccordionList
            defaultOpen="faq-test"
            entries={faq.map((f) => ({
              id: f.id,
              title: f.title,
              content: <p>{f.content}</p>,
            }))}
          />
          <div className="mt-8 flex items-center gap-3 text-ink-600">
            <HelpCircle className="size-5 text-teal-700" strokeWidth={1.8} />
            <span className="text-sm">
              Une autre question ? Appelez l'administration au {site.phones[0]} ou écrivez à {site.email}.
            </span>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Prêt à inscrire votre enfant ?"
        text="Déposez votre demande en ligne : l'administration vous recontacte pour le test d'accès au niveau."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
      />

      <RelatedPages
        links={[
          { to: "/frais-de-scolarite", label: "Frais de scolarité", desc: "Droits d'inscription et paiement mensuel." },
          { to: "/reglement-interieur", label: "Règlement intérieur", desc: "Les articles 1 à 3 du Titre I." },
          { to: "/cycles", label: "Nos cycles", desc: "Trouver le bon niveau pour votre enfant." },
        ]}
      />
    </>
  );
}
