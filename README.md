
# GasKuy Production Plus

Paket lanjutan GasKuy yang melanjutkan paket Go-Live.

## Yang ditambahkan
- Customer dapat memilih titik tujuan langsung pada Google Map.
- GPS perangkat dipakai sebagai titik jemput.
- API order menerima koordinat pickup dan destination yang berbeda.
- CORS backend lebih ketat bila `CORS_ORIGIN` diisi.
- Dokumentasi konfigurasi produksi diperbarui.

## Yang masih wajib sebelum benar-benar dibuka untuk publik
- Login/register customer dan driver dengan token yang tersimpan aman.
- Dispatch otomatis ke driver terdekat.
- UI driver lengkap: order masuk, terima, tiba, mulai, selesai.
- Tracking driver realtime + background GPS.
- Push notification FCM.
- Admin login dan panel operasional lengkap.
- Routing jalan nyata (bukan jarak garis lurus) dan tarif final.
- Payment gateway bila diperlukan.
- HTTPS/domain, backup database, monitoring, rate limiting, audit log.
- Build Android release APK/AAB dan signing key.

Paket ini adalah source code; APK binary belum dikompilasi di lingkungan ini.
