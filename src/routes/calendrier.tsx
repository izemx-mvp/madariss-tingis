import { createFileRoute } from "@tanstack/react-router";
import { CalendrierPage } from "@/components/pages/calendrier/CalendrierPage";

const description =
  "Le calendrier de Madariss Tingis à Tanger : rentrée, vacances, examens et événements de l'année scolaire.";

export const Route = createFileRoute("/calendrier")({
  head: () => ({
    meta: [
      { title: "Calendrier scolaire — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Calendrier scolaire — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalendrierPage,
});
