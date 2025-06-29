import React from "react";
import { useAuth } from "../../context/AuthContext";
import { IoIosLogOut } from "react-icons/io";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { authState, logout } = useAuth();
  return (
    <div className="flex flex-col bg-gray-100 pt-2 px-2 h-full overflow-auto">
      {authState.isAuthenticated ? (
        <button
          onClick={logout}
          className="flex items-center gap-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 w-fit ml-auto text-sm"
        >
          <IoIosLogOut />
          <span className="hidden sm:block ">Logout</span>
        </button>
      ) : (
        <></>
      )}
      <main className="p-0 sm:m-6 lg:m-8 flex-1">{children}</main>

      <footer className="text-gray-700 p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Patient Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
