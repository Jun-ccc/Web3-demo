import { useEffect, useState } from "react";
import { formatEther, type BrowserProvider } from "ethers";

export function useBalance(provider: BrowserProvider | null, address: string | null) {
    const [balance, setBalance] = useState<string>("0.0000");

    useEffect(() => {
        if (!provider || !address) {
            setBalance("0.0000");
            return;
        }
    })
}