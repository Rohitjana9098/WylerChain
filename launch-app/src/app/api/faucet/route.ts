import { NextResponse } from "next/server";
import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { NetworkConfig } from "@/config/network";

// Use a simple in-memory check to prevent abuse. (Resets if server restarts)
// In production, use Redis or a Database.
const rateLimits = new Map<string, number>();
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 Hours

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    // 1. Cooldown Rate Limiting Check
    const lastClaim = rateLimits.get(address);
    if (lastClaim && Date.now() - lastClaim < COOLDOWN_MS) {
      return NextResponse.json({ error: "Please wait 24 hours between claims." }, { status: 429 });
    }

    // 2. Setup the Admin Faucet Wallet via Viem
    const privateKey = process.env.FAUCET_PRIVATE_KEY as `0x${string}`;
    if (!privateKey) {
      console.error("FAUCET_PRIVATE_KEY is missing from .env.local");
      return NextResponse.json({ error: "Faucet is not configured properly." }, { status: 500 });
    }

    const account = privateKeyToAccount(privateKey);
    const wylerChain = {
      id: NetworkConfig.chainIdDecimal,
      name: NetworkConfig.networkName,
      nativeCurrency: {
        decimals: NetworkConfig.nativeCurrencyDecimals,
        name: NetworkConfig.nativeCurrencyName,
        symbol: NetworkConfig.nativeCurrencySymbol,
      },
      rpcUrls: {
        default: { http: [NetworkConfig.rpcUrl] },
        public: { http: [NetworkConfig.rpcUrl] },
      },
    };

    const walletClient = createWalletClient({
      account,
      chain: wylerChain,
      transport: http(NetworkConfig.rpcUrl),
    });

    // 3. Send 10,000 WYLR physically to the User
    console.log(`Sending 10,000 WYLR from Faucet to ${address}`);
    const hash = await walletClient.sendTransaction({
      to: address as `0x${string}`,
      value: parseEther("10000"),
    });
    
    // Track successfully claimed time
    rateLimits.set(address, Date.now());

    return NextResponse.json({ success: true, hash });
  } catch (error: any) {
    console.error("Faucet Error:", error);
    return NextResponse.json({ error: "Transaction failed. Check faucet balance." }, { status: 500 });
  }
}
