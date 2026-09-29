import { useMemo, useState } from "react";
import { Camera, Crown, Images, Music, School, Theater, Trophy } from "lucide-react";
import { HeroPattern } from "@/components/site/blocks/PageHero";
import { Section } from "@/components/site/blocks/Section";
import { MasonryGallery, type GalleryImage } from "@/components/site/blocks/MasonryGallery";
import { StatCounter } from "@/components/site/blocks/StatCounter";
import { CtaBand } from "@/components/site/blocks/CtaBand";
import { RelatedPages } from "@/components/site/blocks/RelatedPages";
import { Action, NoteMargin } from "@/components/site/blocks/primitives";
import { media } from "@/data/media";
import { cn } from "@/lib/utils";

type Category = "Sport" | "Théâtre" | "Échecs" | "Musique" | "Vie scolaire";

const categories: { id: Category; icon: typeof Trophy; images: GalleryImage[] }[] = [
  { id: "Sport", icon: Trophy, images: media.sport.gallery },
  { id: "Théâtre", icon: Theater, images: media.theatre.gallery },
  { id: "Échecs", icon: Crown, images: media.echecs.gallery },
  { id: "Musique", icon: Music, images: media.musique.gallery },
  { id: "Vie scolaire", icon: School, images: media.vieScolaire },
];

const uniqueBySrc = (imgs: GalleryImage[]) => imgs.filter((img, i, arr) => arr.findIndex((x) => x.src === img.src) === i);

export function PhotosPage() {
  const [filter, setFilter] = useState<Category | "Tous">("Tous");

  const images = useMemo(() => {
    if (filter === "Tous") return uniqueBySrc(categories.flatMap((c) => c.images.map((img) => ({ ...img, caption: `${c.id} — ${img.alt}` }))));
    return (categories.find((c) => c.id === filter)?.images ?? []).map((img) => ({ ...img, caption: img.alt }));
  }, [filter]);

  const total = uniqueBySrc(categories.flatMap((c) => c.images)).length;

  return (
    <>
      <HeroPattern
        chapter="01"
        eyebrow="Activités"
        title="La galerie photos"
        lead="Sport, scène, échiquier, musique et vie de tous les jours : Madariss Tingis en images."
        crumbs={[{ label: "Activités" }, { label: "Galerie photos" }]}
        icons={[Camera, Trophy, Theater, Music, Crown]}
        image={media.vieScolaire[1]?.src ?? media.sport.hero.src}
        imageAlt={media.vieScolaire[1]?.alt ?? media.sport.hero.alt}
        note="souriez, c'est dans la boîte !"
        actions={
          <Action to="/videos" variant="secondary">
            Galerie vidéo
          </Action>
        }
      />

      <Section tone="sand" chapter="02" eyebrow="En chiffres" title="Une année bien remplie" align="center">
        <div className="grid gap-5 sm:grid-cols-3">
          <StatCounter value={total} label="Photos à découvrir" sub="Mises à jour au fil de l'année" />
          <StatCounter value={categories.length} label="Thèmes" sub="Sport, scène, échecs, musique, vie scolaire" />
          <StatCounter value={4} label="Activités" sub="Au-delà des cours" />
        </div>
      </Section>

      <Section tone="paper" chapter="03" eyebrow="Parcourir" title="Choisissez un thème" lead="Cliquez sur une photo pour l'agrandir, puis naviguez avec les flèches.">
        <div className="flex flex-wrap gap-2">
          {(["Tous", ...categories.map((c) => c.id)] as const).map((id) => {
            const cat = categories.find((c) => c.id === id);
            const Icon = cat?.icon ?? Images;
            const count = id === "Tous" ? total : (cat?.images.length ?? 0);
            return (
              <button
                key={id}
                type="button"
                aria-pressed={filter === id}
                onClick={() => setFilter(id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-300",
                  filter === id ? "border-coral-600 bg-coral-600 text-white shadow-soft" : "border-line bg-white text-ink-600 hover:border-teal-500/60",
                )}
              >
                <Icon className="size-4" strokeWidth={1.8} />
                {id}
                <span className={cn("rounded-full px-2 text-xs", filter === id ? "bg-white/20" : "bg-sand")}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <MasonryGallery key={filter} images={images} />
        </div>
        <NoteMargin className="mt-6 block">
          {images.length} photo{images.length > 1 ? "s" : ""} affichée{images.length > 1 ? "s" : ""}
        </NoteMargin>
      </Section>

      <CtaBand
        title="Envie de faire partie de la photo ?"
        text="Rejoignez une école où l'on apprend aussi par la scène, le sport et la musique."
        primary={{ to: "/inscription", label: "Demande d'inscription" }}
        secondary={{ to: "/videos", label: "Voir les vidéos" }}
        tone="gradient"
      />

      <RelatedPages
        links={[
          { to: "/videos", label: "Galerie vidéo", desc: "L'école en mouvement." },
          { to: "/nos-eleves", label: "Nos élèves", desc: "Créativité et leadership." },
          { to: "/evenements", label: "Événements", desc: "Ce qui se prépare à l'école." },
        ]}
      />
    </>
  );
}
