#!/bin/bash

# Script para testar o PWA localmente

echo "🚀 Iniciando teste do PWA..."
echo ""

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

echo ""
echo "🏗️  Fazendo build do projeto..."
npm run build

echo ""
echo "📱 Iniciando preview do PWA..."
echo ""
echo "🌐 Abra seu navegador e acesse:"
echo "   Local: http://localhost:4173"
echo ""
echo "📋 Para testar o PWA:"
echo "   1. Abra o DevTools (F12)"
echo "   2. Vá para Application > Service Workers"
echo "   3. Instale o app clicando no ícone na barra de endereços"
echo ""
echo "🔒 Para testar com HTTPS local (opcional):"
echo "   npm run preview -- --https"
echo ""

npm run preview
