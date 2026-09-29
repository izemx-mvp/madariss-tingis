import { createFileRoute } from "@tanstack/react-router";
import { ConfidentialitePage } from "@/components/pages/legal/ConfidentialitePage";

const description =
  "Politique de confidentialité de Madariss Tingis : données collectées, finalités, durée de conservation et droits (loi 09-08).";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Politique de confidentialité — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConfidentialitePage,
});
