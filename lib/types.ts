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
  sales: number;
  value: string;
  growth: string;
  conversion: string;
}

export interface Message {
  id: string;
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
  | "Em preenchimento"
  | "Recusada";

export interface Proposal {
  id: string;
  client: string;
  bank: string;
  creditValue: string;
  creditNumber: number;
  term: string;
  seller: string;
  status: ProposalStatus;
  date: string;
  dateIso: string;
}

export interface Client {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  city: string;
  source: string;
  owner: string;
  status: "Não contatado" | "Em negociação" | "Vendido" | "Recusou" | "Sem contato";
  totalCredit: number;
}

export interface Quota {
  id: string;
  group: string;
  quota: string;
  client: string;
  bank: string;
  credit: number;
  paidPercent: number;
  installmentsPaid: number;
  installmentsTotal: number;
  status: "Ativa" | "Contemplada" | "Encerrada" | "Em atraso";
}

export interface BankData {
  name: string;
  proposals: number;
  sales: number;
  value: number;
  conversion: number;
}

export interface Purchase {
  id: string;
  client: string;
  product: string;
  bank: string;
  value: number;
  seller: string;
  date: string;
  status: "Confirmada" | "Pendente" | "Cancelada";
}

export interface ServiceTicket {
  id: string;
  client: string;
  owner: string;
  phone: string;
  stage: "Não contatado" | "Em negociação" | "Vendido" | "Recusou";
  note: string;
}

export interface MenuItem {
  label: string;
  icon: string;
  href: string;
}

export interface EmailThread {
  id: string;
  from: string;
  avatar: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  body: string;
}