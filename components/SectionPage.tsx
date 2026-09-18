"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip,
  XAxis, YAxis,
} from "recharts";
import {
  ArrowRight, Check, Download, FileSpreadsheet, Filter, Mail, MessageSquare,
  Phone, Plus, Search, Send, Settings, Upload, UserPlus, Users, X,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import ProposalsTable from "@/components/ProposalsTable";
import {
  banks, clients as initialClients, emailThreads, performanceData, purchases,
  quotas, serviceTickets, topSellers,
} from "@/lib/mock-data";
import { Client, EmailThread, ServiceTicket } from "@/lib/types";

const money = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div><h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1><p className="text-sm text-gray-500 mt-1">{subtitle}</p></div>
      {action}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[80] bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-5" onClick={(e)=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18}/></button></div>
        {children}
      </div>
    </div>
  );
}

function ClientsPage() {
  const [rows, setRows] = useState<Client[]>(initialClients);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Todos");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", email:"", city:"São Paulo/SP" });

  const filtered = useMemo(() => rows.filter((c) => {
    const q=query.toLowerCase();
    return (!q || [c.name,c.cpf,c.phone,c.email,c.owner].some((x)=>x.toLowerCase().includes(q))) && (status==="Todos" || c.status===status);
  }), [rows,query,status]);

  const add = () => {
    if (!form.name.trim()) return;
    setRows((old)=>[{ id:"CL-"+(2850+old.length), name:form.name, cpf:"000.000.000-00", phone:form.phone || "(11) 90000-0000", email:form.email || "novo@cliente.com", city:form.city, source:"Cadastro manual", owner:"Pedro Almeida", status:"Não contatado", totalCredit:0 }, ...old]);
    setForm({name:"",phone:"",email:"",city:"São Paulo/SP"}); setOpen(false);
  };

  return <>
    <PageHeader title="Clientes" subtitle="Carteira completa de leads e clientes, com responsável e status."
      action={<button onClick={()=>setOpen(true)} className="btn-primary"><UserPlus size={16}/>Novo Cliente</button>} />
    <div className="panel">
      <div className="toolbar">
        <div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar por nome, CPF, telefone, e-mail..."/></div>
        <select value={status} onChange={(e)=>setStatus(e.target.value)} className="field w-full sm:w-auto"><option>Todos</option>{["Não contatado","Em negociação","Vendido","Recusou","Sem contato"].map((x)=><option key={x}>{x}</option>)}</select>
        <button onClick={()=>downloadCsv("clientes-mv-crm.csv", [["ID","Nome","CPF","Telefone","E-mail","Cidade","Origem","Responsável","Status"],...filtered.map((c)=>[c.id,c.name,c.cpf,c.phone,c.email,c.city,c.source,c.owner,c.status])])} className="btn-secondary"><Download size={15}/>Exportar</button>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table min-w-[980px]"><thead><tr><th>Cliente</th><th>Contato</th><th>Cidade</th><th>Origem</th><th>Responsável</th><th>Status</th><th>Crédito</th></tr></thead>
          <tbody>{filtered.map((c)=><tr key={c.id}><td><b>{c.name}</b><small>{c.id} · {c.cpf}</small></td><td>{c.phone}<small>{c.email}</small></td><td>{c.city}</td><td>{c.source}</td><td>{c.owner}</td><td><span className="pill">{c.status}</span></td><td>{money(c.totalCredit)}</td></tr>)}</tbody></table>
      </div>
    </div>
    {open && <Modal title="Novo cliente" onClose={()=>setOpen(false)}>
      <div className="space-y-3"><input className="field w-full" placeholder="Nome completo" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/><input className="field w-full" placeholder="Telefone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})}/><input className="field w-full" placeholder="E-mail" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/><input className="field w-full" placeholder="Cidade/UF" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})}/><button onClick={add} className="btn-primary w-full justify-center">Cadastrar cliente</button></div>
    </Modal>}
  </>;
}

