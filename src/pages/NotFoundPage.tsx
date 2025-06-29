import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center p-4">
      <h1 className="text-9xl font-bold text-gray-700">404</h1>
      <h2 className="text-4xl font-semibold text-gray-800 mt-4 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-lg">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
