import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/photos")({
  head: () => ({
    meta: [
      { title: "Galerie photos — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Nos moments en images." },
      { property: "og:title", content: "Galerie photos — Madariss Tingis" },
      { property: "og:description", content: "Nos moments en images." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="22"
      eyebrow="Activités"
      title="Galerie photos"
      lead="Nos moments en images."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
