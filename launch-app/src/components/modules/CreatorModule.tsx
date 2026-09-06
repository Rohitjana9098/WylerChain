"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  UserPlus, 
  Search, 
  Filter,
  DollarSign
} from "lucide-react";
import AnimatedTabs from "@/components/ui/AnimatedTabs";

export default function CreatorModule() {
  const creators = [
    { id: 1, name: "Luna Digital", handle: "@luna_ux", bio: "Visual architect exploring Web3 boundaries. Currently designing the obsidian void.", followers: "12.4K", tips: "842", image: "LD" },
    { id: 2, name: "Neon Ghost", handle: "@nghost_art", bio: "Generative artist and protocol enthusiast. Liquid staking advocate.", followers: "8.2K", tips: "1.2K", image: "NG" },
    { id: 3, name: "Flux Labs", handle: "@flux_labs", bio: "Cross-chain researchers. Building the infrastructure for social finance.", followers: "45K", tips: "340", image: "FL" },
    { id: 4, name: "Oracle Smith", handle: "@osmith", bio: "Data visualization and L3 explorer. Making the unlabelled world clear.", followers: "3.5K", tips: "92", image: "OS" },
    { id: 5, name: "Cyber Curator", handle: "@ccurator", bio: "Curating the best of the WylerChain ecosystem one block at a time.", followers: "21K", tips: "2.1K", image: "CC" },
    { id: 6, name: "Prism Dev", handle: "@prism_v", bio: "Solidity architect and creator economy builder. Gasless is the future.", followers: "1.2K", tips: "15", image: "PD" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Header & Search */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-primary text-[10px] font-bold mb-1 uppercase tracking-[0.3em]">Wyler Social</p>
            <h2 className="text-4xl font-space font-bold tracking-tighter uppercase shimmer-text">Ecosystem Creators</h2>
          </div>
          <div className="flex items-center gap-3">
            <AnimatedTabs
              tabs={[
                { id: "creators", label: "Ecosystem Creators" },
                { id: "assets", label: "Protocol Assets" },
              ]}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search creators..." 
              className="bg-white/[0.03] border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/30 w-full transition-all font-inter text-white placeholder:text-muted"
            />
          </div>
          <button className="p-2.5 bg-white/[0.03] border border-white/5 rounded-full text-muted hover:text-white hover:border-primary/30 transition-all">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Featured Creator / CTA */}
      <div className="bg-primary/5 border border-primary/20 p-8 md:p-12 rounded-[32px] overflow-hidden relative group">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-space font-bold mb-4">Empower Your Creativity on <span className="text-primary italic">WylerChain</span></h3>
          <p className="text-muted text-lg mb-8 font-inter">
            WylerChain allows creators to monetize their work with zero gas fees. 
            Join the economy where social interaction drives value creation.
          </p>
          <button className="px-8 py-3.5 bg-primary text-on-primary font-bold rounded-xl hover:scale-105 transition-transform">
            Become a Creator
          </button>
        </div>
        
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px] -z-0" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-dim/10 rounded-full blur-[80px] -z-0" />
      </div>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator) => (
          <motion.div 
            key={creator.id}
            whileHover={{ y: -5 }}
            className="bg-surface-low border border-border/50 p-6 rounded-[24px] hover:bg-surface transition-all group"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-surface to-surface-highest border border-border/50 flex items-center justify-center text-xl font-space font-bold text-primary shadow-lg">
                {creator.image}
              </div>
              <button className="p-2.5 text-muted hover:text-primary bg-surface border border-border/30 rounded-xl hover:bg-surface-high transition-all">
                <UserPlus size={18} />
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-xl font-space font-bold group-hover:text-primary transition-colors">{creator.name}</h4>
              <p className="text-muted text-sm font-bold mb-4">{creator.handle}</p>
              <p className="text-muted text-sm leading-relaxed line-clamp-2 font-inter">
                {creator.bio}
              </p>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="text-left">
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Followers</p>
                <p className="text-sm font-space font-bold">{creator.followers}</p>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Total Tips</p>
                <p className="text-sm font-space font-bold">{creator.tips} WYLR</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <button className="col-span-3 py-3 bg-primary text-on-primary font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-primary-dim transition-colors">
                <DollarSign size={14} /> Send Tip
              </button>
              <button className="p-3 bg-surface border border-border/50 rounded-xl text-muted hover:text-foreground hover:bg-surface-high transition-all flex items-center justify-center">
                <MessageSquare size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
