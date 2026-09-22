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
  { label: "Pendências", icon: "CalendarDays", href: "/pendencias" },
  { label: "Financeiro", icon: "WalletCards", href: "/financeiro" },
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
  { month: "Jan", propostas: 178000, vendas: 112000 },
  { month: "Fev", propostas: 192000, vendas: 121000 },
  { month: "Mar", propostas: 235000, vendas: 150000 },
  { month: "Abr", propostas: 226000, vendas: 164000 },
  { month: "Mai", propostas: 248000, vendas: 171000 },
  { month: "Jun", propostas: 210000, vendas: 150000 },
  { month: "Jul", propostas: 280000, vendas: 170000 },
  { month: "Ago", propostas: 248500, vendas: 192300 },
  { month: "Set", propostas: 315000, vendas: 240000 },
  { month: "Out", propostas: 260000, vendas: 230000 },
  { month: "Nov", propostas: 310000, vendas: 250000 },
  { month: "Dez", propostas: 350000, vendas: 270000 },
];

export const topSellers: Seller[] = [
  { position: 1, name: "Pedro Almeida", avatar: "https://i.pravatar.cc/96?img=13", proposals: 68, sales: 24, value: "R$ 482.000", growth: "+18%", conversion: "35,3%", role: "Consultor Sênior", hierarchy: "Comercial · Nível 3", email: "pedro.almeida@mvcrm.com.br", phone: "(11) 98811-3400", joined: "12/03/2024", payDay: "05/10/2026", salary: 5200, paymentStatus: "Pendente" },
  { position: 2, name: "Juliana Souza", avatar: "https://i.pravatar.cc/96?img=47", proposals: 55, sales: 19, value: "R$ 356.000", growth: "+14%", conversion: "34,5%", role: "Supervisora Comercial", hierarchy: "Liderança · Nível 4", email: "juliana.souza@mvcrm.com.br", phone: "(11) 97721-2202", joined: "18/08/2023", payDay: "05/10/2026", salary: 6800, paymentStatus: "Pendente" },
  { position: 3, name: "Marcos Lima", avatar: "https://i.pravatar.cc/96?img=51", proposals: 48, sales: 16, value: "R$ 301.500", growth: "+12%", conversion: "33,3%", role: "Consultor Pleno", hierarchy: "Comercial · Nível 2", email: "marcos.lima@mvcrm.com.br", phone: "(11) 99102-8831", joined: "04/11/2024", payDay: "05/10/2026", salary: 4600, paymentStatus: "Pendente" },
  { position: 4, name: "Renata Dias", avatar: "https://i.pravatar.cc/96?img=32", proposals: 42, sales: 14, value: "R$ 265.000", growth: "+9%", conversion: "33,3%", role: "Consultora Pleno", hierarchy: "Comercial · Nível 2", email: "renata.dias@mvcrm.com.br", phone: "(11) 98541-7130", joined: "20/01/2025", payDay: "05/10/2026", salary: 4600, paymentStatus: "Pendente" },
  { position: 5, name: "Felipe Rocha", avatar: "https://i.pravatar.cc/96?img=14", proposals: 38, sales: 12, value: "R$ 224.000", growth: "+7%", conversion: "31,6%", role: "Consultor Júnior", hierarchy: "Comercial · Nível 1", email: "felipe.rocha@mvcrm.com.br", phone: "(11) 97610-4455", joined: "15/04/2025", payDay: "05/10/2026", salary: 3600, paymentStatus: "Pendente" },
  { position: 6, name: "Camila Nunes", avatar: "https://i.pravatar.cc/96?img=44", proposals: 32, sales: 10, value: "R$ 198.000", growth: "+6%", conversion: "31,2%", role: "Consultora Júnior", hierarchy: "Comercial · Nível 1", email: "camila.nunes@mvcrm.com.br", phone: "(11) 96744-1120", joined: "02/06/2025", payDay: "05/10/2026", salary: 3600, paymentStatus: "Pendente" },
];

