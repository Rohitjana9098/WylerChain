"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { 
  Wallet as WalletIcon, 
  BarChart3, 
  Users, 
  Image as ImageIcon, 
  Compass,
  LogOut,
  Bell,
  ChevronDown,
  Copy,
  ExternalLink,
  SwitchCamera,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useConnect, useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { NetworkConfig } from "@/config/network";
import PlexusBackground from "@/components/ui/PlexusBackground";

import WalletModule from "./WalletModule";
import StakingModule from "./StakingModule";
import CreatorModule from "./CreatorModule";
import NFTModule from "./NFTModule";
import ExploreModule from "./ExploreModule";

const TABS = [
  { id: "WALLET", label: "Wallet", icon: WalletIcon },
  { id: "STAKING", label: "Staking", icon: BarChart3 },
  { id: "CREATORS", label: "Creators", icon: Users },
  { id: "NFTS", label: "NFTs", icon: ImageIcon },
  { id: "EXPLORE", label: "Explore", icon: Compass },
] as const;

export default function Dashboard() {
  const { activeTab, setTab, logout } = useAuth();
  
  // Wagmi Hooks
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  
  const [showWalletModal, setShowWalletModal] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  useEffect(() => {
    // Other dashboard initialization if necessary
  }, []);

  const renderModule = () => {
    switch (activeTab) {
      case "WALLET": return <WalletModule />;
      case "STAKING": return <StakingModule />;
      case "CREATORS": return <CreatorModule />;
      case "NFTS": return <NFTModule />;
      case "EXPLORE": return <ExploreModule />;
      default: return <WalletModule />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-inter">
      {/* Constellation Background */}
      <PlexusBackground />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 h-20">
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between relative z-10">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.reload()}>
              <img src="/LOGO/wyler_glow_logo.png" alt="Wyler" className="h-10 w-auto" />
              <span className="font-headline font-bold uppercase text-xs tracking-[0.3em] hidden sm:block">Wyler Chain</span>
            </div>
            
            <nav 
              className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 relative"
              onMouseLeave={() => setHoveredTab(null)}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  className={`relative px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 z-10 ${
                    activeTab === tab.id 
                      ? "text-white" 
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {/* Hover Pill */}
                  {hoveredTab === tab.id && (
                    <motion.div
                      layoutId="dashboard-hover-pill"
                      className="absolute inset-0 bg-white/5 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Active Pill */}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="dashboard-active-pill"
                      className="absolute inset-0 bg-indigo-600 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.3)] -z-20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <tab.icon size={12} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Bell size={18} />
            </button>
            
            <div className="h-8 w-[1px] bg-white/10 mx-2" />

            <div className="relative">
              {!mounted ? (
                <div className="h-9 w-[130px] bg-white/5 animate-pulse rounded-full" />
              ) : !isConnected ? (
                <button 
                  onClick={() => setShowWalletModal(!showWalletModal)}
                  className="px-6 py-2.5 bg-indigo-600 rounded-full font-bold uppercase tracking-widest text-[10px] text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all cursor-pointer"
                >
                  Connect Wallet
                </button>
              ) : (
                <div 
                  onClick={() => setShowWalletModal(!showWalletModal)} 
                  className="flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-full border border-white/5 hover:border-indigo-500/50 transition-all cursor-pointer group"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)] text-white">
                    WC
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1 group-hover:text-indigo-400 transition-colors">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not Connected"}
                    </p>
                    <div className="flex items-center gap-1">
                      {chainId === NetworkConfig.chainIdDecimal ? (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                          <p className="text-[8px] text-gray-600 font-bold uppercase tracking-wider">Wyler Chain L3</p>
                        </>
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                          <p className="text-[8px] text-orange-500 font-bold uppercase tracking-wider">Wrong Network</p>
                        </>
                      )}
                    </div>
                  </div>
                  <ChevronDown size={14} className="text-gray-600" />
                </div>
              )}

            </div>
            {/* End Dropdown Placeholder */}

            <button 
              onClick={() => { disconnect(); logout(); window.location.href = '/'; }}
              className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all ml-2"
              title="Exit Dashboard"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>


      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 transition-all relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Uniswap-style Sliding Drawer */}
      <AnimatePresence>
        {showWalletModal && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWalletModal(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] cursor-pointer"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-[380px] sm:w-[420px] bg-[#0a0a0e] border-l border-white/10 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] p-6 z-[100] font-inter flex flex-col cursor-default"
            >
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {!isConnected ? (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-8 mt-2">
                        <h3 className="font-space text-xl font-bold uppercase text-white">Connect Wallet</h3>
                        <button onClick={() => setShowWalletModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">✕</button>
                    </div>
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => {
                          const inj = connectors.find(c => c.id === 'injected' || c.id === 'metaMask');
                          if (inj) connect({ connector: inj });
                        }}
                        className="flex items-center justify-between px-5 py-5 bg-gradient-to-r from-indigo-600/20 to-indigo-900/10 rounded-2xl border border-indigo-500/30 hover:border-indigo-500/60 transition-all group shadow-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:scale-105 transition-transform">
                            <img src="/LOGO/wyler_glow_logo.png" className="w-6 h-6 object-contain" alt="Wyler" />
                          </div>
                          <div className="flex flex-col items-start">
                            <span className="font-bold text-base text-indigo-400">Wyler L3 Vault</span>
                            <span className="text-[10px] text-gray-400 font-medium">Fastest & Gasless</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-indigo-400 font-bold uppercase bg-indigo-500/10 px-2 py-1 rounded-md">Popular</span>
                      </button>
                      
                      <div className="flex items-center gap-4 my-4">
                        <div className="h-[1px] flex-1 bg-white/5" />
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">Other Wallets</span>
                        <div className="h-[1px] flex-1 bg-white/5" />
                      </div>
                      
                      {connectors.map((c) => (
                          <button 
                              key={c.uid}
                              onClick={() => { connect({ connector: c }); }}
                              className="flex items-center justify-between px-5 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                          >
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform text-gray-300">
                                    <WalletIcon size={20} />
                                  </div>
                                  <span className="font-bold text-sm tracking-wide text-white">{c.name}</span>
                              </div>
                              <span className="text-[10px] text-gray-500 font-bold uppercase bg-white/5 px-2 py-1 rounded-md">Detected</span>
                          </button>
                      ))}
                    </div>
                    <div className="mt-auto pt-8">
                      <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest leading-relaxed">
                        By connecting a wallet, you agree to Wyler Chain's <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a> and acknowledge that you have read and understand the <a href="#" className="text-indigo-400 hover:underline">Protocol Disclaimer</a>.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    {chainId !== NetworkConfig.chainIdDecimal ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-10 mt-10">
                        <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 mb-6">
                          <AlertCircle size={40} className="text-orange-500" />
                        </div>
                        <h3 className="font-space text-2xl font-bold uppercase text-white mb-3">Wrong Network</h3>
                        <p className="text-gray-400 text-sm mb-10 max-w-[250px]">Please switch to the Wyler Chain L3 testnet to interact with the dashboard.</p>
                        <button 
                          onClick={() => switchChain({ chainId: NetworkConfig.chainIdDecimal })}
                          className="w-full py-5 bg-orange-500/10 border border-orange-500/50 text-orange-400 font-bold rounded-2xl uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                        >
                          {isSwitching ? <Loader2 size={18} className="animate-spin" /> : <SwitchCamera size={18} />}
                          Switch Network
                        </button>
                        <button onClick={() => setShowWalletModal(false)} className="mt-6 text-xs text-gray-500 hover:text-white uppercase tracking-widest font-bold">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-8 mt-2">
                          <h3 className="font-space text-xl font-bold uppercase text-white">Your Wallet</h3>
                          <button onClick={() => setShowWalletModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">✕</button>
                        </div>
                        
                        <div className="bg-gradient-to-br from-indigo-900/20 to-black rounded-3xl p-6 border border-indigo-500/20 mb-6 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <WalletIcon size={120} className="text-indigo-500" />
                          </div>
                          <div className="relative z-10">
                            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em] mb-4">Connected Address</p>
                            <div className="flex items-center gap-4 mb-2">
                              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                                WC
                              </div>
                              <span className="font-bold text-2xl text-white font-space tracking-wider">
                                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          <button onClick={copyToClipboard} className="flex flex-col items-center justify-center gap-2 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all text-xs font-bold text-gray-300 group">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-indigo-400 transition-colors"><Copy size={14} /></div>
                            Copy Address
                          </button>
                          <a href={`${NetworkConfig.explorerUrl}/address/${address}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-2 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all text-xs font-bold text-gray-300 group">
                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-indigo-400 transition-colors"><ExternalLink size={14} /></div>
                            View Explorer
                          </a>
                        </div>
                        
                        <div className="mt-auto pt-8">
                          <button 
                            onClick={() => { disconnect(); setShowWalletModal(false); }}
                            className="w-full py-5 bg-red-500/5 border border-red-500/20 text-red-400 font-bold rounded-2xl uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                          >
                            <LogOut size={18} /> Disconnect Wallet
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
