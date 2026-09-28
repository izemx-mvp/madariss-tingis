import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/site/blocks/SimplePage";

export const Route = createFileRoute("/fournitures-manuels")({
  head: () => ({
    meta: [
      { title: "Fournitures & Manuels — Madariss Tingis, école privée à Tanger" },
      { name: "description", content: "Listes de fournitures et manuels prêtés par la BCD." },
      { property: "og:title", content: "Fournitures & Manuels — Madariss Tingis" },
      { property: "og:description", content: "Listes de fournitures et manuels prêtés par la BCD." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SimplePage
      chapter="07"
      eyebrow="Vie scolaire"
      title="Fournitures & Manuels"
      lead="Listes de fournitures et manuels prêtés par la BCD."
      points={[
        { title: "Programme marocain officiel", text: "Un enseignement conforme au programme officiel, avec un français renforcé et un anglais valorisé." },
        { title: "Un suivi avec les familles", text: "Pronote est l'outil privilégié de communication entre l'école et les parents." },
        { title: "L'administration à votre écoute", text: "Pour toute information pratique, contactez l'administration par téléphone ou par email." },
      ]}
    />
  );
}
