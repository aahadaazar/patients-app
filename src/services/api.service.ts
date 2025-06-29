import axios from "axios";
import type { AuthContextType } from "../types/auth";
import type { AxiosInstance } from "axios";
import type { AxiosResponse } from "axios";
import type { AxiosError } from "axios";
import type { SnackbarContextType } from "../types/snackbar";
import type { Patient } from "../types/user";

let authContextRef: AuthContextType | null = null;
let snackbarContextRef: SnackbarContextType | null = null;

export const setAuthContext = (context: AuthContextType) => {
  authContextRef = context;
};
export const setSnackbarContext = (context: SnackbarContextType) => {
  snackbarContextRef = context;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const publicPaths = ["/auth/login", "/auth/register"];

export interface PaginatedPatientsResponse {
  data: Patient[];
  total: number;
  pages: number;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT token to outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    const isPublicPath = publicPaths.some((path) => config.url?.endsWith(path));
    if (!isPublicPath) {
      const token = localStorage.getItem("jwt_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (authContextRef) {
        authContextRef.logout();
      } else {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("user_data");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth-related API calls
export const authApi = {
  login: async (credentials: { id: string; password: string }) => {
    return apiClient.post("/auth/login", credentials);
  },
};

// Patient-related API calls
export const patientsApi = {
  getPatients: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedPatientsResponse>(
      "/patients",
      { params: { page, limit } }
    );
    return response.data;
  },
  getPatientById: async (id: number) => {
    const response = await apiClient.get<Patient>(`/patients/${id}`);
    return response.data;
  },
  createPatient: async (patientData: Omit<Patient, "id">) => {
    const response = await apiClient.post<Patient>("/patients", patientData);
    snackbarContextRef?.showSnackbar("Patient created successfully", "success");
    return response.data;
  },
  updatePatient: async (id: number, patientData: Omit<Patient, "id">) => {
    const response = await apiClient.patch<Patient>(
      `/patients/${id}`,
      patientData
    );
    snackbarContextRef?.showSnackbar(
      `Patient ${patientData.firstName} updated successfully`,
      "success"
    );
    return response.data;
  },
  deletePatient: async (id: number) => {
    const response = await apiClient.delete<void>(`/patients/${id}`);
    snackbarContextRef?.showSnackbar(
      "Patient deleted successfully!",
      "success"
    );
    return response.data;
  },
};
