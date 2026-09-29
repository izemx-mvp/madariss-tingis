import { createFileRoute } from "@tanstack/react-router";
import { FraisPage } from "@/components/pages/frais/FraisPage";

const description =
  "Frais de scolarité de Madariss Tingis à Tanger : droits annuels d'inscription, paiement mensuel avant le 05 et grille tarifaire sur demande.";

export const Route = createFileRoute("/frais-de-scolarite")({
  head: () => ({
    meta: [
      { title: "Frais de scolarité — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Frais de scolarité — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FraisPage,
});
