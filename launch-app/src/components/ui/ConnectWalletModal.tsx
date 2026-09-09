"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Lock, Loader2 } from "lucide-react";
import { useConnect } from "wagmi";
import { useAuth } from "@/lib/AuthContext";

interface WalletOption {
  id: string;
  name: string;
  sub: string;
  kind: "metamask" | "phantom" | "coinbase" | "walletconnect";
  logo: React.ReactNode;
}

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { connect, connectors } = useConnect();
  const { login } = useAuth();
  const [pending, setPending] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const resetAndClose = () => {
    setPending(null);
    setError(null);
    onClose();
  };

  // Social passkey: mock session creation (mirrors the /auth login flow)
  const handleSocial = (method: string) => {
    setPending(method);
    setError(null);
    setTimeout(() => {
      login(method);
      resetAndClose();
    }, 1500);
  };

  // Web3 self-custody: connect through wagmi connectors
  const connectWith = (type: string, label: string) => {
    const connector = connectors.find((c) => c.type === type);
    if (!connector) {
      setError(`${label} is not available in this browser.`);
      return;
    }
    setPending(label);
    setError(null);
    connect(
      { connector },
      {
        onSuccess: () => resetAndClose(),
        onError: (e) => {
          setPending(null);
          const msg = e?.message || "";
          setError(
            msg.toLowerCase().includes("projectid") || msg.toLowerCase().includes("project id")
              ? "WalletConnect needs a valid project ID configured in Web3Provider.tsx."
              : msg || `Could not connect to ${label}.`
          );
        },
      }
    );
  };

  const handleMetaMask = () => {
    const hasProvider = typeof window !== "undefined" && !!(window as unknown as { ethereum?: unknown }).ethereum;
    if (hasProvider) {
      connectWith("injected", "MetaMask");
    } else {
      window.open("https://metamask.io/download/", "_blank", "noopener,noreferrer");
    }
  };

  const handlePhantom = () => {
    const hasPhantom =
      typeof window !== "undefined" &&
      !!(window as unknown as { phantom?: { ethereum?: unknown } }).phantom?.ethereum;
    if (hasPhantom) {
      connectWith("injected", "Phantom");
    } else {
      window.open("https://phantom.app/download", "_blank", "noopener,noreferrer");
    }
  };

  const wallets: WalletOption[] = [
    { id: "metamask", name: "MetaMask", sub: "EVM Mainnets", kind: "metamask", logo: <img src="/logos/logos/metamask-icon.png" alt="MetaMask" className="w-6 h-6 object-contain" /> },
    { id: "phantom", name: "Phantom", sub: "Solana & Multi-chain", kind: "phantom", logo: <img src="/logos/logos/phantom-icon.png" alt="Phantom" className="w-6 h-6 object-contain" /> },
    { id: "coinbase", name: "Coinbase Wallet", sub: "Smart Wallet Passkey", kind: "coinbase", logo: <img src="/logos/logos/coinbase-icon.png" alt="Coinbase Wallet" className="w-6 h-6 object-contain" /> },
    { id: "walletconnect", name: "WalletConnect", sub: "300+ Wallets", kind: "walletconnect", logo: <WalletConnectIcon /> },
  ];

  const onWalletClick = (w: WalletOption) => {
    if (pending) return;
    if (w.kind === "metamask") handleMetaMask();
    else if (w.kind === "phantom") handlePhantom();
    else if (w.kind === "coinbase") connectWith("coinbaseWallet", "Coinbase Wallet");
    else connectWith("walletConnect", "WalletConnect");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#0b0b0f]/95 border border-white/10 rounded-[28px] z-[101] shadow-2xl p-7 sm:p-8"
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                <Lock size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-space font-bold text-white leading-tight">Connect to WylerChain</h3>
                <p className="text-xs text-muted mt-1">Non-custodial smart session</p>
              </div>
              <button
                onClick={resetAndClose}
                className="p-2 text-muted hover:text-white hover:bg-white/5 rounded-full transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Social passkey */}
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted mb-4">
              Social Passkey (No Seed Phrase Needed)
            </p>
            <div className="grid grid-cols-3 gap-3 mb-8">
              <SocialTile icon={<GoogleIcon />} label="Google" pending={pending === "GOOGLE"} onClick={() => handleSocial("GOOGLE")} />
              <SocialTile icon={<XLogo />} label="X / Twitter" pending={pending === "X"} onClick={() => handleSocial("X")} />
              <SocialTile icon={<AppleIcon />} label="Apple ID" pending={pending === "APPLE"} onClick={() => handleSocial("APPLE")} />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] bg-white/10 flex-1" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-bold">Or Web3 Self-Custody</span>
              <div className="h-[1px] bg-white/10 flex-1" />
            </div>

            {/* Wallet rows */}
            <div className="flex flex-col gap-3">
              {wallets.map((w) => (
                <button
                  key={w.id}
                  onClick={() => onWalletClick(w)}
                  disabled={!!pending}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/40 hover:bg-white/[0.05] transition-all text-left disabled:opacity-60 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {w.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-space font-bold text-white">{w.name}</p>
                    <p className="text-[11px] text-muted mt-0.5">{w.sub}</p>
                  </div>
                  {pending === w.name ? (
                    <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary shrink-0">
                      <Loader2 size={14} className="animate-spin" /> Connecting
                    </span>
                  ) : (
                    <span className="text-sm text-muted group-hover:text-primary transition-colors font-medium shrink-0">
                      Connect
                    </span>
                  )}
                </button>
              ))}
            </div>

            {error && (
              <p className="mt-4 text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 leading-relaxed">
                {error}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/5">
              <span className="flex items-center gap-2 text-xs font-bold text-green-400">
                <ShieldCheck size={14} /> Shield Sandboxed
              </span>
              <span className="text-xs text-muted">Non-Custodial</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ---- Shared brand icons ----

function SocialTile({ icon, label, onClick, pending }: { icon: React.ReactNode; label: string; onClick: () => void; pending?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={!!pending}
      className="flex flex-col items-center justify-center gap-3 py-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 hover:bg-white/[0.06] transition-all cursor-pointer disabled:opacity-60"
    >
      {pending ? <Loader2 size={22} className="text-primary animate-spin" /> : icon}
      <span className="text-sm font-medium text-gray-200">{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.22Z" />
      <path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.7Z" />
      <path fill="#FBBC05" d="M6.54 13.8a5.85 5.85 0 0 1 0-3.6V7.68H3.3a9.74 9.74 0 0 0 0 8.64l3.24-2.52Z" />
      <path fill="#EA4335" d="M12 6.17c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52C7.31 7.89 9.46 6.17 12 6.17Z" />
    </svg>
  );
}

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-white">
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.85h1.73L8.28 4.05H6.42L17.8 19.85Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-white">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function WalletConnectIcon() {
  return (
    <svg viewBox="0 0 32 20" aria-hidden="true" className="w-7 h-7">
      <path
        d="M6.3 7.1C12 1.9 20 1.9 25.7 7.1l.65.6c.28.26.28.7 0 .96l-2.2 2.13c-.14.13-.36.13-.5 0l-.9-.87c-4.1-3.85-10.7-3.85-14.8 0l-.9.87c-.14.13-.36.13-.5 0L3.45 8.66a.67.67 0 0 1 0-.96l.65-.6z"
        fill="#3B99FC"
      />
      <path
        d="M22.4 12.44l1.97 1.9c.28.27.28.7 0 .97l-3.5 3.4c-.28.27-.73.27-1 0l-4.32-4.2a.5.5 0 0 0-.7 0l-4.32 4.2c-.28.27-.73.27-1 0l-3.5-3.4a.68.68 0 0 1 0-.97l1.97-1.9c.28-.27.73-.27 1 0l4.32 4.2c.19.19.5.19.7 0l4.32-4.2c.28-.27.73-.27 1.01 0z"
        fill="#3B99FC"
      />
    </svg>
  );
}