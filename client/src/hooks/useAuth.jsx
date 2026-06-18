import { createContext, useContext, useRef, useCallback, useMemo, useState, useEffect } from "react";
import { useLogto } from "@logto/react";
import { getMe } from "../services/PerfilService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const { 
        signOut: logtoSignOut, 
        getAccessToken: logtoGetAccessToken, 
        getIdTokenClaims: logtoGetIdTokenClaims, 
        isAuthenticated, 
        isLoading, 
        signIn 
    } = useLogto();
    const loggingOutRef = useRef(false);
    const [userRole, setUserRole] = useState(null);
    const [rolesLoaded, setRolesLoaded] = useState(false);
    const roleInitializedRef = useRef(false);

    const signOut = useCallback(async (redirectUri) => {
        loggingOutRef.current = true;
        setUserRole(null);
        setRolesLoaded(false);
        roleInitializedRef.current = false;
        await logtoSignOut(redirectUri);
        loggingOutRef.current = false;
    }, [logtoSignOut]);

    const getAccessToken = useCallback(async (resource) => {
        if (loggingOutRef.current) return null;
        try {
            return await logtoGetAccessToken(resource);
        } catch {
            return null;
        }
    }, [logtoGetAccessToken]);

    const getIdTokenClaims = useCallback(async () => {
        if (loggingOutRef.current) return null;
        try {
            return await logtoGetIdTokenClaims();
        } catch {
            return null;
        }
    }, [logtoGetIdTokenClaims]);

    const updateUserRole = useCallback((role) => {
        setUserRole(role);
        roleInitializedRef.current = true;
        setRolesLoaded(true);
    }, []);

    const hasRole = useCallback((role) => {
        return userRole === role;
    }, [userRole]);

    const userRoles = useMemo(() => {
        return userRole ? [userRole] : [];
    }, [userRole]);

    useEffect(() => {
        if (!isAuthenticated || loggingOutRef.current || roleInitializedRef.current) return;
        roleInitializedRef.current = true;
        (async () => {
            try {
                const resource = process.env.REACT_APP_LOGTO_RESOURCES;
                const token = await logtoGetAccessToken(resource);
                if (!token) return;
                const me = await getMe(token);
                setUserRole(me.rol);
            } catch {
                setUserRole(null);
            } finally {
                setRolesLoaded(true);
            }
        })();
    }, [isAuthenticated, logtoGetAccessToken]);

    const contextValue = useMemo(() => ({
        isAuthenticated,
        isLoading,
        signIn,
        getIdTokenClaims,
        signOut,
        getAccessToken,
        userRole,
        userRoles,
        rolesLoaded,
        hasRole,
        updateUserRole,
    }), [isAuthenticated, isLoading, signIn, getIdTokenClaims, signOut, getAccessToken, userRole, userRoles, rolesLoaded, hasRole, updateUserRole]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider (which must be inside LogtoProvider)");
    return ctx;
};
