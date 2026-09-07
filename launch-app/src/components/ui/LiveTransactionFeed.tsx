"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

const FEED_TEMPLATES = [
  { type: "SENT", amounts: ["120.00", "450.00", "88.50", "2,100.00"], addresses: ["0x7a...f21", "0x3c...d44", "0xab...e09"] },
  { type: "RECEIVED", amounts: ["550.00", "1,200.00", "33.25", "4,000.00"], addresses: ["0x3b...e92", "0xf9...c11", "0x22...a77"] },
  { type: "STAKED", amounts: ["5,000.00", "1,500.00", "10,000.00"], addresses: ["Wyler Validator", "Node Alpha-7", "WC Vault #3"] },
  { type: "MINTED", amounts: ["1.00"], addresses: ["Wyler Origin #42", "Flux Badge #108", "Genesis Drop #7"] },
];

// Deterministic PRNG (mulberry32) so the initial feed renders identically on
// the server and the client — this avoids React hydration mismatches that
// occur when the initial state is built with Math.random().
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeGenerator(rand: () => number) {
  const randomItem = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
  return (id: number) => {
    const template = randomItem(FEED_TEMPLATES);
    return {
      id,
      type: template.type,
      amount: randomItem(template.amounts),
      address: randomItem(template.addresses),
      timeAgo: "just now",
      symbol: template.type === "MINTED" ? "NFT" : "WYLR",
    };
  };
}

export default function LiveTransactionFeed() {
  // Deterministic initial items (seeded) — identical on server and client.
  const [items, setItems] = useState(() => {
    const gen = makeGenerator(mulberry32(42));
    return [gen(0), gen(1), gen(2)];
  });
  const idRef = React.useRef(3);

  useEffect(() => {
    // Live updates run on the client only (after hydration), so Math.random is fine here.
    const gen = makeGenerator(Math.random);
    const interval = setInterval(() => {
      const newTx = gen(idRef.current++);
      setItems((prev) => [newTx, ...prev].slice(0, 5));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const typeColor = (type: string) => {
    if (type === "SENT") return "text-red-400 bg-red-500/10";
    if (type === "RECEIVED") return "text-green-400 bg-green-500/10";
    return "text-primary bg-primary/10";
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h4 className="text-sm font-space font-bold uppercase tracking-widest">Live Network Feed</h4>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-green-500">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          Live
        </div>
      </div>

      <div className="flex flex-col gap-2 min-h-[220px]">
        <AnimatePresence initial={false}>
          {items.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 cursor-default"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${typeColor(tx.type)}`}>
                  {tx.type === "SENT" ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{tx.type} <span className="text-muted font-normal">→</span> {tx.address}</p>
                  <p className="text-[10px] text-muted">{tx.timeAgo}</p>
                </div>
              </div>
              <p className={`text-xs font-bold ${tx.type === "SENT" ? "text-red-400" : tx.type === "RECEIVED" ? "text-green-400" : "text-primary"}`}>
                {tx.type === "SENT" ? "−" : "+"}{tx.amount} {tx.symbol}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
