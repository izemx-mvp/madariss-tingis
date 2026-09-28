import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/assistance-medicale")({
  head: () => ({
    meta: [
      { title: "Assistance médicale — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Santé et bien-être des élèves au quotidien." },
      { property: "og:title", content: "Assistance médicale — Madariss Tingis" },
      { property: "og:description", content: "Santé et bien-être des élèves au quotidien." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="11"
      eyebrow="Services"
      title="Assistance médicale"
      lead="Santé et bien-être des élèves au quotidien."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
