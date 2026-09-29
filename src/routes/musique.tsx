import { createFileRoute } from "@tanstack/react-router";
import { MusiquePage } from "@/components/pages/activites/MusiquePage";

const description =
  "La musique à Madariss Tingis, Tanger : chant, guitare, percussions et flûte pour développer l'écoute, le rythme et la sensibilité.";

export const Route = createFileRoute("/musique")({
  head: () => ({
    meta: [
      { title: "Musique — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Musique — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MusiquePage,
});
