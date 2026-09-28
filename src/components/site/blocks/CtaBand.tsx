import type { ReactNode } from "react";
import { Action } from "./primitives";
import { WaveDivider } from "./WaveDivider";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  text,
  primary,
  secondary,
  tone = "teal",
  children,
}: {
  title: string;
  text?: string;
  primary?: { to?: string; href?: string; label: string };
  secondary?: { to?: string; href?: string; label: string };
  tone?: "teal" | "coral" | "gradient";
  children?: ReactNode;
}) {
  const bg =
    tone === "teal" ? "bg-teal-900" : tone === "coral" ? "bg-coral-600" : "gradient-signature";
  return (
    <section className="relative">
      <WaveDivider fill={tone === "coral" ? "coral" : "teal"} />
      <div className={cn("relative overflow-hidden", bg)}>
        <div className="zellige absolute inset-0" aria-hidden="true" />
        <div className="container-site relative py-16 text-center md:py-24">
          <h2 className="mx-auto max-w-3xl font-display text-3xl text-white md:text-5xl">{title}</h2>
          {text ? <p className="mx-auto mt-4 max-w-2xl text-white/85">{text}</p> : null}
          {children}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {primary ? (
              <Action to={primary.to} href={primary.href} variant="light">
                {primary.label}
              </Action>
            ) : null}
            {secondary ? (
              <Action
                to={secondary.to}
                href={secondary.href}
                variant="secondary"
                className="border-white text-white hover:bg-white/10"
              >
                {secondary.label}
              </Action>
            ) : null}
          </div>
        </div>
      </div>
      <WaveDivider fill="paper" />
    </section>
  );
}
