import type { StatItem } from "@/types/content";

export function StatsStrip({ stats }: { stats: StatItem[] }) {
  return (
    <section className="border-y border-gold-200/60 bg-maroon-900">
      <div className="mx-auto grid max-w-[1800px] grid-cols-2 gap-8 px-3 py-10 sm:px-4 md:grid-cols-4 lg:px-6">
        {stats.map((stat) => (
          <div key={stat.id} className="text-center">
            <div className="font-display text-3xl text-gold-300 sm:text-4xl">{stat.value}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
