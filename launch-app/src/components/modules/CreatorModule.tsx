"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  UserPlus, 
  Search, 
  Filter,
  DollarSign,
  Sparkles,
  TrendingUp,
  Send,
  Cpu,
  Clock,
  ArrowUpRight,
  Lock,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronRight,
  PartyPopper,
  Coins
} from "lucide-react";
import AnimatedTabs from "@/components/ui/AnimatedTabs";

interface Creator {
  id: number;
  name: string;
  handle: string;
  bio: string;
  followers: string;
  tips: number;
  image: string;
  category: "Design" | "Development" | "NFTs" | "Infrastructure";
  verified: boolean;
  avatarColor: string;
}

interface Activity {
  id: string;
  creatorName: string;
  creatorHandle: string;
  action: string;
  amount?: string;
  time: string;
}

export default function CreatorModule() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSubTab, setActiveSubTab] = useState<string>("creators");
  
  // Tipping Interactive Drawer State
  const [tippingCreator, setTippingCreator] = useState<Creator | null>(null);
  const [tipAmount, setTipAmount] = useState<number>(50);
  const [isTippingSubmitting, setIsTippingSubmitting] = useState<boolean>(false);
  const [tippingStep, setTippingStep] = useState<"INPUT" | "PROCESSING" | "SUCCESS">("INPUT");
  const [simulatedTxHash, setSimulatedTxHash] = useState<string>("");

  // Registration Modal State
  const [showApplyModal, setShowApplyModal] = useState<boolean>(false);
  const [applyStep, setApplyStep] = useState<number>(1);
  const [applyName, setApplyName] = useState<string>("");
  const [applyHandle, setApplyHandle] = useState<string>("");
  const [applyBio, setApplyBio] = useState<string>("");
  const [applyCategory, setApplyCategory] = useState<string>("Design");
  const [applyTerms, setApplyTerms] = useState<boolean>(false);
  const [applySubmitting, setApplySubmitting] = useState<boolean>(false);
  const [applySuccess, setApplySuccess] = useState<boolean>(false);

  // Live Activity Feed State
  const [activities, setActivities] = useState<Activity[]>([
    { id: "1", creatorName: "Luna Digital", creatorHandle: "@luna_ux", action: "published a new UI prototype", time: "2m ago" },
    { id: "2", creatorName: "Neon Ghost", creatorHandle: "@nghost_art", action: "received a tip of 120 WYLR", amount: "120 WYLR", time: "5m ago" },
    { id: "3", creatorName: "Flux Labs", creatorHandle: "@flux_labs", action: "deployed contract wyler-social-v1", time: "12m ago" },
    { id: "4", creatorName: "Oracle Smith", creatorHandle: "@osmith", action: "updated live data analytics nodes", time: "22m ago" }
  ]);

  // Initial creators data
  const [creatorsList, setCreatorsList] = useState<Creator[]>([
    { id: 1, name: "Luna Digital", handle: "@luna_ux", bio: "Visual architect exploring Web3 boundaries. Currently designing the obsidian void.", followers: "12.4K", tips: 842, image: "LD", category: "Design", verified: true, avatarColor: "from-purple-500 to-indigo-500" },
    { id: 2, name: "Neon Ghost", handle: "@nghost_art", bio: "Generative artist and protocol enthusiast. Liquid staking advocate.", followers: "8.2K", tips: 1200, image: "NG", category: "NFTs", verified: true, avatarColor: "from-pink-500 to-rose-500" },
    { id: 3, name: "Flux Labs", handle: "@flux_labs", bio: "Cross-chain researchers. Building the infrastructure for social finance.", followers: "45K", tips: 340, image: "FL", category: "Development", verified: true, avatarColor: "from-blue-500 to-cyan-500" },
    { id: 4, name: "Oracle Smith", handle: "@osmith", bio: "Data visualization and L3 explorer. Making the unlabelled world clear.", followers: "3.5K", tips: 92, image: "OS", category: "Infrastructure", verified: false, avatarColor: "from-emerald-500 to-teal-500" },
    { id: 5, name: "Cyber Curator", handle: "@ccurator", bio: "Curating the best of the WylerChain ecosystem one block at a time.", followers: "21K", tips: 2100, image: "CC", category: "NFTs", verified: true, avatarColor: "from-amber-500 to-orange-500" },
    { id: 6, name: "Prism Dev", handle: "@prism_v", bio: "Solidity architect and creator economy builder. Gasless is the future.", followers: "1.2K", tips: 15, image: "PD", category: "Development", verified: false, avatarColor: "from-violet-500 to-fuchsia-500" },
  ]);

  // Handle live activities rotation/generation
  useEffect(() => {
    const actions = [
      "published new liquid art piece",
      "received a tip of 250 WYLR",
      "updated their ecosystem bio",
      "registered a custom L3 subnet",
      "deployed zero-gas token vault",
      "received a tip of 75 WYLR"
    ];
    
    const interval = setInterval(() => {
      const randomCreator = creatorsList[Math.floor(Math.random() * creatorsList.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const isTip = randomAction.includes("tip");
      const amount = isTip ? `${Math.floor(Math.random() * 400 + 20)} WYLR` : undefined;

      const newActivity: Activity = {
        id: Date.now().toString(),
        creatorName: randomCreator.name,
        creatorHandle: randomCreator.handle,
        action: isTip ? `received a tip of ${amount}` : randomAction,
        amount: amount,
        time: "Just now"
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 3)]);
    }, 9000);

    return () => clearInterval(interval);
  }, [creatorsList]);

  // Filter creators based on search query and category tab
  const filteredCreators = creatorsList.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || creator.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Tipping flow trigger
  const triggerTip = (creator: Creator) => {
    setTippingCreator(creator);
    setTipAmount(50);
    setTippingStep("INPUT");
  };

  // Submit simulated tip
  const executeTipSimulation = () => {
    setTippingStep("PROCESSING");
    setIsTippingSubmitting(true);
    
    setTimeout(() => {
      // Create random simulated TxHash
      const mockHash = "0x" + Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join("") + "...committed";
      
      setSimulatedTxHash(mockHash);
      setTippingStep("SUCCESS");
      setIsTippingSubmitting(false);

      // Increment tip on state
      setCreatorsList(prev => prev.map(c => {
        if (c.id === tippingCreator?.id) {
          return { ...c, tips: c.tips + tipAmount };
        }
        return c;
      }));

      // Add to live activity list
      const newAct: Activity = {
        id: Date.now().toString(),
        creatorName: tippingCreator!.name,
        creatorHandle: tippingCreator!.handle,
        action: `received a tip of ${tipAmount} WYLR`,
        amount: `${tipAmount} WYLR`,
        time: "Just now"
      };
      setActivities(prev => [newAct, ...prev.slice(0, 3)]);
    }, 2800);
  };

  // Creator Register submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySubmitting(true);

    setTimeout(() => {
      const newCreator: Creator = {
        id: Date.now(),
        name: applyName || "Anonymous Creator",
        handle: applyHandle.startsWith("@") ? applyHandle : `@${applyHandle}`,
        bio: applyBio || "Ecosystem enthusiast exploring Web3 capabilities.",
        followers: "0",
        tips: 0,
        image: (applyName || "AC").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
        category: applyCategory as any,
        verified: false,
        avatarColor: "from-indigo-600 to-blue-500"
      };

      setCreatorsList(prev => [newCreator, ...prev]);
      setApplySuccess(true);
      setApplySubmitting(false);

      // Reset form fields
      setApplyName("");
      setApplyHandle("");
      setApplyBio("");
      setApplyStep(1);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-10 pb-24 text-white relative">
      {/* Header & Sub-Bar */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">Wyler Social Hub</p>
            </div>
            <h2 className="text-4xl font-space font-extrabold tracking-tighter uppercase shimmer-text">
              Ecosystem Creators
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <AnimatedTabs
              tabs={[
                { id: "creators", label: "Ecosystem Creators" },
                { id: "assets", label: "Protocol Assets" },
              ]}
              defaultTab="creators"
              onChange={(id) => setActiveSubTab(id)}
            />
          </div>
        </div>

        {/* Live Ecosystem Social Feed */}
        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-hidden relative backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 text-primary">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-[10px] text-muted font-bold uppercase tracking-wider">Ecosystem Monitor</p>
              <p className="text-xs font-semibold text-white/90">Zero-Gas Tipping Network Active</p>
            </div>
          </div>
          
          <div className="flex-1 w-full overflow-hidden border-t md:border-t-0 md:border-l border-white/5 pt-3 md:pt-0 md:pl-6">
            <div className="flex flex-col gap-2 relative h-10 justify-center">
              <AnimatePresence mode="popLayout">
                {activities.slice(0, 1).map((act) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="text-primary font-bold text-xs">{act.creatorName}</span>
                      <span className="text-muted text-[11px] font-mono">{act.creatorHandle}</span>
                      <span className="text-gray-400 text-xs truncate">{act.action}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {act.amount && (
                        <span className="text-[9px] bg-primary/10 text-primary font-mono font-bold px-2 py-0.5 rounded-full border border-primary/20">
                          {act.amount}
                        </span>
                      )}
                      <span className="text-[9px] text-muted flex items-center gap-1 font-mono">
                        <Clock size={10} /> {act.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Search, Filter, Categories Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative group w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search creators handle, skills..." 
                className="bg-white/[0.02] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 w-full transition-all font-inter text-white placeholder:text-muted shadow-inner"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 hide-scrollbar w-full sm:w-auto justify-start sm:justify-end">
              {["All", "Design", "Development", "NFTs", "Infrastructure"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                    selectedCategory === cat
                      ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                      : "bg-white/[0.02] text-muted border-white/5 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeSubTab === "creators" ? (
        <>
          {/* Main Visual Callout Block: Overhauled */}
          <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(79,70,229,0.1)] group">
            {/* Absolute Ambient Backgrounds */}
            <div className="absolute inset-0 bg-[#06060a] z-0" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/15 transition-all duration-700 pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-dim/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider mb-6">
                  <Sparkles size={12} />
                  Zero Gas Social Economy
                </div>
                <h3 className="text-3xl md:text-5xl font-space font-extrabold mb-5 uppercase tracking-tight leading-[1.1]">
                  Empower Creativity with <br/>
                  <span className="text-brand-gradient italic">Zero Protocol Friction</span>
                </h3>
                <p className="text-muted text-base md:text-lg mb-8 font-inter leading-relaxed max-w-xl">
                  WylerChain implements gas abstraction layers natively. Publish, tip, stake, and deploy social infrastructure without holding bridging collateral.
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <button 
                    onClick={() => {
                      setApplySuccess(false);
                      setApplyStep(1);
                      setShowApplyModal(true);
                    }}
                    className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center gap-2 group-hover:shadow-[0_0_40px_rgba(79,70,229,0.6)]"
                  >
                    Become a Creator <ChevronRight size={16} />
                  </button>
                  <a 
                    href="#howitworks"
                    className="px-6 py-4 bg-white/5 border border-white/10 hover:border-white/20 text-white font-bold rounded-2xl transition-colors text-sm"
                  >
                    Protocol Specs
                  </a>
                </div>
              </div>

              {/* Graphic Element representing Social Finance Loop */}
              <div className="w-full max-w-[340px] aspect-square rounded-[24px] bg-[#0c0c14] border border-white/5 p-6 flex flex-col justify-between relative shadow-2xl overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] text-gray-500 font-mono font-bold tracking-widest">GATEWAY NODE 01</span>
                  </div>
                  <Cpu size={14} className="text-primary animate-pulse" />
                </div>

                <div className="my-auto space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Average Tx Fee</p>
                      <p className="text-lg font-space font-bold text-emerald-400">$0.0000</p>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono px-2 py-0.5 rounded border border-emerald-500/20 font-bold">STABLE</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Staking Reward APY</p>
                      <p className="text-lg font-space font-bold text-primary">18.42%</p>
                    </div>
                    <span className="text-[9px] bg-primary/10 text-primary font-mono px-2 py-0.5 rounded border border-primary/20 font-bold">HIGH</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[10px] text-gray-500 font-mono">
                  <span>LATENCY: 120ms</span>
                  <span>BLOCKS: 2,931,489</span>
                </div>
              </div>
            </div>
          </div>

          {/* Creators Grid: Extremely Premium Visual Redesign */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.length > 0 ? (
              filteredCreators.map((creator) => (
                <motion.div 
                  key={creator.id}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="bg-[#08080c]/80 backdrop-blur-xl border border-white/5 p-6 rounded-[28px] hover:border-primary/40 transition-all group flex flex-col justify-between min-h-[380px] relative overflow-hidden shadow-xl"
                >
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />

                  <div>
                    {/* Card Header Profile */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${creator.avatarColor} p-[1px] shadow-lg flex items-center justify-center`}>
                          <div className="w-full h-full bg-[#0d0d14] rounded-[15px] flex items-center justify-center text-xl font-space font-bold text-white group-hover:text-primary transition-colors">
                            {creator.image}
                          </div>
                        </div>
                        {creator.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-[#050505] p-0.5 rounded-full border border-white/10">
                            <CheckCircle2 size={14} className="text-primary fill-primary/20" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-white/5 border border-white/5 font-mono px-2.5 py-1 rounded-full text-gray-400">
                          {creator.category}
                        </span>
                        <button className="p-2.5 text-muted hover:text-primary bg-[#0d0d14] border border-white/5 rounded-xl hover:bg-primary/5 hover:border-primary/30 transition-all">
                          <UserPlus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Card Text Content */}
                    <div className="mb-6">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xl font-space font-bold group-hover:text-primary transition-colors">{creator.name}</h4>
                      </div>
                      <p className="text-primary/70 text-xs font-mono font-bold mb-3">{creator.handle}</p>
                      <p className="text-muted text-sm leading-relaxed font-inter line-clamp-3">
                        {creator.bio}
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Metrics Section */}
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mb-6">
                      <div>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Audience</p>
                        <p className="text-sm font-space font-extrabold text-white">{creator.followers}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Total Tipped</p>
                        <p className="text-sm font-space font-extrabold text-white flex items-center gap-1">
                          {creator.tips} <span className="text-primary text-[9px] font-normal">WYLR</span>
                        </p>
                      </div>
                    </div>

                    {/* Actions Grid */}
                    <div className="grid grid-cols-4 gap-2">
                      <button 
                        onClick={() => triggerTip(creator)}
                        className="col-span-3 py-3.5 bg-primary text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(79,70,229,0.2)] active:scale-95 duration-200"
                      >
                        <DollarSign size={14} /> Send Tip
                      </button>
                      <button className="p-3.5 bg-[#0e0e14] border border-white/5 rounded-xl text-muted hover:text-white hover:bg-white/5 hover:border-white/10 transition-all flex items-center justify-center active:scale-95 duration-200">
                        <MessageSquare size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 py-16 text-center bg-white/[0.01] border border-white/5 rounded-3xl">
                <AlertCircle className="mx-auto text-muted mb-4" size={40} />
                <p className="font-space text-lg font-bold">No Creators Found</p>
                <p className="text-muted text-sm mt-1">Try resetting your category filter or search input.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Protocol Assets View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { id: "asset-1", name: "Social Gas abstraction pool", value: "3,892,102 WYLR", activeUsers: "4,200", status: "Active", volume: "1.2M WYLR", color: "from-purple-500 to-indigo-500" },
            { id: "asset-2", name: "Creator rewards sub-ledger", value: "892,400 WYLR", activeUsers: "940", status: "Active", volume: "450K WYLR", color: "from-blue-500 to-cyan-500" },
            { id: "asset-3", name: "Ecosystem governance reserve", value: "12,500,000 WYLR", activeUsers: "--", status: "Locked", volume: "--", color: "from-pink-500 to-rose-500" },
            { id: "asset-4", name: "Validator commission module", value: "249,150 WYLR", activeUsers: "24", status: "Active", volume: "92K WYLR", color: "from-emerald-500 to-teal-500" },
          ].map((asset) => (
            <div 
              key={asset.id} 
              className="bg-[#08080c]/80 border border-white/5 rounded-3xl p-6 hover:border-primary/30 transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${asset.color} flex items-center justify-center font-bold text-white shadow-lg`}>
                    $
                  </div>
                  <div>
                    <h4 className="font-space font-bold text-lg text-white">{asset.name}</h4>
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest">{asset.id.toUpperCase()}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                  asset.status === "Active" 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                }`}>
                  {asset.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                <div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Vault Pool</p>
                  <p className="text-sm font-space font-bold text-white">{asset.value}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">Active Nodes</p>
                  <p className="text-sm font-space font-bold text-white">{asset.activeUsers}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1">24h Vol</p>
                  <p className="text-sm font-space font-bold text-white">{asset.volume}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── TIPPING DRAWER (POPUP OVERLAY SIMULATOR) ────────────────────────────── */}
      <AnimatePresence>
        {tippingCreator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            {/* Backdrop close area */}
            <div className="absolute inset-0" onClick={() => !isTippingSubmitting && setTippingCreator(null)} />
            
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[32px] overflow-hidden relative shadow-2xl z-10"
            >
              {/* Absolute glowing rings */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <Coins className="text-primary" size={18} />
                  <span className="font-space font-bold text-base uppercase tracking-wider">Social Tip Hub</span>
                </div>
                {!isTippingSubmitting && (
                  <button 
                    onClick={() => setTippingCreator(null)}
                    className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Content Panels depending on steps */}
              <div className="p-6">
                {tippingStep === "INPUT" && (
                  <div className="space-y-6">
                    {/* Target info */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-space font-bold text-lg border border-primary/20">
                        {tippingCreator.image}
                      </div>
                      <div>
                        <p className="font-space font-bold text-sm text-white">{tippingCreator.name}</p>
                        <p className="text-primary/70 text-[11px] font-mono">{tippingCreator.handle}</p>
                      </div>
                    </div>

                    {/* Numeric tip selector */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Tipping Amount</label>
                        <span className="text-lg font-space font-extrabold text-primary">{tipAmount} WYLR</span>
                      </div>

                      {/* Sliding Slider with custom neon glow */}
                      <input 
                        type="range"
                        min="5"
                        max="500"
                        step="5"
                        value={tipAmount}
                        onChange={(e) => setTipAmount(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none mb-4"
                      />

                      {/* Preset Pills */}
                      <div className="grid grid-cols-4 gap-2">
                        {[10, 50, 100, 250].map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setTipAmount(preset)}
                            className={`py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                              tipAmount === preset 
                                ? "bg-primary/20 text-primary border-primary/40 shadow-inner" 
                                : "bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
                            }`}
                          >
                            +{preset}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Gas abstraction cost comparison widget */}
                    <div className="p-4 rounded-2xl bg-[#07070b] border border-white/5 space-y-3">
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Gas Comparison Ledger</p>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-emerald-400 font-bold">
                          <span>Wyler L3 Network Fee</span>
                          <span>$0.0000 (Gasless)</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-500">
                          <span>Arbitrum Standard Gas</span>
                          <span>~$0.0815</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-500">
                          <span>Ethereum Standard Gas</span>
                          <span>~$4.8020</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Submit */}
                    <button
                      onClick={executeTipSimulation}
                      className="w-full py-4 bg-primary text-white font-bold rounded-2xl uppercase tracking-widest text-xs shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2"
                    >
                      <Send size={14} /> Send Gasless Tip
                    </button>
                  </div>
                )}

                {tippingStep === "PROCESSING" && (
                  <div className="py-8 text-center space-y-6">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                      <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
                      <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" size={24} />
                    </div>
                    <div>
                      <h4 className="font-space font-extrabold text-lg uppercase tracking-wider text-white">Broadcasting Tipping TX</h4>
                      <p className="text-gray-500 text-xs mt-2 font-mono">Routing through Wyler Gas-Abstraction Hub...</p>
                    </div>
                    <div className="max-w-xs mx-auto p-3 rounded-xl bg-white/[0.01] border border-white/5 text-[10px] text-gray-500 font-mono space-y-1">
                      <div className="flex justify-between">
                        <span>GAS SPONSOR:</span>
                        <span className="text-primary font-bold">WYLER FOUNDATION</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LATENCY:</span>
                        <span>114ms</span>
                      </div>
                    </div>
                  </div>
                )}

                {tippingStep === "SUCCESS" && (
                  <div className="py-8 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h4 className="font-space font-extrabold text-xl uppercase tracking-wider text-white">Transaction Verified</h4>
                      <p className="text-gray-400 text-xs mt-2">
                        Tipped <span className="text-primary font-bold">{tipAmount} WYLR</span> to {tippingCreator.name}!
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-2xl bg-[#07070b] border border-white/5 text-left max-w-sm mx-auto space-y-2 text-xs font-mono">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-500">TX STATUS</span>
                        <span className="text-emerald-400 font-bold">COMMITTED</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>TX BLOCK</span>
                        <span>#3,892,109</span>
                      </div>
                      <div className="flex flex-col gap-0.5 text-[10px] text-gray-500 truncate">
                        <span>TX HASH</span>
                        <span className="text-gray-300 font-bold select-all">{simulatedTxHash}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setTippingCreator(null)}
                      className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-widest"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── CREATOR APPLICATION MODAL (WIZARD FORM) ────────────────────────────── */}
      <AnimatePresence>
        {showApplyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            {/* Close trigger backdrop */}
            <div className="absolute inset-0" onClick={() => !applySubmitting && setShowApplyModal(false)} />

            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-[32px] overflow-hidden relative shadow-2xl z-10"
            >
              {/* Accent glows */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Form Title Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                  <PartyPopper size={18} className="text-primary" />
                  <span className="font-space font-bold text-base uppercase tracking-wider">Creator Program Wizard</span>
                </div>
                {!applySubmitting && !applySuccess && (
                  <button 
                    onClick={() => setShowApplyModal(false)}
                    className="p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Progress steps bar */}
              {!applySuccess && (
                <div className="flex items-center bg-white/[0.01] border-b border-white/5 px-6 py-3 justify-between text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  <span className={applyStep >= 1 ? "text-primary font-bold" : ""}>1. Persona Details</span>
                  <span className="text-white/10">❯</span>
                  <span className={applyStep >= 2 ? "text-primary font-bold" : ""}>2. Staking Activation</span>
                  <span className="text-white/10">❯</span>
                  <span className={applyStep >= 3 ? "text-primary font-bold" : ""}>3. Deployment</span>
                </div>
              )}

              {/* Wizard Content */}
              <div className="p-6">
                {!applySuccess ? (
                  <form onSubmit={handleRegisterSubmit} className="space-y-6">
                    {/* Step 1: Details */}
                    {applyStep === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block">Creator Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Luna Digital"
                            value={applyName}
                            onChange={(e) => setApplyName(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-muted"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block">Unique Handle</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">@</span>
                            <input
                              type="text"
                              required
                              placeholder="handle"
                              value={applyHandle}
                              onChange={(e) => setApplyHandle(e.target.value.replace(/[@\s]/g, ""))}
                              className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-muted"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block">Ecosystem Category</label>
                          <select
                            value={applyCategory}
                            onChange={(e) => setApplyCategory(e.target.value)}
                            className="w-full bg-[#0a0a0f] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-white"
                          >
                            <option value="Design">Design & UI</option>
                            <option value="Development">Protocol Dev</option>
                            <option value="NFTs">Digital NFTs</option>
                            <option value="Infrastructure">Infrastructure/Nodes</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5 block">Ecosystem Bio</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Tell the network about what you construct..."
                            value={applyBio}
                            onChange={(e) => setApplyBio(e.target.value)}
                            className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 text-white placeholder:text-muted font-inter resize-none"
                          />
                        </div>

                        <button
                          type="button"
                          disabled={!applyName || !applyHandle || !applyBio}
                          onClick={() => setApplyStep(2)}
                          className="w-full py-4 bg-primary text-white font-bold rounded-2xl uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(79,70,229,0.2)] hover:scale-[1.02] duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                          Continue to Staking <ChevronRight size={14} />
                        </button>
                      </div>
                    )}

                    {/* Step 2: Protocol Security Staking */}
                    {applyStep === 2 && (
                      <div className="space-y-5">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-3">
                          <div className="flex items-center gap-2 text-primary">
                            <Lock size={16} />
                            <span className="font-space font-bold text-xs uppercase">Ecosystem Security Locked Deposit</span>
                          </div>
                          <p className="text-gray-400 text-xs leading-relaxed font-inter">
                            To protect the zero-gas social registry from spam, WylerChain requires creators to stake a small safety bond of **10 WYLR**. This bond remains locked but earns passive yield at **18.4% APY**.
                          </p>
                        </div>

                        <div className="p-4 bg-[#07070b] border border-white/5 rounded-2xl space-y-2 font-mono text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Security Stake Deposit:</span>
                            <span className="text-white font-bold">10.00 WYLR</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Yield Accrual Rate:</span>
                            <span className="text-emerald-400 font-bold">+18.42% APY</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Unstaking Delay:</span>
                            <span>None (Instant)</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={applyTerms}
                            onChange={(e) => setApplyTerms(e.target.checked)}
                            className="h-4 w-4 bg-white/5 border border-white/10 rounded accent-primary cursor-pointer"
                          />
                          <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer select-none">
                            I authorize locking 10 WYLR on Wyler social subnet.
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setApplyStep(1)}
                            className="py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl uppercase tracking-widest text-[10px]"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            disabled={!applyTerms}
                            onClick={() => setApplyStep(3)}
                            className="py-4 bg-primary text-white font-bold rounded-2xl uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(79,70,229,0.2)] disabled:opacity-50"
                          >
                            Confirm Deposit
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Deployment Trigger */}
                    {applyStep === 3 && (
                      <div className="space-y-6 text-center py-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary animate-pulse">
                          <Cpu size={32} />
                        </div>
                        <div className="max-w-xs mx-auto">
                          <h4 className="font-space font-bold text-base uppercase tracking-wider">Ready to Commit Profile</h4>
                          <p className="text-gray-500 text-xs mt-2">
                            Click below to dispatch your decentralized creator record onto the custom Layer 3 social contract.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#07070b] border border-white/5 text-left text-xs font-mono space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-gray-500">ACTION TYPE:</span>
                            <span>DEPLOY_CREATOR_SUBNET</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">NETWORK GAS FEE:</span>
                            <span className="text-emerald-400 font-bold">$0.00 (Abstracted)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">COMMITTING HANDLE:</span>
                            <span className="text-primary font-bold">@{applyHandle}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            disabled={applySubmitting}
                            onClick={() => setApplyStep(2)}
                            className="py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl uppercase tracking-widest text-[10px]"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={applySubmitting}
                            className="py-4 bg-primary text-white font-bold rounded-2xl uppercase tracking-widest text-[10px] shadow-[0_0_20px_rgba(79,70,229,0.2)]"
                          >
                            {applySubmitting ? "Deploying..." : "Deploy Profile"}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  /* Apply Success Visual Block */
                  <div className="py-8 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h4 className="font-space font-extrabold text-xl uppercase tracking-wider text-white">Ecosystem Deployment Success</h4>
                      <p className="text-gray-400 text-xs mt-2">
                        Your creator profile is officially active on the WylerChain L3 Gateway!
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setShowApplyModal(false);
                        setApplySuccess(false);
                      }}
                      className="px-8 py-3.5 bg-primary text-white font-bold rounded-2xl text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(79,70,229,0.3)] hover:scale-105 duration-200"
                    >
                      Enter social dashboard
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
