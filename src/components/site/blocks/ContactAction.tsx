import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Bouton vers /contact avec l'objet du formulaire prérempli (?objet=...).
 * Mêmes styles que <Action>.
 */
const variants = {
  primary: "bg-coral-600 text-white hover:bg-coral-700 shadow-soft hover:shadow-lift",
  secondary: "border-2 border-teal-700 text-teal-700 hover:bg-teal-50",
  light: "bg-white text-teal-900 hover:bg-teal-50 shadow-soft",
} as const;

export function ContactAction({
  objet,
  children,
  variant = "primary",
  className,
}: {
  objet: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string | undefined;
}) {
  return (
    <Link
      to={"/contact" as never}
      search={{ objet } as never}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
    </Link>
  );
}
