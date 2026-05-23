"use client";
 
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Plus, 
  Trophy, 
  History, 
  Loader2, 
  Check, 
  ArrowRight,
  ChevronRight,
  Coins,
  Activity,
  Calculator
} from "lucide-react";
import AnimatedTabs from "@/components/ui/AnimatedTabs";
import Modal from "@/components/ui/Modal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useAccount, useBalance } from "wagmi";
import { NetworkConfig } from "@/config/network";

export default function StakingModule() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const [mounted, setMounted] = React.useState(false);
  const [isStakeOpen, setIsStakeOpen] = React.useState(false);
  const [stakeAmount, setStakeAmount] = React.useState("");
  const [calculatorAmount, setCalculatorAmount] = React.useState("5000");
  const [claimStatus, setClaimStatus] = React.useState<"idle" | "claiming" | "success">("idle");
  const [stakeStatus, setStakeStatus] = React.useState<"idle" | "staking" | "success">("idle");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const walletBalanceNum = mounted && isConnected && balance ? Number(balance.value) / (10 ** balance.decimals) : 0;
  const displayBalance = walletBalanceNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const usdValue = (walletBalanceNum * 0.3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const mockUnclaimed = (walletBalanceNum * 0.05).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
  // Dynamic calculator earnings based on 12.4% APY
  const calcAmountNum = Number(calculatorAmount) || 0;
  const calcYearly = (calcAmountNum * 0.124).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const calcMonthly = (calcAmountNum * 0.124 / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const calcProjection = (walletBalanceNum * 0.124).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
    { name: "Bronze", min: "0", apy: "4.5%", color: "border-orange-500/20 text-orange-500", glow: "hover:border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]", badgeBg: "bg-orange-500/10" },
    { name: "Silver", min: "5K", apy: "6.2%", color: "border-blue-400/20 text-blue-400", glow: "hover:border-blue-400/40 hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]", badgeBg: "bg-blue-400/10" },
    { name: "Gold", min: "25K", apy: "8.5%", color: "border-yellow-500/20 text-yellow-500", glow: "hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]", badgeBg: "bg-yellow-500/10" },
    { name: "Platinum", min: "100K", apy: "12.4%", color: "border-purple-500/20 text-purple-400", glow: "hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]", badgeBg: "bg-purple-500/10" },
  ];

  const validators = [
    { name: "Wyler Core Node #1", uptime: "99.98%", commission: "5%", staked: "1.2M", apy: "12.4%", logo: "⚡" },
    { name: "Sui Frontier", uptime: "99.99%", commission: "3%", staked: "850K", apy: "11.2%", logo: "🌐" },
    { name: "Liquid Pulse", uptime: "98.50%", commission: "0%", staked: "420K", apy: "13.5%", logo: "💧" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 font-inter">
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
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-500/30 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] font-bold rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <Plus size={14} /> Stake WYLR
          </button>
        </div>
      </div>
 
      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Active Staking State */}
        <SpotlightCard className="lg:col-span-2 bg-gradient-to-br from-surface-highest via-[#0a0a0f] to-surface-high border border-white/5 p-10 rounded-[36px] flex flex-col justify-between hover:border-indigo-500/30 transition-all group relative overflow-hidden shadow-2xl">
          <div className="absolute top-[-20%] left-[-10%] w-[250px] h-[250px] bg-indigo-600/10 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-[9px] uppercase tracking-[0.25em] mb-6 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
              Active Staking State
            </div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">My Staked Balance</p>
            <h3 className="text-6xl font-space font-black mb-3 tracking-tight">
              {displayBalance} <span className="text-primary-dim text-3xl font-bold">WYLR</span>
            </h3>
            <p className="text-gray-500 text-sm font-medium">≈ ${usdValue} USD</p>
          </div>
          
          <div className="flex items-center gap-12 mt-12 pt-6 border-t border-white/5 z-10">
            <div>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Current APY</p>
              <p className="text-2xl font-space font-black text-green-500 tracking-tight flex items-center gap-1">
                12.4% <span className="text-[10px] text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded font-mono">Max</span>
              </p>
            </div>
            <div>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Lock Period</p>
              <p className="text-2xl font-space font-black text-white tracking-tight">30 Days</p>
            </div>
            <div>
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Compound Status</p>
              <p className="text-2xl font-space font-black text-indigo-400 tracking-tight flex items-center gap-1.5">
                <Coins size={16} /> Auto
              </p>
            </div>
          </div>
        </SpotlightCard>
 
        {/* Unclaimed Rewards */}
        <div className="lg:col-span-1 bg-gradient-to-tr from-indigo-950/20 to-black/80 backdrop-blur-xl border border-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.1)] p-8 rounded-[36px] flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Unclaimed Rewards</p>
            <h3 className="text-4xl font-space font-black mb-4 text-white tracking-tight">{mockUnclaimed} <span className="text-primary-dim text-xl font-bold">WYLR</span></h3>
            
            <div className="flex items-center gap-2 text-indigo-400 text-[9px] font-mono tracking-widest uppercase bg-indigo-500/10 border border-indigo-500/20 w-fit px-3 py-1.5 rounded-xl mb-8 shadow-[0_0_10px_rgba(79,70,229,0.2)]">
              <Clock size={12} className="animate-pulse" /> Claims in 4d 12h
            </div>
            
            <button 
              onClick={handleClaim}
              disabled={!isConnected || claimStatus !== "idle"}
              className={`w-full py-4 text-[10px] font-bold uppercase tracking-widest rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 border cursor-pointer ${
                !isConnected ? "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed" :
                claimStatus === "success" ? "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] border-green-400 hover:scale-105" :
                claimStatus === "claiming" ? "bg-indigo-600 border-indigo-500 text-white cursor-wait" :
                "bg-white/5 hover:bg-primary/20 text-white border-white/10 hover:border-primary/50 hover:shadow-[0_0_25px_rgba(79,70,229,0.3)] hover:scale-[1.02]"
              }`}
            >
              {!isConnected ? "Connect Wallet Required" :
               claimStatus === "claiming" ? <><Loader2 size={14} className="animate-spin text-white" /> Compounding...</> :
               claimStatus === "success" ? <><Check size={14} /> Rewards Claimed</> :
               "Claim Rewards"
              }
            </button>
          </div>
          <div className="absolute -bottom-6 -right-6 text-indigo-500/5 group-hover:text-indigo-500/15 transition-colors -rotate-12 duration-700 pointer-events-none">
            <Trophy size={140} />
          </div>
        </div>
 
        {/* Annual Projection */}
        <div className="lg:col-span-1 bg-gradient-to-br from-surface-highest to-surface-high border border-white/5 p-8 rounded-[36px] flex flex-col justify-between hover:border-indigo-500/20 transition-all shadow-xl group">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Annual Projection</p>
            <h3 className="text-4xl font-space font-black mb-6 text-green-500 tracking-tight">+{calcProjection} <span className="text-primary-dim text-xl font-bold">WYLR</span></h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Compounding Status</span>
                <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5"><Activity size={12} /> Compounding</span>
              </div>
              <div className="h-[1px] bg-white/5" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Validator Efficiency</span>
                <span className="text-xs font-bold text-green-500">99.98%</span>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-white/5">
            <button className="w-full py-2.5 text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all">
              <TrendingUp size={12} /> Yield Performance Index
            </button>
          </div>
        </div>
      </div>
 
      {/* Dynamic Yield Calculator Section */}
      <div className="bg-gradient-to-r from-surface-high to-surface-low border border-white/5 rounded-[40px] p-8 md:p-10 relative overflow-hidden shadow-2xl group/calc">
        <div className="absolute top-0 right-0 p-12 opacity-5 text-indigo-500 pointer-events-none group-hover/calc:opacity-10 transition-opacity duration-1000">
          <Calculator size={180} />
        </div>
        <div className="relative z-10 flex flex-col xl:flex-row items-center gap-10">
          <div className="flex-1 text-left">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-3 block">Simulate Yields</span>
            <h3 className="text-2xl md:text-3xl font-space font-extrabold text-white tracking-tight uppercase leading-tight">
              Interactive returns <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-indigo-400 font-bold">Simulator</span>
            </h3>
            <p className="text-gray-500 text-sm max-w-md mt-4 leading-relaxed font-inter">
              Drag the slider to define your staked principal and view simulated gains based on a fixed 12.4% compound staking APY.
            </p>
          </div>

          <div className="w-full xl:w-[60%] flex flex-col md:flex-row gap-8 items-center bg-black/40 border border-white/5 p-8 rounded-3xl backdrop-blur-md">
            <div className="flex-1 w-full flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Staked Principal</span>
                <span className="text-lg font-space font-bold text-white">{Number(calculatorAmount).toLocaleString()} WYLR</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="50000" 
                step="100"
                value={calculatorAmount} 
                onChange={(e) => setCalculatorAmount(e.target.value)}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500 focus:outline-none"
              />
              <div className="flex justify-between text-[9px] font-mono text-gray-600 uppercase tracking-wider">
                <span>Min: 100</span>
                <span>Max: 50,000</span>
              </div>
            </div>
            
            <div className="w-full md:w-[1px] md:h-24 bg-white/10 shrink-0" />

            <div className="w-full md:w-56 flex flex-col gap-4">
              <div>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-0.5">Est. Monthly Gain</span>
                <span className="text-lg font-space font-extrabold text-white">{calcMonthly} <span className="text-xs text-indigo-400 font-medium">WYLR</span></span>
              </div>
              <div>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-0.5">Est. Yearly Return (+12.4%)</span>
                <span className="text-lg font-space font-extrabold text-green-500">+{calcYearly} <span className="text-xs text-green-500 font-medium">WYLR</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier & Validators Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tiers */}
        <div className="lg:col-span-1">
          <h4 className="text-xl font-space font-bold mb-6 flex items-center gap-3">
            <ShieldCheck size={20} className="text-primary" /> Staking Tiers
          </h4>
          <div className="flex flex-col gap-3">
            {tiers.map((tier) => (
              <div 
                key={tier.name} 
                className={`flex items-center justify-between p-5 bg-gradient-to-b from-white/[0.02] to-transparent border rounded-2xl group transition-all duration-500 cursor-pointer ${tier.color} ${tier.glow}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-space font-black text-sm border border-white/5 shadow-inner transition-transform duration-500 group-hover:scale-110 ${tier.badgeBg}`}>
                    {tier.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">{tier.name} Tier</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Min. {tier.min} WYLR</p>
                  </div>
                </div>
                <p className="text-lg font-space font-bold tracking-tight">{tier.apy} APY</p>
              </div>
            ))}
          </div>
        </div>
 
        {/* Top Validators Grid */}
        <div className="lg:col-span-2 flex flex-col">
          <h4 className="text-xl font-space font-bold mb-6 flex items-center gap-3">
            <TrendingUp size={20} className="text-primary" /> Top Validator Nodes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {validators.map((v) => (
               <div 
                 key={v.name} 
                 className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 p-6 rounded-[28px] hover:border-primary/30 hover:shadow-[0_0_20px_rgba(79,70,229,0.15)] transition-all duration-500 group cursor-pointer flex flex-col justify-between min-h-[220px]"
               >
                 <div>
                   <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-lg shadow-inner group-hover:scale-110 transition-all duration-500">
                       {v.logo}
                     </div>
                     <span className="text-[9px] font-mono font-bold text-green-500 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-md tracking-wider flex items-center gap-1">
                       <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                       Active
                     </span>
                   </div>
                   
                   <h5 className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors tracking-wide truncate mb-1">
                     {v.name}
                   </h5>
                   <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest font-mono">
                     Commission: {v.commission} · Staked: {v.staked}
                   </p>
                 </div>
                 
                 <div className="mt-6 pt-4 border-t border-white/5 flex items-end justify-between">
                   <div>
                     <span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest block mb-0.5">Est. APY</span>
                     <span className="text-xl font-space font-black text-primary">{v.apy}</span>
                   </div>
                   <button 
                     onClick={() => setIsStakeOpen(true)}
                     className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-gray-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-[0_0_12px_rgba(79,70,229,0.5)] flex items-center justify-center transition-all duration-300"
                   >
                     <Plus size={14} />
                   </button>
                 </div>
               </div>
             ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <button className="text-gray-500 hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-full transition-all">
              <History size={12} /> View Staking History
            </button>
          </div>
        </div>
      </div>
      
      {/* Stake Liquid Assets Modal */}
      <Modal isOpen={isStakeOpen} onClose={() => setIsStakeOpen(false)} title="Stake WYLR">
        <div className="flex flex-col gap-6">
           <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all focus-within:border-indigo-500/50">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest">You Stake</p>
                {mounted && isConnected && (
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest cursor-pointer hover:text-indigo-300" onClick={() => setStakeAmount(walletBalanceNum.toString())}>
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
                 <p className="text-3xl font-space font-bold text-white/80">{stakeAmount || "0.00"}</p>
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
             className="w-full py-4 mt-2 bg-indigo-600 border border-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
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
