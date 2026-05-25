# Elegância Barbearia Website

Landing page oficial da Elegância Barbearia, desenvolvida com foco em conversão, identidade premium e experiência mobile-first.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Playwright](https://img.shields.io/badge/E2E-Playwright-45ba4b?logo=playwright)
![Vitest](https://img.shields.io/badge/Unit-Vitest-6E9F18?logo=vitest)

## Visão geral

Este projeto transforma o template base em um site comercial real da barbearia, utilizando materiais públicos do cliente (logo, endereço, contato, galeria de cortes e QR code).

Principais objetivos:

- reforçar a marca com visual premium (preto + dourado)
- facilitar agendamento por WhatsApp e Instagram
- manter navegação clara em celular e desktop
- preparar base para deploy em ambiente de produção

## Modelo replicável para outros clientes (sem banco)

Este repositório funciona como base multi-cliente, sem dependência de banco de dados.
Os dados de cada cliente ficam em arquivo TypeScript + imagens estáticas.

Como replicar para um novo cliente:

1. gerar perfil:

```bash
pnpm create:client nome-do-cliente
```

1. editar dados comerciais e de marca em:

`app/lib/clients/nome-do-cliente.ts`

1. enviar imagens para:

`public/images/nome-do-cliente/`

1. ativar via ambiente:

```bash
NEXT_PUBLIC_CLIENT_ID=nome-do-cliente
```

Isso permite clonar, personalizar e publicar vários projetos sem reescrever layout ou fluxo de contato.

## Planos comerciais por cliente (Basic, Normal, Premium, SuperPremium)

Cada cliente pode declarar o plano direto no próprio perfil em `app/lib/clients/<cliente>.ts`:

```ts
plan: {
   tier: "basic" | "normal" | "premium" | "superPremium",
   modules: {
      bookingCta: false,
      whatsappCta: true,
      premiumConcierge: false,
   },
   limits: {
      galleryRealMaxItems: 3,
   },
}

theme: {
   mode: "randomOnLoad" | "fixed",
   fixedVariantId: "ember-bronze",
   // ou
   fixedVariantIndex: 0,
}
```

### Tabela de módulos por plano

| Módulo | Basic | Normal | Premium | SuperPremium |
| --- | :---: | :---: | :---: | :---: |
| Botão **Agendar** no header/hero | ✗ | ✗ | ✓ | ✓ |
| Botão **WhatsApp** no header/footer | ✗ | ✓ | ✓ | ✓ |
| Seção **Premium Concierge** | ✗ | ✗ | ✓ | ✓ |
| Galeria de cortes (máx. fotos reais) | 3 | 6 | 10 | 14 |
| Seções Serviços e Contato | ✓ | ✓ | ✓ | ✓ |

> Definido em `app/lib/elegancia-data.ts` → `PLAN_MODULE_DEFAULTS` e `PLAN_LIMIT_DEFAULTS`.
> Coberto por testes unitários em `tests/unit/elegancia-data.test.ts` (30 casos, todos os tiers).

### Comportamento dos módulos

| Chave | Efeito no site |
| --- | --- |
| `bookingCta` | Botão **Agendar** no header e no CTA do hero |
| `whatsappCta` | Botão **WhatsApp** no header, no CTA do hero e no rodapé |
| `premiumConcierge` | Seção de atendimento diferenciado na home |
| `gallery` | Seção de galeria de cortes |
| `services` | Seção de serviços |
| `contact` | Seção de contato e âncora na navegação |
| `limits.galleryRealMaxItems` | Número máximo de fotos reais exibidas na home |

### Regras de resolução do plano

- `tier` aplica o pacote padrão automaticamente
- `modules` e `limits` no perfil do cliente sobrescrevem apenas o que você declarar — o restante herda do tier
- Cliente sem `plan` declarado recebe **Basic** como fallback global
- Sobrescrita seletiva funciona: ex. `basic` com `modules: { whatsappCta: true }` mantém o restante do Basic intacto
- O tema segue a mesma lógica: `theme.mode = randomOnLoad` troca as cores a cada acesso; `fixed` fixa a paleta usando `fixedVariantId` ou `fixedVariantIndex`

### Controle seletivo apenas para DEV

Para testar planos pagos sem reiniciar o servidor, acesse a rota de desenvolvimento:

```text
http://localhost:3002/api/dev/set-plan?tier=normal
http://localhost:3002/api/dev/set-plan?tier=premium
http://localhost:3002/api/dev/set-plan?tier=superPremium
http://localhost:3002/api/dev/set-plan?tier=basic
```

A rota seta o cookie `_dev_plan`, redireciona para a home e o rodapé exibe o plano correto imediatamente — sem restart, sem rebuild.

Para limpar o override (volta ao perfil do cliente):

```text
http://localhost:3002/api/dev/set-plan
```

A rota retorna **404 em produção** (`NODE_ENV !== 'development'`).

Override de tema via `.env.development.local`:

```bash
NEXT_PUBLIC_DEV_THEME_MODE=randomOnLoad|fixed
NEXT_PUBLIC_DEV_THEME_FIXED_VARIANT_ID=ember-bronze
NEXT_PUBLIC_DEV_THEME_FIXED_VARIANT_INDEX=0
```

Esses overrides são aplicados somente em desenvolvimento e ignorados em produção.

## Variações automáticas do hero

O hero principal suporta 10 variações de cor e nitidez, com seleção aleatória no carregamento.
Cada acesso escolhe uma variação e aplica o mesmo clima visual no site inteiro (hero, fundos, blocos e destaques).

Para regenerar as variações do cliente ativo:

```bash
pnpm hero:variants -- -ClientId nome-do-cliente
```

Depois ajuste `heroThemeVariants` no perfil do cliente para casar paleta e glow com cada imagem.

## Fluxo mínimo para replicar + publicar na Cloudflare

1. Criar perfil do cliente:

```bash
pnpm create:client nome-do-cliente
```

1. Adicionar imagens em `public/images/nome-do-cliente/` e editar os dados em `app/lib/clients/nome-do-cliente.ts`.

1. Configurar variáveis no ambiente da Cloudflare Pages:
   `NEXT_PUBLIC_CLIENT_ID`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_PROD_PHONE`.

1. Publicar com:
   Build command: `pnpm cf:pages:build`
   Output directory: `out`

## Tecnologias utilizadas

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- AOS (animações de entrada)
- Playwright (testes E2E de navegação)
- Vitest (testes unitários de dados)

## Dados de referência e conteúdo público

Os dados visuais e de marca são sincronizados da pasta:

`../esquema-dados/dados`

Arquivos utilizados:

- logo da marca
- card de endereço e campanha
- QR code do Instagram
- galeria real de cortes
- imagem principal do atendimento

Todos os contatos exibidos no site são dados públicos do negócio.

## Como iniciar o projeto

Use o script `elegancia-start.ps1` na raiz do projeto:

```powershell
# Desenvolvimento - hot-reload, troca de plano sem restart
.\elegancia-start.ps1

# Porta customizada
.\elegancia-start.ps1 -Port 3003

# Build de produção — gera out/ para Cloudflare Pages
.\elegancia-start.ps1 -Mode build

# Preview - build + serve local do out/ (simula produção)
.\elegancia-start.ps1 -Mode preview
```

Os atalhos `elegancia-start-basic.ps1`, `elegancia-start-normal.ps1`, `elegancia-start-premium.ps1` e `elegancia-start-superPremium.ps1` apenas chamam o script principal com o tier correspondente.

O script mata automaticamente a porta em uso, limpa o `out/` (inclusive arquivos read-only gerados pelo Next.js) e exibe as URLs de troca de plano ao subir em modo `dev`.

## Estrutura relevante

```text
elegancia-barbearia-site/
├── app/
│   ├── (default)/page.tsx          # Landing page principal
│   ├── (auth)/signin/page.tsx      # Fluxo de agendamento
│   ├── (auth)/signup/page.tsx      # Cadastro de fidelidade
│   ├── (auth)/reset-password/page.tsx
│   ├── api/dev/set-plan/route.ts   # Override de plano via cookie (DEV only)
│   └── lib/
│       ├── elegancia-data.ts       # Resolve cliente ativo + getEleganciaData()
│       ├── version.ts              # Versão do site (APP_VERSION)
│       ├── client-types.ts         # Tipos de perfil
│       └── clients/                # Perfis de cada cliente
├── components/ui/
│   ├── header.tsx
│   ├── footer.tsx                   # Exibe badge Plano · versão
│   └── logo.tsx
├── public/images/elegancia/         # Assets reais sincronizados
├── elegancia-start.ps1              # Script de build e inicialização
├── docs/multi-client.md             # Playbook de replicação
├── scripts/create-client-profile.mjs # Gerador de perfil novo
├── scripts/sync-reference-data.ps1  # Script de sincronização dos dados
├── tests/
│   ├── unit/elegancia-data.test.ts   # 30 casos (todos os tiers e overrides)
│   └── e2e/navigation.spec.ts
├── playwright.config.ts
└── vitest.config.ts
```

## Política de versão Node.js

- padrão recomendado para Cloudflare Pages/Wrangler: Node.js LTS 22.x
- compatível com o projeto: 18.x ou superior
- evitar usar 20.x no deploy do Cloudflare porque o Wrangler atual exige Node 22+

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

O projeto seleciona automaticamente o número do WhatsApp conforme ambiente:

- desenvolvimento (`pnpm dev`): usa `NEXT_PUBLIC_WHATSAPP_DEV_PHONE` se estiver definido
- produção (build/deploy): usa `NEXT_PUBLIC_WHATSAPP_PROD_PHONE`

Arquivos de apoio:

- `.env.example` (modelo versionado)
- `.env.development.local` (local, ignorado no git)

Variáveis principais para modo multi-cliente:

- `NEXT_PUBLIC_CLIENT_ID` (qual perfil carregar)
- `NEXT_PUBLIC_SITE_URL` (URL canônica do cliente)

Para seu teste atual no aparelho, já deixamos:

- `NEXT_PUBLIC_WHATSAPP_DEV_PHONE=+5551984228067`

Quando for liberar para cliente em produção, configure no ambiente de deploy:

- `NEXT_PUBLIC_WHATSAPP_PROD_PHONE=<numero_do_cliente_em_formato_internacional>`

## Sincronização dos dados do cliente

Sempre que houver atualização na pasta de referência, rode:

```bash
pnpm sync:data
```

Esse script atualiza automaticamente os assets em `public/images/elegancia`.

## Scripts disponíveis

```bash
pnpm dev                # ambiente de desenvolvimento
pnpm build              # build de produção
pnpm start              # sobe app em modo produção
pnpm sync:data          # sincroniza assets da pasta de dados
pnpm hero:variants      # gera 10 variações do hero (aceita -ClientId e -SourceImage)
pnpm create:client      # gera perfil para novo cliente
pnpm test:unit          # testes unitários (Vitest)
pnpm test:e2e           # testes E2E (Playwright)
pnpm test:navigation    # foco na navegação do site
pnpm test               # fluxo completo: unit + build + e2e
```

## Testes e validações

O projeto contém testes para garantir estabilidade de navegação, consistência dos dados e correção do sistema de planos:

- Unitários (Vitest): valida dados obrigatórios da marca, estrutura de navegação e **todos os 4 planos comerciais** (Basic, Normal, Premium, SuperPremium) — 30 casos cobrindo módulos, limites de galeria, fallback e sobrescrita seletiva
- E2E (Playwright): valida todas as rotas principais e CTAs em desktop e mobile

Cobertura funcional validada:

- `/`
- `/signin`
- `/signup`
- `/reset-password`
- navegação por âncoras (`#servicos`, `#galeria`, `#contato`)

## Hospedagem recomendada

### Opção principal: Cloudflare Pages

- distribuição global com edge network
- boa relação custo x escala no plano gratuito
- integrado ao GitHub para deploy automático por branch

Configuração pronta neste projeto (site estático):

- build command: `pnpm cf:pages:build`
- output directory: `out`
- arquivo de configuração: `wrangler.toml`
- guia detalhado: `docs/cloudflare-pages.md`

## Segurança e dados

- nenhum segredo/senha foi incluído no projeto
- o conteúdo de contatos e endereço exibido é público e autorizado para uso no site

## Próximos passos sugeridos

- configurar analytics (GA4/Plausible)
- adicionar SEO local com schema.org (LocalBusiness)
- publicar primeira versão em ambiente de produção

<!-- markdownlint-disable MD012 -->

## VS Code: extensões recomendadas para Cloudflare

- `cloudflare.cloudflare-workers-bindings-extension`
- `codiium.wrangler`

As recomendações estão no workspace em `.vscode/extensions.json`.