function QuotasPage() {
  const [query,setQuery]=useState(""); const [status,setStatus]=useState("Todos");
  const filtered=quotas.filter((q)=>(!query || [q.client,q.bank,q.group,q.quota].join(" ").toLowerCase().includes(query.toLowerCase())) && (status==="Todos"||q.status===status));
  return <>
    <PageHeader title="Cotas" subtitle="Acompanhe grupo, cota, crédito, parcelas e situação." action={<button onClick={()=>downloadCsv("cotas.csv",[["Grupo","Cota","Cliente","Banco","Crédito","Pago","Status"],...filtered.map((q)=>[q.group,q.quota,q.client,q.bank,q.credit,q.paidPercent+"%",q.status])])} className="btn-secondary"><Download size={15}/>Exportar</button>}/>
    <div className="panel"><div className="toolbar"><div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar cota, grupo, cliente ou banco..."/></div><select className="field w-full sm:w-auto" value={status} onChange={(e)=>setStatus(e.target.value)}><option>Todos</option>{["Ativa","Contemplada","Encerrada","Em atraso"].map((x)=><option key={x}>{x}</option>)}</select></div>
      <div className="overflow-x-auto"><table className="data-table min-w-[850px]"><thead><tr><th>Grupo / Cota</th><th>Cliente</th><th>Banco</th><th>Crédito</th><th>Parcelas</th><th>Progresso</th><th>Status</th></tr></thead><tbody>{filtered.map((q)=><tr key={q.id}><td><b>{q.group}</b><small>{q.quota}</small></td><td>{q.client}</td><td>{q.bank}</td><td>{money(q.credit)}</td><td>{q.installmentsPaid}/{q.installmentsTotal}</td><td><div className="w-32 bg-gray-100 h-2 rounded-full"><div className="h-2 bg-ink rounded-full" style={{width:`${Math.min(q.paidPercent,100)}%`}}/></div><small>{q.paidPercent.toFixed(1)}%</small></td><td><span className="pill">{q.status}</span></td></tr>)}</tbody></table></div>
    </div>
  </>;
}

function ServicePage() {
  const [tickets,setTickets]=useState<ServiceTicket[]>(serviceTickets);
  const stages: ServiceTicket["stage"][]=["Não contatado","Em negociação","Vendido","Recusou"];
  const move=(id:string,stage:ServiceTicket["stage"])=>setTickets((old)=>old.map((t)=>t.id===id?{...t,stage}:t));
  return <>
    <PageHeader title="Atendimentos" subtitle="Funil visual para impedir contato duplicado e acompanhar cada lead."/>
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">
      {stages.map((stage)=><div key={stage} className="bg-gray-100/70 border border-gray-200 rounded-2xl p-3 min-h-[420px]"><div className="flex items-center justify-between px-1 mb-3"><h3 className="font-semibold text-sm">{stage}</h3><span className="text-xs bg-white border border-gray-200 rounded-full px-2 py-1">{tickets.filter((t)=>t.stage===stage).length}</span></div>
        <div className="space-y-3">{tickets.filter((t)=>t.stage===stage).map((t)=><div key={t.id} className="bg-white rounded-xl border border-gray-100 shadow-card p-4"><div className="flex justify-between gap-2"><div><p className="font-semibold text-sm">{t.client}</p><p className="text-xs text-gray-400 mt-0.5">{t.id} · {t.owner}</p></div><Phone size={15} className="text-gray-400"/></div><p className="text-xs text-gray-500 mt-3">{t.note}</p><p className="text-xs mt-2">{t.phone}</p><select value={t.stage} onChange={(e)=>move(t.id,e.target.value as ServiceTicket["stage"])} className="field w-full mt-3 text-xs">{stages.map((s)=><option key={s}>{s}</option>)}</select></div>)}</div>
      </div>)}
    </div>
  </>;
}

