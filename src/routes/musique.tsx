import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/musique")({
  head: () => ({
    meta: [
      { title: "Musique — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Écoute, rythme et sensibilité." },
      { property: "og:title", content: "Musique — Madariss Tingis" },
      { property: "og:description", content: "Écoute, rythme et sensibilité." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="21"
      eyebrow="Activités"
      title="Musique"
      lead="Écoute, rythme et sensibilité."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
