"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import {
  CalendarDays, ChevronLeft, ChevronRight, Clock3, LayoutDashboard,
  Plus, Search, UserRound, X
} from "lucide-react";

type TaskStatus = "Hoje" | "Em andamento" | "Aguardando" | "Concluído";
type Priority = "Alta" | "Média" | "Baixa";
type Task = {
  id:string; title:string; client:string; owner:string; date:string; time:string;
  status:TaskStatus; priority:Priority; note:string;
};

const initialTasks:Task[] = [
  {id:"PD-101",title:"Retornar proposta 4321",client:"João da Silva",owner:"Pedro Almeida",date:"2026-09-18",time:"09:00",status:"Hoje",priority:"Alta",note:"Cliente pediu simulação com prazo menor."},
  {id:"PD-102",title:"Cobrar documentos",client:"Ana Costa",owner:"Renata Dias",date:"2026-09-18",time:"10:30",status:"Hoje",priority:"Média",note:"Faltam comprovante e documento com foto."},
  {id:"PD-103",title:"Revisar cota 0571",client:"Carlos Santos",owner:"Marcos Lima",date:"2026-09-18",time:"13:00",status:"Em andamento",priority:"Alta",note:"Validar saldo e condição atual."},
  {id:"PD-104",title:"Enviar proposta atualizada",client:"Maria Oliveira",owner:"Juliana Souza",date:"2026-09-18",time:"15:30",status:"Aguardando",priority:"Média",note:"Aguardando retorno do banco."},
  {id:"PD-105",title:"Primeiro contato",client:"André Ribeiro",owner:"Camila Nunes",date:"2026-09-19",time:"09:30",status:"Aguardando",priority:"Baixa",note:"Lead novo vindo do Instagram."},
  {id:"PD-106",title:"Conferir pagamento",client:"Fernanda Rocha",owner:"Pedro Almeida",date:"2026-09-20",time:"11:00",status:"Em andamento",priority:"Alta",note:"Confirmar baixa do pagamento."},
  {id:"PD-107",title:"Follow-up pós-venda",client:"Luciana Mendes",owner:"Pedro Almeida",date:"2026-09-22",time:"14:00",status:"Aguardando",priority:"Baixa",note:"Contato de relacionamento."},
  {id:"PD-108",title:"Reunião comercial",client:"Equipe Comercial",owner:"Juliana Souza",date:"2026-09-23",time:"08:30",status:"Aguardando",priority:"Média",note:"Revisão semanal de metas."},
  {id:"PD-109",title:"Atualizar cadastro",client:"Bruna Alves",owner:"Felipe Rocha",date:"2026-09-17",time:"16:00",status:"Concluído",priority:"Baixa",note:"Cadastro concluído."},
  {id:"PD-110",title:"Negociação concluída",client:"Maria Oliveira",owner:"Juliana Souza",date:"2026-09-16",time:"17:10",status:"Concluído",priority:"Média",note:"Venda finalizada."},
];

const statuses:TaskStatus[]=["Hoje","Em andamento","Aguardando","Concluído"];
const priorityClass:Record<Priority,string>={
  Alta:"bg-red-50 text-red-700 border-red-100",
  Média:"bg-amber-50 text-amber-700 border-amber-100",
  Baixa:"bg-gray-50 text-gray-600 border-gray-200",
};
const monthNames=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

