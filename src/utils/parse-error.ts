function parseError(error: any) {
    if (error instanceof Error) {
        return error.message;
    } else {
        return 'An unexpected error occurred. Please try again later.';
    }
}

export default parseError;