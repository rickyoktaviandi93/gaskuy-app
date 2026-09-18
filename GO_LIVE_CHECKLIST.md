# GasKuy Go-Live Checklist

## Wajib
[ ] Domain API aktif
[ ] HTTPS aktif
[ ] PostgreSQL/PostGIS aktif
[ ] DATABASE_URL production diisi
[ ] JWT_SECRET dibuat acak dan rahasia
[ ] CORS dibatasi ke domain admin
[ ] Google Maps Android key dibuat dan dibatasi ke package/SHA-1
[ ] Customer APK dikonfigurasi API URL
[ ] Driver APK dikonfigurasi API URL
[ ] Android release keystore dibuat
[ ] Backup database otomatis
[ ] Monitoring/health check aktif
[ ] Admin account dibuat dengan role ADMIN

## Operasional
[ ] Verifikasi identitas driver
[ ] SOP keselamatan dan layanan
[ ] Tarif resmi ditetapkan
[ ] Kebijakan privasi
[ ] Syarat layanan
[ ] Kontak bantuan pelanggan
[ ] Payment gateway jika pembayaran online diperlukan
[ ] Firebase/FCM jika push notification diperlukan

## Build
Customer:
  cd customer_app
  flutter pub get
  flutter build apk --release

Driver:
  cd driver_app
  flutter pub get
  flutter build apk --release

Untuk Play Store:
  flutter build appbundle --release

## Batas paket ini
Paket tidak berisi credential, domain, kartu pembayaran, Firebase secret, Google API key, atau signing keystore. Semua itu harus dibuat oleh pemilik layanan.
