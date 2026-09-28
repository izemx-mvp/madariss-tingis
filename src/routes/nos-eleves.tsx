import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/nos-eleves")({
  head: () => ({
    meta: [
      { title: "Nos élèves — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Créativité et leadership, au-delà des cours." },
      { property: "og:title", content: "Nos élèves — Madariss Tingis" },
      { property: "og:description", content: "Créativité et leadership, au-delà des cours." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="10"
      eyebrow="Vie scolaire"
      title="Nos élèves"
      lead="Créativité et leadership, au-delà des cours."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
