import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const ProtectedAdminRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100 text-slate-700">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 font-medium">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/signin" replace />;
  }

  if (admin.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;