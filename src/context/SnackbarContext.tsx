import { createContext, useContext } from "react";
import type { SnackbarContextType } from "../types/snackbar";

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// Custom hook to use the SnackbarContext
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
