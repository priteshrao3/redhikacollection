import { apiFetch, type PaginatedResponse } from "@/lib/api/client";
import { getSessionId } from "@/lib/session-id";

export interface Enquiry {
  id: number;
  productId: string;
  productName: string;
  customerName: string;
  phone: string;
  contacted: boolean;
  createdAt: string;
}

interface ApiEnquiry {
  id: number;
  product_id: string;
  product_name: string;
  customer_name: string;
  phone: string;
  contacted: boolean;
  created_at: string;
}

function mapEnquiry(e: ApiEnquiry): Enquiry {
  return {
    id: e.id,
    productId: e.product_id,
    productName: e.product_name,
    customerName: e.customer_name,
    phone: e.phone,
    contacted: e.contacted,
    createdAt: e.created_at,
  };
}

/** Public — submitted from the WhatsApp Enquire popup, just before wa.me opens. */
export async function createEnquiry(productId: string, customerName: string, phone: string): Promise<void> {
  await apiFetch<ApiEnquiry>("/enquiries/", {
    method: "POST",
    body: JSON.stringify({
      product_id: productId,
      customer_name: customerName,
      phone,
      session_id: getSessionId() ?? "",
    }),
  });
}

export async function adminListEnquiries(accessToken: string): Promise<Enquiry[]> {
  const page = await apiFetch<PaginatedResponse<ApiEnquiry>>("/enquiries/?page_size=200", { authToken: accessToken });
  return page.results.map(mapEnquiry);
}

export async function adminToggleEnquiryContacted(id: number, accessToken: string): Promise<Enquiry> {
  const enquiry = await apiFetch<ApiEnquiry>(`/enquiries/${id}/toggle-contacted/`, {
    method: "PATCH",
    authToken: accessToken,
  });
  return mapEnquiry(enquiry);
}
