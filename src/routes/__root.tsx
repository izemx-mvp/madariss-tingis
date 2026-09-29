import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ChatWidget } from "@/components/site/ChatWidget";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <p className="hand-note text-2xl">oups…</p>
        <h1 className="mt-2 font-display text-6xl text-coral-600">404</h1>
        <h2 className="mt-4 font-display text-2xl">Page introuvable, elle a dû rester à la maison</h2>
        <p className="mt-2 text-sm text-ink-600">
          Le lien est peut-être ancien ou la page a changé d'adresse.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-coral-600 px-5 py-3 text-sm font-bold text-white hover:bg-coral-700"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border-2 border-teal-700 px-5 py-3 text-sm font-bold text-teal-700 hover:bg-teal-50"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Cette page ne s'est pas chargée</h1>
        <p className="mt-2 text-sm text-ink-600">Vous pouvez réessayer ou revenir à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-coral-600 px-5 py-3 text-sm font-bold text-white hover:bg-coral-700"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-teal-700 px-5 py-3 text-sm font-bold text-teal-700 hover:bg-teal-50"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Madariss Tingis — École privée à Tanger" },
      {
        name: "description",
        content:
          "Madariss Tingis, école privée à Tanger : maternelle, primaire, collège et lycée. Programme marocain officiel, français renforcé et anglais.",
      },
      { property: "og:site_name", content: "Madariss Tingis" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=DM+Sans:wght@400;500;700&family=Caveat:wght@600&family=Aref+Ruqaa:wght@400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-paper">
        <Header />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </QueryClientProvider>
  );
}
