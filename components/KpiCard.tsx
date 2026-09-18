import { FileText, Users, BarChart3, DollarSign, ArrowUp } from "lucide-react";
import { KpiData } from "@/lib/types";

const iconMap = {
  file: FileText,
  users: Users,
  chart: BarChart3,
  money: DollarSign,
};

export default function KpiCard({ data }: { data: KpiData }) {
  const Icon = iconMap[data.icon];

  return (
    <div
      className={`rounded-2xl p-5 shadow-card border ${
        data.dark
          ? "bg-ink text-white border-ink"
          : "bg-white text-ink border-gray-100"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <p
          className={`text-sm font-medium ${
            data.dark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {data.label}
        </p>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            data.dark ? "bg-white/10" : "bg-gray-100"
          }`}
        >
          <Icon size={16} className={data.dark ? "text-white" : "text-gray-600"} />
        </div>
      </div>
      <p className="text-2xl font-bold mb-2">{data.value}</p>
      <div className="flex items-center gap-1 text-sm">
        <span className="flex items-center gap-0.5 text-positive font-semibold">
          <ArrowUp size={14} />
          {data.change}
        </span>
        <span className={data.dark ? "text-gray-400" : "text-gray-500"}>
          {data.changeLabel}
        </span>
      </div>
    </div>
  );
}
