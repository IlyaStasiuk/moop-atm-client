import React from 'react';
import { useNavigate } from 'react-router-dom';

function InvalidSessionPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Invalid User Session</h1>
            <button onClick={() => navigate('/')}>OK</button>
        </div>
    );
}

export default InvalidSessionPage;
