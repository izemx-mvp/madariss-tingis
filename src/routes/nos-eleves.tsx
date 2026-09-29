import { createFileRoute } from "@tanstack/react-router";
import { NosElevesPage } from "@/components/pages/nos-eleves/NosElevesPage";

const description =
  "Nos élèves à Madariss Tingis, Tanger : travail d'équipe, autonomie, créativité et goût de l'effort, à travers le théâtre, les échecs, la musique et le sport.";

export const Route = createFileRoute("/nos-eleves")({
  head: () => ({
    meta: [
      { title: "Nos élèves — Créativité & leadership — Madariss Tingis" },
      { name: "description", content: description },
      { property: "og:title", content: "Nos élèves — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NosElevesPage,
});
