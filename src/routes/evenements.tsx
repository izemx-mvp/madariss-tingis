import { createFileRoute } from "@tanstack/react-router";
import { EvenementsPage } from "@/components/pages/evenements/EvenementsPage";

const description =
  "Les événements de Madariss Tingis à Tanger : Master Chef Junior, ateliers, spectacles et temps forts de la vie de l'école.";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements scolaires — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Événements scolaires — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EvenementsPage,
});