export const banks: BankData[] = [
  { name: "Itaú Consórcios", proposals: 312, sales: 92, value: 1048000, conversion: 29.5, manager: "Marina Lopes", phone: "(11) 3003-3030", email: "relacionamento@itauconsorcios.com.br" },
  { name: "Bradesco Consórcios", proposals: 284, sales: 81, value: 896000, conversion: 28.5, manager: "Rafael Moraes", phone: "(11) 4002-0022", email: "parceiros@bradescoconsorcios.com.br" },
  { name: "Santander Consórcios", proposals: 238, sales: 68, value: 741000, conversion: 28.6, manager: "Amanda Torres", phone: "(11) 4004-3535", email: "comercial@santanderconsorcios.com.br" },
  { name: "Caixa Consórcios", proposals: 196, sales: 49, value: 532000, conversion: 25.0, manager: "Paulo Ribeiro", phone: "(11) 3004-1105", email: "rede@caixaconsorcios.com.br" },
  { name: "Magalu Consórcios", proposals: 142, sales: 35, value: 397000, conversion: 24.6, manager: "Débora Alves", phone: "(11) 3500-9000", email: "parceiros@magaluconsorcios.com.br" },
  { name: "Disal", proposals: 119, sales: 31, value: 338000, conversion: 26.1, manager: "Ricardo Vieira", phone: "(11) 3224-9800", email: "comercial@disal.com.br" },
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
  { id: "CL-2837", name: "André Ribeiro", cpf: "901.234.567-98", phone: "(11) 95224-7710", email: "andre.ribeiro@email.com", city: "Barueri/SP", source: "Instagram", owner: "Camila Nunes", status: "Não contatado", totalCredit: 70000 },
  { id: "CL-2836", name: "Luciana Mendes", cpf: "012.345.678-09", phone: "(11) 94711-2288", email: "luciana.mendes@email.com", city: "São Bernardo/SP", source: "Google Ads", owner: "Pedro Almeida", status: "Vendido", totalCredit: 210000 },
  { id: "CL-2835", name: "Rafael Costa", cpf: "112.345.678-90", phone: "(11) 93880-1190", email: "rafael.costa@email.com", city: "São Paulo/SP", source: "Indicação", owner: "Renata Dias", status: "Sem contato", totalCredit: 65000 },
  { id: "CL-2834", name: "Bruna Alves", cpf: "212.345.678-01", phone: "(11) 92910-4420", email: "bruna.alves@email.com", city: "Guarulhos/SP", source: "Site", owner: "Felipe Rocha", status: "Em negociação", totalCredit: 130000 },
];

export const proposals: Proposal[] = [
  { id: "4321", client: "João da Silva", bank: "Itaú", creditValue: "R$ 80.000", creditNumber: 80000, term: "60 meses", seller: "Pedro Almeida", status: "Em análise", date: "17/09/2026", dateIso: "2026-09-17" },
  { id: "4320", client: "Maria Oliveira", bank: "Bradesco", creditValue: "R$ 120.000", creditNumber: 120000, term: "80 meses", seller: "Juliana Souza", status: "Enviada", date: "17/09/2026", dateIso: "2026-09-17" },
  { id: "4319", client: "Carlos Santos", bank: "Santander", creditValue: "R$ 60.000", creditNumber: 60000, term: "70 meses", seller: "Marcos Lima", status: "Aprovada", date: "16/09/2026", dateIso: "2026-09-16" },
  { id: "4318", client: "Ana Costa", bank: "Caixa", creditValue: "R$ 100.000", creditNumber: 100000, term: "80 meses", seller: "Renata Dias", status: "Em preenchimento", date: "16/09/2026", dateIso: "2026-09-16" },
  { id: "4317", client: "Roberto Lima", bank: "Magalu", creditValue: "R$ 50.000", creditNumber: 50000, term: "60 meses", seller: "Felipe Rocha", status: "Enviada", date: "16/09/2026", dateIso: "2026-09-16" },
  { id: "4316", client: "Fernanda Rocha", bank: "Itaú", creditValue: "R$ 180.000", creditNumber: 180000, term: "84 meses", seller: "Pedro Almeida", status: "Aprovada", date: "15/09/2026", dateIso: "2026-09-15" },
  { id: "4315", client: "Gustavo Martins", bank: "Bradesco", creditValue: "R$ 90.000", creditNumber: 90000, term: "72 meses", seller: "Juliana Souza", status: "Recusada", date: "14/09/2026", dateIso: "2026-09-14" },
  { id: "4314", client: "Patrícia Souza", bank: "Santander", creditValue: "R$ 150.000", creditNumber: 150000, term: "90 meses", seller: "Marcos Lima", status: "Em análise", date: "13/09/2026", dateIso: "2026-09-13" },
  { id: "4313", client: "André Ribeiro", bank: "Disal", creditValue: "R$ 70.000", creditNumber: 70000, term: "72 meses", seller: "Camila Nunes", status: "Em preenchimento", date: "12/09/2026", dateIso: "2026-09-12" },
  { id: "4312", client: "Luciana Mendes", bank: "Itaú", creditValue: "R$ 210.000", creditNumber: 210000, term: "100 meses", seller: "Pedro Almeida", status: "Aprovada", date: "12/09/2026", dateIso: "2026-09-12" },
  { id: "4311", client: "Rafael Costa", bank: "Caixa", creditValue: "R$ 65.000", creditNumber: 65000, term: "60 meses", seller: "Renata Dias", status: "Enviada", date: "11/09/2026", dateIso: "2026-09-11" },
  { id: "4310", client: "Bruna Alves", bank: "Magalu", creditValue: "R$ 130.000", creditNumber: 130000, term: "84 meses", seller: "Felipe Rocha", status: "Em análise", date: "10/09/2026", dateIso: "2026-09-10" },
  { id: "4309", client: "João da Silva", bank: "Disal", creditValue: "R$ 95.000", creditNumber: 95000, term: "80 meses", seller: "Pedro Almeida", status: "Enviada", date: "09/09/2026", dateIso: "2026-09-09" },
  { id: "4308", client: "Maria Oliveira", bank: "Itaú", creditValue: "R$ 140.000", creditNumber: 140000, term: "90 meses", seller: "Juliana Souza", status: "Em preenchimento", date: "08/09/2026", dateIso: "2026-09-08" },
  { id: "4307", client: "Fernanda Rocha", bank: "Bradesco", creditValue: "R$ 160.000", creditNumber: 160000, term: "96 meses", seller: "Pedro Almeida", status: "Aprovada", date: "07/09/2026", dateIso: "2026-09-07" },
];

