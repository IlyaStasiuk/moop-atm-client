import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { StatusMessage, useStatusMessage } from '../components/status-message';

function InvalidSessionPage() {
    const navigate = useNavigate();
    const messageHandle = useStatusMessage();

    useEffect(() => {
        messageHandle.setError("User session has expired. Please log in again.");
    }, []);

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
            <StatusMessage handle={messageHandle} />
            <Button variant="primary" onClick={() => navigate('/')}>OK</Button>
        </Container>
    );
}

export default InvalidSessionPage;
