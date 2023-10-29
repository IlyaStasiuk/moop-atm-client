import React, { useCallback, useEffect, useState } from 'react';
import withSession from '../components/session-guard';
import { useNavigate } from 'react-router-dom';
import useAccountManager from '../utils/account-manager';
import parseError from '../utils/parse-error';
import { StatusMessage, useStatusMessage } from '../components/status-message';
import { CurrentBalance, useCurrentBalance } from '../components/balance';

function WithdrawPage() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState<number>(0);
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);
    const accountManager = useAccountManager();

    const handleWithdraw = useCallback(async () => {
        try {
            if (isNaN(amount) || amount <= 0) {
                messageHandle.setError('Please enter a valid amount');
                return;
            }
            if (balanceHandle.balance == null || amount > balanceHandle.balance) {
                messageHandle.setError('Insufficient balance');
                return;
            }

            await accountManager.withdraw(amount);
            messageHandle.setSuccess('Money successfully withdrawn');
            balanceHandle.refreshBalance();
        } catch (error) {
            messageHandle.setError(parseError(error));
        }
    }, [amount, balanceHandle, accountManager]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newAmount = parseFloat(event.target.value);
        if (!isNaN(newAmount) && newAmount >= 0) setAmount(newAmount);
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>Withdraw</h1>
            <CurrentBalance handle={balanceHandle} />
            <StatusMessage handle={messageHandle} />
            <input type="number" value={amount} onChange={handleAmountChange} placeholder="UAH" />
            <button onClick={handleWithdraw}>Submit</button>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default withSession(WithdrawPage);
