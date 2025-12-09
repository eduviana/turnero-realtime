import { Services } from "@/features/service/components/Services";
import { getAllServices } from "@/features/service/services/getAllServices";

export default async function ServiciosPage() {
  const services = await getAllServices();

  return <Services services={services} />;
}
