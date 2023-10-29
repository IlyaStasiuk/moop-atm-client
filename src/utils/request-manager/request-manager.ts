import HTTPRequestManager from "./http-request-manager";
import TestRequestManager from "./test-request-manager";

export interface AuthResponse {
    sessionKey: string;
}

export interface ErrorResponse {
    message: string;
}

export interface BalanceResponse {
    balance: number;
}

// class RequestManager extends HTTPRequestManager {}
class RequestManager extends TestRequestManager { }

export default RequestManager;
