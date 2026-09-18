# Android release checklist

- App name: GasKuy
- Build mode: release
- Package/applicationId: verify in `android/app/build.gradle` or `android/app/build.gradle.kts`
- Google Maps Android key: configure before build
- Backend URL: HTTPS URL, not localhost
- For Play Store later: use signed AAB and a secure upload keystore.
- For direct installation/testing: release APK is sufficient.

Never publish API secrets or signing keys in a public repository.
