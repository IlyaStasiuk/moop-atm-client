import React, { useCallback, useState } from 'react';
import withSession from '../components/session-guard';
import useAccountManager from '../utils/account-manager';
import parseError from '../utils/parse-error';
import { StatusMessage, useStatusMessage } from '../components/status-message';
import { CurrentBalance, useCurrentBalance } from '../components/balance';
import BackButton from '../components/back-button';

function PutPage() {
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

    return (
        <div>
            <h1>PutPage</h1>
            <CurrentBalance handle={balanceHandle} />
            <StatusMessage handle={messageHandle} />
            <input type="number" value={amount} onChange={handleAmountChange} placeholder="UAH" />
            <button onClick={handlePut}>Submit</button>
            <BackButton />
        </div>
    );
}

export default withSession(PutPage);
