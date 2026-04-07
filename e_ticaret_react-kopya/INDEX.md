# 📖 Dokümantasyon İndeksi

E-Ticaret React Uygulaması için tüm dokümantasyon dosyalarının listesi ve içerikleri.

## 🎯 Başlamak İçin

1. **[QUICK_START.md](QUICK_START.md)** ⭐ BURADAN BAŞLA
   - 2 dakika içinde kurulum
   - Temel görevler
   - Sık sorulanlar
   
2. **[SETUP_GUIDE.md](SETUP_GUIDE.md)**
   - Detaylı kurulum rehberi
   - Gereksinimler
   - Proje yapısı açıklaması

## 🔧 Geliştirme

3. **[CUSTOMIZATION.md](CUSTOMIZATION.md)**
   - Ürün ekle/değiştir
   - Renk şemasını değiştir
   - API entegrasyonu
   - Yeni özellikler

4. **[CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md)**
   - Teknik dönüşüm detayları
   - Eski vs Yeni karşılaştırması
   - Veri akışı diyagramları

## 📚 Reference

5. **[README.md](README.md)**
   - Proje tanıtımı
   - Özellikler listesi
   - Teknolojiler

## 📋 Dosya Rehberi

### Yapışma Dosyalar (En Sık Değişecekler)

```
src/
├── data/products.js          ← Ürünleri buradan ekle/değiştir
├── styles/globals.css        ← Renkler ve fontlar
└── components/
    └── Navbar.jsx            ← Üst menü ve logoyu değiştir
```

### Sayfa Dosyaları

```
src/pages/
├── Home.jsx                  ← Anasayfa
├── Products.jsx              ← Ürünler listesi
├── ProductDetail.jsx         ← Tek ürün sayfası
├── Login.jsx                 ← Giriş/Kayıt
├── Cart.jsx                  ← Sepet
├── Payment.jsx               ← Ödeme
├── Profile.jsx               ← Profil
├── Orders.jsx                ← Siparişler
├── Settings.jsx              ← Ayarlar
└── Admin.jsx                 ← Admin paneli
```

### Bileşen Dosyaları

```
src/components/
├── Navbar.jsx                ← Üst navigasyon
├── Footer.jsx                ← Alt bilgi
├── ProductCard.jsx           ← Ürün kartı
├── ProductGrid.jsx           ← Ürün ızgarası
├── HeroSlider.jsx            ← Slayt gösterisi
└── SocialMedia.jsx           ← Sosyal medya bölümü
```

### State Management

```
src/context/
├── UserContext.jsx           ← Kullanıcı yönetimi
└── CartContext.jsx           ← Sepet yönetimi
```

### Stil Dosyaları

```
src/styles/
├── globals.css               ← Temel stiller
├── navbar.css                ← Navigasyon stili
├── footer.css                ← Alt bilgi stili
├── slider.css                ← Slayt kutusu stili
├── product.css               ← Ürün kartı stili
└── auth.css                  ← Form stili
```

## 🚀 Ortak Görevler

### "X yazısını değiştirmek istiyorum"
→ Dosyayı bul (`Ctrl+F`), değiştir, kaydet

### "Yeni ürün eklemek istiyorum"
→ `src/data/products.js` dosyasını aç, ekle

### "Renkleri değiştirmek istiyorum"
→ `src/styles/globals.css` dosyasını aç, `:root` bölümü değiştir

### "Yeni sayfa eklemek istiyorum"
→ `src/pages/` klasöründe JSX yarat, `src/App.jsx` içinde route ekle

### "Logo değiştirmek istiyorum"
→ Navbar.jsx, Footer.jsx, index.html dosyalarını güncelle

---

## 📞 Hızlı Referans Komutlar

```bash
# Kurulum
npm install

# Geliştirme
npm run dev

# Üretim Build
npm run build

# Preview
npm run preview

# Linting
npm run lint
```

---

## 🎓 Öğrenme Yolu

### Başlangıç
1. QUICK_START.md oku
2. `npm run dev` çalıştır
3. Siteyi keşfet

### Temel Bilgiler
1. SETUP_GUIDE.md oku
2. src/ klasörü yapısını anla
3. Basit değişiklikler yap (ürün ekle)

### İleri Seviye
1. CONVERSION_SUMMARY.md oku
2. CUSTOMIZATION.md oku
3. Yeni özellikler ekle

### Uzman Seviye
1. React docs oku
2. Backend entegrasyonu yap
3. Database bağla

---

## 📊 Proje Yapısı Görüntüsü

```
e-ticaret-react/
│
├── 📄 Dokümantasyon
│   ├── README.md
│   ├── QUICK_START.md          ← Başla buradan
│   ├── SETUP_GUIDE.md
│   ├── CUSTOMIZATION.md
│   ├── CONVERSION_SUMMARY.md
│   └── INDEX.md                (bu dosya)
│
├── 📦 Konfigürasyon
│   ├── package.json
│   ├── vite.config.js
│   └── .eslintrc.json
│
├── 🎨 Frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── data/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
│
├── 🌐 HTML
│   └── public/
│       └── index.html
│
└── ⚙️ Scripts
    ├── install.sh
    └── install.bat
```

---

## 🎯 Kontrol Listesi

Başlamadan önce:
- [ ] Node.js v16+ yüklü
- [ ] npm yüklü
- [ ] Proje klonlandı/yüklendi
- [ ] Internet bağlantısı var
- [ ] Metin editörü açık (VS Code)

Yapılandırma:
- [ ] `npm install` çalıştırıldı
- [ ] Bağımlılıklar yüklendi
- [ ] `npm run dev` çalışıyor
- [ ] Browser http://localhost:3000 açıldı

Doğrulama:
- [ ] Anasayfa yüklendi
- [ ] Ürünler görünüyor
- [ ] Giriş yapabilirim
- [ ] Sepet çalışıyor

---

## 🆘 Sorun Giderme

### Problem: "npm command not found"
**Çözüm**: Node.js yükle ([nodejs.org](https://nodejs.org))

### Problem: Port 3000 kullanımda
**Çözüm**: `npm run dev -- --port 3001` kullan

### Problem: Blank page görmüyorum
**Çözüm**: 
1. Browser console açı (F12)
2. Hata mesajını oku
3. `npm install` yeniden çalıştır

### Problem: CSS yüklenmedi
**Çözüm**: `Ctrl+Shift+Delete` cache temizle

### Problem: Module not found
**Çözüm**: `npm install` tekrar çalıştır

---

## 🌟 Sonraki Adımlar

İyi ilerledikten sonra:
- [ ] TypeScript ekle
- [ ] Unit tester ekle
- [ ] Backend API bağla
- [ ] Database ekle
- [ ] Authentication sistemi
- [ ] Deployment sağlayıcısı

---

## 📞 Kaynaklar

- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **Vite**: https://vitejs.dev
- **MDN**: https://developer.mozilla.org
- **Node.js**: https://nodejs.org

---

## 📝 Versiyon Tarihi

| Versiyon | Tarih | Notlar |
|----------|-------|--------|
| 1.0.0 | 2026 | İlk sürüm |

---

**Son Güncelleme**: 2026
**Durum**: ✅ Kullanıma hazır
**Lisans**: MIT
