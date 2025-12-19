export const ERC20_ABI = [
    "function balanceOf(adress) view returns (unit256)",
    "function decimals() view return (uint8)",
    "function symbol() view returns (string)"
];

export const tokenList = [
    {
        symbol: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6,
        abi: ERC20_ABI
    },
    {
        symbol: "USDC",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        decimals: 6,
        abi: ERC20_ABI
    }
];