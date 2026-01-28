"use server";

import { getServices } from "../../users/services/getServices";

export async function getServicesAction() {
  return getServices();
}