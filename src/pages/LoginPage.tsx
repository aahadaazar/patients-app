import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../services/api.service";
import { useSnackbar } from "../context/SnackbarContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/authValidation";

interface LoginFormInputs {
  id: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await authApi.login({
        id: data.id,
        password: data.password,
      });
      login(response.data.access_token, {
        id: response.data.id,
        role: response.data.role,
      });
      showSnackbar("Login successful!", "success");
      navigate("/patients");
    } catch (error) {
      console.error("Login failed:", error);
      showSnackbar("Login failed. Please check your credentials.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 h-full">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ID:
            </label>
            <input
              type="text"
              id="id"
              {...register("id")}
              placeholder="Enter your id"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                errors.id ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.id && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.id.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="********"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
