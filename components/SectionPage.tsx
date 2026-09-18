"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown, ArrowUp, ArrowUpDown, Check, ChevronRight, Download, Edit3,
  FileSpreadsheet, Mail, MessageSquare, MoreHorizontal, Phone, Plus, Search,
  Send, Upload, UserPlus, X
} from "lucide-react";
import AppShell from "@/components/AppShell";
import ProposalsTable from "@/components/ProposalsTable";
import {
  banks, clients as initialClients, emailThreads, messages, performanceData,
  proposals, purchases, quotas as initialQuotas, serviceTickets, topSellers,
} from "@/lib/mock-data";
import { BankData, Client, EmailThread, Purchase, Quota, Seller, ServiceTicket } from "@/lib/types";

const ReportsCharts=dynamic(()=>import("@/components/ReportsCharts"),{ssr:false,loading:()=> <div className="panel h-[360px] animate-pulse bg-white"/>});
const money=(n:number)=>n.toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});

function downloadCsv(filename:string,rows:(string|number)[][]){
  const csv=rows.map((r)=>r.map((v)=>`"${String(v).replace(/"/g,'""')}"`).join(";")).join("\n");
  const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}
function PageHeader({title,subtitle,action}:{title:string;subtitle:string;action?:React.ReactNode}){
  return <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1><p className="text-sm text-gray-500 mt-1">{subtitle}</p></div>{action}</div>;
}
function Modal({title,onClose,children,max="max-w-2xl"}:{title:string;onClose:()=>void;children:React.ReactNode;max?:string}){
  return <div className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4" onClick={onClose}><div className={`w-full ${max} max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-5`} onClick={(e)=>e.stopPropagation()}><div className="flex items-center justify-between mb-4"><h3 className="text-lg font-bold">{title}</h3><button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100"><X size={18}/></button></div>{children}</div></div>;
}
function SortIcon({active,dir}:{active:boolean;dir:"asc"|"desc"}){
  if(!active)return <ArrowUpDown size={12}/>;
  return dir==="asc"?<ArrowUp size={12}/>:<ArrowDown size={12}/>;
}

