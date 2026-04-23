"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import PlexusBackground from "@/components/ui/PlexusBackground";

// --- Boneyard Skeleton Component ---
const BoneyardSkeleton = ({ name }: { name: string }) => {
    const registry: any = {
        'navbar': [
            { t: '24px', l: '24px', w: '140px', h: '32px' },
            { t: '32px', l: 'calc(50% - 200px)', w: '400px', h: '16px', p: true },
            { t: '24px', r: '24px', w: '200px', h: '44px', p: true }
        ],
        'hero': [
            { t: '150px', l: '24px', w: '60%', h: '80px' },
            { t: '250px', l: '24px', w: '40%', h: '20px' },
            { t: '320px', l: '24px', w: '180px', h: '50px', p: true }
        ]
    };
    const bones = registry[name] || [];
    return (
        <div className="absolute inset-0 z-50 pointer-events-none bg-black transition-opacity duration-1000 boneyard-overlay">
            {bones.map((b: any, i: number) => (
                <div key={i} className={`absolute bg-[#11131a] overflow-hidden ${b.p ? 'rounded-full' : 'rounded-sm'}`} style={{ top: b.t, left: b.l, right: b.r, width: b.w, height: b.h }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                </div>
            ))}
        </div>
    );
};

export default function MainLanding() {
  const { setView } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const handleScroll = () => {
        if (roadmapRef.current) {
            const rect = roadmapRef.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            const progress = Math.max(0, Math.min(1, (viewH/2 - rect.top) / rect.height));
            setScrollProgress(progress * 100);
        }
    };
    window.addEventListener('scroll', handleScroll);

    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(timer); observer.disconnect(); };
  }, []);

  return (
    <div className={`main-landing-wrapper min-h-screen bg-black text-white ${isLoaded ? 'loaded' : 'loading'}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        :root { --primary: #4F46E5; --purple: #6C5CE7; }
        .main-landing-wrapper { font-family: 'Inter', sans-serif; overflow-x: hidden; scroll-behavior: smooth; }
        .font-headline { font-family: 'Space Grotesk', sans-serif; }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .sui-text-shimmer {
          background: linear-gradient(to right, #ffffff, #4F46E5, #c084fc, #ffffff);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
          background-size: 200% auto; animation: textShimmer 5s linear infinite;
        }
        @keyframes textShimmer { to { background-position: 200% center; } }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .sui-style-card {
          background: rgba(13, 13, 18, 0.7); border: 1px solid rgba(255, 255, 255, 0.05); position: relative; overflow: hidden;
          backdrop-filter: blur(10px); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sui-style-card:hover { border-color: rgba(79,70,229,0.4); transform: translateY(-4px); }
        .technical-tag {
            font-family: monospace; font-size: 9px; letter-spacing: 0.1em;
            background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 2px 8px; text-transform: uppercase; color: #888;
        }
        .roadmap-line-container {
            position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; transform: translateX(-50%);
            background: rgba(255, 255, 255, 0.05); z-index: 1;
        }
        .roadmap-line-fill {
            position: absolute; top: 0; left: 0; width: 100%; height: 0%;
            background: linear-gradient(to bottom, #4F46E5, #6C5CE7); box-shadow: 0 0 20px #4F46E5;
            transition: height 0.3s ease-out; z-index: 2;
        }
      `}} />

      <PlexusBackground />
      <BoneyardSkeleton name="navbar" />
      
      {/* --- Navbar --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-[100]">
        <div className="flex items-center justify-between px-6 py-4 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4 group cursor-pointer transition-all">
            <img src="/LOGO/wyler_glow_logo.png" alt="Logo" className="h-10 group-hover:scale-110" />
            <span className="font-headline font-bold uppercase text-lg hidden md:block tracking-widest">Wyler Chain</span>
          </div>
          <div className="hidden lg:flex gap-8 font-headline text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
            {['About', 'Vision', 'Tech', 'Roadmap'].map(link => <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">{link}</a>)}
          </div>
          <button onClick={() => setView("LOGIN")} className="px-6 py-3 bg-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
            Launch Dashboard
          </button>
        </div>
      </nav>

      <div className="relative z-10">
        {/* --- Hero --- */}
        <header className="relative min-h-screen flex items-center pt-24 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-4xl mx-auto text-center reveal">
                <span className="technical-tag !text-indigo-400 !border-indigo-400/30 mb-8 inline-block">Institutional Layer 3 on Arbitrum</span>
                <h1 className="font-headline text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 sui-text-shimmer leading-[0.9]">
                    Modular <br/> Scale
                </h1>
                <p className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    The most accessible, scalable, and user-friendly blockchain infrastructure for the next billion users.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button onClick={() => setView("LOGIN")} className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-sm hover:scale-105 transition-all shadow-2xl">Launch MVP</button>
                    <button className="px-12 py-5 border border-white/10 hover:bg-white/5 font-bold uppercase tracking-widest text-xs rounded-sm text-white">View Docs</button>
                </div>
              </div>
            </div>
        </header>

        {/* --- Problem & Solution --- */}
        <section id="about" className="py-32 bg-black/40 border-y border-white/5 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="reveal">
                        <span className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-4 block">Problem Statement</span>
                        <h2 className="font-headline text-5xl font-bold uppercase text-white mb-8">Blockchain is <br/><span className="text-gray-600">Still Too Hard.</span></h2>
                        <div className="space-y-6 text-gray-400">
                            {[
                                "High gas fees on EVM chains discourage everyday users.",
                                "Complex onboarding (wallets, seed phrases) limits adoption.",
                                "Solutions trade off security for user experience."
                            ].map((p, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <p>{p}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="reveal">
                        <div className="sui-style-card p-12 rounded-[40px] border-indigo-500/20 shadow-[0_0_50px_rgba(79,70,229,0.1)]">
                            <span className="text-indigo-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-8 block">The Wyler Solution</span>
                            <div className="space-y-8">
                                {[
                                    { t: "Zero Gas Fee UX", d: "Costs are abstracted by the protocol." },
                                    { t: "Social Login Onboarding", d: "No seed phrases. No friction." },
                                    { t: "Scalable L3 Architecture", d: "Built on Arbitrum for maximum security." }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold group-hover:bg-indigo-500 group-hover:text-white transition-colors">✓</div>
                                        <div>
                                            <h4 className="font-headline font-bold text-white uppercase mb-1">{s.t}</h4>
                                            <p className="text-gray-500 text-sm">{s.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* --- Vision & Mission --- */}
        <section id="vision" className="py-32 bg-black">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
                <div className="reveal">
                    <div className="p-10 border-l border-white/5 hover:border-indigo-500 transition-colors">
                        <h3 className="font-headline text-primary font-bold text-xs uppercase tracking-[0.5em] mb-6">Vision</h3>
                        <p className="font-headline text-3xl md:text-5xl font-bold text-white uppercase leading-tight italic">
                            Build the most accessible, scalable, and user-friendly blockchain for real-world adoption.
                        </p>
                    </div>
                </div>
                <div className="reveal delay-100">
                    <div className="p-10 border-l border-white/5 hover:border-indigo-500 transition-colors">
                        <h3 className="font-headline text-primary font-bold text-xs uppercase tracking-[0.5em] mb-6">Mission</h3>
                        <p className="text-gray-400 text-xl leading-relaxed">
                            Enable Web3 apps to onboard users like Web2 — with social logins, no gas fees, and instant interactions — while preserving decentralization and composability.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* --- Product Core Features --- */}
        <section id="tech" className="py-32 bg-[#050505] border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-24 reveal">
                    <h2 className="font-headline text-5xl md:text-7xl font-bold uppercase text-white">Core Protocol</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal">
                    {[
                        { t: "Gasless TXs", d: "Micro-transactions become viable. Costs are abstracted completely.", icon: "💸" },
                        { t: "Social Login", d: "Connect via Google/Apple/Email. No seed phrases needed.", icon: "🔐" },
                        { t: "L3 Architecture", d: "Inherits Arbitrum security with fast block times and low latency.", icon: "📈" },
                        { t: "Developer SDK", d: "Easy integration for dApps with simple APIs and built-in gas abstraction.", icon: "🛠" },
                        { t: "Built-in Incentives", d: "Grants for builders, staking and governance for token holders.", icon: "💼" },
                        { t: "MVP High-Fidelity", d: "Social login flow and zero-gas transaction pipeline are live.", icon: "✔️" }
                    ].map((f, i) => (
                        <div key={i} className="sui-style-card p-10 flex flex-col justify-end group min-h-[300px]">
                            <div className="text-4xl mb-6 group-hover:scale-125 transition-transform origin-left">{f.icon}</div>
                            <h3 className="font-headline text-2xl font-bold uppercase mb-4 text-white group-hover:text-indigo-400 transition-colors">{f.t}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{f.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- Roadmap / GTM --- */}
        <section id="roadmap" className="py-32 bg-black relative" ref={roadmapRef}>
            <div className="roadmap-line-container"><div className="roadmap-line-fill" style={{ height: scrollProgress + "%" }} /></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-32 reveal">
                    <h2 className="font-headline text-5xl md:text-8xl font-black uppercase text-white">GTM Strategy</h2>
                </div>
                <div className="max-w-[1000px] mx-auto space-y-40">
                    {[
                        { n: 'Phase 1', t: 'MVP & Testnet', d: 'Social login refinement, developer onboarding, and first cohort of dApps.', tags: ['LIVE', 'TESTNET'] },
                        { n: 'Phase 2', t: 'Strategic Funding', d: 'Expand partnerships, reward early ecosystem builders, and private round closing.', tags: ['Q3 2026', 'FUNDING'] },
                        { n: 'Phase 3', t: 'Listings & Liquidity', d: 'Targeting major exchanges: MEXC, KuCoin, Bybit, and Binance.', tags: ['EXCHANGES', '$WYLER'] },
                        { n: 'Phase 4', t: 'Mainnet & dApp Launch', d: 'Staking, Governance, Grants, and massive Core Application adoption.', tags: ['MAINNET', '2027'] }
                    ].map((p, i) => (
                        <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center reveal ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="flex-1 sui-style-card p-12 bg-black/40">
                                <span className="font-mono text-indigo-500 font-bold mb-4 block">{p.n}</span>
                                <h3 className="font-headline text-4xl font-bold uppercase mb-6 text-white">{p.t}</h3>
                                <p className="text-gray-500 leading-relaxed font-light mb-8">{p.d}</p>
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map(t => <span key={t} className="technical-tag !text-white !border-white/10">{t}</span>)}
                                </div>
                            </div>
                            <div className="w-32 h-32 rounded-full border border-white/5 bg-white/5 flex items-center justify-center text-5xl font-black text-gray-800 shadow-2xl">{i + 1}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- Footer --- */}
        <footer className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <img src="/LOGO/wyler_glow_logo.png" alt="Logo" className="h-16 mb-8 hover:scale-110 transition-transform cursor-pointer" />
                    <h2 className="font-headline text-3xl font-bold uppercase mb-6 text-white">Wyler Chain</h2>
                    <div className="flex flex-wrap justify-center gap-10 mb-16 font-headline text-[10px] uppercase font-bold tracking-[0.4em] text-gray-500">
                        <a href="https://wylerchain.com" className="hover:text-white transition-colors">Website</a>
                        <a href="https://x.com/wylerchain?s=21" className="hover:text-white transition-colors">Twitter (X)</a>
                        <a href="https://t.me/wylerchain" className="hover:text-white transition-colors">Telegram</a>
                        <a href="#" className="hover:text-white transition-colors">Discord</a>
                    </div>
                    <div className="w-full h-px bg-white/5 mb-8"></div>
                    <p className="text-gray-700 text-[10px] uppercase tracking-[0.5em]">© 2026 Wyler Chain. Built for the Modular Future.</p>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}
