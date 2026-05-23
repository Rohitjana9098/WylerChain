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
  Loader2,
  ArrowRight,
  Zap,
  ShieldCheck
} from "lucide-react";
import { useAccount, useBalance, useChainId, useSendTransaction, useWaitForTransactionReceipt, useConnect } from "wagmi";
import { parseEther } from "viem";
import Modal from "@/components/ui/Modal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import LiveTransactionFeed from "@/components/ui/LiveTransactionFeed";
import AnimatedTabs from "@/components/ui/AnimatedTabs";
import { NetworkConfig } from "@/config/network";

export default function WalletModule() {
  const [isSendOpen, setIsSendOpen] = React.useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = React.useState(false);
  const [isGasless, setIsGasless] = React.useState(true);
  const [sendAmount, setSendAmount] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const transactions = [
    { id: 1, type: "SENT", amount: "450.00", symbol: "WYLR", to: "0x7a...f21", date: "2 mins ago", status: "Completed" },
    { id: 2, type: "RECEIVED", amount: "1,200.00", symbol: "WYLR", from: "0x3b...e92", date: "1 hour ago", status: "Completed" },
    { id: 3, type: "STAKED", amount: "5,000.00", symbol: "WYLR", to: "Wyler Validator", date: "4 hours ago", status: "Completed" },
    { id: 4, type: "RECEIVED", amount: "250.00", symbol: "MDT", from: "0x8e...342", date: "6 hours ago", status: "Completed" },
    { id: 5, type: "MINTED", amount: "1.00", symbol: "NFT", to: "Wyler Origin #42", date: "1 day ago", status: "Completed" },
  ];

  // Wagmi Connection State
  const { address, isConnected } = useAccount();
  const currentChainId = useChainId();
  const isCorrectNetwork = currentChainId === NetworkConfig.chainIdDecimal;
  const { connect, connectors } = useConnect();

  const handleConnectWallet = () => {
    const injected = connectors.find(c => c.id === 'injected' || c.id === 'metaMask');
    if (injected) {
      connect({ connector: injected });
    } else if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Real Native Balance Fetching
  const { data: ethBalance, isLoading: isBalanceLoading } = useBalance({
    address,
    chainId: NetworkConfig.chainIdDecimal,
    query: {
      enabled: !!address && isCorrectNetwork,
      refetchInterval: 10000, // Refetch every 10 seconds for post-TX updates
    }
  });

  // Calculate fiat value based on the fixed token price shown in the KPI cards
  const activeTokenPrice = 0.30;
  const rawBalance = ethBalance ? Number(ethBalance.value) / (10 ** ethBalance.decimals) : 0;
  const formattedBalance = rawBalance > 0 
    ? rawBalance.toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 2 }) 
    : "0.00";
  const fiatValue = (rawBalance * activeTokenPrice).toLocaleString(undefined, { style: 'currency', currency: 'USD' });

  // Real Send Transaction Hook
  const { data: hash, isPending: isSending, sendTransaction } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleSend = () => {
    if (!sendAmount || !recipient || Number(sendAmount) <= 0) return;
    try {
      sendTransaction({
        to: recipient as `0x${string}`,
        value: parseEther(sendAmount),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Close modal on success
  React.useEffect(() => {
    if (isConfirmed) {
      setIsSendOpen(false);
      setSendAmount("");
      setRecipient("");
    }
  }, [isConfirmed]);

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
        <SpotlightCard className="lg:col-span-2 bg-gradient-to-br from-surface-highest to-surface-high border border-white/5 p-12 rounded-[40px] relative group shadow-2xl overflow-hidden">
          {/* Glowing Ambient Backdrop Orbs */}
          <div className="absolute top-[-20%] left-[-10%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
            <WalletIcon size={160} />
          </div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <p className="text-muted text-xs font-bold uppercase tracking-[0.2em] mb-4">Total Balance</p>
              
              {!mounted ? (
                <div className="mb-[76px] mt-4 flex flex-col gap-4">
                   <div className="h-[72px] w-64 bg-white/5 animate-pulse rounded-2xl" />
                   <div className="h-6 w-32 bg-white/5 animate-pulse rounded-lg" />
                </div>
              ) : !isConnected ? (
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-2 mb-6">
                  <div className="flex-1 text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-mono tracking-widest uppercase animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Access Restricted
                    </span>
                    
                    <h3 className="text-3xl sm:text-4xl font-space font-extrabold text-white tracking-tight uppercase mb-3 leading-tight">
                      Connect Your Wallet <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 font-bold">To Unlock Balance</span>
                    </h3>
                    
                    <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
                      Connect securely to the Wyler Chain L3 Testnet to view your balances, monitor live yields, and stake assets.
                    </p>

                    <button
                      onClick={handleConnectWallet}
                      className="group/btn relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl font-bold uppercase tracking-widest text-[10px] text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300 transform active:scale-95 cursor-pointer border border-indigo-500/40 flex items-center gap-3 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                      <WalletIcon size={14} className="relative z-10 text-white" />
                      <span className="relative z-10">Connect Secure Wallet</span>
                      <ArrowRight size={12} className="relative z-10 text-white group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Cyber Orbital Core Graphic */}
                  <div className="relative w-40 h-40 shrink-0 flex items-center justify-center group/orb hidden md:flex">
                    <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/20 animate-[spin_40s_linear_infinite] group-hover/orb:border-purple-500/40 transition-colors" />
                    <div className="absolute inset-4 rounded-full border border-double border-indigo-500/30 animate-[spin_20s_linear_infinite_reverse] group-hover/orb:border-indigo-500/50" />
                    <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-500/5 via-purple-500/0 to-transparent border border-white/5 animate-pulse" />
                    <div className="absolute w-24 h-24 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 blur-[30px] rounded-full group-hover/orb:scale-125 transition-transform duration-700" />

                    <div className="absolute w-20 h-20 rounded-3xl bg-gradient-to-b from-white/[0.05] to-[#0a0a0f] border border-white/10 flex items-center justify-center shadow-2xl relative z-10 transition-all duration-500 group-hover/orb:border-purple-500/40 group-hover/orb:scale-105">
                      <div className="absolute inset-0.5 rounded-[22px] bg-gradient-to-b from-white/10 to-transparent opacity-20 pointer-events-none" />
                      <WalletIcon size={32} className="text-purple-400 group-hover/orb:text-purple-300 transition-colors filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)]" />
                    </div>
                  </div>
                </div>
              ) : !isCorrectNetwork ? (
                <div className="mb-[76px] mt-4">
                   <p className="text-4xl font-space font-bold text-orange-500">Wrong Network</p>
                   <p className="text-sm text-orange-500/70 mt-2">Please switch to WylerChain Testnet</p>
                </div>
              ) : (
                <>
                  <h3 className="text-7xl font-space font-bold mb-6 tracking-tighter flex items-center gap-4">
                    {isBalanceLoading ? (
                      <Loader2 size={64} className="animate-spin text-primary" />
                    ) : (
                      formattedBalance
                    )}
                    <span className="text-primary-dim">WYLR</span>
                  </h3>
                  <p className="text-muted text-xl font-medium mb-10 flex items-center gap-3">
                    ≈ {fiatValue} <span className="text-xs text-green-500 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">+12.4%</span>
                  </p>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-3 mt-4">
              <span className="text-[10px] font-mono font-bold text-muted bg-black/50 border border-white/10 px-4 py-2 rounded-full tracking-wider min-w-[120px] inline-flex justify-center items-center h-[34px]">
                {!mounted ? <div className="h-2 w-16 bg-white/20 animate-pulse rounded-full" /> : address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Disconnected"}
              </span>
              {mounted && address && (
                <a 
                  href={`${NetworkConfig.explorerUrl}/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-muted hover:text-white hover:bg-white/5 rounded-full transition-all"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </SpotlightCard>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            <WalletAction icon={<ArrowUpRight size={22} />} label="Send" onClick={() => setIsSendOpen(true)} theme="purple" />
            <WalletAction icon={<ArrowDownLeft size={22} />} label="Receive" onClick={() => setIsReceiveOpen(true)} theme="blue" />
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Tips Sent" value={isConnected ? "842.00" : "0.00"} subValue="24 Creators" loading={!mounted} />
        <KPICard label="NFTs Owned" value={isConnected ? "12" : "0"} subValue="Primary Collection" loading={!mounted} />
        <KPICard label="Staked Amount" value={isConnected ? "5,000.00" : "0.00"} subValue="12.4% APR" loading={!mounted} />
        <KPICard label="MDT Balance" value={isConnected ? "2,450.00" : "0.00"} subValue="Governance Utility" loading={!mounted} />
        <KPICard label="Token Price" value="$0.30" subValue="+12.4% (24h)" positive loading={!mounted} />
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
            {!mounted ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 animate-pulse" />
                    <div className="flex flex-col gap-2">
                      <div className="h-3 w-24 bg-white/5 animate-pulse rounded" />
                      <div className="h-2 w-16 bg-white/5 animate-pulse rounded" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="h-3 w-16 bg-white/5 animate-pulse rounded" />
                    <div className="h-2 w-12 bg-white/5 animate-pulse rounded" />
                  </div>
                </div>
              ))
            ) : !isConnected ? (
              <div className="py-8 text-center">
                <p className="text-sm text-muted">Connect wallet to view history</p>
              </div>
            ) : (
              transactions.map((tx) => (
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
              ))
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} title="Send Assets">
        <div className="flex flex-col gap-6">
           <div className="bg-surface p-6 rounded-2xl border border-border/50 transition-colors">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-4">You Send</p>
              <div className="flex items-center justify-between">
                 <input 
                   type="text" 
                   placeholder="0.00" 
                   value={sendAmount}
                   onChange={(e) => setSendAmount(e.target.value)}
                   className="bg-transparent text-3xl font-space font-bold focus:outline-none w-1/2 text-white placeholder:text-white/20" 
                 />
                 <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-xl border border-border/50">
                    <span className="font-bold">WYLR</span>
                 </div>
              </div>
              <p className="mt-4 text-xs text-muted flex items-center justify-between">
                <span>Balance: {formattedBalance} WYLR</span>
                <button onClick={() => setSendAmount(formattedBalance)} className="text-primary hover:text-primary-dim uppercase text-[9px] tracking-widest font-bold bg-primary/10 px-2 py-1 rounded-md">Max</button>
              </p>
           </div>
           
           <div className="flex justify-center -my-2 relative z-10">
              <div className="w-10 h-10 bg-surface rounded-full border border-border/50 flex items-center justify-center text-muted shadow-lg">
                 <ArrowRight size={20} className="rotate-90" />
              </div>
           </div>

           <div className="bg-surface p-6 rounded-2xl border border-border/50">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-4">Recipient Address</p>
              <input 
                type="text" 
                placeholder="0x..." 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="bg-transparent text-sm sm:text-base font-mono focus:outline-none w-full text-white placeholder:text-white/20" 
              />
           </div>

           {/* ERC-4337 Gasless Paymaster Toggle */}
           <div 
             onClick={() => setIsGasless(!isGasless)}
             className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
               isGasless ? "bg-indigo-600/10 border-indigo-500/30" : "bg-white/5 border-white/10"
             }`}
           >
             <div className="flex items-center gap-3">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isGasless ? "bg-indigo-500 text-white shadow-[0_0_10px_rgba(79,70,229,0.5)]" : "bg-white/10 text-muted"}`}>
                 <Zap size={14} />
               </div>
               <div>
                 <p className={`text-sm font-bold ${isGasless ? "text-indigo-400" : "text-muted"}`}>Gasless Mode</p>
                 <p className="text-[10px] text-muted uppercase tracking-widest mt-0.5">Sponsored by L3 Paymaster</p>
               </div>
             </div>
             <div className="flex flex-col items-end">
               {isGasless ? (
                 <>
                   <span className="text-xs font-bold text-green-500 flex items-center gap-1"><ShieldCheck size={12} /> Sponsored</span>
                   <span className="text-[10px] line-through text-muted mt-0.5">0.0001 WYLR</span>
                 </>
               ) : (
                 <>
                   <span className="text-xs font-bold text-white">0.0001 WYLR</span>
                   <span className="text-[10px] text-muted mt-0.5">Est. Network Fee</span>
                 </>
               )}
             </div>
           </div>

           <button 
             onClick={handleSend}
             disabled={!sendAmount || !recipient || Number(sendAmount) <= 0 || isSending || isConfirming}
             className="w-full py-4 bg-primary text-on-primary font-bold rounded-2xl hover:bg-primary-dim transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed group"
           >
             <span className="flex items-center justify-center gap-2 tracking-widest uppercase text-xs">
               {isConfirming ? "Broadcasting..." : isSending ? "Check Wallet..." : (isGasless ? "Sign & Execute (Free)" : "Review Send")} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
             </span>
           </button>
        </div>
      </Modal>

      {/* Receive Assets Modal */}
      <Modal isOpen={isReceiveOpen} onClose={() => setIsReceiveOpen(false)} title="Receive Assets">
        <div className="flex flex-col items-center gap-6 pb-2">
           <div className="w-full bg-surface p-6 rounded-2xl border border-border/50 text-center">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-6">Scan to Receive WYLR via L3</p>
              
              <div className="inline-flex relative p-4 mb-4">
                 <div className="absolute inset-0 border-2 border-indigo-500/50 rounded-xl" style={{ clipPath: 'polygon(0% 0%, 20% 0%, 20% 10%, 10% 10%, 10% 20%, 0% 20%, 0% 80%, 10% 80%, 10% 90%, 20% 90%, 20% 100%, 0% 100%, 80% 100%, 80% 90%, 90% 90%, 90% 80%, 100% 80%, 100% 20%, 90% 20%, 90% 10%, 80% 10%, 80% 0%, 100% 0%)' }} />
                 <div className="w-48 h-48 bg-white/5 rounded-lg flex items-center justify-center border border-white/5 relative overflow-hidden">
                    {!isConnected ? (
                       <p className="text-muted text-xs">Connect Wallet</p>
                    ) : (
                       <div className="w-full h-full opacity-60" style={{
                         backgroundImage: `repeating-linear-gradient(45deg, #4f46e5 25%, transparent 25%, transparent 75%, #4f46e5 75%, #4f46e5), repeating-linear-gradient(45deg, #4f46e5 25%, #0a0a0e 25%, #0a0a0e 75%, #4f46e5 75%, #4f46e5)`,
                         backgroundPosition: `0 0, 10px 10px`,
                         backgroundSize: `20px 20px`,
                         filter: `contrast(150%) brightness(80%)`
                       }} />
                    )}
                 </div>
              </div>

              <div className="bg-black/30 p-4 rounded-xl border border-white/5 mt-2 flex justify-between items-center group cursor-pointer hover:border-indigo-500/50 transition-all"
                   onClick={() => address && navigator.clipboard.writeText(address)}>
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Your L3 Address</span>
                  <span className="text-xs sm:text-sm text-white font-mono truncate w-full pr-4">
                    {address || "Not Connected"}
                  </span>
                </div>
                {isConnected && <div className="text-muted group-hover:text-white transition-colors flex-shrink-0"><ExternalLink size={16} /></div>}
              </div>
           </div>

           <button 
             onClick={() => setIsReceiveOpen(false)}
             className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors"
           >
             Close
           </button>
        </div>
      </Modal>
    </div>
  );
}

function WalletAction({ 
  icon, 
  label, 
  onClick, 
  theme = "purple" 
}: { 
  icon: React.ReactNode, 
  label: string, 
  onClick?: () => void,
  theme?: "purple" | "blue"
}) {
  const glowClass = theme === "purple" 
    ? "hover:shadow-[0_0_30px_rgba(108,92,231,0.15)] hover:border-purple-500/30" 
    : "hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:border-blue-500/30";

  const iconBg = theme === "purple"
    ? "bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300"
    : "bg-blue-500/10 border-blue-500/20 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300";

  const translateAnim = theme === "purple"
    ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    : "group-hover:-translate-x-0.5 group-hover:translate-y-0.5";

  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-[32px] transition-all duration-500 hover:bg-white/[0.01] cursor-pointer group relative overflow-hidden p-6 ${glowClass}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.01] via-transparent to-transparent opacity-60 pointer-events-none" />
      
      <div className={`absolute top-0 left-0 w-8 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === "purple" ? "bg-purple-500" : "bg-blue-500"}`} />
      <div className={`absolute top-0 left-0 w-[2px] h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${theme === "purple" ? "bg-purple-500" : "bg-blue-500"}`} />

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-inner ${iconBg}`}>
        <div className={`transition-transform duration-300 ${translateAnim}`}>
          {icon}
        </div>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <span className="text-sm font-space font-bold tracking-wider uppercase text-gray-300 group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase mt-0.5 group-hover:text-gray-400 transition-colors">
          {label === "Send" ? "Transfer assets" : "Receive funds"}
        </span>
      </div>
    </button>
  );
}

function KPICard({ label, value, subValue, positive, loading }: { label: string, value: string, subValue: string, positive?: boolean, loading?: boolean }) {
  return (
    <div className="bg-surface-low border border-border/50 p-6 rounded-2xl hover:border-primary/20 transition-all min-h-[116px]">
      <p className="text-muted text-[10px] font-bold uppercase tracking-widest mb-3">{label}</p>
      {loading ? (
        <div className="flex flex-col gap-3 mt-1">
          <div className="h-8 w-24 bg-white/5 animate-pulse rounded-lg" />
          <div className="h-3 w-20 bg-white/5 animate-pulse rounded" />
        </div>
      ) : (
        <>
          <h5 className="text-2xl font-space font-bold mb-1">{value}</h5>
          <p className={`text-xs font-medium ${positive ? "text-green-500" : "text-muted"}`}>{subValue}</p>
        </>
      )}
    </div>
  );
}
