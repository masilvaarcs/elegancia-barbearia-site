param(
  [string]$ClientId = "augustus",
  [string]$SourceImage = "hero-principal.jpg"
)

Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = "Stop"

function Clamp-Byte {
  param([int]$Value)
  if ($Value -lt 0) { return 0 }
  if ($Value -gt 255) { return 255 }
  return $Value
}

function Save-Jpeg {
  param(
    [Parameter(Mandatory = $true)][System.Drawing.Bitmap]$Bitmap,
    [Parameter(Mandatory = $true)][string]$Path,
    [int]$Quality = 92
  )

  $jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }

  $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]$Quality
  )

  $Bitmap.Save($Path, $jpegEncoder, $encoderParameters)
  $encoderParameters.Dispose()
}

function Apply-Sharpen {
  param(
    [Parameter(Mandatory = $true)][System.Drawing.Bitmap]$InputBitmap,
    [double]$Strength = 0.35
  )

  $width = $InputBitmap.Width
  $height = $InputBitmap.Height

  $source = New-Object System.Drawing.Bitmap($InputBitmap)
  $output = [System.Drawing.Bitmap]::new([int]$width, [int]$height)

  $copyGraphics = [System.Drawing.Graphics]::FromImage($output)
  $copyGraphics.DrawImage($source, 0, 0, $width, $height)
  $copyGraphics.Dispose()

  for ($y = 1; $y -lt $height - 1; $y++) {
    for ($x = 1; $x -lt $width - 1; $x++) {
      $center = $source.GetPixel($x, $y)
      $up = $source.GetPixel($x, $y - 1)
      $down = $source.GetPixel($x, $y + 1)
      $left = $source.GetPixel($x - 1, $y)
      $right = $source.GetPixel($x + 1, $y)

      $rawR = (5 * $center.R) - $up.R - $down.R - $left.R - $right.R
      $rawG = (5 * $center.G) - $up.G - $down.G - $left.G - $right.G
      $rawB = (5 * $center.B) - $up.B - $down.B - $left.B - $right.B

      $r = Clamp-Byte([int][Math]::Round(($center.R * (1 - $Strength)) + ($rawR * $Strength)))
      $g = Clamp-Byte([int][Math]::Round(($center.G * (1 - $Strength)) + ($rawG * $Strength)))
      $b = Clamp-Byte([int][Math]::Round(($center.B * (1 - $Strength)) + ($rawB * $Strength)))

      $output.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
    }
  }

  $source.Dispose()
  return $output
}

$targetDir = Join-Path $PSScriptRoot "..\public\images\$ClientId"
$sourcePath = Join-Path $targetDir $SourceImage

if (-not (Test-Path $sourcePath)) {
  throw "Imagem base nao encontrada em $sourcePath"
}

$variants = @(
  @{ File = "hero-variant-01.jpg"; Contrast = 1.10; Brightness = 0.01; TintA = 26; TintR = 255; TintG = 88; TintB = 22; Sharpen = 0.34 },
  @{ File = "hero-variant-02.jpg"; Contrast = 1.08; Brightness = 0.00; TintA = 30; TintR = 16; TintG = 120; TintB = 255; Sharpen = 0.36 },
  @{ File = "hero-variant-03.jpg"; Contrast = 1.12; Brightness = -0.01; TintA = 30; TintR = 178; TintG = 36; TintB = 26; Sharpen = 0.37 },
  @{ File = "hero-variant-04.jpg"; Contrast = 1.07; Brightness = 0.01; TintA = 28; TintR = 0; TintG = 148; TintB = 120; Sharpen = 0.35 },
  @{ File = "hero-variant-05.jpg"; Contrast = 1.05; Brightness = 0.02; TintA = 18; TintR = 218; TintG = 174; TintB = 77; Sharpen = 0.33 },
  @{ File = "hero-variant-06.jpg"; Contrast = 1.09; Brightness = -0.01; TintA = 26; TintR = 188; TintG = 74; TintB = 145; Sharpen = 0.36 },
  @{ File = "hero-variant-07.jpg"; Contrast = 1.06; Brightness = 0.00; TintA = 24; TintR = 45; TintG = 170; TintB = 92; Sharpen = 0.35 },
  @{ File = "hero-variant-08.jpg"; Contrast = 1.08; Brightness = 0.00; TintA = 24; TintR = 66; TintG = 131; TintB = 180; Sharpen = 0.36 },
  @{ File = "hero-variant-09.jpg"; Contrast = 1.11; Brightness = 0.01; TintA = 30; TintR = 202; TintG = 89; TintB = 29; Sharpen = 0.37 },
  @{ File = "hero-variant-10.jpg"; Contrast = 1.04; Brightness = 0.01; TintA = 24; TintR = 121; TintG = 150; TintB = 42; Sharpen = 0.34 }
)

$sourceImage = [System.Drawing.Image]::FromFile($sourcePath)

foreach ($variant in $variants) {
  $base = [System.Drawing.Bitmap]::new([int]$sourceImage.Width, [int]$sourceImage.Height)
  $graphics = [System.Drawing.Graphics]::FromImage($base)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

  $imageAttributes = New-Object System.Drawing.Imaging.ImageAttributes
  $c = [single]$variant.Contrast
  $b = [single]$variant.Brightness

  $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix
  $colorMatrix.Matrix00 = $c
  $colorMatrix.Matrix11 = $c
  $colorMatrix.Matrix22 = $c
  $colorMatrix.Matrix33 = 1.0
  $colorMatrix.Matrix44 = 1.0
  $colorMatrix.Matrix40 = $b
  $colorMatrix.Matrix41 = $b
  $colorMatrix.Matrix42 = $b

  $imageAttributes.SetColorMatrix($colorMatrix)
  $rect = New-Object System.Drawing.Rectangle(0, 0, $sourceImage.Width, $sourceImage.Height)

  $graphics.DrawImage(
    $sourceImage,
    $rect,
    0,
    0,
    $sourceImage.Width,
    $sourceImage.Height,
    [System.Drawing.GraphicsUnit]::Pixel,
    $imageAttributes
  )

  $overlayBrush = New-Object System.Drawing.SolidBrush(
    [System.Drawing.Color]::FromArgb($variant.TintA, $variant.TintR, $variant.TintG, $variant.TintB)
  )
  $graphics.FillRectangle($overlayBrush, $rect)

  $overlayBrush.Dispose()
  $imageAttributes.Dispose()
  $graphics.Dispose()

  $final = Apply-Sharpen -InputBitmap $base -Strength $variant.Sharpen
  $outputPath = Join-Path $targetDir $variant.File
  Save-Jpeg -Bitmap $final -Path $outputPath -Quality 92

  $base.Dispose()
  $final.Dispose()

  Write-Output "Gerado: $outputPath"
}

$sourceImage.Dispose()
Write-Output "Concluido. Variacoes prontas em $targetDir"
