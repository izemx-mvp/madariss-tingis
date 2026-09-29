import { createFileRoute } from "@tanstack/react-router";
import { RestaurationPage } from "@/components/pages/restauration/RestaurationPage";

const description =
  "Le service de restauration de Madariss Tingis à Tanger : inscription auprès de l'administration, règles de vie à table et informations pratiques.";

export const Route = createFileRoute("/restauration")({
  head: () => ({
    meta: [
      { title: "Restauration scolaire — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Restauration scolaire — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RestaurationPage,
});
