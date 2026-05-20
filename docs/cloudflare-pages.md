# Deploy no Cloudflare Pages

Este projeto esta preparado para deploy via Cloudflare Pages como site estatico gerado pelo Next.js.

## 1) Pre-requisitos

- Conta Cloudflare conectada ao GitHub
- Projeto no GitHub: `masilvaarcs/augustus-barbearia-site`
- Node.js LTS 20.x

## 2) Configuracao no Cloudflare Pages

- Framework preset: `Next.js (Static HTML Export)` ou `None`
- Build command: `pnpm cf:pages:build`
- Build output directory: `out`
- Root directory: `augustus-template` (se o repositório tiver pasta raiz diferente)

## 3) Variaveis recomendadas

- `NODE_VERSION=20`
- `NPM_CONFIG_UPDATE_NOTIFIER=false`

## 4) Scripts locais uteis

- `pnpm cf:pages:build` - gera output estatico em `out`
- `pnpm cf:pages:dev` - simula ambiente Pages localmente
- `pnpm cf:pages:deploy` - deploy manual via Wrangler (opcional)

## 5) Fluxo sugerido

1. Rodar `pnpm test` localmente
2. Commitar alteracoes
3. Push para branch principal
4. Cloudflare Pages gera preview e producao automaticamente

## 6) Limites free tier

Quando houver incerteza de trafego/viralizacao, Cloudflare Pages costuma ser uma opcao mais resiliente para distribuicao global no plano gratuito.
Mesmo assim, monitore mensalmente:

- build minutes
- requests/bandwidth
- limites de funcoes edge
