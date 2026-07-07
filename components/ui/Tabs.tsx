"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export function Tabs({ tabs, defaultTab }: { tabs: TabItem[]; defaultTab?: string }) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active);

  return (
    <div>
      <div className="flex gap-6 border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              "-mb-px border-b-2 px-1 py-3 text-sm font-medium transition-colors",
              active === tab.id
                ? "border-maroon-600 text-maroon-600"
                : "border-transparent text-neutral-500 hover:text-neutral-800"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6">{activeTab?.content}</div>
    </div>
  );
}
