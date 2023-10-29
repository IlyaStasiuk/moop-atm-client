import React from 'react';
import withSession from '../components/session-guard';

function PutPage() {
    return (
        <div>
            PutPage
        </div>
    );
}

export default withSession(PutPage);
