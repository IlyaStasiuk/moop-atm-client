import React from 'react';
import useSession from '../context/session-context';
import InvalidSessionPage from '../routes/invalid-session';

const SessionGuard = ({ children }: React.PropsWithChildren) => {
    const { sessionKey } = useSession();
    if (sessionKey == null) return <InvalidSessionPage />;
    else return <>{children}</>;
}

export default SessionGuard;
