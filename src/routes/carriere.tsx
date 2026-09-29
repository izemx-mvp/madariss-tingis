import { createFileRoute } from "@tanstack/react-router";
import { CarrierePage } from "@/components/pages/carriere/CarrierePage";

const description =
  "Rejoignez l'équipe de Madariss Tingis à Tanger : enseignement, vie scolaire, administration. Envoyez votre candidature spontanée.";

export const Route = createFileRoute("/carriere")({
  head: () => ({
    meta: [
      { title: "Carrière — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Carrière — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarrierePage,
});
