import { createFileRoute } from "@tanstack/react-router";
import { CyclesPage } from "@/components/pages/cycles/CyclesPage";

const description =
  "Maternelle, primaire, collège et lycée à Madariss Tingis Tanger : apprentissages, langues, horaires et préparation du baccalauréat scientifique.";

export const Route = createFileRoute("/cycles")({
  head: () => ({
    meta: [
      { title: "Nos cycles — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Nos cycles — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CyclesPage,
});
