import React from 'react';
import withSession from '../components/session-guard';

function BalancePage() {
    return (
        <div>
            BalancePage
        </div>
    );
}

export default withSession(BalancePage);
