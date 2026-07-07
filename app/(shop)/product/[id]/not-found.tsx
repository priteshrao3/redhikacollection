import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-[1800px] px-3 py-24 text-center sm:px-4 lg:px-6">
      <h1 className="font-display text-2xl text-navy-900">Product not found</h1>
      <p className="mt-2 text-sm text-neutral-500">
        This product may have been removed or the link is incorrect.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-maroon-700"
      >
        Back to Home
      </Link>
    </div>
  );
}
