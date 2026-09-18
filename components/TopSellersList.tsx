"use client";

import { banks, clients, purchases, proposals, topClients, topSellers, tabs } from "@/lib/mock-data";
import { ArrowUp, ChevronDown, Landmark, Mail, Phone, ShoppingCart, UserRound, X } from "lucide-react";
import { useMemo, useState } from "react";

type Tab = (typeof tabs)[number];

const badgeColors: Record<number, string> = {
  1: "bg-amber-400 text-white",
  2: "bg-gray-200 text-gray-700",
  3: "bg-orange-400 text-white",
};

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function TopSellersList({ refreshKey = 0 }: { refreshKey?: number }) {
  const [mode, setMode] = useState<Tab>("Top Vendedores");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const rows = useMemo(() => {
    const seeded = (index:number) => {
      const x = Math.sin((refreshKey + 1) * 999 + index * 37.17) * 10000;
      return x - Math.floor(x);
    };

    if (mode === "Top Bancos") {
      return banks
        .map((b, i) => {
          const proposalsNow = Math.max(40, Math.round(b.proposals * (0.82 + seeded(i) * 0.38)));
          const salesNow = Math.max(8, Math.min(proposalsNow, Math.round(b.sales * (0.82 + seeded(i+10) * 0.38))));
          const valueNow = Math.round(b.value * (0.84 + seeded(i+20) * 0.34));
          const conversionNow = proposalsNow ? salesNow / proposalsNow * 100 : 0;
          return { ...b, proposals:proposalsNow, sales:salesNow, value:valueNow, conversion:conversionNow, key:b.name, name:b.name, sub:`${proposalsNow} propostas · ${salesNow} vendas`, displayValue:money(valueNow), growth:`${conversionNow.toFixed(1)}%`, kind:"bank" };
        })
        .sort((a,b)=>b.value-a.value)
        .map((row,i)=>({...row,position:i+1}));
    }

    if (mode === "Top Clientes") {
      return topClients
        .map((c, i) => {
          const creditNow = Math.round(c.totalCredit * (0.82 + seeded(i+30) * 0.4));
          return { ...c, totalCredit:creditNow, key:c.id, name:c.name, sub:`${c.owner} · ${c.status}`, displayValue:money(creditNow), growth:"Crédito", kind:"client" };
        })
        .sort((a,b)=>b.totalCredit-a.totalCredit)
        .map((row,i)=>({...row,position:i+1}));
    }

    if (mode === "Top Compras") {
      return purchases
        .map((p, i) => {
          const valueNow = Math.round(p.value * (0.9 + seeded(i+40) * 0.24));
          return { ...p, value:valueNow, key:p.id, name:p.client, sub:`${p.product} · ${p.bank}`, displayValue:money(valueNow), growth:p.status, kind:"purchase" };
        })
        .sort((a,b)=>b.value-a.value)
        .slice(0,5)
        .map((row,i)=>({...row,position:i+1}));
    }

    return topSellers
      .map((s, i) => {
        const proposalsNow = Math.max(12, Math.round(s.proposals * (0.82 + seeded(i+50) * 0.36)));
        const salesNow = Math.max(4, Math.min(proposalsNow, Math.round(s.sales * (0.82 + seeded(i+60) * 0.36))));
        const conversionNow = salesNow / proposalsNow * 100;
        const rawValue = Number(s.value.replace(/\D/g,"")) || 200000;
        const valueNow = Math.round(rawValue * (0.82 + seeded(i+70) * 0.36));
        const growthNow = Math.round(5 + seeded(i+80) * 19);
        return { ...s, proposals:proposalsNow, sales:salesNow, conversion:`${conversionNow.toFixed(1).replace(".",",")}%`, value:money(valueNow), growth:`+${growthNow}%`, key:s.name, name:s.name, sub:`${proposalsNow} propostas · ${salesNow} vendas`, displayValue:money(valueNow), kind:"seller" };
      })
      .sort((a,b)=>b.sales-a.sales)
      .map((row,i)=>({...row,position:i+1}));
  }, [mode, refreshKey]);

  const related = selected?.kind === "seller"
    ? proposals.filter((p)=>p.seller===selected.name).slice(0,5)
    : selected?.kind === "bank"
    ? proposals.filter((p)=>p.bank.toLowerCase().includes(selected.name.split(" ")[0].toLowerCase())).slice(0,5)
    : selected?.kind === "client"
    ? purchases.filter((p)=>p.client===selected.name)
    : [];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 min-w-0">
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="relative">
            <button onClick={()=>setOpen((v)=>!v)} className="flex items-center gap-2 font-semibold text-ink hover:text-black">
              {mode}<ChevronDown size={15} className={open?"rotate-180 transition-transform":"transition-transform"}/>
            </button>
            {open && (
              <div className="absolute left-0 top-8 z-30 w-48 bg-white border border-gray-200 rounded-xl shadow-xl p-1">
                {tabs.map((tab)=><button key={tab} onClick={()=>{setMode(tab);setOpen(false)}} className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 ${mode===tab?"font-semibold bg-gray-50":""}`}>{tab}</button>)}
              </div>
            )}
          </div>
          <span className="text-xs font-medium text-gray-400">Ranking atual</span>
        </div>

        <div className="space-y-1">
          {rows.map((row:any) => (
            <button key={row.key} onClick={()=>setSelected(row)} className="w-full flex items-center gap-3 py-2 rounded-lg hover:bg-gray-50 px-1 transition-colors text-left">
              <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${badgeColors[row.position] ?? "bg-gray-100 text-gray-500"}`}>{row.position}</span>
              {row.avatar ? (
                <img src={row.avatar} alt={row.name} loading="lazy" className="w-9 h-9 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                  {row.kind==="bank"?<Landmark size={16}/>:row.kind==="purchase"?<ShoppingCart size={16}/>:<UserRound size={16}/>}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{row.name}</p>
                <p className="text-xs text-gray-500 truncate">{row.sub}</p>
              </div>
              <div className="text-right shrink-0 max-w-[112px]">
                <p className="text-sm font-semibold text-ink truncate">{row.displayValue ?? row.value}</p>
                <p className={`text-[11px] font-medium flex items-center justify-end gap-0.5 ${mode==="Top Vendedores"?"text-positive":"text-gray-400"}`}>
                  {mode==="Top Vendedores"&&<ArrowUp size={10}/>} {row.growth}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-2xl p-5" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-center gap-3 min-w-0">
                {selected.avatar?<img src={selected.avatar} alt={selected.name} className="w-14 h-14 rounded-full object-cover"/>:<div className="w-14 h-14 rounded-full bg-gray-100 grid place-items-center"><UserRound size={22}/></div>}
                <div className="min-w-0"><p className="text-xs text-gray-400">{mode}</p><h3 className="text-xl font-bold truncate">{selected.name}</h3><p className="text-sm text-gray-500 mt-1">{selected.role || selected.product || selected.manager || selected.status}</p></div>
              </div>
              <button onClick={()=>setSelected(null)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18}/></button>
            </div>

            {selected.kind==="seller" && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="metric"><b>{selected.proposals}</b><span>Propostas</span></div><div className="metric"><b>{selected.sales}</b><span>Vendas</span></div><div className="metric"><b>{selected.conversion}</b><span>Conversão</span></div><div className="metric"><b>{selected.value}</b><span>Valor vendido</span></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
                  <div className="panel p-3"><p className="text-xs text-gray-400">Hierarquia</p><b>{selected.hierarchy}</b></div>
                  <div className="panel p-3"><p className="text-xs text-gray-400">Entrada na empresa</p><b>{selected.joined}</b></div>
                  <a href={`tel:${selected.phone.replace(/\D/g,"")}`} className="panel p-3"><p className="text-xs text-gray-400">Telefone</p><b className="flex items-center gap-2"><Phone size={14}/>{selected.phone}</b></a>
                  <a href={`mailto:${selected.email}`} className="panel p-3"><p className="text-xs text-gray-400">E-mail</p><b className="flex items-center gap-2 truncate"><Mail size={14}/>{selected.email}</b></a>
                </div>
              </>
            )}

            {selected.kind==="bank" && (
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="metric"><b>{selected.proposals}</b><span>Propostas</span></div><div className="metric"><b>{selected.sales}</b><span>Vendas</span></div><div className="metric"><b>{money(selected.value)}</b><span>Valor vendido</span></div><div className="metric"><b>{selected.conversion.toFixed(1)}%</b><span>Conversão</span></div>
                <div className="panel p-3"><p className="text-xs text-gray-400">Gerente / contato</p><b>{selected.manager}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Telefone</p><b>{selected.phone}</b></div>
                <div className="panel p-3 sm:col-span-2"><p className="text-xs text-gray-400">E-mail</p><b>{selected.email}</b></div>
              </div>
            )}

            {selected.kind==="client" && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3 text-sm"><div className="panel p-3"><p className="text-xs text-gray-400">CPF</p><b>{selected.cpf}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Responsável</p><b>{selected.owner}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Telefone</p><b>{selected.phone}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">E-mail</p><b>{selected.email}</b></div></div>
                <div><h4 className="font-semibold text-sm mb-2">Compras do cliente</h4>{related.length?related.map((p:any)=><div key={p.id} className="flex items-center justify-between gap-3 border-t border-gray-100 py-3 text-sm"><span>{p.product} · {p.bank}</span><b>{money(p.value)}</b></div>):<p className="text-sm text-gray-400">Nenhuma compra simulada.</p>}</div>
              </div>
            )}

            {selected.kind==="purchase" && (
              <div className="grid sm:grid-cols-2 gap-3 text-sm"><div className="panel p-3"><p className="text-xs text-gray-400">Compra</p><b>{selected.id}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Produto</p><b>{selected.product}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Banco</p><b>{selected.bank}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Valor</p><b>{money(selected.value)}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Vendedor</p><b>{selected.seller}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Pagamento</p><b>{selected.payment}</b></div></div>
            )}

            {!!related.length && selected.kind!=="client" && <div className="mt-5"><h4 className="font-semibold text-sm mb-2">Histórico relacionado</h4>{related.map((r:any)=><div key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-3 border-t border-gray-100 text-sm"><span>Nº {r.id} · {r.client}</span><span className="text-gray-500">{r.bank} · {r.creditValue}</span></div>)}</div>}
          </div>
        </div>
      )}
    </>
  );
}
