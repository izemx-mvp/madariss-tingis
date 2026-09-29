import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Ear, Guitar, Heart, Mic2, Music2, Drum, Wind, Metronome } from "lucide-react";
import { Breadcrumb } from "@/components/site/blocks/Breadcrumb";
import { WaveDivider } from "@/components/site/blocks/WaveDivider";
import { Section } from "@/components/site/blocks/Section";
import { BentoGrid } from "@/components/site/blocks/BentoGrid";
import { PullQuote } from "@/components/site/blocks/PullQuote";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { Action, NoteMargin, Reveal, SectionLabel } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";
import { cn } from "@/lib/utils";
import { ActivitiesBand } from "./ActivitiesBand";

/* ---------- Onde sonore animée ---------- */

function SoundWave() {
  const reduce = useReducedMotion();
  const bars = Array.from({ length: 36 });
  return (
    <div className="flex h-28 items-center justify-center gap-1.5 md:h-36" aria-hidden="true">
      {bars.map((_, i) => {
        const base = 18 + Math.abs(Math.sin(i * 0.55)) * 70;
        return (
          <motion.span
            key={i}
            className={cn("w-1.5 rounded-full md:w-2", i % 3 === 0 ? "bg-coral-500" : "bg-teal-500")}
            initial={{ height: `${base}%` }}
            animate={reduce ? undefined : { height: [`${base}%`, `${Math.max(12, 100 - base)}%`, `${base}%`] }}
            transition={{ duration: 1.4 + (i % 5) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Instruments : cliquer pour écouter une note ---------- */

type Instrument = {
  id: string;
  label: string;
  icon: typeof Guitar;
  text: string;
  wave: OscillatorType;
  notes: number[];
};

const instruments: Instrument[] = [
  { id: "chant", label: "Chant", icon: Mic2, text: "La voix, premier instrument : respirer, articuler, chanter ensemble.", wave: "sine", notes: [523.25, 659.25, 783.99] },
  { id: "guitare", label: "Guitare", icon: Guitar, text: "Accords et rythmes pour accompagner les chansons de la classe.", wave: "triangle", notes: [196, 246.94, 293.66, 392] },
  { id: "percussions", label: "Percussions", icon: Drum, text: "Le rythme dans le corps : écouter, suivre et garder le tempo.", wave: "square", notes: [110, 110, 146.83] },
  { id: "flute", label: "Flûte", icon: Wind, text: "Souffle et doigté : les premières mélodies de l'école.", wave: "sine", notes: [587.33, 698.46, 880] },
];

function InstrumentPad() {
  const ctx = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [active, setActive] = useState(instruments[0]?.id ?? "");
  const current = instruments.find((i) => i.id === active) ?? instruments[0];

  const play = (inst: Instrument) => {
    setActive(inst.id);
    try {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      ctx.current ??= new Ctx();
      const ac = ctx.current;
      const now = ac.currentTime;
      inst.notes.forEach((freq, k) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = inst.wave;
        osc.frequency.value = freq;
        const t = now + k * 0.18;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(inst.wave === "square" ? 0.05 : 0.15, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
        osc.connect(gain).connect(ac.destination);
        osc.start(t);
        osc.stop(t + 0.5);
      });
      setPlaying(inst.id);
      setTimeout(() => setPlaying(null), 700);
    } catch {
      setPlaying(null);
    }
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="grid grid-cols-2 gap-4">
        {instruments.map((inst) => {
          const Icon = inst.icon;
          const on = active === inst.id;
          return (
            <button
              key={inst.id}
              type="button"
              onClick={() => play(inst)}
              aria-label={`Écouter : ${inst.label}`}
              className={cn(
                "relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden rounded-[2rem] border-2 transition-all duration-300",
                on ? "border-coral-600 bg-white shadow-lift" : "border-line bg-white/70 hover:bg-white",
                playing === inst.id && "scale-[0.97]",
              )}
            >
              {playing === inst.id ? (
                <motion.span
                  className="absolute inset-0 rounded-[2rem] border-4 border-coral-500"
                  initial={{ opacity: 0.8, scale: 0.9 }}
                  animate={{ opacity: 0, scale: 1.15 }}
                  transition={{ duration: 0.7 }}
                />
              ) : null}
              <Icon className={cn("size-10", on ? "text-coral-600" : "text-teal-700")} strokeWidth={1.4} />
              <span className="font-display text-xl">{inst.label}</span>
            </button>
          );
        })}
      </div>

      {current ? (
        <Reveal key={current.id}>
          <div className="rounded-[2rem] bg-teal-900 p-8 text-white md:p-10">
            <Music2 className="size-8 text-teal-500" strokeWidth={1.5} />
            <p className="mt-5 font-display text-3xl text-white">{current.label}</p>
            <p className="mt-3 text-white/85">{current.text}</p>
            <NoteMargin className="mt-6 block text-white/80">cliquez pour écouter ♪</NoteMargin>
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------- Galerie en carrousel horizontal ---------- */

function MusicCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const go = (d: 1 | -1) => track.current?.scrollBy({ left: d * (track.current.clientWidth * 0.7), behavior: "smooth" });
  return (
    <div>
      <div ref={track} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {media.musique.gallery.map((img, i) => (
          <img
            key={img.src + i}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className={cn(
              "h-72 w-auto shrink-0 snap-center rounded-[2rem] border-4 border-white object-cover shadow-soft md:h-96",
              i % 2 ? "aspect-[3/4]" : "aspect-[4/3]",
            )}
          />
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Précédent" className="grid size-12 place-items-center rounded-full border-2 border-teal-700 text-teal-700 hover:bg-teal-50">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Suivant" className="grid size-12 place-items-center rounded-full bg-coral-600 text-white shadow-soft hover:bg-coral-700">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export function MusiquePage() {
  return (
    <>
      <header className="relative overflow-hidden bg-teal-900">
        <img src={media.musique.hero.src} alt={media.musique.hero.alt} className="absolute inset-0 size-full object-cover opacity-25" />
        <div className="zellige absolute inset-0" aria-hidden="true" />
        <div className="container-site relative pt-8 pb-24 text-center">
          <div className="text-left">
            <Breadcrumb tone="light" items={[{ label: "Activités" }, { label: "Musique" }]} />
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <SectionLabel chapter="01" tone="light" className="justify-center">
              Activités
            </SectionLabel>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] text-white md:text-7xl">En avant la musique</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
              Écouter, chanter, jouer ensemble : la musique aiguise l'oreille, développe la sensibilité et apprend la
              discipline du rythme.
            </p>
          </div>
          <div className="mt-10">
            <SoundWave />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#instruments" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900 shadow-soft hover:bg-teal-50">
              Écouter les instruments
            </a>
            <Action to="/videos" variant="secondary" className="border-white text-white hover:bg-white/10">
              Voir les vidéos
            </Action>
          </div>
        </div>
        <WaveDivider fill="paper" />
      </header>

      <Section tone="paper" chapter="02" eyebrow="Pourquoi la musique" title="Une école de l'écoute">
        <BentoGrid
          items={[
            { title: "L'écoute", text: "Entendre les autres, s'accorder, trouver sa place dans le groupe.", icon: Ear, span: "lg", tone: "teal" },
            { title: "Le rythme", text: "Compter, anticiper, garder le tempo.", icon: Metronome, span: "sm", tone: "coral" },
            { title: "La sensibilité", text: "Exprimer une émotion sans un mot.", icon: Heart, span: "sm", tone: "sand" },
            { title: "La discipline", text: "Répéter pour progresser, un peu chaque semaine.", icon: Music2, span: "sm", tone: "white" },
            { title: "En atelier", image: media.musique.hero.src, imageAlt: media.musique.hero.alt, span: "lg", tone: "white", text: "Des séances vivantes et joyeuses." },
          ]}
        />
      </Section>

      <Section id="instruments" tone="sand" chapter="03" eyebrow="Interactif" title="Écoutez les instruments" lead="Cliquez sur un instrument pour entendre quelques notes." className="scroll-mt-24">
        <InstrumentPad />
      </Section>

      <Section tone="paper" chapter="04" eyebrow="En images" title="Nos ateliers en musique">
        <MusicCarousel />
      </Section>

      <Section tone="white" chapter="05" eyebrow="Notre conviction">
        <PullQuote quote="Jouer ensemble, c'est d'abord apprendre à écouter les autres." author="L'équipe Madariss Tingis" tone="sand" />
      </Section>

      <ActivitiesBand current="musique" chapter="06" />

      <CtaBand
        title="Votre enfant a l'oreille musicale ?"
        text="La musique fait partie des activités de l'école."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/nos-eleves", label: "Nos élèves" }}
        tone="coral"
      />
    </>
  );
}
