export interface ServiceTableRow {
  id: string;
  name: string;
  code: string;
  description: string | null;
  currentIndex: number;
  isActive: boolean;
  createdAt: string;
}