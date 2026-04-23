"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Compass, 
  TrendingUp, 
  Activity, 
  Eye, 
  Users, 
  ImageIcon, 
  Rocket,
  ChevronRight,
  Copy,
  Check,
  Settings,
  ExternalLink,
  Droplet,
  Loader2
} from "lucide-react";
import { useAccount } from "wagmi";
import { NetworkConfig } from "@/config/network";
import AnimatedTabs from "@/components/ui/AnimatedTabs";
import NetworkSetup from "./NetworkSetup";

export default function ExploreModule() {
  const { address, isConnected } = useAccount();

  const trendingCollections = [
    { name: "Wyler Origin Pass", items: "1,000", volume: "450K", floor: "2,500" },
    { name: "Neon Drifters", items: "5,555", volume: "120K", floor: "320" },
    { name: "Flux Labs Genesis", items: "500", volume: "85K", floor: "1,200" },
  ];

  const recentActivity = [
    { user: "0x7a...f21", action: "Staked", asset: "12,000 WYLR", time: "2m ago" },
    { user: "Luna Digital", action: "Minted", asset: "Obsidian Core #45", time: "15m ago" },
    { user: "0x3b...e92", action: "Purchased", asset: "Neon Drifter #12", time: "45m ago" },
    { user: "Neon Ghost", action: "Received Tip", asset: "450 WYLR", time: "1h ago" },
  ];

  return (
    <div className="flex flex-col gap-10 pb-20">
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
      <div className="relative h-[400px] w-full bg-surface-low border border-border/50 rounded-[40px] overflow-hidden flex flex-col items-center justify-center p-8 text-center">
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-primary-dim/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        
        <div className="relative z-10 max-w-2xl">
           <div className="flex items-center gap-3 bg-background/50 backdrop-blur-md border border-border/50 px-4 py-2 rounded-full w-fit mx-auto mb-6">
              <Compass size={16} className="text-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Discover the Network</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">Explore the <span className="text-gradient">Ecosystem</span></h2>
           <p className="text-muted text-lg font-inter mb-10">
             Discover top performing creators, trending NFT collections, and live protocol activity all on the WylerChain L3.
           </p>
           <div className="flex items-center justify-center gap-4">
              <div className="p-4 bg-surface rounded-2xl border border-border/50 text-left min-w-[140px]">
                 <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Active Users</p>
                 <p className="text-xl font-space font-bold">12.4K</p>
              </div>
              <div className="p-4 bg-surface rounded-2xl border border-border/50 text-left min-w-[140px]">
                 <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Total TVL</p>
                 <p className="text-xl font-space font-bold">$1.2M+</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending Collections */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-space font-bold flex items-center gap-2">
                <TrendingUp size={24} className="text-primary" /> Trending Collections
              </h3>
              <button className="text-muted text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1">
                All Stats <ChevronRight size={14} />
              </button>
           </div>

           <div className="flex flex-col gap-4">
             {trendingCollections.map((col, idx) => (
               <div key={col.name} className="bg-surface-low border border-border/30 p-1 rounded-3xl hover:border-primary/20 transition-all cursor-pointer group">
                  <div className="bg-surface-low p-6 rounded-[22px] flex items-center justify-between">
                     <div className="flex items-center gap-6">
                        <span className="text-xl font-space font-bold text-muted w-6">{idx + 1}</span>
                        <div className="w-14 h-14 rounded-xl bg-surface-highest border border-border/50 flex items-center justify-center text-primary font-bold">
                           {col.name[0]} {col.name[6]}
                        </div>
                        <div>
                           <p className="text-lg font-bold group-hover:text-primary transition-colors">{col.name}</p>
                           <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{col.items} Items</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-10 pr-4">
                        <div className="text-right hidden sm:block">
                           <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-0.5">Floor</p>
                           <p className="font-space font-bold">{col.floor} WYLR</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-0.5">7D Volume</p>
                           <p className="font-space font-bold text-primary">{col.volume} WYLR</p>
                        </div>
                     </div>
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Live Activity Feed */}
        <div className="lg:col-span-1 flex flex-col gap-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-space font-bold flex items-center gap-2">
                <Activity size={24} className="text-primary" /> Network Pulse
              </h3>
           </div>

           <div className="bg-surface-low border border-border/30 rounded-[32px] p-6 flex flex-col gap-1 overflow-hidden h-full">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex flex-col gap-1 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-xl transition-colors group">
                   <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-bold font-inter text-foreground group-hover:text-primary transition-colors">{activity.user}</p>
                      <span className="text-[8px] text-muted font-bold uppercase tracking-widest">{activity.time}</span>
                   </div>
                   <p className="text-xs text-muted flex items-center gap-2 font-inter">
                     {activity.action} <span className="text-foreground/80 font-bold">{activity.asset}</span>
                   </p>
                </div>
              ))}
              
              <a 
                href={NetworkConfig.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full py-4 bg-surface-highest border border-border/50 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface transition-all"
              >
                <Rocket size={14} className="text-primary" /> Explorer Dashboard
              </a>
           </div>
        </div>
      </div>

      {/* Recommended for You & FAUCET */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <DiscoveryCTA 
              icon={<Users className="text-primary" />}
              title="Creators to Watch" 
              description="Artificial intelligence curated creators who are pushing the boundaries of L3 utility."
            />
            <DiscoveryCTA 
              icon={<ImageIcon className="text-primary" />}
              title="New Minting Opportunities" 
              description="Join exclusive whitelists for upcoming collection drops on WylerChain."
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


function DiscoveryCTA({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-surface-low border border-border/50 rounded-3xl group hover:border-primary/30 transition-all flex flex-col gap-4">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-space font-bold group-hover:text-primary transition-colors mb-2">{title}</h4>
        <p className="text-muted text-sm leading-relaxed font-inter">{description}</p>
      </div>
      <button className="mt-4 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest hover:translate-x-2 transition-transform">
        Explore <ChevronRight size={14} />
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
    <div className="p-8 bg-gradient-to-br from-indigo-900/20 to-black border border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.1)] rounded-3xl group transition-all flex flex-col h-full items-center text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
         <Droplet size={80} />
      </div>
      <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/50 mb-6 drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]">
        <Droplet size={28} />
      </div>
      <h4 className="text-xl font-space font-bold text-white mb-2 tracking-wide">Testnet Faucet</h4>
      <p className="text-muted text-sm leading-relaxed font-inter mb-8 px-4">
        Claim 10,000 WYLR daily to test WylerChain smart contracts and deployments.
      </p>
      
      <div className="mt-auto w-full flex flex-col gap-2">
         {status === "error" && (
           <p className="text-[10px] text-red-400 font-bold tracking-widest">{errorMessage}</p>
         )}
         <button 
           onClick={handleClaim}
           disabled={!isConnected || status !== "idle"}
           className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
             !isConnected ? "bg-white/5 border border-white/10 text-muted cursor-not-allowed" :
             status === "success" ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] border border-green-400" :
             status === "error" ? "bg-red-500/20 text-red-400 border border-red-500/50" :
             status === "claiming" ? "bg-indigo-600 border border-indigo-500 text-white cursor-wait" :
             "bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] text-white border border-indigo-500"
           }`}
         >
           {!isConnected ? "Connect Wallet" :
            status === "claiming" ? <><Loader2 size={14} className="animate-spin" /> Distributing...</> :
            status === "success" ? <><Check size={14} /> Claimed 10K WYLR!</> :
            status === "error" ? "Claim Failed" :
            "Claim Tokens"
           }
         </button>
      </div>
    </div>
  );
}
