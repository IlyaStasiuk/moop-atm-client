import { useState, useEffect } from "react";
import parseError from "../utils/requests/parse-error";
import useAccountManager from "../utils/requests/account-manager";
import { Badge } from "react-bootstrap";

interface BalanceHandle {
    balance: number | null
    refreshBalance: () => void;
}

interface CurrentBalanceProps {
    handle: BalanceHandle
}

export const CurrentBalance: React.FC<CurrentBalanceProps> = (props) => {
    const balanceValue = props.handle.balance ?? "...";
    return (
        // <p className="lead">Current balance: UAH {props.handle.balance ?? "..."}</p>
        <h3>
            Your balance: <Badge bg="success">UAH {balanceValue}</Badge>
        </h3>
    );
}

export function useCurrentBalance(onError?: (error: string) => void): BalanceHandle {
    const account = useAccountManager();
    const [balance, setBalance] = useState<number | null>(null);

    const fetchBalance = async () => {
        setBalance(null);
        try {
            const response = await account.getBalance();
            setBalance(response.balance);
        } catch (error) {
            if (onError) onError(parseError(error));
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return {
        balance: balance,
        refreshBalance: fetchBalance
    }
}