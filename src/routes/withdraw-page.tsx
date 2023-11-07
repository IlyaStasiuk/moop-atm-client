import React, { useCallback, useEffect, useState } from 'react';
import withSession from '../components/session-guard';
import useAccountManager from '../utils/requests/account-manager';
import parseError from '../utils/requests/parse-error';
import { StatusMessage, useStatusMessage } from '../components/status-message';
import { CurrentBalance, useCurrentBalance } from '../components/balance';
import BackButton from '../components/back-button';
import { Stack, InputGroup, Button, Form } from 'react-bootstrap';
import AtmPageContainer from '../components/atm-page-container';

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
        <AtmPageContainer navbar header="Withdraw">
            <StatusMessage handle={messageHandle} />
            <CurrentBalance handle={balanceHandle} />
            <Stack gap={2} className="col-md-5 mx-auto">
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>UAH</InputGroup.Text>
                        <Form.Control
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="Enter amount"
                        />
                        <Button variant="primary" onClick={handleWithdraw}>Submit</Button>
                    </InputGroup>
                </Form>
                <BackButton />
            </Stack>
        </AtmPageContainer >
    );
}

export default withSession(WithdrawPage);
