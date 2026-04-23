"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { ChevronRight, Zap, Shield, Repeat, Layers, Cpu, Globe } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MetricsStrip from "@/components/ui/MetricsStrip";
import EcosystemMarquee from "@/components/ui/EcosystemMarquee";
import SuiReveal from "@/components/ui/SuiReveal";

// ─── Boneyard Skeleton Loading Screen ─────────────────────────────────────────
function BoneyardSkeleton({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 600);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[999] bg-black flex flex-col gap-6 p-8 pointer-events-none"
    >
      {/* Nav skeleton */}
      <div className="flex items-center justify-between">
        <div className="skeleton h-8 w-40 rounded-full" />
        <div className="flex gap-3">
          <div className="skeleton h-8 w-24 rounded-full" />
          <div className="skeleton h-8 w-24 rounded-full" />
          <div className="skeleton h-9 w-32 rounded-full" />
        </div>
      </div>
      {/* Hero skeleton */}
      <div className="flex flex-col items-center gap-6 mt-20">
        <div className="skeleton h-28 w-28 rounded-full" />
        <div className="skeleton h-5 w-40 rounded-full" />
        <div className="skeleton h-20 w-3/4 rounded-2xl" />
        <div className="skeleton h-20 w-2/3 rounded-2xl" />
        <div className="skeleton h-5 w-1/2 rounded-full" />
        <div className="flex gap-4 mt-4">
          <div className="skeleton h-14 w-44 rounded-full" />
          <div className="skeleton h-14 w-44 rounded-full" />
        </div>
      </div>
      {/* Metrics skeleton */}
      <div className="grid grid-cols-5 gap-4 mt-12">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="skeleton h-10 w-24 rounded-lg" />
            <div className="skeleton h-4 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Feature Card ──────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <SpotlightCard className="p-8 bg-white/[0.02] border border-white/5 rounded-[24px] flex flex-col gap-4 group hover:border-primary/20 transition-all hover:-translate-y-1 duration-300">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-space font-bold text-white">{title}</h3>
      <p className="text-muted leading-relaxed font-inter text-sm">{description}</p>
    </SpotlightCard>
  );
}

// ─── Main Landing ─────────────────────────────────────────────────────────────
export default function Landing() {
  const router = useRouter();
  const { setView } = useAuth();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white void-bg">
      {/* 1. Boneyard Skeleton Loading */}
      {!loaded && <BoneyardSkeleton onDone={() => setLoaded(true)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <img src="/logos/wordmark.png" alt="WylerChain" className="h-8 w-auto" />
            <div className="hidden md:flex items-center gap-6">
              <button className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white transition-colors">Infrastructure</button>
              <button className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-white transition-colors">Ecosystem</button>
            </div>
            <button
              onClick={() => router.push("/app")}
              className="px-6 py-2.5 btn-brand text-white text-[10px] font-bold rounded-full uppercase tracking-widest"
            >
              Launch App
            </button>
          </div>
        </nav>

        {/* 4. Sui Word-Reveal Hero */}
        <section className="relative pt-48 pb-20 px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-center"
          >
            {/* 3D Float Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="/logos/mark.png"
                alt="Wyler Logo"
                className="h-28 w-auto float-logo drop-shadow-[0_0_40px_rgba(91,44,255,0.35)]"
              />
            </div>

            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-bold tracking-[0.4em] uppercase border border-primary/20 bg-primary/5 text-primary rounded-full">
              Official Prototype · Layer 3
            </span>

            <div className="mb-8">
              <SuiReveal
                text="Unlabeled Web3 Infrastructure"
                as="h1"
                className="text-5xl md:text-8xl font-space font-bold uppercase tracking-tighter text-white"
                stagger={0.08}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 font-inter"
            >
              WylerChain delivers scalable execution, zero-gas transactions, and builder-ready L3 infrastructure for the next generation of Web3 products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                onClick={() => router.push("/app")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-4 btn-brand text-white font-bold rounded-full flex items-center gap-2 cursor-pointer shadow-[0_0_30px_rgba(91,44,255,0.3)]"
              >
                Launch App <ChevronRight size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-10 py-4 bg-transparent border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all"
              >
                View Brand Kit
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* 3. Animated Metrics Strip */}
        <MetricsStrip />

        {/* Feature Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-3">Core Features</p>
            <SuiReveal
              text="Built for the Creator Economy"
              as="h2"
              className="text-3xl md:text-5xl font-space font-bold text-white uppercase tracking-tighter"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={<Zap />} title="Gasless Transactions" description="Abstracted gas fees for a seamless Web2-like user experience. Zero friction onboarding." />
            <FeatureCard icon={<Shield />} title="Social Login" description="Onboard users in seconds with Google, Apple, or Email. Seedless wallet generation included." />
            <FeatureCard icon={<Repeat />} title="Cross-Chain Support" description="Native interoperability across all major blockchain ecosystems without bridging overhead." />
            <FeatureCard icon={<Layers />} title="Liquid Staking" description="Maximize yields while keeping your assets liquid for the creator economy at all times." />
            <FeatureCard icon={<Cpu />} title="L3 Performance" description="High-throughput infrastructure optimized for high-frequency social interactions at scale." />
            <FeatureCard icon={<Globe />} title="NFT Minting" description="One-click minting for creators with built-in secondary market logic and royalty splits." />
          </div>
        </section>

        {/* 6. Infinite Ecosystem Marquee */}
        <EcosystemMarquee />

        {/* CTA Section */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, rgba(91,44,255,0.4) 0%, transparent 70%)" }} />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-6">Join the Revolution</p>
            <SuiReveal
              text="The Layer 3 Designed for Expansion"
              as="h2"
              className="text-4xl md:text-6xl font-space font-bold text-white uppercase tracking-tighter mb-8"
            />
            <p className="text-muted text-lg mb-10 font-inter">
              WylerChain provides end-to-end infrastructure for next-generation Web3 products. Premium obsidian aesthetics, original branding.
            </p>
            <motion.button
              onClick={() => router.push("/app")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 btn-brand text-white font-bold rounded-full text-lg shadow-[0_0_40px_rgba(91,44,255,0.3)] cursor-pointer"
            >
              Get Started Free
            </motion.button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-10 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <img src="/logos/wordmark.png" alt="WylerChain" className="h-7 w-auto opacity-60" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted">© 2026 WylerChain Foundation. All Rights Reserved.</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
