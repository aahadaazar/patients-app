import { useCallback, useEffect, useMemo, useState } from "react";
import { type SnackbarState, type SnackbarType } from "../../types/snackbar";
import { SnackbarContext } from "../SnackbarContext";

const initialSnackbarState: SnackbarState = {
  message: null,
  type: "info",
  visible: false,
};

// Snackbar Provider Component
export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbarState, setSnackbarState] =
    useState<SnackbarState>(initialSnackbarState);
  const SNACKBAR_TIMEOUT_MS = 3000;

  const showSnackbar = useCallback(
    (message: string, type: SnackbarType = "info") => {
      setSnackbarState({ message, type, visible: true });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, visible: false }));
  }, []);

  useEffect(() => {
    let timer: number;
    if (snackbarState.visible) {
      timer = setTimeout(() => {
        hideSnackbar();
      }, SNACKBAR_TIMEOUT_MS);
    }
    return () => clearTimeout(timer);
  }, [snackbarState.visible, hideSnackbar]);

  const contextValue = useMemo(
    () => ({
      showSnackbar,
      hideSnackbar,
      snackbarState,
    }),
    [showSnackbar, hideSnackbar, snackbarState]
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
};
