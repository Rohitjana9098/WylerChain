"use client";

import React from "react";
import { 
  Wallet, 
  Zap, 
  Users, 
  Grid, 
  Compass, 
  LogOut, 
  Bell, 
  ChevronRight,
  Menu
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import WalletTab from "./WalletTab";
import StakingTab from "./StakingTab";
import CreatorsTab from "./CreatorsTab";
import NFTsTab from "./NFTsTab";
import ExploreTab from "./ExploreTab";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardShell() {
  const { activeTab, setTab, logout, currentUser } = useAuth();

  const NAV_ITEMS = [
    { id: "WALLET" as const, label: "Wallet", icon: <Wallet size={20} /> },
    { id: "STAKING" as const, label: "Staking", icon: <Zap size={20} /> },
    { id: "CREATORS" as const, label: "Creators", icon: <Users size={20} /> },
    { id: "NFTS" as const, label: "NFTs", icon: <Grid size={20} /> },
    { id: "EXPLORE" as const, label: "Explore", icon: <Compass size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-surface-low/30 backdrop-blur-3xl p-8 flex flex-col fixed h-full z-40">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl uppercase">W</span>
          </div>
          <span className="font-space font-bold text-lg uppercase tracking-[0.2em]">WylerChain</span>
        </div>

        <nav className="space-y-4 flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                activeTab === item.id 
                ? "bg-primary text-white shadow-xl shadow-primary/20" 
                : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-4">
                {item.icon}
                <span className="font-space font-bold uppercase text-xs tracking-widest">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        <div className="pt-8 mt-8 border-t border-white/5 space-y-6">
           <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent-blue" />
              <div className="flex-1 overflow-hidden">
                 <p className="font-space font-bold text-xs uppercase tracking-tight truncate">{currentUser}</p>
                 <p className="text-[10px] text-accent-green font-bold uppercase tracking-widest">Connected</p>
              </div>
           </div>
           
           <button 
             onClick={() => { logout(); window.location.href = '/'; }}
             className="w-full flex items-center gap-4 p-4 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all group"
           >
             <LogOut size={20} />
             <span className="font-space font-bold uppercase text-xs tracking-widest">Disconnect</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 min-h-screen relative p-10 pb-20">
        <header className="flex justify-between items-center mb-12">
           <div className="flex items-center gap-4">
              <div className="md:hidden">
                 <Menu className="text-white" />
              </div>
              <h1 className="text-4xl font-space font-bold uppercase tracking-tighter">
                {activeTab} <span className="text-primary">Hub</span>
              </h1>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="relative">
                 <div className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                 <Bell size={20} className="text-white/40 hover:text-white cursor-pointer" />
              </div>
              <button className="px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 font-space font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                 0x4fc9...f192
              </button>
           </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "WALLET" && <WalletTab />}
            {activeTab === "STAKING" && <StakingTab />}
            {activeTab === "CREATORS" && <CreatorsTab />}
            {activeTab === "NFTS" && <NFTsTab />}
            {activeTab === "EXPLORE" && <ExploreTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-blue/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
