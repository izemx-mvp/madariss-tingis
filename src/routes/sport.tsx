import { createFileRoute } from "@tanstack/react-router";
import { SportPage } from "@/components/pages/activites/SportPage";

const description =
  "Le sport à Madariss Tingis, Tanger : football, basket, athlétisme et gymnastique pour apprendre l'esprit d'équipe, l'effort et le fair-play.";

export const Route = createFileRoute("/sport")({
  head: () => ({
    meta: [
      { title: "Sport — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Sport — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SportPage,
});
