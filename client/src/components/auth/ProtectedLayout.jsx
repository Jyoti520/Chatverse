import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function ProtectedLayout({ children }) {
  const { loggeduser } = useAuth();
  if (!loggeduser) return <Navigate to="/" replace />;
  return children;
}

export default ProtectedLayout;
