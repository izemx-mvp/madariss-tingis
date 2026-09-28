import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  sub,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-3xl border border-line bg-white/80 p-6 shadow-soft backdrop-blur">
      <p className="font-display text-5xl font-bold text-coral-600">
        {prefix}
        {n}
        {suffix}
      </p>
      <p className="mt-2 font-display text-lg text-ink-900">{label}</p>
      {sub ? <p className="mt-1 text-sm text-ink-600">{sub}</p> : null}
    </div>
  );
}
