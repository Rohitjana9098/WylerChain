"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";

type View = "LANDING" | "LOGIN" | "DASHBOARD";
type Tab = "WALLET" | "STAKING" | "CREATORS" | "NFTS" | "EXPLORE";

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: string | null;
  currentView: View;
  activeTab: Tab;
  login: (method: string) => void;
  logout: () => void;
  setView: (view: View) => void;
  setTab: (tab: Tab) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>("LANDING");
  const [activeTab, setActiveTab] = useState<Tab>("WALLET");

  // Handle disconnection
  useEffect(() => {
    if (!isConnected || !address) {
      setIsLoggedIn(false);
      setCurrentUser(null);
      // Removed forced redirect. DeFi users can view the dashboard without being connected.
    }
  }, [isConnected, address]);

  const login = (method: string) => {
    if (address) {
      setIsLoggedIn(true);
      setCurrentUser(address);
      setCurrentView("DASHBOARD");
    }
  };

  const logout = () => {
    disconnect();
  };

  const setView = (view: View) => setCurrentView(view);
  const setTab = (tab: Tab) => setActiveTab(tab);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        currentView,
        activeTab,
        login,
        logout,
        setView,
        setTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
