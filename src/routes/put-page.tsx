import React, { useCallback, useState } from 'react';
import withSession from '../components/session-guard';
import useAccountManager from '../utils/account-manager';
import { useNavigate } from 'react-router-dom';
import parseError from '../utils/parse-error';
import { StatusMessage, useStatusMessage } from '../components/status-message';
import { CurrentBalance, useCurrentBalance } from '../components/balance';

function PutPage() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<number>(0);
    const accountManager = useAccountManager();
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);

    const handlePut = useCallback(async () => {
        try {
            if (isNaN(amount) || amount <= 0) {
                messageHandle.setError('Please enter a valid amount');
                return;
            }
            await accountManager.put(amount);
            messageHandle.setSuccess('Money successfully added');
            balanceHandle.refreshBalance();
        } catch (error) {
            messageHandle.setError(parseError(error));
        }
    }, [amount, accountManager]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newAmount = parseFloat(event.target.value);
        if (!isNaN(newAmount) && newAmount >= 0) setAmount(newAmount);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>PutPage</h1>
            <CurrentBalance handle={balanceHandle} />
            <StatusMessage handle={messageHandle} />
            <input type="number" value={amount} onChange={handleAmountChange} placeholder="UAH" />
            <button onClick={handlePut}>Submit</button>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default withSession(PutPage);
