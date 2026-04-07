# React E-Ticaret Uygulaması - Kurulum ve Başlangıç Rehberi

## 1. Proje Hakkında

Bu proje, orijinal HTML/CSS/JavaScript yapısından modern React'e dönüştürülen tam bir e-ticaret uygulamasıdır.

### Temel İyileştirmeler:
- Component-based mimarisi
- Reusable bileşenler
- Global state management (Context API)
- Daha iyi performans ve aksesibilite
- Daha düzenli kod yapısı
- Build optimization (Vite)

## 2. Gereksinimler

- **Node.js**: 16.x veya üzeri ([indir](https://nodejs.org/))
- **npm**: Node.js ile birlikte kurulur
- **VS Code** (önerilir)

## 3. Kurulum Adımları

### 3.1 Projeyi Aç

```bash
cd e-ticaret-react
```

### 3.2 Bağımlılıkları Yükle

```bash
npm install
```

Bu komut `package.json` dosyasında belirtilen tüm paketleri indirecektir.

### 3.3 Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Çıktı:
```
  VITE v5.0.0  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

Browser'da otomatik olarak açılacak, yoksa `http://localhost:3000` adresine gidin.

## 4. Proje Konusu

### Klasör Yapısı Açıklaması

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
├── pages/              # Tam sayfalar
├── context/            # Global state (UserContext, CartContext)
├── data/               # Statik veri (ürünler, sosyal medya)
├── styles/             # CSS dosyaları
├── App.jsx             # Routing yapısı
└── main.jsx            # React uygulamasının giriş noktası
```

### Dosya Ağacı Detaylı

#### Components (src/components/)
- **Navbar.jsx**: Üst navigasyon, menü, kullanıcı hesabı
- **Footer.jsx**: Alt bilgilendirme
- **ProductCard.jsx**: Ürün kartı kartı kaynağı
- **ProductGrid.jsx**: Ürünleri grid içinde göster
- **HeroSlider.jsx**: Anasayfadaki slayt gösterisi
- **SocialMedia.jsx**: Sosyal medya takip kartları

#### Pages (src/pages/)
- **Home.jsx**: Anasayfa - öne çıkan ürünler
- **Products.jsx**: Tüm ürünler, arama
- **ProductDetail.jsx**: Ürün detayı
- **Login.jsx**: Giriş + kayıt sayfası
- **Cart.jsx**: Alışveriş sepeti
- **Payment.jsx**: Ödeme sayfası
- **Profile.jsx**: Kullanıcı profili
- **Orders.jsx**: Siparişler
- **Settings.jsx**: Hesap ayarları
- **Admin.jsx**: Yönetim paneli

#### Context (src/context/)
- **UserContext.jsx**: Kullanıcı yönetimi (giriş, kayıt, çıkış)
- **CartContext.jsx**: Sepet yönetimi (ekleme, kaldırma, total)

#### Styles (src/styles/)
Her bileşen için CSS dosyaları:
- globals.css - Genel stiller
- navbar.css - Navigasyon
- footer.css - Alt bilgi
- slider.css - Slayt gösterisi
- product.css - Ürün kartları
- auth.css - Kimlik doğrulama formları

## 5. Ana Özellikleri Test Etme

### 5.1 Ürün Tarama
1. Ana sayfada "Öne Çıkan Ürünler" bölümünü gör
2. "Tüm Ürünler" sayfasına git
3. Arama kutusunda "Mouse" yazarak filtrele

### 5.2 Kayıt ve Giriş
1. "Giriş Yap" butonuna tıkla
2. "Hesap Oluştur" tabını seç
3. Form doldur ve submit et
4. "Giriş Yap" tabına geç ve giriş yap

### 5.3 Sepete Ürün Ekle
1. Herhangi bir ürün kartında "Sepete Ekle" ye tıkla
2. Sepet ikonunda öğe sayısı güncellenecek
3. Sepete git ve kaldır/adet değiştir işlemleri yap

### 5.4 Ödeme Sayfası
1. Sepette "Ödemeye Geç" tıkla
2. Form bilgilerini doldur
3. "Ödeme Yap" tıkla
4. Başarılı mesajı görürsün

## 6. Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Üretim için build oluştur
npm run build

# Build çıktısını local'de test et
npm run preview

# ESLint ile kod kontrol et
npm run lint
```

## 7. Teknik Detaylar

### State Yönetimi

React Context API kullanılmaktadır:

```javascript
// UserContext - Kullanıcı yönetimi
const { user, loginUser, registerUser, logoutUser } = useUser();

// CartContext - Sepet yönetimi
const { cartItems, addToCart, removeFromCart, getTotalPrice } = useCart();
```

### LocalStorage Kullanımı

Veri kalıcılığı localStorage'da sağlanır:
- `kullanicilar` - Tüm kullanıcı hesapları
- `aktifKullanici` - Şu anda giriş yapan kullanıcı
- `cart` - Alışveriş sepeti

### Routing

React Router v6 kullanılmaktadır:
```
/ → Home
/products → ProductList
/product/:id → ProductDetail
/login → Login/Register
/cart → Cart
/payment → Payment
/profile → Profile
/orders → Orders
/settings → Settings
/admin → Admin Panel
```

## 8. Özellik Ekleme Rehberi

### Yeni Bir Sayfa Eklemek

1. `src/pages/` içine `YeniSayfa.jsx` dosyası oluştur:
```javascript
import React from 'react';
import Footer from '../components/Footer';

const YeniSayfa = () => {
  return (
    <>
      <section className="section">
        <div className="container">
          <h1>Yeni Sayfa</h1>
          {/* İçerik */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default YeniSayfa;
```

2. `App.jsx` içinde route ekle:
```javascript
<Route path="/yeni-sayfa" element={<YeniSayfa />} />
```

3. Navbar'da link ekle:
```javascript
<Link to="/yeni-sayfa" className="nav-link">Yeni Sayfa</Link>
```

### Yeni Bir Bileşen Eklemek

`src/components/YeniBileşen.jsx` oluştur ve kullan:
```javascript
import YeniBileşen from '../components/YeniBileşen';

// Sayfada kullan
<YeniBileşen />
```

## 9. Yaygın Sorunlar

### Problem: "Module not found" hatası
**Çözüm**: `npm install` komutunu çalıştır

### Problem: Port 3000 zaten kullanımda
**Çözüm**: `vite.config.js` dosyasında portu değiştir
```javascript
server: {
  port: 3001  // değiştir
}
```

### Problem: CSS yüklenmemiş görünüyor
**Çözüm**: Browser cache'i temizle (Ctrl+Shift+Delete)

## 10. Deployment (Yayınlama)

### Vercel'e Deploy

1. Proje klasöründe:
```bash
npm run build
```

2. [Vercel.com](https://vercel.com) adresine git
3. GitHub/GitLab repository'ni bağla
4. Deploy et

### Local'de Test

```bash
npm run build
npm run preview
```

## 11. Daha İleri Olanaklar

### Backend Entegrasyonu
- API endpoint'leri için Axios kütüphanesi ekle
- `.env` dosyasında API URL'sini tanımla
- Context'te fetch işlemlerini yap

### Veritabanı
- Firebase veya MongoDB kullan
- Node.js + Express backend oluştur
- Kullanıcı ve sipariş verilerini sakla

### Payment Gateway
- Stripe veya PayPal entegrasyonu
- API key'lerini `.env` dosyasında tut

### Analytics
- Google Analytics ekle
- Kullanıcı hareketlerini takip et

## 12. Kaynaklar

- [React Dokumentasyon](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Vite Docs](https://vitejs.dev)
- [MDN Web Docs](https://developer.mozilla.org)

## 13. İleri Konular

İleride eklenebilecek özellikler:
- [ ] Redux ile state management
- [ ] TypeScript desteği
- [ ] Unit/Integration testleri
- [ ] CI/CD pipeline
- [ ] Dark mode
- [ ] Çoklu dil desteği
- [ ] Filtreleme ve sıralama
- [ ] Kullanıcı yorumları
- [ ] Wishlist
- [ ] Notifikasyon sistemi

---

**Son Güncelleme**: 2026
**Versiyon**: 1.0.0
