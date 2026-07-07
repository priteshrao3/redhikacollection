"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ANALYTICS_UPDATED_EVENT,
  getAnalyticsSummary,
  resetAnalytics,
  simulateTraffic,
} from "@/lib/tracking";
import type { AnalyticsSummary } from "@/types/analytics";

export function useAnalytics() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  const refresh = useCallback(() => {
    setSummary(getAnalyticsSummary());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(ANALYTICS_UPDATED_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(ANALYTICS_UPDATED_EVENT, refresh);
    };
  }, [refresh]);

  return {
    summary,
    refresh,
    simulate: (n?: number) => {
      simulateTraffic(n);
      refresh();
    },
    reset: () => {
      resetAnalytics();
      refresh();
    },
  };
}
