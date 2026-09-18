import { banks, purchases, topClients, topSellers, tabs } from "@/lib/mock-data";
import { ArrowUp, Landmark, ShoppingCart, UserRound } from "lucide-react";

type Tab = (typeof tabs)[number];

const badgeColors: Record<number, string> = {
  1: "bg-amber-400 text-white",
  2: "bg-gray-200 text-gray-700",
  3: "bg-orange-400 text-white",
};

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function TopSellersList({ mode = "Top Vendedores" }: { mode?: Tab }) {
  const rows =
    mode === "Top Bancos"
      ? banks.map((b, i) => ({ name: b.name, sub: `${b.proposals} propostas · ${b.sales} vendas`, value: money(b.value), growth: `${b.conversion.toFixed(1)}%`, avatar: "", position: i + 1, icon: "bank" }))
      : mode === "Top Clientes"
      ? topClients.map((c, i) => ({ name: c.name, sub: `${c.owner} · ${c.status}`, value: money(c.totalCredit), growth: "Crédito", avatar: "", position: i + 1, icon: "client" }))
      : mode === "Top Compras"
      ? purchases.slice(0, 5).map((p, i) => ({ name: p.client, sub: `${p.product} · ${p.bank}`, value: money(p.value), growth: p.status, avatar: "", position: i + 1, icon: "purchase" }))
      : topSellers.map((s) => ({ name: s.name, sub: `${s.proposals} propostas · ${s.sales} vendas`, value: s.value, growth: s.growth, avatar: s.avatar, position: s.position, icon: "seller" }));

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-ink">{mode}</h3>
        <span className="text-xs font-medium text-gray-400">Ranking atual</span>
      </div>

      <div className="space-y-1">
        {rows.map((row) => (
          <div key={row.position + row.name} className="flex items-center gap-3 py-2 rounded-lg hover:bg-gray-50 px-1 transition-colors">
            <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${badgeColors[row.position] ?? "bg-gray-100 text-gray-500"}`}>
              {row.position}
            </span>
            {row.avatar ? (
              <img src={row.avatar} alt={row.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
                {row.icon === "bank" ? <Landmark size={16}/> : row.icon === "purchase" ? <ShoppingCart size={16}/> : <UserRound size={16}/>}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{row.name}</p>
              <p className="text-xs text-gray-500 truncate">{row.sub}</p>
            </div>
            <div className="text-right shrink-0 max-w-[110px]">
              <p className="text-sm font-semibold text-ink truncate">{row.value}</p>
              <p className={`text-[11px] font-medium flex items-center justify-end gap-0.5 ${mode === "Top Vendedores" ? "text-positive" : "text-gray-400"}`}>
                {mode === "Top Vendedores" && <ArrowUp size={10} />}
                {row.growth}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
