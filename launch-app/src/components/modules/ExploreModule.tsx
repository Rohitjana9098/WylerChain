"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  TrendingUp, 
  Activity, 
  Users, 
  ImageIcon, 
  Rocket,
  ChevronRight,
  Settings,
  ExternalLink,
  Droplet,
  Loader2,
  Check,
  Zap,
  ArrowUpRight,
  TrendingDown
} from "lucide-react";
import { useAccount } from "wagmi";
import { NetworkConfig } from "@/config/network";
import AnimatedTabs from "@/components/ui/AnimatedTabs";
import NetworkSetup from "./NetworkSetup";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function ExploreModule() {
  const { address, isConnected } = useAccount();

  const trendingCollections = [
    { name: "Wyler Origin Pass", items: "1,000", volume: "450K", floor: "2,500", change: "+14.2%", positive: true },
    { name: "Neon Drifters", items: "5,555", volume: "120K", floor: "320", change: "+8.7%", positive: true },
    { name: "Flux Labs Genesis", items: "500", volume: "85K", floor: "1,200", change: "-2.4%", positive: false },
  ];

  const recentActivity = [
    { user: "0x7a...f21", action: "Staked", asset: "12,000 WYLR", time: "2m ago", icon: "💎" },
    { user: "Luna Digital", action: "Minted", asset: "Obsidian Core #45", time: "15m ago", icon: "🎨" },
    { user: "0x3b...e92", action: "Purchased", asset: "Neon Drifter #12", time: "45m ago", icon: "🛒" },
    { user: "Neon Ghost", action: "Received Tip", asset: "450 WYLR", time: "1h ago", icon: "⚡" },
  ];

  return (
    <div className="flex flex-col gap-10 pb-20 font-inter">
      {/* Module Header with Animated Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-primary text-[10px] font-bold mb-1 uppercase tracking-[0.3em]">Protocol Assets</p>
          <h2 className="text-4xl font-space font-bold tracking-tighter uppercase shimmer-text">Explore the Ecosystem</h2>
        </div>
        <AnimatedTabs
          tabs={[
            { id: "collections", label: "NFT Collections" },
            { id: "ecosystem", label: "Explore the Ecosystem" },
          ]}
        />
      </div>

      {/* Hero Header */}
      <div className="relative h-fit w-full bg-gradient-to-br from-surface-highest via-[#09090e] to-surface-high border border-white/5 rounded-[40px] overflow-hidden p-8 md:p-12 text-center shadow-2xl group/hero">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] opacity-60 group-hover/hero:scale-125 transition-transform duration-1000" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] opacity-60 group-hover/hero:scale-125 transition-transform duration-1000 delay-200" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.015] via-transparent to-transparent opacity-60 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
           <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full w-fit mb-6">
              <Compass size={14} className="text-indigo-400 animate-spin-slow" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Discover the Network</span>
           </div>
           
           <h2 className="text-4xl md:text-6xl font-space font-black uppercase tracking-tight text-white mb-6 leading-none">
             Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 font-bold">Ecosystem</span>
           </h2>
           
           <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mb-10 font-light font-inter">
             Discover top-performing creators, trending NFT collections, and live transactions happening right now across the WylerChain Layer 3.
           </p>
           
           <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md">
              <div className="flex-1 min-w-[140px] bg-black/40 border border-white/5 p-4 rounded-2xl text-left hover:border-indigo-500/30 transition-all duration-300 shadow-lg group/item">
                 <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 group-hover/item:text-indigo-400 transition-colors">Active Wallets</p>
                 <p className="text-2xl font-space font-black text-white flex items-center gap-1.5">
                   12.4K <span className="text-[10px] text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded font-mono font-bold">+18%</span>
                 </p>
              </div>
              <div className="flex-1 min-w-[140px] bg-black/40 border border-white/5 p-4 rounded-2xl text-left hover:border-indigo-500/30 transition-all duration-300 shadow-lg group/item">
                 <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 group-hover/item:text-indigo-400 transition-colors">Total Value Locked</p>
                 <p className="text-2xl font-space font-black text-white flex items-center gap-1.5">
                   $1.2M+ <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded font-mono font-bold">Active</span>
                 </p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending Collections */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-space font-bold flex items-center gap-3 text-white">
                <TrendingUp size={22} className="text-primary animate-pulse" /> Trending Collections
              </h3>
              <button className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                All Stats <ChevronRight size={12} />
              </button>
           </div>

           <div className="flex flex-col gap-4">
             {trendingCollections.map((col, idx) => (
               <div key={col.name} className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 p-1 rounded-3xl hover:border-primary/30 transition-all duration-500 cursor-pointer group hover:shadow-[0_0_20px_rgba(79,70,229,0.1)]">
                  <div className="bg-[#050508]/40 p-5 rounded-[22px] flex items-center justify-between">
                     <div className="flex items-center gap-5">
                        <span className="text-base font-space font-bold text-gray-500 group-hover:text-primary transition-colors w-6 text-center">{idx + 1}</span>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-space font-bold transition-transform duration-500 group-hover:scale-105 shadow-inner">
                           {col.name[0]}
                        </div>
                        <div>
                           <p className="text-base font-bold text-gray-200 group-hover:text-white transition-colors tracking-wide">{col.name}</p>
                           <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{col.items} Items</p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-8 pr-2">
                        <div className="text-right hidden sm:block">
                           <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">Floor Price</p>
                           <p className="font-space font-extrabold text-white text-sm">{col.floor} <span className="text-[9px] text-indigo-400 font-medium">WYLR</span></p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1">7D Volume</p>
                           <p className="font-space font-extrabold text-primary text-sm">{col.volume} <span className="text-[9px] text-indigo-400 font-medium">WYLR</span></p>
                        </div>
                        <div className={`w-14 text-right text-xs font-bold font-mono ${col.positive ? "text-green-500" : "text-red-400"}`}>
                          {col.change}
                        </div>
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Live Activity Feed (Network Pulse) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-space font-bold flex items-center gap-3 text-white">
                <Activity size={22} className="text-primary animate-pulse" /> Network Pulse
              </h3>
           </div>

           <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-[36px] p-6 flex flex-col gap-2 overflow-hidden h-full shadow-lg hover:border-indigo-500/20 transition-all duration-500">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex flex-col gap-1 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-3 rounded-xl transition-all duration-300 group cursor-pointer">
                   <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">{activity.icon}</span>
                        <p className="text-xs font-bold text-gray-300 group-hover:text-primary transition-colors">{activity.user}</p>
                      </div>
                      <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest font-mono">{activity.time}</span>
                   </div>
                   <p className="text-xs text-gray-400 flex items-center gap-1.5 font-inter">
                     {activity.action} <span className="text-white font-extrabold">{activity.asset}</span>
                   </p>
                </div>
              ))}
              
              <a 
                href={NetworkConfig.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-4 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary text-gray-300 hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] group"
              >
                <Rocket size={14} className="text-primary group-hover:text-white transition-colors" /> Explorer Dashboard
              </a>
           </div>
        </div>
      </div>

      {/* Discovery CTA and Testnet Faucet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <DiscoveryCTA 
              icon={<Users size={20} />}
              title="Creators to Watch" 
              description="Artificial intelligence curated creators who are pushing the boundaries of L3 utility on WylerChain."
              theme="purple"
            />
            <DiscoveryCTA 
              icon={<ImageIcon size={20} />}
              title="Mint Opportunities" 
              description="Join exclusive whitelists and allocations for upcoming genesis collection drops."
              theme="blue"
            />
         </div>
         
         <div className="col-span-1">
            <TestnetFaucet address={address} isConnected={isConnected} />
         </div>
      </div>

      {/* Network Configuration Section */}
      <NetworkSetup />
    </div>
  );
}

