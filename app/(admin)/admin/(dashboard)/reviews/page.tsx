import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { ReviewsTable } from "@/components/admin/ReviewsTable";
import { adminListReviews } from "@/lib/api/catalog";
import { getAccessToken } from "@/lib/server/session";

export const metadata = { title: "Reviews" };

export default async function AdminReviewsPage() {
  const accessToken = (await getAccessToken())!;
  const reviews = await adminListReviews(accessToken);

  return (
    <>
      <AdminTopbar title="Reviews" subtitle={`${reviews.length} reviews`} />
      <div className="p-6 sm:p-8">
        <ReviewsTable reviews={reviews} />
      </div>
    </>
  );
}
