import React from "react";
import { shortAddress } from "../utils/formats";

export const WalletInfo: React.FC<{ address?: string | null; network?: string | null }> = ({
    address,
    network
}) => {
    return (
        <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Network</div>
            <div className="font-mono">{network ?? "-"}</div>

            <div className="mt-3 text-sm text-gray-500">Address</div>
            <div className="font-mono">{shortAddress(address)}</div>
        </div>
    );
};