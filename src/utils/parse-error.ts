import { ValidationError } from "./request-manager/http-request-manager";

function parseError(error: any) {
    if (error instanceof ValidationError) {
        return error.message;
    } else {
        return `An unexpected error occurred. Please try again later.\n${error}`;
    }
}

export default parseError;