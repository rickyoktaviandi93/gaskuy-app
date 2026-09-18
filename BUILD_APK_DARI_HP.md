# GasKuy — Build APK dari HP Android

## Cara yang direkomendasikan: Codemagic + GitHub

Tidak perlu komputer. HP hanya dipakai untuk upload proyek dan memulai build.

### 1. Buat repository GitHub
- Buka GitHub di browser HP.
- Buat repository baru, misalnya `gaskuy-app`.
- Upload isi folder `GasKuy_APK_Build_HP`.
- Jangan upload file yang berisi password, JWT secret, keystore, atau API secret.

### 2. Hubungkan ke Codemagic
- Buka Codemagic melalui browser.
- Login dengan GitHub.
- Pilih repository `gaskuy-app`.
- Pilih proyek Flutter `customer_app`.
- Gunakan workflow Android yang menghasilkan APK.

### 3. Konfigurasi build
- Flutter project directory: `customer_app`
- Build command: `flutter build apk --release`
- Artifact: `customer_app/build/app/outputs/flutter-apk/app-release.apk`

### 4. Setelah build selesai
Download artifact `app-release.apk` dari halaman hasil build.
Buka file APK di HP dan izinkan instalasi dari sumber yang Anda gunakan bila Android memintanya.

## Sebelum build
Edit:
`customer_app/lib/config.dart`

Isi URL backend HTTPS Anda dan Google Maps API key.

## Catatan
APK ini dapat dibuat sebagai APK instalasi untuk pengujian. Agar aplikasi benar-benar operasional sebagai layanan ojek online, backend, database, Maps, autentikasi, dispatch driver, realtime tracking, notifikasi, dan keamanan produksi tetap harus dikonfigurasi.
