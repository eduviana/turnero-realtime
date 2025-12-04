export interface AffiliateResult {
  id: string;
  dni: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  email?: string | null;
  status: string;
}

// export type AffiliateCheckResult =
//   | { status: "OK"; affiliateId: string }
//   | { status: "NOT_FOUND" }
//   | { status: "SUSPENDED" }
//   | { status: "INACTIVE" }
//   | { status: "ERROR"; message: string };