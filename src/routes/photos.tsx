import { createFileRoute } from "@tanstack/react-router";
import { PhotosPage } from "@/components/pages/galeries/PhotosPage";

const description =
  "La galerie photos de Madariss Tingis, Tanger : sport, théâtre, échecs, musique et vie scolaire.";

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: [
      { title: "Galerie photos — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Galerie photos — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PhotosPage,
});