function SellersPage() {
  const [query,setQuery]=useState(""); const [sort,setSort]=useState("Vendas");
  const rows=topSellers.filter((s)=>s.name.toLowerCase().includes(query.toLowerCase())).slice().sort((a,b)=>sort==="Vendas"?b.sales-a.sales:sort==="Propostas"?b.proposals-a.proposals:parseFloat(b.conversion)-parseFloat(a.conversion));
  return <>
    <PageHeader title="Vendedores" subtitle="Desempenho individual, propostas, vendas e conversão."/>
    <div className="toolbar panel"><div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar vendedor..."/></div><select className="field w-full sm:w-auto" value={sort} onChange={(e)=>setSort(e.target.value)}><option>Vendas</option><option>Propostas</option><option>Conversão</option></select></div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{rows.map((s)=><div key={s.name} className="panel"><div className="flex items-center gap-3"><img src={s.avatar} className="w-12 h-12 rounded-full object-cover" alt={s.name}/><div><h3 className="font-semibold">{s.name}</h3><p className="text-xs text-gray-400">Consultor comercial</p></div><span className="ml-auto text-xs text-positive font-semibold">{s.growth}</span></div><div className="grid grid-cols-3 gap-2 mt-5"><div className="metric"><b>{s.proposals}</b><span>Propostas</span></div><div className="metric"><b>{s.sales}</b><span>Vendas</span></div><div className="metric"><b>{s.conversion}</b><span>Conversão</span></div></div><p className="mt-4 text-sm"><span className="text-gray-400">Valor vendido</span><b className="float-right">{s.value}</b></p></div>)}</div>
  </>;
}

function BanksPage() {
  const [sort,setSort]=useState("Valor vendido");
  const rows=banks.slice().sort((a,b)=>sort==="Conversão"?b.conversion-a.conversion:sort==="Vendas"?b.sales-a.sales:b.value-a.value);
  return <>
    <PageHeader title="Bancos / Administradoras" subtitle="Compare volume, conversão e valor vendido por instituição."/>
    <div className="flex justify-end"><select className="field" value={sort} onChange={(e)=>setSort(e.target.value)}><option>Valor vendido</option><option>Vendas</option><option>Conversão</option></select></div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{rows.map((b,i)=><div className="panel" key={b.name}><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-xl bg-gray-100 grid place-items-center font-bold">{i+1}</div><div><h3 className="font-semibold">{b.name}</h3><p className="text-xs text-gray-400">{b.proposals} propostas</p></div></div><div className="grid grid-cols-2 gap-3 mt-5"><div className="metric"><b>{b.sales}</b><span>Vendas</span></div><div className="metric"><b>{b.conversion.toFixed(1)}%</b><span>Conversão</span></div></div><div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm"><span className="text-gray-400">Valor vendido</span><b>{money(b.value)}</b></div></div>)}</div>
  </>;
}

function PurchasesPage() {
  const [query,setQuery]=useState(""); const [status,setStatus]=useState("Todos");
  const rows=purchases.filter((p)=>(!query || [p.client,p.product,p.bank,p.seller].join(" ").toLowerCase().includes(query.toLowerCase()))&&(status==="Todos"||p.status===status));
  return <>
    <PageHeader title="Compras" subtitle="Histórico simulado de cartas e operações concluídas." action={<button onClick={()=>downloadCsv("compras.csv",[["ID","Cliente","Produto","Banco","Valor","Vendedor","Data","Status"],...rows.map((p)=>[p.id,p.client,p.product,p.bank,p.value,p.seller,p.date,p.status])])} className="btn-secondary"><Download size={15}/>Exportar</button>}/>
    <div className="panel"><div className="toolbar"><div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar compra..."/></div><select className="field w-full sm:w-auto" value={status} onChange={(e)=>setStatus(e.target.value)}><option>Todos</option><option>Confirmada</option><option>Pendente</option><option>Cancelada</option></select></div><div className="overflow-x-auto"><table className="data-table min-w-[820px]"><thead><tr><th>ID</th><th>Cliente</th><th>Produto</th><th>Banco</th><th>Valor</th><th>Vendedor</th><th>Data</th><th>Status</th></tr></thead><tbody>{rows.map((p)=><tr key={p.id}><td>{p.id}</td><td><b>{p.client}</b></td><td>{p.product}</td><td>{p.bank}</td><td>{money(p.value)}</td><td>{p.seller}</td><td>{p.date}</td><td><span className="pill">{p.status}</span></td></tr>)}</tbody></table></div></div>
  </>;
}

