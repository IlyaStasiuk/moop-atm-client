import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AtmPageContainer from '../components/atm-page-container';

function IndexPage() {
    const navigate = useNavigate();

    return (
        <AtmPageContainer header="Welcome to ATM">
            <Button variant="primary" size="lg" onClick={() => navigate('/auth')}>Start</Button>
        </AtmPageContainer>
    );
}

export default IndexPage;
