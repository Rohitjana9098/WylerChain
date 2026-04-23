"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { arbitrum, mainnet, base } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { NetworkConfig } from "@/config/network";

// Define WylerChain (L3 on Arbitrum)
const wylerChain = {
  id: NetworkConfig.chainIdDecimal,
  name: NetworkConfig.networkName,
  nativeCurrency: { 
    name: NetworkConfig.nativeCurrencyName, 
    symbol: NetworkConfig.nativeCurrencySymbol, 
    decimals: NetworkConfig.nativeCurrencyDecimals 
  },
  rpcUrls: {
    default: { http: [NetworkConfig.rpcUrl] },
  },
  blockExplorers: {
    default: { name: "WylerExplorer", url: NetworkConfig.explorerUrl },
  },
} as const;

export const config = createConfig({
  chains: [wylerChain, arbitrum, base, mainnet],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "WylerChain" }),
    walletConnect({ projectId: "YOUR_PROJECT_ID" }), // User should replace this
  ],
  transports: {
    [wylerChain.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [mainnet.id]: http(),
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
