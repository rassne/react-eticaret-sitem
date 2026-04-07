#!/bin/bash
# E-Ticaret React Kurulum Scripti

echo "╔════════════════════════════════════════════════════╗"
echo "║    E-Ticaret React Uygulaması - Yükleme Rehberi   ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Node.js kontrol et
if ! command -v node &> /dev/null; then
    echo "❌ Node.js bulunamamıştır!"
    echo "📥 Lütfen şuradan indirin: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js bulundu: $(node --version)"
echo "✓ npm bulundu: $(npm --version)"
echo ""

# Bağımlılıkları yükle
echo "📦 Bağımlılıklar yükleniyor..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Bağımlılıklar başarıyla yüklendi!"
    echo ""
    echo "🚀 Geliştirme sunucusunu başlatmak için:"
    echo "   npm run dev"
    echo ""
    echo "📦 Production build için:"
    echo "   npm run build"
    echo ""
    echo "🎉 Hepsi hazır!"
else
    echo "❌ Kurulum sırasında hata oluştu"
    exit 1
fi
