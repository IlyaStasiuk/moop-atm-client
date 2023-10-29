import React, { useEffect, useState } from 'react';
import withSession from '../components/session-guard';
import { useNavigate } from 'react-router-dom';
import useAccountManager from '../utils/account-manager';
import parseError from '../utils/parse-error';

function BalancePage() {
    const account = useAccountManager();
    const [balance, setBalance] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchBalance = async () => {
        setBalance(null);
        try {
            const response = await account.getBalance();
            setBalance(response.balance);
        } catch (error) {
            setError(parseError(error));
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>Balance</h1>
            <p>Your current balance is: UAH {balance ?? "..."}</p>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <button onClick={handleBack}>Back</button>
            <button onClick={fetchBalance}>Refresh</button>
        </div>
    );
}

export default withSession(BalancePage);
