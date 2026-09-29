import { useState } from "react";
import { Brain, Clock, Handshake, RotateCcw, Target } from "lucide-react";
import { Breadcrumb } from "@/components/site/blocks/Breadcrumb";
import { WaveDivider } from "@/components/site/blocks/WaveDivider";
import { Section } from "@/components/site/blocks/Section";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { MasonryGallery } from "@/components/site/blocks/MasonryGallery";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { Action, NoteMargin, Reveal, SectionLabel } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";
import { cn } from "@/lib/utils";
import { ActivitiesBand } from "./ActivitiesBand";

const checker = {
  backgroundImage: "repeating-conic-gradient(var(--teal-50) 0% 25%, var(--paper) 0% 50%)",
  backgroundSize: "88px 88px",
};

/* ---------- Mini-échiquier décoratif (déplacements libres) ---------- */

const back = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
const initialBoard = (): (string | null)[] => [
  ...back,
  ...Array<string>(8).fill("♟"),
  ...Array<null>(32).fill(null),
  ...Array<string>(8).fill("♙"),
  ...back.map((p) => String.fromCharCode(p.charCodeAt(0) - 6)),
];
const isWhite = (p: string) => p.charCodeAt(0) <= 0x2659;

function MiniChessboard() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);

  const click = (i: number) => {
    if (selected === null) {
      if (board[i]) setSelected(i);
      return;
    }
    if (selected === i) {
      setSelected(null);
      return;
    }
    const next = [...board];
    next[i] = next[selected] ?? null;
    next[selected] = null;
    setBoard(next);
    setSelected(null);
    setMoves((m) => m + 1);
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
      <div className="mx-auto w-full max-w-[26rem] rounded-3xl border-8 border-teal-900 bg-teal-900 shadow-lift">
        <div className="grid grid-cols-8">
          {board.map((piece, i) => {
            const dark = (Math.floor(i / 8) + (i % 8)) % 2 === 1;
            return (
              <button
                key={i}
                type="button"
                onClick={() => click(i)}
                aria-label={piece ? `Pièce ${piece}` : "Case vide"}
                className={cn(
                  "grid aspect-square place-items-center font-sans text-2xl leading-none transition-colors [font-variant-emoji:text] sm:text-3xl",
                  dark ? "bg-teal-500/80" : "bg-paper",
                  selected === i && "bg-coral-500 text-white",
                  selected !== null && selected !== i && "hover:bg-coral-50",
                  piece && (isWhite(piece) ? "text-white [text-shadow:0_1px_2px_rgba(6,55,59,0.9)]" : "text-teal-900"),
                )}
              >
                {piece}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-display text-3xl">À vous de jouer</h3>
        <p className="mt-3 max-w-md text-ink-600">
          Cliquez sur une pièce, puis sur la case d'arrivée. Ici, tout est permis : c'est un échiquier pour s'amuser, pas
          pour arbitrer !
        </p>
        <p className="mt-6 font-display text-5xl text-coral-600 tabular-nums">{moves}</p>
        <p className="text-sm font-bold text-ink-600">coup{moves > 1 ? "s" : ""} joué{moves > 1 ? "s" : ""}</p>
        <button
          type="button"
          onClick={() => {
            setBoard(initialBoard());
            setSelected(null);
            setMoves(0);
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-teal-700 px-5 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-50"
        >
          <RotateCcw className="size-4" /> Replacer les pièces
        </button>
        <NoteMargin className="mt-6 block">le vrai défi, c'est en classe !</NoteMargin>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

const pieces = [
  { symbol: "♙", name: "Le pion", lesson: "La patience : avancer pas à pas peut mener très loin." },
  { symbol: "♘", name: "Le cavalier", lesson: "La créativité : sortir des chemins tout tracés." },
  { symbol: "♗", name: "Le fou", lesson: "La vision : voir loin, dans une direction choisie." },
  { symbol: "♖", name: "La tour", lesson: "La solidité : protéger et construire une position." },
  { symbol: "♕", name: "La dame", lesson: "La polyvalence : s'adapter à chaque situation." },
  { symbol: "♔", name: "Le roi", lesson: "La responsabilité : chaque décision compte." },
];

export function EchecsPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-paper" style={checker}>
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/90 to-paper/40" aria-hidden="true" />
        <div className="container-site relative pt-8 pb-16 md:pb-24">
          <Breadcrumb items={[{ label: "Activités" }, { label: "Échecs" }]} />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <SectionLabel chapter="01">Activités</SectionLabel>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
                Échec
                <br />
                et réussite
              </h1>
              <p className="mt-5 max-w-xl text-lg text-ink-600">
                Réfléchir avant d'agir, anticiper, accepter de perdre pour mieux rejouer : les échecs entraînent l'esprit
                comme le sport entraîne le corps.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#echiquier"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-coral-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition-all hover:bg-coral-700"
                >
                  Essayer l'échiquier
                </a>
                <Action to="/photos" variant="secondary">
                  Voir les photos
                </Action>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="relative mx-auto max-w-md">
                <div className="rotate-2 rounded-[2rem] border-8 border-teal-900 shadow-lift">
                  <img src={media.echecs.hero.src} alt={media.echecs.hero.alt} className="aspect-square w-full rounded-[1.4rem] object-cover" />
                </div>
                <span className="absolute -top-6 -left-6 grid size-20 place-items-center rounded-2xl bg-coral-600 text-5xl text-white shadow-lift">
                  ♞
                </span>
              </div>
            </Reveal>
          </div>
        </div>
        <WaveDivider fill="sand" />
      </header>

      <Section tone="sand" chapter="02" eyebrow="Pourquoi les échecs" title="Un entraînement pour l'esprit">
        <BentoGrid
          items={[
            { title: "La concentration", text: "Rester attentif toute une partie, sans se laisser distraire.", icon: Target, span: "md", tone: "white" },
            { title: "La stratégie", text: "Construire un plan, anticiper les réponses de l'adversaire.", icon: Brain, span: "md", tone: "teal" },
            { title: "La patience", text: "Prendre le temps de réfléchir avant de jouer.", icon: Clock, span: "md", tone: "grid" },
            { title: "Le fair-play", text: "Serrer la main, gagner avec humilité, perdre avec élégance.", icon: Handshake, span: "md", tone: "coral" },
          ]}
        />
      </Section>

      <Section id="echiquier" tone="paper" pattern="grid" chapter="03" eyebrow="Interactif" title="Un échiquier pour jouer" className="scroll-mt-24">
        <MiniChessboard />
      </Section>

      <Section tone="teal" pattern="zellige" chapter="04" eyebrow="Leçons de pièces" title="Ce que chaque pièce enseigne">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pieces.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.05}>
              <div className="group flex h-full items-start gap-5 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur transition-colors hover:bg-white/15">
                <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-paper text-4xl text-teal-900 transition-transform duration-300 group-hover:-rotate-6">
                  {p.symbol}
                </span>
                <div>
                  <p className="font-display text-xl text-white">{p.name}</p>
                  <p className="mt-1 text-sm text-white/80">{p.lesson}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" chapter="05" eyebrow="En images" title="Autour de l'échiquier">
        <div className="rounded-[2.5rem] p-4 md:p-6" style={checker}>
          <MasonryGallery images={media.echecs.gallery} />
        </div>
      </Section>

      <ActivitiesBand current="echecs" chapter="06" />

      <CtaBand
        title="Un futur stratège à la maison ?"
        text="Les échecs font partie des activités de l'école."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/nos-eleves", label: "Nos élèves" }}
        tone="gradient"
      />
    </>
  );
}
