"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Sparkles } from "lucide-react";

type Activity = {
  text: string;
  tone: "success" | "warning" | "info";
};

const activities: Activity[] = [
  { text: "ATENDENTE PEDRO ALMEIDA ACABOU DE FINALIZAR MAIS UM CONTRATO", tone: "success" },
  { text: "ATENDENTE RENATA DIAS NÃO CONSEGUIU CONTATO COM UM CLIENTE", tone: "warning" },
  { text: "GRUPO 003208 · COTA 0118-00 FOI CONTEMPLADA", tone: "success" },
  { text: "ATENDENTE JULIANA SOUZA ENVIOU UMA NOVA PROPOSTA PARA ANÁLISE", tone: "info" },
  { text: "GRUPO 007335 · COTA 0441-00 RECEBEU UMA NOVA ATUALIZAÇÃO", tone: "info" },
  { text: "ATENDENTE MARCOS LIMA AVANÇOU UM CLIENTE PARA EM NEGOCIAÇÃO", tone: "success" },
  { text: "ATENDENTE FELIPE ROCHA REGISTROU UMA NOVA TENTATIVA DE CONTATO", tone: "warning" },
  { text: "GRUPO 005912 · COTA 0712-00 TEVE O PAGAMENTO CONFIRMADO", tone: "success" },
];

export default function ActivityTicker() {
  const [index, setIndex] = useState(0);

  const current = activities[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % activities.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  const icon = useMemo(() => {
    if (current.tone === "success") return <CheckCircle2 size={14} />;
    if (current.tone === "warning") return <CircleAlert size={14} />;
    return <Sparkles size={14} />;
  }, [current.tone]);

  return (
    <div className="relative z-20 border-b border-white/10 bg-black text-white">
      <div className="flex min-h-[36px] w-full items-center gap-3 overflow-hidden px-4 sm:px-6 lg:px-8">
        <span className="hidden shrink-0 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[9px] font-bold tracking-[0.16em] text-white/70 sm:inline-flex">
          ATUALIZAÇÕES AUTOMÁTICAS
        </span>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
          <span className="shrink-0 text-white/70">{icon}</span>
          <p
            key={index}
            className="truncate text-center text-[10px] font-semibold tracking-[0.08em] text-white sm:text-xs"
          >
            {current.text}
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-1.5 md:flex">
          {activities.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={
                "h-1.5 rounded-full transition-all duration-300 " +
                (dotIndex === index ? "w-4 bg-white" : "w-1.5 bg-white/30")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
