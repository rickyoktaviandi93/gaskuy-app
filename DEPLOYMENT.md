# Deployment checklist

## Server
- Linux VPS/cloud server
- PostgreSQL + PostGIS
- HTTPS reverse proxy
- Environment variables
- Firewall
- Backups

## Android
Customer dan Driver masing-masing dibuild:
`flutter pub get`
`flutter build apk --release`

Untuk distribusi Play Store gunakan AAB:
`flutter build appbundle --release`

## Integrasi eksternal
- Google Maps: Android API key
- Firebase Cloud Messaging: push notification
- Payment gateway: credential merchant
- SMS/WhatsApp OTP: provider credential

Jangan memasukkan credential ke ZIP/source publik.
