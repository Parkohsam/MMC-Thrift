import { Navigate } from "react-router-dom";
import { isSignedUp } from "../Hooks/Authen";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isSignedUp()) {
    return <Navigate to="/signup" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;