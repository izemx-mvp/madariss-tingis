import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Informations légales du site madarisstingis.ma." },
      { property: "og:title", content: "Mentions légales — Madariss Tingis" },
      { property: "og:description", content: "Informations légales du site madarisstingis.ma." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="27"
      eyebrow="Informations"
      title="Mentions légales"
      lead="Informations légales du site madarisstingis.ma."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
