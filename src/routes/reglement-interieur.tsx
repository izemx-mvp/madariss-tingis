import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/reglement-interieur")({
  head: () => ({
    meta: [
      { title: "Règlement intérieur — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Les règles de la vie à l'école, conformes à la loi 06.00 et à la circulaire n°78." },
      { property: "og:title", content: "Règlement intérieur — Madariss Tingis" },
      { property: "og:description", content: "Les règles de la vie à l'école, conformes à la loi 06.00 et à la circulaire n°78." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="04"
      eyebrow="Vie scolaire"
      title="Règlement intérieur"
      lead="Les règles de la vie à l'école, conformes à la loi 06.00 et à la circulaire n°78."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
