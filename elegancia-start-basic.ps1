<#
.SYNOPSIS
    Inicia o servidor de desenvolvimento com Plano Basic.
    Define NEXT_PUBLIC_DEV_PLAN_TIER=basic em .env.development.local e sobe o next dev.

.DESCRIPTION
    Plano Basic:
      - Servicos: SIM
      - Galeria: SIM (max 3 fotos)
      - Contato: SIM
      - WhatsApp CTA: NAO
      - Booking CTA: NAO
      - Premium Concierge: NAO
#>
& "$PSScriptRoot\elegancia-start.ps1" -Mode dev -Tier basic

