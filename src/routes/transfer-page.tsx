import React, { useCallback, useState } from 'react';
import { useCurrentBalance, CurrentBalance } from '../components/balance';
import { useStatusMessage, StatusMessage } from '../components/status-message';
import useAccountManager from '../utils/requests/account-manager';
import parseError from '../utils/requests/parse-error';
import withSession from '../components/session-guard';
import BackButton from '../components/back-button';
import { Stack, InputGroup, Button, FormControl, Form } from 'react-bootstrap';
import AtmPageContainer from '../components/atm-page-container';

function TransferPage() {
    const [amount, setAmount] = useState<number>(0);
    const [cardNumber, setCardNumber] = useState<string>('');
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);
    const accountManager = useAccountManager();

    const handleTransfer = useCallback(async () => {
        try {
            if (isNaN(amount) || amount <= 0) {
                messageHandle.setError('Будь ласка, введіть валідне значення');
                return;
            }
            if (!cardNumber) {
                messageHandle.setError('Будь ласка, введіть валідний номер рахунку');
                return;
            }
            if (balanceHandle.balance == null || amount > balanceHandle.balance) {
                messageHandle.setError('Недостатньо коштів');
                return;
            }

            await accountManager.transfer(cardNumber, amount);
            messageHandle.setSuccess('Гроші успішно надіслано');
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
        <AtmPageContainer navbar header="Transfer">
            <StatusMessage handle={messageHandle} />
            <CurrentBalance handle={balanceHandle} />
            <Stack gap={2} className="col-md-5 mx-auto">
                <Form>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="Card Number"
                            aria-label="Card Number"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>UAH</InputGroup.Text>
                        <FormControl
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount"
                            aria-label="Amount"
                        />
                    </InputGroup>
                </Form>
                <Button variant="primary" onClick={handleTransfer}>Submit</Button>
                <BackButton />
            </Stack>
        </AtmPageContainer >
    );
}

export default withSession(TransferPage);
