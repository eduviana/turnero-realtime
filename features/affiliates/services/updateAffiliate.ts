import { AffiliateEditFormData } from "../types/affiliate";

export async function updateAffiliate(
  id: string,
  data: AffiliateEditFormData
) {
  const res = await fetch(`/api/affiliate/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Error al actualizar afiliado");
  }

  const json = await res.json();
  return json.affiliate;
}