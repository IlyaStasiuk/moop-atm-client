import React, { useCallback, useEffect, useState } from 'react';
import withSession from '../components/session-guard';
import { useNavigate } from 'react-router-dom';
import useAccountManager from '../utils/account-manager';
import parseError from '../utils/parse-error';
import { error } from 'console';
import { useCurrentBalance, CurrentBalance } from '../components/balance';
import { StatusMessage, useStatusMessage } from '../components/status-message';

function BalancePage() {
    const messageHandle = useStatusMessage();
    const balanceHandle = useCurrentBalance(messageHandle.setError);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>Balance</h1>
            <CurrentBalance handle={balanceHandle} />
            <StatusMessage handle={messageHandle} />
            <button onClick={handleBack}>Back</button>
            <button onClick={balanceHandle.refreshBalance}>Refresh</button>
        </div>
    );
}

export default withSession(BalancePage);