function MessagesPage() {
  const [threads,setThreads]=useState<EmailThread[]>(emailThreads);
  const [selected,setSelected]=useState<EmailThread>(emailThreads[0]);
  const [query,setQuery]=useState("");
  const [compose,setCompose]=useState(false);
  const [to,setTo]=useState("Equipe Comercial");
  const [subject,setSubject]=useState("");
  const [body,setBody]=useState("");
  const visible=threads.filter((t)=>[t.from,t.subject,t.preview].join(" ").toLowerCase().includes(query.toLowerCase()));
  const send=()=>{if(!subject.trim()||!body.trim())return;const item:EmailThread={id:"sent-"+Date.now(),from:"Você → "+to,avatar:"",subject,preview:body.slice(0,70),time:"Agora",body};setThreads((o)=>[item,...o]);setSelected(item);setCompose(false);setSubject("");setBody("")};
  return <>
    <PageHeader title="Mensagens internas" subtitle="Caixa de comunicação entre o proprietário, administração e funcionários." action={<button onClick={()=>setCompose(true)} className="btn-primary"><Plus size={16}/>Nova mensagem</button>}/>
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 min-h-[650px]">
      <div className="panel p-0 overflow-hidden"><div className="p-4 border-b border-gray-100"><div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar mensagens..."/></div></div><div className="max-h-[580px] overflow-y-auto">{visible.map((t)=><button key={t.id} onClick={()=>setSelected(t)} className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 ${selected.id===t.id?"bg-gray-50":""}`}><div className="flex justify-between gap-2"><b className="text-sm truncate">{t.from}</b><span className="text-[11px] text-gray-400 shrink-0">{t.time}</span></div><p className="text-xs font-medium mt-1 truncate">{t.subject}</p><p className="text-xs text-gray-400 mt-1 truncate">{t.preview}</p></button>)}</div></div>
      <div className="panel flex flex-col"><div className="pb-4 border-b border-gray-100"><p className="text-xs text-gray-400">De</p><h3 className="font-semibold mt-1">{selected.from}</h3><h2 className="text-xl font-bold mt-4">{selected.subject}</h2></div><div className="py-6 flex-1 text-sm text-gray-600 leading-7">{selected.body}</div><div className="pt-4 border-t border-gray-100 flex gap-2"><button onClick={()=>{setTo(selected.from.replace("Você → ",""));setSubject("Re: "+selected.subject);setCompose(true)}} className="btn-primary"><ArrowRight size={15}/>Responder</button></div></div>
    </div>
    {compose&&<Modal title="Nova mensagem interna" onClose={()=>setCompose(false)}><div className="space-y-3"><select className="field w-full" value={to} onChange={(e)=>setTo(e.target.value)}>{["Equipe Comercial","Pedro Almeida","Juliana Souza","Marcos Lima","Renata Dias","Felipe Rocha"].map((x)=><option key={x}>{x}</option>)}</select><input className="field w-full" placeholder="Assunto" value={subject} onChange={(e)=>setSubject(e.target.value)}/><textarea className="field w-full min-h-40 resize-none" placeholder="Escreva a mensagem..." value={body} onChange={(e)=>setBody(e.target.value)}/><button onClick={send} className="btn-primary w-full justify-center"><Send size={15}/>Enviar mensagem</button></div></Modal>}
  </>;
}

function ReportsPage() {
  const [view,setView]=useState("Mensal");
  const chartData = view === "Mensal" ? performanceData : [
    { month:"Jun-Jul", propostas: performanceData[0].propostas + performanceData[1].propostas, vendas: performanceData[0].vendas + performanceData[1].vendas },
    { month:"Ago-Out", propostas: performanceData[2].propostas + performanceData[3].propostas + performanceData[4].propostas, vendas: performanceData[2].vendas + performanceData[3].vendas + performanceData[4].vendas },
    { month:"Nov-Dez", propostas: performanceData[5].propostas + performanceData[6].propostas, vendas: performanceData[5].vendas + performanceData[6].vendas },
  ];
  return <>
    <PageHeader title="Relatórios" subtitle="Indicadores consolidados para o administrador." action={<button onClick={()=>downloadCsv("relatorio-performance.csv",[["Período","Propostas","Vendas"],...chartData.map((p)=>[p.month,p.propostas,p.vendas])])} className="btn-secondary"><Download size={15}/>Exportar CSV</button>}/>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[["Propostas","1.326"],["Vendas","298"],["Conversão","22,5%"],["Receita estimada","R$ 3,4 mi"]].map(([a,b])=><div className="panel" key={a}><p className="text-xs text-gray-400">{a}</p><p className="text-2xl font-bold mt-2">{b}</p></div>)}</div>
    <div className="panel"><div className="flex items-center justify-between mb-5 gap-3 flex-wrap"><div><h3 className="font-semibold">Propostas x Vendas</h3><p className="text-xs text-gray-400 mt-1">Dados demonstrativos · filtro {view.toLowerCase()}</p></div><select className="field" value={view} onChange={(e)=>setView(e.target.value)}><option>Mensal</option><option>Trimestral</option></select></div><div className="h-[300px] sm:h-[360px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid vertical={false} stroke="#f1f3f5"/><XAxis dataKey="month" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="propostas" fill="#111827" radius={[6,6,0,0]}/><Bar dataKey="vendas" fill="#94a3b8" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></div>
  </>;
}

