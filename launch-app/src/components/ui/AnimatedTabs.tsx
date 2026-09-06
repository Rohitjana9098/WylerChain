"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
}

export default function AnimatedTabs({ tabs, defaultTab, onChange }: AnimatedTabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className="flex items-center gap-1 bg-white/[0.03] border border-white/5 p-1 rounded-full w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleChange(tab.id)}
          className="relative px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors z-10"
          style={{ color: active === tab.id ? "#ffffff" : "#adaaaa" }}
        >
          {/* Sliding Pill */}
          {active === tab.id && (
            <motion.span
              layoutId="active-pill"
              className="absolute inset-0 rounded-full z-[-1]"
              style={{
                background: "linear-gradient(135deg, #5b2cff 0%, #4a42f4 50%, #2563eb 100%)",
                boxShadow: "0 0 20px rgba(91,44,255,0.35)",
              }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
