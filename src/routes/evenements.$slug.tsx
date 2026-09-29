import { createFileRoute, notFound } from "@tanstack/react-router";
import { EventArticlePage } from "@/components/pages/evenements/EventArticlePage";
import { getEvent } from "@/data/events";

export const Route = createFileRoute("/evenements/$slug")({
  loader: ({ params }) => {
    const event = getEvent(params.slug);
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
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: EventRoute,
});

function EventRoute() {
  const { event } = Route.useLoaderData();
  return <EventArticlePage event={event} />;
}
