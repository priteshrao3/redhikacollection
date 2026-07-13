import { Quote } from "lucide-react";
import { listReviews } from "@/lib/api/catalog";
import { StarRating } from "@/components/ui/StarRating";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FEATURED_PRODUCT_IDS = ["saree-01", "lehenga-01", "suit-05", "dress-03"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function Testimonials() {
  const reviewLists = await Promise.all(FEATURED_PRODUCT_IDS.map((id) => listReviews(id)));
  const reviews = reviewLists.map((list) => list[0]).filter((review) => review !== undefined);

  return (
    <section className="mx-auto max-w-[1800px] px-3 py-14 sm:px-4 lg:px-6">
      <SectionHeading eyebrow="Customer Love" title="What Our Customers Are Saying" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review, i) => (
          <div
            key={i}
            className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-lg"
          >
            <Quote
              className="pointer-events-none absolute -right-2 -top-2 text-maroon-50 transition-transform duration-300 group-hover:scale-110"
              size={80}
              strokeWidth={0.5}
              fill="currentColor"
            />
            <Quote className="relative text-gold-400" size={22} />
            <p className="relative text-sm leading-relaxed text-neutral-600">
              &ldquo;{review.body}&rdquo;
            </p>
            <div className="relative mt-auto flex items-center gap-3 pt-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-maroon-600 to-maroon-800 font-display text-xs font-semibold text-gold-200">
                {initials(review.author)}
              </span>
              <div>
                <StarRating rating={review.rating} />
                <p className="mt-1 text-sm font-medium text-navy-900">{review.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
