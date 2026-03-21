import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - path:", location.pathname, "user:", user?.email, "isLoading:", isLoading);

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center bg-background">Loading...</div>;
  }

  if (!user) {
    console.log("ProtectedRoute - redirecting to /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("ProtectedRoute - Access Granted");
  return <Outlet />;
};

export default ProtectedRoute;
