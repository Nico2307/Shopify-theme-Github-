# Script de sincronizacion automatica para Shopify Theme
# Detecta cambios en archivos y los sube automaticamente a GitHub

Write-Host "Iniciando sincronizacion automatica..." -ForegroundColor Cyan
Write-Host "Observando cambios en assets/tridot y layout/theme.liquid" -ForegroundColor Yellow
Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Gray
Write-Host ""

$lastHash = ""
$watchPaths = @(
    "assets\tridot-custom.css",
    "assets\tridot-animations.css", 
    "assets\tridot-enhancements.js",
    "layout\theme.liquid"
)

while ($true) {
    $currentHash = ""
    foreach ($path in $watchPaths) {
        if (Test-Path $path) {
            $content = Get-Content $path -Raw
            $currentHash += $content.GetHashCode()
        }
    }
    
    if ($currentHash -ne $lastHash -and $lastHash -ne "") {
        Write-Host ""
        Write-Host "Cambios detectados! Subiendo a GitHub..." -ForegroundColor Green
        
        git add assets\tridot-custom.css assets\tridot-animations.css assets\tridot-enhancements.js layout\theme.liquid 2>$null
        $timestamp = Get-Date -Format "HH:mm:ss"
        git commit -m "Auto-sync: Update theme files at $timestamp" 2>$null
        
        $pushResult = git push origin yunguer 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Cambios subidos exitosamente!" -ForegroundColor Green
            Write-Host "Los cambios se sincronizaran en Shopify si conectaste el tema desde GitHub" -ForegroundColor Cyan
        } else {
            Write-Host "Error al subir cambios" -ForegroundColor Red
        }
    }
    
    $lastHash = $currentHash
    Start-Sleep -Seconds 2
}
