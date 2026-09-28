import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements scolaires — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Ce qui se prépare à Madariss Tingis." },
      { property: "og:title", content: "Événements scolaires — Madariss Tingis" },
      { property: "og:description", content: "Ce qui se prépare à Madariss Tingis." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="17"
      eyebrow="Calendrier"
      title="Événements scolaires"
      lead="Ce qui se prépare à Madariss Tingis."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
