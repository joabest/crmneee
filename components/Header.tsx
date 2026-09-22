"use client";

import { Bell, Menu, Search, X, UserRound, Settings, LogOut, Mail, FileText, Upload, Pencil } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { clients, proposals } from "@/lib/mock-data";

type Profile = { name:string; role:string; email:string };

export default function Header({ onMenu }: { onMenu?: () => void }) {
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState<Profile>({name:"Margareth Souza",role:"Administrador",email:"daniel@mvcrm.com.br"});
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved=localStorage.getItem("mvcrm-profile");
      if(saved) {\n        const parsed = JSON.parse(saved);\n        if (parsed?.name === "Daniel Vorcaro") parsed.name = "Margareth Souza";\n        setProfile(parsed);\n      }
    } catch {}
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const clientResults = clients
      .filter((c) => [c.name, c.cpf, c.phone, c.email].some((x) => x.toLowerCase().includes(q)))
      .slice(0, 4)
      .map((c) => ({ title: c.name, subtitle: `${c.id} · ${c.phone}`, href: "/clientes" }));
    const proposalResults = proposals
      .filter((p) => [p.id, p.client, p.bank, p.seller].some((x) => x.toLowerCase().includes(q)))
      .slice(0, 3)
      .map((p) => ({ title: "Nº " + p.id + " · " + p.client, subtitle: `${p.bank} · ${p.creditValue}`, href: "/propostas" }));
    return [...clientResults, ...proposalResults];
  }, [query]);

  const go=(href:string)=>{setNotifications(false);setProfileOpen(false);router.push(href)};

  const saveProfile=()=>{
    localStorage.setItem("mvcrm-profile",JSON.stringify(profile));
    setEditProfile(false);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3.5 bg-bg/95 backdrop-blur border-b border-gray-200/70">
        <button onClick={onMenu} className="lg:hidden w-10 h-10 rounded-xl bg-white border border-gray-200 grid place-items-center" aria-label="Abrir menu">
          <Menu size={19} />
        </button>

        <div className="flex-1 max-w-xl relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar clientes, propostas, cotas..."
            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-14 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ink/10"
          />
          {query ? (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={16}/></button>
          ) : (
            <kbd className="hidden sm:block absolute right-3 top-1/2 -translate-y-1/2 text-[11px] bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-500">⌘ K</kbd>
          )}

          {query.trim().length >= 2 && (
            <div className="absolute left-0 right-0 top-[48px] bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
              {results.length ? results.map((r, i) => (
                <button key={i} onClick={() => { setQuery(""); router.push(r.href); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 border-gray-100">
                  <p className="text-sm font-semibold text-ink">{r.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.subtitle}</p>
                </button>
              )) : <p className="px-4 py-4 text-sm text-gray-500">Nenhum resultado encontrado.</p>}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <div className="relative">
            <button onClick={() => {setNotifications((v) => !v);setProfileOpen(false)}} className="relative w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50" aria-label="Notificações">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            {notifications && (
              <div className="absolute right-0 mt-2 w-[310px] bg-white rounded-xl border border-gray-200 shadow-xl p-2 z-50">
                <p className="font-semibold text-sm px-2 py-2">Notificações</p>
                <button onClick={()=>go("/propostas")} className="w-full flex items-start gap-3 text-left px-2 py-2.5 rounded-lg hover:bg-gray-50"><FileText size={16} className="mt-0.5"/><div><p className="text-xs font-semibold">3 propostas aguardam análise</p><p className="text-[11px] text-gray-400 mt-0.5">Clique para abrir Propostas</p></div></button>
                <button onClick={()=>go("/mensagens?thread=em1")} className="w-full flex items-start gap-3 text-left px-2 py-2.5 rounded-lg hover:bg-gray-50"><Mail size={16} className="mt-0.5"/><div><p className="text-xs font-semibold">Nova mensagem de Juliana Souza</p><p className="text-[11px] text-gray-400 mt-0.5">Abrir mensagem completa</p></div></button>
                <button onClick={()=>go("/importar-planilha")} className="w-full flex items-start gap-3 text-left px-2 py-2.5 rounded-lg hover:bg-gray-50"><Upload size={16} className="mt-0.5"/><div><p className="text-xs font-semibold">Base importada com 18 duplicados</p><p className="text-[11px] text-gray-400 mt-0.5">Revisar importação</p></div></button>
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={()=>{setProfileOpen((v)=>!v);setNotifications(false)}} className="flex items-center gap-3 rounded-xl hover:bg-white/80 p-1.5 -m-1.5 text-left">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fd/Daniel_Vorcaro_-_2024_%28cropped%29.jpg" alt="Foto do administrador" loading="eager" className="w-10 h-10 rounded-full object-cover object-top border border-gray-200" />
              <div className="leading-tight hidden md:block">
                <p className="text-sm font-semibold text-ink">{profile.name}</p>
                <p className="text-xs text-gray-500">{profile.role} • MV CRM</p>
              </div>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-xl p-2 z-50">
                <div className="px-3 py-2 border-b border-gray-100 mb-1"><p className="text-sm font-semibold">{profile.name}</p><p className="text-xs text-gray-400 mt-0.5">{profile.email}</p></div>
                <button onClick={()=>{setProfileOpen(false);setEditProfile(true)}} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"><Pencil size={15}/>Editar perfil</button>
                <button onClick={()=>go("/configuracoes")} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"><Settings size={15}/>Configurações</button>
                <button onClick={()=>alert("Logout simulado: não há autenticação neste front-end.")} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-red-600"><LogOut size={15}/>Sair</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {editProfile && (
        <div className="fixed inset-0 z-[90] bg-black/40 flex items-center justify-center p-4" onClick={()=>setEditProfile(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-5" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-ink text-white grid place-items-center"><UserRound size={18}/></div><div><h3 className="font-bold">Editar perfil</h3><p className="text-xs text-gray-400">Dados salvos apenas neste navegador</p></div></div><button onClick={()=>setEditProfile(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={18}/></button></div>
            <div className="space-y-3"><div><label className="label">Nome</label><input className="field w-full" value={profile.name} onChange={(e)=>setProfile({...profile,name:e.target.value})}/></div><div><label className="label">Cargo</label><input className="field w-full" value={profile.role} onChange={(e)=>setProfile({...profile,role:e.target.value})}/></div><div><label className="label">E-mail</label><input className="field w-full" value={profile.email} onChange={(e)=>setProfile({...profile,email:e.target.value})}/></div><button onClick={saveProfile} className="btn-primary w-full justify-center">Salvar alterações</button></div>
          </div>
        </div>
      )}
    </>
  );
}
