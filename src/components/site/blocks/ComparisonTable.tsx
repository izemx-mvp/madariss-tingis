import { Reveal } from "./primitives";

export function ComparisonTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: { label: string; cells: string[] }[];
  caption?: string | undefined;
}) {
  return (
    <Reveal>
      <div className="overflow-x-auto rounded-3xl border border-line bg-white shadow-soft">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          {caption ? <caption className="p-5 text-left text-sm text-ink-600">{caption}</caption> : null}
          <thead>
            <tr className="bg-teal-900 text-white">
              <th scope="col" className="p-5 font-display text-base font-semibold">
                &nbsp;
              </th>
              {columns.map((col) => (
                <th key={col} scope="col" className="p-5 font-display text-base font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-sand/60" : "bg-white"}>
                <th scope="row" className="p-5 align-top font-display text-base text-coral-700">
                  {row.label}
                </th>
                {row.cells.map((cell, j) => (
                  <td key={`${row.label}-${j}`} className="p-5 align-top text-sm text-ink-600">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
