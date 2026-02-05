import PharmacyGeneralOrdersTable from "./components/PharmacyGeneralOrdersTable";

import { toPharmacyGeneralOrderRow } from "./lib/toPharmacyGeneralOrderRow";
import { getPharmacyGeneralOrders } from "./services/getPharmacyGeneralOrders";

export default async function PharmacyGeneralOrdersPage() {
  const orders = await getPharmacyGeneralOrders();
  const rows = orders.map(toPharmacyGeneralOrderRow);

  return (
    <div className="container mx-auto">
      <PharmacyGeneralOrdersTable data={rows} />
    </div>
  );
}
