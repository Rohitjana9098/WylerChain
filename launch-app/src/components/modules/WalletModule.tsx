"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Layers, 
  Wallet as WalletIcon, 
  ExternalLink,
  Plus,
  ArrowRight
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import LiveTransactionFeed from "@/components/ui/LiveTransactionFeed";
import AnimatedTabs from "@/components/ui/AnimatedTabs";

export default function WalletModule() {
  const [isSendOpen, setIsSendOpen] = React.useState(false);
  const transactions = [
    { id: 1, type: "SENT", amount: "450.00", symbol: "WYLR", to: "0x7a...f21", date: "2 mins ago", status: "Completed" },
    { id: 2, type: "RECEIVED", amount: "1,200.00", symbol: "WYLR", from: "0x3b...e92", date: "1 hour ago", status: "Completed" },
    { id: 3, type: "STAKED", amount: "5,000.00", symbol: "WYLR", to: "Wyler Validator", date: "4 hours ago", status: "Completed" },
    { id: 4, type: "MINTED", amount: "1.00", symbol: "NFT", to: "Wyler Origin #42", date: "1 day ago", status: "Completed" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-primary text-[10px] font-bold mb-1 uppercase tracking-[0.3em]">Main Account</p>
          <h2 className="text-4xl font-space font-bold tracking-tighter uppercase shimmer-text">Wallet Overview</h2>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Wyler Mainnet L3</span>
          </div>
          <AnimatedTabs
            tabs={[
              { id: "overview", label: "Wallet Overview" },
              { id: "yields", label: "Protocol Yields" },
            ]}
          />
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SpotlightCard className="lg:col-span-2 bg-gradient-to-br from-surface-highest to-surface-high border border-white/5 p-12 rounded-[40px] relative group shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <WalletIcon size={160} />
          </div>
          
          <div className="relative z-10">
            <p className="text-muted text-xs font-bold uppercase tracking-[0.2em] mb-4">Total Balance</p>
            <h3 className="text-7xl font-space font-bold mb-6 tracking-tighter">12,450.85 <span className="text-primary-dim">WYLR</span></h3>
            <p className="text-muted text-xl font-medium mb-10 flex items-center gap-3">
              ≈ $3,735.25 USD <span className="text-xs text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">+12.4%</span>
            </p>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-muted bg-black/50 border border-white/10 px-4 py-2 rounded-full tracking-wider">
                0x4f...e38c
              </span>
              <button className="p-2.5 text-muted hover:text-white hover:bg-white/5 rounded-full transition-all">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </SpotlightCard>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            <WalletAction icon={<ArrowUpRight />} label="Send" onClick={() => setIsSendOpen(true)} />
            <WalletAction icon={<ArrowDownLeft />} label="Receive" />

            <WalletAction icon={<Layers />} label="Bridge" />
            <WalletAction icon={<Plus />} label="Add Funds" />
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Tips Sent" value="842.00" subValue="24 Creators" />
        <KPICard label="NFTs Owned" value="12" subValue="Primary Collection" />
        <KPICard label="Staked Amount" value="5,000.00" subValue="12.4% APR" />
        <KPICard label="Token Price" value="$0.30" subValue="+12.4% (24h)" positive />
      </div>

      {/* 7. Live Transaction Feed + Static History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveTransactionFeed />

        <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-6">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-sm font-space font-bold uppercase tracking-widest">Transaction History</h4>
            <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="flex flex-col gap-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    tx.type === "SENT" ? "bg-red-500/10 text-red-400" :
                    tx.type === "RECEIVED" ? "bg-green-500/10 text-green-400" :
                    "bg-primary/10 text-primary"
                  }`}>
                    {tx.type === "SENT" ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{tx.type} {tx.symbol === "NFT" ? "Asset" : "WYLR"}</p>
                    <p className="text-[10px] text-muted">{tx.to || tx.from}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-bold ${
                    tx.type === "SENT" ? "text-red-400" :
                    tx.type === "RECEIVED" ? "text-green-400" : "text-primary"
                  }`}>
                    {tx.type === "SENT" ? "−" : "+"}{tx.amount} {tx.symbol}
                  </p>
                  <p className="text-[10px] text-muted">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} title="Send Assets">
        <div className="flex flex-col gap-6">
           <div className="bg-surface p-6 rounded-2xl border border-border/50">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-4">You Send</p>
              <div className="flex items-center justify-between">
                 <input type="text" placeholder="0.00" className="bg-transparent text-3xl font-space font-bold focus:outline-none w-1/2" />
                 <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-xl border border-border/50">
                    <span className="font-bold">WYLR</span>
                 </div>
              </div>
              <p className="mt-4 text-xs text-muted">Balance: 12,450.85 WYLR</p>
           </div>
           
           <div className="flex justify-center">
              <div className="w-10 h-10 bg-surface rounded-full border border-border/50 flex items-center justify-center text-muted">
                 <ArrowRight size={20} className="rotate-90" />
              </div>
           </div>

           <div className="bg-surface p-6 rounded-2xl border border-border/50">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-4">Recipient Address</p>
              <input type="text" placeholder="0x..." className="bg-transparent text-lg font-mono focus:outline-none w-full" />
           </div>

           <button 
             onClick={() => setIsSendOpen(false)}
             className="w-full py-4 bg-primary text-on-primary font-bold rounded-2xl hover:bg-primary-dim transition-colors mt-4"
           >
             Preview Send
           </button>
        </div>
      </Modal>
    </div>
  );
}

function WalletAction({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-3 bg-surface border border-border/50 rounded-3xl hover:border-primary/50 transition-all hover:bg-surface-high group"
    >
      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-sm font-bold tracking-wide">{label}</span>
    </button>
  );
}

function KPICard({ label, value, subValue, positive }: { label: string, value: string, subValue: string, positive?: boolean }) {
  return (
    <div className="bg-surface-low border border-border/50 p-6 rounded-2xl hover:border-primary/20 transition-all">
      <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-3">{label}</p>
      <h5 className="text-2xl font-space font-bold mb-1">{value}</h5>
      <p className={`text-xs font-medium ${positive ? "text-green-500" : "text-muted"}`}>{subValue}</p>
    </div>
  );
}
