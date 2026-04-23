"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Copy, 
  Check, 
  Plus, 
  RefreshCw, 
  ExternalLink, 
  ShieldCheck, 
  Info, 
  ChevronDown, 
  AlertCircle,
  Clock,
  CircleDashed,
  CheckCircle2
} from "lucide-react";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { NetworkConfig, NetworkRoadmap } from "@/config/network";

export default function NetworkSetup() {
  const { isConnected, connector } = useAccount();
  const currentChainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isMMInstalled, setIsMMInstalled] = useState(false);
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    setIsMMInstalled(typeof window !== "undefined" && !!(window as any).ethereum);
  }, []);

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddNetwork = async () => {
    if (!isMMInstalled) return;
    try {
      await (window as any).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: NetworkConfig.chainIdHex,
          chainName: NetworkConfig.networkName,
          nativeCurrency: {
            name: NetworkConfig.nativeCurrencyName,
            symbol: NetworkConfig.nativeCurrencySymbol,
            decimals: NetworkConfig.nativeCurrencyDecimals,
          },
          rpcUrls: [NetworkConfig.rpcUrl],
          blockExplorerUrls: [NetworkConfig.explorerUrl],
        }],
      });
    } catch (error) {
      console.error("Failed to add network", error);
    }
  };

  const handleSwitchNetwork = () => {
    switchChain({ chainId: NetworkConfig.chainIdDecimal });
  };

  const isCorrectNetwork = currentChainId === NetworkConfig.chainIdDecimal;

  const fields = [
    { id: "name", label: "Network Name", value: NetworkConfig.networkName },
    { id: "chainIdDec", label: "Chain ID (Decimal)", value: NetworkConfig.chainIdDecimal.toString() },
    { id: "chainIdHex", label: "Chain ID (Hex)", value: NetworkConfig.chainIdHex },
    { id: "rpc", label: "RPC URL", value: NetworkConfig.rpcUrl },
    { id: "explorer", label: "Explorer URL", value: NetworkConfig.explorerUrl },
    { id: "symbol", label: "Currency Symbol", value: NetworkConfig.nativeCurrencySymbol },
    { id: "decimals", label: "Decimals", value: NetworkConfig.nativeCurrencyDecimals.toString() },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Configuration Card */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-2xl font-space font-bold flex items-center gap-2">
            <Globe size={24} className="text-primary" /> WylerChain RPC Config
          </h3>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${
            NetworkConfig.isLive 
            ? "bg-green-500/10 border-green-500/20 text-green-500" 
            : "bg-amber-500/10 border-amber-500/20 text-amber-500"
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor] ${
              NetworkConfig.isLive ? "bg-green-500" : "bg-amber-500"
            }`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{NetworkConfig.statusLabel}</span>
          </div>
        </div>

        <div className="bg-surface-low border border-border/30 rounded-[32px] p-1 overflow-hidden group hover:border-primary/20 transition-all">
          <div className="bg-surface-low p-8 rounded-[28px] flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted leading-relaxed font-inter max-w-2xl">
                The WylerChain Testnet is an ecosystem-focused Layer 3 protocol. Some environment values below 
                are <span className="text-white font-bold">temporary placeholders</span> until the public production deployment sequence is finalized.
              </p>
              {!isConnected && (
                <div className="flex items-center gap-2 bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-xl">
                  <Info size={14} className="text-primary" />
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Connect wallet to unlock automated setup actions</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {fields.map((field) => (
                <div key={field.id} className="bg-surface p-4 rounded-2xl border border-border/50 flex items-center justify-between group/field hover:border-primary/30 transition-all">
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">{field.label}</p>
                    <p className="text-sm font-mono font-bold text-white truncate max-w-[140px] md:max-w-none">{field.value}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(field.value, field.id)}
                    className="p-2.5 text-muted hover:text-white hover:bg-white/5 rounded-full transition-all flex-shrink-0"
                    title={`Copy ${field.label}`}
                  >
                    {copiedField === field.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 border-t border-white/5">
              {!isMMInstalled ? (
                <div className="w-full flex items-center gap-3 bg-red-500/5 border border-red-500/10 p-4 rounded-2xl">
                  <AlertCircle size={18} className="text-red-500" />
                  <p className="text-xs font-bold text-red-400 uppercase tracking-widest">MetaMask Extension Not Found</p>
                </div>
              ) : !isConnected ? (
                <button className="w-full sm:w-auto py-4 px-8 bg-surface-highest border border-border/50 rounded-2xl text-xs font-bold uppercase tracking-widest text-muted cursor-not-allowed">
                  Connect Wallet First
                </button>
              ) : (
                <>
                  {!isCorrectNetwork ? (
                    <>
                      <button 
                        onClick={handleAddNetwork}
                        disabled={isSwitching}
                        className="w-full sm:w-auto py-4 px-10 bg-indigo-600 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)] transition-all group/btn"
                      >
                        <Plus size={16} className="group-hover/btn:rotate-90 transition-transform" />
                        Add WylerChain
                      </button>
                      <button 
                        onClick={handleSwitchNetwork}
                        disabled={isSwitching}
                        className="w-full sm:w-auto py-4 px-10 bg-surface-highest border border-border/50 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface transition-all"
                      >
                        <RefreshCw size={16} className={isSwitching ? "animate-spin" : ""} />
                        Switch Network
                      </button>
                    </>
                  ) : (
                    <div className="w-full sm:w-auto py-4 px-10 bg-green-500/10 border border-green-500/20 rounded-2xl text-xs font-bold uppercase text-green-500 tracking-widest flex items-center justify-center gap-2">
                      <ShieldCheck size={16} />
                      Connected to WylerChain
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Manual Setup Helper */}
        <div className="lg:col-span-12 lg:col-start-1">
          <div className="bg-surface-low border border-border/30 rounded-[32px] overflow-hidden">
            <button 
              onClick={() => setShowManual(!showManual)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Info size={20} className="text-primary" />
                <span className="text-sm font-bold uppercase tracking-[0.2em]">Manual MetaMask Setup</span>
              </div>
              <ChevronDown size={18} className={`text-muted transition-transform duration-300 ${showManual ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showManual && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-white/5"
                >
                  <div className="p-8 flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {[
                        { step: "1", text: "Open MetaMask and click the Network selector" },
                        { step: "2", text: "Select 'Add Network' followed by 'Add a network manually'" },
                        { step: "3", text: "Enter 'WylerChain Testnet' as the Network Name", copy: NetworkConfig.networkName },
                        { step: "4", text: "Paste the RPC URL", copy: NetworkConfig.rpcUrl },
                        { step: "5", text: "Enter Chain ID", copy: NetworkConfig.chainIdDecimal.toString() },
                        { step: "6", text: "Enter Currency Symbol", copy: NetworkConfig.nativeCurrencySymbol },
                        { step: "7", text: "Paste the Explorer URL", copy: NetworkConfig.explorerUrl },
                        { step: "8", text: "Click Save and confirm the switch request" },
                      ].map((s, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-primary flex-shrink-0 mt-0.5">
                            {s.step}
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <p className="text-[11px] text-muted font-bold uppercase tracking-wider leading-relaxed">{s.text}</p>
                            {s.copy && (
                              <div className="flex items-center justify-between bg-black/40 border border-white/5 px-3 py-1.5 rounded-lg mt-1 group">
                                <span className="text-[10px] font-mono text-white/60 truncate">{s.copy}</span>
                                <button 
                                  onClick={() => copyToClipboard(s.copy!, `manual-${i}`)}
                                  className="text-muted hover:text-white transition-colors p-1"
                                >
                                  {copiedField === `manual-${i}` ? <Check size={10} className="text-green-500" /> : <Copy size={10} />}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Compact Roadmap */}
        <div className="lg:col-span-12">
          <div className="flex items-center justify-between px-2 mb-6">
            <h3 className="text-2xl font-space font-bold flex items-center gap-2">
              <Clock size={24} className="text-primary" /> Testnet Setup Progress
            </h3>
          </div>
          
          <div className="bg-surface-low border border-border/30 rounded-[32px] p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {NetworkRoadmap.map((item, idx) => (
                <div key={idx} className="bg-surface/50 border border-border/30 p-4 rounded-2xl flex items-center gap-4 group hover:border-primary/20 transition-all">
                  <div className={`flex-shrink-0 ${
                    item.status === "completed" ? "text-green-500" :
                    item.status === "in-progress" ? "text-primary animate-pulse" : "text-muted"
                  }`}>
                    {item.status === "completed" ? <CheckCircle2 size={18} /> :
                     item.status === "in-progress" ? <CircleDashed size={18} /> : <div className="w-4 h-4 rounded-full border-2 border-current opacity-20" />}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    item.status === "completed" ? "text-white/80" : 
                    item.status === "in-progress" ? "text-primary" : "text-white/40"
                  }`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
