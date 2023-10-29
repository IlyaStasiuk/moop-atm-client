import React from 'react';
import withSession from '../components/session-guard';

function PinPage() {
    return (
        <div>
            PinPage
        </div>
    );
}

export default withSession(PinPage);
