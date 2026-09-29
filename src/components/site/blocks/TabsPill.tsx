import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PillTab = {
  id: string;
  label: string;
  content: ReactNode;
};

export function TabsPill({
  tabs,
  tone = "light",
  align = "center",
}: {
  tabs: PillTab[];
  tone?: "light" | "dark";
  align?: "center" | "start";
}) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Sections"
        className={cn(
          "flex flex-wrap gap-2 rounded-full p-2",
          align === "center" ? "mx-auto w-fit justify-center" : "w-fit",
          tone === "dark" ? "bg-white/10" : "bg-sand",
        )}
      >
        {tabs.map((tab) => {
          const on = tab.id === current?.id;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300",
                on
                  ? "bg-coral-600 text-white shadow-soft"
                  : tone === "dark"
                    ? "text-white/80 hover:bg-white/10"
                    : "text-ink-600 hover:text-coral-700",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-10">
        {current?.content}
      </div>
    </div>
  );
}
