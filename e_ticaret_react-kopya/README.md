# E-Ticaret React Uygulaması

Modern React tabanlı e-ticaret uygulaması, Vite build tool'u, React Router ve Context API kullanılarak geliştirilmiştir.

## Özellikler

- ✨ Modern React 18 mimarisi
- 🛍️ Ürün kataloğu ve arama
- 🛒 Alışveriş sepeti yönetimi
- 👤 Kullanıcı kimlik doğrulaması ve kayıt
- 💳 Ödeme sayfası
- 📱 Responsive tasarım
- 🎨 Özel tasarlanmış CSS
- ⚡ Vite ile hızlı build işlemi

## Kurulum

### Gereksinimler

- Node.js 16+ 
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Browser'da açın: `http://localhost:3000`

## Build

Üretim için build oluşturun:
```bash
npm run build
```

Build çıktısı `dist/` klasöründe oluşturulacaktır.

## Proje Yapısı

```
e-ticaret-react/
├── src/
│   ├── components/        # Yeniden kullanılabilir React bileşenleri
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── HeroSlider.jsx
│   │   └── SocialMedia.jsx
│   ├── pages/            # Sayfa bileşenleri
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Login.jsx
│   │   ├── Cart.jsx
│   │   ├── Payment.jsx
│   │   ├── Profile.jsx
│   │   ├── Orders.jsx
│   │   ├── Settings.jsx
│   │   └── Admin.jsx
│   ├── context/          # React Context (Global State)
│   │   ├── UserContext.jsx
│   │   └── CartContext.jsx
│   ├── data/             # Veriler
│   │   └── products.js
│   ├── styles/           # CSS dosyaları
│   │   ├── globals.css
│   │   ├── navbar.css
│   │   ├── footer.css
│   │   ├── slider.css
│   │   ├── product.css
│   │   └── auth.css
│   ├── App.jsx           # Kök aplikasyon bileşeni
│   └── main.jsx          # Entry point
├── public/
│   └── index.html        # HTML şablonu
├── package.json
├── vite.config.js        # Vite konfigürasyonu
└── README.md
```

## Kullanıcı Hesapları (Test)

Giriş yapmak için yeni bir hesap oluşturun veya test amaçlı:

- **Kullanıcı Adı**: herhangi
- **Şifre**: istediğiniz

## Sayfalar

- **Anasayfa**: Öne çıkan ürünler ve hero slider
- **Ürünler**: Tüm ürünleri listele ve ara
- **Ürün Detayı**: Ürün hakkında detaylı bilgi
- **Giriş/Kayıt**: Kullanıcı kimlik doğrulaması
- **Sepet**: Seçilen ürünleri yönet
- **Ödeme**: Kapı teslimatı bilgileri ve ödeme
- **Profilim**: Kullanıcı profili bilgileri
- **Siparişlerim**: Geçmiş siparişler
- **Ayarlar**: Hesap ayarları
- **Admin Paneli**: Yönetim araçları (admin hesabı gerekli)

## Teknolojiler

- **React 18**: UI kütüphanesi
- **React Router v6**: Sayfa yönlendirmesi
- **Vite**: Build tool
- **Context API**: Global state management
- **CSS3**: Styling ve animasyonlar

## Özellikler Detaylı

### Ürün Yönetimi
- Ürün listesini görüntüle
- Ürün détay sayfası
- Arama ve filtreleme

### Alışveriş Sepeti
- Ürün ekleme/kaldırma
- Miktar güncelleme
- LocalStorage'da kalıcı depolama

### Kullanıcı Sistemi
- Kayıt ol / Giriş yap
- Profil görüntüleme
- Çıkış yap

### Ödeme
- Teslimat bilgileri formu
- Kart bilgileri formu
- Sipariş özeti

## LocalStorage Veri Yapısı

- `kullanicilar`: Kayıtlı tüm kullanıcılar
- `aktifKullanici`: Şu anda giriş yapan kullanıcı
- `cart`: Alışveriş sepeti öğeleri
- `lastOrder`: Son yapılan sipariş

## Geliştirme Notları

- Context API ile state yönetimi yapılmıştır
- LocalStorage ile data kalıcılığı sağlanmıştır
- Responsive tasarım mobil cihazlarda da çalışır
- Tüm formlar validasyon ile korunmştur

## Lisans

MIT

## İletişim

Sorularınız veya önerileriniz için iletişime geçiniz.
