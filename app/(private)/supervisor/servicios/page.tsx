import { getAllServices } from "@/features/service/services/getAllServices";
import ServicesTable from "@/features/services/components/ServicesTable";
import { toServiceTableRow } from "@/features/services/lib/toServiceTableRow";

export default async function ServicesPage() {
  const services = await getAllServices();
  const rows = services.map(toServiceTableRow);

  return (
    <div className="container mx-auto py-10">
      <ServicesTable data={rows} />
    </div>
  );
}