import { Check, Package, PackageCheck, ShoppingBag, Truck } from "lucide-react";
import type { OrderTimelineStep } from "@/types/order";
import { cn } from "@/lib/cn";

const ICONS = [ShoppingBag, PackageCheck, Package, Truck, Check];

export function OrderTimeline({ steps }: { steps: OrderTimelineStep[] }) {
  return (
    <div className="flex min-w-[560px] items-start sm:min-w-0">
      {steps.map((step, i) => {
        const Icon = ICONS[i] ?? Check;
        const isLast = i === steps.length - 1;
        return (
          <div key={step.status} className={cn("flex items-start", !isLast && "flex-1")}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                  step.done
                    ? "border-maroon-600 bg-maroon-600 text-white"
                    : "border-neutral-300 bg-white text-neutral-300"
                )}
              >
                <Icon size={17} />
              </div>
              <div className="mt-2 w-24 text-center">
                <div className={cn("text-xs font-medium sm:text-sm", step.done ? "text-navy-900" : "text-neutral-400")}>
                  {step.status}
                </div>
                {step.date && <div className="text-[11px] text-neutral-400">{step.date}</div>}
              </div>
            </div>
            {!isLast && (
              <div
                className={cn("mt-5 h-0.5 flex-1", step.done ? "bg-maroon-600" : "bg-neutral-200")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
