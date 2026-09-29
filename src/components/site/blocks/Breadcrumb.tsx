import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; to?: string | undefined };

export function Breadcrumb({ items, tone = "dark" }: { items: Crumb[]; tone?: "dark" | "light" }) {
  const base = tone === "light" ? "text-white/70" : "text-ink-600";
  const strong = tone === "light" ? "text-white" : "text-teal-700";

  return (
    <nav aria-label="Fil d'Ariane" className={cn("no-print flex flex-wrap items-center gap-1.5 text-sm", base)}>
      <Link to="/" className={cn("inline-flex items-center gap-1.5 hover:underline", strong)}>
        <Home className="size-4" strokeWidth={1.75} />
        <span>Accueil</span>
      </Link>
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <ChevronRight className="size-4 opacity-50" strokeWidth={1.75} />
          {item.to ? (
            <Link to={item.to as never} className={cn("hover:underline", strong)}>
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
