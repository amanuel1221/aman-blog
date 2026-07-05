import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100 text-slate-700">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // User is authenticated but not an admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // User is authenticated and is an admin
  return children;
};

export default ProtectedAdminRoute;