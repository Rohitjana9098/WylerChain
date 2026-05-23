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
  SwitchCamera,
  Cpu,
  Clock,
  Radio,
  Lock,
  ArrowRight
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
  const [activeTab, setActiveTab] = useState<"social" | "email">("social");
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  const WYLER_CHAIN_ID = NetworkConfig.chainIdDecimal;

  // Handle Wallet Selection
  const handleConnect = (connector: Connector) => {
    setAuthState("CONNECTING");
    setStatusMessage(`Requesting connection to ${connector.name}...`);
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
      setStatusMessage("Sign cryptography message to verify your secure Layer 3 vault.");
      
      const message = `Welcome to WylerChain!\n\nAuthorize this session to access your L3 Vault.\n\nWallet: ${address}\nNonce: ${Math.floor(Math.random() * 1000000)}`;
      
      await signMessageAsync({ message });
      
      setAuthState("SUCCESS");
      setStatusMessage("Authentication Cryptographically Verified!");
      
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setEmailSubmitting(true);
    setAuthState("SIGNING");
    setStatusMessage("Generating secure zero-gas account node...");
    
    setTimeout(() => {
      setAuthState("SUCCESS");
      setStatusMessage("Ecosystem Profile Constructed!");
      
      setTimeout(() => {
        login("SOCIAL");
      }, 1500);
    }, 2500);
  };

  const resetAuth = () => {
    disconnect();
    setAuthState("IDLE");
    setErrorMessage("");
    setShowWalletModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Dynamic Background Grid and Ambient Glows */}
      <div className="absolute inset-0 bg-[#020205]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-dim/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Cybernetic Dot Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-[#07070b]/90 backdrop-blur-3xl border border-white/10 p-8 sm:p-12 rounded-[40px] shadow-2xl relative z-10"
      >
        {/* Border Glow Line */}
        <div className="absolute inset-x-12 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Back Button */}
        <button 
          onClick={() => setView("LANDING")}
          className="absolute -top-16 left-0 flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase font-bold text-[10px] tracking-[0.2em] bg-white/[0.02] border border-white/5 px-4 py-2 rounded-full"
        >
          <ChevronLeft size={12} /> Return to Network Hub
        </button>

        {/* Logo and Intro */}
        <div className="flex justify-center mb-8">
          <div className="relative group cursor-pointer" onClick={() => window.location.reload()}>
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-primary to-primary-dim opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
            <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center border border-white/10 relative z-10">
              <img src="/LOGO/wyler_glow_logo.png" alt="Wyler" className="h-12 w-auto" />
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="font-space text-4xl font-extrabold uppercase tracking-tight text-white mb-2 leading-none">
            Wyler Access
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] font-mono font-bold">
              L3 Modular Gateway Node
            </p>
          </div>
        </div>

        {/* --- Selection Tabs --- */}
        <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setActiveTab("social")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === "social" 
                ? "bg-primary text-white shadow-lg" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Social Auth
          </button>
          <button 
            onClick={() => setActiveTab("email")}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              activeTab === "email" 
                ? "bg-primary text-white shadow-lg" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Developer Email
          </button>
        </div>

        {/* --- Main Login Options --- */}
        <div className="space-y-6">
          {activeTab === "social" ? (
            <div className="space-y-4">
              <button 
                onClick={() => setShowWalletModal(true)}
                className="flex items-center justify-center gap-4 w-full py-5 bg-primary rounded-2xl border border-primary/40 hover:bg-primary/90 transition-all group shadow-[0_0_25px_rgba(79,70,229,0.3)] active:scale-[0.98] duration-150"
              >
                <WalletIcon size={18} className="text-white animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-[0.2em]">Connect Secure Wallet</span>
              </button>

              <div className="flex items-center gap-4 my-6">
                <div className="h-[1px] bg-white/5 flex-1" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-600 font-mono font-bold">Ecosystem OAuth</span>
                <div className="h-[1px] bg-white/5 flex-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <SocialButton icon={<Globe size={18} />} label="Google Account" />
                <SocialButton icon={<Apple size={18} />} label="Apple ID" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 block">
                  Developer Email Identity
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. core@wylerchain.com"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-muted font-inter"
                />
              </div>

              <button 
                type="submit"
                disabled={!emailInput || emailSubmitting}
                className="w-full py-4.5 bg-primary text-white font-bold rounded-2xl uppercase tracking-widest text-xs shadow-[0_0_25px_rgba(79,70,229,0.3)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform duration-200"
              >
                Continue with Email <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>

        <div className="mt-10 p-4 bg-[#0a0a0f] border border-white/5 rounded-2xl flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <div className="flex items-center gap-1.5">
            <Radio size={12} className="text-primary animate-pulse" />
            <span>NODE STATUS: ACTIVE</span>
          </div>
          <span>PING: 82ms</span>
          <span>GAS Abstractor: ON</span>
        </div>

        {/* --- Wallet Selection Modal --- */}
        <AnimatePresence>
          {showWalletModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/85 backdrop-blur-md"
            >
              {/* Overlay background close */}
              <div className="absolute inset-0" onClick={() => authState === "IDLE" && resetAuth()} />

              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="w-full max-w-md bg-[#0a0a0f] border border-white/10 p-8 rounded-[36px] relative shadow-2xl z-10"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-space font-extrabold text-xl uppercase tracking-tight">Select Wallet</h3>
                  {authState === "IDLE" && (
                    <button onClick={resetAuth} className="p-2 text-gray-500 hover:text-white transition-colors">✕</button>
                  )}
                </div>

                {/* State Renders: High-fidelity simulator overlays */}
                {authState === "IDLE" && (
                  <div className="flex flex-col gap-3">
                    {connectors.map((c) => (
                      <button 
                        key={c.uid}
                        onClick={() => handleConnect(c)}
                        disabled={!c.ready}
                        className="flex items-center justify-between px-5 py-4.5 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/5 hover:border-primary/40 transition-all group disabled:opacity-50 active:scale-[0.98] duration-150"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-black rounded-xl border border-white/10 group-hover:border-primary/30 transition-all text-gray-400 group-hover:text-primary">
                            <WalletIcon size={18} />
                          </div>
                          <span className="font-bold text-sm tracking-wide">{c.name}</span>
                        </div>
                        <span className="text-[9px] bg-primary/10 text-primary font-mono font-bold px-2 py-0.5 rounded border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                          CONNECT
                        </span>
                      </button>
                    ))}
                    
                    <div className="mt-6 p-4 bg-black/40 border border-white/5 rounded-2xl text-[9.5px] text-gray-500 uppercase tracking-widest text-center italic font-mono flex items-center justify-center gap-2">
                      <Cpu size={12} className="text-primary" />
                      Supporting Base & Arbitrum Chains
                    </div>
                  </div>
                )}

                {authState === "CONNECTING" && (
                  <div className="py-10 text-center space-y-6">
                    {/* Concentric spin animation */}
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                      <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
                      <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" size={24} />
                    </div>
                    <div>
                      <p className="font-space font-bold text-lg uppercase tracking-wider text-white">{statusMessage}</p>
                      <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-mono">Pinging Node Provider...</p>
                    </div>
                    <div className="p-4 bg-[#050508] border border-white/5 rounded-2xl max-w-xs mx-auto text-left text-[10px] font-mono text-gray-500 space-y-1.5">
                      <div className="flex justify-between">
                        <span>RPC STATE:</span>
                        <span className="text-emerald-400 font-bold">ONLINE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GATEWAY SYNC:</span>
                        <span className="text-white">100%</span>
                      </div>
                    </div>
                  </div>
                )}

                {authState === "WRONG_NETWORK" && (
                  <div className="py-10 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mx-auto text-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.15)] animate-bounce">
                      <AlertCircle size={32} />
                    </div>
                    <div>
                      <p className="font-space font-bold text-lg uppercase tracking-wider text-white">Wrong Chain ID</p>
                      <p className="text-gray-500 text-xs mt-2">WylerChain operates on an abstracted L3 custom subnet.</p>
                    </div>
                    <button 
                      onClick={() => switchChain({ chainId: WYLER_CHAIN_ID })}
                      className="w-full py-4 bg-orange-500 text-white font-bold rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-orange-600 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                    >
                      {isSwitching ? <Loader2 size={16} className="animate-spin" /> : <SwitchCamera size={16} />}
                      Auto-Route to WylerChain
                    </button>
                    <button 
                      onClick={resetAuth}
                      className="w-full py-3 bg-white/5 border border-white/5 text-gray-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:text-white"
                    >
                      Abort Connection
                    </button>
                  </div>
                )}

                {authState === "SIGNING" && (
                  <div className="py-10 text-center space-y-6">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                      <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-pulse" />
                      <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={24} />
                    </div>
                    <div>
                      <p className="font-space font-bold text-lg uppercase tracking-wider text-white">Security Validation</p>
                      <p className="text-gray-400 text-xs mt-2 leading-relaxed px-4">{statusMessage}</p>
                    </div>
                    <div className="p-4 bg-[#050508] border border-white/5 rounded-2xl max-w-xs mx-auto text-left text-[10px] font-mono text-gray-500 space-y-1.5">
                      <div className="flex justify-between">
                        <span>SECURITY SCHEME:</span>
                        <span>ED25519_VALIDATOR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>GAS PROTOCOL:</span>
                        <span className="text-emerald-400">ABSTRACTED</span>
                      </div>
                    </div>
                  </div>
                )}

                {authState === "SUCCESS" && (
                  <div className="py-10 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <p className="font-space font-bold text-lg uppercase tracking-wider text-white">Access Approved</p>
                      <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-mono">Synchronizing dashboard vaults...</p>
                    </div>
                  </div>
                )}

                {authState === "ERROR" && (
                  <div className="py-10 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                      <AlertCircle size={32} />
                    </div>
                    <div>
                      <p className="font-space font-bold text-lg uppercase tracking-wider text-white">Gate Rejected</p>
                      <p className="text-red-400 text-xs mt-2 px-6 leading-relaxed font-mono">{errorMessage}</p>
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
    <button className="flex items-center justify-center gap-3 w-full py-4 bg-white/[0.01] rounded-2xl border border-white/5 hover:bg-white/5 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(79,70,229,0.1)] transition-all text-gray-400 hover:text-white group">
      <span className="group-hover:text-primary transition-colors">{icon}</span>
      <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{label}</span>
    </button>
  );
}
