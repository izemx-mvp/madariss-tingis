import { createFileRoute } from "@tanstack/react-router";
import { AssistanceMedicalePage } from "@/components/pages/assistance-medicale/AssistanceMedicalePage";

const description =
  "Santé et bien-être à Madariss Tingis, Tanger : que faire si votre enfant est malade, justificatifs, certificat de non-contagion et bons réflexes d'hygiène.";

export const Route = createFileRoute("/assistance-medicale")({
  head: () => ({
    meta: [
      { title: "Assistance médicale — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Assistance médicale — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistanceMedicalePage,
});
