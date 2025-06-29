import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import type { AuthState } from "../../types/auth";
import { UserRoles, type User } from "../../types/user";

const TOKEN_KEY = "jwt_token";
const USER_DATA_KEY = "user_data";

// Initial state for the authentication context
const initialAuthState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isEmployee: false,
  loading: true,
};

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const setUserAndRoles = useCallback((token: string, user: User) => {
    setAuthState({
      token,
      user,
      isAuthenticated: true,
      isAdmin: user.role === UserRoles.ADMIN,
      isEmployee:
        user.role === UserRoles.EMPLOYEE || user.role === UserRoles.ADMIN,
      loading: false,
    });
  }, []);

  // Login function
  const login = useCallback(
    (token: string, user: User) => {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(user)); // Store user data
      setUserAndRoles(token, user);
    },
    [setUserAndRoles]
  );

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY); // Clear user data
    setAuthState({ ...initialAuthState, loading: false });
  }, []);

  // Check auth status on initial load or refresh
  const checkAuth = useCallback(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUserData = localStorage.getItem(USER_DATA_KEY);

    if (storedToken && storedUserData) {
      try {
        const user: User = JSON.parse(storedUserData);
        setUserAndRoles(storedToken, user);
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        // If data is corrupted, clear everything
        logout();
      }
    } else {
      setAuthState({ ...initialAuthState, loading: false }); // No token or user data, stop loading
    }
  }, [setUserAndRoles, logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ authState, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
