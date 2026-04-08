// Trust page data - customer reviews, collaborations, and awards

export const defaultTrustData = {
  reviews: [
    {
      id: 1,
      customerName: 'Ahmet Yılmaz',
      rating: 5,
      review: 'Ürün kalitesi harika, çok memnun kaldım! Hızlı kargo ve güvenilir alışveriş deneyimi.',
      date: '2024-01-15',
      avatar: 'https://via.placeholder.com/60x60?text=AY'
    },
    {
      id: 2,
      customerName: 'Fatma Demir',
      rating: 5,
      review: 'Müşteri hizmetleri çok ilgili ve yardımsever. Kesinlikle tavsiye ederim!',
      date: '2024-02-20',
      avatar: 'https://via.placeholder.com/60x60?text=FD'
    },
    {
      id: 3,
      customerName: 'Mehmet Kaya',
      rating: 5,
      review: 'Fiyat performans oranı mükemmel. Aynı ürünü başka yerde bu fiyata bulamazsınız.',
      date: '2024-03-10',
      avatar: 'https://via.placeholder.com/60x60?text=MK'
    }
  ],
  collaborations: [
    {
      id: 1,
      companyName: 'TechCorp',
      logo: 'https://via.placeholder.com/120x60?text=TechCorp',
      description: '2022 yılından beri teknoloji ortağımız'
    },
    {
      id: 2,
      companyName: 'GlobalShip',
      logo: 'https://via.placeholder.com/120x60?text=GlobalShip',
      description: 'Lojistik ve kargo hizmetleri partneri'
    },
    {
      id: 3,
      companyName: 'PaySecure',
      logo: 'https://via.placeholder.com/120x60?text=PaySecure',
      description: 'Güvenli ödeme sistemleri sağlayıcısı'
    }
  ],
  awards: [
    {
      id: 1,
      title: 'En İyi E-Ticaret Sitesi',
      year: 2024,
      description: 'Yılın e-ticaret platformu ödülü',
      image: 'https://via.placeholder.com/80x80?text=Award'
    },
    {
      id: 2,
      title: 'Müşteri Memnuniyeti Ödülü',
      year: 2023,
      description: 'En yüksek müşteri memnuniyeti puanı',
      image: 'https://via.placeholder.com/80x80?text=Award'
    },
    {
      id: 3,
      title: 'Güvenilir Alışveriş Sertifikası',
      year: 2023,
      description: 'Tüketici güvenliği ve memnuniyet sertifikası',
      image: 'https://via.placeholder.com/80x80?text=Award'
    }
  ]
};

// Initialize localStorage with default trust data on first run
export const initializeTrustStorage = () => {
  if (!localStorage.getItem('trustData')) {
    localStorage.setItem('trustData', JSON.stringify(defaultTrustData));
  }
};

// Get trust data from localStorage
export const getTrustData = () => {
  const data = localStorage.getItem('trustData');
  return data ? JSON.parse(data) : defaultTrustData;
};

// Save trust data to localStorage
export const saveTrustData = (data) => {
  localStorage.setItem('trustData', JSON.stringify(data));
};
