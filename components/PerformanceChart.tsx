"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MoreHorizontal } from "lucide-react";
import type { PerformancePoint } from "@/lib/types";

function formatK(value: number) {
  return `R$ ${Math.round(value / 1000)}K`;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const propostas = payload.find((p: any) => p.dataKey === "propostas")?.value;
  const vendas = payload.find((p: any) => p.dataKey === "vendas")?.value;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 min-w-[200px]">
      <p className="text-sm font-semibold text-ink mb-2">{label}</p>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="flex items-center gap-1.5 text-gray-500">
          <span className="w-2 h-2 rounded-full bg-violet-500" /> Propostas
        </span>
        <span className="font-semibold text-ink">
          R$ {Number(propostas || 0).toLocaleString("pt-BR")}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 text-gray-500">
          <span className="w-2 h-2 rounded-full bg-sky-500" /> Vendas
        </span>
        <span className="font-semibold text-ink">
          R$ {Number(vendas || 0).toLocaleString("pt-BR")}
        </span>
      </div>
    </div>
  );
}

export default function PerformanceChart({
  data,
  period,
}: {
  data: PerformancePoint[];
  period: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
      <div className="flex items-start sm:items-center justify-between mb-4 gap-3 flex-col sm:flex-row">
        <div>
          <h3 className="font-semibold text-ink">Desempenho de Propostas e Vendas</h3>
          <p className="text-[11px] text-gray-400 mt-1">Período selecionado: {period}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-500" /> Propostas
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> Vendas
          </span>
          <button className="text-gray-400 hover:text-gray-600" aria-label="Mais opções">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="propostasGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="vendasGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} minTickGap={18} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} tickFormatter={formatK} width={55} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="propostas" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#propostasGrad)" dot={false} activeDot={{ r: 5 }} isAnimationActive />
            <Area type="monotone" dataKey="vendas" stroke="#0EA5E9" strokeWidth={2.5} fill="url(#vendasGrad)" dot={false} activeDot={{ r: 5 }} isAnimationActive />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
