import React from 'react';
import { useNavigate } from 'react-router-dom';

function IndexPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={() => navigate('/auth')}>Start</button>
        </div>
    );
}

export default IndexPage;
