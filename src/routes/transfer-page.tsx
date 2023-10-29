import React from 'react';
import withSession from '../components/session-guard';

function TransferPage() {
    return (
        <div>
            TransferPage
        </div>
    );
}

export default withSession(TransferPage);
