"use client";

import { messages as initialMessages } from "@/lib/mock-data";
import { Search, Plus, Mail, Users, X, Send } from "lucide-react";
import { useMemo, useState } from "react";

export default function InternalMessages() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [compose, setCompose] = useState(false);
  const [recipient, setRecipient] = useState("Juliana Souza");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const filtered = useMemo(() => messages.filter((m) => m.name.toLowerCase().includes(query.toLowerCase())), [messages, query]);

  const send = () => {
    if (!body.trim()) return;
    setMessages((old) => [{ id: "new-" + Date.now(), name: recipient, avatar: "", time: "Agora", preview: body }, ...old]);
    setBody(""); setCompose(false); setSent(true);
    setTimeout(() => setSent(false), 2200);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 flex flex-col h-full min-h-[360px]">
        <div className="flex items-center justify-between mb-4">
          <div><h3 className="font-semibold text-ink">Mensagens Internas</h3><p className="text-[11px] text-gray-400 mt-0.5">Administração e equipe</p></div>
          <button onClick={()=>setCompose(true)} className="text-gray-400 hover:text-gray-600"><Plus size={18}/></button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar mensagens..." className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:outline-none" />
          </div>
          <button onClick={()=>setCompose(true)} className="w-9 h-9 shrink-0 rounded-lg bg-ink text-white flex items-center justify-center hover:bg-black"><Plus size={16}/></button>
        </div>

        <div className="flex-1 space-y-1 overflow-y-auto max-h-[255px]">
          {filtered.map((m) => (
            <button key={m.id} onClick={()=>alert(`${m.name}: ${m.preview}`)} className="w-full flex items-start gap-3 py-2 px-1 rounded-lg hover:bg-gray-50 text-left">
              {m.isGroup ? (
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0"><Users size={16} className="text-gray-500" /></div>
              ) : m.avatar ? (
                <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold shrink-0">{m.name.slice(0,2).toUpperCase()}</div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between"><p className="text-sm font-semibold text-ink truncate">{m.name}</p><span className="text-[11px] text-gray-400 shrink-0 ml-2">{m.time}</span></div>
                <div className="flex items-center justify-between"><p className="text-xs text-gray-500 truncate">{m.preview}</p>{m.unread && <span className="ml-2 shrink-0 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-semibold">{m.unread}</span>}</div>
              </div>
            </button>
          ))}
        </div>

        <button onClick={()=>setCompose(true)} className="mt-3 w-full flex items-center justify-center gap-2 bg-ink hover:bg-black text-white text-sm font-medium py-2.5 rounded-lg transition-colors"><Mail size={15}/>Nova Mensagem</button>
      </div>

      {sent && <div className="fixed bottom-5 right-5 z-[80] bg-ink text-white px-4 py-3 rounded-xl shadow-xl text-sm">Mensagem enviada no modo demonstrativo.</div>}

      {compose && (
        <div className="fixed inset-0 z-[70] bg-black/40 flex items-center justify-center p-4" onClick={()=>setCompose(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="font-semibold">Nova mensagem</h3><button onClick={()=>setCompose(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X size={18}/></button></div>
            <label className="text-xs text-gray-500">Destinatário</label>
            <select value={recipient} onChange={(e)=>setRecipient(e.target.value)} className="w-full mt-1 mb-3 border border-gray-200 rounded-lg px-3 py-2 text-sm">
              {["Juliana Souza","Marcos Lima","Renata Dias","Pedro Almeida","Equipe Comercial"].map((x)=><option key={x}>{x}</option>)}
            </select>
            <label className="text-xs text-gray-500">Mensagem</label>
            <textarea value={body} onChange={(e)=>setBody(e.target.value)} rows={5} placeholder="Digite sua mensagem..." className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ink/10"/>
            <button onClick={send} className="mt-3 w-full bg-ink text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2"><Send size={15}/>Enviar</button>
          </div>
        </div>
      )}
    </>
  );
}
