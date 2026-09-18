"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid, User, FileText, Package, MessageSquare, Users, Landmark,
  ShoppingCart, FileBarChart, Download, Settings, HelpCircle, Headphones,
  Mail, X
} from "lucide-react";
import { menuItems } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid, User, FileText, Package, MessageSquare, Users, Landmark,
  ShoppingCart, FileBarChart, Download, Settings, HelpCircle, Mail,
};

export default function Sidebar({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className={
      mobile
        ? "fixed inset-y-0 left-0 z-50 flex w-[286px] flex-col bg-white border-r border-gray-200 shadow-2xl"
        : "hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-gray-200 h-screen sticky top-0"
    }>
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center text-white font-black text-sm tracking-tight">
          MV
        </div>
        <div className="leading-tight">
          <p className="font-extrabold text-ink text-xl -mb-1">CRM</p>
          <p className="text-[10px] tracking-[0.22em] text-gray-500 font-semibold">CONSÓRCIOS</p>
        </div>
        {mobile && (
          <button onClick={onClose} className="ml-auto w-9 h-9 rounded-lg hover:bg-gray-100 grid place-items-center" aria-label="Fechar menu">
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-1 pb-3">
        {menuItems.map((item) => {
          const Icon = iconMap[item.icon] ?? LayoutGrid;
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? "bg-ink text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-ink"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-2xl bg-ink p-4 text-white">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-3">
            <Headphones size={18} />
          </div>
          <p className="font-semibold text-sm mb-1">Contate o Suporte</p>
          <p className="text-xs text-gray-300 mb-3 leading-relaxed">Precisa de ajuda? Fale conosco pelo WhatsApp.</p>
          <a
            href="https://wa.me/5511992779039"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-ink hover:bg-gray-100 transition-colors rounded-lg py-2.5 text-xs font-semibold"
          >
            (11) 99277-9039
          </a>
        </div>
      </div>
    </aside>
  );
}
