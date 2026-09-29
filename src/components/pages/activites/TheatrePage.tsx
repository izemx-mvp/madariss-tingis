import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { BookOpenText, Drama, Ear, Mic2, Sparkles, Users, Brain } from "lucide-react";
import { Breadcrumb } from "@/components/site/blocks/Breadcrumb";
import { WaveDivider } from "@/components/site/blocks/WaveDivider";
import { Section } from "@/components/site/blocks/Section";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { TimelineHorizontal } from "@/components/site/blocks/Timeline";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { Action, NoteMargin, Reveal, SectionLabel } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";
import { cn } from "@/lib/utils";
import { ActivitiesBand } from "./ActivitiesBand";

/* ---------- Hero : rideau qui s'ouvre ---------- */

function CurtainHero() {
  const reduce = useReducedMotion();
  const curtain = "absolute inset-y-0 z-20 w-1/2 bg-coral-600";
  const folds =
    "repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 18px, rgba(255,255,255,0.06) 18px 36px)";

  return (
    <header className="relative overflow-hidden bg-teal-900">
      <img src={media.theatre.hero.src} alt={media.theatre.hero.alt} className="absolute inset-0 size-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/60 via-teal-900/40 to-teal-900/90" aria-hidden="true" />
      {/* projecteur */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,251,246,0.28) 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      {!reduce ? (
        <>
          <motion.div
            className={cn(curtain, "left-0 origin-left")}
            style={{ backgroundImage: folds }}
            initial={{ x: 0 }}
            animate={{ x: "-92%" }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden="true"
          />
          <motion.div
            className={cn(curtain, "right-0 origin-right")}
            style={{ backgroundImage: folds }}
            initial={{ x: 0 }}
            animate={{ x: "92%" }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden="true"
          />
        </>
      ) : null}
      {/* lambrequin */}
      <div className="absolute inset-x-0 top-0 z-30 h-6 bg-coral-700" style={{ backgroundImage: folds }} aria-hidden="true" />

      <div className="container-site relative z-10 pt-12 pb-28 text-center md:pb-36">
        <div className="text-left">
          <Breadcrumb tone="light" items={[{ label: "Activités" }, { label: "Théâtre" }]} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 1.2 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <SectionLabel chapter="01" tone="light" className="justify-center">
            Activités
          </SectionLabel>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] text-white md:text-7xl">Lever de rideau</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Monter sur scène, prêter sa voix à un personnage, oser devant un public : le théâtre fait grandir la confiance en
            soi.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Action to="/photos" variant="light">
              Voir les photos
            </Action>
            <Action to="/videos" variant="secondary" className="border-white text-white hover:bg-white/10">
              Voir les vidéos
            </Action>
          </div>
        </motion.div>
      </div>
      <WaveDivider fill="paper" className="relative z-10" />
    </header>
  );
}

/* ---------- Galerie polaroïds sous le projecteur ---------- */

function SpotlightGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });
  const [open, setOpen] = useState<number | null>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2"];
  const current = open === null ? null : media.theatre.gallery[open];

  return (
    <>
      <div
        ref={ref}
        onMouseMove={onMove}
        className="relative overflow-hidden rounded-[2.5rem] bg-teal-900 px-6 py-14 md:px-12"
        style={{
          backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,251,246,0.22) 0%, transparent 38%)`,
        }}
      >
        <div className="flex flex-wrap justify-center gap-8">
          {media.theatre.gallery.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => setOpen(i)}
              className={cn(
                "w-56 bg-paper p-3 pb-10 shadow-lift transition-transform duration-300 hover:z-10 hover:scale-105 hover:rotate-0 md:w-64",
                rotations[i % rotations.length],
              )}
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="aspect-square w-full object-cover" />
              <span className="mt-3 block font-hand text-lg text-teal-900">{img.alt}</span>
            </button>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-white/60">Déplacez la souris : le projecteur vous suit.</p>
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[80] grid place-items-center bg-teal-900/95 p-4"
        >
          <figure className="max-w-3xl bg-paper p-4 pb-8 shadow-lift">
            <img src={current.src} alt={current.alt} className="max-h-[70vh] w-full object-contain" />
            <figcaption className="mt-4 text-center font-hand text-2xl text-teal-900">{current.alt}</figcaption>
          </figure>
          <button type="button" className="mt-6 rounded-full bg-white/15 px-5 py-2 text-sm font-bold text-white" onClick={() => setOpen(null)}>
            Fermer
          </button>
        </div>
      ) : null}
    </>
  );
}

/* ---------- Page ---------- */

export function TheatrePage() {
  return (
    <>
      <CurtainHero />

      <Section tone="paper" chapter="02" eyebrow="Pourquoi le théâtre" title="Oser, s'exprimer, jouer ensemble">
        <BentoGrid
          items={[
            { title: "La confiance en soi", text: "Parler devant les autres, affronter le trac et en sortir grandi.", icon: Sparkles, span: "md", tone: "teal" },
            { title: "L'expression", text: "La voix, le geste, le regard : tout le corps apprend à dire.", icon: Mic2, span: "md", tone: "white" },
            { title: "La mémoire", text: "Apprendre son texte et celui des autres pour réagir juste.", icon: Brain, span: "sm", tone: "sand" },
            { title: "L'écoute", text: "Sur scène, on joue avec ses partenaires, jamais seul.", icon: Ear, span: "sm", tone: "white" },
            { title: "Le collectif", text: "Une pièce réussie est l'œuvre de toute une troupe.", icon: Users, span: "sm", tone: "coral" },
          ]}
        />
      </Section>

      <Section tone="sand" chapter="03" eyebrow="De la lecture à la scène" title="Le chemin d'une pièce" lead="Cliquez sur chaque étape.">
        <TimelineHorizontal
          items={[
            { label: "Étape 1", title: "Lire le texte", text: "Découvrir l'histoire et les personnages, lire à voix haute, comprendre les enjeux.", icon: BookOpenText },
            { label: "Étape 2", title: "Choisir son rôle", text: "Chacun trouve sa place : sur scène, au décor, aux costumes ou à la lumière.", icon: Drama },
            { label: "Étape 3", title: "Répéter", text: "Placer sa voix, ses gestes, ses déplacements, et apprendre à jouer ensemble.", icon: Mic2 },
            { label: "Étape 4", title: "Les derniers réglages", text: "Costumes, accessoires, enchaînements : la troupe se prépare au grand jour.", icon: Sparkles },
            { label: "Étape 5", title: "Le spectacle", text: "Le rideau se lève devant le public, et l'effort collectif prend vie.", icon: Users },
          ]}
        />
      </Section>

      <Section tone="paper" chapter="04" eyebrow="En images" title="Nos élèves sur scène">
        <Reveal>
          <SpotlightGallery />
        </Reveal>
        <NoteMargin className="mt-6 block">bravo les artistes !</NoteMargin>
      </Section>

      <ActivitiesBand current="theatre" chapter="05" />

      <CtaBand
        title="Et si votre enfant montait sur scène ?"
        text="Le théâtre fait partie de la vie de l'école."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/videos", label: "Voir les vidéos" }}
        tone="teal"
      />
    </>
  );
}
