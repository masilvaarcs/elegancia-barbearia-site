<#
.SYNOPSIS
    Inicia o servidor de desenvolvimento com Plano Premium.
    Define NEXT_PUBLIC_DEV_PLAN_TIER=premium em .env.development.local e sobe o next dev.

.DESCRIPTION
    Plano Premium:
      - Servicos: SIM
      - Galeria: SIM (max 10 fotos)
      - Contato: SIM
      - WhatsApp CTA: SIM
      - Booking CTA: SIM
      - Premium Concierge: SIM
#>
& "$PSScriptRoot\elegancia-start.ps1" -Mode dev -Tier premium

