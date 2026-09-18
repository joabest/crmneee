"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/35 lg:hidden" onClick={() => setMobileOpen(false)} />
          <Sidebar mobile onClose={() => setMobileOpen(false)} />
        </>
      )}
      <div className="flex-1 min-w-0">
        <Header onMenu={() => setMobileOpen(true)} />
        {children}
      </div>
    </div>
  );
}
