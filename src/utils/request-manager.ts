import sleep from "./sleep";

export interface AuthResponse {
    sessionKey: string;
}

export interface ErrorResponse {
    message: string;
}

export interface BalanceResponse {
    balance: number;
}

const SERVER_URL = "http://localhost:5000/";

class RequestManager {
    static async post<T>(url: string, body: object): Promise<T> {
        const response = await fetch(SERVER_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }
        return response.json() as Promise<T>;
    }

    static async auth(accountNumber: string, pin: string): Promise<AuthResponse> {
        // return this.post<AuthResponse>('auth', {
        //     data: { accountNumber, pin },
        // });

        await sleep(1);
        return { sessionKey: "1" };
    }

    static async deauth(sessionKey: string): Promise<void> {
        // return this.post<void>('deauth', { sessionKey });

        await sleep(1);
    }

    static async getBalance(sessionKey: string): Promise<BalanceResponse> {
        // return this.post<BalanceResponse>('balance', { sessionKey });

        await sleep(1);
        return { balance: 100123 };
    }

    static async transfer(sessionKey: string, to: string, amount: number): Promise<void> {
        return this.post<void>('operation/transfer', {
            sessionKey,
            data: { to, amount },
        });
    }

    static async withdraw(sessionKey: string, amount: number): Promise<void> {
        return this.post<void>('operation/withdraw', {
            sessionKey,
            data: { amount },
        });
    }

    static async deposit(sessionKey: string, amount: number): Promise<void> {
        return this.post<void>('operation/put', {
            sessionKey,
            data: { amount },
        });
    }

    static async changePin(sessionKey: string, pin: string): Promise<void> {
        return this.post<void>('change-pin', {
            sessionKey,
            data: { pin },
        });
    }
}

export default RequestManager;
