"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BASELINE_REVENUE_TREND } from "@/lib/analytics-baseline";
import { CHART_CHROME, SEQUENTIAL_BLUE } from "@/lib/chart-theme";
import { formatPrice } from "@/lib/format";

export function SalesTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={BASELINE_REVENUE_TREND} margin={{ left: 0, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SEQUENTIAL_BLUE[450]} stopOpacity={0.28} />
            <stop offset="100%" stopColor={SEQUENTIAL_BLUE[450]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={CHART_CHROME.gridline} />
        <XAxis
          dataKey="date"
          tickFormatter={(d: string) => d.slice(5)}
          tick={{ fontSize: 11, fill: CHART_CHROME.mutedInk }}
          axisLine={{ stroke: CHART_CHROME.axis }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => `₹${Math.round(v / 1000)}k`}
          tick={{ fontSize: 11, fill: CHART_CHROME.mutedInk }}
          axisLine={false}
          tickLine={false}
          width={44}
        />
        <Tooltip
          formatter={(value: number) => [formatPrice(value), "Revenue"]}
          labelFormatter={(label: string) => label}
          contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: CHART_CHROME.gridline }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={SEQUENTIAL_BLUE[450]}
          strokeWidth={2}
          fill="url(#salesFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
