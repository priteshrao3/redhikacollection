"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { AdminReview } from "@/lib/api/catalog";
import { showToast } from "@/components/shop/Toast";
import { StarRating } from "@/components/ui/StarRating";
import { Table, TableEmptyState, TBody, Td, THead, Th, Tr } from "@/components/ui/Table";
import { deleteReviewAction } from "@/app/(admin)/admin/(dashboard)/reviews/actions";

export function ReviewsTable({ reviews }: { reviews: AdminReview[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(review: AdminReview) {
    if (!confirm(`Delete this review by ${review.author}?`)) return;
    setDeletingId(review.id);
    const result = await deleteReviewAction(review.id);
    setDeletingId(null);
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast("Review deleted.");
    router.refresh();
  }

  return (
    <Table>
      <THead>
        <Tr>
          <Th>Product</Th>
          <Th>Author</Th>
          <Th>Rating</Th>
          <Th>Title</Th>
          <Th>Date</Th>
          <Th>Action</Th>
        </Tr>
      </THead>
      <TBody>
        {reviews.length === 0 && <TableEmptyState colSpan={6} message="No reviews yet." />}
        {reviews.map((review) => (
          <Tr key={review.id} className="transition-colors hover:bg-maroon-50/30">
            <Td className="font-medium text-navy-900">{review.productName}</Td>
            <Td className="text-neutral-500">{review.author}</Td>
            <Td>
              <StarRating rating={review.rating} />
            </Td>
            <Td className="max-w-[240px] truncate text-neutral-500">{review.title}</Td>
            <Td className="text-neutral-500">{review.date}</Td>
            <Td>
              <button
                aria-label="Delete review"
                disabled={deletingId === review.id}
                onClick={() => handleDelete(review)}
                className="text-neutral-400 hover:text-danger-500 disabled:opacity-40"
              >
                <Trash2 size={15} />
              </button>
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
}
