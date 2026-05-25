<#
.SYNOPSIS
    Inicia o servidor de desenvolvimento com Plano Super Premium.
    Define NEXT_PUBLIC_DEV_PLAN_TIER=superPremium em .env.development.local e sobe o next dev.

.DESCRIPTION
    Plano Super Premium:
      - Servicos: SIM
      - Galeria: SIM (max 14 fotos)
      - Contato: SIM
      - WhatsApp CTA: SIM
      - Booking CTA: SIM
      - Premium Concierge: SIM
#>
& "$PSScriptRoot\elegancia-start.ps1" -Mode dev -Tier superPremium

