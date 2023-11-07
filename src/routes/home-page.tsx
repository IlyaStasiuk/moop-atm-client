import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeauth } from '../utils/requests/auth';
import withSession from '../components/session-guard';

import { Button, Stack } from 'react-bootstrap';
import AtmPageContainer from '../components/atm-page-container';

function HomePage() {
    const deauth = useDeauth();
    const navigate = useNavigate();

    return (
        < AtmPageContainer navbar header="Menu" >
            <Stack gap={2} className="col-md-5 mx-auto">
                <Button variant="primary" onClick={() => navigate('/balance')} >
                    Check Balance
                </Button>
                <Button variant="primary" onClick={() => navigate('/put')} >
                    Deposit Money
                </Button>
                <Button variant="primary" onClick={() => navigate('/withdraw')} >
                    Withdraw Money
                </Button>
                <Button variant="primary" onClick={() => navigate('/transfer')} >
                    Transfer Money
                </Button>
                <Button variant="primary" onClick={() => navigate('/pin')} >
                    Change Pin
                </Button>
                <Button variant="secondary" onClick={deauth} >
                    Log Out
                </Button>
            </Stack>
        </AtmPageContainer>
    );
}

export default withSession(HomePage);
