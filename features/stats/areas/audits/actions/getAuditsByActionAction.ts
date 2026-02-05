"use server";
import { getAuditsByAction } from "../services/getAuditsByAction";

export async function getAuditsByActionAction() {
  return getAuditsByAction();
}