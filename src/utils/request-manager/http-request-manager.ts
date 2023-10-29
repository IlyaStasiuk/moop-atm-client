import { AuthResponse, BalanceResponse, ErrorResponse } from "./request-manager";

const SERVER_URL = "http://localhost:3000/";
const DEFAULT_ERROR = 'An error occurred. Please try again later.';
const ATM_ID = "284c0a73-768e-11ee-96ad-0242ac120003"

export class ValidationError extends Error { }

class HTTPRequestManager {
    static async fetchRequest(url: string, body: object) {
        return await fetch(SERVER_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }

    static async postGet<T>(url: string, body: object): Promise<T> {
        let response = await this.fetchRequest(url, body);
        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new ValidationError(errorData.message || DEFAULT_ERROR);
        }
        return response.json() as Promise<T>;
    }

    static async post(url: string, body: object) {
        let response = await this.fetchRequest(url, body);
        if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new ValidationError(errorData.message || DEFAULT_ERROR);
        }
    }

    static async auth(accountNumber: string, pin: string): Promise<AuthResponse> {
        return this.postGet<AuthResponse>('auth', {
            idATM: ATM_ID,
            accountNumber,
            pin,
        });
    }

    static async deauth(sessionKey: string) {
        return this.post('deauth', { sessionKey });
    }

    static async getBalance(sessionKey: string): Promise<BalanceResponse> {
        return this.postGet<BalanceResponse>('balance', { sessionKey });
    }

    static async transfer(sessionKey: string, to: string, amount: number) {
        return this.post('operation/transfer', {
            sessionKey,
            to,
            amount,
        });
    }

    static async withdraw(sessionKey: string, amount: number) {
        return this.post('operation/withdraw', {
            sessionKey,
            amount,
        });
    }

    static async put(sessionKey: string, amount: number) {
        return this.post('operation/put', {
            sessionKey,
            amount,
        });
    }

    static async changePin(sessionKey: string, pin: string) {
        return this.post('change-pin', {
            sessionKey,
            pin,
        });
    }
}

export default HTTPRequestManager;
