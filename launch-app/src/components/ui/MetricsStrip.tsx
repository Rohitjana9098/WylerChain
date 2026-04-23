"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ to, suffix = "", prefix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const METRICS = [
  { label: "Transactions / Sec", value: 50000, suffix: "+", prefix: "" },
  { label: "Active Validators", value: 1200, suffix: "+", prefix: "" },
  { label: "Total Value Locked", value: 124, suffix: "M+", prefix: "$" },
  { label: "Creator Wallets", value: 85000, suffix: "+", prefix: "" },
  { label: "Avg. Block Time", value: 0, suffix: "ms", prefix: "", display: "420ms" },
];

export default function MetricsStrip() {
  return (
    <section className="border-t border-b border-white/5 bg-white/[0.02] py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="text-3xl md:text-4xl font-space font-bold text-white tracking-tighter">
                {m.display ? (
                  m.display
                ) : (
                  <AnimatedCounter to={m.value} suffix={m.suffix} prefix={m.prefix} />
                )}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
