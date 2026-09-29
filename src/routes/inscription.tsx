import { createFileRoute } from "@tanstack/react-router";
import { InscriptionPage } from "@/components/pages/inscription/InscriptionPage";

const description =
  "Déposez une demande d'inscription à Madariss Tingis, école privée à Tanger : formulaire en 5 étapes, test de niveau et dossier.";

export const Route = createFileRoute("/inscription")({
  head: () => ({
    meta: [
      { title: "Demande d'inscription — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Demande d'inscription — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InscriptionPage,
});
