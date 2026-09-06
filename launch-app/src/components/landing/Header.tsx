"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/50 backdrop-blur-xl border-b border-white/5 h-20">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(108,92,231,0.3)] transition-transform group-hover:scale-110">
            <span className="text-white font-bold text-xl uppercase">W</span>
          </div>
          <span className="font-space font-bold text-lg uppercase tracking-[0.2em] group-hover:text-primary transition-colors">WylerChain</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10 font-space text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Stack</a>
          <a href="#creators" className="hover:text-white transition-colors">Creators</a>
          <a href="#staking" className="hover:text-white transition-colors">Staking</a>
          <a href="#ecosystem" className="hover:text-white transition-colors">Eco</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth" className="btn-brand !px-6 !py-2.5">
            Launch App
          </Link>
        </div>
      </div>
    </header>
  );
}
