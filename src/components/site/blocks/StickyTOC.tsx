import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string; children?: { id: string; label: string }[] | undefined };

export function StickyTOC({ items, title = "Sommaire" }: { items: TocItem[]; title?: string }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const ids = items.flatMap((i) => [i.id, ...(i.children ?? []).map((c) => c.id)]);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label={title} className="no-print lg:sticky lg:top-28">
      <p className="text-xs font-bold tracking-[0.18em] text-coral-700 uppercase">{title}</p>
      <ul className="mt-5 space-y-1 border-l-2 border-line pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => go(item.id)}
              className={cn(
                "block w-full py-1.5 text-left text-sm font-bold transition-colors",
                active === item.id ? "text-coral-700" : "text-ink-900 hover:text-teal-700",
              )}
            >
              {item.label}
            </button>
            {item.children?.length ? (
              <ul className="mb-2 space-y-0.5 pl-3">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <button
                      type="button"
                      onClick={() => go(child.id)}
                      className={cn(
                        "block w-full py-1 text-left text-sm transition-colors",
                        active === child.id ? "text-coral-700" : "text-ink-600 hover:text-teal-700",
                      )}
                    >
                      {child.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
