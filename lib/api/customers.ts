import type { Order } from "@/types/order";
import { apiFetch, type PaginatedResponse } from "@/lib/api/client";
import { mapOrder, type ApiOrder } from "@/lib/api/orders";

export interface Customer {
  id: number;
  email: string;
  name: string;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: string;
  orderCount: number;
}

export interface CustomerDetail extends Customer {
  orders: Order[];
}

interface ApiCustomer {
  id: number;
  email: string;
  name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  order_count: number;
}

function mapCustomer(c: ApiCustomer): Customer {
  return {
    id: c.id,
    email: c.email,
    name: c.name,
    isStaff: c.is_staff,
    isActive: c.is_active,
    dateJoined: c.date_joined,
    orderCount: c.order_count,
  };
}

export async function adminListCustomers(accessToken: string): Promise<Customer[]> {
  const page = await apiFetch<PaginatedResponse<ApiCustomer>>("/customers/?page_size=200", {
    authToken: accessToken,
  });
  return page.results.map(mapCustomer);
}

export async function adminGetCustomer(id: number, accessToken: string): Promise<CustomerDetail> {
  const { orders, ...rest } = await apiFetch<ApiCustomer & { orders: ApiOrder[] }>(`/customers/${id}/`, {
    authToken: accessToken,
  });
  return { ...mapCustomer(rest), orders: orders.map(mapOrder) };
}

export async function adminToggleCustomerActive(id: number, accessToken: string): Promise<Customer> {
  const customer = await apiFetch<ApiCustomer>(`/customers/${id}/toggle-active/`, {
    method: "PATCH",
    authToken: accessToken,
  });
  return mapCustomer(customer);
}
