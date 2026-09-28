import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Demande d'inscription — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Déposez une demande d'inscription en quelques minutes." },
      { property: "og:title", content: "Demande d'inscription — Madariss Tingis" },
      { property: "og:description", content: "Déposez une demande d'inscription en quelques minutes." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="14"
      eyebrow="Inscription"
      title="Demande d'inscription"
      lead="Déposez une demande d'inscription en quelques minutes."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
