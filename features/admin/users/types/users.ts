export interface UserWithStatus {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  userStatus: {
    isOnline: boolean;
    lastActivityAt: Date | null;
  } | null;
}

export interface UserTableRow {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role: string;
  createdAt: string;

  // presencia
  isOnline: boolean;
  lastActivityAt: Date | null;
}

// export interface UserDataViewModal {
//   id: string;
//   email: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   profileImage: string | null;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// }
