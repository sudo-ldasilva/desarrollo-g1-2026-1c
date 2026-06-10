import { useLogto } from "@logto/react";
import { Navigate } from "react-router-dom";
import LoadingSplash from "./LoadingSplash";

const RequiereAuth = ({ children }) => {
    const { isAuthenticated, isLoading } = useLogto();

    console.log("requiere auth")

    if (isLoading) {
        return <LoadingSplash message="Conectando..." />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RequiereAuth;