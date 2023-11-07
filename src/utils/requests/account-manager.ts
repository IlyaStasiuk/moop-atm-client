import useSession from "../../context/session-context";
import RequestManager, { BalanceResponse } from "./request-manager/request-manager";

class AccountManager {
    private sessionKey: string;

    constructor(sessionKey: string) {
        this.sessionKey = sessionKey;
    }

    async getBalance(): Promise<BalanceResponse> {
        return RequestManager.getBalance(this.sessionKey);
    }

    async transfer(to: string, amount: number): Promise<void> {
        return RequestManager.transfer(this.sessionKey, to, amount);
    }

    async withdraw(amount: number): Promise<void> {
        return RequestManager.withdraw(this.sessionKey, amount);
    }

    async put(amount: number): Promise<void> {
        return RequestManager.put(this.sessionKey, amount);
    }

    async changePin(pin: string): Promise<void> {
        return RequestManager.changePin(this.sessionKey, pin);
    }
}

function useAccountManager(): AccountManager {
    const { sessionKey } = useSession();

    if (!sessionKey) {
        throw new Error('Session key is not available');
    }

    return new AccountManager(sessionKey);
}

export default useAccountManager;
