"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/AppShell";
import { topSellers } from "@/lib/mock-data";
import { Check, Download, Plus, Search, WalletCards, X } from "lucide-react";

type ExpenseStatus="Pago"|"Pendente"|"Vencido";
type Expense={id:string;description:string;category:string;value:number;date:string;status:ExpenseStatus};
type Revenue={id:string;description:string;value:number;date:string};

const initialExpenses:Expense[]=[
  {id:"DS-301",description:"Google Ads",category:"Marketing",value:4800,date:"18/09/2026",status:"Pago"},
  {id:"DS-302",description:"Meta Ads",category:"Marketing",value:3200,date:"20/09/2026",status:"Pendente"},
  {id:"DS-303",description:"Telefonia e WhatsApp",category:"Operacional",value:890,date:"10/09/2026",status:"Pago"},
  {id:"DS-304",description:"Coworking / escritório",category:"Estrutura",value:2600,date:"05/09/2026",status:"Pago"},
  {id:"DS-305",description:"Contabilidade",category:"Administrativo",value:1250,date:"15/09/2026",status:"Pago"},
  {id:"DS-306",description:"Licenças de software",category:"Tecnologia",value:1780,date:"25/09/2026",status:"Pendente"},
  {id:"DS-307",description:"Material comercial",category:"Comercial",value:740,date:"12/09/2026",status:"Pago"},
  {id:"DS-308",description:"Serviço terceirizado",category:"Operacional",value:2100,date:"30/09/2026",status:"Pendente"},
];
const revenues:Revenue[]=[
  {id:"RC-101",description:"Comissões recebidas - lote A",value:38200,date:"05/09/2026"},
  {id:"RC-102",description:"Comissões recebidas - lote B",value:29750,date:"12/09/2026"},
  {id:"RC-103",description:"Bonificação comercial",value:12500,date:"17/09/2026"},
];

const money=(n:number)=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:2});

