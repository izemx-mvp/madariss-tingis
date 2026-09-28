import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/politique-de-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Traitement des données personnelles conformément à la loi 09-08." },
      { property: "og:title", content: "Politique de confidentialité — Madariss Tingis" },
      { property: "og:description", content: "Traitement des données personnelles conformément à la loi 09-08." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="26"
      eyebrow="Informations"
      title="Politique de confidentialité"
      lead="Traitement des données personnelles conformément à la loi 09-08."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
