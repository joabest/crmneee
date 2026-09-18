"use client";

import { useState } from "react";
import { tabs } from "@/lib/mock-data";
import { User, Landmark, Users, ShoppingCart } from "lucide-react";

const tabIcons: Record<(typeof tabs)[number], React.ElementType> = {
  "Top Vendedores": User,
  "Top Bancos": Landmark,
  "Top Clientes": Users,
  "Top Compras": ShoppingCart,
};

export default function RankingTabs({
  onChange,
}: {
  onChange?: (tab: string) => void;
}) {
  const [active, setActive] = useState<(typeof tabs)[number]>("Top Vendedores");

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-1.5 flex flex-wrap gap-1.5">
      {tabs.map((tab) => {
        const Icon = tabIcons[tab];
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => {
              setActive(tab);
              onChange?.(tab);
            }}
            className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-xl transition-colors ${
              isActive
                ? "bg-ink text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Icon size={16} />
            {tab}
          </button>
        );
      })}
    </div>
  );
}
