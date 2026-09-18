"use client";

import { tabs } from "@/lib/mock-data";
import { User, Landmark, Users, ShoppingCart } from "lucide-react";

const tabIcons: Record<(typeof tabs)[number], React.ElementType> = {
  "Top Vendedores": User,
  "Top Bancos": Landmark,
  "Top Clientes": Users,
  "Top Compras": ShoppingCart,
};

export default function RankingTabs({
  active,
  onChange,
}: {
  active: (typeof tabs)[number];
  onChange: (tab: (typeof tabs)[number]) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-1.5 grid grid-cols-2 md:grid-cols-4 gap-1.5">
      {tabs.map((tab) => {
        const Icon = tabIcons[tab];
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`flex items-center justify-center gap-2 text-xs sm:text-sm font-medium py-2.5 px-2 rounded-xl transition-colors ${
              isActive ? "bg-ink text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Icon size={16} />
            <span className="truncate">{tab}</span>
          </button>
        );
      })}
    </div>
  );
}
