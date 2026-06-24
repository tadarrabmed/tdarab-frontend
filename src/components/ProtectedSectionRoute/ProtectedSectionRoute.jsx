import { Navigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
export default function ProtectedSectionRoute({ children }) {
  const { user, loading } = useAuth();
  const { id } = useParams();

  if (loading) return null;
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}



 