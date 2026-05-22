<#
.SYNOPSIS
    Script de inicializacao do Augustus Barbearia Template.

.DESCRIPTION
    Compila e/ou sobe o projeto em modo desenvolvimento ou producao local.

.PARAMETER Mode
    dev      (padrao) - Inicia o servidor de desenvolvimento com hot-reload.
    build    - Gera o export estatico em out/ (producao / Cloudflare Pages).
    preview  - Build + serve local do out/ (simula producao).

.PARAMETER Port
    Porta do servidor. Padrao: 3002

.PARAMETER Tier
    Plano de desenvolvimento: basic | normal | premium | superPremium.
    Atualiza NEXT_PUBLIC_DEV_PLAN_TIER em .env.development.local antes de iniciar.
    Requer restart (o valor e lido na inicializacao do servidor, nao por request).

.EXAMPLE
    .\augustus-start.ps1
    .\augustus-start.ps1 -Mode dev -Port 3003
    .\augustus-start.ps1 -Mode dev -Tier premium
    .\augustus-start.ps1 -Mode build
    .\augustus-start.ps1 -Mode preview
    .\augustus-start-basic.ps1
    .\augustus-start-superPremium.ps1
#>

[CmdletBinding()]
param(
    [ValidateSet("dev", "build", "preview")]
    [string]$Mode = "dev",

    [int]$Port = 3002,

    [ValidateSet("basic", "normal", "premium", "superPremium", "")]
    [string]$Tier = ""
)

# ---------------------------------------------------------------------------
# Garantir que o script sempre roda a partir do diretório correto
# ---------------------------------------------------------------------------
$ScriptDir = $PSScriptRoot
if (-not $ScriptDir) { $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
Set-Location $ScriptDir

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
function Write-Step { param([string]$Msg) Write-Host "`n» $Msg" -ForegroundColor Cyan }
function Write-Ok   { param([string]$Msg) Write-Host "  ✓ $Msg" -ForegroundColor Green }
function Write-Warn { param([string]$Msg) Write-Host "  ! $Msg" -ForegroundColor Yellow }
function Write-Fail { param([string]$Msg) Write-Host "  ✗ $Msg" -ForegroundColor Red }

function Stop-PortProcess {
    param([int]$P)
    $conns = Get-NetTCPConnection -LocalPort $P -ErrorAction SilentlyContinue
    if ($conns) {
        $conns | ForEach-Object {
            Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
        }
        Start-Sleep -Milliseconds 600
        Write-Ok "Processo na porta $P encerrado."
    }
}

function Remove-OutDir {
    if (-not (Test-Path ".\out")) { return }
    Write-Step "Limpando diretório out/ ..."
    # Remove atributo somente-leitura que o next build aplica nos arquivos
    attrib -R ".\out\*" /S /D 2>$null
    cmd /c "rmdir /S /Q .\out" 2>$null
    if (Test-Path ".\out") {
        # Última tentativa: renomear e deixar o SO limpar depois
        $stamp = Get-Date -Format "yyyyMMddHHmmss"
        Rename-Item ".\out" ".\out_$stamp" -ErrorAction SilentlyContinue
        Write-Warn "out/ renomeado para out_$stamp (locks do SO). Será limpo no próximo reinício."
    } else {
        Write-Ok "out/ removido."
    }
}

# ---------------------------------------------------------------------------
# Cabeçalho
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "╔══════════════════════════════════════════╗" -ForegroundColor DarkCyan
Write-Host "║   Augustus Barbearia — Start Script      ║" -ForegroundColor DarkCyan
Write-Host "╚══════════════════════════════════════════╝" -ForegroundColor DarkCyan
Write-Host "  Modo  : $Mode" -ForegroundColor White
Write-Host "  Dir   : $ScriptDir" -ForegroundColor White
if ($Mode -ne "build") {
    Write-Host "  Porta : $Port" -ForegroundColor White
}
if ($Tier -and $Mode -eq "dev") {
    Write-Host "  Plano : $Tier" -ForegroundColor Magenta
}
Write-Host ""

# ---------------------------------------------------------------------------
# Verificar pnpm
# ---------------------------------------------------------------------------
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Fail "pnpm não encontrado. Instale com: npm install -g pnpm"
    exit 1
}

# ---------------------------------------------------------------------------
# Modo DEV
# ---------------------------------------------------------------------------
if ($Mode -eq "dev") {
    Write-Step "Parando processo na porta $Port (se houver) ..."
    Stop-PortProcess -P $Port

    # ---------------------------------------------------------------------------
    # Atualizar tier no .env.development.local (requer restart para ter efeito)
    # NEXT_PUBLIC_DEV_PLAN_TIER e lido na inicializacao do servidor, nao por request.
    # A rota /api/dev/set-plan (cookie) nao funciona com output:'export' + force-static.
    # ---------------------------------------------------------------------------
    if ($Tier) {
        $envFile = Join-Path $ScriptDir ".env.development.local"
        if (Test-Path $envFile) {
            (Get-Content $envFile) | ForEach-Object {
                $_ -replace '^NEXT_PUBLIC_DEV_PLAN_TIER=.*', "NEXT_PUBLIC_DEV_PLAN_TIER=$Tier"
            } | Set-Content $envFile
            Write-Ok "Plano definido: NEXT_PUBLIC_DEV_PLAN_TIER=$Tier"
        } else {
            Write-Warn ".env.development.local nao encontrado — tier '$Tier' nao aplicado."
        }
    }

    Write-Step "Iniciando servidor de desenvolvimento (Turbopack) na porta $Port ..."
    Write-Host "  → http://localhost:$Port" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Trocar tier (requer restart — use os scripts dedicados ou -Tier):" -ForegroundColor DarkGray
    Write-Host "  .\augustus-start-basic.ps1" -ForegroundColor DarkGray
    Write-Host "  .\augustus-start-normal.ps1" -ForegroundColor DarkGray
    Write-Host "  .\augustus-start-premium.ps1" -ForegroundColor DarkGray
    Write-Host "  .\augustus-start-superPremium.ps1" -ForegroundColor DarkGray
    Write-Host "  Ou: .\augustus-start.ps1 -Tier premium" -ForegroundColor DarkGray
    Write-Host ""

    pnpm exec next dev --turbopack --port $Port
    exit $LASTEXITCODE
}

# ---------------------------------------------------------------------------
# Modo BUILD (e BASE do PREVIEW)
# ---------------------------------------------------------------------------
if ($Mode -eq "build" -or $Mode -eq "preview") {
    Remove-OutDir

    Write-Step "Executando pnpm build ..."
    pnpm build
    $buildCode = $LASTEXITCODE

    if ($buildCode -ne 0) {
        Write-Fail "Build falhou (exit $buildCode)."
        exit $buildCode
    }
    Write-Ok "Build concluído. Arquivos estáticos em out/"
}

# ---------------------------------------------------------------------------
# Modo PREVIEW — serve o out/ localmente
# ---------------------------------------------------------------------------
if ($Mode -eq "preview") {
    Write-Step "Parando processo na porta $Port (se houver) ..."
    Stop-PortProcess -P $Port

    Write-Step "Servindo out/ na porta $Port ..."
    Write-Host "  → http://localhost:$Port" -ForegroundColor Yellow
    Write-Host ""

    # Usa 'serve' (npx) — instalado automaticamente se não existir
    npx serve out --listen $Port --no-clipboard
    exit $LASTEXITCODE
}
