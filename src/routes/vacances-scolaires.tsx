import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/vacances-scolaires")({
  head: () => ({
    meta: [
      { title: "Vacances scolaires — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Le rythme de l'année scolaire." },
      { property: "og:title", content: "Vacances scolaires — Madariss Tingis" },
      { property: "og:description", content: "Le rythme de l'année scolaire." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="09"
      eyebrow="Vie scolaire"
      title="Vacances scolaires"
      lead="Le rythme de l'année scolaire."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