export default function PendenciasPage(){
  const [tasks,setTasks]=useState<Task[]>(initialTasks);
  const [view,setView]=useState<"kanban"|"calendar">("kanban");
  const [query,setQuery]=useState("");
  const [owner,setOwner]=useState("Todos");
  const [priority,setPriority]=useState("Todas");
  const [selected,setSelected]=useState<Task|null>(null);
  const [create,setCreate]=useState(false);
  const [selectedDay,setSelectedDay]=useState("2026-09-18");
  const [calendarMonth,setCalendarMonth]=useState(new Date(Date.UTC(2026,8,1)));
  const [form,setForm]=useState({title:"",client:"",owner:"Pedro Almeida",date:"2026-09-18",time:"09:00",priority:"Média" as Priority,note:""});

  const owners=Array.from(new Set(tasks.map((t)=>t.owner))).sort();
  const filtered=useMemo(()=>tasks.filter((t)=>{
    const q=query.toLowerCase();
    return (!q||[t.title,t.client,t.owner,t.note].join(" ").toLowerCase().includes(q)) &&
      (owner==="Todos"||t.owner===owner) &&
      (priority==="Todas"||t.priority===priority);
  }),[tasks,query,owner,priority]);

  const hasActiveFilters=Boolean(query.trim())||owner!=="Todos"||priority!=="Todas";
  const visibleStatuses=hasActiveFilters
    ? statuses.filter((status)=>filtered.some((task)=>task.status===status))
    : statuses;
  const todayCount=filtered.filter((t)=>t.date==="2026-09-18"&&t.status!=="Concluído").length;
  const overdue=filtered.filter((t)=>t.date<"2026-09-18"&&t.status!=="Concluído").length;
  const urgent=filtered.filter((t)=>t.priority==="Alta"&&t.status!=="Concluído").length;
  const moveTask=(id:string,status:TaskStatus)=>setTasks((old)=>old.map((t)=>t.id===id?{...t,status}:t));
  const addTask=()=>{
    if(!form.title.trim()||!form.client.trim())return;
    setTasks((old)=>[{id:"PD-"+(111+old.length),title:form.title,client:form.client,owner:form.owner,date:form.date,time:form.time,status:form.date==="2026-09-18"?"Hoje":"Aguardando",priority:form.priority,note:form.note},...old]);
    setCreate(false);
    setForm({title:"",client:"",owner:"Pedro Almeida",date:"2026-09-18",time:"09:00",priority:"Média",note:""});
  };

  const year=calendarMonth.getUTCFullYear(), month=calendarMonth.getUTCMonth();
  const firstWeekday=new Date(Date.UTC(year,month,1)).getUTCDay();
  const daysInMonth=new Date(Date.UTC(year,month+1,0)).getUTCDate();
  const calendarCells=Array.from({length:42},(_,i)=>{
    const day=i-firstWeekday+1;
    return day>=1&&day<=daysInMonth?day:null;
  });
  const dateForDay=(day:number)=>`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

  return <AppShell>
    <main className="px-4 sm:px-6 lg:px-8 py-5 pb-10 space-y-5 max-w-[1800px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pendências</h1>
          <p className="text-sm text-gray-500 mt-1">Fluxo diário em Kanban e calendário, com responsáveis, horários e prioridades.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link href="/" className="btn-secondary"><LayoutDashboard size={15}/>Visão Geral</Link>
          <button onClick={()=>setCreate(true)} className="btn-primary"><Plus size={15}/>Nova pendência</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="panel"><p className="text-xs text-gray-400">Pendências de hoje</p><p className="text-3xl font-bold mt-2">{todayCount}</p><p className="text-xs text-gray-500 mt-2">{hasActiveFilters?"Dentro do filtro atual":"Ainda abertas em 18/09"}</p></div>
        <div className="panel"><p className="text-xs text-gray-400">Atrasadas</p><p className="text-3xl font-bold mt-2">{overdue}</p><p className="text-xs text-gray-500 mt-2">{hasActiveFilters?"Dentro do filtro atual":"Precisam de revisão"}</p></div>
        <div className="panel"><p className="text-xs text-gray-400">Alta prioridade</p><p className="text-3xl font-bold mt-2">{urgent}</p><p className="text-xs text-gray-500 mt-2">{hasActiveFilters?"Dentro do filtro atual":"Em todo o fluxo"}</p></div>
      </div>

      <div className="panel">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="searchbox"><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Buscar pendência, cliente ou responsável..."/></div>
          <select value={owner} onChange={(e)=>setOwner(e.target.value)} className="field"><option>Todos</option>{owners.map((x)=><option key={x}>{x}</option>)}</select>
          <select value={priority} onChange={(e)=>setPriority(e.target.value)} className="field"><option>Todas</option><option>Alta</option><option>Média</option><option>Baixa</option></select>
          <div className="grid grid-cols-2 gap-1 bg-gray-100 rounded-xl p-1">
            <button onClick={()=>setView("kanban")} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${view==="kanban"?"bg-white text-ink shadow-sm":"text-gray-500"}`}><LayoutDashboard size={15}/>Kanban</button>
            <button onClick={()=>setView("calendar")} className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${view==="calendar"?"bg-white text-ink shadow-sm":"text-gray-500"}`}><CalendarDays size={15}/>Calendário</button>
          </div>
        </div>
      </div>

      {view==="kanban" ? (
        <>
          {hasActiveFilters&&<div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
            <span><b>{filtered.length}</b> resultado(s) correspondente(s) ao filtro atual.</span>
            <button onClick={()=>{setQuery("");setOwner("Todos");setPriority("Todas")}} className="text-xs font-semibold underline underline-offset-4">Limpar filtros</button>
          </div>}
          {filtered.length ? (
            <div className={`grid grid-cols-1 gap-4 ${visibleStatuses.length===1?"max-w-xl":visibleStatuses.length===2?"md:grid-cols-2":visibleStatuses.length===3?"md:grid-cols-2 xl:grid-cols-3":"md:grid-cols-2 2xl:grid-cols-4"}`}>
          {visibleStatuses.map((status)=><section key={status} className="bg-gray-100/70 border border-gray-200 rounded-2xl p-3 min-h-[460px]">
            <div className="flex items-center justify-between px-1 mb-3"><h2 className="font-semibold text-sm">{status}</h2><span className="text-xs rounded-full bg-white border border-gray-200 px-2 py-1">{filtered.filter((t)=>t.status===status).length}</span></div>
            <div className="space-y-3">
              {filtered.filter((t)=>t.status===status).map((task)=><article key={task.id} className="bg-white rounded-xl border border-gray-100 shadow-card p-4">
                <button onClick={()=>setSelected(task)} className="w-full text-left">
                  <div className="flex items-start justify-between gap-2"><div><p className="font-semibold text-sm">{task.title}</p><p className="text-xs text-gray-400 mt-1">{task.client}</p></div><span className={`text-[10px] border rounded-full px-2 py-1 ${priorityClass[task.priority]}`}>{task.priority}</span></div>
                  <div className="mt-4 space-y-1 text-xs text-gray-500"><p className="flex items-center gap-2"><CalendarDays size={13}/>{task.date.split("-").reverse().join("/")}</p><p className="flex items-center gap-2"><Clock3 size={13}/>{task.time}</p><p className="flex items-center gap-2"><UserRound size={13}/>{task.owner}</p></div>
                </button>
                <select value={task.status} onChange={(e)=>moveTask(task.id,e.target.value as TaskStatus)} className="field w-full mt-3 text-xs">{statuses.map((s)=><option key={s}>{s}</option>)}</select>
              </article>)}
            </div>
          </section>)}
            </div>
          ) : (
            <div className="panel py-16 text-center">
              <p className="font-semibold text-ink">Nenhuma pendência encontrada</p>
              <p className="mt-1 text-sm text-gray-400">Não existe registro correspondente aos filtros selecionados.</p>
              <button onClick={()=>{setQuery("");setOwner("Todos");setPriority("Todas")}} className="btn-secondary mt-4">Limpar filtros</button>
            </div>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-4">
          <section className="panel">
            <div className="flex items-center justify-between mb-4">
              <button onClick={()=>setCalendarMonth(new Date(Date.UTC(year,month-1,1)))} className="icon-btn"><ChevronLeft size={16}/></button>
              <h2 className="font-semibold">{monthNames[month]} {year}</h2>
              <button onClick={()=>setCalendarMonth(new Date(Date.UTC(year,month+1,1)))} className="icon-btn"><ChevronRight size={16}/></button>
            </div>
            <div className="grid grid-cols-7 text-center text-[11px] text-gray-400 mb-2">{["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"].map((d)=><div key={d} className="py-2">{d}</div>)}</div>
            <div className="grid grid-cols-7 border-l border-t border-gray-100">
              {calendarCells.map((day,i)=>{
                if(!day)return <div key={i} className="min-h-[88px] sm:min-h-[110px] border-r border-b border-gray-100 bg-gray-50/40"/>;
                const date=dateForDay(day);
                const dayTasks=filtered.filter((t)=>t.date===date);
                return <button key={date} onClick={()=>setSelectedDay(date)} className={`min-h-[88px] sm:min-h-[110px] border-r border-b border-gray-100 p-2 text-left hover:bg-gray-50 ${selectedDay===date?"bg-gray-50 ring-1 ring-inset ring-gray-300":""}`}>
                  <span className={`inline-grid place-items-center w-7 h-7 rounded-full text-xs font-semibold ${date==="2026-09-18"?"bg-ink text-white":""}`}>{day}</span>
                  <div className="mt-1 space-y-1">{dayTasks.slice(0,2).map((t)=><div key={t.id} className="text-[10px] truncate rounded bg-gray-100 px-1.5 py-1">{t.time} {t.client}</div>)}{dayTasks.length>2&&<div className="text-[10px] text-gray-400">+{dayTasks.length-2} itens</div>}</div>
                </button>;
              })}
            </div>
          </section>
          <aside className="panel">
            <h3 className="font-semibold">Agenda do dia</h3><p className="text-xs text-gray-400 mt-1">{selectedDay.split("-").reverse().join("/")}</p>
            <div className="mt-4 space-y-3">{filtered.filter((t)=>t.date===selectedDay).map((t)=><button key={t.id} onClick={()=>setSelected(t)} className="w-full text-left rounded-xl border border-gray-100 p-3 hover:bg-gray-50"><div className="flex justify-between gap-2"><b className="text-sm">{t.time} · {t.title}</b><span className={`text-[10px] border rounded-full px-2 py-1 ${priorityClass[t.priority]}`}>{t.priority}</span></div><p className="text-xs text-gray-500 mt-1">{t.client}</p><p className="text-[11px] text-gray-400 mt-1">{t.owner}</p></button>)}{!filtered.some((t)=>t.date===selectedDay)&&<div className="py-12 text-center text-sm text-gray-400">Nenhuma pendência neste dia.</div>}</div>
          </aside>
        </div>
      )}

      {selected&&<div className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4" onClick={()=>setSelected(null)}><div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-5" onClick={(e)=>e.stopPropagation()}><div className="flex justify-between gap-3"><div><p className="text-xs text-gray-400">{selected.id}</p><h3 className="text-xl font-bold mt-1">{selected.title}</h3><p className="text-sm text-gray-500 mt-1">{selected.client}</p></div><button onClick={()=>setSelected(null)} className="icon-btn"><X size={16}/></button></div><div className="grid grid-cols-2 gap-3 mt-5"><div className="metric"><b>{selected.date.split("-").reverse().join("/")}</b><span>Data</span></div><div className="metric"><b>{selected.time}</b><span>Horário</span></div><div className="metric"><b>{selected.owner}</b><span>Responsável</span></div><div className="metric"><b>{selected.priority}</b><span>Prioridade</span></div></div><div className="mt-4 panel p-3"><p className="text-xs text-gray-400">Observação</p><p className="text-sm mt-1">{selected.note}</p></div><select value={selected.status} onChange={(e)=>{const next=e.target.value as TaskStatus;moveTask(selected.id,next);setSelected({...selected,status:next})}} className="field w-full mt-4">{statuses.map((s)=><option key={s}>{s}</option>)}</select></div></div>}

      {create&&<div className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4" onClick={()=>setCreate(false)}><div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-5" onClick={(e)=>e.stopPropagation()}><div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">Nova pendência</h3><button onClick={()=>setCreate(false)} className="icon-btn"><X size={16}/></button></div><div className="space-y-3"><input className="field w-full" placeholder="Título da tarefa" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/><input className="field w-full" placeholder="Cliente / assunto" value={form.client} onChange={(e)=>setForm({...form,client:e.target.value})}/><select className="field w-full" value={form.owner} onChange={(e)=>setForm({...form,owner:e.target.value})}>{owners.map((x)=><option key={x}>{x}</option>)}</select><div className="grid grid-cols-2 gap-3"><input type="date" className="field w-full" value={form.date} onChange={(e)=>setForm({...form,date:e.target.value})}/><input type="time" className="field w-full" value={form.time} onChange={(e)=>setForm({...form,time:e.target.value})}/></div><select className="field w-full" value={form.priority} onChange={(e)=>setForm({...form,priority:e.target.value as Priority})}><option>Alta</option><option>Média</option><option>Baixa</option></select><textarea className="field w-full min-h-28 resize-none" placeholder="Observação" value={form.note} onChange={(e)=>setForm({...form,note:e.target.value})}/><button onClick={addTask} className="btn-primary w-full justify-center"><Plus size={15}/>Adicionar ao fluxo</button></div></div></div>}
    </main>
  </AppShell>;
}
