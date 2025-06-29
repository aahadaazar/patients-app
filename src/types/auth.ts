import type { User, UserRole } from "./user";

export interface LoginResponse {
  access_token: string;
  id: string;
  role: UserRole;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEmployee: boolean;
  loading: boolean;
}

export interface AuthContextType {
  authState: AuthState;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}
