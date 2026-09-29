import { createFileRoute } from "@tanstack/react-router";
import { AdmissionPage } from "@/components/pages/admission/AdmissionPage";

const description =
  "Conditions d'admission à Madariss Tingis, Tanger : demande d'inscription, test d'accès au niveau, dossier à constituer et inscription définitive.";

export const Route = createFileRoute("/conditions-admission")({
  head: () => ({
    meta: [
      { title: "Conditions d'admission — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Conditions d'admission — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdmissionPage,
});
