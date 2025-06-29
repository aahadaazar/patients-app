import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/provider/AuthProvider.tsx";
import { SnackbarProvider } from "./context/provider/SnackbarProvider.tsx";
import Snackbar from "./components/commons/Snackbar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      <Snackbar />
    </SnackbarProvider>
  </React.StrictMode>
);
