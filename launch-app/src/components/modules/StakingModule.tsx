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
  History,
  Loader2,
  Check,
  ArrowRight
} from "lucide-react";
import AnimatedTabs from "@/components/ui/AnimatedTabs";
import Modal from "@/components/ui/Modal";
import { useAccount, useBalance } from "wagmi";

export default function StakingModule() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [mounted, setMounted] = React.useState(false);
  const [isStakeOpen, setIsStakeOpen] = React.useState(false);
  const [stakeAmount, setStakeAmount] = React.useState("");
  const [claimStatus, setClaimStatus] = React.useState<"idle" | "claiming" | "success">("idle");
  const [stakeStatus, setStakeStatus] = React.useState<"idle" | "staking" | "success">("idle");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const walletBalanceNum = mounted && isConnected && balance ? Number(balance.value) / (10 ** balance.decimals) : 0;
  const displayBalance = walletBalanceNum.toFixed(2);
  const usdValue = (walletBalanceNum * 0.3).toFixed(2);
  const mockUnclaimed = (walletBalanceNum * 0.05).toFixed(2);
  const mockProjection = (walletBalanceNum * 0.124).toFixed(2);
  const mockMonthly = (walletBalanceNum * 0.124 / 12).toFixed(2);

  const handleClaim = () => {
    if (!isConnected) return;
    setClaimStatus("claiming");
    setTimeout(() => {
      setClaimStatus("success");
      setTimeout(() => setClaimStatus("idle"), 3000);
    }, 2000);
  };

  const handleStake = () => {
    if (!isConnected || !stakeAmount) return;
    setStakeStatus("staking");
    setTimeout(() => {
      setStakeStatus("success");
      setTimeout(() => {
        setIsStakeOpen(false);
        setStakeStatus("idle");
        setStakeAmount("");
      }, 2000);
    }, 2000);
  };

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
          <button 
            onClick={() => setIsStakeOpen(true)}
            className="px-6 py-2.5 bg-primary/20 hover:bg-primary/40 border border-primary/50 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] font-bold rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all"
          >
            <Plus size={16} /> Stake WYLR
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 rounded-[32px] flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              <Zap size={14} /> Active Staking State
            </div>
            <p className="text-muted font-medium mb-2">My Staked Balance</p>
            <h3 className="text-5xl font-space font-bold mb-2">{displayBalance} <span className="text-primary-dim text-3xl">WYLR</span></h3>
            <p className="text-muted font-medium">≈ ${usdValue} USD</p>
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

        <div className="lg:col-span-1 bg-gradient-to-tr from-indigo-900/10 to-transparent backdrop-blur-xl border border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.1)] p-8 rounded-[32px] flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-muted font-medium mb-2">Unclaimed Rewards</p>
            <h3 className="text-4xl font-space font-bold mb-4">{mockUnclaimed} <span className="text-primary-dim text-xl">WYLR</span></h3>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold font-inter bg-indigo-500/10 border border-indigo-500/20 w-fit px-3 py-1.5 rounded-lg mb-6 shadow-[0_0_10px_rgba(79,70,229,0.2)]">
              <Clock size={12} /> Claims in 4d 12h
            </div>
            
            <button 
              onClick={handleClaim}
              disabled={!isConnected || claimStatus !== "idle"}
              className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${
                !isConnected ? "bg-white/5 border border-white/10 text-muted cursor-not-allowed" :
                claimStatus === "success" ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] border border-green-400" :
                claimStatus === "claiming" ? "bg-indigo-600 border border-indigo-500 text-white cursor-wait" :
                "bg-white/10 hover:bg-primary/20 text-white border border-white/10 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(79,70,229,0.3)]"
              }`}
            >
              {!isConnected ? "Connect Wallet" :
               claimStatus === "claiming" ? <><Loader2 size={14} className="animate-spin" /> Compounding...</> :
               claimStatus === "success" ? <><Check size={14} /> Rewards Claimed</> :
               "Claim Rewards"
              }
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors -rotate-12 drop-shadow-[0_0_20px_rgba(79,70,229,0.5)]">
            <Trophy size={140} />
          </div>
        </div>

        <div className="lg:col-span-1 bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 rounded-[32px] flex flex-col justify-between hover:border-indigo-500/30 transition-all group">
          <div>
            <p className="text-muted font-medium mb-2">Annual Projection</p>
            <h3 className="text-4xl font-space font-bold mb-4">+{mockProjection} <span className="text-primary-dim text-xl">WYLR</span></h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Monthly</span>
                <span className="text-xs font-bold">+{mockMonthly}</span>
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
      
      {/* Stake Liquid Assets Modal */}
      <Modal isOpen={isStakeOpen} onClose={() => setIsStakeOpen(false)} title="Stake WYLR">
        <div className="flex flex-col gap-6">
           <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all focus-within:border-indigo-500/50">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest">You Stake</p>
                {mounted && isConnected && (
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest cursor-pointer hover:text-indigo-300" onClick={() => setStakeAmount(displayBalance)}>
                    Balance: {displayBalance}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                 <input 
                   type="text" 
                   placeholder="0.00" 
                   value={stakeAmount}
                   onChange={(e) => setStakeAmount(e.target.value)}
                   className="bg-transparent text-3xl font-space font-bold focus:outline-none w-1/2 text-white placeholder:text-white/20" 
                 />
                 <div className="flex items-center gap-2 bg-indigo-500/10 shadow-[0_0_15px_rgba(79,70,229,0.2)] px-4 py-2 rounded-xl border border-indigo-500/30">
                    <span className="font-bold text-indigo-400">WYLR</span>
                 </div>
              </div>
           </div>
           
           <div className="flex justify-center -my-2 relative z-10">
              <div className="w-10 h-10 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center text-muted shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                 <ArrowRight size={20} className="rotate-90" />
              </div>
           </div>

           <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-4">You Receive</p>
              <div className="flex items-center justify-between">
                 <p className="text-3xl font-space font-bold text-foreground/80">{stakeAmount || "0.00"}</p>
                 <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/5">
                    <span className="font-bold text-muted">stWYLR</span>
                 </div>
              </div>
           </div>

           <div className="p-4 rounded-xl border border-white/10 bg-white/5 flex items-center justify-between mt-2">
             <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Est. Network Fee</span>
             <span className="text-xs font-bold text-green-500 flex items-center gap-1"><ShieldCheck size={12} /> Sponsored</span>
           </div>

           <button 
             onClick={handleStake}
             disabled={!isConnected || !stakeAmount || Number(stakeAmount) <= 0 || stakeStatus !== "idle"}
             className="w-full py-4 mt-2 bg-indigo-600 border border-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
           >
             {!isConnected ? "Connect Wallet" :
              stakeStatus === "staking" ? <><Loader2 size={14} className="animate-spin" /> Staking to Validator...</> :
              stakeStatus === "success" ? <><Check size={14} /> Stake Successful!</> :
              <><span className="text-[10px] tracking-widest uppercase">Sign & Stake</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></>
             }
           </button>
        </div>
      </Modal>
    </div>
  );
}
