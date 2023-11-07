import sleep from "../../sleep";
import { AuthResponse, BalanceResponse } from "./request-manager";

let TEST = {
    number: "1234",
    pin: "1234",
    balance: 1000,
}

class TestRequestManager {
    static async auth(accountNumber: string, pin: string): Promise<AuthResponse> {
        await sleep(1);
        if (TEST.number == accountNumber && TEST.pin == pin) return { sessionKey: "1" };
        throw new Error("Invalid credentials");
    }

    static async deauth(sessionKey: string): Promise<void> {
        await sleep(1);
    }

    static async getBalance(sessionKey: string): Promise<BalanceResponse> {
        await sleep(1);
        return { balance: TEST.balance };
    }

    static async transfer(sessionKey: string, to: string, amount: number): Promise<void> {
        await sleep(1);
        if (to.length > 4) throw new Error('Account does not exist');
        TEST.balance -= amount;
    }

    static async withdraw(sessionKey: string, amount: number): Promise<void> {
        await sleep(1);
        TEST.balance -= amount;
    }

    static async put(sessionKey: string, amount: number): Promise<void> {
        await sleep(1);
        TEST.balance += amount;
    }

    static async changePin(sessionKey: string, pin: string): Promise<void> {
        await sleep(1);
        TEST.pin = pin;
    }
}

export default TestRequestManager;
