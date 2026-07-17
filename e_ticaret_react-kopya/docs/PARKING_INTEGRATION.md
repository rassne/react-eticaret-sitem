# Otopark plaka tanıma entegrasyonu

Bu React uygulaması operasyon arayüzü ve tarayıcı tabanlı demo kayıt katmanıdır. Üretimde LocalStorage kullanılmamalı; aşağıdaki sözleşmeyi uygulayan kimliği doğrulanmış bir backend'e bağlanmalıdır.

## Kamera ve OCR olayı

Her kamera benzersiz bir `cameraId` ile kaydedilir ve `direction` değeri `entry` veya `exit` olur. OCR istemcisi `POST /api/v1/plate-readings` isteğinde şu alanları gönderir:

```json
{"plate":"34 ABC 123","direction":"entry","cameraId":"ENTRY-01","confidence":0.96,"photoRef":"s3://private-bucket/frame.jpg","occurredAt":"2026-07-17T09:00:00Z"}
```

Sunucu plakayı normalize etmeli, güven eşiğini uygulamalı ve kamera kimliğini doğrulamalıdır. `201` işlenmiş olay, `202` görevli incelemesi, `409` tekrar kare veya tutarsız olay için kullanılmalıdır. Kamera istemcileri mTLS veya kısa ömürlü servis kimlik bilgileriyle yetkilendirilmelidir.

## Kalıcılık ve işlemler

Veritabanında `cameras`, `vehicles`, `parking_sessions`, `plate_readings`, `tariffs`, `payments`, `manual_reviews` ve yalnızca ekleme yapılabilen `audit_logs` tabloları tutulmalıdır. Plaka ve `status=active` üzerinde benzersiz/uygun kilit kullanarak giriş ve çıkış işleme işlemleri tek bir veritabanı transaction'ında yürütülmelidir. Tekrarlanan kare penceresi kamera, yön ve normalize plaka bazında 30 saniyedir.

Çıkış transaction'ı aktif oturumu kilitler, kalış süresini ve ücretini hesaplar, oturumu tamamlar ve bekleyen ödeme oluşturur. Başarısız OCR, geçersiz plaka, ikinci giriş ve eşleşmeyen çıkışlar `manual_reviews` tablosuna gider; görevli düzeltmesi de denetim kaydı üretir.

## Veri koruma

Görüntüler herkese açık URL olarak saklanmamalıdır. Rol tabanlı erişim, şifreleme, denetim günlükleri, saklama süresi ve silme/anonimleştirme işi uygulanmalıdır. İşletme, KVKK aydınlatma metnini, başvuru kanalını ve veri sorumlusu bilgilerini kendi süreçlerine uygun biçimde sunmalıdır.
