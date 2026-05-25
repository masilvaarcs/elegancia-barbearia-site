# Multi-Client Playbook (sem banco)

Este projeto foi preparado para replicação rápida para vários clientes sem base de dados.

## Objetivo

- trocar cliente por configuração de ambiente
- trocar cores e imagens sem refatorar layout
- publicar facilmente na Cloudflare Pages

## Como criar um novo cliente

1. Gerar perfil novo:

```bash
pnpm create:client nome-do-cliente
```

2. Editar dados do cliente no arquivo gerado:

- `app/lib/clients/nome-do-cliente.ts`

3. Colocar imagens do cliente em:

- `public/images/nome-do-cliente/`

Arquivos esperados no perfil:

- `hero-principal.jpg`
- `brand-logo-card.jpeg`
- `brand-address-card.jpeg`
- `instagram-qrcode.jpeg`
- `gallery-01.jpeg` até `gallery-05.jpeg`

4. Ativar o cliente no ambiente:

```bash
NEXT_PUBLIC_CLIENT_ID=nome-do-cliente
```

5. Rodar local:

```bash
pnpm dev
```

## Configuração de ambiente recomendada

- `NEXT_PUBLIC_CLIENT_ID`: qual perfil carregar
- `NEXT_PUBLIC_SITE_URL`: domínio público do cliente
- `NEXT_PUBLIC_WHATSAPP_DEV_PHONE`: telefone de teste (somente desenvolvimento)
- `NEXT_PUBLIC_WHATSAPP_PROD_PHONE`: telefone final de produção

## Planos comerciais (Basic, Normal, Premium, SuperPremium)

Cada cliente declara o plano no próprio perfil em `app/lib/clients/<cliente>.ts`.
O sistema resolve os módulos e limites automaticamente a partir do `tier` escolhido.

### Tabela de módulos por plano

| Módulo | Basic | Normal | Premium | SuperPremium |
|---|:---:|:---:|:---:|:---:|
| Botão **Agendar** no header/hero | ✗ | ✗ | ✓ | ✓ |
| Botão **WhatsApp** no header/footer | ✗ | ✓ | ✓ | ✓ |
| Seção **Premium Concierge** | ✗ | ✗ | ✓ | ✓ |
| Galeria de cortes (máx. fotos reais) | 3 | 6 | 10 | 14 |
| Seções Serviços e Contato | ✓ | ✓ | ✓ | ✓ |

> Padrões definidos em `app/lib/elegancia-data.ts` → `PLAN_MODULE_DEFAULTS` e `PLAN_LIMIT_DEFAULTS`.
> Coberto por 30 testes unitários em `tests/unit/elegancia-data.test.ts`.

### Comportamento dos módulos

| Chave | Efeito no site |
|---|---|
| `bookingCta` | Botão **Agendar** no header e no CTA do hero |
| `whatsappCta` | Botão **WhatsApp** no header, no CTA do hero e no rodapé |
| `premiumConcierge` | Seção de atendimento diferenciado na home |
| `gallery` | Seção de galeria de cortes |
| `services` | Seção de serviços |
| `contact` | Seção de contato e âncora na navegação |
| `limits.galleryRealMaxItems` | Número máximo de fotos reais exibidas na home |

### Como declarar o plano no perfil do cliente

```ts
// app/lib/clients/nome-do-cliente.ts
plan: {
  // Troque entre: "basic" | "normal" | "premium" | "superPremium"
  tier: "basic",

  // Opcional: sobrescreve módulos específicos sem alterar o restante do tier
  // modules: { whatsappCta: true },

  // Opcional: sobrescreve o limite de fotos da galeria
  // limits: { galleryRealMaxItems: 4 },
},
```

### Regras de resolução do plano

- `tier` aplica o pacote padrão automaticamente
- `modules` e `limits` sobrescrevem apenas o que você declarar — o restante herda do tier
- Cliente sem `plan` declarado recebe **Basic** como fallback global
- Sobrescrita seletiva funciona: ex. `basic` com `modules: { whatsappCta: true }` mantém o restante do Basic intacto

### Override de plano apenas para DEV (nunca exposto em produção)

Para testar planos pagos em desenvolvimento **sem reiniciar o servidor**, use a rota de API de desenvolvimento:

```
http://localhost:3002/api/dev/set-plan?tier=normal
http://localhost:3002/api/dev/set-plan?tier=premium
http://localhost:3002/api/dev/set-plan?tier=superPremium
http://localhost:3002/api/dev/set-plan?tier=basic
```

A rota seta o cookie `_dev_plan`, redireciona para a home e **o footer já exibe o plano correto imediatamente** — sem restart, sem rebuild.

Para resetar o override (voltar ao perfil do cliente), acesse sem o parâmetro `tier`:

```
http://localhost:3002/api/dev/set-plan
```

A rota retorna **404 em produção** (`NODE_ENV !== 'development'`).

> **Override via variável de ambiente (legacy):** ainda funciona via `.env.development.local` com
> `NEXT_PUBLIC_DEV_PLAN_TIER=premium`, mas exige restart do servidor. O mecanismo de cookie tem
> prioridade sobre a variável de ambiente quando ambos estiverem definidos.

**Override de tema via `.env.development.local`:**

```bash
# Simula modo de tema fixo ou aleatório
NEXT_PUBLIC_DEV_THEME_MODE=randomOnLoad|fixed
NEXT_PUBLIC_DEV_THEME_FIXED_VARIANT_ID=ember-bronze
NEXT_PUBLIC_DEV_THEME_FIXED_VARIANT_INDEX=0
```

Esses overrides são ignorados automaticamente quando `NODE_ENV` não é `development`.

## Variações de tema por cliente

Cada cliente pode ter paleta e imagem do hero fixas ou aleatórias a cada acesso:

```ts
theme: {
  mode: "randomOnLoad", // troca a cada carregamento
  // mode: "fixed",
  // fixedVariantId: "ember-bronze",  // por nome da variante
  // fixedVariantIndex: 0,            // por índice (0-based)
},
```

Para gerar as variações de hero de um cliente:

```bash
pnpm hero:variants -- -ClientId nome-do-cliente
```

## Deploy Cloudflare Pages

Build para Cloudflare já está pronto neste projeto.

- Build command: `pnpm cf:pages:build`
- Output directory: `out`

No painel da Cloudflare Pages, configure as variáveis de ambiente para cada projeto/cliente:

- `NEXT_PUBLIC_CLIENT_ID`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_PROD_PHONE`

Com isso, você pode manter um repositório base e publicar um site diferente por cliente sem alterar arquitetura e sem usar banco.

