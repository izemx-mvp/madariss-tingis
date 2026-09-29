import { createFileRoute } from "@tanstack/react-router";
import { EchecsPage } from "@/components/pages/activites/EchecsPage";

const description =
  "Les échecs à Madariss Tingis, Tanger : concentration, stratégie, patience et fair-play.";

export const Route = createFileRoute("/echecs")({
  head: () => ({
    meta: [
      { title: "Échecs — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Échecs — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EchecsPage,
});
