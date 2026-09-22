"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import KpiCard from "@/components/KpiCard";
import PerformanceChart from "@/components/PerformanceChart";
import TopSellersList from "@/components/TopSellersList";
import InternalMessages from "@/components/InternalMessages";
import ProposalsTable from "@/components/ProposalsTable";
import { kpis as baseKpis, performanceData as basePerformance, proposals } from "@/lib/mock-data";
import type { KpiData, PerformancePoint } from "@/lib/types";
import { ArrowRight, CalendarClock, Download, WalletCards } from "lucide-react";

type Period = 1 | 7 | 14 | 30;

const DEMO_TODAY = proposals.reduce(
  (latest, proposal) => proposal.dateIso > latest ? proposal.dateIso : latest,
  "2026-09-18"
);

const brl = (value:number) =>
  value.toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});

function seeded(seed:number){
  let state=(seed>>>0)||1;
  return ()=>{
    state=(state*1664525+1013904223)>>>0;
    return state/4294967296;
  };
}

function startDateFromPeriod(period:Period){
  const [y,m,d]=DEMO_TODAY.split("-").map(Number);
  const date=new Date(Date.UTC(y,m-1,d));
  date.setUTCDate(date.getUTCDate()-(period-1));
  return date.toISOString().slice(0,10);
}

function buildChart(period:Period,seedValue:number):PerformancePoint[]{
  const random=seeded(seedValue+period*7919);
  const integer=(min:number,max:number)=>Math.round(min+random()*(max-min));
  const decimal=(min:number,max:number)=>min+random()*(max-min);

  if(period===1){
    return ["08h","10h","12h","14h","16h","18h","20h","22h"].map((label,index)=>{
      const propostas=integer(18000,62000)+index*integer(500,2400);
      const vendas=Math.round(propostas*decimal(0.52,0.78));
      return {month:label,propostas,vendas};
    });
  }

  const [y,m,d]=DEMO_TODAY.split("-").map(Number);
  return Array.from({length:period},(_,index)=>{
    const date=new Date(Date.UTC(y,m-1,d));
    date.setUTCDate(date.getUTCDate()-(period-1-index));
    const label=`${String(date.getUTCDate()).padStart(2,"0")}/${String(date.getUTCMonth()+1).padStart(2,"0")}`;
    const trend=0.88+(index/Math.max(period-1,1))*0.22;
    const propostas=Math.round(integer(65000,155000)*trend);
    const vendas=Math.round(propostas*decimal(0.54,0.79));
    return {month:label,propostas,vendas};
  });
}

function buildKpis(period:Period,seedValue:number):KpiData[]{
  const random=seeded(seedValue+period*3571);
  const integer=(min:number,max:number)=>Math.round(min+random()*(max-min));
  const decimal=(min:number,max:number)=>min+random()*(max-min);
  const factor=Math.pow(period,0.78);
  const proposalValue=Math.round(integer(185000,390000)*factor);
  const clients=integer(2380,3260);
  const sales=Math.max(1,Math.round(integer(7,18)*Math.pow(period,0.7)));
  const ticket=integer(9500,18500);
  const label=period===1?"vs ontem":`vs ${period}D anteriores`;

  return [
    { ...baseKpis[0], value:brl(proposalValue), change:`+${decimal(4.2,18.9).toFixed(1).replace(".",",")}%`, changeLabel:label },
    { ...baseKpis[1], value:clients.toLocaleString("pt-BR"), change:`+${decimal(2.1,11.8).toFixed(1).replace(".",",")}%`, changeLabel:label },
    { ...baseKpis[2], value:sales.toLocaleString("pt-BR"), change:`+${decimal(6.4,27.5).toFixed(1).replace(".",",")}%`, changeLabel:label },
    { ...baseKpis[3], value:brl(ticket), change:`+${decimal(1.5,12.4).toFixed(1).replace(".",",")}%`, changeLabel:label },
  ];
}

