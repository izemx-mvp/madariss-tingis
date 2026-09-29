import type { ReactNode } from "react";
import { Mail, Printer } from "lucide-react";
import { HeroDocument } from "@/components/site/blocks/PageHero";
import { StickyTOC } from "@/components/site/blocks/StickyTOC";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages, type RelatedLink } from "@/components/site/blocks/RelatedPages";
import { Reveal, SectionLabel } from "@/components/site/blocks/primitives";
import { site } from "@/data/site";

export type LegalSection = { id: string; title: string; body: ReactNode };

/** Information que l'école doit encore fournir : visible, discrète, facile à repérer. */
export function ToComplete({ children }: { children: ReactNode }) {
  return <span className="rounded-md bg-coral-50 px-1.5 py-0.5 font-semibold text-coral-700">{children}</span>;
}

export function LegalPage({
  chapter,
  title,
  lead,
  updated,
  sections,
  related,
}: {
  chapter: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
  related: RelatedLink[];
}) {
  return (
    <>
      <HeroDocument
        chapter={chapter}
        eyebrow="Informations légales"
        title={title}
        lead={lead}
        crumbs={[{ label: title }]}
        meta={[
          { label: "Éditeur", value: site.name },
          { label: "Mise à jour", value: updated },
          { label: "Sections", value: String(sections.length) },
        ]}
        actions={
          <>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border-2 border-teal-700 px-6 py-3 text-sm font-bold text-teal-700 hover:bg-teal-50"
            >
              <Printer className="size-4" /> Imprimer
            </button>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-coral-700">
              <Mail className="size-4" /> Une question ?
            </a>
          </>
        }
      />

      <div className="bg-sand">
        <div className="container-site section-pad">
          <div className="grid gap-12 lg:grid-cols-[15rem_1fr] xl:gap-20">
            <aside className="hidden lg:block">
              <StickyTOC items={sections.map((s) => ({ id: s.id, label: s.title }))} />
            </aside>
            <div className="space-y-6">
              {sections.map((s, i) => (
                <Reveal key={s.id}>
                  <section id={s.id} className="scroll-mt-32 rounded-[2rem] border border-line bg-white p-7 shadow-soft md:p-10">
                    <SectionLabel chapter={String(i + 1).padStart(2, "0")}>{title}</SectionLabel>
                    <h2 className="mt-4 font-display text-2xl md:text-3xl">{s.title}</h2>
                    <div className="mt-4 space-y-4 leading-relaxed text-ink-600 [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink-900 [&_ul]:space-y-2">
                      {s.body}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CtaBand
        title="Une question sur vos données ?"
        text="Écrivez à l'administration : elle vous répond dans les meilleurs délais."
        primary={{ to: "/contact", label: "Nous contacter" }}
        tone="teal"
      />

      <RelatedPages links={related} />
    </>
  );
}
