import { createFileRoute } from "@tanstack/react-router";
import { HorairesPage } from "@/components/pages/horaires/HorairesPage";

const description =
  "Horaires de Madariss Tingis à Tanger : journée et semaine par niveau, ouverture des portes à 7h45, fermeture à 8h40, et règles en cas de retard.";

export const Route = createFileRoute("/horaires")({
  head: () => ({
    meta: [
      { title: "Horaires — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Horaires — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HorairesPage,
});
