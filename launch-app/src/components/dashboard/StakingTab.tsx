"use client";

import React from "react";
import { 
  Zap, 
  Lock, 
  TrendingUp, 
  History, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function StakingTab() {
  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OverviewItem label="Current Staked" value="1,200.00 WYLER" subValue="$2,400.00 USD" icon={<Lock className="text-primary" size={20} />} />
        <OverviewItem label="Total Rewards" value="142.50 WYLER" subValue="+$285.00 USD" icon={<Zap className="text-accent-gold" size={20} />} />
        <OverviewItem label="Average APY" value="24.8%" subValue="Yield Class: Tier 2" icon={<TrendingUp className="text-accent-green" size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Staking Positions */}
        <div className="glass-card">
          <h3 className="font-space font-bold text-lg uppercase tracking-widest mb-8">Active Tiers</h3>
          <div className="space-y-4">
            <TierRow name="Genesis Oracle" apy="32.5%" min="5,000" status="LOCKED" date="Next Unlock: 12 Days" />
            <TierRow name="Core Validator" apy="24.8%" min="1,000" status="ACTIVE" active={true} />
            <TierRow name="Protocol Node" apy="18.2%" min="100" status="ACTIVE" />
          </div>
          <button className="w-full mt-8 btn-brand">Stake More WYLER</button>
        </div>

        {/* Reward History */}
        <div className="glass-card">
          <h3 className="font-space font-bold text-lg uppercase tracking-widest mb-8 flex justify-between items-center">
            <span>Reward History</span>
            <span className="text-[10px] text-primary cursor-pointer hover:underline">View All</span>
          </h3>
          <div className="space-y-4">
            <HistoryItem amount="+12.4 WYLER" type="Epoch Reward" date="April 12, 2026" />
            <HistoryItem amount="+8.2 WYLER" type="Governance Bonus" date="April 05, 2026" />
            <HistoryItem amount="+11.9 WYLER" type="Epoch Reward" date="March 28, 2026" />
            <HistoryItem amount="+45.0 WYLER" type="Early Adopter" date="March 15, 2026" />
          </div>
        </div>
      </div>

      {/* Validator Selection Preview */}
      <div className="glass-card !p-8">
         <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="font-space font-bold text-lg uppercase tracking-widest mb-1">Top Active Validators</h3>
              <p className="text-white/40 text-xs">Secure the network and earn rewards by delegating your tokens.</p>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold uppercase text-[10px] tracking-widest hover:gap-3 transition-all">
               Browse All <ChevronRight size={14} />
            </button>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ValidatorCard name="Nexus Hub" fee="2%" uptime="99.9%" score="98" />
            <ValidatorCard name="Wyler Core" fee="0%" uptime="100%" score="100" />
            <ValidatorCard name="Titan Node" fee="5%" uptime="99.5%" score="92" />
            <ValidatorCard name="Aura Stake" fee="1%" uptime="99.8%" score="95" />
         </div>
      </div>
    </div>
  );
}

function OverviewItem({ label, value, subValue, icon }: any) {
  return (
    <div className="glass-card relative group hover:border-primary/30">
      <div className="absolute top-4 right-4">{icon}</div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">{label}</p>
      <h4 className="font-space font-bold text-2xl mb-1">{value}</h4>
      <p className="text-xs text-white/50">{subValue}</p>
    </div>
  );
}

function TierRow({ name, apy, min, status, active = false, date }: any) {
  return (
    <div className={`p-5 rounded-2xl border ${active ? 'bg-primary/5 border-primary/30' : 'bg-white/5 border-white/5'} flex items-center justify-between`}>
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full ${active ? 'bg-accent-green animate-pulse shadow-[0_0_10px_rgba(0,255,148,0.5)]' : 'bg-white/20'}`} />
        <div>
          <p className="font-space font-bold uppercase text-xs tracking-widest">{name}</p>
          <p className="text-[9px] text-white/40 uppercase tracking-widest">Min. Stake: {min} WYLER</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-space font-bold text-accent-green">{apy}</p>
        <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">{date || status}</p>
      </div>
    </div>
  );
}

function HistoryItem({ amount, type, date }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-accent-gold/5 flex items-center justify-center text-accent-gold">
          <Zap size={14} />
        </div>
        <div>
          <p className="font-bold text-xs">{type}</p>
          <p className="text-[10px] text-white/40">{date}</p>
        </div>
      </div>
      <p className="font-space font-bold text-accent-green">{amount}</p>
    </div>
  );
}

function ValidatorCard({ name, fee, uptime, score }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all">
          {name[0]}
        </div>
        <div className="flex flex-col items-end">
          <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">Network Score</p>
          <div className="flex items-center gap-1 text-accent-green">
             <ShieldCheck size={10} />
             <span className="font-space font-bold text-xs">{score}%</span>
          </div>
        </div>
      </div>
      <h4 className="font-space font-bold text-sm mb-4">{name}</h4>
      <div className="flex justify-between pt-4 border-t border-white/5">
        <div>
          <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">Commission</p>
          <p className="font-bold text-[10px]">{fee}</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] font-bold uppercase tracking-widest text-white/30">Uptime</p>
          <p className="font-bold text-[10px] text-accent-green">{uptime}</p>
        </div>
      </div>
    </div>
  );
}
