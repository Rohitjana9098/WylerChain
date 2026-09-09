"use client";

import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { Zap, Shield, Repeat, Layers, Cpu, Globe } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import MetricsStrip from "@/components/ui/MetricsStrip";
import EcosystemMarquee from "@/components/ui/EcosystemMarquee";
import SuiReveal from "@/components/ui/SuiReveal";
import PlexusBackground from "@/components/ui/PlexusBackground";

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
  const { setView } = useAuth();

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Eco", href: "#eco" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Token", href: "#token" },
  ];

  return (
    <div className="min-h-screen bg-black text-white void-bg scroll-smooth">
      <PlexusBackground />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative z-10">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
          <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img src="/logos/mark.png" alt="Wyler Chain logo" className="h-9 w-auto" />
              <span className="font-space font-bold text-sm uppercase tracking-[0.35em] text-white">
                Wyler Chain
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-[11px] font-space font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <a
                href="#eco"
                className="hidden md:block text-[11px] font-space font-bold uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
              >
                Join Ecosystem
              </a>
              <button
                onClick={() => setView("DASHBOARD")}
                className="px-7 py-3 bg-[#5B2EFF] hover:bg-[#6B42FF] text-white text-[11px] font-space font-bold uppercase tracking-[0.25em] rounded-lg transition-all duration-300 hover:shadow-[0_0_35px_rgba(91,46,255,0.55)]"
              >
                Launch App
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 px-6">
          <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-space font-bold uppercase leading-[0.95] tracking-tight text-6xl sm:text-7xl lg:text-[110px]"
              >
                <span className="block text-white">Wyler</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6D5CFF] via-[#8B5CF6] to-[#A855F7] drop-shadow-[0_0_50px_rgba(124,92,255,0.45)]">
                  Chain
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/60 text-lg md:text-xl max-w-xl mt-8 font-inter leading-relaxed"
              >
                A next-generation Layer 3 blockchain built on Arbitrum. Enabling zero gas fees, seamless social login, and scalable dApp deployment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12 flex flex-col items-start gap-9"
              >
                <button
                  onClick={() => setView("DASHBOARD")}
                  className="px-12 py-4 bg-[#5B2EFF] hover:bg-[#6B42FF] text-white text-sm font-space font-bold uppercase tracking-[0.2em] rounded-lg transition-all duration-300 hover:shadow-[0_0_45px_rgba(91,46,255,0.55)]"
                >
                  Launch App
                </button>

                <a
                  href="#stack"
                  className="text-[11px] font-space font-bold uppercase tracking-[0.35em] text-white/80 hover:text-white transition-colors"
                >
                  Explore Docs
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/40 shadow-[0_0_90px_rgba(91,46,255,0.18)]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                >
                  <source src="/Video/GENERATE_DEATAILS_PROMPT_202604081148.mp4" type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Animated Metrics Strip */}
        <div id="about">
          <MetricsStrip />
        </div>

        {/* Feature Grid */}
        <section id="stack" className="py-24 px-6 max-w-7xl mx-auto">
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
            <FeatureCard icon={<Shield />} title="Social Login" description="Onboard users in seconds with Google, Telegram, X, or Email. Seedless wallet generation included." />
            <FeatureCard icon={<Repeat />} title="Cross-Chain Support" description="Native interoperability across all major blockchain ecosystems without bridging overhead." />
            <FeatureCard icon={<Layers />} title="Liquid Staking" description="Maximize yields while keeping your assets liquid for the creator economy at all times." />
            <FeatureCard icon={<Cpu />} title="L3 Performance" description="High-throughput infrastructure optimized for high-frequency social interactions at scale." />
            <FeatureCard icon={<Globe />} title="NFT Minting" description="One-click minting for creators with built-in secondary market logic and royalty splits." />
          </div>
        </section>

        {/* 6. Infinite Ecosystem Marquee */}
        <div id="eco">
          <EcosystemMarquee />
        </div>

        {/* Roadmap */}
        <section id="roadmap" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-3">Roadmap</p>
            <SuiReveal
              text="The Path to Mainnet"
              as="h2"
              className="text-3xl md:text-5xl font-space font-bold text-white uppercase tracking-tighter"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { n: "Phase 1", t: "MVP & Testnet", d: "Social login refinement, developer onboarding, and first cohort of dApps.", tags: ["LIVE", "TESTNET"] },
              { n: "Phase 2", t: "Strategic Funding", d: "Expand partnerships, reward early ecosystem builders, and private round closing.", tags: ["Q3 2026", "FUNDING"] },
              { n: "Phase 3", t: "Listings & Liquidity", d: "Targeting major exchanges: MEXC, KuCoin, Bybit, and Binance.", tags: ["EXCHANGES", "$WYLER"] },
              { n: "Phase 4", t: "Mainnet & dApp Launch", d: "Staking, Governance, Grants, and massive Core Application adoption.", tags: ["MAINNET", "2027"] },
            ].map((p) => (
              <SpotlightCard key={p.n} className="p-8 bg-white/[0.02] border border-white/5 rounded-[24px] flex flex-col gap-4 group hover:border-primary/20 transition-all hover:-translate-y-1 duration-300">
                <span className="font-mono text-primary font-bold text-xs tracking-[0.3em] uppercase">{p.n}</span>
                <h3 className="text-xl font-space font-bold text-white">{p.t}</h3>
                <p className="text-muted leading-relaxed font-inter text-sm">{p.d}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest border border-white/10 rounded-full text-white/70">{t}</span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Token */}
        <section id="token" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-3">Token</p>
            <SuiReveal
              text="$WYLER Utility"
              as="h2"
              className="text-3xl md:text-5xl font-space font-bold text-white uppercase tracking-tighter"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard icon={<Zap />} title="Gas Abstraction" description="Zero gas fees across the network — transactions are sponsored by the protocol fee vault." />
            <FeatureCard icon={<Layers />} title="Liquid Staking" description="Stake $WYLER to secure the L3 and earn yield while keeping your assets liquid." />
            <FeatureCard icon={<Shield />} title="Governance" description="Shape the protocol — vote on upgrades, grants, and ecosystem parameters." />
            <FeatureCard icon={<Globe />} title="Creator Rewards" description="Fuel social tipping, NFT royalties, and payouts across the creator economy." />
          </div>
        </section>

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
              onClick={() => setView("LOGIN")}
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
      </div>
      </motion.div>
    </div>
  );
}
