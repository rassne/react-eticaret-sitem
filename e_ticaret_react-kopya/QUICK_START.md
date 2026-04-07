# 🚀 Hızlı Başlangıç Rehberi

## ⚡ 2 Dakika İçinde Başlang

### Adım 1: Kurulum
```bash
# Windows'ta
install.bat

# macOS/Linux'ta
chmod +x install.sh
./install.sh

# Veya manuel olarak
npm install
```

### Adım 2: Sunucuyu Başlat
```bash
npm run dev
```

### Adım 3: Browser'da Aç
```
http://localhost:3000
```

---

## 📋 Sık Kullanılan Görevler

### Test Kullanıcısı Hesabı Oluşturmak

1. `/login` sayfasına git
2. "Hesap Oluştur" sekmesini seç
3. Bilgileri doldur ve submit et
4. "Giriş Yap" tabı seç ve giriş yap

**Test Verisi:**
- Ad: Ahmet Yılmaz
- Kullanıcı Adı: ahmet123
- Email: ahmet@example.com
- Şifre: 123456

### Admin Paneline Erişmek

Admin hesabı oluştur:
- Kullanıcı Adı: **admin**
- Diğer alanları doldur

Sonra `/admin` URL'sine git

### Yeni Ürün Eklemek

1. `src/data/products.js` dosyasını aç
2. `products` dizisine yeni obje ekle:

```javascript
{
  id: 6,
  name: "Yeni Ürün",
  emoji: "🎁",
  description: "Kısa açıklama",
  price: 999,
  detailedDescription: "Uzun açıklama",
  image: "URL"
}
```

3. Site otomatik refresh olur (varsa)

### Renkleri Değiştirmek

`src/styles/globals.css` dosyasında:

```css
:root {
  --gold: #FF0000;  /* Değiştir */
  --text: #000000;  /* Değiştir */
  /* ... */
}
```

### Logo Değiştirmek

**Navbar (üst):**
`src/components/Navbar.jsx` - Satır: 16
```jsx
<Link to="/" className="navbar-logo">
  YENİ LOGO  {/* Buraya yaz */}
</Link>
```

**Footer (alt):**
`src/components/Footer.jsx` - Satır: 8
```jsx
<h3>YENİ LOGO</h3>
```

---

## 🔧 Hata Çözümleri

### "Port 3000 zaten kullanımda" hatasıı
```bash
# Başka portu kul
npm run dev -- --port 3001
```

### "node_modules yok" hatası
```bash
# Bağımlılıkları yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

### CSS yüklenmemiş görünüyor
- Ctrl + Shift + Delete (cache temizle)
- Browser'ı tamamen kapat ve aç

### "Module not found" hatası
```bash
npm install
npm run dev
```

---

## 📁 Önemli Dosyalar

| Dosya | Açıklama | İşlev |
|-------|----------|--------|
| `package.json` | Bağımlılıklar | Proje config |
| `vite.config.js` | Build config | Sunucu ayarları |
| `src/App.jsx` | Ana bileşen | Routing |
| `src/data/products.js` | Ürünler | Veri |
| `src/styles/globals.css` | Ana stiller | Renkler, fontlar |

---

## 🎨 Hızlı Özelleştirmeler

### Site Adını Değiştir
3 yerde değiştir:
1. `src/components/Navbar.jsx` (satır 16)
2. `src/components/Footer.jsx` (satır 8)
3. `public/index.html` (satır 7)

### Tema Rengi Değiştir
`src/styles/globals.css` dosyasında:
```css
--gold: #RENKODUN;  /* Buradan değiştir */
```

### Ürün Ekle
`src/data/products.js` dosyasına ekle

### Sayfa Başlığı Değiştir
`public/index.html` dosyasında satır 7

---

## 📊 Proje İstatistikleri

- **Toplam Dosya**: 45+
- **Toplam Satır Kod**: 3000+
- **Bileşen Sayısı**: 5
- **Sayfa Sayısı**: 10
- **Context Sayısı**: 2
- **CSS Dosyası**: 6

---

## 🌐 Deploy Etmek

### Vercel'e (En Kolay)

1. GitHub'a push et
2. [Vercel.com](https://vercel.com) git
3. GitHub repo'yu bağla
4. Deploy et (otomatik)

### Local Test

```bash
npm run build
npm run preview
```

---

## 💾 Veri Nerede Saklanıyor?

Tüm veriler **browser'ın localStorage**'da saklanıyor:

- `kullanicilar` - User accounts
- `aktifKullanici` - Logged in user
- `cart` - Shopping cart
- `lastOrder` - Last order

> ⚠️ **Not**: Private data taşımıyor. Gerçek uygulama için backend gerekli.

---

## 🔗 Önemli Sayfalar

| URL | Açıklama |
|-----|----------|
| `/` | Anasayfa |
| `/products` | Ürün listesi |
| `/product/1` | Ürün detayı |
| `/login` | Giriş/Kayıt |
| `/cart` | Sepet |
| `/payment` | Ödeme |
| `/admin` | Admin paneli |
| `/profile` | Profil |
| `/orders` | Siparişler |

---

## 💡 Tips & Tricks

### Console'da Ürünleri Görmek
```javascript
// Browser console'da
JSON.parse(localStorage.getItem('kullanicilar'))
JSON.parse(localStorage.getItem('cart'))
```

### Tüm Veriyi Temizle
```javascript
localStorage.clear()
location.reload()
```

### Admin Modu Test
1. Test user oluştur
2. Username'i `admin` yap (consoleda)
3. `/admin` git

### Sepeti State'i Değiştir
```javascript
// Consoleda
localStorage.setItem('cart', JSON.stringify([]))
location.reload()
```

---

## 📞 Destek İçin

Yaygın sorular:
- ❓ "Kod nereye yazarım?" → `src/` klasörüne
- ❓ "Veri nereye yazarım?" → `src/data/` klasörüne
- ❓ "Stilsizmi?" → `src/styles/` klasörüne
- ❓ "Yeni sayfa nasıl eklerim?" → `src/pages/` klasöründe JSX yarat, `App.jsx`'e route ekle

---

## 🎯 Başarılı Çalışması İçin Kontrol Listesi

- [ ] Node.js yüklü (16+ versiyon)
- [ ] `npm install` çalıştırıldı
- [ ] `npm run dev` çalıştırıldı
- [ ] Browser `http://localhost:3000` açıldı
- [ ] Anasayfa yüklendi
- [ ] Ürünleri görebiliyorum
- [ ] Giriş/Kayıt çalışıyor
- [ ] Sepete ürün ekleyebilmek

---

**Sorun mu? Şu dosyaları kontrol et:**
- `package.json` - Bağımlılıklar
- `vite.config.js` - Sunucu ayarları
- `src/App.jsx` - Routing
- Browser console - Hata mesajları

**Happy coding! 🚀**
