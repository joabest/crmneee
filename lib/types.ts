export interface KpiData {
  label: string;
  value: string;
  change: string;
  changeLabel: string;
  icon: "file" | "users" | "chart" | "money";
  dark?: boolean;
}

export interface PerformancePoint {
  month: string;
  propostas: number;
  vendas: number;
}

export interface Seller {
  position: number;
  name: string;
  avatar: string;
  proposals: number;
  value: string;
  growth: string;
}

export interface Message {
  name: string;
  avatar: string;
  time: string;
  preview: string;
  unread?: number;
  isGroup?: boolean;
}

export type ProposalStatus =
  | "Em análise"
  | "Enviada"
  | "Aprovada"
  | "Em preenchimento";

export interface Proposal {
  id: string;
  client: string;
  bank: string;
  creditValue: string;
  term: string;
  seller: string;
  status: ProposalStatus;
  date: string;
}

export interface MenuItem {
  label: string;
  icon: string;
  active?: boolean;
}
