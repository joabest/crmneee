"use client";

import { messages } from "@/lib/mock-data";
import { Search, Plus, Mail, Users } from "lucide-react";
import { useState } from "react";

export default function InternalMessages() {
  const [query, setQuery] = useState("");

  const filtered = messages.filter((m) =>
    m.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ink">Mensagens Internas</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <span className="text-lg leading-none">&hellip;</span>
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar mensagens..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <button className="w-9 h-9 shrink-0 rounded-lg bg-ink text-white flex items-center justify-center hover:bg-black">
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {filtered.map((m) => (
          <button
            key={m.name}
            className="w-full flex items-start gap-3 py-2 px-1 rounded-lg hover:bg-gray-50 text-left"
          >
            {m.isGroup ? (
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                <Users size={16} className="text-gray-500" />
              </div>
            ) : (
              <img
                src={m.avatar}
                alt={m.name}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink truncate">
                  {m.name}
                </p>
                <span className="text-[11px] text-gray-400 shrink-0 ml-2">
                  {m.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 truncate">{m.preview}</p>
                {m.unread && (
                  <span className="ml-2 shrink-0 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-semibold">
                    {m.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button className="mt-3 w-full flex items-center justify-center gap-2 bg-ink hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
        <Mail size={15} />
        Nova Mensagem
      </button>
    </div>
  );
}
