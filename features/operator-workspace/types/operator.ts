
// se usa en /operator/dashboard, es utilizado para la/las card de cada servicio asociado a un usuario
export interface OperatorServiceCard {
  userServiceId: string;

  serviceId: string;
  serviceName: string;
  code: string;
  description: string | null;
  href: string;
}

// se usa en /operator/dashboard, es utilizado para la/las card de cada servicio asociado a un usuario
export interface OperatorDashboardData {
  operatorId: string;
  operatorName: string | null;
  services: OperatorServiceCard[];
}



export interface OperatorServiceContext {
  operator: {
    id: string;
    firstName: string | null;
    lastName: string | null;
  };

  service: {
    id: string;
    name: string;
    description: string | null;
    code: string; // esto es CLAVE para resolver el área
  };

  userService: {
    id: string;
    assignedAt: Date;
  };
}