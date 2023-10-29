import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSession from '../context/session-context';
import { useDeauth } from '../utils/auth';
import withSession from '../components/session-guard';

function HomePage() {
    const deauth = useDeauth();
    const navigate = useNavigate();

    const navigateToBalance = () => {
        navigate('/balance');
    };

    const navigateToPut = () => {
        navigate('/put');
    };

    const navigateToWithdraw = () => {
        navigate('/withdraw');
    };

    const navigateToTransfer = () => {
        navigate('/transfer');
    };

    const navigateToPin = () => {
        navigate('/pin');
    };

    return (
        <div>
            <h1>Menu</h1>
            <button onClick={navigateToBalance}>Check Balance</button>
            <button onClick={navigateToPut}>Put Money</button>
            <button onClick={navigateToWithdraw}>Withdraw Money</button>
            <button onClick={navigateToTransfer}>Transfer Money</button>
            <button onClick={navigateToPin}>Change Pin</button>
            <button onClick={deauth}>Exit</button>
        </div>
    );
}

export default withSession(HomePage);
