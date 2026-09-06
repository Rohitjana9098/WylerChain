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
  ChevronRight
} from "lucide-react";
import AnimatedTabs from "@/components/ui/AnimatedTabs";

export default function ExploreModule() {
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
              
              <button className="mt-8 w-full py-4 bg-surface-highest border border-border/50 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-surface transition-all">
                <Rocket size={14} className="text-primary" /> Explorer Dashboard
              </button>
           </div>
        </div>
      </div>

      {/* Recommended for You */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
