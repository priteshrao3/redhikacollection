import { cn } from "@/lib/cn";

export function ChartCard({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-neutral-200 bg-white p-5 shadow-sm", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-sm font-semibold text-navy-900">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}
