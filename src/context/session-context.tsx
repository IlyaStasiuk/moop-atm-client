import { ReactNode, createContext, useContext, useState } from "react";

interface SessionData {
    sessionKey: string | null,
    setSessionKey: (key: string | null) => void,
};

const SessionContext = createContext({
    sessionKey: null,
    setSessionKey: (key) => { }
} as SessionData);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [sessionKey, setSessionKey] = useState<null | string>(null);
    const value: SessionData = { sessionKey, setSessionKey };
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export default function useSession(): SessionData {
    return useContext(SessionContext);
}
