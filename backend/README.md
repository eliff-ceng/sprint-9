# Kampüs API — Sprint 9
Express + MongoDB Atlas + Mongoose. Port 3000. Frontend Sprint 8 ile aynı.

## Kurulum (backend klasöründe)
```bash
npm install
cp .env.example .env
```
Önceki Sprint 8 `.env` dosyan varsa onu kopyalayabilirsin; yoksa `.env` içinde kendi Atlas MONGODB_URI değerini gir. GitHub'a gönderme. Atlas Network Access ve Database Access ayarlarını kontrol et.
```bash
npm run seed
npm run dev
```
**Seed mevcut kampus etkinliklerini siler ve altı örnek ekler.** Test veritabanında çalıştır. Tarihler 25 Kasım 2026 haftasına göre iki geçmiş ve dört gelecek etkinliktir; daha sonraki tarihlerde seed tarihlerini güncelle.

| Method | Endpoint | Başarı | Hata |
|---|---|---|---|
| GET | /health | 200 | |
| GET | /events?search=&category= | 200 | |
| GET | /events/upcoming | 200, tarih ve saat sıralı | |
| GET | /events/:id | 200 | 404 |
| POST | /events | 201 | 400 |
| PATCH | /events/:id | 200, güncel kayıt | 400, 404 |
| DELETE | /events/:id | 204, boş gövde | 404 |

Tarih API'de GG-AA-YYYY, DB'de BSON Date (UTC). Hata: `{"error":{"message":"..."}}`. PATCH örneği: `{"capacity":55}`. Arama başlıkta, büyük/küçük harf duyarsız; kategoriyle birlikte kullanılabilir.

## Test ve teslim
1. `npm test` — Atlas gerektirmeyen yerel model ve taklit DB testleri.
2. `npm i -g newman` (gerekirse kullanıcıya ait npm prefix kullan).
3. Postman Import: `https://webdersi.vercel.app/test.json` (hocanın resmi koleksiyonu). Backend açıkken, seed sonrası çalıştır. Hedef 18 istek, 45 test, 0 hata. Export Collection ile `requests/kampus-api.json` dosyasını resmi koleksiyonla değiştir; Runner Export Results ile `requests/run-results.json` kaydet.
4. Terminal kontrolü: `newman run https://webdersi.vercel.app/test.json`.
5. `requests/kampus-api.json` başlangıçta bağımsız yerel kontrol koleksiyonudur, resmi dosya değildir. Sonuç dosyası gerçek çalışma olmadan oluşturulmamıştır.
6. Her mantıksal adım ayrı commit; GitHub push. `.env`, `node_modules` ve gerçek Atlas adresi yüklenmemeli.
