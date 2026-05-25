param(
  [string]$SourcePath = "..\esquema-dados\dados",
  [string]$DestinationPath = "public\images\elegancia"
)

$ErrorActionPreference = "Stop"

$map = @(
  @{ Source = "Imagem_Principal.jpg"; Target = "hero-principal.jpg" },
  @{ Source = "WhatsApp Image_0(QRCode).jpeg"; Target = "instagram-qrcode.jpeg" },
  @{ Source = "WhatsApp Image_01.jpeg"; Target = "gallery-01.jpeg" },
  @{ Source = "WhatsApp Image_02.jpeg"; Target = "gallery-02.jpeg" },
  @{ Source = "WhatsApp Image_03.jpeg"; Target = "gallery-03.jpeg" },
  @{ Source = "WhatsApp Image_04.jpeg"; Target = "gallery-04.jpeg" },
  @{ Source = "WhatsApp Image_05.jpeg"; Target = "gallery-05.jpeg" },
  @{ Source = "WhatsApp Image_99 (Endereco_e_Complete_GanheCorte).jpeg"; Target = "brand-address-card.jpeg" },
  @{ Source = "WhatsApp Image_99 (LogoMarca).jpeg"; Target = "brand-logo-card.jpeg" }
)

if (-not (Test-Path $SourcePath)) {
  throw "Source path not found: $SourcePath"
}

if (-not (Test-Path $DestinationPath)) {
  New-Item -ItemType Directory -Path $DestinationPath -Force | Out-Null
}

foreach ($entry in $map) {
  $source = Join-Path $SourcePath $entry.Source
  $target = Join-Path $DestinationPath $entry.Target

  if (-not (Test-Path $source)) {
    throw "Missing source file: $source"
  }

  Copy-Item -Path $source -Destination $target -Force
  Write-Host "Synced $($entry.Source) -> $($entry.Target)"
}

Write-Host "Reference data sync completed."
