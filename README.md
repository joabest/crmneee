# MV CRM Consórcios — Dashboard

Dashboard de CRM construído com Next.js 14 (App Router) + TypeScript + Tailwind CSS + Recharts, replicando o layout enviado.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Build de produção

```bash
npm run build
npm start
```

## Estrutura

```
app/
  layout.tsx        -> layout raiz (fontes, metadata)
  page.tsx           -> página do dashboard (monta todos os componentes)
  globals.css         -> estilos globais + Tailwind
components/
  Sidebar.tsx          -> menu lateral
  Header.tsx            -> busca, notificações, perfil
  KpiCard.tsx           -> cards de indicadores (Valor em Propostas, Clientes, etc.)
  RankingTabs.tsx       -> abas Top Vendedores / Bancos / Clientes / Compras
  PerformanceChart.tsx  -> gráfico de área (Recharts) com tooltip customizado
  TopSellersList.tsx    -> ranking de vendedores
  InternalMessages.tsx  -> painel de mensagens internas com busca
  ProposalsTable.tsx    -> tabela de últimas propostas com status coloridos
lib/
  mock-data.ts          -> TODOS os dados mockados (edite aqui para trocar os dados)
  types.ts              -> tipos TypeScript
```

## Trocando os dados

Todos os dados exibidos (KPIs, gráfico, vendedores, mensagens, propostas, menu)
estão centralizados em `lib/mock-data.ts`. Basta editar os arrays lá para
substituir por dados reais — ou trocar por chamadas de API/fetch dentro dos
componentes futuramente.

## Próximos passos sugeridos

- Conectar a uma API real (REST/GraphQL) ou banco de dados
- Adicionar autenticação (NextAuth, Clerk, etc.)
- Implementar as páginas do menu lateral (Clientes, Propostas, Cotas, etc.)
- Adicionar filtros funcionais no seletor de datas
