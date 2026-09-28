import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/transport-scolaire")({
  head: () => ({
    meta: [
      { title: "Transport scolaire — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Se rendre à l'école en toute sécurité." },
      { property: "og:title", content: "Transport scolaire — Madariss Tingis" },
      { property: "og:description", content: "Se rendre à l'école en toute sécurité." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="13"
      eyebrow="Services"
      title="Transport scolaire"
      lead="Se rendre à l'école en toute sécurité."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
