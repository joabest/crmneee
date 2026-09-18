"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ActivityTicker from "@/components/ActivityTicker";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <ActivityTicker />

      <div className="flex min-h-[calc(100vh-36px)]">
        <Sidebar />

        {mobileOpen && (
          <>
            <div
              className="fixed inset-x-0 bottom-0 top-[36px] z-40 bg-black/35 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <Sidebar mobile onClose={() => setMobileOpen(false)} />
          </>
        )}

        <div className="flex-1 min-w-0">
          <Header onMenu={() => setMobileOpen(true)} />
          {children}
        </div>
      </div>
    </div>
  );
}
