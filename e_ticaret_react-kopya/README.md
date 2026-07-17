# ParkYönet

Kamera kaynaklı plaka okuma olaylarını işleyen, aktif parkları izleyen, ücret hesaplayan ve görevli incelemesi sunan React arayüzü.

## Çalıştırma

```bash
npm install
npm run dev
```

Doğrulama için `npm run lint`, `npm test` ve `npm run build` komutlarını kullanın.

## Özellikler

- Giriş/çıkış yönü, kamera kimliği, OCR güveni ve görüntü referansı ile plaka olayı kaydı
- Plaka normalleştirme, %80 OCR güven eşiği ve 30 saniyelik tekrar-kare engelleme
- Aktif oturum eşleştirme, kalış süresi ve yapılandırılabilir tarife ile ücretlendirme
- Bekleyen ödeme ve görevli incelemesi ekranları
- Tarayıcıdaki demo verisi için denetim kaydı ve KVKK bilgilendirme sayfası

Bu depo bir backend veya gerçek OCR modeli içermez. Üretim API sözleşmesi, veritabanı gereksinimleri ve veri koruma notları için [entegrasyon belgesine](docs/PARKING_INTEGRATION.md) bakın.
