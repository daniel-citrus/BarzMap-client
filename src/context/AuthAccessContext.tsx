import { createContext, ReactNode, useEffect, useMemo } from "react";
import { AuthenticatedUserDetails } from "../types/authentication";
import useAuthentication from "../hooks/useAuthentication";

const AuthAccessContext = createContext<AuthenticatedUserDetails | null>(null);

const AuthAccessProvider = ({ children }: { children: ReactNode }) => {
    const { barzUser } = useAuthentication();
    const value = useMemo<AuthenticatedUserDetails | null>(
        () => barzUser,
        [barzUser]
    )

    useEffect(() => {
    }, [barzUser])

    return <AuthAccessContext.Provider value={value}>
        {children}
    </AuthAccessContext.Provider>
}

export default AuthAccessProvider;