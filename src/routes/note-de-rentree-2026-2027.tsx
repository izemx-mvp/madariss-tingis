import { createFileRoute } from "@tanstack/react-router";
import { NoteRentreePage } from "@/components/pages/note-rentree/NoteRentreePage";

const description =
  "Note de rentrée 2026/2027 de Madariss Tingis : démarche ISO 21001, formation annuelle des enseignants, Pronote et le mot de l'équipe aux familles.";

export const Route = createFileRoute("/note-de-rentree-2026-2027")({
  head: () => ({
    meta: [
      { title: "Note de rentrée 2026/2027 — Madariss Tingis, Tanger" },
      { name: "description", content: description },
      { property: "og:title", content: "Note de rentrée 2026/2027 — Madariss Tingis" },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NoteRentreePage,
});
