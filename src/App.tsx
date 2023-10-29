import React from 'react';
import './App.css';
import HomePage from './routes/home-page';
import { Routes, Route } from 'react-router-dom';
import BalancePage from './routes/balance-page';
import PutPage from './routes/put-page';
import WithdrawPage from './routes/withdraw-page';
import TransferPage from './routes/transfer-page';
import PinPage from './routes/pin-page';
import AuthPage from './routes/auth-page';
import IndexPage from './routes/index-page';
import SessionGuard from './components/session-guard';

const SG = SessionGuard;

function App() {
    return (
        <Routes>
            <Route index element={<IndexPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={<SG> <HomePage /> </SG>} />
            <Route path="/balance" element={<SG> <BalancePage /> </SG>} />
            <Route path="/put" element={<SG> <PutPage /> </SG>} />
            <Route path="/withdraw" element={<SG> <WithdrawPage /> </SG>} />
            <Route path="/transfer" element={<SG> <TransferPage /> </SG>} />
            <Route path="/pin" element={<SG> <PinPage /> </SG>} />
        </Routes>

    );
}

export default App;
