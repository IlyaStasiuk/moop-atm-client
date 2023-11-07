import React, { useCallback, useState } from 'react';
import withSession from '../components/session-guard';
import useAccountManager from '../utils/requests/account-manager';
import parseError from '../utils/requests/parse-error';
import { StatusMessage, useStatusMessage } from '../components/status-message';
import { CurrentBalance, useCurrentBalance } from '../components/balance';
import BackButton from '../components/back-button';
import AtmPageContainer from '../components/atm-page-container';
import { Button, Form, InputGroup, Stack } from 'react-bootstrap';

function PutPage() {
    const [amount, setAmount] = useState<number>(0);
    const accountManager = useAccountManager();
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);

    const handlePut = useCallback(async () => {
        try {
            if (isNaN(amount) || amount <= 0) {
                messageHandle.setError('Будь ласка, введіть валідне значення');
                return;
            }
            await accountManager.put(amount);
            messageHandle.setSuccess('Гроші успішно покладено');
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
        <AtmPageContainer navbar header="Deposit">
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
                    </InputGroup>
                </Form>
                <Button variant="primary" onClick={handlePut}>Submit</Button>
                <BackButton />
            </Stack>
        </AtmPageContainer >
    );
}

export default withSession(PutPage);
