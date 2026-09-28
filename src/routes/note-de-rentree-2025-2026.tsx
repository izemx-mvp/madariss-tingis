import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/note-de-rentree-2025-2026")({
  head: () => ({
    meta: [
      { title: "Note de rentrée — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Le mot de l'équipe pour l'année scolaire." },
      { property: "og:title", content: "Note de rentrée — Madariss Tingis" },
      { property: "og:description", content: "Le mot de l'équipe pour l'année scolaire." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="05"
      eyebrow="Vie scolaire"
      title="Note de rentrée"
      lead="Le mot de l'équipe pour l'année scolaire."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
