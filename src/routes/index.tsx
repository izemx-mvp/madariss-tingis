import { createFileRoute } from "@tanstack/react-router";
import { MarqueeStrip } from "@/components/site/blocks/MarqueeStrip";
import { Cycles, Hero, Mission, Vision } from "@/components/home/HomeTop";
import {
  AuDelaDesCours,
  Chiffres,
  EspaceParents,
  InscriptionBand,
  Journee,
  Langues,
  MotEtEvenement,
} from "@/components/home/HomeBottom";
import { marqueeValues } from "@/data/site";

const description =
  "Madariss Tingis, école privée à Tanger : maternelle, primaire, collège et lycée. Programme marocain officiel, français renforcé, anglais et activités périscolaires.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Madariss Tingis — École privée à Tanger, de la maternelle au lycée" },
      { name: "description", content: description },
      { property: "og:title", content: "Madariss Tingis — École privée à Tanger" },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <MarqueeStrip items={marqueeValues} />
      <Vision />
      <Mission />
      <Cycles />
      <Chiffres />
      <Journee />
      <Langues />
      <AuDelaDesCours />
      <EspaceParents />
      <MotEtEvenement />
      <InscriptionBand />
    </>
  );
}
