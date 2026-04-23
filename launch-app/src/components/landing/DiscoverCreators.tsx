"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Star, ArrowUpRight } from "lucide-react";

const CREATORS = [
  {
    id: 1,
    name: "Alex Rivera",
    handle: "@arivera",
    bio: "Visual artist exploring 3D generative landscapes.",
    followers: "42.5K",
    tips: "128 ETH",
    isTrending: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    handle: "@sarah.c",
    bio: "Digital sculptor and NFT pioneer based in Tokyo.",
    followers: "18.2K",
    tips: "84 ETH",
    isFeatured: true,
  },
  {
    id: 3,
    name: "Marcus Vibe",
    handle: "@vibe_beats",
    bio: "Audio architect crafting the soundtrack of the metaverse.",
    followers: "94.0K",
    tips: "256 ETH",
    isTrending: true,
  },
  {
    id: 4,
    name: "Luna Kim",
    handle: "@luna_nft",
    bio: "Character designer for leading Web3 gaming protocols.",
    followers: "31.4K",
    tips: "52 ETH",
  }
];

export default function DiscoverCreators() {
  return (
    <section className="py-32 relative overflow-hidden bg-surface-low/50" id="discover">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-4"
            >
              <Star size={12} className="text-accent-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">Curated Talent</span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-space font-bold uppercase tracking-tight">
              Discover <span className="text-primary italic">Creators</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md font-inter text-lg">
            Support the world's most innovative artists and developers directly in the WylerChain ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CREATORS.map((creator, i) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group relative"
            >
              {/* Status Badge */}
              {(creator.isTrending || creator.isFeatured) && (
                <div className={`absolute top-4 right-4 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest border ${
                  creator.isTrending ? "bg-accent-green/10 text-accent-green border-accent-green/20" : "bg-primary/10 text-primary border-primary/20"
                }`}>
                  {creator.isTrending ? "Trending" : "Featured"}
                </div>
              )}

              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-surface-high to-surface overflow-hidden mb-6 p-1 border border-white/5 group-hover:border-primary/50 transition-colors">
                  <div className="w-full h-full rounded-xl bg-surface flex items-center justify-center text-3xl font-bold text-white/20">
                    {creator.name[0]}
                  </div>
                </div>

                <h3 className="font-space font-bold text-xl mb-1 group-hover:text-primary transition-colors">{creator.name}</h3>
                <p className="text-primary font-mono text-xs mb-4">{creator.handle}</p>
                <p className="text-white/50 text-sm mb-8 leading-relaxed line-clamp-2">
                  {creator.bio}
                </p>

                <div className="w-full grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-white/5">
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Followers</p>
                    <p className="font-space font-bold text-lg">{creator.followers}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Total Tips</p>
                    <p className="font-space font-bold text-lg text-accent-green">{creator.tips}</p>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-3">
                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 font-bold uppercase text-[10px] tracking-widest transition-all">
                    View Profile
                  </button>
                  <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary-glow border border-primary/50 font-bold uppercase text-[10px] tracking-widest transition-all text-white shadow-xl">
                    Send Tip
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 flex justify-center"
        >
          <button className="group flex items-center gap-4 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
            <span className="font-space font-bold uppercase text-sm tracking-widest text-white/70 group-hover:text-white">Explored All Creators</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <ArrowUpRight size={18} />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
