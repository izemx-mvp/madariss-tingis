import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/theatre")({
  head: () => ({
    meta: [
      { title: "Théâtre — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Confiance en soi, expression et travail collectif." },
      { property: "og:title", content: "Théâtre — Madariss Tingis" },
      { property: "og:description", content: "Confiance en soi, expression et travail collectif." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="19"
      eyebrow="Activités"
      title="Théâtre"
      lead="Confiance en soi, expression et travail collectif."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
