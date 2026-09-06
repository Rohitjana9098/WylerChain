"use client";

import React from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return <DashboardShell />;
}
