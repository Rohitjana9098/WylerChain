"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { 
  Wallet as WalletIcon, 
  BarChart3, 
  Users, 
  Image as ImageIcon, 
  Compass,
  LogOut,
  Bell,
  Menu,
  ChevronDown
} from "lucide-react";
import WalletModule from "./WalletModule";
import StakingModule from "./StakingModule";
import CreatorModule from "./CreatorModule";
import NFTModule from "./NFTModule";
import ExploreModule from "./ExploreModule";

const TABS = [
  { id: "WALLET", label: "Wallet", icon: WalletIcon },
  { id: "STAKING", label: "Staking", icon: BarChart3 },
  { id: "CREATORS", label: "Creators", icon: Users },
  { id: "NFTS", label: "NFTs", icon: ImageIcon },
  { id: "EXPLORE", label: "Explore", icon: Compass },
] as const;

export default function Dashboard() {
  const { activeTab, setTab, logout, currentUser } = useAuth();

  const renderModule = () => {
    switch (activeTab) {
      case "WALLET": return <WalletModule />;
      case "STAKING": return <StakingModule />;
      case "CREATORS": return <CreatorModule />;
      case "NFTS": return <NFTModule />;
      case "EXPLORE": return <ExploreModule />;
      default: return <WalletModule />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-foreground flex flex-col void-bg">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 h-20">
        <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <img src="/logos/wordmark.png" alt="WylerChain" className="h-10 w-auto" />
            </div>
            
            <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                    activeTab === tab.id 
                      ? "text-white bg-primary shadow-[0_0_20px_rgba(79,70,229,0.4)]" 
                      : "text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-muted hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Bell size={18} />
            </button>
            
            <div className="h-8 w-[1px] bg-white/10 mx-2" />

            <div className="flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-full border border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-primary-dim to-accent-blue flex items-center justify-center text-[10px] font-bold shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                WC
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1 group-hover:text-primary transition-colors">
                  {currentUser}
                </p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <p className="text-[8px] text-muted font-bold uppercase tracking-wider">L3 Protocol</p>
                </div>
              </div>
              <ChevronDown size={14} className="text-muted" />
            </div>

            <button 
              onClick={logout}
              className="p-2.5 text-muted hover:text-error hover:bg-error/10 rounded-full transition-all ml-2"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>


      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 transition-all">
        <div className="max-w-[1400px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
