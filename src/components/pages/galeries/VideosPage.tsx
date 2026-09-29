import { useEffect, useState } from "react";
import { Clapperboard, Play, X } from "lucide-react";
import { HeroInteractive } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin, Reveal } from "@/components/site/blocks/primitives";
import { embed, thumb, videos, type SchoolVideo } from "@/data/videos";
import { media } from "@/data/media";

function Thumb({ video, className }: { video: SchoolVideo; className?: string }) {
  const [src, setSrc] = useState(thumb(video.id));
  return (
    <img
      src={src}
      alt={video.title}
      loading="lazy"
      onError={() => setSrc(thumb(video.id, "hqdefault"))}
      className={className}
    />
  );
}

/* ---------- Lecteur mis en avant (charge YouTube au clic) ---------- */

function FeaturedPlayer({ video }: { video: SchoolVideo }) {
  const [play, setPlay] = useState(false);
  useEffect(() => setPlay(false), [video.id]);

  return (
    <div className="overflow-hidden rounded-[2rem] border-4 border-white bg-teal-900 shadow-lift">
      <div className="relative aspect-video">
        {play ? (
          <iframe
            src={embed(video.id)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Lire : ${video.title}`}>
            <Thumb video={video} className="size-full object-cover" />
            <span className="absolute inset-0 bg-teal-900/30 transition-colors group-hover:bg-teal-900/10" />
            <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-coral-600 text-white shadow-lift transition-transform group-hover:scale-110">
              <Play className="size-8 translate-x-0.5" fill="currentColor" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export function VideosPage() {
  const [featured, setFeatured] = useState(0);
  const [modal, setModal] = useState<SchoolVideo | null>(null);
  const current = videos[featured] ?? videos[0];

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [modal]);

  return (
    <>
      <HeroInteractive
        chapter="01"
        eyebrow="Activités"
        title="La galerie vidéo"
        lead="Spectacles, activités et temps forts : l'école en mouvement."
        crumbs={[{ label: "Activités" }, { label: "Galerie vidéo" }]}
        image={media.theatre.hero.src}
        imageAlt={media.theatre.hero.alt}
        actions={
          <Action to="/photos" variant="light">
            Galerie photos
          </Action>
        }
        panel={current ? <FeaturedPlayer video={current} /> : null}
      />

      <Section tone="paper" chapter="02" eyebrow="À l'affiche" title={current?.title ?? "Nos vidéos"} lead={current?.text}>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {videos.slice(0, 5).map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                setFeatured(i);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-pressed={featured === i}
              className={`overflow-hidden rounded-2xl border-4 text-left transition-all ${featured === i ? "border-coral-600 shadow-lift" : "border-white shadow-soft hover:shadow-lift"}`}
            >
              <Thumb video={v} className="aspect-video w-full object-cover" />
              <span className="block bg-white px-3 py-2 text-sm font-bold text-ink-900">{v.title}</span>
            </button>
          ))}
        </div>
        <NoteMargin className="mt-6 block">choisissez la vidéo à mettre à l'affiche en haut de page</NoteMargin>
      </Section>

      <Section tone="sand" chapter="03" eyebrow="Toutes les vidéos" title="La vidéothèque de l'école">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.id} delay={(i % 3) * 0.05}>
              <button
                type="button"
                onClick={() => setModal(v)}
                className="group block w-full overflow-hidden rounded-[1.75rem] border border-line bg-white text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="relative block">
                  <Thumb video={v} className="aspect-video w-full object-cover" />
                  <span className="absolute inset-0 grid place-items-center bg-teal-900/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="grid size-14 place-items-center rounded-full bg-coral-600 text-white">
                      <Play className="size-6 translate-x-0.5" fill="currentColor" />
                    </span>
                  </span>
                </span>
                <span className="block p-5">
                  <span className="block font-display text-lg">{v.title}</span>
                  <span className="mt-1 block text-sm text-ink-600">{v.text}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Ces moments vous donnent envie ?"
        text="Venez découvrir l'école et son projet éducatif."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
        tone="teal"
      >
        <p className="mt-6 inline-flex items-center gap-2 text-white/80">
          <Clapperboard className="size-5" strokeWidth={1.7} /> Nouvelles vidéos au fil de l'année
        </p>
      </CtaBand>

      <RelatedPages
        links={[
          { to: "/photos", label: "Galerie photos", desc: "Nos moments en images." },
          { to: "/theatre", label: "Théâtre", desc: "Confiance et expression." },
          { to: "/musique", label: "Musique", desc: "Écoute et sensibilité." },
        ]}
      />

      {modal ? (
        <div role="dialog" aria-modal="true" aria-label={modal.title} onClick={() => setModal(null)} className="fixed inset-0 z-[80] grid place-items-center bg-teal-900/95 p-4">
          <button type="button" onClick={() => setModal(null)} aria-label="Fermer" className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25">
            <X className="size-5" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-5xl">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <iframe
                src={embed(modal.id)}
                title={modal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            </div>
            <p className="mt-4 text-center font-display text-xl text-white">{modal.title}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
