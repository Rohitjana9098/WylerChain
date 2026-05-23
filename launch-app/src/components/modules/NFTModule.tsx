"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  ExternalLink, 
  ShoppingBag,
  Heart,
  History,
  Info,
  Sparkles,
  Compass,
  Trophy
} from "lucide-react";
import AnimatedTabs from "@/components/ui/AnimatedTabs";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function NFTModule() {
  const nfts = [
    { id: 1, title: "Obsidian Core #42", creator: "Luna Digital", price: "2,500", rarity: "Legendary", royalty: "10%" },
    { id: 2, title: "Liquid Pulse #08", creator: "Neon Ghost", price: "850", rarity: "Epic", royalty: "5%" },
    { id: 3, title: "Flux Fragment #12", creator: "Flux Labs", price: "420", rarity: "Rare", royalty: "8%" },
    { id: 4, title: "Aura Node #99", creator: "Cyber Curator", price: "1,200", rarity: "Legendary", royalty: "12%" },
    { id: 5, title: "Vector Void #01", creator: "Luna Digital", price: "5,000", rarity: "Mythic", royalty: "15%" },
    { id: 6, title: "Neon Drifter #15", creator: "Neon Ghost", price: "320", rarity: "Common", royalty: "3%" },
  ];

  // Helper to render breathtaking digital CSS-art based on the NFT ID
  const renderNFTArtwork = (id: number) => {
    switch (id) {
      case 1: // Obsidian Core #42
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-black to-[#050505] flex items-center justify-center relative group-hover:scale-105 transition-all duration-700">
            <div className="absolute w-28 h-28 rounded-full bg-purple-500/10 blur-2xl animate-pulse" />
            {/* 3D Wireframe Obsidian Core */}
            <div className="relative w-20 h-20 border-2 border-purple-500/30 rounded-2xl animate-[spin_10s_linear_infinite] flex items-center justify-center">
              <div className="absolute w-14 h-14 border border-indigo-400/40 rounded-xl animate-[spin_5s_linear_infinite_reverse]" />
              <div className="absolute w-8 h-8 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.6)] animate-ping duration-1000" />
            </div>
            {/* Grid Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />
          </div>
        );
      case 2: // Liquid Pulse #08
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-black to-zinc-950 flex items-center justify-center relative group-hover:scale-105 transition-all duration-700">
            <div className="absolute w-32 h-32 rounded-full bg-blue-500/10 blur-[30px]" />
            {/* Liquid Blobs */}
            <div className="absolute w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 opacity-60 blur-sm animate-[pulse_3s_ease-in-out_infinite] translate-x-2 -translate-y-2" />
            <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 opacity-50 blur-sm animate-[pulse_4s_ease-in-out_infinite] -translate-x-3 translate-y-3" />
            <div className="absolute w-8 h-8 rounded-full bg-white/20 border border-white/40 flex items-center justify-center backdrop-blur-md shadow-lg">
              <span className="text-[10px] text-white">💧</span>
            </div>
          </div>
        );
      case 3: // Flux Fragment #12
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-pink-950/40 via-black to-[#050505] flex items-center justify-center relative group-hover:scale-105 transition-all duration-700">
            <div className="absolute w-24 h-24 bg-pink-500/10 blur-[25px] animate-pulse" />
            {/* Cyber Node Grid */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,1)]" />
              <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />
              <div className="absolute top-2 right-6 w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <div className="w-16 h-16 border border-pink-500/20 rounded-lg transform rotate-45 flex items-center justify-center">
                <div className="w-10 h-10 border border-indigo-500/30 rounded-md flex items-center justify-center">
                  <div className="w-4 h-4 bg-pink-500/80 rounded-sm" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
          </div>
        );
      case 4: // Aura Node #99
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-950/30 via-black to-[#050505] flex items-center justify-center relative group-hover:scale-105 transition-all duration-700">
            <div className="absolute w-28 h-28 bg-yellow-500/5 blur-[35px]" />
            {/* Concentric Pulsing Aura */}
            <div className="absolute w-24 h-24 rounded-full border border-yellow-500/10 animate-ping duration-3000" />
            <div className="absolute w-16 h-16 rounded-full border border-yellow-500/20 animate-pulse" />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-600 border border-yellow-300/30 flex items-center justify-center shadow-[0_0_25px_rgba(234,179,8,0.5)] z-10 group-hover:scale-110 transition-transform">
              <span className="text-[10px] text-white">✨</span>
            </div>
          </div>
        );
      case 5: // Vector Void #01
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950/40 via-black to-[#050505] flex items-center justify-center relative group-hover:scale-105 transition-all duration-700 overflow-hidden">
            <div className="absolute w-36 h-36 bg-teal-500/10 blur-[45px] animate-pulse" />
            {/* Cyber Vortex */}
            <div className="absolute w-32 h-32 border border-teal-500/10 rounded-full animate-[spin_12s_linear_infinite]" />
            <div className="absolute w-24 h-24 border border-dashed border-teal-500/20 rounded-full animate-[spin_8s_linear_infinite_reverse]" />
            <div className="absolute w-16 h-16 border-2 border-double border-teal-400/40 rounded-full animate-[spin_4s_linear_infinite]" />
            <div className="w-6 h-6 bg-black border border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.5)] rounded-full z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_8px]" />
          </div>
        );
      case 6: // Neon Drifter #15
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black to-[#050505] flex items-center justify-center relative group-hover:scale-105 transition-all duration-700">
            <div className="absolute w-28 h-28 bg-red-500/10 blur-[30px] animate-pulse" />
            {/* Neon Drifting Stripes */}
            <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent top-1/3 -rotate-12 animate-pulse" />
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent bottom-1/3 -rotate-12 animate-pulse delay-700" />
            <div className="w-12 h-12 bg-[#121218] border border-red-500/30 rounded-2xl flex items-center justify-center transform hover:rotate-12 transition-transform shadow-lg z-10">
              <span className="text-[12px] text-red-400 font-bold">#15</span>
            </div>
          </div>
        );
      default:
        return <div className="absolute inset-0 bg-surface flex items-center justify-center"><span className="text-white/10 font-bold">WYLR</span></div>;
    }
  };

  const rarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary": return "bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]";
      case "Epic": return "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]";
      case "Rare": return "bg-pink-500/10 border-pink-500/30 text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.2)]";
      case "Mythic": return "bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)]";
      default: return "bg-white/5 border-white/10 text-gray-400";
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-20 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-primary text-[10px] font-bold mb-1 uppercase tracking-[0.3em]">Protocol Assets</p>
          <h2 className="text-4xl font-space font-bold tracking-tighter uppercase shimmer-text">NFT Gallery</h2>
        </div>
        <div className="flex items-center gap-4">
          <AnimatedTabs
            tabs={[
              { id: "collections", label: "NFT Gallery" },
              { id: "assets", label: "My Assets" },
            ]}
          />
          <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-indigo-500/30 text-white font-bold rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all duration-300 active:scale-95 cursor-pointer">
            <Plus size={14} /> Mint New NFT
          </button>
        </div>
      </div>

      {/* Featured Collection Banner */}
      <div className="bg-gradient-to-br from-surface-highest via-[#09090e] to-surface-high border border-white/5 rounded-[40px] p-1.5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-[-20%] right-[-10%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="bg-[#050508]/80 backdrop-blur-md rounded-[36px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
          
          {/* Floating membership pass */}
          <div className="relative w-64 h-64 shrink-0 flex items-center justify-center perspective-1000 group/pass">
            {/* Dynamic glow base */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-3xl opacity-20 blur-xl group-hover/pass:opacity-40 transition-opacity duration-1000" />
            
            {/* The Floating Card */}
            <div className="w-52 h-52 bg-gradient-to-b from-[#161622] to-[#050508] border border-white/10 rounded-3xl p-6 relative flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group-hover/pass:-rotate-2 group-hover/pass:-translate-y-2 group-hover/pass:border-purple-500/40 transition-all duration-500 group-hover/pass:shadow-[0_20px_50px_rgba(108,92,231,0.2)]">
              {/* Card Holographic Stripes */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.015)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.015)_50%,_rgba(255,255,255,0.015)_75%,_transparent_75%,_transparent)] bg-[size:24px_24px] pointer-events-none opacity-40" />
              
              <div className="flex justify-between items-center relative z-10">
                <span className="text-[7px] font-mono tracking-widest font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded">VIP PASS</span>
                <Sparkles size={16} className="text-purple-400 filter drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
              </div>
              
              <div className="text-center relative z-10">
                <p className="font-space font-black text-white text-base leading-tight uppercase tracking-[0.15em] mb-1">
                  Wyler Origin
                </p>
                <p className="font-space font-bold text-gray-500 text-[10px] uppercase tracking-[0.1em]">
                  Membership Pass
                </p>
              </div>

              <div className="flex justify-between items-center text-[7px] font-mono text-gray-500 uppercase tracking-widest pt-2 border-t border-white/5 relative z-10">
                <span>Pass #042</span>
                <span className="text-indigo-400 font-bold">L3 Cryptograph</span>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-mono tracking-widest uppercase animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              Official Genesis Collection
            </span>
            <h3 className="text-4xl font-space font-black uppercase text-white mb-4 tracking-tight">Wyler Origin Pass</h3>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-xl font-light font-inter">
              Access the foundational layer of the WylerChain creator economy. Passes provide exclusive node governance votes, staking yield multipliers, and early access to ecosystem dApp whitelists.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-12">
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Floor Price</p>
                <p className="text-xl font-space font-black text-primary">2,500 WYLR</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Total Passes</p>
                <p className="text-xl font-space font-black text-white">1,000</p>
              </div>
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <div>
                <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Volume Traded</p>
                <p className="text-xl font-space font-black text-indigo-400">450K WYLR</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <motion.div 
            key={nft.id}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 p-4 rounded-[28px] hover:border-primary/30 transition-all duration-500 group overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] flex flex-col justify-between"
          >
            <div>
              {/* Dynamic CSS Art Canvas Wrapper */}
              <div className="aspect-square bg-surface rounded-[20px] mb-4 relative overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
                 {renderNFTArtwork(nft.id)}
                 
                 <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                   <button className="p-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-primary hover:text-white transition-colors cursor-pointer active:scale-90">
                     <Heart size={14} className="fill-transparent" />
                   </button>
                 </div>
                 
                 <div className={`absolute bottom-3 left-3 border px-3 py-1 rounded-full backdrop-blur-md z-20 ${rarityColor(nft.rarity)}`}>
                   <p className="text-[8px] font-bold uppercase tracking-widest font-mono">{nft.rarity}</p>
                 </div>
              </div>

              <div className="px-1.5">
                <h4 className="text-base font-space font-bold mb-1 truncate text-gray-200 group-hover:text-primary transition-colors duration-300">
                  {nft.title}
                </h4>
                <p className="text-[9px] text-gray-500 font-bold mb-5 uppercase tracking-widest flex items-center justify-between">
                  <span>By {nft.creator}</span>
                  <span className="text-[8px] text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">{nft.royalty} Royalty</span>
                </p>
              </div>
            </div>
            
            <div className="px-1.5 pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Price</p>
                <p className="text-sm font-space font-extrabold text-white">{nft.price} <span className="text-[10px] text-indigo-400 font-medium">WYLR</span></p>
              </div>
              <button className="bg-[#121218] border border-white/5 p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-primary hover:border-primary hover:shadow-[0_0_12px_rgba(79,70,229,0.5)] transition-all duration-300 cursor-pointer active:scale-95">
                <ShoppingBag size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
