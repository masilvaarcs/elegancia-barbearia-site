# Deploy no Cloudflare Pages

Este projeto esta preparado para deploy via Cloudflare Pages como site estatico gerado pelo Next.js.
Nao utiliza base de dados: o conteudo vem de arquivos de perfil em `app/lib/clients` e imagens em `public/images/<cliente>`.

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
- `NEXT_PUBLIC_CLIENT_ID=<id-do-cliente>`
- `NEXT_PUBLIC_SITE_URL=https://dominio-do-cliente.com`
- `NEXT_PUBLIC_WHATSAPP_PROD_PHONE=55...`

## 4) Scripts locais uteis

- `pnpm cf:pages:build` - gera output estatico em `out`
- `pnpm cf:pages:dev` - simula ambiente Pages localmente
- `pnpm cf:pages:deploy` - deploy manual via Wrangler (opcional)

## 5) Fluxo sugerido

1. Rodar `pnpm create:client nome-do-cliente` (quando for novo cliente)
1. Ajustar `app/lib/clients/nome-do-cliente.ts` e imagens em `public/images/nome-do-cliente`
1. Rodar `pnpm test` localmente
1. Commitar alteracoes
1. Push para branch principal
1. Cloudflare Pages gera preview e producao automaticamente

## 6) Limites free tier

Quando houver incerteza de trafego/viralizacao, Cloudflare Pages costuma ser uma opcao mais resiliente para distribuicao global no plano gratuito.
Mesmo assim, monitore mensalmente:

- build minutes
- requests/bandwidth
- limites de funcoes edge