const fileDate=()=>new Intl.DateTimeFormat("pt-BR").format(new Date()).replace(/\\//g,".");\n\nfunction exportPdf(expenses:Expense[],payrollTotal:number,revenueTotal:number){
  const total=expenses.reduce((a,b)=>a+b.value,0);
  const rows=expenses.map((e)=>`<tr><td>${e.id}</td><td>${e.description}</td><td>${e.category}</td><td>${e.date}</td><td>${e.status}</td><td style="text-align:right">${money(e.value)}</td></tr>`).join("");
  const popup=window.open("","_blank","width=1000,height=760");
  if(!popup)return;
  popup.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>relatorio_financeiro_${fileDate()}</title><style>body{font-family:Arial,sans-serif;color:#111;padding:32px}h1{font-size:24px;margin:0}p{color:#666}.cards{display:flex;gap:12px;margin:24px 0}.card{border:1px solid #ddd;border-radius:10px;padding:14px;flex:1}.card small{display:block;color:#777;margin-bottom:6px}.card b{font-size:18px}table{width:100%;border-collapse:collapse;margin-top:20px;font-size:12px}th,td{border-bottom:1px solid #ddd;padding:9px;text-align:left}th{background:#f4f4f4}@media print{button{display:none}}</style></head><body><h1>MV CRM · Relatório Financeiro</h1><p>Demonstrativo fictício · Setembro/2026</p><div class="cards"><div class="card"><small>Receitas</small><b>${money(revenueTotal)}</b></div><div class="card"><small>Despesas operacionais</small><b>${money(total)}</b></div><div class="card"><small>Folha</small><b>${money(payrollTotal)}</b></div><div class="card"><small>Saldo estimado</small><b>${money(revenueTotal-total-payrollTotal)}</b></div></div><h2>Despesas</h2><table><thead><tr><th>ID</th><th>Descrição</th><th>Categoria</th><th>Data</th><th>Status</th><th>Valor</th></tr></thead><tbody>${rows}</tbody></table><script>window.onload=()=>window.print()</script></body></html>`);
  popup.document.close();
}

export default function FinanceiroPage(){
  const [expenses,setExpenses]=useState<Expense[]>(initialExpenses);
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("Todas");
  const [status,setStatus]=useState("Todos");
  const [create,setCreate]=useState(false);
  const [form,setForm]=useState({description:"",category:"Operacional",value:"",date:"18/09/2026",status:"Pendente" as ExpenseStatus});

  const categories=Array.from(new Set(expenses.map((e)=>e.category))).sort();
  const filtered=useMemo(()=>expenses.filter((e)=>{
    const q=query.toLowerCase();
    return (!q||[e.description,e.category,e.id].join(" ").toLowerCase().includes(q)) &&
      (category==="Todas"||e.category===category) &&
      (status==="Todos"||e.status===status);
  }),[expenses,query,category,status]);

  const expenseTotal=expenses.reduce((a,b)=>a+b.value,0);
  const payrollTotal=topSellers.reduce((a,b)=>a+b.salary,0);
  const revenueTotal=revenues.reduce((a,b)=>a+b.value,0);
  const balance=revenueTotal-expenseTotal-payrollTotal;

  const addExpense=()=>{
    if(!form.description.trim()||!Number(form.value))return;
    setExpenses((old)=>[{id:"DS-"+(309+old.length),description:form.description,category:form.category,value:Number(form.value),date:form.date,status:form.status},...old]);
    setCreate(false);
    setForm({description:"",category:"Operacional",value:"",date:"18/09/2026",status:"Pendente"});
  };

  const setExpenseStatus=(id:string,next:ExpenseStatus)=>setExpenses((old)=>old.map((e)=>e.id===id?{...e,status:next}:e));

  return <AppShell>
    <main className="px-4 sm:px-6 lg:px-8 py-5 pb-10 space-y-5 max-w-[1800px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-sm text-gray-500 mt-1">Receitas, despesas, folha de pagamento e saldo estimado em um único fluxo.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={()=>exportPdf(filtered,payrollTotal,revenueTotal)} className="btn-secondary"><Download size={15}/>Exportar PDF</button>
          <button onClick={()=>setCreate(true)} className="btn-primary"><Plus size={15}/>Nova despesa</button>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="panel"><p className="text-xs text-gray-400">Receitas</p><p className="text-xl sm:text-2xl font-bold mt-2">{money(revenueTotal)}</p><p className="text-xs text-green-600 mt-2">Entradas simuladas do mês</p></div>
        <div className="panel"><p className="text-xs text-gray-400">Despesas</p><p className="text-xl sm:text-2xl font-bold mt-2">{money(expenseTotal)}</p><p className="text-xs text-gray-500 mt-2">{expenses.filter((e)=>e.status!=="Pago").length} pendente(s)</p></div>
        <div className="panel"><p className="text-xs text-gray-400">Folha de pagamento</p><p className="text-xl sm:text-2xl font-bold mt-2">{money(payrollTotal)}</p><p className="text-xs text-gray-500 mt-2">Próximo pagamento: 05/10/2026</p></div>
        <div className="panel bg-ink text-white"><p className="text-xs text-gray-300">Saldo estimado</p><p className="text-xl sm:text-2xl font-bold mt-2">{money(balance)}</p><p className="text-xs text-gray-300 mt-2">Receitas - despesas - folha</p></div>
      </div>

      <section className="panel">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
          <div><h2 className="font-semibold">Despesas</h2><p className="text-xs text-gray-400 mt-1">Filtre, altere status e exporte o relatório.</p></div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="searchbox min-w-[260px]"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar despesa..."/></div>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="field"><option>Todas</option>{categories.map((x)=><option key={x}>{x}</option>)}</select>
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className="field"><option>Todos</option><option>Pago</option><option>Pendente</option><option>Vencido</option></select>
          </div>
        </div>
        <div className="overflow-x-auto"><table className="data-table min-w-[850px]"><thead><tr><th>ID</th><th>Descrição</th><th>Categoria</th><th>Data</th><th>Status</th><th>Valor</th></tr></thead><tbody>{filtered.map((e)=><tr key={e.id}><td>{e.id}</td><td><b>{e.description}</b></td><td>{e.category}</td><td>{e.date}</td><td><select value={e.status} onChange={(ev)=>setExpenseStatus(e.id,ev.target.value as ExpenseStatus)} className="field py-1.5 text-xs"><option>Pago</option><option>Pendente</option><option>Vencido</option></select></td><td><b>{money(e.value)}</b></td></tr>)}</tbody></table></div>
      </section>

      <section className="panel">
        <div className="mb-4"><h2 className="font-semibold">Pagamentos dos funcionários</h2><p className="text-xs text-gray-400 mt-1">Visão administrativa da folha e da próxima data de pagamento.</p></div>
        <div className="overflow-x-auto"><table className="data-table min-w-[900px]"><thead><tr><th>Funcionário</th><th>Cargo</th><th>Hierarquia</th><th>Data de pagamento</th><th>Valor</th><th>Status</th></tr></thead><tbody>{topSellers.map((s)=><tr key={s.name}><td><div className="flex items-center gap-3"><img src={s.avatar} loading="lazy" className="w-9 h-9 rounded-full object-cover" alt={s.name}/><b>{s.name}</b></div></td><td>{s.role}</td><td>{s.hierarchy}</td><td>{s.payDay}</td><td><b>{money(s.salary)}</b></td><td><span className="pill">{s.paymentStatus}</span></td></tr>)}</tbody></table></div>
      </section>

      <section className="panel">
        <h2 className="font-semibold">Receitas simuladas</h2>
        <div className="overflow-x-auto mt-3"><table className="data-table min-w-[650px]"><thead><tr><th>ID</th><th>Descrição</th><th>Data</th><th>Valor</th></tr></thead><tbody>{revenues.map((r)=><tr key={r.id}><td>{r.id}</td><td><b>{r.description}</b></td><td>{r.date}</td><td><b>{money(r.value)}</b></td></tr>)}</tbody></table></div>
      </section>

      {create&&<div className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4" onClick={()=>setCreate(false)}><div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-5" onClick={(e)=>e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold">Nova despesa</h3><button onClick={()=>setCreate(false)} className="icon-btn"><X size={16}/></button></div><div className="space-y-3"><input className="field w-full" placeholder="Descrição" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})}/><select className="field w-full" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}>{["Operacional","Marketing","Estrutura","Administrativo","Tecnologia","Comercial"].map((x)=><option key={x}>{x}</option>)}</select><input type="number" className="field w-full" placeholder="Valor" value={form.value} onChange={(e)=>setForm({...form,value:e.target.value})}/><input className="field w-full" placeholder="Data DD/MM/AAAA" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})}/><select className="field w-full" value={form.status} onChange={(e)=>setForm({...form,status:e.target.value as ExpenseStatus})}><option>Pago</option><option>Pendente</option><option>Vencido</option></select><button onClick={addExpense} className="btn-primary w-full justify-center"><Check size={15}/>Adicionar despesa</button></div></div></div>}
    </main>
  </AppShell>;
}
