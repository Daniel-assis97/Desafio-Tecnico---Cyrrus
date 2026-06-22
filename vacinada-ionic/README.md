# Vacinada+ — Acompanhamento da vacinação infantil

Aplicação **Ionic Framework + Angular (standalone, Angular 18)** para pais e
responsáveis acompanharem a jornada de vacinação das crianças — uma carteira
de vacinação digital.

## ✅ Requisitos atendidos

- **Acompanhamento de crianças** — múltiplos filhos, cada um com perfil próprio.
- **Informações das vacinas** — catálogo do calendário nacional (idade, doses, proteção).
- **Histórico vacinal** — datas de aplicação, local e dose de cada vacina.
- **Campanhas de vacinação** — campanhas ativas com público-alvo, período e local.
- **Situação vacinal** — status por cor de cada criança e progresso geral.

### Cenários

1. **Vacinas previstas x realizadas** — filtros *Atenção / Aplicadas / Todas* e badges de status.
2. **Vacina vencida** — destacada como **Em atraso** (laranja) com aviso de pendência.
3. **Campanha ativa** — aba *Campanhas* e destaque na *Início*.
4. **Mais de um filho** — cada criança é acompanhada individualmente, sem misturar históricos.

## 🎨 Paleta obrigatória

`#ABC270` · `#FEC868` · `#FDA769` · `#473C33`
Definida em `src/theme/variables.scss`.

## 🧩 Estrutura

```
src/
  app/
    models/        Tipos (Child, VaccineInfo, Campaign, ...)
    data/          Dados mock (calendário, crianças, campanhas)
    utils/         Cálculo de status, idade, formatação
    services/      VaccineService (camada de dados — trocável por API HTTP)
    components/    child-card, campaign-card, status-badge, progress-ring
    pages/         tabs, home, child-detail, vaccines, campaigns
    app.routes.ts  Rotas (abas + detalhe da criança)
  theme/variables.scss   Paleta + tema Ionic
  global.scss            Estilos globais
```

## 🚀 Como rodar

Pré-requisitos: Node.js 18+ e npm.

```bash
npm install
npm install -g @ionic/cli   # opcional

npm start          # ou: ionic serve  /  ng serve
# abre em http://localhost:4200  (ionic serve usa 8100)
```

Build de produção:

```bash
npm run build      # gera a pasta www/
```

## 📱 Responsividade

Layout mobile-first com Ionic (tab bar inferior) e contêiner central com
largura máxima + grids de 2 colunas a partir de 720px, cobrindo mobile,
tablet e desktop.

## 🔌 Próximos passos sugeridos

- Trocar `VaccineService` (dados mock) por chamadas HTTP a uma API real.
- Persistência local com Capacitor Preferences / SQLite.
- Autenticação do responsável e cadastro de novas crianças/doses.

> Conteúdo das vacinas baseado no Programa Nacional de Imunizações (PNI).
> Material informativo — siga sempre a orientação de um profissional de saúde.
