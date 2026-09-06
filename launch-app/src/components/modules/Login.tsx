"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { ChevronLeft, Mail, Send } from "lucide-react";

export default function Login() {
  const { setView, login } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (method: string) => {
    setIsAuthenticating(true);
    // Simulate wallet creation
    setTimeout(() => {
      login(method);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-surface-low border border-border/50 p-8 rounded-3xl relative"
      >
        <div className="flex justify-center mb-6">
          <img src="/logos/mark.png" alt="Wyler mark" className="h-16 w-auto drop-shadow-[0_0_20px_rgba(79,70,229,0.3)]" />
        </div>

        <button 
          onClick={() => setView("LANDING")}
          className="absolute -top-12 left-0 flex items-center gap-2 text-muted hover:text-primary transition-colors font-medium text-sm"
        >
          <ChevronLeft size={16} /> Back to home
        </button>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-space font-bold mb-3 uppercase tracking-tighter shimmer-text">Access WylerChain</h2>
          <p className="text-muted text-sm font-inter">
            Select an onboarding method to generate your seedless vault.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {isAuthenticating ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12 flex flex-col items-center gap-6"
            >
              <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="text-center">
                <p className="font-space font-bold text-lg mb-1 uppercase tracking-widest text-primary">Creating Vault</p>
                <p className="text-muted text-xs">Finalizing L3 execution layer...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4"
            >
              <LoginButton 
                icon={<GoogleIcon />}
                label="Continue with Google"
                onClick={() => handleLogin("GOOGLE")}
              />
              <LoginButton 
                icon={<Send size={20} className="text-[#2AABEE]" />}
                label="Continue with Telegram"
                onClick={() => handleLogin("TELEGRAM")}
              />
              <LoginButton 
                icon={<XIcon />}
                label="Continue with X"
                onClick={() => handleLogin("X")}
              />
              <div className="flex items-center gap-4 my-2">
                <div className="h-[1px] bg-white/10 flex-1" />
                <span className="text-[10px] uppercase tracking-widest text-muted font-bold">Protocol Auth</span>
                <div className="h-[1px] bg-white/10 flex-1" />
              </div>
              <button 
                onClick={() => handleLogin("EMAIL")}
                className="btn-brand py-4 rounded-xl flex items-center justify-center gap-3 w-full"
              >
                <Mail size={20} />
                <span className="font-bold text-sm">Continue with Email</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>


        <p className="mt-8 text-[11px] text-center text-muted/60 leading-relaxed font-inter">
          By continuing, you agree to WylerChain&apos;s Terms of Service and Privacy Policy. 
          Your seedless wallet is protected by hardware-grade encryption.
        </p>
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.91-4.2 2.91-7.22Z" />
      <path fill="#34A853" d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.74 9.74 0 0 0 12 21.7Z" />
      <path fill="#FBBC05" d="M6.54 13.8a5.85 5.85 0 0 1 0-3.6V7.68H3.3a9.74 9.74 0 0 0 0 8.64l3.24-2.52Z" />
      <path fill="#EA4335" d="M12 6.17c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.52C7.31 7.89 9.46 6.17 12 6.17Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.85h1.73L8.28 4.05H6.42L17.8 19.85Z" />
    </svg>
  );
}

function LoginButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-center gap-3 w-full py-4 bg-surface rounded-xl border border-border/50 hover:bg-surface-high hover:border-primary/30 transition-all group"
    >
      {icon}
      <span className="font-medium text-sm group-hover:text-primary transition-colors">{label}</span>
    </button>
  );
}
