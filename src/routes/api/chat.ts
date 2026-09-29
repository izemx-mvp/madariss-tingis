import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "@/lib/ai/run-id.server";
import { SCHOOL_YEAR, site } from "@/data/site";

const SYSTEM = `Tu es « Tingis », l'assistant virtuel de ${site.name} (${site.nameAr}), école privée à Tanger : maternelle, primaire, collège et lycée (bac scientifique SM, PC, SVT). Programme marocain officiel, français renforcé, anglais, activités (théâtre, échecs, musique, sport), cantine, transport, assistance médicale.
Année scolaire : ${SCHOOL_YEAR}. Adresse : ${site.address}. Téléphones : ${site.phones.join(" / ")}. E-mail : ${site.email}. Pronote pour le suivi des familles.
Pages utiles : /conditions-admission, /inscription, /frais-de-scolarite, /horaires, /vacances-scolaires, /cycles, /transport-scolaire, /restauration, /contact.
Réponds en français (ou dans la langue du parent), brièvement, chaleureusement, en markdown. N'invente jamais de tarifs, dates ou chiffres : si tu ne sais pas, oriente vers l'administration.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return new Response("Assistant non configuré", { status: 500 });
        const body = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(body.messages)) return new Response("Requête invalide", { status: 400 });

        const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
          fetch: runIdFetch.fetch,
        });
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          system: SYSTEM,
          messages: await convertToModelMessages(body.messages.slice(-30)),
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });
        return withLovableAiGatewayRunIdHeader(
          result.toUIMessageStreamResponse({
            originalMessages: body.messages,
            onError: (e) => {
              const s = (e as { statusCode?: number })?.statusCode;
              if (s === 429) return "Trop de demandes, réessayez dans un instant.";
              if (s === 402) return "Crédits IA épuisés.";
              return "Une erreur est survenue. Réessayez ou appelez l'école.";
            },
          }),
          runIdFetch,
        );
      },
    },
  },
});
