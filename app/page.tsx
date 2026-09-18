"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import KpiCard from "@/components/KpiCard";
import RankingTabs from "@/components/RankingTabs";
import PerformanceChart from "@/components/PerformanceChart";
import TopSellersList from "@/components/TopSellersList";
import InternalMessages from "@/components/InternalMessages";
import ProposalsTable from "@/components/ProposalsTable";
import { kpis } from "@/lib/mock-data";
import { Calendar, Download, ChevronDown } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <Header />

        <main className="px-6 lg:px-8 pb-10 space-y-6">
          {/* Welcome + filters */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-ink">
                Bem-vindo de volta, Daniel Vorcaro!
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Aqui está o resumo completo do seu CRM de consórcios.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Calendar size={16} className="text-gray-400" />
                01/09/2026 - 17/09/2026
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              <button className="flex items-center gap-2 bg-ink text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-black">
                <Download size={16} />
                Exportar
              </button>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.label} data={kpi} />
            ))}
          </div>

          {/* Ranking tabs */}
          <RankingTabs />

          {/* Chart + Top Sellers + Messages */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr_1fr] gap-5 items-stretch">
            <PerformanceChart />
            <TopSellersList />
            <InternalMessages />
          </div>

          {/* Proposals table */}
          <ProposalsTable />
        </main>
      </div>
    </div>
  );
}