function ImportPage() {
  const [file,setFile]=useState<File|null>(null); const [rows,setRows]=useState<string[][]>([]); const [done,setDone]=useState(false);
  const read=(f:File)=>{setFile(f);setDone(false);if(f.name.toLowerCase().endsWith(".csv")){const reader=new FileReader();reader.onload=()=>{const text=String(reader.result||"");setRows(text.split(/\r?\n/).filter(Boolean).slice(0,8).map((line)=>line.split(/[;,]/)));};reader.readAsText(f);}else{setRows([["Nome","Telefone","E-mail","Cidade"],["João Exemplo","11999990000","joao@exemplo.com","São Paulo"],["Maria Exemplo","11988880000","maria@exemplo.com","Guarulhos"]]);}};
  return <>
    <PageHeader title="Importar Planilha" subtitle="Carregue sua base e revise a prévia antes de distribuir aos atendentes."/>
    <div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.4fr] gap-4">
      <div className="panel"><label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 min-h-[280px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-400 transition-colors"><Upload size={32} className="text-gray-400"/><h3 className="font-semibold mt-4">Selecione sua planilha</h3><p className="text-xs text-gray-400 mt-2">CSV, XLS ou XLSX · modo demonstrativo sem backend</p><input type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={(e)=>e.target.files?.[0]&&read(e.target.files[0])}/><span className="btn-secondary mt-4">Escolher arquivo</span></label>{file&&<div className="mt-4 bg-gray-50 rounded-xl p-3 flex items-center gap-3"><FileSpreadsheet size={20}/><div className="min-w-0"><p className="text-sm font-medium truncate">{file.name}</p><p className="text-xs text-gray-400">{(file.size/1024).toFixed(1)} KB</p></div></div>}</div>
      <div className="panel"><div className="flex items-center justify-between mb-4"><div><h3 className="font-semibold">Prévia da importação</h3><p className="text-xs text-gray-400 mt-1">{rows.length?rows.length+" linha(s) em prévia":"Nenhum arquivo selecionado"}</p></div>{rows.length>0&&<button onClick={()=>setDone(true)} className="btn-primary"><Check size={15}/>Importar dados</button>}</div>{rows.length?<div className="overflow-x-auto"><table className="data-table min-w-[620px]"><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} className={i===0?"font-semibold":""}>{c}</td>)}</tr>)}</tbody></table></div>:<div className="h-64 grid place-items-center text-sm text-gray-400">A prévia aparecerá aqui.</div>}{done&&<div className="mt-4 rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-green-700">Importação simulada concluída. Registros prontos para distribuição.</div>}</div>
    </div>
  </>;
}

