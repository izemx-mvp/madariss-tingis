import { createFileRoute } from "@tanstack/react-router";
import { FournituresPage } from "@/components/pages/fournitures/FournituresPage";

const description =
  "Fournitures et manuels à Madariss Tingis, Tanger : distribution des listes en fin d'année, achat par les familles et manuels prêtés par la BCD.";

export const Route = createFileRoute("/fournitures-manuels")({
  head: () => ({
    meta: [
      { title: "Fournitures & manuels — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Fournitures & manuels — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FournituresPage,
});