function ClientsPage(){
  const [rows,setRows]=useState<Client[]>(initialClients);
  const [query,setQuery]=useState(""); const [status,setStatus]=useState("Todos");
  const [open,setOpen]=useState(false); const [selected,setSelected]=useState<Client|null>(null);
  const [sortKey,setSortKey]=useState<keyof Client>("name"); const [sortDir,setSortDir]=useState<"asc"|"desc">("asc");
  const [exportOpen,setExportOpen]=useState(false); const [exportIds,setExportIds]=useState<Set<string>>(new Set());
  const [exportFields,setExportFields]=useState<Record<string,boolean>>({id:true,name:true,cpf:true,phone:true,email:true,city:true,source:true,owner:true,status:true,totalCredit:true});
  const [form,setForm]=useState({name:"",phone:"",email:"",city:"São Paulo/SP"});

  const filtered=useMemo(()=>{
    const q=query.toLowerCase();
    const out=rows.filter((c)=>(!q||[c.name,c.cpf,c.phone,c.email,c.city,c.source,c.owner,c.status].some((x)=>String(x).toLowerCase().includes(q)))&&(status==="Todos"||c.status===status));
    return out.slice().sort((a,b)=>{
      const av=String(a[sortKey]??"").toLowerCase();const bv=String(b[sortKey]??"").toLowerCase();
      const cmp=typeof a[sortKey]==="number"?Number(a[sortKey])-Number(b[sortKey]):av.localeCompare(bv,"pt-BR");
      return sortDir==="asc"?cmp:-cmp;
    });
  },[rows,query,status,sortKey,sortDir]);

  const sort=(key:keyof Client)=>{if(sortKey===key)setSortDir((d)=>d==="asc"?"desc":"asc");else{setSortKey(key);setSortDir("asc")}};
  const add=()=>{if(!form.name.trim())return;setRows((old)=>[{id:"CL-"+(2850+old.length),name:form.name,cpf:"000.000.000-00",phone:form.phone||"(11) 90000-0000",email:form.email||"novo@cliente.com",city:form.city,source:"Cadastro manual",owner:"Pedro Almeida",status:"Não contatado",totalCredit:0},...old]);setForm({name:"",phone:"",email:"",city:"São Paulo/SP"});setOpen(false)};
  const openExport=()=>{setExportIds(new Set(filtered.map((c)=>c.id)));setExportOpen(true)};
  const doExport=()=>{
    const defs:[keyof Client,string][]=[["id","ID"],["name","Nome"],["cpf","CPF"],["phone","Telefone"],["email","E-mail"],["city","Cidade"],["source","Origem"],["owner","Responsável"],["status","Status"],["totalCredit","Crédito"]];
    const chosen=defs.filter(([k])=>exportFields[k]);
    const selectedRows=filtered.filter((c)=>exportIds.has(c.id));
    downloadCsv("clientes-mv-crm.csv",[chosen.map(([,label])=>label),...selectedRows.map((c)=>chosen.map(([k])=>k==="totalCredit"?money(Number(c[k])):String(c[k])))]);
    setExportOpen(false);
  };
  const phoneDigits=(p:string)=>p.replace(/\D/g,"");

  return <>
    <PageHeader title="Clientes" subtitle="Carteira completa com ordenação, contato rápido, filtros e exportação personalizada." action={<button onClick={()=>setOpen(true)} className="btn-primary"><UserPlus size={16}/>Novo Cliente</button>}/>
    <div className="panel">
      <div className="toolbar mb-4"><div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar por nome, CPF, contato, cidade..."/></div><select value={status} onChange={(e)=>setStatus(e.target.value)} className="field w-full sm:w-auto"><option>Todos</option>{["Não contatado","Em negociação","Vendido","Recusou","Sem contato"].map((x)=><option key={x}>{x}</option>)}</select><button onClick={openExport} className="btn-secondary"><Download size={15}/>Exportar</button></div>
      <div className="overflow-x-auto">
        <table className="data-table min-w-[1080px]"><thead><tr>
          {([["name","Cliente"],["phone","Contato"],["city","Cidade"],["source","Origem"],["owner","Responsável"],["status","Status"],["totalCredit","Crédito"]] as [keyof Client,string][]).map(([key,label])=><th key={String(key)}><button onClick={()=>sort(key)} className="inline-flex items-center gap-1 hover:text-gray-700">{label}<SortIcon active={sortKey===key} dir={sortDir}/></button></th>)}
          <th>Ações</th>
        </tr></thead><tbody>{filtered.map((c)=><tr key={c.id} onClick={()=>setSelected(c)} className="cursor-pointer">
          <td><b>{c.name}</b><small>{c.id} · {c.cpf}</small></td>
          <td><div className="flex items-center gap-2"><span>{c.phone}</span><a onClick={(e)=>e.stopPropagation()} href={`tel:${phoneDigits(c.phone)}`} className="icon-btn" title="Ligar"><Phone size={14}/></a><a onClick={(e)=>e.stopPropagation()} href={`https://wa.me/55${phoneDigits(c.phone)}`} target="_blank" rel="noreferrer" className="icon-btn text-green-600" title="WhatsApp"><MessageSquare size={14}/></a><a onClick={(e)=>e.stopPropagation()} href={`mailto:${c.email}`} className="icon-btn" title="E-mail"><Mail size={14}/></a></div><small>{c.email}</small></td>
          <td>{c.city}</td><td>{c.source}</td><td>{c.owner}</td><td><button onClick={(e)=>{e.stopPropagation();setSelected(c)}} className="pill">{c.status}</button></td><td>{money(c.totalCredit)}</td><td><ChevronRight size={16} className="text-gray-300"/></td>
        </tr>)}</tbody></table>
      </div>
    </div>

    {selected&&<Modal title={selected.name} onClose={()=>setSelected(null)}><div className="grid sm:grid-cols-2 gap-3 text-sm"><div className="metric"><b>{selected.id}</b><span>ID do cliente</span></div><div className="metric"><b>{selected.status}</b><span>Status</span></div><div className="panel p-3"><p className="text-xs text-gray-400">CPF</p><b>{selected.cpf}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Cidade</p><b>{selected.city}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Origem</p><b>{selected.source}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Responsável</p><b>{selected.owner}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Crédito total</p><b>{money(selected.totalCredit)}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">E-mail</p><b className="break-all">{selected.email}</b></div></div><div className="grid grid-cols-3 gap-2 mt-4"><a href={`tel:${phoneDigits(selected.phone)}`} className="btn-secondary justify-center"><Phone size={15}/>Ligar</a><a href={`https://wa.me/55${phoneDigits(selected.phone)}`} target="_blank" rel="noreferrer" className="btn-secondary justify-center"><MessageSquare size={15}/>WhatsApp</a><a href={`mailto:${selected.email}`} className="btn-secondary justify-center"><Mail size={15}/>E-mail</a></div></Modal>}

    {open&&<Modal title="Novo cliente" onClose={()=>setOpen(false)} max="max-w-lg"><div className="space-y-3"><input className="field w-full" placeholder="Nome completo" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/><input className="field w-full" placeholder="Telefone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})}/><input className="field w-full" placeholder="E-mail" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/><input className="field w-full" placeholder="Cidade/UF" value={form.city} onChange={(e)=>setForm({...form,city:e.target.value})}/><button onClick={add} className="btn-primary w-full justify-center">Cadastrar cliente</button></div></Modal>}

    {exportOpen&&<Modal title="Exportar clientes" onClose={()=>setExportOpen(false)}><div className="space-y-5"><div><div className="flex items-center justify-between mb-2"><p className="text-sm font-semibold">1. Selecione os clientes</p><button onClick={()=>setExportIds(exportIds.size===filtered.length?new Set():new Set(filtered.map((c)=>c.id)))} className="text-xs underline">{exportIds.size===filtered.length?"Desmarcar todos":"Selecionar todos"}</button></div><div className="max-h-52 overflow-y-auto border border-gray-100 rounded-xl divide-y">{filtered.map((c)=><label key={c.id} className="flex items-center gap-3 px-3 py-2.5 text-sm"><input type="checkbox" checked={exportIds.has(c.id)} onChange={(e)=>setExportIds((old)=>{const n=new Set(old);e.target.checked?n.add(c.id):n.delete(c.id);return n})}/><span className="flex-1">{c.name}</span><span className="text-xs text-gray-400">{c.id}</span></label>)}</div></div><div><p className="text-sm font-semibold mb-2">2. Dados que serão exportados</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-2">{Object.entries({id:"ID",name:"Nome",cpf:"CPF",phone:"Telefone",email:"E-mail",city:"Cidade",source:"Origem",owner:"Responsável",status:"Status",totalCredit:"Crédito"}).map(([k,label])=><label key={k} className="flex items-center gap-2 text-xs border border-gray-100 rounded-lg p-2"><input type="checkbox" checked={exportFields[k]} onChange={(e)=>setExportFields((old)=>({...old,[k]:e.target.checked}))}/>{label}</label>)}</div></div><button disabled={!exportIds.size||!Object.values(exportFields).some(Boolean)} onClick={doExport} className="btn-primary w-full justify-center"><Download size={15}/>Exportar seleção ({exportIds.size})</button></div></Modal>}
  </>;
}

function QuotasPage(){
  const [rows,setRows]=useState<Quota[]>(initialQuotas);
  const [query,setQuery]=useState("");
  const [status,setStatus]=useState("Todos");
  const [edit,setEdit]=useState<Quota|null>(null);
  const [selected,setSelected]=useState<Quota|null>(null);
  const [sortKey,setSortKey]=useState<keyof Quota>("group");
  const [sortDir,setSortDir]=useState<"asc"|"desc">("asc");

  const sort=(key:keyof Quota)=>{
    if(sortKey===key) setSortDir((d)=>d==="asc"?"desc":"asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered=useMemo(()=>{
    const out=rows.filter((q)=>
      (!query||[q.client,q.bank,q.group,q.quota,q.seller,q.status].join(" ").toLowerCase().includes(query.toLowerCase())) &&
      (status==="Todos"||q.status===status)
    );
    return out.slice().sort((a,b)=>{
      const av=a[sortKey];
      const bv=b[sortKey];
      let cmp=0;
      if(typeof av==="number" && typeof bv==="number") cmp=av-bv;
      else cmp=String(av??"").localeCompare(String(bv??""),"pt-BR",{numeric:true,sensitivity:"base"});
      return sortDir==="asc"?cmp:-cmp;
    });
  },[rows,query,status,sortKey,sortDir]);

  const save=()=>{
    if(!edit)return;
    setRows((old)=>old.map((q)=>q.id===edit.id?edit:q));
    setSelected((old)=>old?.id===edit.id?edit:old);
    setEdit(null);
  };

  const th=(key:keyof Quota,label:string)=>(
    <th>
      <button onClick={()=>sort(key)} className="inline-flex items-center gap-1 hover:text-gray-700">
        {label}<SortIcon active={sortKey===key} dir={sortDir}/>
      </button>
    </th>
  );

  return <>
    <PageHeader title="Cotas" subtitle="Clique nos títulos das colunas para ordenar e em qualquer cota para visualizar todos os dados." action={<button onClick={()=>downloadCsv("cotas.csv",[["Grupo","Cota","Cliente","Banco","Crédito","Parcelas pagas","Total parcelas","Pago","Status","Vendedor"],...filtered.map((q)=>[q.group,q.quota,q.client,q.bank,q.credit,q.installmentsPaid,q.installmentsTotal,q.paidPercent+"%",q.status,q.seller])])} className="btn-secondary"><Download size={15}/>Exportar</button>}/>
    <div className="panel">
      <div className="toolbar mb-4">
        <div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar cota, grupo, cliente, banco ou vendedor..."/></div>
        <select className="field w-full sm:w-auto" value={status} onChange={(e)=>setStatus(e.target.value)}><option>Todos</option>{["Ativa","Contemplada","Encerrada","Em atraso"].map((x)=><option key={x}>{x}</option>)}</select>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table min-w-[1180px]">
          <thead><tr>
            {th("group","Grupo")}
            {th("quota","Cota")}
            {th("client","Cliente")}
            {th("bank","Banco")}
            {th("credit","Crédito")}
            {th("installmentsPaid","Parcelas")}
            {th("paidPercent","Progresso")}
            {th("seller","Vendedor")}
            {th("status","Status")}
            <th>Ações</th>
          </tr></thead>
          <tbody>{filtered.map((q)=><tr key={q.id} onClick={()=>setSelected(q)} className="cursor-pointer">
            <td><button onClick={(e)=>{e.stopPropagation();setSelected(q)}} className="text-left hover:underline underline-offset-4"><b>{q.group}</b><small>{q.id}</small></button></td>
            <td><button onClick={(e)=>{e.stopPropagation();setSelected(q)}} className="text-left hover:underline underline-offset-4"><b>{q.quota}</b><small>início {q.startDate}</small></button></td>
            <td><button onClick={(e)=>{e.stopPropagation();setSelected(q)}} className="text-left hover:underline underline-offset-4">{q.client}</button></td>
            <td>{q.bank}</td>
            <td>{money(q.credit)}</td>
            <td>{q.installmentsPaid}/{q.installmentsTotal}</td>
            <td><div className="w-32 bg-gray-100 h-2 rounded-full"><div className="h-2 bg-ink rounded-full" style={{width:`${Math.min(q.paidPercent,100)}%`}}/></div><small>{q.paidPercent.toFixed(1)}%</small></td>
            <td>{q.seller}</td>
            <td><span className="pill">{q.status}</span></td>
            <td><button onClick={(e)=>{e.stopPropagation();setEdit({...q})}} className="btn-secondary py-1.5 px-2.5"><Edit3 size={13}/>Editar</button></td>
          </tr>)}</tbody>
        </table>
      </div>
      {!filtered.length&&<div className="py-10 text-center text-sm text-gray-400">Nenhuma cota encontrada.</div>}
    </div>

    {selected&&<Modal title={`Cota ${selected.quota}`} onClose={()=>setSelected(null)}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <div className="metric"><b>{selected.group}</b><span>Grupo</span></div>
        <div className="metric"><b>{selected.quota}</b><span>Número da cota</span></div>
        <div className="metric"><b>{selected.status}</b><span>Status</span></div>
        <div className="panel p-3"><p className="text-xs text-gray-400">Cliente</p><b>{selected.client}</b></div>
        <div className="panel p-3"><p className="text-xs text-gray-400">Banco / Administradora</p><b>{selected.bank}</b></div>
        <div className="panel p-3"><p className="text-xs text-gray-400">Crédito</p><b>{money(selected.credit)}</b></div>
        <div className="panel p-3"><p className="text-xs text-gray-400">Parcelas pagas</p><b>{selected.installmentsPaid} de {selected.installmentsTotal}</b></div>
        <div className="panel p-3"><p className="text-xs text-gray-400">Progresso</p><b>{selected.paidPercent.toFixed(1)}%</b></div>
        <div className="panel p-3"><p className="text-xs text-gray-400">Início</p><b>{selected.startDate}</b></div>
        <div className="panel p-3 md:col-span-2"><p className="text-xs text-gray-400">Responsável / vendedor</p><b>{selected.seller}</b></div>
        <div className="panel p-3"><p className="text-xs text-gray-400">Registro</p><b>{selected.id}</b></div>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs mb-2"><span className="text-gray-500">Andamento das parcelas</span><b>{selected.paidPercent.toFixed(1)}%</b></div>
        <div className="w-full bg-gray-100 h-3 rounded-full"><div className="h-3 bg-ink rounded-full" style={{width:`${Math.min(selected.paidPercent,100)}%`}}/></div>
      </div>
      <button onClick={()=>{setEdit({...selected});setSelected(null)}} className="btn-primary mt-5"><Edit3 size={15}/>Editar esta cota</button>
    </Modal>}

    {edit&&<Modal title={`Editar cota ${edit.quota}`} onClose={()=>setEdit(null)} max="max-w-lg">
      <div className="space-y-3">
        <div><label className="label">Grupo</label><input className="field w-full" value={edit.group} onChange={(e)=>setEdit({...edit,group:e.target.value})}/></div>
        <div><label className="label">Número da cota</label><input className="field w-full" value={edit.quota} onChange={(e)=>setEdit({...edit,quota:e.target.value})}/></div>
        <div><label className="label">Status</label><select className="field w-full" value={edit.status} onChange={(e)=>setEdit({...edit,status:e.target.value as Quota["status"]})}>{["Ativa","Contemplada","Encerrada","Em atraso"].map((x)=><option key={x}>{x}</option>)}</select></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="label">Parcelas pagas</label><input type="number" className="field w-full" value={edit.installmentsPaid} onChange={(e)=>setEdit({...edit,installmentsPaid:Number(e.target.value),paidPercent:Math.min(100,Number(e.target.value)/Math.max(edit.installmentsTotal,1)*100)})}/></div><div><label className="label">Total parcelas</label><input type="number" className="field w-full" value={edit.installmentsTotal} onChange={(e)=>setEdit({...edit,installmentsTotal:Number(e.target.value),paidPercent:Math.min(100,edit.installmentsPaid/Math.max(Number(e.target.value),1)*100)})}/></div></div>
        <div><label className="label">Valor do crédito</label><input type="number" className="field w-full" value={edit.credit} onChange={(e)=>setEdit({...edit,credit:Number(e.target.value)})}/></div>
        <button onClick={save} className="btn-primary w-full justify-center">Salvar alterações</button>
      </div>
    </Modal>}
  </>;
}

function ServicePage(){
  const [tickets,setTickets]=useState<ServiceTicket[]>(serviceTickets); const stages:ServiceTicket["stage"][]=["Não contatado","Em negociação","Vendido","Recusou"];
  const move=(id:string,stage:ServiceTicket["stage"])=>setTickets((old)=>old.map((t)=>t.id===id?{...t,stage}:t));
  return <><PageHeader title="Atendimentos" subtitle="Funil visual para impedir contato duplicado e acompanhar cada lead."/><div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4">{stages.map((stage)=><div key={stage} className="bg-gray-100/70 border border-gray-200 rounded-2xl p-3 min-h-[420px]"><div className="flex items-center justify-between px-1 mb-3"><h3 className="font-semibold text-sm">{stage}</h3><span className="text-xs bg-white border border-gray-200 rounded-full px-2 py-1">{tickets.filter((t)=>t.stage===stage).length}</span></div><div className="space-y-3">{tickets.filter((t)=>t.stage===stage).map((t)=><div key={t.id} className="bg-white rounded-xl border border-gray-100 shadow-card p-4"><div className="flex justify-between gap-2"><div><p className="font-semibold text-sm">{t.client}</p><p className="text-xs text-gray-400 mt-0.5">{t.id} · {t.owner}</p></div><a href={`tel:${t.phone.replace(/\D/g,"")}`}><Phone size={15} className="text-gray-400"/></a></div><p className="text-xs text-gray-500 mt-3">{t.note}</p><p className="text-xs mt-2">{t.phone}</p><select value={t.stage} onChange={(e)=>move(t.id,e.target.value as ServiceTicket["stage"])} className="field w-full mt-3 text-xs">{stages.map((s)=><option key={s}>{s}</option>)}</select></div>)}</div></div>)}</div></>;
}

function SellersPage(){
  const [query,setQuery]=useState(""); const [sort,setSort]=useState("Vendas"); const [selected,setSelected]=useState<Seller|null>(null);
  const rows=topSellers.filter((s)=>s.name.toLowerCase().includes(query.toLowerCase())).slice().sort((a,b)=>sort==="Vendas"?b.sales-a.sales:sort==="Propostas"?b.proposals-a.proposals:parseFloat(b.conversion)-parseFloat(a.conversion));
  const history=selected?proposals.filter((p)=>p.seller===selected.name):[];
  const sellerPurchases=selected?purchases.filter((p)=>p.seller===selected.name):[];
  const exportSeller=(s:Seller)=>downloadCsv(`vendedor-${s.name.toLowerCase().replace(/\s+/g,"-")}.csv`,[["Nome","Cargo","Hierarquia","E-mail","Telefone","Propostas","Vendas","Conversão","Valor vendido"],[s.name,s.role,s.hierarchy,s.email,s.phone,s.proposals,s.sales,s.conversion,s.value],[],["Propostas"],["Nº","Cliente","Banco","Crédito","Status"],...history.map((p)=>[p.id,p.client,p.bank,p.creditValue,p.status])]);
  return <>
    <PageHeader title="Vendedores" subtitle="Clique em um vendedor para ver dados completos, histórico e exportar."/>
    <div className="panel toolbar"><div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar vendedor..."/></div><select className="field w-full sm:w-auto" value={sort} onChange={(e)=>setSort(e.target.value)}><option>Vendas</option><option>Propostas</option><option>Conversão</option></select></div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{rows.map((s)=><button key={s.name} onClick={()=>setSelected(s)} className="panel text-left hover:border-gray-300 transition-colors"><div className="flex items-center gap-3"><img src={s.avatar} loading="lazy" className="w-12 h-12 rounded-full object-cover" alt={s.name}/><div className="min-w-0"><h3 className="font-semibold truncate">{s.name}</h3><p className="text-xs text-gray-400">{s.role}</p></div><span className="ml-auto text-xs text-positive font-semibold">{s.growth}</span></div><div className="grid grid-cols-3 gap-2 mt-5"><div className="metric"><b>{s.proposals}</b><span>Propostas</span></div><div className="metric"><b>{s.sales}</b><span>Vendas</span></div><div className="metric"><b>{s.conversion}</b><span>Conversão</span></div></div><p className="mt-4 text-sm"><span className="text-gray-400">Valor vendido</span><b className="float-right">{s.value}</b></p></button>)}</div>
    {selected&&<Modal title={selected.name} onClose={()=>setSelected(null)}><div className="flex items-center gap-4 mb-5"><img src={selected.avatar} className="w-16 h-16 rounded-full object-cover" alt={selected.name}/><div><p className="font-semibold">{selected.role}</p><p className="text-sm text-gray-500">{selected.hierarchy}</p><p className="text-xs text-gray-400 mt-1">Na empresa desde {selected.joined}</p></div></div><div className="grid sm:grid-cols-2 gap-3 text-sm"><div className="panel p-3"><p className="text-xs text-gray-400">Telefone</p><b>{selected.phone}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">E-mail</p><b className="break-all">{selected.email}</b></div><div className="metric"><b>{selected.proposals}</b><span>Propostas</span></div><div className="metric"><b>{selected.sales}</b><span>Vendas</span></div></div><button onClick={()=>exportSeller(selected)} className="btn-secondary mt-4"><Download size={15}/>Exportar dados do vendedor</button><div className="mt-5"><h4 className="font-semibold text-sm mb-2">Histórico de propostas</h4>{history.slice(0,8).map((p)=><div key={p.id} className="flex justify-between gap-3 border-t border-gray-100 py-3 text-sm"><span>Nº {p.id} · {p.client}</span><span className="text-gray-500">{p.bank} · {p.creditValue}</span></div>)}{!history.length&&<p className="text-sm text-gray-400">Sem propostas simuladas.</p>}</div>{sellerPurchases.length>0&&<div className="mt-4"><h4 className="font-semibold text-sm mb-2">Compras concluídas / em andamento</h4>{sellerPurchases.map((p)=><div key={p.id} className="flex justify-between gap-3 border-t border-gray-100 py-3 text-sm"><span>{p.client} · {p.product}</span><b>{money(p.value)}</b></div>)}</div>}</Modal>}
  </>;
}

function BanksPage(){
  const [sort,setSort]=useState("Valor vendido"); const [selected,setSelected]=useState<BankData|null>(null);
  const rows=banks.slice().sort((a,b)=>sort==="Conversão"?b.conversion-a.conversion:sort==="Vendas"?b.sales-a.sales:b.value-a.value);
  const rel=selected?proposals.filter((p)=>p.bank.toLowerCase().startsWith(selected.name.split(" ")[0].toLowerCase())):[];
  return <>
    <PageHeader title="Bancos / Administradoras" subtitle="Clique em um banco para ver dados, desempenho e propostas relacionadas."/>
    <div className="flex justify-end"><select className="field" value={sort} onChange={(e)=>setSort(e.target.value)}><option>Valor vendido</option><option>Vendas</option><option>Conversão</option></select></div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{rows.map((b,i)=><button className="panel text-left hover:border-gray-300 transition-colors" key={b.name} onClick={()=>setSelected(b)}><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-xl bg-gray-100 grid place-items-center font-bold">{i+1}</div><div><h3 className="font-semibold">{b.name}</h3><p className="text-xs text-gray-400">{b.proposals} propostas</p></div></div><div className="grid grid-cols-2 gap-3 mt-5"><div className="metric"><b>{b.sales}</b><span>Vendas</span></div><div className="metric"><b>{b.conversion.toFixed(1)}%</b><span>Conversão</span></div></div><div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm"><span className="text-gray-400">Valor vendido</span><b>{money(b.value)}</b></div></button>)}</div>
    {selected&&<Modal title={selected.name} onClose={()=>setSelected(null)}><div className="grid sm:grid-cols-2 gap-3"><div className="metric"><b>{selected.proposals}</b><span>Propostas</span></div><div className="metric"><b>{selected.sales}</b><span>Vendas</span></div><div className="metric"><b>{selected.conversion.toFixed(1)}%</b><span>Conversão</span></div><div className="metric"><b>{money(selected.value)}</b><span>Valor vendido</span></div><div className="panel p-3"><p className="text-xs text-gray-400">Gerente / contato</p><b>{selected.manager}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Telefone</p><b>{selected.phone}</b></div><div className="panel p-3 sm:col-span-2"><p className="text-xs text-gray-400">E-mail</p><b>{selected.email}</b></div></div><div className="mt-5"><h4 className="font-semibold text-sm mb-2">Propostas recentes</h4>{rel.slice(0,8).map((p)=><div key={p.id} className="flex justify-between gap-3 border-t border-gray-100 py-3 text-sm"><span>Nº {p.id} · {p.client}</span><span>{p.creditValue} · {p.status}</span></div>)}</div></Modal>}
  </>;
}

function PurchasesPage(){
  const [query,setQuery]=useState(""); const [status,setStatus]=useState("Todos"); const [selected,setSelected]=useState<Purchase|null>(null);
  const rows=purchases.filter((p)=>(!query||[p.client,p.product,p.bank,p.seller].join(" ").toLowerCase().includes(query.toLowerCase()))&&(status==="Todos"||p.status===status));
  return <>
    <PageHeader title="Compras" subtitle="Histórico simulado de cartas e operações. Clique em uma linha para abrir os detalhes." action={<button onClick={()=>downloadCsv("compras.csv",[["ID","Cliente","Produto","Banco","Valor","Vendedor","Data","Status","Pagamento"],...rows.map((p)=>[p.id,p.client,p.product,p.bank,p.value,p.seller,p.date,p.status,p.payment])])} className="btn-secondary"><Download size={15}/>Exportar</button>}/>
    <div className="panel"><div className="toolbar mb-4"><div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar compra..."/></div><select className="field w-full sm:w-auto" value={status} onChange={(e)=>setStatus(e.target.value)}><option>Todos</option><option>Confirmada</option><option>Pendente</option><option>Cancelada</option></select></div><div className="overflow-x-auto"><table className="data-table min-w-[900px]"><thead><tr><th>ID</th><th>Cliente</th><th>Produto</th><th>Banco</th><th>Valor</th><th>Vendedor</th><th>Data</th><th>Status</th><th>Pagamento</th></tr></thead><tbody>{rows.map((p)=><tr key={p.id} onClick={()=>setSelected(p)} className="cursor-pointer"><td>{p.id}</td><td><b>{p.client}</b></td><td>{p.product}</td><td>{p.bank}</td><td>{money(p.value)}</td><td>{p.seller}</td><td>{p.date}</td><td><span className="pill">{p.status}</span></td><td>{p.payment}</td></tr>)}</tbody></table></div></div>
    {selected&&<Modal title={`Compra ${selected.id}`} onClose={()=>setSelected(null)} max="max-w-lg"><div className="grid sm:grid-cols-2 gap-3"><div className="panel p-3"><p className="text-xs text-gray-400">Cliente</p><b>{selected.client}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Produto</p><b>{selected.product}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Banco</p><b>{selected.bank}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Valor</p><b>{money(selected.value)}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Vendedor</p><b>{selected.seller}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Pagamento</p><b>{selected.payment}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Status</p><b>{selected.status}</b></div><div className="panel p-3"><p className="text-xs text-gray-400">Data</p><b>{selected.date}</b></div></div></Modal>}
  </>;
}

function MessagesPage(){
  const mappedMessages:EmailThread[]=messages.map((m)=>({id:m.id,from:m.name,avatar:m.avatar,subject:"Mensagem direta",preview:m.preview,time:m.time,unread:Boolean(m.unread),body:m.body,role:m.role,hierarchy:m.hierarchy}));
  const initial=[...emailThreads,...mappedMessages];
  const [threads,setThreads]=useState<EmailThread[]>(initial);
  const [selected,setSelected]=useState<EmailThread>(initial[0]);
  const [query,setQuery]=useState("");
  const [compose,setCompose]=useState(false);
  const [to,setTo]=useState("Equipe Comercial");
  const [subject,setSubject]=useState("");
  const [body,setBody]=useState("");

  useEffect(()=>{
    const id=new URLSearchParams(window.location.search).get("thread");
    if(id){const found=threads.find((t)=>t.id===id);if(found)setSelected(found)}
  },[threads]);

  const visible=threads.filter((t)=>[t.from,t.subject,t.preview,t.role,t.hierarchy].join(" ").toLowerCase().includes(query.toLowerCase()));

  const conversation=(t:EmailThread)=>{
    const person=t.from.replace("Você → ","");
    const isSent=t.from.startsWith("Você → ");
    const base=[
      {id:"a",who:isSent?"me":"them",name:isSent?"Daniel Vorcaro":person,text:t.body,time:t.time},
      {id:"b",who:isSent?"them":"me",name:isSent?person:"Daniel Vorcaro",text:isSent?"Recebido. Vou verificar e retorno por aqui.":"Recebi. Vou verificar isso agora e te retorno por aqui.",time:"Pouco depois"},
      {id:"c",who:isSent?"me":"them",name:isSent?"Daniel Vorcaro":person,text:isSent?"Perfeito. Se precisar de mais alguma informação, me avise.":"Perfeito, obrigado. Fico no aguardo e atualizo o CRM assim que tiver retorno.",time:"Agora"}
    ];
    return base;
  };

  const send=()=>{
    if(!subject.trim()||!body.trim())return;
    const item:EmailThread={id:"sent-"+Date.now(),from:"Você → "+to,avatar:"",subject,preview:body.slice(0,70),time:"Agora",body,role:"Administrador",hierarchy:"Administração · Nível máximo"};
    setThreads((o)=>[item,...o]);setSelected(item);setCompose(false);setSubject("");setBody("");
  };

  return <>
    <PageHeader title="Mensagens internas" subtitle="Clique em uma conversa para visualizar toda a troca de mensagens, com remetente, cargo e hierarquia." action={<button onClick={()=>setCompose(true)} className="btn-primary"><Plus size={16}/>Nova mensagem</button>}/>
    <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 min-h-[650px]">
      <div className="panel p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100"><div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar mensagens..."/></div></div>
        <div className="max-h-[580px] overflow-y-auto">{visible.map((t)=><button key={t.id} onClick={()=>setSelected(t)} className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 ${selected.id===t.id?"bg-gray-50":""}`}>
          <div className="flex justify-between gap-2"><b className="text-sm truncate">{t.from}</b><span className="text-[11px] text-gray-400 shrink-0">{t.time}</span></div>
          <p className="text-[11px] text-gray-400 mt-1 truncate">{t.role} · {t.hierarchy}</p>
          <p className="text-xs font-medium mt-1 truncate">{t.subject}</p>
          <p className="text-xs text-gray-400 mt-1 truncate">{t.preview}</p>
        </button>)}</div>
      </div>

      <div className="panel flex flex-col min-h-[620px]">
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {selected.avatar?<img src={selected.avatar} loading="lazy" className="w-12 h-12 rounded-full object-cover" alt={selected.from}/>:<div className="w-12 h-12 rounded-full bg-gray-100 grid place-items-center"><Mail size={18}/></div>}
            <div><p className="font-semibold">{selected.from}</p><p className="text-xs text-gray-500 mt-0.5">{selected.role}</p><p className="text-[11px] text-gray-400">{selected.hierarchy}</p></div>
          </div>
          <h2 className="text-lg sm:text-xl font-bold mt-5">{selected.subject}</h2>
        </div>

        <div className="py-5 flex-1 space-y-4 overflow-y-auto max-h-[500px]">
          {conversation(selected).map((m)=><div key={m.id} className={`flex ${m.who==="me"?"justify-end":"justify-start"}`}>
            <div className={`max-w-[88%] sm:max-w-[72%] rounded-2xl px-4 py-3 ${m.who==="me"?"bg-ink text-white rounded-br-md":"bg-gray-100 text-gray-700 rounded-bl-md"}`}>
              <div className={`text-[10px] font-semibold mb-1 ${m.who==="me"?"text-gray-300":"text-gray-500"}`}>{m.name}</div>
              <p className="text-sm leading-6 whitespace-pre-wrap">{m.text}</p>
              <div className={`text-[10px] mt-2 text-right ${m.who==="me"?"text-gray-400":"text-gray-400"}`}>{m.time}</div>
            </div>
          </div>)}
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button onClick={()=>{setTo(selected.from.replace("Você → ",""));setSubject("Re: "+selected.subject);setCompose(true)}} className="btn-primary"><Send size={15}/>Responder</button>
        </div>
      </div>
    </div>

    {compose&&<Modal title="Nova mensagem interna" onClose={()=>setCompose(false)} max="max-w-lg">
      <div className="space-y-3">
        <select className="field w-full" value={to} onChange={(e)=>setTo(e.target.value)}>{["Equipe Comercial","Pedro Almeida","Juliana Souza","Marcos Lima","Renata Dias","Felipe Rocha"].map((x)=><option key={x}>{x}</option>)}</select>
        <input className="field w-full" placeholder="Assunto" value={subject} onChange={(e)=>setSubject(e.target.value)}/>
        <textarea className="field w-full min-h-40 resize-none" placeholder="Escreva a mensagem..." value={body} onChange={(e)=>setBody(e.target.value)}/>
        <button onClick={send} className="btn-primary w-full justify-center"><Send size={15}/>Enviar mensagem</button>
      </div>
    </Modal>}
  </>;
}

function ReportsPage(){
  const [view,setView]=useState<"Mensal"|"Trimestral">("Mensal");
  const chartData=view==="Mensal"?performanceData:[
    {month:"Jan-Mar",propostas:performanceData.slice(0,3).reduce((a,b)=>a+b.propostas,0),vendas:performanceData.slice(0,3).reduce((a,b)=>a+b.vendas,0)},
    {month:"Abr-Jun",propostas:performanceData.slice(3,6).reduce((a,b)=>a+b.propostas,0),vendas:performanceData.slice(3,6).reduce((a,b)=>a+b.vendas,0)},
    {month:"Jul-Set",propostas:performanceData.slice(6,9).reduce((a,b)=>a+b.propostas,0),vendas:performanceData.slice(6,9).reduce((a,b)=>a+b.vendas,0)},
    {month:"Out-Dez",propostas:performanceData.slice(9,12).reduce((a,b)=>a+b.propostas,0),vendas:performanceData.slice(9,12).reduce((a,b)=>a+b.vendas,0)},
  ];
  return <>
    <PageHeader title="Relatórios" subtitle="Indicadores consolidados com gráficos de evolução e performance por banco." action={<button onClick={()=>downloadCsv("relatorio-performance.csv",[["Período","Propostas","Vendas"],...chartData.map((p)=>[p.month,p.propostas,p.vendas])])} className="btn-secondary"><Download size={15}/>Exportar CSV</button>}/>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[["Propostas","1.326"],["Vendas","298"],["Conversão","22,5%"],["Receita estimada","R$ 3,4 mi"]].map(([a,b])=><div className="panel" key={a}><p className="text-xs text-gray-400">{a}</p><p className="text-2xl font-bold mt-2">{b}</p></div>)}</div>
    <div className="flex justify-end"><select className="field" value={view} onChange={(e)=>setView(e.target.value as "Mensal"|"Trimestral")}><option>Mensal</option><option>Trimestral</option></select></div>
    <ReportsCharts performance={chartData} banks={banks}/>
  </>;
}

function ImportPage(){
  const [file,setFile]=useState<File|null>(null); const [rows,setRows]=useState<string[][]>([]); const [done,setDone]=useState(false);
  const read=(f:File)=>{setFile(f);setDone(false);if(f.name.toLowerCase().endsWith(".csv")){const reader=new FileReader();reader.onload=()=>{const text=String(reader.result||"");setRows(text.split(/\r?\n/).filter(Boolean).slice(0,10).map((line)=>line.split(/[;,]/)));};reader.readAsText(f)}else{setRows([["Nome","Telefone","E-mail","Cidade"],["João Exemplo","11999990000","joao@exemplo.com","São Paulo"],["Maria Exemplo","11988880000","maria@exemplo.com","Guarulhos"]])}};
  return <><PageHeader title="Importar Planilha" subtitle="Carregue sua base e revise a prévia antes de distribuir aos atendentes."/><div className="grid grid-cols-1 xl:grid-cols-[0.9fr_1.4fr] gap-4"><div className="panel"><label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 min-h-[280px] flex flex-col items-center justify-center text-center cursor-pointer hover:border-gray-400 transition-colors"><Upload size={32} className="text-gray-400"/><h3 className="font-semibold mt-4">Selecione sua planilha</h3><p className="text-xs text-gray-400 mt-2">CSV, XLS ou XLSX · modo demonstrativo sem backend</p><input type="file" accept=".csv,.xls,.xlsx" className="hidden" onChange={(e)=>e.target.files?.[0]&&read(e.target.files[0])}/><span className="btn-secondary mt-4">Escolher arquivo</span></label>{file&&<div className="mt-4 bg-gray-50 rounded-xl p-3 flex items-center gap-3"><FileSpreadsheet size={20}/><div className="min-w-0"><p className="text-sm font-medium truncate">{file.name}</p><p className="text-xs text-gray-400">{(file.size/1024).toFixed(1)} KB</p></div></div>}</div><div className="panel"><div className="flex items-center justify-between mb-4"><div><h3 className="font-semibold">Prévia da importação</h3><p className="text-xs text-gray-400 mt-1">{rows.length?rows.length+" linha(s) em prévia":"Nenhum arquivo selecionado"}</p></div>{rows.length>0&&<button onClick={()=>setDone(true)} className="btn-primary"><Check size={15}/>Importar dados</button>}</div>{rows.length?<div className="overflow-x-auto"><table className="data-table min-w-[620px]"><tbody>{rows.map((r,i)=><tr key={i}>{r.map((c,j)=><td key={j} className={i===0?"font-semibold":""}>{c}</td>)}</tr>)}</tbody></table></div>:<div className="h-64 grid place-items-center text-sm text-gray-400">A prévia aparecerá aqui.</div>}{done&&<div className="mt-4 rounded-xl bg-green-50 border border-green-100 p-4 text-sm text-green-700">Importação simulada concluída. Registros prontos para distribuição.</div>}</div></div></>;
}

function SettingsPage(){
  const [settings,setSettings]=useState({company:"MV CRM Consórcios",email:"administracao@mvcrm.com.br",notify:true,darkAuto:false,duplicates:true});const [saved,setSaved]=useState(false);
  useEffect(()=>{try{const s=localStorage.getItem("mvcrm-settings");if(s)setSettings(JSON.parse(s))}catch{}},[]);
  const save=()=>{localStorage.setItem("mvcrm-settings",JSON.stringify(settings));setSaved(true);setTimeout(()=>setSaved(false),2000)};
  return <><PageHeader title="Configurações" subtitle="Preferências locais deste protótipo front-end."/><div className="panel max-w-3xl"><div className="space-y-5"><div><label className="label">Nome da empresa</label><input className="field w-full" value={settings.company} onChange={(e)=>setSettings({...settings,company:e.target.value})}/></div><div><label className="label">E-mail administrativo</label><input className="field w-full" value={settings.email} onChange={(e)=>setSettings({...settings,email:e.target.value})}/></div>{[["notify","Notificações no painel"],["duplicates","Avisar sobre clientes duplicados"],["darkAuto","Tema escuro automático"]].map(([key,label])=><label key={key} className="flex items-center justify-between border border-gray-100 rounded-xl p-4"><span className="text-sm font-medium">{label}</span><input type="checkbox" checked={Boolean(settings[key as keyof typeof settings])} onChange={(e)=>setSettings({...settings,[key]:e.target.checked})}/></label>)}<div><button onClick={save} className="btn-primary">Salvar configurações</button>{saved&&<span className="text-sm text-positive ml-3">Configurações salvas neste navegador.</span>}</div></div></div></>;
}

function SupportPage(){
  return <><PageHeader title="Ajuda & Suporte" subtitle="Canais de suporte e dúvidas frequentes."/><div className="grid grid-cols-1 lg:grid-cols-2 gap-4"><div className="panel"><div className="w-12 h-12 rounded-xl bg-ink text-white grid place-items-center"><Phone size={20}/></div><h3 className="text-xl font-bold mt-4">WhatsApp do suporte</h3><p className="text-sm text-gray-500 mt-2">Fale diretamente com o suporte do MV CRM.</p><a href="https://wa.me/5511992779039" target="_blank" rel="noreferrer" className="btn-primary mt-5 inline-flex">(11) 99277-9039</a></div><div className="panel"><div className="w-12 h-12 rounded-xl bg-gray-100 grid place-items-center"><Mail size={20}/></div><h3 className="text-xl font-bold mt-4">Contato interno</h3><p className="text-sm text-gray-500 mt-2">Use Mensagens para falar com funcionários e administração.</p><a href="/mensagens" className="btn-secondary mt-5 inline-flex">Abrir mensagens</a></div></div><div className="panel"><h3 className="font-semibold mb-4">Perguntas frequentes</h3>{["Como importar uma nova base?","Como alterar o status de um atendimento?","Como exportar propostas?","Como evitar contato duplicado?"].map((q)=><details key={q} className="border-t border-gray-100 py-4 first:border-t-0"><summary className="cursor-pointer font-medium text-sm">{q}</summary><p className="text-sm text-gray-500 mt-2">Nesta demonstração, os recursos funcionam localmente com dados simulados.</p></details>)}</div></>;
}

export default function SectionPage({section}:{section:string}){
  let content:React.ReactNode;
  if(section==="clientes")content=<ClientsPage/>;
  else if(section==="propostas")content=<><PageHeader title="Propostas" subtitle="Clique em qualquer dado da proposta para abrir os detalhes e altere o status em Ações."/><ProposalsTable title="Todas as Propostas"/></>;
  else if(section==="cotas")content=<QuotasPage/>;
  else if(section==="atendimentos")content=<ServicePage/>;
  else if(section==="vendedores")content=<SellersPage/>;
  else if(section==="bancos")content=<BanksPage/>;
  else if(section==="compras")content=<PurchasesPage/>;
  else if(section==="mensagens")content=<MessagesPage/>;
  else if(section==="relatorios")content=<ReportsPage/>;
  else if(section==="importar-planilha")content=<ImportPage/>;
  else if(section==="configuracoes")content=<SettingsPage/>;
  else if(section==="suporte")content=<SupportPage/>;
  else content=<div className="panel"><h1 className="text-xl font-bold">Página não encontrada</h1></div>;
  return <AppShell><main className="px-4 sm:px-6 lg:px-8 py-5 pb-10 space-y-5 max-w-[1800px] mx-auto">{content}</main></AppShell>;
}
