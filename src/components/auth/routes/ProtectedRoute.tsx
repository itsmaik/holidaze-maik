import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

type TProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: TProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to='/' state={{ from: location }} />;

  return <>{children}</>;
}
