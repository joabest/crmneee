"use client";

import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip,
  XAxis, YAxis, Legend
} from "recharts";

export default function ReportsCharts({
  performance,
  banks,
}: {
  performance: {month:string;propostas:number;vendas:number}[];
  banks: {name:string;sales:number;value:number}[];
}) {
  const shortBanks=banks.slice(0,6).map((b)=>({name:b.name.split(" ")[0],vendas:b.sales,valor:Math.round(b.value/1000)}));
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <div className="panel">
        <div className="mb-4"><h3 className="font-semibold">Evolução comercial</h3><p className="text-xs text-gray-400 mt-1">Propostas e vendas no período selecionado</p></div>
        <div className="h-[300px] sm:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performance} margin={{top:10,right:10,left:-10,bottom:0}}>
              <defs>
                <linearGradient id="rProp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#111827" stopOpacity={0.22}/><stop offset="100%" stopColor="#111827" stopOpacity={0}/></linearGradient>
                <linearGradient id="rVenda" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#64748b" stopOpacity={0.24}/><stop offset="100%" stopColor="#64748b" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#eef0f3"/>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize:11,fill:"#94a3b8"}}/>
              <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:"#94a3b8"}} tickFormatter={(v)=>`R$ ${Math.round(v/1000)}k`}/>
              <Tooltip formatter={(v:any)=>Number(v).toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0})}/>
              <Legend iconType="circle" wrapperStyle={{fontSize:12}}/>
              <Area type="monotone" dataKey="propostas" name="Propostas" stroke="#111827" strokeWidth={2.4} fill="url(#rProp)"/>
              <Area type="monotone" dataKey="vendas" name="Vendas" stroke="#64748b" strokeWidth={2.4} fill="url(#rVenda)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="panel">
        <div className="mb-4"><h3 className="font-semibold">Performance por banco</h3><p className="text-xs text-gray-400 mt-1">Vendas e valor em milhares de reais</p></div>
        <div className="h-[300px] sm:h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shortBanks} margin={{top:10,right:10,left:-10,bottom:0}}>
              <CartesianGrid vertical={false} stroke="#eef0f3"/>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:11,fill:"#94a3b8"}}/>
              <YAxis axisLine={false} tickLine={false} tick={{fontSize:11,fill:"#94a3b8"}}/>
              <Tooltip/>
              <Legend iconType="circle" wrapperStyle={{fontSize:12}}/>
              <Bar dataKey="vendas" name="Vendas" fill="#111827" radius={[5,5,0,0]}/>
              <Bar dataKey="valor" name="Valor (R$ mil)" fill="#cbd5e1" radius={[5,5,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
