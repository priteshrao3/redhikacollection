import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { EnquiriesTable } from "@/components/admin/EnquiriesTable";
import { adminListEnquiries } from "@/lib/api/enquiries";
import { getAccessToken } from "@/lib/server/session";

export const metadata = { title: "Enquiries" };

export default async function AdminEnquiriesPage() {
  const accessToken = (await getAccessToken())!;
  const enquiries = await adminListEnquiries(accessToken);

  return (
    <>
      <AdminTopbar title="Enquiries" subtitle={`${enquiries.length} WhatsApp leads captured`} />
      <div className="p-6 sm:p-8">
        <EnquiriesTable enquiries={enquiries} />
      </div>
    </>
  );
}
