# Kampüs Etkinlikleri — Frontend

Bu sürümde kullanıcının gördüğü arayüz (renkler, metinler, etkinlikler, sayfalar) korunur.
Uygulama iç yapısı, veri akışı ve form bileşenleri yeniden düzenlenmiştir.

## Başlatma

```bash
npm install
npm run dev
```

Kontrol ve üretim derlemesi:

```bash
npm run lint
npm run build
```

## Sayfalar

- `/` — Ana Sayfa
- `/events` — Etkinlikler
- `/events/:id` — Etkinlik detayı
- `/admin` — Yönetim
- `/admin/new` — Yeni etkinlik
- `/admin/:id/edit` — Etkinlik düzenleme
- `/login` — Giriş
- `/register` — Kayıt
- `/forgot-password` — Şifre sıfırlama

## Kod yapısı

- `src/core/event-store.ts`: etkinlik güncelleme işlemlerinin saf fonksiyonları
- `src/core/event-queries.ts`: listeleme, arama, tarih ve kayıt bulma
- `src/core/form-rules.ts`: etkinlik formu kuralları
- `src/context/EventsContext.tsx`: `useReducer` ile bellek içi etkinlik yönetimi
- `src/hooks/`: formlar için yeniden kullanılabilir durum yönetimi
- `src/components/`: ekranda görünen tekrar kullanılabilir bileşenler
- `src/pages/`: sayfalar

Bu sprintte bilgiler yalnızca bellektedir: sayfa yenilenince ilk 6 etkinlik geri gelir.
API bağlantısı henüz eklenmemiştir.

Öğrenci: 2416501075 - Elif Nur Özek - 2026