export const quotas: Quota[] = [
  { id: "CT-0569", group: "003091", quota: "0569-00", client: "João da Silva", bank: "Disal", credit: 38676.3, paidPercent: 48.0, installmentsPaid: 35, installmentsTotal: 80, status: "Ativa", seller: "Pedro Almeida", startDate: "08/09/2020" },
  { id: "CT-0570", group: "003208", quota: "0118-00", client: "Maria Oliveira", bank: "Itaú", credit: 120000, paidPercent: 54.2, installmentsPaid: 43, installmentsTotal: 80, status: "Contemplada", seller: "Juliana Souza", startDate: "19/02/2022" },
  { id: "CT-0571", group: "003412", quota: "0321-00", client: "Carlos Santos", bank: "Santander", credit: 60000, paidPercent: 21.5, installmentsPaid: 15, installmentsTotal: 70, status: "Ativa", seller: "Marcos Lima", startDate: "07/06/2024" },
  { id: "CT-0572", group: "004108", quota: "0204-00", client: "Ana Costa", bank: "Caixa", credit: 100000, paidPercent: 12.5, installmentsPaid: 10, installmentsTotal: 80, status: "Em atraso", seller: "Renata Dias", startDate: "11/11/2024" },
  { id: "CT-0573", group: "005912", quota: "0712-00", client: "Fernanda Rocha", bank: "Itaú", credit: 180000, paidPercent: 100, installmentsPaid: 84, installmentsTotal: 84, status: "Encerrada", seller: "Pedro Almeida", startDate: "03/08/2019" },
  { id: "CT-0574", group: "006101", quota: "0142-00", client: "Gustavo Martins", bank: "Bradesco", credit: 90000, paidPercent: 31.4, installmentsPaid: 22, installmentsTotal: 70, status: "Ativa", seller: "Juliana Souza", startDate: "17/01/2024" },
  { id: "CT-0575", group: "006278", quota: "0335-00", client: "Patrícia Souza", bank: "Santander", credit: 150000, paidPercent: 18.8, installmentsPaid: 15, installmentsTotal: 80, status: "Ativa", seller: "Marcos Lima", startDate: "22/03/2025" },
  { id: "CT-0576", group: "007010", quota: "0802-00", client: "André Ribeiro", bank: "Disal", credit: 70000, paidPercent: 9.7, installmentsPaid: 7, installmentsTotal: 72, status: "Ativa", seller: "Camila Nunes", startDate: "12/02/2026" },
  { id: "CT-0577", group: "007335", quota: "0441-00", client: "Luciana Mendes", bank: "Itaú", credit: 210000, paidPercent: 62.0, installmentsPaid: 62, installmentsTotal: 100, status: "Contemplada", seller: "Pedro Almeida", startDate: "30/09/2021" },
  { id: "CT-0578", group: "007882", quota: "0260-00", client: "Rafael Costa", bank: "Caixa", credit: 65000, paidPercent: 6.7, installmentsPaid: 4, installmentsTotal: 60, status: "Em atraso", seller: "Renata Dias", startDate: "05/05/2026" },
  { id: "CT-0579", group: "008111", quota: "0615-00", client: "Bruna Alves", bank: "Magalu", credit: 130000, paidPercent: 14.3, installmentsPaid: 12, installmentsTotal: 84, status: "Ativa", seller: "Felipe Rocha", startDate: "10/01/2026" },
];

