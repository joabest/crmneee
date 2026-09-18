"use client";

import { proposals } from "@/lib/mock-data";
import { ProposalStatus } from "@/lib/types";
import { SlidersHorizontal, Filter, Download, MoreHorizontal } from "lucide-react";

const statusStyles: Record<ProposalStatus, string> = {
  "Em análise": "bg-orange-100 text-orange-600",
  Enviada: "bg-sky-100 text-sky-600",
  Aprovada: "bg-green-100 text-green-600",
  "Em preenchimento": "bg-violet-100 text-violet-600",
};

export default function ProposalsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="font-semibold text-ink">Últimas Propostas</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            <SlidersHorizontal size={14} />
            Personalizar
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            <Filter size={14} />
            Filtrar
          </button>
          <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
            <Download size={14} />
            Exportar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 text-xs uppercase tracking-wide border-b border-gray-100">
              <th className="py-2.5 pr-4 font-medium">#</th>
              <th className="py-2.5 pr-4 font-medium">Cliente</th>
              <th className="py-2.5 pr-4 font-medium">Banco</th>
              <th className="py-2.5 pr-4 font-medium">Valor do Crédito</th>
              <th className="py-2.5 pr-4 font-medium">Prazo</th>
              <th className="py-2.5 pr-4 font-medium">Vendedor</th>
              <th className="py-2.5 pr-4 font-medium">Status</th>
              <th className="py-2.5 pr-4 font-medium">Data</th>
              <th className="py-2.5 pr-2 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr
                key={p.id}
                className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60"
              >
                <td className="py-3 pr-4 font-medium text-ink">{p.id}</td>
                <td className="py-3 pr-4 text-ink">{p.client}</td>
                <td className="py-3 pr-4 text-gray-600">{p.bank}</td>
                <td className="py-3 pr-4 text-gray-600">{p.creditValue}</td>
                <td className="py-3 pr-4 text-gray-600">{p.term}</td>
                <td className="py-3 pr-4 text-gray-600">{p.seller}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[p.status]}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-500">{p.date}</td>
                <td className="py-3 pr-2 text-right">
                  <button className="text-gray-400 hover:text-gray-700">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
