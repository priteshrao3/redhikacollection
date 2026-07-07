"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { CategoryClickRow } from "@/types/analytics";
import { CATEGORY_COLOR } from "@/lib/category-colors";
import { CHART_CHROME } from "@/lib/chart-theme";

export function TopCategoriesDonut({ rows }: { rows: CategoryClickRow[] }) {
  const total = rows.reduce((sum, r) => sum + r.clicks, 0) || 1;

  return (
    <div className="flex items-center gap-6">
      <ResponsiveContainer width={160} height={160}>
        <PieChart>
          <Pie
            data={rows}
            dataKey="clicks"
            nameKey="category"
            innerRadius={45}
            outerRadius={72}
            paddingAngle={2}
            stroke={CHART_CHROME.surface}
            strokeWidth={2}
          >
            {rows.map((row) => (
              <Cell key={row.category} fill={CATEGORY_COLOR[row.category]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: CHART_CHROME.gridline }} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="flex-1 space-y-2.5">
        {rows.map((row) => (
          <li key={row.category} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: CATEGORY_COLOR[row.category] }}
            />
            <span className="flex-1 text-neutral-600">{row.category}</span>
            <span className="font-semibold text-navy-900">{Math.round((row.clicks / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
