export type UserRole = "ADMIN" | "EMPLOYEE";

export interface User {
  id: string;
  role: UserRole;
}

export const UserRoles = {
  ADMIN: "ADMIN" as UserRole,
  EMPLOYEE: "EMPLOYEE" as UserRole,
} as const;

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dob: string;
}
