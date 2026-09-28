import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/mission")({
  head: () => ({
    meta: [
      { title: "Notre mission — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Former un élève confiant en ses capacités, enraciné dans son identité et ouvert sur le monde." },
      { property: "og:title", content: "Notre mission — Madariss Tingis" },
      { property: "og:description", content: "Former un élève confiant en ses capacités, enraciné dans son identité et ouvert sur le monde." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="01"
      eyebrow="Présentation"
      title="Notre mission"
      lead="Former un élève confiant en ses capacités, enraciné dans son identité et ouvert sur le monde."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
