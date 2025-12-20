import { useEffect, useState } from "react";
import { formatEther, type BrowserProvider } from "ethers";

export function useBalance(provider: BrowserProvider | null, address: string | null) {
    const [balance, setBalance] = useState<string>("0.0000");

    useEffect(() => {
        if (!provider || !address) {
            setBalance("0.0000");
            return;
        }

        let cancelled = false;

        async function fetchBalance() {
            try {
                const raw = await provider.getBalance(address);
                const f = parseFloat(formatEther(raw)).toFixed(4);
                if (!cancelled) setBalance(f);
            } catch (err) {
                console.error("fetchBalance err", err);
            }
        }

        fetchBalance();

        const id = setInterval(fetchBalance, 12000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    },[provider,address]);

    return balance;
}