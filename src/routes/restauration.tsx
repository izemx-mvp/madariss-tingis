import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/restauration")({
  head: () => ({
    meta: [
      { title: "Restauration — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Le service de restauration de l'école." },
      { property: "og:title", content: "Restauration — Madariss Tingis" },
      { property: "og:description", content: "Le service de restauration de l'école." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="12"
      eyebrow="Services"
      title="Restauration"
      lead="Le service de restauration de l'école."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
