import {getPharmacyGeneralOrderDetail} from "@/features/orders/areas/pharmacy-medication/services/getPharmacyMedicationOrderDetail"

interface Params {
  params: { id: string };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return Response.json(
      { message: "Order id is required" },
      { status: 400 }
    );
  }

  const order = await getPharmacyGeneralOrderDetail(id);

  return Response.json(order);
}