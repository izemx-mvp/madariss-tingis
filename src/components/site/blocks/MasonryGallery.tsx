import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryImage = { src: string; alt: string; caption?: string | undefined };

export function MasonryGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length)), [images.length]);
  const next = useCallback(() => setOpen((i) => (i === null ? null : (i + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  const current = open === null ? null : images[open];

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setOpen(i)}
            className={cn(
              "group block w-full overflow-hidden rounded-3xl border-4 border-white shadow-soft transition-shadow hover:shadow-lift",
              i % 3 === 1 && "rotate-[0.6deg]",
              i % 4 === 2 && "-rotate-[0.6deg]",
            )}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {current ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-teal-900/95 p-4"
            onClick={close}
            onTouchStart={(e) => {
              touchX.current = e.touches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              const start = touchX.current;
              const end = e.changedTouches[0]?.clientX ?? null;
              if (start === null || end === null) return;
              if (end - start > 60) prev();
              if (start - end > 60) next();
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Image précédente"
              className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 md:left-8"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Image suivante"
              className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 md:right-8"
            >
              <ChevronRight className="size-6" />
            </button>
            <figure onClick={(e) => e.stopPropagation()} className="max-h-full">
              <img src={current.src} alt={current.alt} className="max-h-[78vh] rounded-2xl object-contain" />
              {current.caption ? (
                <figcaption className="mt-4 text-center text-sm text-white/80">{current.caption}</figcaption>
              ) : null}
            </figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
