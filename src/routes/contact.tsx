import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/contact/ContactPage";

const description =
  "Contactez Madariss Tingis, école privée à Tanger : formulaire, téléphone, email, plan d'accès (km 5,5 Route de Rabat, Ziaten).";

/** ?objet=... préremplit l'objet du formulaire. */
type ContactSearch = { objet?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch =>
    typeof search['objet'] === "string" && search['objet'].length > 0 ? { objet: search['objet'].slice(0, 80) } : {},
  head: () => ({
    meta: [
      { title: "Contact — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Contact — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
