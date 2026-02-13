
import PharmacyMedicationOrdersTable from "./components/PharmacyMedicationOrdersTable";
import { toPharmacyMedicationOrderRow } from "./lib/toPharmacyMedicationOrderRow";


import { getPharmacyMedicationOrders } from "./services/getPharmacyMedicationOrders";


export default async function PharmacyMedicationOrdersPage() {
  const orders = await getPharmacyMedicationOrders();
  const rows = orders.map(toPharmacyMedicationOrderRow);

  return (
    <div className="container mx-auto">
      <PharmacyMedicationOrdersTable data={rows} />
    </div>
  );
}