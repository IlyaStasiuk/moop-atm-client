import React, { useCallback, useEffect, useState } from 'react';
import withSession from '../components/session-guard';
import useAccountManager from '../utils/account-manager';
import parseError from '../utils/parse-error';
import { StatusMessage, useStatusMessage } from '../components/status-message';
import { CurrentBalance, useCurrentBalance } from '../components/balance';
import BackButton from '../components/back-button';

function WithdrawPage() {
    const [amount, setAmount] = useState<number>(0);
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);
    const accountManager = useAccountManager();

    const handleWithdraw = useCallback(async () => {
        try {
            if (isNaN(amount) || amount <= 0) {
                messageHandle.setError('Будь ласка, введіть валідне значення');
                return;
            }
            if (balanceHandle.balance == null || amount > balanceHandle.balance) {
                messageHandle.setError('Недостатньо коштів');
                return;
            }

            await accountManager.withdraw(amount);
            messageHandle.setSuccess('Гроші успішно знято');
            balanceHandle.refreshBalance();
        } catch (error) {
            messageHandle.setError(parseError(error));
        }
    }, [amount, balanceHandle, accountManager]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newAmount = parseFloat(event.target.value);
        if (!isNaN(newAmount) && newAmount >= 0) setAmount(newAmount);
    };

    return (
        <div>
            <h1>Withdraw</h1>
            <CurrentBalance handle={balanceHandle} />
            <StatusMessage handle={messageHandle} />
            <input type="number" value={amount} onChange={handleAmountChange} placeholder="UAH" />
            <button onClick={handleWithdraw}>Submit</button>
            <BackButton />
        </div>
    );
}

export default withSession(WithdrawPage);
