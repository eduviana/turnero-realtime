"use server";

import { getAffiliatesByStatus } from "../services/getAffiliatesByStatus";

export async function getAffiliatesByStatusAction() {
  return getAffiliatesByStatus();
}