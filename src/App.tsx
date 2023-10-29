import HomePage from './routes/home-page';
import { Routes, Route } from 'react-router-dom';
import BalancePage from './routes/balance-page';
import PutPage from './routes/put-page';
import WithdrawPage from './routes/withdraw-page';
import TransferPage from './routes/transfer-page';
import ChangePinPage from './routes/change-pin-page';
import AuthPage from './routes/auth-page';
import IndexPage from './routes/index-page';

function App() {
    return (
        <Routes>
            <Route index element={<IndexPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/balance" element={<BalancePage />} />
            <Route path="/put" element={<PutPage />} />
            <Route path="/withdraw" element={<WithdrawPage />} />
            <Route path="/transfer" element={<TransferPage />} />
            <Route path="/pin" element={<ChangePinPage />} />
        </Routes>

    );
}

export default App;
