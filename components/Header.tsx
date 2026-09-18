"use client";

import { Search, Bell } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className="flex items-center gap-4 px-6 lg:px-8 py-4 bg-bg">
      <div className="flex-1 max-w-xl relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar clientes, propostas, cotas..."
          className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-14 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ink/10"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-500">
          ⌘ K
        </kbd>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="relative w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/64?img=12"
            alt="Daniel Vorcaro"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="leading-tight hidden sm:block">
            <p className="text-sm font-semibold text-ink">Daniel Vorcaro</p>
            <p className="text-xs text-gray-500">Administrador • MV CRM</p>
          </div>
        </div>
      </div>
    </header>
  );
}
