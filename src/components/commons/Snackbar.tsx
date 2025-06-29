import React from "react";
import { useSnackbar } from "../../context/SnackbarContext";
import { MdCancel } from "react-icons/md";

const Snackbar: React.FC = () => {
  const { snackbarState, hideSnackbar } = useSnackbar();
  const { message, type, visible } = snackbarState;

  if (!visible || !message) {
    return null;
  }

  // Tailwind classes for different types
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-xl text-white transition-all duration-300 transform
        ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
        ${typeClasses[type]} z-50`}
    >
      <div className="flex items-center justify-between">
        <p className="mr-4">{message}</p>
        <button
          onClick={hideSnackbar}
          className="ml-4 p-1 rounded-full border-none hover:border-none hover:bg-white hover:bg-opacity-10 transition"
        >
          <MdCancel />
        </button>
      </div>
    </div>
  );
};

export default Snackbar;
