"use client";

import { proposals } from "@/lib/mock-data";
import { Proposal, ProposalStatus } from "@/lib/types";
import { SlidersHorizontal, Filter, Download, MoreHorizontal, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

const statusStyles: Record<ProposalStatus, string> = {
  "Em análise": "bg-orange-100 text-orange-700",
  Enviada: "bg-sky-100 text-sky-700",
  Aprovada: "bg-green-100 text-green-700",
  "Em preenchimento": "bg-violet-100 text-violet-700",
  Recusada: "bg-red-100 text-red-700",
};

const columnDefs = [
  ["client", "Cliente"], ["bank", "Banco"], ["creditValue", "Valor do Crédito"], ["term", "Prazo"],
  ["seller", "Vendedor"], ["status", "Status"], ["date", "Data"],
] as const;

function exportCsv(rows: Proposal[]) {
  const header = ["ID","Cliente","Banco","Valor do Crédito","Prazo","Vendedor","Status","Data"];
  const csv = [header, ...rows.map((p) => [p.id,p.client,p.bank,p.creditValue,p.term,p.seller,p.status,p.date])]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g,'""')}"`).join(";"))
    .join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "propostas-mv-crm.csv"; a.click();
  URL.revokeObjectURL(url);
}

export default function ProposalsTable({
  title = "Últimas Propostas",
  limit,
  dateFrom,
  dateTo,
}: {
  title?: string;
  limit?: number;
  dateFrom?: string;
  dateTo?: string;
}) {
  const [query, setQuery] = useState("");
  const [bank, setBank] = useState("Todos");
  const [seller, setSeller] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>(
    Object.fromEntries(columnDefs.map(([key]) => [key, true]))
  );
  const [selected, setSelected] = useState<Proposal | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);

  const banks = [...new Set(proposals.map((p) => p.bank))];
  const sellers = [...new Set(proposals.map((p) => p.seller))];
  const statuses = [...new Set(proposals.map((p) => p.status))];

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const rows = proposals.filter((p) => {
      const matchesQ = !q || [p.id,p.client,p.bank,p.seller,p.creditValue].some((v) => v.toLowerCase().includes(q));
      const matchesBank = bank === "Todos" || p.bank === bank;
      const matchesSeller = seller === "Todos" || p.seller === seller;
      const matchesStatus = status === "Todos" || p.status === status;
      const matchesFrom = !dateFrom || p.dateIso >= dateFrom;
      const matchesTo = !dateTo || p.dateIso <= dateTo;
      return matchesQ && matchesBank && matchesSeller && matchesStatus && matchesFrom && matchesTo;
    });
    return typeof limit === "number" ? rows.slice(0, limit) : rows;
  }, [query, bank, seller, status, dateFrom, dateTo, limit]);

  const reset = () => { setBank("Todos"); setSeller("Todos"); setStatus("Todos"); setQuery(""); };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 sm:p-5 min-w-0">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h3 className="font-semibold text-ink">{title}</h3>
            <p className="text-xs text-gray-400 mt-1">{filtered.length} registro(s) exibido(s)</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar..." className="w-44 border border-gray-200 rounded-lg py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/10"/>
            </div>
            <button onClick={() => setShowColumns((v)=>!v)} className="relative flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
              <SlidersHorizontal size={14}/> <span className="hidden sm:inline">Personalizar</span>
            </button>
            <button onClick={() => setShowFilters((v)=>!v)} className={`flex items-center gap-1.5 text-sm font-medium border rounded-lg px-3 py-1.5 ${showFilters ? "bg-ink text-white border-ink" : "text-gray-600 border-gray-200 hover:bg-gray-50"}`}>
              <Filter size={14}/> <span className="hidden sm:inline">Filtrar</span>
            </button>
            <button onClick={() => exportCsv(filtered)} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
              <Download size={14}/> <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>

        <div className="md:hidden relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar proposta, cliente, banco..." className="w-full border border-gray-200 rounded-lg py-2 pl-8 pr-3 text-sm focus:outline-none"/>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
            <select value={bank} onChange={(e)=>setBank(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>Todos</option>{banks.map((x)=><option key={x}>{x}</option>)}</select>
            <select value={seller} onChange={(e)=>setSeller(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>Todos</option>{sellers.map((x)=><option key={x}>{x}</option>)}</select>
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>Todos</option>{statuses.map((x)=><option key={x}>{x}</option>)}</select>
            <button onClick={reset} className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm hover:bg-gray-100">Limpar filtros</button>
          </div>
        )}

        {showColumns && (
          <div className="flex flex-wrap gap-3 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
            {columnDefs.map(([key,label])=>(
              <label key={key} className="flex items-center gap-2 text-xs text-gray-600">
                <input type="checkbox" checked={visible[key]} onChange={(e)=>setVisible((v)=>({...v,[key]:e.target.checked}))}/>
                {label}
              </label>
            ))}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="text-left text-gray-400 text-[11px] uppercase tracking-wide border-b border-gray-100">
                <th className="py-2.5 pr-4 font-medium">#</th>
                {visible.client && <th className="py-2.5 pr-4 font-medium">Cliente</th>}
                {visible.bank && <th className="py-2.5 pr-4 font-medium">Banco</th>}
                {visible.creditValue && <th className="py-2.5 pr-4 font-medium">Valor do Crédito</th>}
                {visible.term && <th className="py-2.5 pr-4 font-medium">Prazo</th>}
                {visible.seller && <th className="py-2.5 pr-4 font-medium">Vendedor</th>}
                {visible.status && <th className="py-2.5 pr-4 font-medium">Status</th>}
                {visible.date && <th className="py-2.5 pr-4 font-medium">Data</th>}
                <th className="py-2.5 pr-2 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/70">
                  <td className="py-3 pr-4 font-medium text-ink">{p.id}</td>
                  {visible.client && <td className="py-3 pr-4 text-ink font-medium">{p.client}</td>}
                  {visible.bank && <td className="py-3 pr-4 text-gray-600">{p.bank}</td>}
                  {visible.creditValue && <td className="py-3 pr-4 text-gray-600">{p.creditValue}</td>}
                  {visible.term && <td className="py-3 pr-4 text-gray-600">{p.term}</td>}
                  {visible.seller && <td className="py-3 pr-4 text-gray-600">{p.seller}</td>}
                  {visible.status && <td className="py-3 pr-4"><span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>{p.status}</span></td>}
                  {visible.date && <td className="py-3 pr-4 text-gray-500">{p.date}</td>}
                  <td className="py-3 pr-2 text-right relative">
                    <button onClick={()=>setMenuId(menuId===p.id?null:p.id)} className="text-gray-400 hover:text-gray-700 p-1"><MoreHorizontal size={16}/></button>
                    {menuId === p.id && (
                      <div className="absolute right-2 top-9 bg-white border border-gray-200 shadow-lg rounded-lg p-1 z-20 w-32 text-left">
                        <button onClick={()=>{setSelected(p);setMenuId(null)}} className="w-full px-3 py-2 text-xs rounded hover:bg-gray-50">Visualizar</button>
                        <button onClick={()=>{navigator.clipboard?.writeText(p.id);setMenuId(null)}} className="w-full px-3 py-2 text-xs rounded hover:bg-gray-50">Copiar ID</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <div className="py-10 text-center text-sm text-gray-400">Nenhuma proposta encontrada com esses filtros.</div>}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] bg-black/40 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-5" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><div><p className="text-xs text-gray-400">Proposta</p><h3 className="text-xl font-bold">{selected.id}</h3></div><button onClick={()=>setSelected(null)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18}/></button></div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-gray-400 text-xs">Cliente</p><p className="font-medium mt-1">{selected.client}</p></div>
              <div><p className="text-gray-400 text-xs">Banco</p><p className="font-medium mt-1">{selected.bank}</p></div>
              <div><p className="text-gray-400 text-xs">Crédito</p><p className="font-medium mt-1">{selected.creditValue}</p></div>
              <div><p className="text-gray-400 text-xs">Prazo</p><p className="font-medium mt-1">{selected.term}</p></div>
              <div><p className="text-gray-400 text-xs">Vendedor</p><p className="font-medium mt-1">{selected.seller}</p></div>
              <div><p className="text-gray-400 text-xs">Status</p><span className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[selected.status]}`}>{selected.status}</span></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
