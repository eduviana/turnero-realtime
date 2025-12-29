export interface Service {
  id: string;
  name: string;
  code: string;
  description: string | null;
}



export interface EditableService {
  serviceId: string;
  name: string;
  code: string;
  assigned: boolean;
  isPrimary: boolean;
}


export interface UserServicesUpdateResult {
  userId: string;
  serviceCodes: string[];
}