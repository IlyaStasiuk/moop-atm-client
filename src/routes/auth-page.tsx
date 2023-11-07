import React, { useState } from 'react';
import { useAuth } from '../utils/requests/auth';
import parseError from '../utils/requests/parse-error';
import { Button, Container, Form, FormControl, FormGroup, FormLabel, InputGroup, Stack } from 'react-bootstrap';
import AtmPageContainer from '../components/atm-page-container';
import { StatusMessage, useStatusMessage } from '../components/status-message';

function AuthPage() {
    const [accountNumber, setAccountNumber] = useState('');
    const [pin, setPin] = useState('');
    const messageHandle = useStatusMessage();
    const [loading, setLoading] = useState(false);
    const auth = useAuth();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        messageHandle.clearMessage();

        try {
            await auth(accountNumber, pin);
        } catch (error) {
            messageHandle.setError(parseError(error));
        } finally {
            setLoading(false);
        }
    }

    return (
        <AtmPageContainer header="Log In">
            <StatusMessage handle={messageHandle} />
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Account Number</InputGroup.Text>
                    <FormControl
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>PIN</InputGroup.Text>
                    <FormControl
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        required
                    />
                </InputGroup>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</Button>
                </Stack>
            </Form>
        </AtmPageContainer>
    );
}

export default AuthPage;
