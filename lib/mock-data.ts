import {
  BankData,
  Client,
  EmailThread,
  KpiData,
  MenuItem,
  Message,
  PerformancePoint,
  Proposal,
  Purchase,
  Quota,
  Seller,
  ServiceTicket,
} from "./types";

export const menuItems: MenuItem[] = [
  { label: "Visão Geral", icon: "LayoutGrid", href: "/" },
  { label: "Clientes", icon: "User", href: "/clientes" },
  { label: "Propostas", icon: "FileText", href: "/propostas" },
  { label: "Cotas", icon: "Package", href: "/cotas" },
  { label: "Atendimentos", icon: "MessageSquare", href: "/atendimentos" },
  { label: "Vendedores", icon: "Users", href: "/vendedores" },
  { label: "Bancos", icon: "Landmark", href: "/bancos" },
  { label: "Compras", icon: "ShoppingCart", href: "/compras" },
  { label: "Mensagens", icon: "Mail", href: "/mensagens" },
  { label: "Relatórios", icon: "FileBarChart", href: "/relatorios" },
  { label: "Importar Planilha", icon: "Download", href: "/importar-planilha" },
  { label: "Configurações", icon: "Settings", href: "/configuracoes" },
  { label: "Ajuda & Suporte", icon: "HelpCircle", href: "/suporte" },
];

export const kpis: KpiData[] = [
  { label: "Valor em Propostas", value: "R$ 3.428.500", change: "+12,5%", changeLabel: "do mês anterior", icon: "file", dark: true },
  { label: "Clientes na Carteira", value: "2.845", change: "+8,3%", changeLabel: "do mês anterior", icon: "users" },
  { label: "Vendas Realizadas", value: "298", change: "+22,1%", changeLabel: "do mês anterior", icon: "chart" },
  { label: "Ticket Médio", value: "R$ 11.509", change: "+6,7%", changeLabel: "do mês anterior", icon: "money" },
];

export const performanceData: PerformancePoint[] = [
  { month: "Jun", propostas: 210000, vendas: 150000 },
  { month: "Jul", propostas: 280000, vendas: 170000 },
  { month: "Ago", propostas: 248500, vendas: 192300 },
  { month: "Set", propostas: 315000, vendas: 240000 },
  { month: "Out", propostas: 260000, vendas: 230000 },
  { month: "Nov", propostas: 310000, vendas: 250000 },
  { month: "Dez", propostas: 350000, vendas: 270000 },
];

export const topSellers: Seller[] = [
  { position: 1, name: "Pedro Almeida", avatar: "https://i.pravatar.cc/64?img=13", proposals: 68, sales: 24, value: "R$ 482.000", growth: "+18%", conversion: "35,3%" },
  { position: 2, name: "Juliana Souza", avatar: "https://i.pravatar.cc/64?img=47", proposals: 55, sales: 19, value: "R$ 356.000", growth: "+14%", conversion: "34,5%" },
  { position: 3, name: "Marcos Lima", avatar: "https://i.pravatar.cc/64?img=51", proposals: 48, sales: 16, value: "R$ 301.500", growth: "+12%", conversion: "33,3%" },
  { position: 4, name: "Renata Dias", avatar: "https://i.pravatar.cc/64?img=32", proposals: 42, sales: 14, value: "R$ 265.000", growth: "+9%", conversion: "33,3%" },
  { position: 5, name: "Felipe Rocha", avatar: "https://i.pravatar.cc/64?img=14", proposals: 38, sales: 12, value: "R$ 224.000", growth: "+7%", conversion: "31,6%" },
];

export const banks: BankData[] = [
  { name: "Itaú Consórcios", proposals: 312, sales: 92, value: 1048000, conversion: 29.5 },
  { name: "Bradesco Consórcios", proposals: 284, sales: 81, value: 896000, conversion: 28.5 },
  { name: "Santander Consórcios", proposals: 238, sales: 68, value: 741000, conversion: 28.6 },
  { name: "Caixa Consórcios", proposals: 196, sales: 49, value: 532000, conversion: 25.0 },
  { name: "Magalu Consórcios", proposals: 142, sales: 35, value: 397000, conversion: 24.6 },
];

