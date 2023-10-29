import React, { useCallback, useState } from 'react';
import withSession from '../components/session-guard';
import { useNavigate } from 'react-router-dom';
import { useStatusMessage, StatusMessage } from '../components/status-message';
import useAccountManager from '../utils/account-manager';
import parseError from '../utils/parse-error';
import BackButton from '../components/back-button';

function ChangePinPage() {
    const [newPin, setNewPin] = useState<string>('');
    const messageHandle = useStatusMessage();
    const accountManager = useAccountManager();

    const handleChangePin = useCallback(async () => {
        try {
            if (!newPin) {
                messageHandle.setError('Please enter a new PIN');
                return;
            }
            await accountManager.changePin(newPin);
            messageHandle.setSuccess('PIN successfully changed');
        } catch (error) {
            messageHandle.setError(parseError(error));
        }
    }, [newPin, accountManager, messageHandle]);

    return (
        <div>
            <h1>Change PIN</h1>
            <StatusMessage handle={messageHandle} />
            <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)} placeholder="New PIN" />
            <button onClick={handleChangePin}>Submit</button>
            <BackButton />
        </div>
    );
}

export default withSession(ChangePinPage);
