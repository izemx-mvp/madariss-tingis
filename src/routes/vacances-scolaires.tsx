import { createFileRoute } from "@tanstack/react-router";
import { VacancesPage } from "@/components/pages/vacances/VacancesPage";

const description =
  "Vacances scolaires à Madariss Tingis, Tanger : le rythme de l'année de septembre à juin et la communication des dates aux familles via Pronote.";

export const Route = createFileRoute("/vacances-scolaires")({
  head: () => ({
    meta: [
      { title: "Vacances scolaires — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Vacances scolaires — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VacancesPage,
});
