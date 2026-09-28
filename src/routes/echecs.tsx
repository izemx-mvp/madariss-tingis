import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/echecs")({
  head: () => ({
    meta: [
      { title: "Échecs — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Concentration, stratégie et fair-play." },
      { property: "og:title", content: "Échecs — Madariss Tingis" },
      { property: "og:description", content: "Concentration, stratégie et fair-play." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="20"
      eyebrow="Activités"
      title="Échecs"
      lead="Concentration, stratégie et fair-play."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
