"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { 
  ChevronLeft, 
  Mail, 
  Apple, 
  Globe, 
  Wallet as WalletIcon, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  ShieldCheck,
  SwitchCamera
} from "lucide-react";
import { 
  useConnect, 
  useAccount, 
  useDisconnect, 
  useSignMessage, 
  useSwitchChain,
  Connector
} from "wagmi";
import { NetworkConfig } from "@/config/network";

export default function Login() {
  const { setView, login } = useAuth();
  
  // Web3 Hooks
  const { connect, connectors, error: connectError, isPending: isConnecting } = useConnect();
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  // Internal State
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [authState, setAuthState] = useState<"IDLE" | "CONNECTING" | "WRONG_NETWORK" | "SIGNING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const WYLER_CHAIN_ID = NetworkConfig.chainIdDecimal;

  // Handle Wallet Selection
  const handleConnect = (connector: Connector) => {
    setAuthState("CONNECTING");
    setStatusMessage(`Opening ${connector.name}...`);
    connect({ connector });
  };

  // Handle errors from wagmi
  useEffect(() => {
    if (connectError) {
      setAuthState("ERROR");
      if (connectError.name === "UserRejectedRequestError") {
        setErrorMessage("Connection rejected by user.");
      } else {
        setErrorMessage(connectError.message || "Failed to connect wallet.");
      }
    }
  }, [connectError]);

  // Logic flow handling
  useEffect(() => {
    if (isConnected && address) {
      // Avoid acting if chainId hasn't loaded yet
      if (!chainId) return;

      if (chainId !== WYLER_CHAIN_ID) {
        setAuthState("WRONG_NETWORK");
      } else {
        // If we are on the right network and in a transition state, trigger signature
        if (authState === "CONNECTING" || authState === "WRONG_NETWORK" || authState === "IDLE") {
           if (showWalletModal || authState === "WRONG_NETWORK") {
             handleSignature();
           }
        }
      }
    } else if (!isConnected && authState !== "IDLE" && authState !== "ERROR") {
        setAuthState("IDLE");
    }
  }, [isConnected, address, chainId, authState, showWalletModal]);

  const handleSignature = async () => {
    try {
      setAuthState("SIGNING");
      setStatusMessage("Please sign the message in your wallet to authenticate.");
      
      const message = `Welcome to WylerChain!\n\nAuthorize this session to access your L3 Vault.\n\nWallet: ${address}\nNonce: ${Math.floor(Math.random() * 1000000)}`;
      
      await signMessageAsync({ message });
      
      setAuthState("SUCCESS");
      setStatusMessage("Authentication Successful!");
      
      setTimeout(() => {
        login("WALLET");
      }, 1500);
    } catch (err: any) {
      console.error("Signature Error:", err);
      setAuthState("ERROR");
      if (err.name === "UserRejectedRequestError") {
        setErrorMessage("Signature request rejected by user.");
      } else {
        setErrorMessage(err.message || "Authentication failed.");
      }
    }
  };

  const resetAuth = () => {
    disconnect();
    setAuthState("IDLE");
    setErrorMessage("");
    setShowWalletModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0a0a0e] border border-white/10 p-10 rounded-[40px] shadow-2xl relative z-10"
      >
        {/* Back Button */}
        <button 
          onClick={() => setView("LANDING")}
          className="absolute -top-16 left-0 flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase font-bold text-[10px] tracking-widest"
        >
          <ChevronLeft size={14} /> Back to Hub
        </button>

        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(79,70,229,0.2)]">
            <img src="/LOGO/wyler_glow_logo.png" alt="Wyler" className="h-12 w-auto" />
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="font-space text-4xl font-bold uppercase tracking-tighter text-white mb-2">Wyler Access</h2>
          <p className="text-gray-500 text-[9px] uppercase tracking-[0.3em] font-bold">L3 Modular Gateway</p>
        </div>

        {/* --- Main Login Options --- */}
        <div className="space-y-4">
            <button 
              onClick={() => setShowWalletModal(true)}
              className="flex items-center justify-center gap-4 w-full py-5 bg-indigo-600 rounded-2xl border border-indigo-500/50 hover:bg-indigo-500 transition-all group shadow-[0_0_30px_rgba(79,70,229,0.2)]"
            >
              <WalletIcon size={20} className="text-white" />
              <span className="font-bold text-sm uppercase tracking-widest">Connect Wallet</span>
            </button>

            <div className="flex items-center gap-4 my-6">
                <div className="h-[1px] bg-white/5 flex-1" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600 font-bold">Social Access</span>
                <div className="h-[1px] bg-white/5 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <SocialButton icon={<Globe size={18} />} label="Google" />
                <SocialButton icon={<Apple size={18} />} label="Apple" />
            </div>

            <button className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all font-bold text-[10px] uppercase tracking-widest text-gray-400">
                <Mail size={16} /> Continue with Email
            </button>
        </div>

        <p className="mt-10 text-[10px] text-center text-gray-600 leading-relaxed uppercase tracking-widest">
            Connecting to the <span className="text-indigo-400 font-bold">Wyler Foundation</span> <br/>
            Secure Layer 3 Network
        </p>

        {/* --- Wallet Selection Modal --- */}
        <AnimatePresence>
          {showWalletModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-sm bg-[#0d0d12] border border-white/10 p-8 rounded-[32px] relative shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-space font-bold text-xl uppercase tracking-tighter">Select Wallet</h3>
                    <button onClick={resetAuth} className="p-2 text-gray-500 hover:text-white transition-colors">✕</button>
                </div>

                {/* State Renders */}
                {authState === "IDLE" && (
                    <div className="flex flex-col gap-3">
                        {connectors.map((c) => (
                            <button 
                                key={c.uid}
                                onClick={() => handleConnect(c)}
                                disabled={!c.ready}
                                className="flex items-center justify-between px-5 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-indigo-500/40 transition-all group disabled:opacity-50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-black rounded-lg border border-white/5">
                                        <WalletIcon size={18} className="text-indigo-400" />
                                    </div>
                                    <span className="font-bold text-sm tracking-wide">{c.name}</span>
                                </div>
                            </button>
                        ))}
                        {/* Specialized Base/Injected options could go here if filtered */}
                        <div className="mt-4 text-[9px] text-gray-600 uppercase tracking-widest text-center italic">
                            Supporting Base & Arbitrum Ecosystems
                        </div>
                    </div>
                )}

                {authState === "CONNECTING" && (
                    <div className="py-10 text-center space-y-6">
                        <div className="flex justify-center">
                            <Loader2 size={48} className="text-indigo-500 animate-spin" />
                        </div>
                        <div>
                            <p className="font-space font-bold text-lg uppercase tracking-widest text-white">{statusMessage}</p>
                            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Awaiting selection...</p>
                        </div>
                    </div>
                )}

                {authState === "WRONG_NETWORK" && (
                    <div className="py-10 text-center space-y-6">
                        <div className="flex justify-center">
                            <AlertCircle size={48} className="text-orange-500" />
                        </div>
                        <div>
                            <p className="font-space font-bold text-lg uppercase tracking-widest text-white">Wrong Network</p>
                            <p className="text-gray-500 text-xs mt-2">WylerChain operates on a custom L3.</p>
                        </div>
                        <button 
                            onClick={() => switchChain({ chainId: WYLER_CHAIN_ID })}
                            className="w-full py-4 bg-orange-500/10 border border-orange-500/50 text-orange-400 font-bold rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-orange-500 hover:text-white transition-all"
                        >
                            {isSwitching ? <Loader2 size={16} className="animate-spin" /> : <SwitchCamera size={16} />}
                            Switch to WylerChain
                        </button>
                    </div>
                )}

                {authState === "SIGNING" && (
                    <div className="py-10 text-center space-y-6">
                        <div className="flex justify-center">
                            <ShieldCheck size={48} className="text-indigo-400 animate-pulse" />
                        </div>
                        <div>
                            <p className="font-space font-bold text-lg uppercase tracking-widest text-white">Security Check</p>
                            <p className="text-gray-500 text-[10px] mt-2 leading-relaxed uppercase tracking-widest">{statusMessage}</p>
                        </div>
                    </div>
                )}

                {authState === "SUCCESS" && (
                    <div className="py-10 text-center space-y-6">
                        <div className="flex justify-center">
                            <CheckCircle2 size={48} className="text-green-500" />
                        </div>
                        <div>
                            <p className="font-space font-bold text-lg uppercase tracking-widest text-white">Access Granted</p>
                            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Welcome to the future.</p>
                        </div>
                    </div>
                )}

                {authState === "ERROR" && (
                    <div className="py-10 text-center space-y-6">
                        <div className="flex justify-center">
                            <AlertCircle size={48} className="text-red-500" />
                        </div>
                        <div>
                            <p className="font-space font-bold text-lg uppercase tracking-widest text-white">Auth Failed</p>
                            <p className="text-red-400 text-xs mt-2 uppercase tracking-widest">{errorMessage}</p>
                        </div>
                        <button 
                            onClick={resetAuth}
                            className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl uppercase tracking-widest text-xs"
                        >
                            Try Again
                        </button>
                    </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function SocialButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all text-gray-400 hover:text-white">
      {icon}
      <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}
