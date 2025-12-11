
import { toServiceTableRow } from "@/features/admin/services/lib/toServiceTableRow";
import ServicesTable from "@/features/admin/services/components/ServicesTable";
import { getAllServices } from "@/features/service/services/getAllServices";

export default async function ServicesPage() {
  const services = await getAllServices();
  const rows = services.map(toServiceTableRow);

  return (
    <div className="container mx-auto py-10">
      <ServicesTable data={rows} />
    </div>
  );
}