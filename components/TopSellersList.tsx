import { topSellers } from "@/lib/mock-data";
import { ArrowUp } from "lucide-react";

const badgeColors: Record<number, string> = {
  1: "bg-amber-400 text-white",
  2: "bg-gray-200 text-gray-700",
  3: "bg-orange-400 text-white",
};

export default function TopSellersList() {
  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ink">Top Vendedores</h3>
        <button className="text-xs font-medium text-gray-500 hover:text-ink">
          Ver Todos
        </button>
      </div>

      <div className="space-y-1">
        {topSellers.map((seller) => (
          <div
            key={seller.position}
            className="flex items-center gap-3 py-2 rounded-lg hover:bg-gray-50 px-1 transition-colors"
          >
            <span
              className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                badgeColors[seller.position] ?? "bg-gray-100 text-gray-500"
              }`}
            >
              {seller.position}
            </span>
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-9 h-9 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink truncate">
                {seller.name}
              </p>
              <p className="text-xs text-gray-500">
                {seller.proposals} propostas
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-semibold text-ink">{seller.value}</p>
              <p className="text-xs text-positive font-medium flex items-center justify-end gap-0.5">
                <ArrowUp size={11} />
                {seller.growth}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
