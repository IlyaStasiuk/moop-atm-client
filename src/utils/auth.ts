import useSession from "../context/session-context";
import RequestManager from "./request-manager";
import { useNavigate } from 'react-router-dom';

export function useAuth() {
    const { setSessionKey } = useSession();
    const navigate = useNavigate();

    return async (accountNumber: string, pin: string) => {
        const response = await RequestManager.auth(accountNumber, pin);
        setSessionKey(response.sessionKey);
        navigate('/home');
    }
}

export function useDeauth() {
    const { sessionKey, setSessionKey } = useSession();
    const navigate = useNavigate();

    return async () => {
        if (sessionKey != null) {
            await RequestManager.deauth(sessionKey);
            setSessionKey(null);
        }

        navigate('/');
    }
}