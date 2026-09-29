import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Action, ArabicWatermark, Badge, SectionLabel } from "./primitives";
import { WaveDivider } from "./WaveDivider";
import { CtaBand } from "./CtaBand";

/**
 * Page de transition utilisée tant que la page complète n'a pas été construite
 * (lots suivants). Jamais un simple titre : hero illustré + repères + CTA.
 * Test de synchronisation GitHub ↔ Lovable : badge "Page en préparation".
 */
export function SimplePage({
  chapter,
  eyebrow,
  title,
  lead,
  points,
  children,
}: {
  chapter: string;
  eyebrow: string;
  title: string;
  lead: string;
  points: { title: string; text: string }[];
  children?: ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-sand">
        <div className="paper-lines absolute inset-0 opacity-40" aria-hidden="true" />
        <ArabicWatermark className="absolute -top-6 right-4 text-[7rem] leading-none md:text-[11rem]" />
        <div className="container-site relative py-16 md:py-24">
          <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-ink-600">
            <Link to="/" className="hover:text-coral-700">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-900">{title}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-3">
            <SectionLabel chapter={chapter}>{eyebrow}</SectionLabel>
            <Badge tone="teal">Page en préparation</Badge>
          </div>
          <h1 className="mt-5 max-w-3xl font-display text-4xl md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-600">{lead}</p>
        </div>
        <WaveDivider fill="paper" />
      </section>

      <section className="container-site section-pad">
        <div className="grid gap-6 md:grid-cols-3">
          {points.map((p, i) => (
            <article
              key={p.title}
              className="rounded-3xl border border-line bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="grid size-10 place-items-center rounded-full bg-coral-50 font-display font-bold text-coral-700">
                {i + 1}
              </span>
              <h2 className="mt-4 font-display text-xl">{p.title}</h2>
              <p className="mt-2 text-ink-600">{p.text}</p>
            </article>
          ))}
        </div>
        {children}
        <div className="mt-10 flex flex-wrap gap-3">
          <Action to="/contact">Poser une question</Action>
          <Action to="/inscription" variant="secondary">
            Demande d'inscription
          </Action>
        </div>
      </section>

      <CtaBand
        title="Une question&nbsp;? L'administration vous répond"
        text="Par téléphone, par email ou depuis le formulaire de contact."
        primary={{ to: "/contact", label: "Nous contacter" }}
        secondary={{ to: "/inscription", label: "Inscrire mon enfant" }}
      />
    </>
  );
}