export function MarqueeStrip({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="gradient-signature overflow-hidden py-4" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="font-display text-xl font-semibold text-white md:text-2xl">{item}</span>
            <span className="size-2 rounded-full bg-white/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
