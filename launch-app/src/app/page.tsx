"use client";

import { useAuth } from "@/lib/AuthContext";
import Landing from "@/components/modules/Landing";
import Login from "@/components/modules/Login";
import Dashboard from "@/components/modules/Dashboard";

export default function Home() {
  const { currentView } = useAuth();

  switch (currentView) {
    case "LANDING": return <Landing />;
    case "LOGIN": return <Login />;
    case "DASHBOARD": return <Dashboard />;
    default: return <Landing />;
  }
}
