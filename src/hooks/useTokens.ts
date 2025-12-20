import { useEffect, useState } from "react";
import { Contract, formatUnits, type BrowserProvider } from "ethers";
import { tokenList } from "../utils/token";

export type TokenInfo = {
    symbol: string;
    address: string;
    decimals: number;
    balance: number;
};

export function useTokens(provider: BrowserProvider | null, address: string | null) {
    const [tokens, setTokens] = useState<TokenInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!provider || !address) {
            setTokens([]);
            return;
        }

        let cancelled = false;

        async function load() {
            setLoading(true);
            try {
                const results: TokenInfo[] = [];
                for (const t of tokenList) {
                    try {
                        const contract = new Contract(t.address, t.abi, provider);
                        const raw = await contract.balanceOf(address);
                        const decimals = t.decimals ?? (await contract.decimals());
                        const balance = parseFloat(formatUnits(raw, decimals));
                        results.push({ symbol: t.symbol, address: t.address, decimals, balance});
                    }catch (innerErr) {
                        console.warn(`token fetch failed for ${t.symbol}`,innerErr);
                        results.push({symbol: t.symbol, address: t.address, decimals: t.decimals, balance: 0});
                    }
                }
                if (!cancelled) setTokens(results);
            } catch (err) {
                console.error("load tokens err", err);
                if (!cancelled) setTokens([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();

        const id = setInterval(load, 30000);

        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [provider, address]);

    return { tokens, loading };
}