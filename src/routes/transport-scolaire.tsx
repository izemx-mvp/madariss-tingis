import { createFileRoute } from "@tanstack/react-router";
import { TransportPage } from "@/components/pages/transport/TransportPage";

const description =
  "Le transport scolaire de Madariss Tingis à Tanger : comment faire une demande, règles de sécurité à bord et horaires clés.";

export const Route = createFileRoute("/transport-scolaire")({
  head: () => ({
    meta: [
      { title: "Transport scolaire — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Transport scolaire — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TransportPage,
});
