# Özelleştirme Rehberi

## Ürünleri Eklemek/Değiştirmek

### Ürün Veri Dosyası

Dosya: `src/data/products.js`

```javascript
export const products = [
  {
    id: 1,
    name: "Akıllı Saat",
    emoji: "⌚",
    description: "Adım sayar, kalp ritmi, bildirim",
    price: 1299,
    detailedDescription: "Premium akıllı saat...",
    image: "https://via.placeholder.com/300x300?text=Akilli+Saat"
  },
  // YENİ ÜRÜN EKLE
  {
    id: 6,
    name: "Tablet",
    emoji: "📱",
    description: "10 inç fullHD ekran",
    price: 3999,
    detailedDescription: "10 inç fullHD ekran, 4GB RAM, 128GB depolama",
    image: "https://via.placeholder.com/300x300?text=Tablet"
  }
];
```

### Ürün Nesnesi Yapısı

```javascript
{
  id: number,              // Benzersiz ID (autoinc)
  name: string,            // Ürün adı
  emoji: string,           // Emoji temsili
  description: string,     // Kısa açıklama
  price: number,          // Fiyat (Türk Lirası)
  detailedDescription: string, // Uzun açıklama
  image: string           // Görsel URL'si
}
```

## Renk Şemasını Değiştirmek

### CSS Değişkenleri

Dosya: `src/styles/globals.css`

```css
:root {
  --bg: #fafaf8;           /* Arka plan */
  --text: #0e0e0d;         /* Yazı rengi */
  --gray: #888880;         /* Gri ton */
  --gold: #c8a96e;         /* Vurgu rengi */
  --white: #ffffff;        /* Beyaz */
  --light-gray: #f5f5f3;   /* Açık gri */
  --border: #e8e8e6;       /* Sınır */
  --error: #d32f2f;        /* Hata kırmızısı */
}
```

**Örnek**: Mor tema

```css
:root {
  --bg: #f0e6ff;
  --text: #3d0066;
  --gold: #9933ff;
  --light-gray: #e6d9ff;
  --border: #d9ccff;
}
```

## Logo/Site Adını Değiştirmek

### Navbar

Dosya: `src/components/Navbar.jsx`

```jsx
<Link to="/" className="navbar-logo">
  MAĞAZA  {/* Burası */}
</Link>
```

### Footer

Dosya: `src/components/Footer.jsx`

```jsx
<footer>
  <h3>MAĞAZA</h3>  {/* Burası */}
  <p>En kaliteli teknoloji ürünleri en uygun fiyatlarla</p>
</footer>
```

### Browser Sekmesi

Dosya: `public/index.html`

```html
<title>MAĞAZA - Modern E-Ticaret</title>  {/* Burası */}
```

## Sosyal Medya Linklerini Güncelleme

Dosya: `src/data/products.js`

```javascript
export const socialLinks = [
  {
    id: 1,
    name: "Instagram",
    icon: "fab fa-instagram",
    color: "#E1306C",
    followers: "45.2K Takipçi"
    // URL eklemek için handler gerekli
  },
  // ...
];
```

Handler eklemek için `src/components/SocialMedia.jsx` içinde:

```jsx
<a href="https://instagram.com/sizin-profil" target="_blank" rel="noopener noreferrer">
  <button>Takip Et</button>
</a>
```

## Admin Hesabı Oluşturma

Admin paneline erişmek için kullanıcı adı `admin` olmalıdır.

1. `/login` sayfasına git
2. "Hesap Oluştur" sekmesine tıkla
3. Bilgileri gir (username: `admin`)
4. `/admin` sayfasına erişebilirsin

## Sayfaların Başlığını Değiştirmek

Her sayfa başlığını değiştirmek için:

```jsx
// src/pages/XYZ.jsx
const XYZ = () => {
  useEffect(() => {
    document.title = "MAĞAZA - Yeni Başlık";
  }, []);
  
  return (
    <>
      <section className="section">
        <h1 className="section-title">Sayfa Başlığı</h1>
        {/* İçerik */}
      </section>
    </>
  );
};
```

## Yeni Navigasyon Linki Eklemek

`src/components/Navbar.jsx` dosyasında:

```jsx
<Link to="/yeni-sayfa" className="nav-link">
  Yeni Sayfa
</Link>
```

Daha sonra`src/App.jsx` dosyasında route ekle:

```jsx
<Route path="/yeni-sayfa" element={<YeniSayfa />} />
```

## Font Değiştirmek

`src/styles/globals.css` dosyasında:

```css
@import url('https://fonts.googleapis.com/css2?family=YeniFontu:wght@400;600;700&display=swap');

:root {
  --font-serif: 'YeniFontu', serif;
  --font-sans: 'YeniFontu', sans-serif;
}
```

## Email/Bildirim Konfigürasyonu

Gerçek email göndermek için `src/pages/Payment.jsx` dosyasında:

```javascript
// EmailJS veya başka servis kullan
const sendConfirmationEmail = async (email, order) => {
  // API çağrısı
};
```

## SEO Optimizasyonu

Meta tagleri eklemek için helmet kullanabilirsin:

```bash
npm install react-helmet
```

Sonra:

```jsx
import { Helmet } from 'react-helmet';

<>
  <Helmet>
    <title>Sayfa Başlığı - MAĞAZA</title>
    <meta name="description" content="Sayfa açıklaması" />
    <meta property="og:title" content="Sayfa Başlığı" />
  </Helmet>
</>
```

## Kategoriler Ekleme

`src/data/products.js` dosyasında `category` alanı ekle:

```javascript
{
  id: 1,
  name: "Akıllı Saat",
  category: "wearables",  // YENI
  // ...
}
```

Sonra filtreleme ekle:

```jsx
const getProductsByCategory = (category) => {
  return products.filter(p => p.category === category);
};
```

## Kupon/İndirim Sistemi

`src/context/CartContext.jsx` dosyasına ekle:

```javascript
const applyCoupon = (code) => {
  const coupons = {
    'INDIRIM10': 0.10,  // %10 indirim
    'INDIRIM20': 0.20   // %20 indirim
  };
  
  if (coupons[code]) {
    setDiscount(coupons[code]);
    return true;
  }
  return false;
};
```

Ödeme sayfasında kullan:

```jsx
const discountedTotal = getTotalPrice() * (1 - discount);
```

## Ürün Resimlerini Aktivlere Yapma

Şu anda emoji kullanılıyor. Gerçek resim için:

```jsx
// ProductCard.jsx
<div className="product-image">
  {product.image ? (
    <img src={product.image} alt={product.name} />
  ) : (
    <span>{product.emoji}</span>
  )}
</div>
```

## API İntegrasyonu Örneği

Gerçek API'den ürün yükleme:

```javascript
// src/pages/Products.jsx
useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error(err));
}, []);
```

## Hata Sayfası Ekleme

`src/pages/NotFound.jsx`:

```jsx
const NotFound = () => (
  <>
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <Link to="/">Ana Sayfaya Dön</Link>
    </div>
  </>
);
```

`App.jsx` içinde:

```jsx
<Route path="*" element={<NotFound />} />
```

## Tema Değiştirici Eklemek

Dark mode örneği:

```jsx
const [isDark, setIsDark] = useState(false);

useEffect(() => {
  document.documentElement.style.setProperty(
    '--bg',
    isDark ? '#1a1a1a' : '#fafaf8'
  );
}, [isDark]);
```

---

**Daha fazla yardım veya özelleştirme için lütfen kod dosyalarına bakın.**
