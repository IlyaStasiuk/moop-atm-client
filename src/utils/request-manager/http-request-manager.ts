import { AuthResponse, BalanceResponse, ErrorResponse } from "./request-manager";

const SERVER_URL = "http://localhost:5000/";
const DEFAULT_ERROR = 'An error occurred. Please try again later.';

class HTTPRequestManager {
    static async post<T>(url: string, body: object): Promise<T> {
        try {
            let response = await fetch(SERVER_URL + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                throw new Error(errorData.message || DEFAULT_ERROR);
            }

            return response.json() as Promise<T>;
        } catch (error) {
            throw new Error(DEFAULT_ERROR);
        }
    }

    static async auth(accountNumber: string, pin: string): Promise<AuthResponse> {
        return this.post<AuthResponse>('auth', {
            data: { accountNumber, pin },
        });
    }

    static async deauth(sessionKey: string): Promise<void> {
        return this.post<void>('deauth', { sessionKey });
    }

    static async getBalance(sessionKey: string): Promise<BalanceResponse> {
        return this.post<BalanceResponse>('balance', { sessionKey });
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

    static async put(sessionKey: string, amount: number): Promise<void> {
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

export default HTTPRequestManager;
