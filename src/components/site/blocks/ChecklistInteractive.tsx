import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ChecklistItem = { id: string; label: string; help?: string | undefined };

export function ChecklistInteractive({
  title,
  items,
  doneLabel = "Votre dossier est complet !",
}: {
  title: string;
  items: ChecklistItem[];
  doneLabel?: string;
}) {
  const [checked, setChecked] = useState<string[]>([]);
  const pct = items.length ? Math.round((checked.length / items.length) * 100) : 0;
  const r = 52;
  const c = 2 * Math.PI * r;

  const toggle = (id: string) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div className="grid items-center gap-10 rounded-[2.5rem] border border-line bg-white p-7 shadow-soft md:p-10 lg:grid-cols-[auto_1fr] lg:gap-14">
      <div className="mx-auto">
        <div className="relative grid size-40 place-items-center">
          <svg viewBox="0 0 120 120" className="absolute size-full -rotate-90">
            <circle cx="60" cy="60" r={r} fill="none" stroke="var(--line)" strokeWidth="12" />
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="var(--coral-500)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c - (c * pct) / 100}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <span className="relative font-display text-3xl font-bold text-teal-900">{pct}%</span>
        </div>
        <p className="mt-4 text-center text-sm font-bold text-ink-600">
          {checked.length} / {items.length} pièces
        </p>
      </div>

      <div>
        <h3 className="font-display text-2xl md:text-3xl">{title}</h3>
        <ul className="mt-6 space-y-3">
          {items.map((item) => {
            const on = checked.includes(item.id);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-pressed={on}
                  className={cn(
                    "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300",
                    on ? "border-teal-500/60 bg-teal-50" : "border-line bg-paper hover:border-coral-500/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors",
                      on ? "border-teal-700 bg-teal-700 text-white" : "border-line bg-white",
                    )}
                  >
                    {on ? <Check className="size-4" strokeWidth={3} /> : null}
                  </span>
                  <span>
                    <span className={cn("block font-bold", on && "text-teal-900")}>{item.label}</span>
                    {item.help ? <span className="mt-1 block text-sm text-ink-600">{item.help}</span> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {pct === 100 ? <p className="hand-note mt-5">{doneLabel}</p> : null}
      </div>
    </div>
  );
}
