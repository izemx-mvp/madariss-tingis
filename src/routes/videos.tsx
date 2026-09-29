import { createFileRoute } from "@tanstack/react-router";
import { VideosPage } from "@/components/pages/galeries/VideosPage";

const description =
  "La galerie vidéo de Madariss Tingis, Tanger : spectacles, activités et temps forts de l'école.";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Galerie vidéo — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Galerie vidéo — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideosPage,
});
