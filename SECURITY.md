# Security baseline
- Jangan commit .env, keystore, API key, password database, atau Firebase secret.
- Gunakan HTTPS/WSS untuk production.
- Batasi CORS.
- Batasi Google Maps key berdasarkan aplikasi.
- Gunakan password database yang kuat.
- Backup database dan uji restore.
- Tambahkan rate limiting/WAF pada deployment publik.
- Audit akses admin.
- Simpan log tanpa password/token.