export const purchases: Purchase[] = [
  { id: "CP-9012", client: "Fernanda Rocha", product: "Carta Automóvel", bank: "Itaú", value: 180000, seller: "Pedro Almeida", date: "17/09/2026", status: "Confirmada", payment: "PIX" },
  { id: "CP-9011", client: "Maria Oliveira", product: "Carta Imóvel", bank: "Bradesco", value: 120000, seller: "Juliana Souza", date: "16/09/2026", status: "Confirmada", payment: "Boleto" },
  { id: "CP-9010", client: "Carlos Santos", product: "Carta Automóvel", bank: "Santander", value: 60000, seller: "Marcos Lima", date: "16/09/2026", status: "Pendente", payment: "Boleto" },
  { id: "CP-9009", client: "Ana Costa", product: "Carta Serviços", bank: "Caixa", value: 100000, seller: "Renata Dias", date: "15/09/2026", status: "Pendente", payment: "PIX" },
  { id: "CP-9008", client: "Gustavo Martins", product: "Carta Automóvel", bank: "Bradesco", value: 90000, seller: "Juliana Souza", date: "14/09/2026", status: "Cancelada", payment: "Boleto" },
  { id: "CP-9007", client: "Luciana Mendes", product: "Carta Imóvel", bank: "Itaú", value: 210000, seller: "Pedro Almeida", date: "13/09/2026", status: "Confirmada", payment: "PIX" },
  { id: "CP-9006", client: "Patrícia Souza", product: "Carta Imóvel", bank: "Santander", value: 150000, seller: "Marcos Lima", date: "12/09/2026", status: "Confirmada", payment: "TED" },
  { id: "CP-9005", client: "Bruna Alves", product: "Carta Automóvel", bank: "Magalu", value: 130000, seller: "Felipe Rocha", date: "11/09/2026", status: "Pendente", payment: "PIX" },
];

export const serviceTickets: ServiceTicket[] = [
  { id: "AT-110", client: "Ana Costa", owner: "Renata Dias", phone: "(11) 98551-2102", stage: "Não contatado", note: "Lead recebido pelo site. Aguardando primeira abordagem." },
  { id: "AT-109", client: "Roberto Lima", owner: "Felipe Rocha", phone: "(11) 99182-3341", stage: "Não contatado", note: "Tentativa agendada para 14h." },
  { id: "AT-108", client: "João da Silva", owner: "Pedro Almeida", phone: "(11) 98821-4421", stage: "Em negociação", note: "Aguardando documentos para proposta." },
  { id: "AT-107", client: "Carlos Santos", owner: "Marcos Lima", phone: "(11) 99638-5502", stage: "Em negociação", note: "Cliente comparando condições entre bancos." },
  { id: "AT-106", client: "Maria Oliveira", owner: "Juliana Souza", phone: "(11) 97742-1190", stage: "Vendido", note: "Venda concluída. Follow-up pós-venda agendado." },
  { id: "AT-105", client: "Gustavo Martins", owner: "Juliana Souza", phone: "(11) 96345-8011", stage: "Recusou", note: "Sem interesse no momento. Recontato futuro permitido." },
  { id: "AT-104", client: "Patrícia Souza", owner: "Marcos Lima", phone: "(11) 95624-1100", stage: "Em negociação", note: "Solicitou nova simulação com prazo maior." },
  { id: "AT-103", client: "André Ribeiro", owner: "Camila Nunes", phone: "(11) 95224-7710", stage: "Não contatado", note: "Lead do Instagram aguardando contato." },
  { id: "AT-102", client: "Luciana Mendes", owner: "Pedro Almeida", phone: "(11) 94711-2288", stage: "Vendido", note: "Cliente com venda concluída e documentos arquivados." },
  { id: "AT-101", client: "Rafael Costa", owner: "Renata Dias", phone: "(11) 93880-1190", stage: "Não contatado", note: "Duas tentativas sem resposta." },
  { id: "AT-100", client: "Bruna Alves", owner: "Felipe Rocha", phone: "(11) 92910-4420", stage: "Em negociação", note: "Cliente pediu retorno após as 18h." },
  { id: "AT-099", client: "Fernanda Rocha", owner: "Pedro Almeida", phone: "(11) 97211-9022", stage: "Vendido", note: "Pagamento confirmado. Atendimento finalizado." },
];

