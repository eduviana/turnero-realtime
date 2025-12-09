export interface UserTableRow {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role: string;
  createdAt: string;
}


export interface UserDataViewModal {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}