function DiscoveryCTA({ 
  icon, 
  title, 
  description,
  theme = "purple"
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  theme?: "purple" | "blue"
}) {
  const borderGlow = theme === "purple"
    ? "hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
    : "hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]";

  const iconColor = theme === "purple"
    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
    : "bg-blue-500/10 text-blue-400 border-blue-500/20";

  return (
    <div className={`p-8 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-[32px] group transition-all duration-500 flex flex-col justify-between min-h-[220px] ${borderGlow}`}>
      <div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-inner mb-4 transition-transform duration-500 group-hover:scale-105 ${iconColor}`}>
          {icon}
        </div>
        <h4 className="text-xl font-space font-bold text-gray-200 group-hover:text-white transition-colors mb-2">{title}</h4>
        <p className="text-gray-500 text-xs leading-relaxed font-light font-inter">{description}</p>
      </div>
      <button className="mt-6 flex items-center gap-2 text-[9px] font-bold text-primary hover:text-white uppercase tracking-widest hover:translate-x-2 transition-all duration-300">
        Explore Portal <ChevronRight size={14} />
      </button>
    </div>
  );
}

function TestnetFaucet({ address, isConnected }: { address: string | undefined, isConnected: boolean }) {
  const [status, setStatus] = React.useState<"idle" | "claiming" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleClaim = async () => {
    if (!isConnected || !address) return;
    setStatus("claiming");
    setErrorMessage(null);
    
    try {
      const response = await fetch("/api/faucet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setErrorMessage(data.error || "Transaction failed");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
        return;
      }
      
      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
      
    } catch (e: any) {
      console.error(e);
      setErrorMessage("Network error occurred.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-950/20 to-black border border-indigo-500/20 shadow-[0_0_35px_rgba(79,70,229,0.15)] hover:border-indigo-500/40 rounded-[32px] group transition-all duration-500 flex flex-col h-full items-center text-center relative overflow-hidden">
      {/* Background Dotted Matrix or Cyber Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent opacity-60 pointer-events-none" />
      
      <div className="absolute top-0 right-0 p-4 opacity-5 text-indigo-400 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
         <Droplet size={90} />
      </div>
      
      <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/30 mb-6 shadow-inner group-hover:scale-105 transition-transform duration-500 relative">
        <Droplet size={24} className="filter drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse" />
        {/* Drops ripple animation */}
        <span className="absolute inset-0 rounded-2xl border border-indigo-500/40 animate-ping opacity-25" />
      </div>
      
      <h4 className="text-xl font-space font-bold text-white mb-2 tracking-wide uppercase">Testnet Faucet</h4>
      <p className="text-gray-500 text-xs leading-relaxed font-light font-inter mb-8 px-2">
        Claim 10,000 free WYLR tokens daily to deploy, interact, and test your L3 modular applications.
      </p>
      
      <div className="mt-auto w-full flex flex-col gap-3">
         {status === "error" && (
           <p className="text-[9px] text-red-400 font-bold tracking-widest font-mono mb-1">{errorMessage}</p>
         )}
         
         <button 
           onClick={handleClaim}
           disabled={!isConnected || status !== "idle"}
           className={`w-full py-4 text-[9px] font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border cursor-pointer ${
             !isConnected ? "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed" :
             status === "success" ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] border-green-400 hover:scale-105" :
             status === "error" ? "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20" :
             status === "claiming" ? "bg-indigo-600 border-indigo-500 text-white cursor-wait" :
             "bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] text-white border-indigo-500 hover:scale-[1.02]"
           }`}
         >
           {!isConnected ? "Connect Wallet Required" :
            status === "claiming" ? <><Loader2 size={14} className="animate-spin text-white" /> Allocating...</> :
            status === "success" ? <><Check size={14} /> Allocated 10,000 WYLR</> :
            status === "error" ? "Failed to Claim" :
            "Claim Testnet Tokens"
           }
         </button>
      </div>
    </div>
  );
}
