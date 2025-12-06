export interface FindByDniResponse {
  affiliateId: string;
}

export async function findByDni(dni: string): Promise<FindByDniResponse> {
  try {
    const res = await fetch("/api/affiliate/find-by-dni", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dni }),
    });

    let data: any;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e)
      throw new Error("Respuesta inválida del servidor.");
    }

    switch (res.status) {
      case 200:
        return { affiliateId: data.affiliateId };

      case 404:
        throw new Error("No se encontró un afiliado con ese DNI.");

      case 403:
        if (data.code === "SUSPENDED") {
          throw new Error("El afiliado se encuentra suspendido.");
        }
        throw new Error("El afiliado no está activo.");

      default:
        throw new Error(data?.message ?? "Error inesperado.");
    }
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("Error de conexión.");
    }

    throw err;
  }
}
