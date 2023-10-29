import React, { useCallback, useState } from 'react';
import { useCurrentBalance, CurrentBalance } from '../components/balance';
import { useStatusMessage, StatusMessage } from '../components/status-message';
import useAccountManager from '../utils/account-manager';
import parseError from '../utils/parse-error';
import withSession from '../components/session-guard';
import BackButton from '../components/back-button';

function TransferPage() {
    const [amount, setAmount] = useState<number>(0);
    const [cardNumber, setCardNumber] = useState<string>('');
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);
    const accountManager = useAccountManager();

    const handleTransfer = useCallback(async () => {
        try {
            if (isNaN(amount) || amount <= 0) {
                messageHandle.setError('Please enter a valid amount');
                return;
            }
            if (!cardNumber) {
                messageHandle.setError('Please enter a card number');
                return;
            }
            if (balanceHandle.balance == null || amount > balanceHandle.balance) {
                messageHandle.setError('Insufficient balance');
                return;
            }

            await accountManager.transfer(cardNumber, amount);
            messageHandle.setSuccess('Money successfully transferred');
            balanceHandle.refreshBalance();
        } catch (error) {
            messageHandle.setError(parseError(error));
        }
    }, [amount, cardNumber, balanceHandle, accountManager]);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = parseFloat(event.target.value);
        if (!isNaN(newAmount) && newAmount >= 0) setAmount(newAmount);
    };

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(event.target.value);
    };

    return (
        <div>
            <h1>Transfer</h1>
            <CurrentBalance handle={balanceHandle} />
            <StatusMessage handle={messageHandle} />
            <input type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="Card Number" />
            <input type="number" value={amount} onChange={handleAmountChange} placeholder="UAH" />
            <button onClick={handleTransfer}>Submit</button>
            <BackButton />
        </div>
    );
}

export default withSession(TransferPage);
