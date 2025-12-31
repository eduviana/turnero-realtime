import { EditableService } from "@/features/service/types/service";


export async function updateUserServices(
  userId: string,
  services: EditableService[]
) {
  const res = await fetch(`/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      services,
    }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error ?? "Error al actualizar servicios");
  }

  return res.json();
}