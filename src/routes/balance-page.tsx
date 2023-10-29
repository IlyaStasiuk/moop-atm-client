import React from 'react';
import withSession from '../components/session-guard';
import { useCurrentBalance, CurrentBalance } from '../components/balance';
import { StatusMessage, useStatusMessage } from '../components/status-message';
import BackButton from '../components/back-button';

function BalancePage() {
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);

    return (
        <div>
            <h1>Balance</h1>
            <CurrentBalance handle={balanceHandle} />
            <StatusMessage handle={messageHandle} />
            <button onClick={balanceHandle.refreshBalance}>Refresh</button>
            <BackButton />
        </div>
    );
}

export default withSession(BalancePage);
