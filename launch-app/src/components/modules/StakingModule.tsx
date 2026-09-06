"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Plus,
  ArrowUpCircle,
  Trophy,
  History
} from "lucide-react";
import AnimatedTabs from "@/components/ui/AnimatedTabs";

export default function StakingModule() {
  const tiers = [
    { name: "Bronze", min: "0", apy: "4.5%", color: "bg-orange-500/20 text-orange-500" },
    { name: "Silver", min: "5K", apy: "6.2%", color: "bg-blue-400/20 text-blue-400" },
    { name: "Gold", min: "25K", apy: "8.5%", color: "bg-yellow-500/20 text-yellow-500" },
    { name: "Platinum", min: "100K", apy: "12.4%", color: "bg-primary/20 text-primary" },
  ];

  const validators = [
    { name: "Wyler Core Node #1", uptime: "99.98%", commission: "5%", staked: "1.2M", apy: "12.4%" },
    { name: "Sui Frontier", uptime: "99.99%", commission: "3%", staked: "850K", apy: "11.2%" },
    { name: "Liquid Pulse", uptime: "98.5%", commission: "0%", staked: "420K", apy: "13.5%" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-primary text-[10px] font-bold mb-1 uppercase tracking-[0.3em]">Protocol Yields</p>
          <h2 className="text-4xl font-space font-bold tracking-tighter uppercase shimmer-text">Liquid Staking</h2>
        </div>
        <div className="flex items-center gap-4">
          <AnimatedTabs
            tabs={[
              { id: "staking", label: "Liquid Staking" },
              { id: "social", label: "Wyler Social" },
            ]}
          />
          <button className="px-6 py-2.5 btn-brand text-white font-bold rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Plus size={16} /> Stake WYLR
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-surface-low to-surface border border-border/50 p-8 rounded-[32px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              <Zap size={14} /> Active Staking State
            </div>
            <p className="text-muted font-medium mb-2">My Staked Balance</p>
            <h3 className="text-5xl font-space font-bold mb-2">5,000.00 <span className="text-primary-dim text-3xl">WYLR</span></h3>
            <p className="text-muted font-medium">≈ $1,500.00 USD</p>
          </div>
          <div className="flex items-center gap-10 mt-10">
            <div>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Current APY</p>
              <p className="text-xl font-space font-bold text-green-500">12.4%</p>
            </div>
            <div>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Lock Period</p>
              <p className="text-xl font-space font-bold">30 Days</p>
            </div>
            <div>
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Status</p>
              <p className="text-xl font-space font-bold text-primary">Compounding</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-surface-low border border-border/50 p-8 rounded-[32px] flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-muted font-medium mb-2">Unclaimed Rewards</p>
            <h3 className="text-4xl font-space font-bold mb-4">142.25 <span className="text-primary-dim text-xl">WYLR</span></h3>
            <div className="flex items-center gap-2 text-muted text-xs font-bold font-inter bg-surface/50 border border-border/30 w-fit px-3 py-1.5 rounded-lg mb-6">
              <Clock size={12} /> Claims in 4d 12h
            </div>
            <button className="w-full py-3 bg-surface-highest border border-border text-foreground font-bold rounded-xl hover:bg-surface-high transition-colors">
              Claim Rewards
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 text-primary/10 -rotate-12">
            <Trophy size={140} />
          </div>
        </div>

        <div className="lg:col-span-1 bg-surface-low border border-border/50 p-8 rounded-[32px] flex flex-col justify-between">
          <div>
            <p className="text-muted font-medium mb-2">Annual Projection</p>
            <h3 className="text-4xl font-space font-bold mb-4">+620.00 <span className="text-primary-dim text-xl">WYLR</span></h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Monthly</span>
                <span className="text-xs font-bold">+51.66</span>
              </div>
              <div className="h-[1px] bg-border/20" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Efficiency</span>
                <span className="text-xs font-bold text-green-500">99.8%</span>
              </div>
            </div>
          </div>
          <button className="w-full py-3 text-muted hover:text-foreground text-xs font-bold flex items-center justify-center gap-2">
            <TrendingUp size={14} /> Rewards Calculator
          </button>
        </div>
      </div>

      {/* Tier & Validators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tiers */}
        <div className="lg:col-span-1">
          <h4 className="text-xl font-space font-bold mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-primary" /> Staking Tiers
          </h4>
          <div className="flex flex-col gap-3">
            {tiers.map((tier) => (
              <div key={tier.name} className="flex items-center justify-between p-5 bg-surface-low border border-border/50 rounded-2xl group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${tier.color}`}>
                    {tier.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{tier.name} Tier</p>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Min. {tier.min} WYLR</p>
                  </div>
                </div>
                <p className="text-lg font-space font-bold text-primary">{tier.apy} APY</p>
              </div>
            ))}
          </div>
        </div>

        {/* Validators */}
        <div className="lg:col-span-2">
          <h4 className="text-xl font-space font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" /> Top Validators
          </h4>
          <div className="bg-surface-low border border-border/50 rounded-3xl overflow-hidden">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className="border-b border-border/30 bg-surface/50">
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted">Validator</th>
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted">Staked</th>
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted">Uptime</th>
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted">Commission</th>
                    <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-muted">APY</th>
                    <th className="p-5"></th>
                 </tr>
               </thead>
               <tbody>
                 {validators.map((v) => (
                   <tr key={v.name} className="border-b border-border/20 hover:bg-surface/30 transition-colors group">
                      <td className="p-5 font-bold text-sm tracking-wide">{v.name}</td>
                      <td className="p-5 font-medium text-sm">{v.staked} WYLR</td>
                      <td className="p-5 font-bold text-sm text-green-500">{v.uptime}</td>
                      <td className="p-5 font-medium text-sm">{v.commission}</td>
                      <td className="p-5 font-space font-bold text-primary">{v.apy}</td>
                      <td className="p-5 text-right">
                        <button className="p-2 text-muted group-hover:text-primary transition-colors">
                          <Plus size={18} />
                        </button>
                      </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
          <button className="mt-8 text-muted hover:text-foreground text-xs font-bold flex items-center gap-2 h-fit">
            <History size={14} /> View staking history
          </button>
        </div>
      </div>
    </div>
  );
}
