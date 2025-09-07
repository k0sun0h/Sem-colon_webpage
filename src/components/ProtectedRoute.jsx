import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth.jsx";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // 로그인 후 돌아올 경로를 state에 담아 보냄
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
