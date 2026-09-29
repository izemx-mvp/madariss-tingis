import { useEffect, useState } from "react";
import { CalendarDays, Check, Clock, Link2, Music, Crown, Theater, Trophy, Lightbulb } from "lucide-react";
import { Breadcrumb } from "@/components/site/blocks/Breadcrumb";
import { WaveDivider } from "@/components/site/blocks/WaveDivider";
import { StickyTOC } from "@/components/site/blocks/StickyTOC";
import { PullQuote } from "@/components/site/blocks/PullQuote";
import { IconCardGrid } from "@/components/site/blocks/IconCardGrid";
import { Section } from "@/components/site/blocks/Section";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { Action, Badge, NoteMargin, Reveal, SectionLabel, Stamp } from "@/components/site/blocks/primitives";
import type { ArticleBlock, SchoolEvent } from "@/data/events";
import { cn } from "@/lib/utils";

/* ---------- Barre de progression de lecture ---------- */

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article-body");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(Math.max(-rect.top + window.innerHeight * 0.2, 0), Math.max(total, 1));
      setPct(Math.round((done / Math.max(total, 1)) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="no-print fixed inset-x-0 top-0 z-[70] h-1 bg-transparent" aria-hidden="true">
      <div className="gradient-signature h-full transition-[width] duration-150" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------- Partage ---------- */

function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const text = encodeURIComponent(`${title} ${url}`);
  const btn =
    "grid size-11 place-items-center rounded-full border border-line bg-white text-teal-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-coral-500/60 hover:text-coral-700";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-bold text-ink-600">Partager</span>
      <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noreferrer noopener" className={btn} aria-label="Partager sur WhatsApp">
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z" />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer noopener"
        className={btn}
        aria-label="Partager sur Facebook"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
          <path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.3-.1c-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
        </svg>
      </a>
      <button type="button" onClick={copy} className={cn(btn, copied && "border-teal-500 text-teal-700")} aria-label="Copier le lien">
        {copied ? <Check className="size-5" /> : <Link2 className="size-5" />}
      </button>
      {copied ? <span className="text-sm font-bold text-teal-700">Lien copié</span> : null}
    </div>
  );
}

/* ---------- Blocs d'article ---------- */

