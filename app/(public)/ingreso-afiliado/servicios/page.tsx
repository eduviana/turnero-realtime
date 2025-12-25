import { Services } from "@/features/service/components/Services";
import { getActiveServices } from "@/features/service/services/getActiveServices";


export default async function ServiciosPage() {
  const services = await getActiveServices();

  return <Services services={services} />;
}
