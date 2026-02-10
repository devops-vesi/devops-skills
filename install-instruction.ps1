# Script pour installer les instructions Copilot dans un projet
param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectPath
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceFile = Join-Path $scriptDir ".github\instructions\readme-template.instructions.md"
$targetDir = Join-Path $ProjectPath ".github\instructions"
$targetFile = Join-Path $targetDir "readme-template.instructions.md"

# Créer le dossier s'il n'existe pas
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
    Write-Host "✅ Dossier créé : $targetDir"
}

# Copier le fichier
Copy-Item $sourceFile $targetFile -Force
Write-Host "✅ Instructions installées dans : $ProjectPath"
Write-Host "📄 Fichier : $targetFile"