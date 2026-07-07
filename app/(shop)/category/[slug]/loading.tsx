export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-[1800px] animate-pulse px-3 py-8 sm:px-4 lg:px-6">
      <div className="h-4 w-40 rounded bg-neutral-200" />
      <div className="mt-3 h-8 w-64 rounded bg-neutral-200" />
      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] rounded-xl bg-neutral-200" />
        ))}
      </div>
    </div>
  );
}
