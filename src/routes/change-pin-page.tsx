import React, { useCallback, useState } from 'react';
import withSession from '../components/session-guard';
import { useStatusMessage, StatusMessage } from '../components/status-message';
import useAccountManager from '../utils/requests/account-manager';
import parseError from '../utils/requests/parse-error';
import BackButton from '../components/back-button';
import { Stack, Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import AtmPageContainer from '../components/atm-page-container';

function ChangePinPage() {
    const [newPin, setNewPin] = useState<string>('');
    const messageHandle = useStatusMessage();
    const accountManager = useAccountManager();

    const handleChangePin = useCallback(async () => {
        try {
            if (!newPin) {
                messageHandle.setError('Введіть новий PIN');
                return;
            }
            await accountManager.changePin(newPin);
            messageHandle.setSuccess('PIN успішно змінено');
        } catch (error) {
            messageHandle.setError(parseError(error));
        }
    }, [newPin, accountManager, messageHandle]);

    return (
        <AtmPageContainer navbar header="Change PIN">
            <StatusMessage handle={messageHandle} />
            <Stack gap={2} className="col-md-5 mx-auto">
                <Form>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="password"
                            value={newPin}
                            onChange={(e) => setNewPin(e.target.value)}
                            placeholder="New PIN"
                            aria-label="New PIN"
                        />
                    </InputGroup>
                </Form>
                <Button variant="primary" onClick={handleChangePin}>Submit</Button>
                <BackButton />
            </Stack>
        </AtmPageContainer>
    );
}

export default withSession(ChangePinPage);
