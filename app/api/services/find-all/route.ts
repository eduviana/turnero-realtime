// import { db } from "@/lib/db/prisma";
// import { NextResponse } from "next/server";


// export async function GET() {
//   try {
//     const services = await db.service.findMany({
//       where: { isActive: true },
//       orderBy: { name: "asc" },
//       select: {
//         id: true,
//         name: true,
//         code: true,
//         description: true,
//       },
//     });

//     return NextResponse.json({ services });
//   } catch (err) {
//     console.error("Error obteniendo los servicios:", err);
//     return NextResponse.json(
//       { message: "Error interno del servidor" },
//       { status: 500 }
//     );
//   }
// }

import { db } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// Cachear por 1 semana
export const revalidate = 604800;

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        code: true,
        description: true,
      },
    });

    return NextResponse.json({ services });
  } catch (err) {
    console.error("Error obteniendo los servicios:", err);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}