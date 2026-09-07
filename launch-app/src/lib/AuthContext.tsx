"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
  // Dashboard-first default: open the main website straight into the Dashboard.
  // Mock auth state (login is mocked), so the app boots authenticated. Logout
  // still returns to LANDING and the login flow still works as before.
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>("wyler_creator_01");
  const [currentView, setCurrentView] = useState<View>("DASHBOARD");
  const [activeTab, setActiveTab] = useState<Tab>("WALLET");

  const login = (method: string) => {
    // Mock login flow
    setIsLoggedIn(true);
    setCurrentUser("wyler_creator_01");
    setCurrentView("DASHBOARD");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView("LANDING");
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
