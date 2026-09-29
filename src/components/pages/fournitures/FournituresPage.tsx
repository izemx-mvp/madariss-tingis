import {
  BookMarked,
  Download,
  Info,
  Library,
  NotebookPen,
  PencilRuler,
  Ruler,
  ShoppingBag,
  Sparkles,
  Tags,
} from "lucide-react";
import { HeroPattern } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { StepsRoad } from "@/components/site/blocks/StepsRoad";
import { TabsPill } from "@/components/site/blocks/TabsPill";
import { SplitFeature } from "@/components/site/blocks/SplitFeature";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { supplyLists, supplyPendingMessage } from "@/data/supplies";
import { site, telHref } from "@/data/site";
import heroFournitures from "@/assets/hero-fournitures.jpg";
import bcd from "@/assets/bcd-bibliotheque.jpg";
import cyclePrimaire from "@/assets/cycle-primaire.jpg";

export function FournituresPage() {
  return (
    <>
      <HeroPattern
        chapter="04"
        eyebrow="Vie scolaire"
        title="Fournitures & manuels"
        lead="Comment les listes sont distribuées, ce que les élèves achètent et comment fonctionnent les manuels prêtés par la BCD."
        crumbs={[{ label: "Vie scolaire" }, { label: "Fournitures & manuels" }]}
        note="tout le matériel, à chaque séance"
        icons={[NotebookPen, Ruler, BookMarked, PencilRuler, Tags]}
        image={heroFournitures}
        imageAlt="Fournitures scolaires disposées sur un fond crème"
        actions={
          <>
            <Action
              onClick={() => document.getElementById("listes")?.scrollIntoView({ behavior: "smooth" })}
              arrow={false}
            >
              Voir les listes par cycle
            </Action>
            <Action to="/contact" variant="secondary">
              Contacter l'administration
            </Action>
          </>
        }
      />

      <Section
        tone="sand"
        chapter="05"
        eyebrow="Le principe"
        title="Comment ça marche"
        lead="Trois temps, du dernier jour de classe à la rentrée suivante."
      >
        <StepsRoad
          steps={[
            {
              icon: Download,
              title: "Les listes sont distribuées",
              text: "Les listes de fournitures et de manuels sont remises aux familles en fin d'année scolaire.",
            },
            {
              icon: ShoppingBag,
              title: "Les élèves achètent",
              text: "Les fournitures scolaires et les manuels sont achetés par les élèves, selon la liste de leur niveau.",
            },
            {
              icon: NotebookPen,
              title: "Tout le matériel, en classe",
              text: "Chaque élève doit avoir l'ensemble du matériel nécessaire au bon déroulement des séances.",
            },
          ]}
        />
      </Section>

      <Section
        id="listes"
        tone="paper"
        pattern="grid"
        chapter="06"
        eyebrow="Par cycle"
        title="Les listes, cycle par cycle"
        lead="Sélectionnez le cycle de votre enfant."
        align="center"
      >
        <TabsPill
          tabs={supplyLists.map((list) => ({
            id: list.id,
            label: list.label,
            content: (
              <div className="mx-auto max-w-4xl">
                <div className="grid items-center gap-8 rounded-[2rem] border border-line bg-white p-8 shadow-soft md:grid-cols-[1fr_auto] md:p-10">
                  <div>
                    <h3 className="font-display text-2xl">Liste du cycle {list.label}</h3>
                    <p className="mt-2 text-ink-600">{list.note}</p>
                    {list.file ? (
                      <div className="mt-6">
                        <Action href={list.file} arrow={false}>
                          <Download className="size-4" strokeWidth={1.8} /> Télécharger la liste
                        </Action>
                      </div>
                    ) : (
                      <div className="mt-6 flex items-start gap-3 rounded-2xl border-2 border-dashed border-teal-500/50 bg-teal-50 p-5">
                        <Info className="mt-0.5 size-5 shrink-0 text-teal-700" strokeWidth={1.8} />
                        <p className="text-sm text-teal-900">{supplyPendingMessage}</p>
                      </div>
                    )}
                  </div>
                  <img
                    src={cyclePrimaire}
                    alt={`Élèves du cycle ${list.label}`}
                    loading="lazy"
                    className="tab-shape h-44 w-full border-4 border-white object-cover shadow-soft md:w-56"
                  />
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Action href={telHref(site.phones[0] ?? "")} variant="tertiary" arrow={false}>
                    Appeler le {site.phones[0]}
                  </Action>
                  <NoteMargin>les listes arrivent en fin d'année</NoteMargin>
                </div>
              </div>
            ),
          }))}
        />
      </Section>

      <Section tone="sand" chapter="07" eyebrow="La BCD" title="Les manuels prêtés par l'école">
        <SplitFeature
          reverse
          eyebrow="Bibliothèque et centre de documentation"
          title="Un prêt, une responsabilité partagée"
          text={
            <p>
              Les manuels de la BCD sont prêtés par l'école pour toute l'année. En cas de dégradation ou de perte, le
              remplacement du livre ou le paiement de sa valeur est à la charge des parents.
            </p>
          }
          points={[
            "Les manuels de la BCD sont prêtés par l'établissement",
            "Une dégradation ou une perte donne lieu au remplacement du livre",
            "À défaut, la valeur du livre est réglée par les parents",
          ]}
          image={bcd}
          imageAlt="Le coin bibliothèque de l'école"
          note="un livre bien traité sert plusieurs élèves"
        />
      </Section>

      <Section tone="paper" pattern="lines" chapter="08" eyebrow="Bons réflexes" title="Prendre soin du matériel">
        <BentoGrid
          items={[
            {
              title: "Couvrir et étiqueter",
              text: "Un manuel couvert et un cahier au nom de l'élève traversent l'année sans dommage — et se retrouvent facilement.",
              icon: Tags,
              span: "lg",
              tone: "teal",
            },
            {
              title: "Ranger chaque soir",
              text: "Préparer le cartable la veille évite les oublis et les allers-retours au secrétariat.",
              icon: Sparkles,
              span: "sm",
              tone: "sand",
            },
            {
              title: "Le coin lecture",
              text: "Les manuels de la BCD reviennent en fin d'année dans l'état où ils ont été prêtés.",
              image: bcd,
              imageAlt: "Rayonnages de la bibliothèque scolaire",
              span: "md",
            },
            {
              title: "Le matériel complet, tous les jours",
              text: "Le règlement le rappelle : l'élève se présente en classe avec l'ensemble des fournitures nécessaires aux séances.",
              icon: Library,
              span: "md",
              tone: "grid",
            },
          ]}
        />
      </Section>

      <CtaBand
        title="Besoin de la liste de votre enfant ?"
        text="L'administration vous la transmet et répond à vos questions sur les manuels."
        primary={{ to: "/contact", label: "Contacter l'administration" }}
        secondary={{ to: "/reglement-interieur", label: "Lire le règlement" }}
      />

      <RelatedPages
        links={[
          { to: "/cycles", label: "Nos cycles", desc: "Les apprentissages de chaque niveau." },
          { to: "/reglement-interieur", label: "Règlement intérieur", desc: "Titre II article 4 et Titre III article 2." },
          { to: "/vacances-scolaires", label: "Vacances scolaires", desc: "Le rythme de l'année scolaire." },
        ]}
      />
    </>
  );
}
