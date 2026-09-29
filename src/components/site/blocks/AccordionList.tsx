import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionEntry = {
  id: string;
  title: string;
  badge?: string | undefined;
  content: ReactNode;
};

export function AccordionList({
  entries,
  defaultOpen,
  printAll = false,
}: {
  entries: AccordionEntry[];
  defaultOpen?: string | undefined;
  /** en impression, tout le contenu est visible */
  printAll?: boolean;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);

  if (entries.length === 0) return null;

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const isOpen = open === entry.id;
        return (
          <div
            key={entry.id}
            id={entry.id}
            className={cn(
              "scroll-mt-32 overflow-hidden rounded-3xl border bg-white shadow-soft transition-colors",
              isOpen ? "border-coral-500/50" : "border-line",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : entry.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-4 p-5 text-left md:p-6"
            >
              {entry.badge ? (
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal-50 font-display text-sm font-bold text-teal-700">
                  {entry.badge}
                </span>
              ) : null}
              <span className="flex-1 font-display text-lg md:text-xl">{entry.title}</span>
              <Plus
                className={cn("size-5 shrink-0 text-coral-600 transition-transform duration-300", isOpen && "rotate-45")}
                strokeWidth={2}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-5 pb-6 text-ink-600 md:px-6 md:pl-20">{entry.content}</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
            {printAll && !isOpen ? (
              <div className="hidden px-6 pb-6 text-ink-600 print:block">{entry.content}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
