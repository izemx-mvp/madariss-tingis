import { createFileRoute } from "@tanstack/react-router";
import { MentionsLegalesPage } from "@/components/pages/legal/MentionsLegalesPage";

const description =
  "Mentions légales du site madarisstingis.ma : éditeur, hébergement et propriété intellectuelle.";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Mentions légales — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MentionsLegalesPage,
});
