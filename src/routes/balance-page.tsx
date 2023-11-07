import React from 'react';
import withSession from '../components/session-guard';
import { useCurrentBalance, CurrentBalance } from '../components/balance';
import { StatusMessage, useStatusMessage } from '../components/status-message';
import BackButton from '../components/back-button';
import { Button, Stack } from 'react-bootstrap';
import AtmPageContainer from '../components/atm-page-container';

function BalancePage() {
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);

    return (
        <AtmPageContainer navbar header="Balance">
            <StatusMessage handle={messageHandle} />
            <CurrentBalance handle={balanceHandle} />
            <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="primary" onClick={balanceHandle.refreshBalance}>Refresh</Button>
                <BackButton />
            </Stack>
        </AtmPageContainer>
    );
}

export default withSession(BalancePage);
