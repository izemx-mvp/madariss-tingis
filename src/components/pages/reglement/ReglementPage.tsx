import { useMemo, useState } from "react";
import {
  AlarmClock,
  BadgeCheck,
  CreditCard,
  DoorOpen,
  Printer,
  Search,
  Shield,
  ShirtIcon,
  SmartphoneNfc,
} from "lucide-react";
import { HeroDocument } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { AccordionList } from "@/components/site/blocks/AccordionList";
import { StickyTOC } from "@/components/site/blocks/StickyTOC";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { reglement, reglementSources } from "@/data/reglement";
import { SCHOOL_YEAR, doors } from "@/data/site";
import heroReglement from "@/assets/hero-reglement.jpg";

const aRetenir = [
  { icon: DoorOpen, title: `Portes ${doors.open} – ${doors.close}`, text: `Les portes ouvrent à ${doors.open} et ferment à ${doors.close}. Après cette heure, l'élève est accompagné d'un adulte au secrétariat.` },
  { icon: AlarmClock, title: "3 retards = avertissement", text: "Trois retards dans le même mois entraînent un avertissement ; le quatrième, le retrait d'un point de discipline." },
  { icon: CreditCard, title: "Paiement avant le 05", text: "La scolarité se règle mensuellement auprès du service comptable, avant le 05 du mois suivant." },
  { icon: SmartphoneNfc, title: "Téléphones interdits", text: "Téléphones, tablettes et appareils électroniques sont interdits ; ils sont confisqués et remis en personne à un parent." },
  { icon: ShirtIcon, title: "Tenue propre et décente", text: "Pas de maquillage ni de bijoux excentriques, pas de teintures ni de piercings ; épaules et genoux couverts pour les filles du collège." },
  { icon: Shield, title: "Zéro violence", text: "Toute violence est proscrite à l'école, dans les bus scolaires et lors des sorties, et sanctionnée proportionnellement." },
];

export function ReglementPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reglement;
    return reglement
      .map((t) => ({
        ...t,
        articles: t.articles.filter((a) =>
          [a.num, a.title, ...a.paragraphs, ...(a.list ?? [])].join(" ").toLowerCase().includes(q),
        ),
      }))
      .filter((t) => t.articles.length > 0);
  }, [query]);

  const totalFound = filtered.reduce((n, t) => n + t.articles.length, 0);

  return (
    <>
      <HeroDocument
        chapter="01"
        eyebrow="Vie scolaire"
        title="Règlement intérieur"
        lead="Les règles de la vie à Madariss Tingis, article par article : admission, fréquentation, hygiène et vie scolaire."
        crumbs={[{ label: "Vie scolaire" }, { label: "Règlement intérieur" }]}
        meta={[
          { label: "Année scolaire", value: SCHOOL_YEAR },
          { label: "Titres", value: "I · II · III" },
          { label: "Articles", value: "15" },
        ]}
        image={heroReglement}
        imageAlt="Document officiel de l'école posé sur un bureau"
        actions={
          <>
            <Action onClick={() => window.print()} arrow={false}>
              <Printer className="size-4" strokeWidth={1.8} /> Imprimer / PDF
            </Action>
            <div className="relative">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-600" strokeWidth={1.8} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un article…"
                aria-label="Rechercher dans le règlement"
                className="w-72 rounded-full border-2 border-line bg-white py-3 pr-4 pl-11 text-sm outline-none focus:border-teal-700"
              />
            </div>
          </>
        }
      >
        {query ? (
          <p className="mt-4 text-sm font-bold text-teal-700">
            {totalFound} article{totalFound > 1 ? "s" : ""} correspond{totalFound > 1 ? "ent" : ""} à « {query} »
          </p>
        ) : null}
      </HeroDocument>

      <Section
        tone="sand"
        chapter="02"
        eyebrow="L'essentiel"
        title="Six règles à retenir"
        lead="Le résumé des points qui reviennent le plus souvent dans les questions des familles."
      >
        <IconCardGrid columns={3} cards={aRetenir} />
      </Section>

      <Section tone="paper" pattern="lines" chapter="03" eyebrow="Le texte" title="Le règlement, article par article">
        <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <StickyTOC
            items={reglement.map((t) => ({
              id: t.id,
              label: `${t.num} — ${t.title}`,
              children: t.articles.map((a) => ({ id: a.id, label: `${a.num} · ${a.title}` })),
            }))}
          />

          <div className="space-y-14">
            {filtered.length === 0 ? (
              <p className="rounded-3xl border border-line bg-white p-8 text-ink-600">
                Aucun article ne correspond à cette recherche. Essayez un autre mot, par exemple « retard », « tenue »
                ou « paiement ».
              </p>
            ) : null}

            {filtered.map((titre) => (
              <div key={titre.id} id={titre.id} className="scroll-mt-32">
                <Reveal>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-sm font-bold tracking-[0.18em] text-coral-700 uppercase">
                      {titre.num}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl">{titre.title}</h3>
                  </div>
                  <p className="mt-2 text-ink-600">{titre.intro}</p>
                </Reveal>

                <div className="mt-7">
                  <AccordionList
                    printAll
                    defaultOpen={titre.articles[0]?.id}
                    entries={titre.articles.map((a) => ({
                      id: a.id,
                      badge: a.num.replace("Article ", ""),
                      title: a.title,
                      content: (
                        <div className="space-y-3">
                          {a.paragraphs.map((p) => (
                            <p key={p}>{p}</p>
                          ))}
                          {a.list ? (
                            <ul className="mt-3 space-y-2">
                              {a.list.map((li) => (
                                <li key={li} className="flex gap-3">
                                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral-600" />
                                  <span>{li}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ),
                    }))}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="sand" chapter="04" eyebrow="Cadre légal" title="Sur quoi repose ce règlement">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-[2rem] border-2 border-dashed border-teal-500/50 bg-white p-8 shadow-soft md:p-10">
              <BadgeCheck className="size-9 text-teal-700" strokeWidth={1.5} />
              <p className="mt-5 text-lg text-ink-600">{reglementSources}</p>
              <NoteMargin className="mt-5 block">un cadre officiel, une application humaine</NoteMargin>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={heroReglement}
              alt="Le règlement intérieur de l'école"
              loading="lazy"
              className="tab-shape-alt w-full border-4 border-white object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Une question sur le règlement ?"
        text="L'administration vous répond et vous accompagne dans vos démarches."
        primary={{ to: "/contact", label: "Contacter l'administration" }}
        secondary={{ to: "/conditions-admission", label: "Conditions d'admission" }}
      />

      <RelatedPages
        links={[
          { to: "/horaires", label: "Horaires", desc: "La journée et la semaine, niveau par niveau." },
          { to: "/conditions-admission", label: "Conditions d'admission", desc: "Les étapes et les pièces du dossier." },
          { to: "/frais-de-scolarite", label: "Frais de scolarité", desc: "Le fonctionnement du paiement mensuel." },
        ]}
      />
    </>
  );
}
