export async function findByDni(dni: string): Promise<{ affiliateId: string }> {
  try {
    const res = await fetch("/api/affiliate/find-by-dni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dni }),
    });

    // Si fallo el fetch (network error), res es undefined → catch lo maneja
    const data = await res.json();

    if (res.status === 404) {
      throw new Error("No se encontró un afiliado con ese DNI.");
    }

    if (res.status === 403) {
      if (data.code === "SUSPENDED") {
        throw new Error("El afiliado se encuentra suspendido.");
      }

      throw new Error("El afiliado no está activo.");
    }

    if (!res.ok) {
      throw new Error(data?.message ?? "Error inesperado.");
    }

    return {
      affiliateId: data.affiliateId,
    };
  } catch (err) {
    // Detectamos error de red real
    if (err instanceof TypeError) {
      // TypeError = falla de fetch (network)
      throw new Error("Error de conexión.");
    }

    // Re-lanzamos errores semánticos sin tocarlos
    throw err;
  }
}