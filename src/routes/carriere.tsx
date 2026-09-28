import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/carriere")({
  head: () => ({
    meta: [
      { title: "Rejoignez l'équipe — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Candidature spontanée : enseignement, vie scolaire, administration." },
      { property: "og:title", content: "Rejoignez l'équipe — Madariss Tingis" },
      { property: "og:description", content: "Candidature spontanée : enseignement, vie scolaire, administration." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="24"
      eyebrow="Carrière"
      title="Rejoignez l'équipe"
      lead="Candidature spontanée : enseignement, vie scolaire, administration."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
