"use client";

import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { clients, proposals } from "@/lib/mock-data";

export default function Header({ onMenu }: { onMenu?: () => void }) {
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const clientResults = clients
      .filter((c) => [c.name, c.cpf, c.phone, c.email].some((x) => x.toLowerCase().includes(q)))
      .slice(0, 4)
      .map((c) => ({ title: c.name, subtitle: `${c.id} · ${c.phone}`, href: "/clientes" }));
    const proposalResults = proposals
      .filter((p) => [p.id, p.client, p.bank, p.seller].some((x) => x.toLowerCase().includes(q)))
      .slice(0, 3)
      .map((p) => ({ title: p.id + " · " + p.client, subtitle: `${p.bank} · ${p.creditValue}`, href: "/propostas" }));
    return [...clientResults, ...proposalResults];
  }, [query]);

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3.5 bg-bg/95 backdrop-blur border-b border-gray-200/70">
      <button onClick={onMenu} className="lg:hidden w-10 h-10 rounded-xl bg-white border border-gray-200 grid place-items-center" aria-label="Abrir menu">
        <Menu size={19} />
      </button>

      <div className="flex-1 max-w-xl relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar clientes, propostas, cotas..."
          className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-14 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ink/10"
        />
        {query ? (
          <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={16}/></button>
        ) : (
          <kbd className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-[11px] bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-500">⌘ K</kbd>
        )}

        {query.trim().length >= 2 && (
          <div className="absolute left-0 right-0 top-[48px] bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
            {results.length ? results.map((r, i) => (
              <button
                key={i}
                onClick={() => { setQuery(""); router.push(r.href); }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 border-gray-100"
              >
                <p className="text-sm font-semibold text-ink">{r.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.subtitle}</p>
              </button>
            )) : <p className="px-4 py-4 text-sm text-gray-500">Nenhum resultado encontrado.</p>}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        <div className="relative">
          <button
            onClick={() => setNotifications((v) => !v)}
            className="relative w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
            aria-label="Notificações"
          >
            <Bell size={18} className="text-gray-600" />
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500" />
          </button>
          {notifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-xl p-2 z-50">
              <p className="font-semibold text-sm px-2 py-2">Notificações</p>
              {["3 propostas aguardam análise", "Nova mensagem de Juliana Souza", "Base importada com 18 duplicados"].map((n) => (
                <button key={n} className="w-full text-left px-2 py-2.5 rounded-lg hover:bg-gray-50 text-xs text-gray-600">{n}</button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Daniel_Vorcaro_-_2024_%28cropped%29.jpg" alt="Daniel Vorcaro" className="w-10 h-10 rounded-full object-cover object-top border border-gray-200" />
          <div className="leading-tight hidden md:block">
            <p className="text-sm font-semibold text-ink">Daniel Vorcaro</p>
            <p className="text-xs text-gray-500">Administrador • MV CRM</p>
          </div>
        </div>
      </div>
    </header>
  );
}
