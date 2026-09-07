export const NetworkConfig = {
  networkName: "WylerChain L3",
  chainIdDecimal: 421614, // Arbitrum Sepolia mask
  chainIdHex: "0x66eee",  // Arbitrum Sepolia hex mask
  rpcUrl: "https://sepolia-rollup.arbitrum.io/rpc", // Live working RPC
  explorerUrl: "https://sepolia.arbiscan.io",
  nativeCurrencyName: "Wyler",
  nativeCurrencySymbol: "WYLR",
  nativeCurrencyDecimals: 18,
  isLive: true,
  isPlaceholder: false,
  statusLabel: "Live Replica",
  mdtAddress: "0x34f9a76d8b92b3a9c4f0d...e123", // Placeholder for MDT contract
};

export const ProtocolRegistry = {
  factory: "0x0000000000000000000000000000000000000000",
  positionManager: "0x0000000000000000000000000000000000000000",
  router: "0x0000000000000000000000000000000000000000",
  quoter: "0x0000000000000000000000000000000000000000",
  tickLens: "0x0000000000000000000000000000000000000000",
  flagshipPool: "0x0000000000000000000000000000000000000000",
};

export const AnalyticsConfig = {
  subgraphUrl: "https://indexer.wylerchain.dev/subgraphs/name/wyler-clmm-testnet",
};



export const NetworkRoadmap = [
  { task: "Network details finalized", status: "completed" },
  { task: "Placeholder config added", status: "completed" },
  { task: "Chain ID assigned", status: "completed" },
  { task: "RPC configured", status: "completed" },
  { task: "Explorer URL prepared", status: "completed" },
  { task: "MetaMask add-network support added", status: "completed" },
  { task: "Switch-network support added", status: "pending" },
  { task: "Wallet state handling added", status: "pending" },
  { task: "Faucet integration next", status: "pending" },
  { task: "Bridge integration next", status: "pending" },
  { task: "Public testnet preparation", status: "pending" },
] as const;
