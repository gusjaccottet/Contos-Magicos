@echo off
setlocal EnableExtensions
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================
echo  Contos Magicos - Setup Windows
echo ============================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERRO] Node.js nao encontrado.
  echo Instale o Node.js LTS em https://nodejs.org/ e abra este script de novo.
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERRO] npm nao encontrado. Reinstale o Node.js incluindo o npm.
  pause
  exit /b 1
)

echo Node.js:
node -v
echo npm:
npm -v
echo.

echo Instalando dependencias...
call npm install
if errorlevel 1 (
  echo [ERRO] npm install falhou.
  pause
  exit /b 1
)

if not exist ".env.local" (
  copy /Y ".env.example" ".env.local" >nul
  echo.
  echo Arquivo .env.local criado a partir de .env.example.
  echo Edite .env.local e cole sua GEMINI_API_KEY.
) else (
  echo.
  echo .env.local ja existe. Nenhuma alteracao feita nesse arquivo.
)

echo.
echo Pronto. Proximos passos:
echo  1. Edite .env.local e defina GEMINI_API_KEY
echo  2. Abra ContosMagicos.sln no Visual Studio 2022
echo  3. Pressione F5  ^(ou execute: npm run dev^)
echo.
pause
endlocal
