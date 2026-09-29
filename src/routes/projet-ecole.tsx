import { createFileRoute } from "@tanstack/react-router";
import { ProjetEcolePage } from "@/components/pages/projet-ecole/ProjetEcolePage";

const description =
  "Le projet d'école Madariss Tingis : un parcours de la maternelle au baccalauréat, quatre axes pédagogiques, une démarche qualité ISO 21001 et un partenariat avec les familles.";

export const Route = createFileRoute("/projet-ecole")({
  head: () => ({
    meta: [
      { title: "Projet d'école — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Projet d'école — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjetEcolePage,
});
