"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  ExternalLink, 
  ShoppingBag,
  Heart,
  History,
  Info
} from "lucide-react";
import AnimatedTabs from "@/components/ui/AnimatedTabs";

export default function NFTModule() {
  const nfts = [
    { id: 1, title: "Obsidian Core #42", creator: "Luna Digital", price: "2,500", rarity: "Legendary" },
    { id: 2, title: "Liquid Pulse #08", creator: "Neon Ghost", price: "850", rarity: "Epic" },
    { id: 3, title: "Flux Fragment #12", creator: "Flux Labs", price: "420", rarity: "Rare" },
    { id: 4, title: "Aura Node #99", creator: "Cyber Curator", price: "1,200", rarity: "Legendary" },
    { id: 5, title: "Vector Void #01", creator: "Luna Digital", price: "5,000", rarity: "Mythic" },
    { id: 6, title: "Neon Drifter #15", creator: "Neon Ghost", price: "320", rarity: "Common" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20">
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
          <button className="px-6 py-2.5 btn-brand text-white font-bold rounded-full text-[10px] uppercase tracking-widest flex items-center gap-2">
            <Plus size={16} /> Mint New NFT
          </button>
        </div>
      </div>

      {/* Featured Collection Banner */}
      <div className="bg-surface-high border border-border/50 rounded-[32px] p-1 h-fit">
        <div className="bg-background rounded-[28px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-64 h-64 rounded-2xl bg-gradient-to-br from-primary via-primary-dim to-[#000] p-1 shadow-2xl overflow-hidden group">
             <div className="w-full h-full bg-background/20 backdrop-blur-sm rounded-[14px] flex items-center justify-center p-6 text-center">
                <p className="font-space font-bold text-lg leading-tight uppercase tracking-wider group-hover:scale-110 transition-transform">Wyler Origin Collection</p>
             </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Official Release</span>
            <h3 className="text-3xl font-space font-bold mb-4">Wyler Origin Pass</h3>
            <p className="text-muted text-lg mb-8 max-w-xl font-inter">
              Access the foundational layer of the WylerChain creator economy. Passes provide voting rights, staking boosts, and exclusive creator whitelist access.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-8">
              <div>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Floor Price</p>
                <p className="text-xl font-space font-bold text-primary">2,500 WYLR</p>
              </div>
              <div>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Items</p>
                <p className="text-xl font-space font-bold">1,000</p>
              </div>
              <div>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-1">Vol. Traded</p>
                <p className="text-xl font-space font-bold">450K</p>
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
            whileHover={{ y: -5 }}
            className="bg-surface-low border border-border/50 p-4 rounded-[24px] hover:border-primary/20 transition-all group overflow-hidden"
          >
            {/* Artwork Placeholder */}
            <div className="aspect-square bg-surface rounded-[20px] mb-4 relative overflow-hidden flex items-center justify-center border border-border/20 group-hover:bg-surface-highest transition-colors">
               <span className="font-space font-bold text-4xl text-white/5 uppercase select-none group-hover:text-primary/10 transition-colors">WYLR</span>
               <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button className="p-2 bg-background/80 backdrop-blur-md rounded-lg text-primary hover:text-white transition-colors">
                   <Heart size={16} />
                 </button>
               </div>
               
               <div className="absolute bottom-3 left-3 bg-primary/20 backdrop-blur-md border border-primary/30 px-3 py-1 rounded-full">
                 <p className="text-[8px] font-bold text-primary-dim uppercase tracking-widest">{nft.rarity}</p>
               </div>
            </div>

            <div className="px-1">
              <h4 className="text-base font-space font-bold mb-1 truncate group-hover:text-primary transition-colors">{nft.title}</h4>
              <p className="text-[10px] text-muted font-bold mb-4 uppercase tracking-widest flex items-center justify-between">
                <span>By {nft.creator}</span>
                <span className="text-[8px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">15% Royalty</span>
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/10">
                <div>
                  <p className="text-[8px] text-muted font-bold uppercase tracking-widest mb-0.5">Price</p>
                  <p className="text-sm font-space font-bold text-primary">{nft.price} WYLR</p>
                </div>
                <button className="bg-surface-highest p-2.5 rounded-xl text-muted hover:text-foreground hover:bg-surface transition-all">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
