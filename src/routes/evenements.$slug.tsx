import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import masterChef from "@/assets/master-chef-junior.jpg";
import { Action, Badge, SectionLabel } from "@/components/site/blocks/primitives";
import { WaveDivider } from "@/components/site/blocks/WaveDivider";
import { CtaBand } from "@/components/site/blocks/CtaBand";

const events = {
  "master-chef-junior": {
    title: "Master Chef Junior arrive bientôt à Madariss Tingis !",
    lead: "Un atelier gourmand où nos élèves enfilent la toque, goûtent, dosent, présentent… et apprennent autrement.",
    badge: "Bientôt",
    image: masterChef,
    alt: "Élèves en toque et tablier cuisinant avec un chef",
    paragraphs: [
      "Cuisiner, c'est lire une consigne, mesurer, compter, coopérer et présenter son travail. C'est exactement ce que nous aimons faire vivre à nos élèves : apprendre en faisant, ensemble, avec le sourire.",
      "Master Chef Junior réunira des équipes d'élèves autour d'ateliers de préparation, de dégustation et de présentation. Chaque équipe travaillera l'organisation, le goût, la propreté du plan de travail et la prise de parole devant les autres.",
      "Les informations pratiques (date, organisation, niveaux concernés) seront communiquées aux familles via Pronote. En attendant, l'administration reste à votre disposition pour toute question.",
    ],
    quote: "On retient mieux ce que l'on a fait de ses mains.",
  },
} as const;

export const Route = createFileRoute("/evenements/$slug")({
  loader: ({ params }) => {
    const event = events[params.slug as keyof typeof events];
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Événement introuvable — Madariss Tingis" }, { name: "robots", content: "noindex" }] };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — Madariss Tingis` },
        { name: "description", content: event.lead },
        { property: "og:title", content: event.title },
        { property: "og:description", content: event.lead },
      ],
    };
  },
  component: EventPage,
});

function EventPage() {
  const { event } = Route.useLoaderData();

  return (
    <>
      <section className="relative overflow-hidden bg-teal-900 text-white">
        <div className="zellige absolute inset-0" aria-hidden="true" />
        <div className="container-site relative grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-white/70">
              <Link to="/" className="hover:text-white">
                Accueil
              </Link>
              <span className="mx-2">/</span>
              <Link to="/evenements" className="hover:text-white">
                Événements
              </Link>
            </nav>
            <Badge tone="teal">{event.badge}</Badge>
            <h1 className="mt-4 font-display text-4xl text-white md:text-5xl">{event.title}</h1>
            <p className="mt-4 text-white/80">{event.lead}</p>
          </div>
          <img src={event.image} alt={event.alt} className="tab-shape w-full object-cover" width={1408} height={1056} />
        </div>
        <WaveDivider fill="paper" />
      </section>

      <article className="container-site section-pad max-w-3xl">
        <SectionLabel chapter="01">L'article</SectionLabel>
        <div className="mt-6 space-y-5 text-lg text-ink-600">
          {event.paragraphs.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <blockquote className="my-10 border-l-4 border-coral-500 pl-6 font-display text-2xl text-ink-900 md:text-3xl">
          « {event.quote} »
        </blockquote>
        <div className="flex flex-wrap gap-3">
          <Action to="/evenements" variant="secondary">
            Tous les événements
          </Action>
          <Action to="/photos" variant="tertiary">
            Voir la galerie photos
          </Action>
        </div>
      </article>

      <CtaBand
        title="Envie de vivre ces moments avec nous&nbsp;?"
        text="Déposez une demande d'inscription ou venez nous rencontrer."
        primary={{ to: "/inscription", label: "Inscrire mon enfant" }}
        secondary={{ to: "/contact", label: "Nous contacter" }}
        tone="coral"
      />
    </>
  );
}
