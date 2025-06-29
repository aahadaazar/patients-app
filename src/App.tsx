import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/commons/Layout";
import LoginPage from "./pages/LoginPage";
import PatientsPage from "./pages/PatientsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthRoute from "./components/commons/AuthRoute";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { setAuthContext, setSnackbarContext } from "./services/api.service";
import { useEffect } from "react";
import { useSnackbar } from "./context/SnackbarContext";
import { UserRoles } from "./types/user";

function App() {
  const auth = useAuth();
  const snackbar = useSnackbar();

  useEffect(() => {
    setAuthContext(auth);
    setSnackbarContext(snackbar);
  }, [auth, snackbar]);
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            element={
              <AuthRoute
                requiredRoles={[UserRoles.ADMIN, UserRoles.EMPLOYEE]}
              />
            }
          >
            <Route path="/patients" element={<PatientsPage />} />
          </Route>

          {/* Home/Default Route */}
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center">
                <h1 className="text-4xl font-bold text-blue-700 mb-4">
                  Welcome to Patient Portal!
                </h1>
                <p className="text-lg text-gray-600">
                  Please{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    login
                  </Link>{" "}
                  to access the patient list.
                </p>
              </div>
            }
          />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
