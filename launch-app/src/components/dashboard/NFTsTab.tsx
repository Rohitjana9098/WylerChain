"use client";

import React from "react";
import { Plus, LayoutGrid, Info, Tag, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const NFTS = [
  { id: 1, name: "Neural Landscape #01", collection: "Neural Realms", price: "0.45 WYLER", type: "IMAGE", color: "from-purple/20 to-blue-500/20" },
  { id: 2, name: "Void Echoes", collection: "Sonic Forms", price: "12.00 WYLER", type: "AUDIO", color: "from-accent-cyan/20 to-primary/20" },
  { id: 3, name: "Geometric Gaze", collection: "Prism Art", price: "4.20 WYLER", type: "VIDEO", color: "from-accent-gold/20 to-accent-green/20" },
  { id: 4, name: "Cyber Blossom", collection: "Gen Flora", price: "0.85 WYLER", type: "3D", color: "from-pink-500/20 to-purple/20" },
  { id: 5, name: "Abstract Logic", collection: "Protocol Code", price: "88.00 WYLER", type: "IMAGE", color: "from-blue-600/20 to-accent-cyan/20" },
  { id: 6, name: "Future Relic", collection: "Artifacts", price: "150.0 WYLER", type: "MODEL", color: "from-white/10 to-white/5" }
];

export default function NFTsTab() {
  return (
    <div className="space-y-8">
      {/* Mint Banner */}
      <div className="relative rounded-[2.5rem] bg-surface-high border border-white/10 overflow-hidden group p-8 md:p-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan font-bold text-[8px] uppercase tracking-widest w-fit mb-4 mx-auto md:mx-0">Gasless Minting</div>
            <h2 className="text-3xl md:text-5xl font-space font-bold uppercase tracking-tight mb-4">Turn expression into <span className="shimmer-text">Assets</span></h2>
            <p className="text-white/50 text-base mb-8">Deploy your creative work directly to the Wyler L3. Zero cost, instant validation, permanent on-chain provenance.</p>
            <button className="btn-brand flex items-center gap-3">
               <Plus size={18} />
               Create New NFT
            </button>
          </div>
          <div className="hidden lg:block w-64 h-64 rounded-[3rem] bg-gradient-to-br from-primary to-accent-blue rotate-12 group-hover:rotate-0 transition-transform duration-1000 p-2 shadow-2xl">
             <div className="w-full h-full rounded-[2.5rem] bg-surface-low border border-white/20 flex items-center justify-center font-space text-7xl">🎨</div>
          </div>
        </div>
      </div>

      {/* NFT Grid Stats */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-space font-bold text-lg uppercase tracking-widest">My Collection</h3>
        <div className="flex items-center gap-3">
           <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{NFTS.length} Assets Found</span>
           <div className="h-4 w-[1px] bg-white/10 mx-2" />
           <button className="text-primary hover:text-white transition-colors"><LayoutGrid size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {NFTS.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
    </div>
  );
}

function NFTCard({ nft }: any) {
  return (
    <div className="glass-card !p-3 group hover:-translate-y-2 transition-transform duration-500">
      <div className={`aspect-square rounded-2xl bg-gradient-to-br ${nft.color} border border-white/5 mb-4 relative overflow-hidden flex items-center justify-center text-6xl group-hover:scale-[1.02] transition-transform`}>
         <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
            <button className="w-full py-2.5 rounded-xl bg-white text-black font-space font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform">View Details</button>
         </div>
         <span className="filter grayscale group-hover:grayscale-0 transition-all">{nft.type === 'IMAGE' ? '🖼️' : nft.type === 'VIDEO' ? '🎥' : nft.type === 'AUDIO' ? '🎵' : '💎'}</span>
         <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 font-mono text-[8px] font-bold">{nft.type}</div>
      </div>

      <div className="p-3">
        <div className="flex justify-between items-start mb-2">
           <div>
             <h4 className="font-space font-bold text-base truncate max-w-[150px]">{nft.name}</h4>
             <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{nft.collection}</p>
           </div>
           <div className="text-right">
             <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest mb-0.5">Price</p>
             <p className="font-space font-bold text-sm text-accent-green">{nft.price}</p>
           </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
           <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-white/10 border-2 border-surface-low" />
              ))}
           </div>
           <div className="flex items-center gap-3">
              <button className="text-white/30 hover:text-white transition-colors"><Tag size={14} /></button>
              <button className="text-white/30 hover:text-white transition-colors"><ExternalLink size={14} /></button>
           </div>
        </div>
      </div>
    </div>
  );
}
