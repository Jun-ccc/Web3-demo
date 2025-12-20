import React from "react";
import type { TokenInfo } from "../hooks/useTokens";

export const TokenList: React.FC<{ tokens: TokenInfo[]; loading: boolean }> = ({ tokens, loading }) => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500 mb-2">Tokens</div>

            {loading && <div className="text-sm text-gray-400">Loading tokens...</div>}

            {!loading && tokens.length === 0 && <div className="text-sm text-gray-400">No tokens Found</div>}

            <ul>
                {tokens.map((t) => (
                    <li key={t.address} className="flex justify-between py-2 border-b last:border-b-0">
                        <div>
                            <div className="font-medium">{t.symbol}</div>
                            <div className="text-xs text-gray-500">{t.address}</div>
                        </div>
                        <div className="font-mono">{t.balance.toFixed(4)}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};