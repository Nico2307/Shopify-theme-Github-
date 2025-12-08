# Script para limpiar todos los archivos relacionados con Shopify
# Ejecuta este script con PowerShell para eliminar todas las dependencias de Shopify

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   LIMPIEZA DE ARCHIVOS SHOPIFY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Confirmación antes de eliminar
$confirm = Read-Host "¿Estás seguro de que deseas eliminar TODOS los archivos de Shopify? (S/N)"

if ($confirm -ne "S" -and $confirm -ne "s") {
    Write-Host "Operación cancelada." -ForegroundColor Yellow
    exit
}

Write-Host ""
Write-Host "Iniciando limpieza..." -ForegroundColor Green
Write-Host ""

# Carpetas a eliminar
$foldersToRemove = @(
    "assets",
    "blocks",
    "config",
    "layout",
    "locales",
    "sections",
    "snippets",
    "templates"
)

# Archivos a eliminar
$filesToRemove = @(
    "auto-sync.ps1",
    "INSTRUCCIONES-TEMA-OSCURO.md"
)

$totalRemoved = 0
$totalSize = 0

# Eliminar carpetas
foreach ($folder in $foldersToRemove) {
    $path = Join-Path $PSScriptRoot $folder
    
    if (Test-Path $path) {
        try {
            # Calcular tamaño antes de eliminar
            $size = (Get-ChildItem $path -Recurse -File | Measure-Object -Property Length -Sum).Sum
            $sizeMB = [math]::Round($size / 1MB, 2)
            
            Write-Host "Eliminando carpeta: $folder ($sizeMB MB)..." -ForegroundColor Yellow
            Remove-Item -Path $path -Recurse -Force
            
            $totalRemoved++
            $totalSize += $size
            
            Write-Host "  ✓ Eliminado correctamente" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Error al eliminar: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "Carpeta no encontrada: $folder (saltando...)" -ForegroundColor Gray
    }
}

Write-Host ""

# Eliminar archivos
foreach ($file in $filesToRemove) {
    $path = Join-Path $PSScriptRoot $file
    
    if (Test-Path $path) {
        try {
            $size = (Get-Item $path).Length
            $sizeKB = [math]::Round($size / 1KB, 2)
            
            Write-Host "Eliminando archivo: $file ($sizeKB KB)..." -ForegroundColor Yellow
            Remove-Item -Path $path -Force
            
            $totalRemoved++
            $totalSize += $size
            
            Write-Host "  ✓ Eliminado correctamente" -ForegroundColor Green
        }
        catch {
            Write-Host "  ✗ Error al eliminar: $_" -ForegroundColor Red
        }
    }
    else {
        Write-Host "Archivo no encontrado: $file (saltando...)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   LIMPIEZA COMPLETADA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Total de items eliminados: $totalRemoved" -ForegroundColor Green

$totalSizeMB = [math]::Round($totalSize / 1MB, 2)
Write-Host "Espacio liberado: $totalSizeMB MB" -ForegroundColor Green

Write-Host ""
Write-Host "Estructura actual del proyecto:" -ForegroundColor Cyan
Write-Host "  ✓ index.html" -ForegroundColor Green
Write-Host "  ✓ preview-design.html" -ForegroundColor Green
Write-Host "  ✓ README.md" -ForegroundColor Green
Write-Host "  ✓ css/" -ForegroundColor Green
Write-Host "  ✓ js/" -ForegroundColor Green
Write-Host "  ✓ images/" -ForegroundColor Green

Write-Host ""
Write-Host "¡Tu sitio web ahora está completamente libre de Shopify!" -ForegroundColor Green
Write-Host "Puedes abrir 'index.html' en tu navegador para ver el resultado." -ForegroundColor Yellow
Write-Host ""

# Preguntar si desea abrir el sitio
$openSite = Read-Host "¿Deseas abrir el sitio en tu navegador ahora? (S/N)"

if ($openSite -eq "S" -or $openSite -eq "s") {
    $indexPath = Join-Path $PSScriptRoot "index.html"
    Start-Process $indexPath
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
