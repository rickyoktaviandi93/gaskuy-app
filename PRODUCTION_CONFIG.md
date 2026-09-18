
# GasKuy — konfigurasi produksi

1. Ubah `customer_app/lib/config.dart`:
   - `apiBaseUrl` → URL HTTPS backend Anda, contoh `https://api.domainanda.com/api/v1`
   - `googleMapsApiKey` → API key Google Maps Android.
2. Pada Google Cloud aktifkan Maps SDK for Android dan batasi API key ke package/SHA-1 aplikasi.
3. Pengguna memilih titik tujuan langsung di peta. Titik jemput berasal dari GPS perangkat.
4. Backend menghitung jarak garis-lurus untuk estimasi tarif. Untuk tarif berbasis rute jalan yang akurat, integrasikan Google Routes API/Mapbox Directions di backend sebelum peluncuran komersial.
5. Untuk aplikasi publik, tambahkan login/token sebelum endpoint order digunakan.