export default function DashboardPage() {
  const [period,setPeriod]=useState<Period>(7);
  const [seed,setSeed]=useState(0);
  const [dashboardKpis,setDashboardKpis]=useState<KpiData[]>(baseKpis);
  const [chartData,setChartData]=useState<PerformancePoint[]>(basePerformance.slice(-7));

  const dateFrom=startDateFromPeriod(period);
  const dateTo=DEMO_TODAY;

  useEffect(()=>{
    const values=new Uint32Array(1);
    window.crypto.getRandomValues(values);
    setSeed(values[0] || Date.now());
  },[]);

  useEffect(()=>{
    if(!seed)return;
    setDashboardKpis(buildKpis(period,seed));
    setChartData(buildChart(period,seed));
  },[period,seed]);

  const exportOverview = () => {
    const rows = [["Indicador","Valor","Variação"], ...dashboardKpis.map((k)=>[k.label,k.value,k.change])];
    const csv = rows.map((r)=>r.map((v)=>`"${String(v).replace(/"/g,'""')}"`).join(";")).join("\n");
    const blob = new Blob(["\ufeff"+csv], {type:"text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href=url;
    const dataArquivo=new Intl.DateTimeFormat("pt-BR").format(new Date()).replace(/\//g,".");
    a.download=`relatorio_visao_geral_${period}d_${dataArquivo}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell>
      <main className="px-4 sm:px-6 lg:px-8 pb-10 pt-5 space-y-5 max-w-[1800px] mx-auto">
        <div className="flex items-start lg:items-center justify-between flex-col lg:flex-row gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">Bem-vindo de volta, Daniel Vorcaro!</h1>
            <div className="flex items-center gap-2 flex-wrap mt-1">
              <p className="text-sm text-gray-500">Aqui está o resumo completo do seu CRM de consórcios.</p>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-500"/>
                Atualizações automáticas · novos valores somente ao entrar ou recarregar
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap w-full lg:w-auto">
            <div className="grid grid-cols-4 gap-1 bg-white border border-gray-200 rounded-xl p-1 w-full sm:w-auto">
              {([1,7,14,30] as Period[]).map((value)=>(
                <button
                  key={value}
                  onClick={()=>setPeriod(value)}
                  className={`min-w-[52px] px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${period===value?"bg-ink text-white":"text-gray-500 hover:bg-gray-50 hover:text-ink"}`}
                >
                  {value}D
                </button>
              ))}
            </div>
            <button onClick={exportOverview} className="flex items-center justify-center gap-2 bg-ink text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-black">
              <Download size={16}/><span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {dashboardKpis.map((kpi) => <KpiCard key={kpi.label} data={kpi}/>)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Link href="/pendencias" className="panel group hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gray-100 grid place-items-center"><CalendarClock size={19}/></div>
              <div className="flex-1"><p className="text-xs text-gray-400">Pendências de hoje</p><p className="text-2xl font-bold mt-1">4</p><p className="text-xs text-gray-500 mt-1">2 em andamento · 1 aguardando · 1 alta prioridade</p></div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-ink"/>
            </div>
          </Link>
          <Link href="/financeiro" className="panel group hover:border-gray-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gray-100 grid place-items-center"><WalletCards size={19}/></div>
              <div className="flex-1"><p className="text-xs text-gray-400">Financeiro do mês</p><p className="text-2xl font-bold mt-1">R$ 17.360</p><p className="text-xs text-gray-500 mt-1">Despesas operacionais · próxima folha 05/10/2026</p></div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-ink"/>
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-[1.55fr_0.9fr_0.9fr] gap-5 items-stretch">
          <div className="xl:col-span-2 2xl:col-span-1 min-w-0">\n            <PerformanceChart data={chartData} period={`${period}D`}/>\n          </div>
          <TopSellersList refreshKey={seed+period}/>
          <InternalMessages />
        </div>

        <ProposalsTable limit={5} dateFrom={dateFrom} dateTo={dateTo}/>
      </main>
    </AppShell>
  );
}