export const messages: Message[] = [
  { id: "m1", name: "Juliana Souza", avatar: "https://i.pravatar.cc/96?img=47", time: "14:32", preview: "Consegue me enviar os materiais?", body: "Margareth, consegue me enviar os materiais atualizados da campanha? Quero revisar antes de repassar para o time comercial.", role: "Supervisora Comercial", hierarchy: "Liderança · Nível 4", unread: 2 },
  { id: "m2", name: "Marcos Lima", avatar: "https://i.pravatar.cc/96?img=51", time: "11:15", preview: "Qual a previsão da nova base?", body: "Qual a previsão da nova base de clientes? Tenho alguns atendimentos fechando hoje e consigo absorver novos contatos no fim da tarde.", role: "Consultor Pleno", hierarchy: "Comercial · Nível 2", unread: 1 },
  { id: "m3", name: "Renata Dias", avatar: "https://i.pravatar.cc/96?img=32", time: "10:48", preview: "Reunião confirmada para amanhã.", body: "Reunião confirmada para amanhã às 9h. Vou levar o acompanhamento das cotas pendentes e o retorno dos clientes de ontem.", role: "Consultora Pleno", hierarchy: "Comercial · Nível 2" },
  { id: "m4", name: "Pedro Almeida", avatar: "https://i.pravatar.cc/96?img=13", time: "Ontem", preview: "Planilha atualizada ✅", body: "Planilha atualizada. Fiz a limpeza dos duplicados e marquei os leads que precisam de contato prioritário.", role: "Consultor Sênior", hierarchy: "Comercial · Nível 3" },
  { id: "m5", name: "Equipe Comercial", avatar: "", time: "Ontem", preview: "@Todos nova campanha liberada.", body: "Nova campanha liberada para toda a equipe. Usem a observação da origem do lead no primeiro contato e registrem o retorno no CRM.", role: "Canal da Equipe", hierarchy: "Grupo interno", isGroup: true },
];

export const emailThreads: EmailThread[] = [
  { id: "em1", from: "Juliana Souza", avatar: "https://i.pravatar.cc/96?img=47", subject: "Documentos da proposta 4320", preview: "Margareth, revisei os documentos e deixei tudo pronto...", time: "14:32", unread: true, body: "Margareth, revisei os documentos da proposta 4320 e deixei tudo pronto para conferência. Assim que aprovar, faço o envio para a administradora.", role: "Supervisora Comercial", hierarchy: "Liderança · Nível 4" },
  { id: "em2", from: "Pedro Almeida", avatar: "https://i.pravatar.cc/96?img=13", subject: "Nova base de leads", preview: "A importação terminou e encontrei 18 duplicados...", time: "12:05", unread: true, body: "A importação da nova base terminou. O sistema marcou 18 registros como possíveis duplicados. Separei a lista para revisão.", role: "Consultor Sênior", hierarchy: "Comercial · Nível 3" },
  { id: "em3", from: "Renata Dias", avatar: "https://i.pravatar.cc/96?img=32", subject: "Reunião comercial", preview: "Confirmando nossa reunião para amanhã às 9h...", time: "Ontem", body: "Confirmando nossa reunião comercial para amanhã às 9h. Vou levar os números da semana e as propostas pendentes.", role: "Consultora Pleno", hierarchy: "Comercial · Nível 2" },
  { id: "em4", from: "Marcos Lima", avatar: "https://i.pravatar.cc/96?img=51", subject: "Dúvida sobre cota", preview: "Pode validar a condição da cota CT-0571?", time: "Ontem", body: "Pode validar a condição da cota CT-0571? O cliente pediu uma atualização antes de seguir com a negociação.", role: "Consultor Pleno", hierarchy: "Comercial · Nível 2" },
];

export const topClients = clients.slice().sort((a,b) => b.totalCredit - a.totalCredit).slice(0,5);
export const tabs = ["Top Vendedores", "Top Bancos", "Top Clientes", "Top Compras"] as const;
