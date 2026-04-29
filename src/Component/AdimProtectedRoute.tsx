import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAdmin = localStorage.getItem("mmc_admin") === "true";
    if (!isAdmin) 
        return <Navigate to="/admin" replace />;
    return <>{children}</>;
};

export default AdminProtectedRoute;