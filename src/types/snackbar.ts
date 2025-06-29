export type SnackbarType = "success" | "error" | "info" | "warning";

export interface SnackbarState {
  message: string | null;
  type: SnackbarType;
  visible: boolean;
}

export interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType) => void;
  hideSnackbar: () => void;
  snackbarState: SnackbarState;
}
