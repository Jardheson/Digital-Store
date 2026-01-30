@echo off
REM Script para testar o PWA localmente no Windows

echo 🚀 Iniciando teste do PWA...
echo.

REM Verificar se o Node.js está instalado
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não está instalado
    exit /b 1
)

echo ✅ Node.js encontrado: 
node --version
echo.

REM Instalar dependências se necessário
if not exist "node_modules" (
    echo 📦 Instalando dependências...
    call npm install
)

echo.
echo 🏗️  Fazendo build do projeto...
call npm run build

echo.
echo 📱 Iniciando preview do PWA...
echo.
echo 🌐 Abra seu navegador e acesse:
echo    Local: http://localhost:4173
echo.
echo 📋 Para testar o PWA:
echo    1. Abra o DevTools (F12)
echo    2. Vá para Application ^> Service Workers
echo    3. Instale o app clicando no ícone na barra de endereços
echo.
echo 🔒 Para testar com HTTPS local (opcional):
echo    npm run preview -- --https
echo.

call npm run preview

pause
