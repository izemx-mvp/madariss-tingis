import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/sport")({
  head: () => ({
    meta: [
      { title: "Sport — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Esprit d'équipe, effort et respect des règles." },
      { property: "og:title", content: "Sport — Madariss Tingis" },
      { property: "og:description", content: "Esprit d'équipe, effort et respect des règles." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="18"
      eyebrow="Activités"
      title="Sport"
      lead="Esprit d'équipe, effort et respect des règles."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
