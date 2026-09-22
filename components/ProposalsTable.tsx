"use client";

import { proposals as initialProposals } from "@/lib/mock-data";
import { Proposal, ProposalStatus } from "@/lib/types";
import { SlidersHorizontal, Filter, Download, MoreHorizontal, Search, X, Eye, RefreshCcw, Copy } from "lucide-react";
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

const fileDate=()=>new Intl.DateTimeFormat("pt-BR").format(new Date()).replace(/\//g,".");
const moneyTextBR=(value:string|number)=>{
  if(typeof value==="number") return value.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
  const raw=String(value).replace(/[^\d,.-]/g,"").replace(/\./g,"").replace(",",".");
  const parsed=Number(raw);
  return Number.isFinite(parsed)?parsed.toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2}):String(value);
};

function exportCsv(rows: Proposal[]) {
  const header = ["Nº","Cliente","Banco","Valor do Crédito","Prazo","Vendedor","Status","Data"];
  const csv = [header, ...rows.map((p) => [p.id,p.client,p.bank,moneyTextBR(p.creditValue),p.term,p.seller,p.status,p.date])]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g,'""')}"`).join(";"))
    .join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `relatorio_propostas_${fileDate()}.csv`; a.click();
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
  const [rows, setRows] = useState<Proposal[]>(initialProposals);
  const [query, setQuery] = useState("");
  const [bank, setBank] = useState("Todos");
  const [seller, setSeller] = useState("Todos");
  const [status, setStatus] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);
  const [showColumns, setShowColumns] = useState(false);
  const [visible, setVisible] = useState<Record<string, boolean>>(Object.fromEntries(columnDefs.map(([key]) => [key, true])));
  const [selected, setSelected] = useState<Proposal | null>(null);
  const [menuId, setMenuId] = useState<string | null>(null);

  const banks = Array.from(new Set(rows.map((p) => p.bank)));
  const sellers = Array.from(new Set(rows.map((p) => p.seller)));
  const statuses = Array.from(new Set(rows.map((p) => p.status)));

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const result = rows.filter((p) => {
      const matchesQ = !q || [p.id,p.client,p.bank,p.seller,p.creditValue].some((v) => v.toLowerCase().includes(q));
      const matchesBank = bank === "Todos" || p.bank === bank;
      const matchesSeller = seller === "Todos" || p.seller === seller;
      const matchesStatus = status === "Todos" || p.status === status;
      const matchesFrom = !dateFrom || p.dateIso >= dateFrom;
      const matchesTo = !dateTo || p.dateIso <= dateTo;
      return matchesQ && matchesBank && matchesSeller && matchesStatus && matchesFrom && matchesTo;
    });
    return typeof limit === "number" ? result.slice(0, limit) : result;
  }, [rows, query, bank, seller, status, dateFrom, dateTo, limit]);

  const reset = () => { setBank("Todos"); setSeller("Todos"); setStatus("Todos"); setQuery(""); };
  const changeStatus=(id:string,next:ProposalStatus)=>{
    setRows((old)=>old.map((p)=>p.id===id?{...p,status:next}:p));
    setSelected((old)=>old?.id===id?{...old,status:next}:old);
    setMenuId(null);
  };

  const clickable=(p:Proposal,value:React.ReactNode,className="")=>(
    <button onClick={()=>setSelected(p)} className={`text-left hover:underline decoration-gray-300 underline-offset-4 ${className}`}>{value}</button>
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-4 sm:p-5 min-w-0">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div><h3 className="font-semibold text-ink">{title}</h3><p className="text-xs text-gray-400 mt-1">{filtered.length} registro(s) exibido(s)</p></div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative hidden md:block"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar..." className="w-44 border border-gray-200 rounded-lg py-1.5 pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ink/10"/></div>
            <button onClick={() => setShowColumns((v)=>!v)} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50"><SlidersHorizontal size={14}/><span className="hidden sm:inline">Personalizar</span></button>
            <button onClick={() => setShowFilters((v)=>!v)} className={`flex items-center gap-1.5 text-sm font-medium border rounded-lg px-3 py-1.5 ${showFilters ? "bg-ink text-white border-ink" : "text-gray-600 border-gray-200 hover:bg-gray-50"}`}><Filter size={14}/><span className="hidden sm:inline">Filtrar</span></button>
            <button onClick={() => exportCsv(filtered)} className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50"><Download size={14}/><span className="hidden sm:inline">Exportar</span></button>
          </div>
        </div>

        <div className="md:hidden relative mb-3"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar proposta, cliente, banco..." className="w-full border border-gray-200 rounded-lg py-2 pl-8 pr-3 text-sm focus:outline-none"/></div>

        {showFilters && <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
          <select value={bank} onChange={(e)=>setBank(e.target.value)} className="field"><option>Todos</option>{banks.map((x)=><option key={x}>{x}</option>)}</select>
          <select value={seller} onChange={(e)=>setSeller(e.target.value)} className="field"><option>Todos</option>{sellers.map((x)=><option key={x}>{x}</option>)}</select>
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="field"><option>Todos</option>{statuses.map((x)=><option key={x}>{x}</option>)}</select>
          <button onClick={reset} className="btn-secondary justify-center">Limpar filtros</button>
        </div>}

        {showColumns && <div className="flex flex-wrap gap-3 mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
          {columnDefs.map(([key,label])=><label key={key} className="flex items-center gap-2 text-xs text-gray-600"><input type="checkbox" checked={visible[key]} onChange={(e)=>setVisible((v)=>({...v,[key]:e.target.checked}))}/>{label}</label>)}
        </div>}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[820px]">
            <thead><tr className="text-left text-gray-400 text-[11px] uppercase tracking-wide border-b border-gray-100">
              <th className="py-2.5 pr-4 font-medium">Nº</th>
              {visible.client&&<th className="py-2.5 pr-4 font-medium">Cliente</th>}
              {visible.bank&&<th className="py-2.5 pr-4 font-medium">Banco</th>}
              {visible.creditValue&&<th className="py-2.5 pr-4 font-medium">Valor do Crédito</th>}
              {visible.term&&<th className="py-2.5 pr-4 font-medium">Prazo</th>}
              {visible.seller&&<th className="py-2.5 pr-4 font-medium">Vendedor</th>}
              {visible.status&&<th className="py-2.5 pr-4 font-medium">Status</th>}
              {visible.date&&<th className="py-2.5 pr-4 font-medium">Data</th>}
              <th className="py-2.5 pr-2 font-medium text-right">Ações</th>
            </tr></thead>
            <tbody>{filtered.map((p)=><tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/70">
              <td className="py-3 pr-4 font-semibold text-ink">{clickable(p,p.id)}</td>
              {visible.client&&<td className="py-3 pr-4 text-ink font-medium">{clickable(p,p.client)}</td>}
              {visible.bank&&<td className="py-3 pr-4 text-gray-600">{clickable(p,p.bank)}</td>}
              {visible.creditValue&&<td className="py-3 pr-4 text-gray-600">{clickable(p,p.creditValue)}</td>}
              {visible.term&&<td className="py-3 pr-4 text-gray-600">{clickable(p,p.term)}</td>}
              {visible.seller&&<td className="py-3 pr-4 text-gray-600">{clickable(p,p.seller)}</td>}
              {visible.status&&<td className="py-3 pr-4">{clickable(p,<span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[p.status]}`}>{p.status}</span>)}</td>}
              {visible.date&&<td className="py-3 pr-4 text-gray-500">{clickable(p,p.date)}</td>}
              <td className="py-3 pr-2 text-right relative">
                <button onClick={()=>setMenuId(menuId===p.id?null:p.id)} className="text-gray-400 hover:text-gray-700 p-1"><MoreHorizontal size={16}/></button>
                {menuId===p.id&&<div className="absolute right-2 top-9 bg-white border border-gray-200 shadow-xl rounded-xl p-1 z-30 w-52 text-left">
                  <button onClick={()=>{setSelected(p);setMenuId(null)}} className="w-full px-3 py-2 text-xs rounded-lg hover:bg-gray-50 flex items-center gap-2"><Eye size={14}/>Visualizar proposta</button>
                  <button onClick={()=>{navigator.clipboard?.writeText(p.id);setMenuId(null)}} className="w-full px-3 py-2 text-xs rounded-lg hover:bg-gray-50 flex items-center gap-2"><Copy size={14}/>Copiar número</button>
                  <div className="border-t border-gray-100 mt-1 pt-1"><p className="px-3 py-1 text-[10px] uppercase tracking-wide text-gray-400">Alterar status</p>{(["Em análise","Enviada","Aprovada","Em preenchimento","Recusada"] as ProposalStatus[]).map((s)=><button key={s} onClick={()=>changeStatus(p.id,s)} className="w-full px-3 py-2 text-xs rounded-lg hover:bg-gray-50 flex items-center gap-2"><RefreshCcw size={13}/>{s}</button>)}</div>
                </div>}
              </td>
            </tr>)}</tbody>
          </table>
          {!filtered.length&&<div className="py-10 text-center text-sm text-gray-400">Nenhuma proposta encontrada com esses filtros.</div>}
        </div>
      </div>

      {selected&&<div className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
        <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-5 max-h-[88vh] overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5"><div><p className="text-xs text-gray-400">Proposta</p><h3 className="text-2xl font-bold">Nº {selected.id}</h3></div><button onClick={()=>setSelected(null)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18}/></button></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="panel p-3"><p className="text-xs text-gray-400">Cliente</p><b>{selected.client}</b></div>
            <div className="panel p-3"><p className="text-xs text-gray-400">Banco</p><b>{selected.bank}</b></div>
            <div className="panel p-3"><p className="text-xs text-gray-400">Crédito</p><b>{selected.creditValue}</b></div>
            <div className="panel p-3"><p className="text-xs text-gray-400">Prazo</p><b>{selected.term}</b></div>
            <div className="panel p-3"><p className="text-xs text-gray-400">Vendedor</p><b>{selected.seller}</b></div>
            <div className="panel p-3"><p className="text-xs text-gray-400">Data</p><b>{selected.date}</b></div>
          </div>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <label className="label">Status da proposta</label>
            <select value={selected.status} onChange={(e)=>changeStatus(selected.id,e.target.value as ProposalStatus)} className="field w-full sm:w-72">
              {(["Em análise","Enviada","Aprovada","Em preenchimento","Recusada"] as ProposalStatus[]).map((s)=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>}
    </>
  );
}
