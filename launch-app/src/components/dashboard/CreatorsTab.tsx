"use client";

import React from "react";
import { Search, Heart, MessageSquare, DollarSign, Filter, Grid, List, Users } from "lucide-react";
import { motion } from "framer-motion";

const CREATORS = [
  { id: 1, name: "Alex Rivera", handle: "@arivera", bio: "Visual artist exploring 3D generative landscapes.", followers: "42.5K", tips: "128", image: "A" },
  { id: 2, name: "Sarah Chen", handle: "@sarah.c", bio: "Digital sculptor and NFT pioneer based in Tokyo.", followers: "18.2K", tips: "84", image: "S" },
  { id: 3, name: "Marcus Vibe", handle: "@vibe_beats", bio: "Audio architect crafting the soundtrack of the metaverse.", followers: "94.0K", tips: "256", image: "M" },
  { id: 4, name: "Luna Kim", handle: "@luna_nft", bio: "Character designer for leading Web3 gaming protocols.", followers: "31.4K", tips: "52", image: "L" },
  { id: 5, name: "Dr. Zero", handle: "@zero_dev", bio: "Full-stack protocol engineer building the open web.", followers: "12.8K", tips: "312", image: "Z" },
  { id: 6, name: "Ava Bloom", handle: "@ava.bloom", bio: "Generative flora and ecosystem visualization.", followers: "7.1K", tips: "19", image: "A" }
];

export default function CreatorsTab() {
  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between glass-card !p-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search creators, artists, or developers..." 
            className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-primary/50 focus:outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest">
            <Filter size={14} />
            Filters
          </button>
          <div className="flex bg-white/5 rounded-xl border border-white/5 p-1">
             <button className="p-2 bg-primary rounded-lg text-white"><Grid size={16} /></button>
             <button className="p-2 text-white/40 hover:text-white"><List size={16} /></button>
          </div>
        </div>
      </div>

      {/* Featured Creator Row */}
      <div className="relative h-[300px] rounded-[2.5rem] overflow-hidden group">
         <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/20 to-accent-blue/20" />
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
         
         <div className="absolute inset-0 p-10 flex flex-col justify-end">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold text-black font-bold text-[8px] uppercase tracking-widest w-fit mb-4">Featured Creator</div>
            <h2 className="text-4xl md:text-5xl font-space font-bold uppercase tracking-tight mb-2">Marcus Vibe</h2>
            <p className="text-white/70 max-w-lg mb-6 text-sm">Join 94,000+ followers supporting the audio pioneer of WylerChain. Exclusive access drops every Friday.</p>
            <div className="flex items-center gap-4">
               <button className="btn-brand">Follow Creator</button>
               <button className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 font-bold uppercase text-[10px] tracking-widest">View Profile</button>
            </div>
         </div>
      </div>

      {/* Discovery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CREATORS.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
}

function CreatorCard({ creator }: any) {
  return (
    <div className="glass-card hover:border-primary/40 group relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/20 transition-all" />
      
      <div className="flex items-start gap-5 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-surface-high border border-white/5 flex items-center justify-center font-space font-bold text-2xl text-white/10 group-hover:text-primary transition-all">
          {creator.image}
        </div>
        <div className="pt-1">
          <h4 className="font-space font-bold text-lg leading-tight">{creator.name}</h4>
          <p className="text-primary font-mono text-[10px] uppercase font-bold tracking-widest">{creator.handle}</p>
        </div>
      </div>

      <p className="text-white/50 text-xs mb-8 leading-relaxed line-clamp-2">
        {creator.bio}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-white/5">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Community</p>
          <div className="flex items-center gap-2">
             <Users size={12} className="text-accent-cyan" />
             <span className="font-space font-bold text-sm">{creator.followers}</span>
          </div>
        </div>
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Protocol Support</p>
          <div className="flex items-center gap-2">
             <Heart size={12} className="text-accent-gold" />
             <span className="font-space font-bold text-sm">{creator.tips}K Tips</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 py-3 rounded-xl transition-all font-bold uppercase text-[10px] tracking-widest">
           Profile
        </button>
        <button className="flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary py-3 rounded-xl transition-all font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-primary/5">
           Send Tip
        </button>
      </div>
    </div>
  );
}
