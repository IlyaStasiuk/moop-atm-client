import { useState, useEffect } from "react";
import parseError from "../utils/parse-error";
import useAccountManager from "../utils/account-manager";

interface BalanceHandle {
    balance: number | null
    refreshBalance: () => void;
}

interface CurrentBalanceProps {
    handle: BalanceHandle
}

export const CurrentBalance: React.FC<CurrentBalanceProps> = (props) => {
    return (
        < p >
            Current balance: UAH {props.handle.balance ?? "..."}
        </p >
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