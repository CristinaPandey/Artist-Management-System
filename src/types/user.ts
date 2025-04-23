// src/types/user.ts
export type UserRole = "super_admin" | "artist_manager" | "artist";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  // first_name: string;
  // last_name: string;
  // gender: string;
  // address: string;
  // phone_number: string;
  // date_of_birth: string | Date | null;
  role: UserRole;
}
