import React from 'react';
import useSession from '../context/session-context';
import InvalidSessionPage from '../routes/invalid-session';

export const SessionGuard = ({ children }: React.PropsWithChildren) => {
    const { sessionKey } = useSession();
    if (sessionKey == null) return <InvalidSessionPage />;
    else return <>{children}</>;
}

export const withSession = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P) => {
        return <SessionGuard><Component {...props} /></SessionGuard>;
    };
};

export default withSession;
