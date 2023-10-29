import React, { useCallback, useState } from 'react';
import withSession from '../components/session-guard';
import useAccountManager from '../utils/account-manager';
import { useNavigate } from 'react-router-dom';
import parseError from '../utils/parse-error';

function PutPage() {
    const [amount, setAmount] = useState<number>(0);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const accountManager = useAccountManager();

    const handlePut = useCallback(async () => {
        try {
            if (isNaN(amount) || amount <= 0) {
                setError('Please enter a valid amount');
                return;
            }
            await accountManager.put(amount);
            setMessage('Money successfully added');
            setError(null);
        } catch (error) {
            setError(parseError(error));
            setMessage(null);
        }
    }, [amount, accountManager]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newAmount = parseFloat(event.target.value);
        if (amount < 0) newAmount = NaN;
        setAmount(newAmount);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>PutPage</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="number" value={amount} onChange={handleAmountChange} placeholder="UAH" />
            <button onClick={handlePut}>Submit</button>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default withSession(PutPage);
