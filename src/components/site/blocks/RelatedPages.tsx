import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./primitives";

export type RelatedLink = { to: string; label: string; desc: string };

export function RelatedPages({ links, title = "Pages liées" }: { links: RelatedLink[]; title?: string }) {
  return (
    <section className="no-print border-t border-line bg-sand py-16">
      <div className="container-site">
        <p className="text-xs font-bold tracking-[0.18em] text-coral-700 uppercase">{title}</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {links.map((link, i) => (
            <Reveal key={link.to} delay={i * 0.06}>
              <Link
                to={link.to as never}
                className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span>
                  <span className="block font-display text-lg group-hover:text-coral-700">{link.label}</span>
                  <span className="mt-1 block text-sm text-ink-600">{link.desc}</span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-teal-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
