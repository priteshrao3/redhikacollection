import type { TrafficSourceRow } from "@/types/analytics";
import { CATEGORICAL_ORDER } from "@/lib/chart-theme";

export function TrafficSourceChart({ rows }: { rows: TrafficSourceRow[] }) {
  return (
    <ul className="space-y-4">
      {rows.map((row, i) => (
        <li key={row.source}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-neutral-600">{row.source}</span>
            <span className="font-semibold text-navy-900">{row.percent}%</span>
          </div>
          <div className="h-2 rounded-full bg-neutral-100">
            <div
              className="h-full rounded-full"
              style={{ width: `${row.percent}%`, backgroundColor: CATEGORICAL_ORDER[i % CATEGORICAL_ORDER.length] }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
