import { createContext, useContext, useRef, useCallback, useMemo } from "react";
import { useLogto } from "@logto/react";

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

    const signOut = useCallback(async (redirectUri) => {
        loggingOutRef.current = true;
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

    const contextValue = useMemo(() => ({
        isAuthenticated,
        isLoading,
        signIn,
        getIdTokenClaims,
        signOut,
        getAccessToken,
    }), [isAuthenticated, isLoading, signIn, getIdTokenClaims, signOut, getAccessToken]);

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
