// import { PharmacyGeneralOrder, PharmacyGeneralOrderRow } from "../types/pharmacy-general";


// export function toPharmacyGeneralOrderRow(
//   order: PharmacyGeneralOrder
// ): PharmacyGeneralOrderRow {
//   return {
//     id: order.id,
//     ticketCode: order.ticketCode,

//     affiliate: order.affiliate
//       ? `${order.affiliate.fullName} (${order.affiliate.dni})`
//       : "—",

//     operator: order.operator.fullName,
//     service: order.service.name,

//     itemsCount: order.itemsCount,
//     createdAt: new Date(order.createdAt),
//   };
// }


import {
  PharmacyGeneralOrder,
  PharmacyGeneralOrderRow,
} from "../types/pharmacy-general";

export function toPharmacyGeneralOrderRow(
  order: PharmacyGeneralOrder
): PharmacyGeneralOrderRow {
  return {
    id: order.id,

    affiliate: order.affiliate
      ? `${order.affiliate.fullName} (${order.affiliate.dni})`
      : "—",

    operator: order.operator.fullName,

    totalAmount: order.totalAmount,

    createdAt: new Date(order.createdAt),
  };
}