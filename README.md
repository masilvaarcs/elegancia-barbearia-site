# Augustu's Barbearia Website

Landing page oficial da Augustu's Barbearia, desenvolvida com foco em conversao, identidade premium e experiencia mobile-first.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Playwright](https://img.shields.io/badge/E2E-Playwright-45ba4b?logo=playwright)
![Vitest](https://img.shields.io/badge/Unit-Vitest-6E9F18?logo=vitest)

## Visao geral

Este projeto transforma o template base em um site comercial real da barbearia, utilizando materiais publicos do cliente (logo, endereco, contato, galeria de cortes e QR code).

Principais objetivos:

- reforcar a marca com visual premium (preto + dourado)
- facilitar agendamento por WhatsApp e Instagram
- manter navegacao clara em celular e desktop
- preparar base para deploy em ambiente de producao

## Tecnologias utilizadas

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- AOS (animacoes de entrada)
- Playwright (testes E2E de navegacao)
- Vitest (testes unitarios de dados)

## Dados de referencia e conteudo publico

Os dados visuais e de marca sao sincronizados da pasta:

`../esquema-dados/dados`

Arquivos utilizados:

- logo da marca
- card de endereco e campanha
- QR code do Instagram
- galeria real de cortes
- imagem principal do atendimento

Todos os contatos exibidos no site sao dados publicos do negocio.

## Estrutura relevante

```text
augustus-template/
├── app/
│   ├── (default)/page.tsx          # Landing page principal
│   ├── (auth)/signin/page.tsx      # Fluxo de agendamento
│   ├── (auth)/signup/page.tsx      # Cadastro de fidelidade
│   ├── (auth)/reset-password/page.tsx
│   └── lib/augustus-data.ts        # Fonte unica de dados publicos
├── components/ui/
│   ├── header.tsx
│   ├── footer.tsx
│   └── logo.tsx
├── public/images/augustus/          # Assets reais sincronizados
├── scripts/sync-reference-data.ps1  # Script de sincronizacao dos dados
├── tests/
│   ├── unit/augustus-data.test.ts
│   └── e2e/navigation.spec.ts
├── playwright.config.ts
└── vitest.config.ts
```

## Politica de versao Node.js

- padrao recomendado: Node.js LTS 20.x
- compativel: 18.x
- evitar: 22.x (para reduzir incompatibilidades)

Arquivos de apoio:

- `.nvmrc`
- `.node-version`

## Como executar localmente

```bash
corepack enable
corepack prepare pnpm@10.15.1 --activate
pnpm install
pnpm dev
```

Acesse:

`http://localhost:3000`

## WhatsApp por ambiente (dev/prod)

O projeto seleciona automaticamente o numero do WhatsApp conforme ambiente:

- desenvolvimento (`pnpm dev`): usa `NEXT_PUBLIC_WHATSAPP_DEV_PHONE` se estiver definido
- producao (build/deploy): usa `NEXT_PUBLIC_WHATSAPP_PROD_PHONE`

Arquivos de apoio:

- `.env.example` (modelo versionado)
- `.env.development.local` (local, ignorado no git)

Para seu teste atual no aparelho, ja deixamos:

- `NEXT_PUBLIC_WHATSAPP_DEV_PHONE=+5551984228067`

Quando for liberar para cliente em producao, configure no ambiente de deploy:

- `NEXT_PUBLIC_WHATSAPP_PROD_PHONE=<numero_do_cliente_em_formato_internacional>`

## Sincronizacao dos dados do cliente

Sempre que houver atualizacao na pasta de referencia, rode:

```bash
pnpm sync:data
```

Esse script atualiza automaticamente os assets em `public/images/augustus`.

## Scripts disponiveis

```bash
pnpm dev                # ambiente de desenvolvimento
pnpm build              # build de producao
pnpm start              # sobe app em modo producao
pnpm sync:data          # sincroniza assets da pasta de dados
pnpm test:unit          # testes unitarios (Vitest)
pnpm test:e2e           # testes E2E (Playwright)
pnpm test:navigation    # foco na navegacao do site
pnpm test               # fluxo completo: unit + build + e2e
```

## Testes e validacoes

O projeto contem testes para garantir estabilidade de navegacao e consistencia dos dados:

- Unitarios (Vitest): valida dados obrigatorios da marca e estrutura de navegacao
- E2E (Playwright): valida todas as rotas principais e CTAs em desktop e mobile

Cobertura funcional validada:

- `/`
- `/signin`
- `/signup`
- `/reset-password`
- navegacao por ancoras (`#servicos`, `#galeria`, `#contato`)

## Hospedagem recomendada

### Opcao 1 (recomendada para trafego incerto): Cloudflare Pages

- distribuicao global com edge network
- boa relacao custo x escala no plano gratuito
- integrado ao GitHub para deploy automatico por branch

Configuracao pronta neste projeto (site estatico):

- build command: `pnpm cf:pages:build`
- output directory: `out`
- arquivo de configuracao: `wrangler.toml`
- guia detalhado: `docs/cloudflare-pages.md`

### Opcao 2 (mais rapida): Vercel

- deploy nativo para Next.js
- SSL automatico
- preview por branch

### Opcao 3: Netlify

- boa para frontend com pipeline simples
- build e deploy automaticos por Git

### Opcao 4: Railway

- deploy com runtime Node em poucos passos
- bom para evoluir para stack full (com backend futuro)

### Opcao 5: VPS (Docker + Nginx)

- maior controle de infraestrutura
- recomendado quando quiser padronizar varios clientes em um servidor proprio

## Seguranca e dados

- nenhum segredo/senha foi incluido no projeto
- o conteudo de contatos e endereco exibido e publico e autorizado para uso no site

## Proximos passos sugeridos

- integrar formulario com backend/CRM de agendamento
- configurar analytics (GA4/Plausible)
- adicionar SEO local com schema.org (LocalBusiness)
- publicar primeira versao em ambiente de producao

## VS Code: extensoes recomendadas para Cloudflare

- `cloudflare.cloudflare-workers-bindings-extension`
- `codiium.wrangler`

As recomendacoes estao no workspace em `.vscode/extensions.json`.
