import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      alert("Vui lòng đăng nhập để xem chi tiết trang này!");
    }
  }, [isAuthenticated, isLoading]);
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" />;

  return children;
}
