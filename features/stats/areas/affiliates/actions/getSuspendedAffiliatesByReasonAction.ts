"use server";

import { getSuspendedAffiliatesByReason } from "../services/getSuspendedAffiliatesByReason";

export async function getSuspendedAffiliatesByReasonAction() {
  return getSuspendedAffiliatesByReason();
}