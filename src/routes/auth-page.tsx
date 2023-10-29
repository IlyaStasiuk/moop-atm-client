import React, { useState } from 'react';
import RequestManager from '../utils/request-manager';
import { useAuth } from '../utils/auth';

function AuthPage() {
    const [accountNumber, setAccountNumber] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            await auth(accountNumber, pin);
        } catch (error) {
            setError(RequestManager.parseError(error));
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>AuthPage</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Account Number:
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    PIN:
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    );
}

export default AuthPage;
