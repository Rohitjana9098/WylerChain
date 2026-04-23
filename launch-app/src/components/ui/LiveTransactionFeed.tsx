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

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTx(id: number) {
  const template = randomItem(FEED_TEMPLATES);
  return {
    id,
    type: template.type,
    amount: randomItem(template.amounts),
    address: randomItem(template.addresses),
    timeAgo: "just now",
    symbol: template.type === "MINTED" ? "NFT" : "WYLR",
  };
}

export default function LiveTransactionFeed() {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const idRef = React.useRef(3);

  useEffect(() => {
    setMounted(true);
    setItems([generateTx(0), generateTx(1), generateTx(2)]);
    const interval = setInterval(() => {
      const newTx = generateTx(idRef.current++);
      setItems((prev) => [newTx, ...prev].slice(0, 5));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white/[0.02] border border-white/5 rounded-[28px] p-6 min-h-[220px]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h4 className="text-sm font-space font-bold uppercase tracking-widest text-white/50">Live Network Feed</h4>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            Connecting
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 animate-pulse" />
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-32 bg-white/5 animate-pulse rounded" />
                  <div className="h-2 w-16 bg-white/5 animate-pulse rounded" />
                </div>
              </div>
              <div className="h-4 w-20 bg-white/5 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

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
