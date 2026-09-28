import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/cycles")({
  head: () => ({
    meta: [
      { title: "Nos cycles — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Maternelle, primaire, collège et lycée : un parcours continu." },
      { property: "og:title", content: "Nos cycles — Madariss Tingis" },
      { property: "og:description", content: "Maternelle, primaire, collège et lycée : un parcours continu." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="03"
      eyebrow="Présentation"
      title="Nos cycles"
      lead="Maternelle, primaire, collège et lycée : un parcours continu."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
