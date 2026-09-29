import { createFileRoute } from "@tanstack/react-router";
import { ReglementPage } from "@/components/pages/reglement/ReglementPage";

const description =
  "Le règlement intérieur de Madariss Tingis à Tanger : admission et inscription, fréquentation scolaire, hygiène et vie scolaire, article par article.";

export const Route = createFileRoute("/reglement-interieur")({
  head: () => ({
    meta: [
      { title: "Règlement intérieur — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Règlement intérieur — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReglementPage,
});