export const clients: Client[] = [
  { id: "CL-2845", name: "João da Silva", cpf: "123.456.789-10", phone: "(11) 98821-4421", email: "joao.silva@email.com", city: "São Paulo/SP", source: "Google Ads", owner: "Pedro Almeida", status: "Em negociação", totalCredit: 80000 },
  { id: "CL-2844", name: "Maria Oliveira", cpf: "234.567.890-21", phone: "(11) 97742-1190", email: "maria.oliveira@email.com", city: "Guarulhos/SP", source: "Indicação", owner: "Juliana Souza", status: "Vendido", totalCredit: 120000 },
  { id: "CL-2843", name: "Carlos Santos", cpf: "345.678.901-32", phone: "(11) 99638-5502", email: "carlos.santos@email.com", city: "São Paulo/SP", source: "Instagram", owner: "Marcos Lima", status: "Em negociação", totalCredit: 60000 },
  { id: "CL-2842", name: "Ana Costa", cpf: "456.789.012-43", phone: "(11) 98551-2102", email: "ana.costa@email.com", city: "Santo André/SP", source: "Site", owner: "Renata Dias", status: "Não contatado", totalCredit: 100000 },
  { id: "CL-2841", name: "Roberto Lima", cpf: "567.890.123-54", phone: "(11) 99182-3341", email: "roberto.lima@email.com", city: "Osasco/SP", source: "Facebook", owner: "Felipe Rocha", status: "Sem contato", totalCredit: 50000 },
  { id: "CL-2840", name: "Fernanda Rocha", cpf: "678.901.234-65", phone: "(11) 97211-9022", email: "fernanda.rocha@email.com", city: "São Paulo/SP", source: "Google Ads", owner: "Pedro Almeida", status: "Vendido", totalCredit: 180000 },
  { id: "CL-2839", name: "Gustavo Martins", cpf: "789.012.345-76", phone: "(11) 96345-8011", email: "gustavo.martins@email.com", city: "Campinas/SP", source: "Indicação", owner: "Juliana Souza", status: "Recusou", totalCredit: 90000 },
  { id: "CL-2838", name: "Patrícia Souza", cpf: "890.123.456-87", phone: "(11) 95624-1100", email: "patricia.souza@email.com", city: "São Paulo/SP", source: "Site", owner: "Marcos Lima", status: "Em negociação", totalCredit: 150000 },
];

export const proposals: Proposal[] = [
  { id: "#4321", client: "João da Silva", bank: "Itaú", creditValue: "R$ 80.000", creditNumber: 80000, term: "60 meses", seller: "Pedro Almeida", status: "Em análise", date: "17/09/2026", dateIso: "2026-09-17" },
  { id: "#4320", client: "Maria Oliveira", bank: "Bradesco", creditValue: "R$ 120.000", creditNumber: 120000, term: "80 meses", seller: "Juliana Souza", status: "Enviada", date: "17/09/2026", dateIso: "2026-09-17" },
  { id: "#4319", client: "Carlos Santos", bank: "Santander", creditValue: "R$ 60.000", creditNumber: 60000, term: "70 meses", seller: "Marcos Lima", status: "Aprovada", date: "16/09/2026", dateIso: "2026-09-16" },
  { id: "#4318", client: "Ana Costa", bank: "Caixa", creditValue: "R$ 100.000", creditNumber: 100000, term: "80 meses", seller: "Renata Dias", status: "Em preenchimento", date: "16/09/2026", dateIso: "2026-09-16" },
  { id: "#4317", client: "Roberto Lima", bank: "Magalu", creditValue: "R$ 50.000", creditNumber: 50000, term: "60 meses", seller: "Felipe Rocha", status: "Enviada", date: "16/09/2026", dateIso: "2026-09-16" },
  { id: "#4316", client: "Fernanda Rocha", bank: "Itaú", creditValue: "R$ 180.000", creditNumber: 180000, term: "84 meses", seller: "Pedro Almeida", status: "Aprovada", date: "15/09/2026", dateIso: "2026-09-15" },
  { id: "#4315", client: "Gustavo Martins", bank: "Bradesco", creditValue: "R$ 90.000", creditNumber: 90000, term: "72 meses", seller: "Juliana Souza", status: "Recusada", date: "14/09/2026", dateIso: "2026-09-14" },
  { id: "#4314", client: "Patrícia Souza", bank: "Santander", creditValue: "R$ 150.000", creditNumber: 150000, term: "90 meses", seller: "Marcos Lima", status: "Em análise", date: "13/09/2026", dateIso: "2026-09-13" },
];

export const quotas: Quota[] = [
  { id: "CT-0569", group: "003091", quota: "0569-00", client: "João da Silva", bank: "Disal", credit: 38676.3, paidPercent: 48.0, installmentsPaid: 35, installmentsTotal: 80, status: "Ativa" },
  { id: "CT-0570", group: "003208", quota: "0118-00", client: "Maria Oliveira", bank: "Itaú", credit: 120000, paidPercent: 54.2, installmentsPaid: 43, installmentsTotal: 80, status: "Contemplada" },
  { id: "CT-0571", group: "003412", quota: "0321-00", client: "Carlos Santos", bank: "Santander", credit: 60000, paidPercent: 21.5, installmentsPaid: 15, installmentsTotal: 70, status: "Ativa" },
  { id: "CT-0572", group: "004108", quota: "0204-00", client: "Ana Costa", bank: "Caixa", credit: 100000, paidPercent: 12.5, installmentsPaid: 10, installmentsTotal: 80, status: "Em atraso" },
  { id: "CT-0573", group: "005912", quota: "0712-00", client: "Fernanda Rocha", bank: "Itaú", credit: 180000, paidPercent: 100, installmentsPaid: 84, installmentsTotal: 84, status: "Encerrada" },
];

