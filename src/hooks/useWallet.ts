import { useEffect, useState, useCallback } from "react";
import { BrowserProvider as BP, BrowserProvider } from "ethers";

export function useWallet() {
    const [provider, setProvider] = useState<BP | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);

    const connectWallet = useCallback(async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask not found. Please install MetaMask.");
                return;
            }

            const p = new BrowserProvider(window.ethereum);
            const accounts = await p.send("eth_requestAccounts", []);
            const networkInfo = await p.getNetwork();
            setProvider(p);
            setAddress(accounts?.[0] ?? null);
            setNetwork(networkInfo?.name ?? null);
        } catch (err) {
            console.error("connectWallet err", err);
        }
    }, []);

    useEffect(() => {
        if (!window.ethereum) return;

        const handleAccounts = (accounts: string[]) => {
            setAddress(accounts?.[0] ?? null);
        };

        const handleChainChanged = () => {
            window.location.reload();
        }

        window.ethereum.on?.("accountsChanged", handleAccounts);
        window.ethereum.on?.("chainChanged", handleChainChanged);

        return () => {
            window.ethereum?.removeListener?.("accountChanged", handleAccounts);
            window.ethereum?.removeListener?.("chainChanged", handleChainChanged);
        };
    }, []);

    return { provider, address, network, connectWallet };
}