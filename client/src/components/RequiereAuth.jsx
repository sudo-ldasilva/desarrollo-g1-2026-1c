import { useAuth } from "../hooks/useAuth.jsx";
import { Navigate } from "react-router-dom";
import LoadingSplash from "./LoadingSplash/LoadingSplash.jsx";

const RequiereAuth = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSplash message="Conectando..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequiereAuth;
