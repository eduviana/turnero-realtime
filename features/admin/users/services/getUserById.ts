


export async function getUserById(id: string) {
  const res = await fetch(`/api/users/${id}`);

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Error al obtener usuario");
  }

  const data = await res.json();
  return data.user;
}