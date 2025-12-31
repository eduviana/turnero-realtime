import { AffiliateDataViewModal } from "../types/affiliate";

export async function getAffiliateById(
  id: string
): Promise<AffiliateDataViewModal> {
  const res = await fetch(`/api/affiliate/${id}`);

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Error al obtener afiliado");
  }

  const json = await res.json();
  return json.affiliate;
}
