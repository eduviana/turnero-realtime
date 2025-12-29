import { Service } from "../types/service";



export async function getAllServicesClient(): Promise<Service[]> {
  const res = await fetch("/api/services");

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Error al obtener servicios");
  }

  const data = await res.json();
  return data.services;
}