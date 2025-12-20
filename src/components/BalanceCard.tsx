import React from "react";

export const BalanceCards: React.FC<{ balance: string }> = ({ balance }) => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">ETH Balance</div>
            <div className="text-2xl font-bold">{balance} ETH</div>
        </div>
    );
};