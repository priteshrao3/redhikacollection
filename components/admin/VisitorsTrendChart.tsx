"use client";

import { Legend, Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DailyTrendPoint } from "@/types/analytics";
import { CATEGORICAL, CHART_CHROME } from "@/lib/chart-theme";

export function VisitorsTrendChart({ data }: { data: DailyTrendPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} />
        <XAxis
          dataKey="date"
          tickFormatter={(d: string) => d.slice(5)}
          tick={{ fontSize: 11, fill: CHART_CHROME.mutedInk }}
          axisLine={{ stroke: CHART_CHROME.axis }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)}
          tick={{ fontSize: 11, fill: CHART_CHROME.mutedInk }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: CHART_CHROME.gridline }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="visitors" name="Visitors" stroke={CATEGORICAL.blue} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="pageViews" name="Page Views" stroke={CATEGORICAL.aqua} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
