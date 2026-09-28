import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/horaires")({
  head: () => ({
    meta: [
      { title: "Horaires — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "La journée et la semaine, niveau par niveau." },
      { property: "og:title", content: "Horaires — Madariss Tingis" },
      { property: "og:description", content: "La journée et la semaine, niveau par niveau." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="08"
      eyebrow="Vie scolaire"
      title="Horaires"
      lead="La journée et la semaine, niveau par niveau."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
