import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/blocks/Section";
import { Reveal } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";

type ActivityId = "sport" | "theatre" | "echecs" | "musique";

const all: { id: ActivityId; to: string; label: string; desc: string; img: { src: string; alt: string } }[] = [
  { id: "sport", to: "/sport", label: "Sport", desc: "Esprit d'équipe et effort", img: media.sport.hero },
  { id: "theatre", to: "/theatre", label: "Théâtre", desc: "Confiance et expression", img: media.theatre.hero },
  { id: "echecs", to: "/echecs", label: "Échecs", desc: "Concentration et stratégie", img: media.echecs.hero },
  { id: "musique", to: "/musique", label: "Musique", desc: "Écoute et sensibilité", img: media.musique.hero },
];

/** Bandeau "Les autres activités" : affiche les 3 activités autres que la page courante. */
export function ActivitiesBand({ current, chapter }: { current: ActivityId; chapter: string }) {
  const others = all.filter((a) => a.id !== current);
  return (
    <Section tone="sand" chapter={chapter} eyebrow="Au-delà des cours" title="Les autres activités">
      <div className="grid gap-5 md:grid-cols-3">
        {others.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.06}>
            <Link
              to={a.to as never}
              className="group relative block overflow-hidden rounded-[2rem] border-4 border-white shadow-soft transition-shadow hover:shadow-lift"
            >
              <img
                src={a.img.src}
                alt={a.img.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <p className="font-display text-2xl text-white">{a.label}</p>
                  <p className="text-sm text-white/80">{a.desc}</p>
                </div>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-teal-900 transition-transform group-hover:-translate-y-1">
                  <ArrowUpRight className="size-5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
