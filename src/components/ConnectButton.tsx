import React from "react";

type Props = { connect: () => void; address?: string | null };

export const ConnectButton: React.FC<Props> = ({ connect, address }) => {
    if (address) {
        return (
                <button className="px-4 py-2 rounded bg-gray-800 text-white" disabled>
                    Connected
                </button>
        );
    }

    return (
            <button
                onClick={connect}
                className="px-4 py-2 rounded bg-black text-white hover:opacity-90 transition"
            >
                Connect Wallet
            </button>
    );
};