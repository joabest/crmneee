"use client";

import { useState } from "react";
import AppShell from "@/components/AppShell";
import KpiCard from "@/components/KpiCard";
import PerformanceChart from "@/components/PerformanceChart";
import TopSellersList from "@/components/TopSellersList";
import InternalMessages from "@/components/InternalMessages";
import ProposalsTable from "@/components/ProposalsTable";
import { kpis } from "@/lib/mock-data";
import { Download } from "lucide-react";

export default function DashboardPage() {
  const [dateFrom, setDateFrom] = useState("2026-09-01");
  const [dateTo, setDateTo] = useState("2026-09-17");

  const exportOverview = () => {
    const rows = [["Indicador","Valor"], ...kpis.map((k)=>[k.label,k.value])];
    const csv = rows.map((r)=>r.map((v)=>`"${String(v).replace(/"/g,'""')}"`).join(";")).join("\n");
    const blob = new Blob(["\ufeff"+csv], {type:"text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href=url; a.download="visao-geral-mv-crm.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <main className="px-4 sm:px-6 lg:px-8 pb-10 pt-5 space-y-5 max-w-[1800px] mx-auto">
        <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">Bem-vindo de volta, Daniel Vorcaro!</h1>
            <p className="text-sm text-gray-500 mt-1">Aqui está o resumo completo do seu CRM de consórcios.</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 sm:flex-none">
              <input aria-label="Data inicial" type="date" value={dateFrom} onChange={(e)=>setDateFrom(e.target.value)} className="text-xs sm:text-sm bg-transparent outline-none min-w-0"/>
              <span className="text-gray-300">—</span>
              <input aria-label="Data final" type="date" value={dateTo} onChange={(e)=>setDateTo(e.target.value)} className="text-xs sm:text-sm bg-transparent outline-none min-w-0"/>
            </div>
            <button onClick={exportOverview} className="flex items-center gap-2 bg-ink text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-black">
              <Download size={16}/><span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((kpi) => <KpiCard key={kpi.label} data={kpi}/>)}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.55fr_0.9fr_0.9fr] gap-5 items-stretch">
          <PerformanceChart />
          <TopSellersList />
          <InternalMessages />
        </div>

        <ProposalsTable limit={5} dateFrom={dateFrom} dateTo={dateTo}/>
      </main>
    </AppShell>
  );
}
