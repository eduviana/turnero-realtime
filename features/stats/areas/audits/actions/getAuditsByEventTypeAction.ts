"use server";

import { getAuditsByEventType } from "../services/getAuditsByEventType";

export async function getAuditsByEventTypeAction() {
  return getAuditsByEventType();
}