import { prisma } from "@/lib/db/prisma";
import { OperatorServiceContextValue } from "../context/OperatorServiceContext";

interface GetOperatorServiceContextParams {
  clerkUserId: string;
  serviceId: string;
}

export async function getOperatorServiceContext(
  params: GetOperatorServiceContextParams
): Promise<OperatorServiceContextValue | null> {
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
      services: {
        where: {
          serviceId: params.serviceId,
          isActive: true,
        },
        select: {
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

  const service = user.services[0].service;

  return {
    operatorId: user.id,
    operatorName: user.firstName,
    service: {
      id: service.id,
      name: service.name,
      code: service.code,
      description: service.description,
    },
  };
}