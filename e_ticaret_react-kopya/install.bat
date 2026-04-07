@echo off
REM E-Ticaret React Kurulum Scripti (Windows)

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║    E-Ticaret React Yapplication - Kurulum        ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Node.js kontrol et
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js bulunamamiştir!
    echo 📥 Lutfen suradan indirin: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js bulundu
echo ✓ npm bulundu
echo.

REM Bağımlılıkları yükle
echo 📦 Bagimliliklar yukleniyor...
call npm install

if %errorlevel% equ 0 (
    echo ✓ Bagimliliklar basariyla yuklendi!
    echo.
    echo 🚀 Gelistirme sunucusunu baslatmak icin:
    echo    npm run dev
    echo.
    echo 📦 Production build icin:
    echo    npm run build
    echo.
    echo 🎉 Hepsi hazir!
) else (
    echo ❌ Kurulum sirasinda hata olusdu
    pause
    exit /b 1
)

pause
