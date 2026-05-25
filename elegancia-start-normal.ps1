<#
.SYNOPSIS
    Inicia o servidor de desenvolvimento com Plano Normal.
    Define NEXT_PUBLIC_DEV_PLAN_TIER=normal em .env.development.local e sobe o next dev.

.DESCRIPTION
    Plano Normal:
      - Servicos: SIM
      - Galeria: SIM (max 6 fotos)
      - Contato: SIM
      - WhatsApp CTA: SIM
      - Booking CTA: NAO
      - Premium Concierge: NAO
#>
& "$PSScriptRoot\elegancia-start.ps1" -Mode dev -Tier normal