function SettingsPage() {
  const [settings,setSettings]=useState({company:"MV CRM Consórcios",email:"administracao@mvcrm.com.br",notify:true,darkAuto:false,duplicates:true});
  const [saved,setSaved]=useState(false);
  useEffect(()=>{try{const s=localStorage.getItem("mvcrm-settings");if(s)setSettings(JSON.parse(s));}catch{}},[]);
  const save=()=>{localStorage.setItem("mvcrm-settings",JSON.stringify(settings));setSaved(true);setTimeout(()=>setSaved(false),2000)};
  return <>
    <PageHeader title="Configurações" subtitle="Preferências locais deste protótipo front-end."/>
    <div className="panel max-w-3xl"><div className="space-y-5"><div><label className="label">Nome da empresa</label><input className="field w-full" value={settings.company} onChange={(e)=>setSettings({...settings,company:e.target.value})}/></div><div><label className="label">E-mail administrativo</label><input className="field w-full" value={settings.email} onChange={(e)=>setSettings({...settings,email:e.target.value})}/></div>{[["notify","Notificações no painel"],["duplicates","Avisar sobre clientes duplicados"],["darkAuto","Tema escuro automático"]].map(([key,label])=><label key={key} className="flex items-center justify-between border border-gray-100 rounded-xl p-4"><span className="text-sm font-medium">{label}</span><input type="checkbox" checked={Boolean(settings[key as keyof typeof settings])} onChange={(e)=>setSettings({...settings,[key]:e.target.checked})}/></label>)}<button onClick={save} className="btn-primary">Salvar configurações</button>{saved&&<span className="text-sm text-positive ml-3">Configurações salvas neste navegador.</span>}</div></div>
  </>;
}

function SupportPage() {
  return <>
    <PageHeader title="Ajuda & Suporte" subtitle="Canais de suporte e dúvidas frequentes."/>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"><div className="panel"><div className="w-12 h-12 rounded-xl bg-ink text-white grid place-items-center"><Phone size={20}/></div><h3 className="text-xl font-bold mt-4">WhatsApp do suporte</h3><p className="text-sm text-gray-500 mt-2">Fale diretamente com o suporte do MV CRM.</p><a href="https://wa.me/5511992779039" target="_blank" rel="noreferrer" className="btn-primary mt-5 inline-flex">(11) 99277-9039</a></div><div className="panel"><div className="w-12 h-12 rounded-xl bg-gray-100 grid place-items-center"><Mail size={20}/></div><h3 className="text-xl font-bold mt-4">Contato interno</h3><p className="text-sm text-gray-500 mt-2">Use a página Mensagens para falar com funcionários e administração sem sair do CRM.</p><a href="/mensagens" className="btn-secondary mt-5 inline-flex">Abrir mensagens</a></div></div>
    <div className="panel"><h3 className="font-semibold mb-4">Perguntas frequentes</h3>{["Como importar uma nova base?","Como alterar o status de um atendimento?","Como exportar propostas?","Como evitar contato duplicado?"].map((q)=><details key={q} className="border-t border-gray-100 py-4 first:border-t-0"><summary className="cursor-pointer font-medium text-sm">{q}</summary><p className="text-sm text-gray-500 mt-2">Nesta demonstração, todos os recursos funcionam localmente com dados simulados. Use os filtros, menus e ações disponíveis em cada página.</p></details>)}</div>
  </>;
}

export default function SectionPage({ section }: { section: string }) {
  let content: React.ReactNode;
  if (section === "clientes") content = <ClientsPage/>;
  else if (section === "propostas") content = <><PageHeader title="Propostas" subtitle="Consulte, filtre, personalize e exporte todas as propostas."/>
<ProposalsTable title="Todas as Propostas"/></>;
  else if (section === "cotas") content = <QuotasPage/>;
  else if (section === "atendimentos") content = <ServicePage/>;
  else if (section === "vendedores") content = <SellersPage/>;
  else if (section === "bancos") content = <BanksPage/>;
  else if (section === "compras") content = <PurchasesPage/>;
  else if (section === "mensagens") content = <MessagesPage/>;
  else if (section === "relatorios") content = <ReportsPage/>;
  else if (section === "importar-planilha") content = <ImportPage/>;
  else if (section === "configuracoes") content = <SettingsPage/>;
  else if (section === "suporte") content = <SupportPage/>;
  else content = <div className="panel"><h1 className="text-xl font-bold">Página não encontrada</h1><p className="text-sm text-gray-500 mt-2">Use o menu lateral para navegar pelo MV CRM.</p></div>;

  return <AppShell><main className="px-4 sm:px-6 lg:px-8 py-5 pb-10 space-y-5 max-w-[1800px] mx-auto">{content}</main></AppShell>;
}
