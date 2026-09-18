import {
  KpiData,
  PerformancePoint,
  Seller,
  Message,
  Proposal,
  MenuItem,
} from "./types";

export const menuItems: MenuItem[] = [
  { label: "Visão Geral", icon: "LayoutGrid", active: true },
  { label: "Clientes", icon: "User" },
  { label: "Propostas", icon: "FileText" },
  { label: "Cotas", icon: "Package" },
  { label: "Atendimentos", icon: "MessageSquare" },
  { label: "Vendedores", icon: "Users" },
  { label: "Bancos", icon: "Landmark" },
  { label: "Compras", icon: "ShoppingCart" },
  { label: "Relatórios", icon: "FileBarChart" },
  { label: "Importar Planilha", icon: "Download" },
  { label: "Configurações", icon: "Settings" },
  { label: "Ajuda & Suporte", icon: "HelpCircle" },
];

export const kpis: KpiData[] = [
  {
    label: "Valor em Propostas",
    value: "R$ 3.428.500",
    change: "+12,5%",
    changeLabel: "do mês anterior",
    icon: "file",
    dark: true,
  },
  {
    label: "Clientes na Carteira",
    value: "2.845",
    change: "+8,3%",
    changeLabel: "do mês anterior",
    icon: "users",
  },
  {
    label: "Vendas Realizadas",
    value: "298",
    change: "+22,1%",
    changeLabel: "do mês anterior",
    icon: "chart",
  },
  {
    label: "Ticket Médio",
    value: "R$ 11.509",
    change: "+6,7%",
    changeLabel: "do mês anterior",
    icon: "money",
  },
];

export const performanceData: PerformancePoint[] = [
  { month: "Jun", propostas: 210000, vendas: 150000 },
  { month: "Jul", propostas: 280000, vendas: 170000 },
  { month: "Ago", propostas: 248500, vendas: 192300 },
  { month: "Set", propostas: 190000, vendas: 210000 },
  { month: "Out", propostas: 260000, vendas: 230000 },
  { month: "Nov", propostas: 310000, vendas: 250000 },
  { month: "Dez", propostas: 350000, vendas: 270000 },
];

export const topSellers: Seller[] = [
  {
    position: 1,
    name: "Daniel Vorcaro",
    avatar: "https://i.pravatar.cc/64?img=12",
    proposals: 68,
    value: "R$ 482.000",
    growth: "+18%",
  },
  {
    position: 2,
    name: "Juliana Souza",
    avatar: "https://i.pravatar.cc/64?img=47",
    proposals: 55,
    value: "R$ 356.000",
    growth: "+14%",
  },
  {
    position: 3,
    name: "Marcos Lima",
    avatar: "https://i.pravatar.cc/64?img=51",
    proposals: 48,
    value: "R$ 301.500",
    growth: "+12%",
  },
  {
    position: 4,
    name: "Renata Dias",
    avatar: "https://i.pravatar.cc/64?img=32",
    proposals: 42,
    value: "R$ 265.000",
    growth: "+9%",
  },
  {
    position: 5,
    name: "Felipe Rocha",
    avatar: "https://i.pravatar.cc/64?img=14",
    proposals: 38,
    value: "R$ 224.000",
    growth: "+7%",
  },
];

export const messages: Message[] = [
  {
    name: "Juliana Souza",
    avatar: "https://i.pravatar.cc/64?img=47",
    time: "14:32",
    preview: "Consegue me enviar os mat...",
    unread: 2,
  },
  {
    name: "Marcos Lima",
    avatar: "https://i.pravatar.cc/64?img=51",
    time: "11:15",
    preview: "Qual a previsão da nova base?",
    unread: 1,
  },
  {
    name: "Renata Dias",
    avatar: "https://i.pravatar.cc/64?img=32",
    time: "10:48",
    preview: "Reunião confirmada para am...",
  },
  {
    name: "Pedro Almeida",
    avatar: "https://i.pravatar.cc/64?img=13",
    time: "Ontem",
    preview: "Planilha atualizada ✅",
  },
  {
    name: "Equipe Comercial",
    avatar: "",
    time: "Ontem",
    preview: "@Todos nova campanha liber...",
    isGroup: true,
  },
];

export const proposals: Proposal[] = [
  {
    id: "#4321",
    client: "João da Silva",
    bank: "Itaú",
    creditValue: "R$ 80.000",
    term: "60 meses",
    seller: "Pedro Almeida",
    status: "Em análise",
    date: "17/09/2026",
  },
  {
    id: "#4320",
    client: "Maria Oliveira",
    bank: "Bradesco",
    creditValue: "R$ 120.000",
    term: "80 meses",
    seller: "Juliana Souza",
    status: "Enviada",
    date: "17/09/2026",
  },
  {
    id: "#4319",
    client: "Carlos Santos",
    bank: "Santander",
    creditValue: "R$ 60.000",
    term: "70 meses",
    seller: "Marcos Lima",
    status: "Aprovada",
    date: "16/09/2026",
  },
  {
    id: "#4318",
    client: "Ana Costa",
    bank: "Caixa",
    creditValue: "R$ 100.000",
    term: "80 meses",
    seller: "Renata Dias",
    status: "Em preenchimento",
    date: "16/09/2026",
  },
  {
    id: "#4317",
    client: "Roberto Lima",
    bank: "Magalu",
    creditValue: "R$ 50.000",
    term: "60 meses",
    seller: "Felipe Rocha",
    status: "Enviada",
    date: "16/09/2026",
  },
];

export const tabs = ["Top Vendedores", "Top Bancos", "Top Clientes", "Top Compras"] as const;
