import type { Review } from "@/lib/api/catalog";
import { StarRating } from "@/components/ui/StarRating";

export function ProductReviews({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-sm text-neutral-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-5">
      {reviews.map((review, i) => (
        <div key={i} className="border-b border-neutral-100 pb-5 last:border-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-navy-900">{review.author}</span>
            <span className="text-xs text-neutral-400">{review.date}</span>
          </div>
          <div className="mt-1.5">
            <StarRating rating={review.rating} />
          </div>
          <h4 className="mt-2 text-sm font-medium text-navy-800">{review.title}</h4>
          <p className="mt-1 text-sm text-neutral-500">{review.body}</p>
        </div>
      ))}
    </div>
  );
}
