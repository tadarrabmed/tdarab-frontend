import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Loading from "../../pages/Loading/Loading";

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}