import { useAuth } from "../hooks/useAuth.jsx";

const RequireRole = ({ roles, fallback, children }) => {
    const { userRole } = useAuth();

    const hasAccess = roles.includes(userRole);

    if (!hasAccess) {
        return fallback || (
            <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
                <h2>Acceso denegado</h2>
                <p>No tenés permisos para ver esta sección.</p>
            </div>
        );
    }

    return children;
};

export default RequireRole;
