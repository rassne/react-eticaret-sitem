export const defaultProducts = [
  {
    id: 1,
    name: "Akıllı Saat",
    emoji: "⌚",
    description: "Adım sayar, kalp ritmi, bildirim",
    shortDesc: "Adım sayar, kalp ritmi, bildirim",
    price: 1299,
    detailedDescription: "Premium akıllı saat, günlük aktivitelerinizi takip edin. Kalp ritmi sensörü, adım sayar, uyku takibi ve daha pek çok özellik.",
    longDesc: "Premium akıllı saat, günlük aktivitelerinizi takip edin. Kalp ritmi sensörü, adım sayar, uyku takibi ve daha pek çok özellik.",
    image: "https://via.placeholder.com/300x300?text=Akilli+Saat",
    category: "Elektronik",
    stock: 50,
    rating: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Kablosuz Kulaklık",
    emoji: "🎧",
    description: "Gürültü önleyici, 30 saat pil",
    shortDesc: "Gürültü önleyici, 30 saat pil",
    price: 849,
    detailedDescription: "Aktif gürültü önleme teknolojisi ile kristal berraklığında ses. 30 saatlik pil ömrü, hızlı şarj, konforlu tasarım.",
    longDesc: "Aktif gürültü önleme teknolojisi ile kristal berraklığında ses. 30 saatlik pil ömrü, hızlı şarj, konforlu tasarım.",
    image: "https://via.placeholder.com/300x300?text=Kulaklık",
    category: "Elektronik",
    stock: 75,
    rating: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Akıllı Ampul",
    emoji: "💡",
    description: "16 milyon renk, uygulama kontrolü",
    shortDesc: "16 milyon renk, uygulama kontrolü",
    price: 199,
    detailedDescription: "Mobil uygulaması ile 16 milyon renkten seçim yapın. Zamanlama ve sesli kontrol özellikleri ile hayatınızı kolaylaştırın.",
    longDesc: "Mobil uygulaması ile 16 milyon renkten seçim yapın. Zamanlama ve sesli kontrol özellikleri ile hayatınızı kolaylaştırın.",
    image: "https://via.placeholder.com/300x300?text=Ampul",
    category: "Ev & Yaşam",
    stock: 100,
    rating: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "Mini Kamera",
    emoji: "📷",
    description: "4K video, WiFi, gece görüşü",
    shortDesc: "4K video, WiFi, gece görüşü",
    price: 2499,
    detailedDescription: "4K video çekimi, WiFi bağlantısı, gece görüş modu ve hareket algılaması. Profesyonel fotoğraf kalitesi.",
    longDesc: "4K video çekimi, WiFi bağlantısı, gece görüş modu ve hareket algılaması. Profesyonel fotoğraf kalitesi.",
    image: "https://via.placeholder.com/300x300?text=Mini+Kamera",
    category: "Elektronik",
    stock: 30,
    rating: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "Kablosuz Mouse",
    emoji: "🖱️",
    description: "Ergonomik, 12 ay pil",
    shortDesc: "Ergonomik, 12 ay pil",
    price: 399,
    detailedDescription: "Ergonomik tasarım ile günlük kullanım için mükemmel. Hassas sensör, 12 ay pil ömrü, birden fazla cihaza bağlanabilir.",
    longDesc: "Ergonomik tasarım ile günlük kullanım için mükemmel. Hassas sensör, 12 ay pil ömrü, birden fazla cihaza bağlanabilir.",
    image: "https://via.placeholder.com/300x300?text=Mouse",
    category: "Elektronik",
    stock: 60,
    rating: 5,
    createdAt: new Date().toISOString()
  }
];

export const products = defaultProducts;

// Initialize localStorage with default products on first run
export const initializeProductsStorage = () => {
  if (!localStorage.getItem("urunler")) {
    localStorage.setItem("urunler", JSON.stringify(defaultProducts));
  }
};

export const socialLinks = [
  {
    id: 1,
    name: "Instagram",
    icon: "fab fa-instagram",
    color: "#E1306C",
    followers: "45.2K Takipçi"
  },
  {
    id: 2,
    name: "Twitter/X",
    icon: "fab fa-x-twitter",
    color: "#000",
    followers: "23.8K Takipçi"
  },
  {
    id: 3,
    name: "YouTube",
    icon: "fab fa-youtube",
    color: "#FF0000",
    followers: "89.5K Abone"
  },
  {
    id: 4,
    name: "TikTok",
    icon: "fab fa-tiktok",
    color: "#000",
    followers: "156.3K Takipçi"
  }
];
