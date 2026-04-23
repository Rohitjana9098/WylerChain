"use client";

import React from "react";
import { 
  Compass, 
  TrendingUp, 
  Zap, 
  Globe, 
  ArrowUpRight,
  Database,
  Layers,
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";

export default function ExploreTab() {
  return (
    <div className="space-y-8">
      {/* Search & Stats Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card flex flex-col justify-center gap-6">
           <h2 className="text-3xl font-space font-bold uppercase tracking-tight">Explore the <span className="text-primary italic">Protocol</span></h2>
           <div className="relative">
              <Compass className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input 
                type="text" 
                placeholder="Search tx hash, wallet, NFT or creator..." 
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 focus:outline-none transition-all"
              />
           </div>
        </div>
        <div className="glass-card bg-primary/10 border-primary/20 flex flex-col justify-center items-center text-center p-8">
           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-2">Total Value Locked</p>
           <h3 className="text-4xl font-space font-bold shimmer-text">$1.2B</h3>
           <p className="text-accent-green text-[10px] font-bold mt-2 font-mono">+12.4% THIS EPOCH</p>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ExploreCategory icon={<TrendingUp size={20} />} label="Top Creators" />
        <ExploreCategory icon={<Zap size={20} />} label="Hot Collections" />
        <ExploreCategory icon={<Globe size={20} />} label="Eco Projects" />
        <ExploreCategory icon={<Database size={20} />} label="Data Index" />
      </div>

      {/* Protocol Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card">
           <div className="flex justify-between items-center mb-10">
              <h3 className="font-space font-bold text-lg uppercase tracking-widest flex items-center gap-3">
                 <Layers size={20} className="text-primary" />
                 L3 Network Metrics
              </h3>
              <div className="px-2 py-0.5 rounded bg-accent-green/10 text-accent-green text-[8px] font-bold uppercase tracking-widest border border-accent-green/20">Operational</div>
           </div>
           
           <div className="space-y-6">
              <MetricBar label="Network TPS" value="8,400" percentage={84} color="bg-primary" />
              <MetricBar label="Data Availability" value="99.9%" percentage={99} color="bg-accent-cyan" />
              <MetricBar label="Block Finality" value="0.2s" percentage={95} color="bg-accent-green" />
           </div>
        </div>

        <div className="glass-card relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Cpu size={120} />
           </div>
           <h3 className="font-space font-bold text-lg uppercase tracking-widest mb-6">Wyler AI Insights</h3>
           <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-sm">Wyler's integrated AI agent continuously monitors the L3 execution layer for optimal yield routes and potential security threats.</p>
           <ul className="space-y-4">
              <li className="flex items-center gap-3 text-xs text-white/70">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                 Optimal Staking: Nexus Pool (24.8% APY)
              </li>
              <li className="flex items-center gap-3 text-xs text-white/70">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
                 New Creator Alert: @pixel_ghost just joined
              </li>
              <li className="flex items-center gap-3 text-xs text-white/70">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-green" />
                 Gas Market: Constant Zero-Fee Threshold
              </li>
           </ul>
        </div>
      </div>
    </div>
  );
}

function ExploreCategory({ icon, label }: any) {
  return (
    <div className="glass-card flex flex-col items-center justify-center gap-4 !p-6 hover:bg-primary/5 cursor-pointer border border-white/5 group">
      <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all scale-110">
        {icon}
      </div>
      <p className="font-space font-bold text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">{label}</p>
    </div>
  );
}

function MetricBar({ label, value, percentage, color }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
         <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{label}</p>
         <p className="font-space font-bold">{value}</p>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
         <motion.div 
           initial={{ width: 0 }}
           animate={{ width: `${percentage}%` }}
           transition={{ duration: 1.5, delay: 0.5 }}
           className={`h-full ${color}`} 
         />
      </div>
    </div>
  );
}
