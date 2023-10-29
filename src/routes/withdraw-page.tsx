import React from 'react';
import withSession from '../components/session-guard';

function WithdrawPage() {
    return (
        <div>
            WithdrawPage
        </div>
    );
}

export default withSession(WithdrawPage);
