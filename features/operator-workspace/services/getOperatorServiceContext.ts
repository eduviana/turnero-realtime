import { prisma } from "@/lib/db/prisma";
import type { OperatorServiceContext } from "../types/operator";

interface GetOperatorServiceContextParams {
  clerkUserId: string;
  serviceId: string;
}

export async function getOperatorServiceContext(
  params: GetOperatorServiceContextParams
): Promise<OperatorServiceContext | null> {
  const user = await prisma.user.findFirst({
    where: {
      clerkId: params.clerkUserId,
      deletedAt: null,
      role: "OPERATOR",
      services: {
        some: {
          serviceId: params.serviceId,
          isActive: true,
        },
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      services: {
        where: {
          serviceId: params.serviceId,
          isActive: true,
        },
        select: {
          id: true,
          assignedAt: true,
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

  if (!user || user.services.length === 0) {
    return null;
  }

  const userService = user.services[0];

  return {
    operator: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
    },
    service: {
      id: userService.service.id,
      name: userService.service.name,
      code: userService.service.code,
      description: userService.service.description,
    },
    userService: {
      id: userService.id,
      assignedAt: userService.assignedAt,
    },
  };
}