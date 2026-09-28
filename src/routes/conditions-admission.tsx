import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/conditions-admission")({
  head: () => ({
    meta: [
      { title: "Conditions d'admission — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Les étapes et les documents nécessaires à l'inscription." },
      { property: "og:title", content: "Conditions d'admission — Madariss Tingis" },
      { property: "og:description", content: "Les étapes et les documents nécessaires à l'inscription." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="06"
      eyebrow="Vie scolaire"
      title="Conditions d'admission"
      lead="Les étapes et les documents nécessaires à l'inscription."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
