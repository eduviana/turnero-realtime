
export interface Operator {
  id: string;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null,
}

export interface OperatorService {
  id: string;
  name: string;
  code: string; // CLAVE para resolver el área
  description: string | null;
}

export interface OperatorUserService {
  id: string;
  assignedAt: Date;
}

// ───────────────────────────────
// Context
// ───────────────────────────────

export interface OperatorServiceContext {
  operator: Operator;
  service: OperatorService;
  userService: OperatorUserService;
}

// ───────────────────────────────
// Dashboard (UI specific)
// ───────────────────────────────

// se usa en /operator/dashboard, es utilizado para la/las card de cada servicio asociado a un usuario
export interface OperatorServiceCard {
  userServiceId: string;

  serviceId: string;
  serviceName: string;
  code: string;
  description: string | null;
  href: string;
}

// se usa en /operator/dashboard
export interface OperatorDashboardData {
  operatorId: string;
  operatorName: string | null;
  services: OperatorServiceCard[];
}