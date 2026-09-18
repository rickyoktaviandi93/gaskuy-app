
# GasKuy — urutan menuju aplikasi publik

## Tahap 1 — Server
1. Siapkan VPS/cloud dengan Docker.
2. Buat database PostGIS.
3. Isi `DATABASE_URL`, `JWT_SECRET`, dan `CORS_ORIGIN`.
4. Pasang domain API dan HTTPS.
5. Jalankan health check `/health`.

## Tahap 2 — Google Maps
1. Buat project Google Cloud.
2. Aktifkan Maps SDK for Android.
3. Batasi API key.
4. Masukkan key ke `customer_app/lib/config.dart`.

## Tahap 3 — Operasional
1. Buat akun admin pertama.
2. Uji customer register/login.
3. Uji driver online/offline.
4. Uji order sampai complete.
5. Uji rating.
6. Uji realtime dan notifikasi.

## Tahap 4 — Android
1. Set applicationId/package name.
2. Set app icon/name.
3. Buat signing key.
4. Build `app-release.apk` untuk pengujian.
5. Build `.aab` untuk Google Play.

## Catatan
Jangan menaruh password database, JWT secret, atau signing key di repository publik.