export const purchases: Purchase[] = [
  { id: "CP-9012", client: "Fernanda Rocha", product: "Carta Automóvel", bank: "Itaú", value: 180000, seller: "Pedro Almeida", date: "17/09/2026", status: "Confirmada" },
  { id: "CP-9011", client: "Maria Oliveira", product: "Carta Imóvel", bank: "Bradesco", value: 120000, seller: "Juliana Souza", date: "16/09/2026", status: "Confirmada" },
  { id: "CP-9010", client: "Carlos Santos", product: "Carta Automóvel", bank: "Santander", value: 60000, seller: "Marcos Lima", date: "16/09/2026", status: "Pendente" },
  { id: "CP-9009", client: "Ana Costa", product: "Carta Serviços", bank: "Caixa", value: 100000, seller: "Renata Dias", date: "15/09/2026", status: "Pendente" },
  { id: "CP-9008", client: "Gustavo Martins", product: "Carta Automóvel", bank: "Bradesco", value: 90000, seller: "Juliana Souza", date: "14/09/2026", status: "Cancelada" },
];

export const serviceTickets: ServiceTicket[] = [
  { id: "AT-102", client: "Ana Costa", owner: "Renata Dias", phone: "(11) 98551-2102", stage: "Não contatado", note: "Lead recebido pelo site." },
  { id: "AT-101", client: "Roberto Lima", owner: "Felipe Rocha", phone: "(11) 99182-3341", stage: "Não contatado", note: "Tentativa agendada para 14h." },
  { id: "AT-100", client: "João da Silva", owner: "Pedro Almeida", phone: "(11) 98821-4421", stage: "Em negociação", note: "Aguardando documentos." },
  { id: "AT-099", client: "Carlos Santos", owner: "Marcos Lima", phone: "(11) 99638-5502", stage: "Em negociação", note: "Cliente comparando bancos." },
  { id: "AT-098", client: "Maria Oliveira", owner: "Juliana Souza", phone: "(11) 97742-1190", stage: "Vendido", note: "Venda concluída." },
  { id: "AT-097", client: "Gustavo Martins", owner: "Juliana Souza", phone: "(11) 96345-8011", stage: "Recusou", note: "Sem interesse no momento." },
];

export const messages: Message[] = [
  { id: "m1", name: "Juliana Souza", avatar: "https://i.pravatar.cc/64?img=47", time: "14:32", preview: "Consegue me enviar os materiais?", unread: 2 },
  { id: "m2", name: "Marcos Lima", avatar: "https://i.pravatar.cc/64?img=51", time: "11:15", preview: "Qual a previsão da nova base?", unread: 1 },
  { id: "m3", name: "Renata Dias", avatar: "https://i.pravatar.cc/64?img=32", time: "10:48", preview: "Reunião confirmada para amanhã." },
  { id: "m4", name: "Pedro Almeida", avatar: "https://i.pravatar.cc/64?img=13", time: "Ontem", preview: "Planilha atualizada ✅" },
  { id: "m5", name: "Equipe Comercial", avatar: "", time: "Ontem", preview: "@Todos nova campanha liberada.", isGroup: true },
];

export const emailThreads: EmailThread[] = [
  { id: "em1", from: "Juliana Souza", avatar: "https://i.pravatar.cc/64?img=47", subject: "Documentos da proposta #4320", preview: "Daniel, revisei os documentos e deixei tudo pronto...", time: "14:32", unread: true, body: "Daniel, revisei os documentos da proposta #4320 e deixei tudo pronto para conferência. Assim que aprovar, faço o envio para a administradora." },
  { id: "em2", from: "Pedro Almeida", avatar: "https://i.pravatar.cc/64?img=13", subject: "Nova base de leads", preview: "A importação terminou e encontrei 18 duplicados...", time: "12:05", unread: true, body: "A importação da nova base terminou. O sistema marcou 18 registros como possíveis duplicados. Separei a lista para revisão." },
  { id: "em3", from: "Renata Dias", avatar: "https://i.pravatar.cc/64?img=32", subject: "Reunião comercial", preview: "Confirmando nossa reunião para amanhã às 9h...", time: "Ontem", body: "Confirmando nossa reunião comercial para amanhã às 9h. Vou levar os números da semana e as propostas pendentes." },
  { id: "em4", from: "Marcos Lima", avatar: "https://i.pravatar.cc/64?img=51", subject: "Dúvida sobre cota", preview: "Pode validar a condição da cota CT-0571?", time: "Ontem", body: "Pode validar a condição da cota CT-0571? O cliente pediu uma atualização antes de seguir com a negociação." },
];

export const topClients = clients
  .slice()
  .sort((a,b) => b.totalCredit - a.totalCredit)
  .slice(0,5);

export const tabs = ["Top Vendedores", "Top Bancos", "Top Clientes", "Top Compras"] as const;
