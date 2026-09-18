# MV CRM Consórcios

Front-end completo e responsivo do MV CRM, construído com Next.js 14 + TypeScript + Tailwind CSS + Recharts.

## Recursos implementados

- Visão Geral com KPIs, gráfico e período filtrável
- Top Vendedores / Top Bancos / Top Clientes / Top Compras
- Clientes com busca, filtro, cadastro local e exportação
- Propostas com busca, filtros, personalização de colunas, exportação e detalhes
- Cotas com progresso de parcelas e filtro de status
- Atendimentos em funil com alteração de etapa
- Vendedores com busca e ordenação
- Bancos / Administradoras com ranking e ordenação
- Compras com busca, filtros e exportação
- Mensagens internas entre administração e equipe
- Relatórios com filtro mensal/trimestral e exportação
- Importação de planilha em modo demonstrativo (CSV com prévia real; XLS/XLSX com prévia simulada)
- Configurações persistidas no localStorage
- Suporte por WhatsApp: (11) 99277-9039
- Menu mobile com drawer
- Layout adaptado para desktop, tablet e celular

## Dados

O projeto é somente front-end. Todos os dados são simulados e ficam em `lib/mock-data.ts`.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm start
```

## Vercel

O projeto usa Next.js padrão e não precisa de configuração especial. Importe o repositório na Vercel e use a branch `test`.

- Framework Preset: Next.js
- Install Command: padrão
- Build Command: `npm run build`
- Output: automático do Next.js

## Rotas

- `/`
- `/clientes`
- `/propostas`
- `/cotas`
- `/atendimentos`
- `/vendedores`
- `/bancos`
- `/compras`
- `/mensagens`
- `/relatorios`
- `/importar-planilha`
- `/configuracoes`
- `/suporte`
