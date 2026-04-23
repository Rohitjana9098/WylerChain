"use client";

import React from "react";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Repeat, 
  Zap,
  TrendingUp,
  Shield,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";

export default function WalletTab() {
  return (
    <div className="space-y-8">
      {/* Main Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 glass-card !p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
          
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Total Combined Balance</p>
              <h2 className="text-5xl font-space font-bold tracking-tighter shimmer-text">$12,854.20</h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20">
              <TrendingUp size={14} className="text-accent-green" />
              <span className="text-[10px] font-bold text-accent-green uppercase tracking-widest">+12.5%</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <ActionButton icon={<ArrowUpRight size={18} />} label="Send" />
            <ActionButton icon={<ArrowDownLeft size={18} />} label="Receive" />
            <ActionButton icon={<Repeat size={18} />} label="Bridge" />
            <ActionButton icon={<Zap size={18} />} label="Stake" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <StatMiniCard icon={<Shield size={18} className="text-primary" />} label="Security" value="Passkey Active" subValue="Hardware Locked" />
          <StatMiniCard icon={<Activity size={18} className="text-accent-cyan" />} label="Network" value="Wyler L3" subValue="Arbitrum One" />
        </div>
      </motion.div>

      {/* Asset Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AssetCard symbol="WYLER" name="Wyler Token" balance="2,400.00" value="$4,800.00" />
        <AssetCard symbol="ETH" name="Ethereum" balance="3.42" value="$7,524.12" />
        <AssetCard symbol="USDC" name="USD Coin" balance="520.00" value="$520.00" />
        <AssetCard symbol="ARB" name="Arbitrum" balance="10.08" value="$10.08" />
      </div>

      {/* Transactions */}
      <div className="glass-card !p-8">
        <h3 className="font-space font-bold text-lg uppercase tracking-widest mb-8 flex items-center gap-3">
          <Activity size={20} className="text-primary" />
          Recent Protocol Activity
        </h3>
        <div className="space-y-4">
          <TransactionItem type="RECEIVED" amount="+25.0 ETH" from="0x4...2f1" status="SUCCESS" date="2 mins ago" />
          <TransactionItem type="STAKED" amount="-100.0 WYLER" from="Wyler Pool" status="PENDING" date="15 mins ago" />
          <TransactionItem type="MINTED" amount="NFT #1284" from="Wyler AI" status="SUCCESS" date="1 hour ago" />
          <TransactionItem type="TIP" amount="-5.0 WYLER" from="@arivera" status="SUCCESS" date="3 hours ago" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all font-space font-bold uppercase text-[10px] tracking-widest">
      {icon}
      {label}
    </button>
  );
}

function StatMiniCard({ icon, label, value, subValue }: any) {
  return (
    <div className="glass-card flex items-center gap-4 !p-5 hover:scale-105">
      <div className="w-12 h-12 rounded-xl bg-surface-high flex items-center justify-center border border-white/5 shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
        <p className="font-space font-bold text-sm tracking-tight">{value}</p>
        <p className="text-[9px] font-bold text-white/50">{subValue}</p>
      </div>
    </div>
  );
}

function AssetCard({ symbol, name, balance, value }: any) {
  return (
    <div className="glass-card hover:bg-surface-high group">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xs mb-4 group-hover:bg-primary transition-colors">
        {symbol[0]}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">{name}</p>
      <h4 className="font-space font-bold text-xl mb-1">{balance} {symbol}</h4>
      <p className="text-xs text-white/50">{value}</p>
    </div>
  );
}

function TransactionItem({ type, amount, from, status, date }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'SUCCESS' ? 'bg-accent-green/10 text-accent-green' : 'bg-accent-gold/10 text-accent-gold'}`}>
          <ArrowUpRight size={18} />
        </div>
        <div>
          <p className="font-space font-bold text-xs uppercase tracking-widest">{type}</p>
          <p className="text-[10px] text-white/40">{from} • {date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-space font-bold ${amount.startsWith('+') ? 'text-accent-green' : 'text-white'}`}>{amount}</p>
        <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${status === 'SUCCESS' ? 'text-accent-green' : 'text-accent-gold'}`}>{status}</p>
      </div>
    </div>
  );
}
