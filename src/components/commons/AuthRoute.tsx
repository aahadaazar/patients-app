import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { UserRoles, type UserRole } from "../../types/user";

interface AuthRouteProps {
  requiredRoles?: UserRole[];
}

const AuthRoute: React.FC<AuthRouteProps> = ({ requiredRoles }) => {
  const { authState } = useAuth();

  // If still loading auth state, show spinner
  if (authState.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Loading authentication...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If roles are required
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => {
      // Special handling: ADMIN always has access if employee role is required
      if (
        role === UserRoles.EMPLOYEE &&
        authState.user?.role === UserRoles.ADMIN
      ) {
        return true;
      }
      return authState.user?.role === role;
    });

    if (!hasRequiredRole) {
      // Redirect to a forbidden page or home, or simply show a message
      return (
        <div className="flex justify-center items-center h-screen text-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-700">
              You do not have the necessary permissions to view this page.
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // If authenticated and has required role (or no roles required), render the child routes
  return <Outlet />;
};

export default AuthRoute;
