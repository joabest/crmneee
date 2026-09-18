"use client";

import {
  LayoutGrid,
  User,
  FileText,
  Package,
  MessageSquare,
  Users,
  Landmark,
  ShoppingCart,
  FileBarChart,
  Download,
  Settings,
  HelpCircle,
  Headphones,
} from "lucide-react";
import { menuItems } from "@/lib/mock-data";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid,
  User,
  FileText,
  Package,
  MessageSquare,
  Users,
  Landmark,
  ShoppingCart,
  FileBarChart,
  Download,
  Settings,
  HelpCircle,
};

export default function Sidebar() {
  const [active, setActive] = useState("Visão Geral");

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="w-9 h-9 rounded-lg bg-ink flex items-center justify-center text-white font-extrabold text-sm">
          MV
        </div>
        <div className="leading-tight">
          <p className="font-extrabold text-ink text-lg -mb-1">CRM</p>
          <p className="text-[10px] tracking-widest text-gray-500 font-semibold">
            CONSÓRCIOS
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon] ?? LayoutGrid;
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-ink text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-2xl bg-ink p-4 text-white">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mb-3">
            <Headphones size={18} />
          </div>
          <p className="font-semibold text-sm mb-1">Contate o Suporte</p>
          <p className="text-xs text-gray-300 mb-3">
            Precisa de ajuda? Fale conosco pelo WhatsApp.
          </p>
          <a
            href="https://wa.me/5511992779039"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition-colors rounded-lg py-2 text-xs font-semibold"
          >
            (11) 99277-9039
          </a>
        </div>
      </div>
    </aside>
  );
}
