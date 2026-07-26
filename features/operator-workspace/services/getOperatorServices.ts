//muestra que servicios puede operar un determinado usuario
import { prisma } from "@/lib/db/prisma";
import { buildServiceHref } from "../lib/buildServiceHref";
import { OperatorDashboardData, OperatorServiceCard } from "../types/operator";

export async function getOperatorServices(
  userId: string
): Promise<OperatorDashboardData> {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null,
      role: "OPERATOR",
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      role: true,
      profileImage: true,
      services: {
        where: {
          isActive: true, // vínculo operador-servicio activo
        },
        select: {
          id: true,
          service: {
            select: {
              id: true,
              name: true,
              code: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new Error("Operator user not found or inactive");
  }

  const services: OperatorServiceCard[] = user.services.map(
    (userService) => ({
      userServiceId: userService.id,
      serviceId: userService.service.id,
      serviceName: userService.service.name,
      code: userService.service.code,
      description: userService.service.description,
      href: buildServiceHref(userService.service.id),
    })
  );

  return {
    operatorId: user.id,
    operatorName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    profileImage: user.profileImage,
    services,
  };
}