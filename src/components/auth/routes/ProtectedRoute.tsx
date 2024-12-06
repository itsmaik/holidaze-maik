import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

type TProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: TProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to='/' state={{ from: location }} />;

  return <>{children}</>;
}