function Block({ block }: { block: ArticleBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <div className="space-y-5 text-lg leading-relaxed text-ink-600">
          {block.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      );
    case "list":
      return (
        <div>
          {block.intro ? <p className="text-lg text-ink-600">{block.intro}</p> : null}
          <ul className="mt-4 space-y-3">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 text-lg text-ink-600">
                <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700">
                  <Check className="size-4" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case "image":
      return (
        <figure>
          <img src={block.src} alt={block.alt} loading="lazy" className="tab-shape aspect-[16/9] w-full border-4 border-white object-cover shadow-lift" />
          <figcaption className="mt-3 text-sm text-ink-600">{block.caption}</figcaption>
        </figure>
      );
    case "callout":
      return (
        <aside className="flex gap-4 rounded-3xl border border-coral-500/30 bg-coral-50 p-6">
          <Lightbulb className="mt-0.5 size-6 shrink-0 text-coral-600" strokeWidth={1.6} />
          <div>
            <p className="font-display text-xl text-coral-700">{block.title}</p>
            <p className="mt-1 text-ink-600">{block.text}</p>
          </div>
        </aside>
      );
  }
}

/* ---------- Page ---------- */

export function EventArticlePage({ event }: { event: SchoolEvent }) {
  const toc = event.sections.map((s) => ({ id: s.id, label: s.title }));

  return (
    <>
      <ReadingProgress />

      <header className="relative overflow-hidden bg-teal-900 text-white">
        <div className="zellige absolute inset-0" aria-hidden="true" />
        <div className="container-site relative pt-8 pb-16 md:pb-24">
          <Breadcrumb tone="light" items={[{ label: "Événements", to: "/evenements" }, { label: "Master Chef Junior" }]} />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <div className="flex flex-wrap gap-2">
                <Badge>{event.badge}</Badge>
                {event.tags.map((t) => (
                  <Badge key={t} tone="teal">
                    {t}
                  </Badge>
                ))}
              </div>
              <h1 className="mt-5 font-display text-4xl leading-[1.05] text-white md:text-6xl">{event.title}</h1>
              <p className="mt-5 max-w-xl text-lg text-white/85">{event.lead}</p>
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-white/70" strokeWidth={1.8} />
                  <dt className="sr-only">Date</dt>
                  <dd>{event.date ?? "Date communiquée via Pronote"}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-white/70" strokeWidth={1.8} />
                  <dt className="sr-only">Lecture</dt>
                  <dd>{event.readingTime}</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="relative">
                <div className="tab-shape border-4 border-white/80 shadow-lift">
                  <img src={event.image} alt={event.alt} width={1408} height={1056} className="aspect-[4/3] w-full object-cover" />
                </div>
                <Stamp lines={["Bientôt", "à l'école"]} className="absolute -bottom-6 -left-4" />
              </div>
            </Reveal>
          </div>
        </div>
        <WaveDivider fill="paper" />
      </header>

      <div className="container-site section-pad">
        <div className="grid gap-12 lg:grid-cols-[14rem_1fr] xl:gap-20">
          <aside className="hidden lg:block">
            <StickyTOC items={toc} title="Dans cet article" />
          </aside>

          <article id="article-body" className="max-w-3xl">
            {event.sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 pb-14">
                <SectionLabel chapter={String(i + 1).padStart(2, "0")}>{section.title}</SectionLabel>
                <h2 className="mt-4 font-display text-3xl md:text-4xl">{section.title}</h2>
                <div className="mt-6 space-y-8">
                  {section.blocks.map((block, j) => (
                    <Block key={`${section.id}-${j}`} block={block} />
                  ))}
                </div>
                {i === 1 ? (
                  <div className="mt-14">
                    <PullQuote quote={event.quote} note="c'est notre philosophie" tone="sand" />
                  </div>
                ) : null}
              </section>
            ))}

            <div className="flex flex-col gap-6 border-y border-line py-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-coral-600 font-display text-xl font-bold text-white">
                  MT
                </span>
                <div>
                  <p className="font-display text-lg">L'équipe Madariss Tingis</p>
                  <p className="text-sm text-ink-600">Vie scolaire et activités</p>
                </div>
              </div>
              <ShareButtons title={event.title} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Action to="/evenements" variant="secondary">
                Tous les événements
              </Action>
              <Action to="/calendrier" variant="tertiary" arrow={false}>
                Voir le calendrier
              </Action>
            </div>
          </article>
        </div>
      </div>

      <Section
        tone="sand"
        chapter="05"
        eyebrow="Autres temps forts"
        title="La vie de l'école continue"
        lead="En attendant Master Chef Junior, découvrez les activités de nos élèves."
      >
        <IconCardGrid
          columns={4}
          cards={[
            { icon: Trophy, title: "Sport", text: "Esprit d'équipe et effort.", to: "/sport" },
            { icon: Theater, title: "Théâtre", text: "Confiance et expression.", to: "/theatre" },
            { icon: Crown, title: "Échecs", text: "Concentration et stratégie.", to: "/echecs" },
            { icon: Music, title: "Musique", text: "Écoute et sensibilité.", to: "/musique" },
          ]}
        />
        <NoteMargin className="mt-8 block">d'autres événements arrivent bientôt…</NoteMargin>
      </Section>

      <CtaBand
        title="Envie de vivre ces moments avec nous ?"
        text="Déposez une demande d'inscription ou venez nous rencontrer."
        primary={{ to: "/inscription", label: "Inscrire mon enfant" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
        tone="coral"
      />
    </>
  );
}
