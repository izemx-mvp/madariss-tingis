import { createFileRoute } from "@tanstack/react-router";
import { TheatrePage } from "@/components/pages/activites/TheatrePage";

const description =
  "Le théâtre à Madariss Tingis, Tanger : confiance en soi, expression, mémoire et travail collectif, de la lecture du texte au spectacle.";

export const Route = createFileRoute("/theatre")({
  head: () => ({
    meta: [
      { title: "Théâtre — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Théâtre — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TheatrePage,
});
