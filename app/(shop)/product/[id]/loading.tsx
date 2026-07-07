export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-[1800px] animate-pulse px-3 py-8 sm:px-4 lg:px-6">
      <div className="h-4 w-72 rounded bg-neutral-200" />
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr_0.7fr]">
        <div className="aspect-[4/5] rounded-xl bg-neutral-200" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 rounded bg-neutral-200" />
          <div className="h-5 w-1/3 rounded bg-neutral-200" />
          <div className="h-10 w-1/2 rounded bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
