"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute w-full h-full object-cover opacity-20 scale-105"
        >
          <source src="/Video/GENERATE_DEATAILS_PROMPT_202604081148.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="container relative z-10 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Wyler L3 Mainnet Beta Live</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl lg:text-9xl font-space font-bold uppercase tracking-tight mb-8 leading-[0.9]"
        >
          The Future of<br />
          <span className="shimmer-text">Ownership</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 font-inter leading-relaxed"
        >
          A next-generation Layer 3 network built for the global creator economy. 
          Zero gas fees, seedless onboarding, and infinite scalability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href="/auth" className="btn-brand !px-12 !py-5 !text-sm">
            Launch App
          </Link>
          <Link href="#demo" className="btn-secondary !px-12 !py-5 !text-sm">
            View Demo
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-blue/20 blur-[150px] rounded-full" />
    </section>
  );
}
