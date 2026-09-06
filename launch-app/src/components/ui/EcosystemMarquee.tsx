"use client";

import React from "react";
import { motion } from "framer-motion";

const PROTOCOLS = [
  { name: "Ethereum", icon: "⟠" },
  { name: "Polygon", icon: "⬡" },
  { name: "Arbitrum", icon: "◎" },
  { name: "Optimism", icon: "⊙" },
  { name: "Base", icon: "⬟" },
  { name: "Solana", icon: "◈" },
  { name: "Avalanche", icon: "◆" },
  { name: "BNB Chain", icon: "⬢" },
  { name: "Cosmos", icon: "✦" },
  { name: "Sui", icon: "◇" },
  { name: "Aptos", icon: "◉" },
  { name: "Near", icon: "⊡" },
];

// Duplicate for seamless loop
const TRACK = [...PROTOCOLS, ...PROTOCOLS];

export default function EcosystemMarquee() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-3">Ecosystem</p>
        <h2 className="text-2xl md:text-3xl font-space font-bold text-white uppercase tracking-tighter">
          Cross-Chain by Design
        </h2>
      </div>

      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #000000, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #000000, transparent)" }} />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {TRACK.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 shrink-0 hover:bg-white/[0.06] hover:border-primary/30 transition-all group cursor-default"
                style={{ minWidth: 180 }}
              >
                <span className="text-2xl">{p.icon}</span>
                <span className="text-sm font-bold text-muted group-hover:text-white transition-colors tracking-wide">{p.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
