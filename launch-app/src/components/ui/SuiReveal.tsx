"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface SuiRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  stagger?: number;
}

export default function SuiReveal({ text, className = "", as: Tag = "h2", stagger = 0.06 }: SuiRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef as React.RefObject<Element>, { once: true, margin: "-40px" });

  const words = text.split(" ");

  return (
    <Tag ref={containerRef as any} className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className="inline-block transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] duration-700"
            style={{
              transform: inView ? "translateY(0)" : "translateY(110%)",
              transitionDelay: `${i * stagger}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
