import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Nous contacter — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Une question ? L'administration vous répond." },
      { property: "og:title", content: "Nous contacter — Madariss Tingis" },
      { property: "og:description", content: "Une question ? L'administration vous répond." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="25"
      eyebrow="Contact"
      title="Nous contacter"
      lead="Une question ? L'administration vous répond."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
