#Requires -Version 5.1
$ErrorActionPreference = 'Stop'
Set-Location -Path $PSScriptRoot

Write-Host '============================================'
Write-Host ' Contos Magicos - Setup Windows'
Write-Host '============================================'
Write-Host ''

function Test-Command($Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

if (-not (Test-Command 'node')) {
  Write-Error 'Node.js nao encontrado. Instale o LTS em https://nodejs.org/'
}

if (-not (Test-Command 'npm')) {
  Write-Error 'npm nao encontrado. Reinstale o Node.js incluindo o npm.'
}

Write-Host "Node.js: $(node -v)"
Write-Host "npm:     $(npm -v)"
Write-Host ''

Write-Host 'Instalando dependencias...'
npm install
if ($LASTEXITCODE -ne 0) {
  Write-Error 'npm install falhou.'
}

if (-not (Test-Path -Path '.env.local')) {
  Copy-Item -Path '.env.example' -Destination '.env.local'
  Write-Host ''
  Write-Host 'Arquivo .env.local criado a partir de .env.example.'
  Write-Host 'Edite .env.local e cole sua GEMINI_API_KEY.'
} else {
  Write-Host ''
  Write-Host '.env.local ja existe. Nenhuma alteracao feita nesse arquivo.'
}

Write-Host ''
Write-Host 'Pronto. Proximos passos:'
Write-Host '  1. Edite .env.local e defina GEMINI_API_KEY'
Write-Host '  2. Abra ContosMagicos.sln no Visual Studio 2022'
Write-Host '  3. Pressione F5  (ou execute: npm run dev)'
