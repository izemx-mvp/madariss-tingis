import { createFileRoute } from "@tanstack/react-router";
import { MissionPage } from "@/components/pages/mission/MissionPage";

const description =
  "La mission de Madariss Tingis à Tanger : former un élève confiant en ses capacités, enraciné dans son identité nationale et ouvert sur le monde.";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Notre mission — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Notre mission — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionPage,
});
