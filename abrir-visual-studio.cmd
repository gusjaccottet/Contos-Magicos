@echo off
cd /d "%~dp0"

if exist "%ProgramFiles%\Microsoft Visual Studio\2022\Community\Common7\IDE\devenv.exe" (
  start "" "%ProgramFiles%\Microsoft Visual Studio\2022\Community\Common7\IDE\devenv.exe" "%~dp0ContosMagicos.sln"
  exit /b 0
)
if exist "%ProgramFiles%\Microsoft Visual Studio\2022\Professional\Common7\IDE\devenv.exe" (
  start "" "%ProgramFiles%\Microsoft Visual Studio\2022\Professional\Common7\IDE\devenv.exe" "%~dp0ContosMagicos.sln"
  exit /b 0
)
if exist "%ProgramFiles%\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\devenv.exe" (
  start "" "%ProgramFiles%\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\devenv.exe" "%~dp0ContosMagicos.sln"
  exit /b 0
)
if exist "%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" (
  for /f "usebackq tokens=*" %%i in (`"%ProgramFiles(x86)%\Microsoft Visual Studio\Installer\vswhere.exe" -latest -products * -requires Microsoft.VisualStudio.Workload.Node -property productPath`) do (
    start "" "%%i" "%~dp0ContosMagicos.sln"
    exit /b 0
  )
)

echo Visual Studio 2022 nao encontrado.
echo Abra ContosMagicos.sln manualmente ou use Visual Studio Code:
echo   code ContosMagicos.code-workspace
pause
