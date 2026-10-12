# REDY AI ücretsiz pilot — 12 Ekim 2026

`redy-ai.html`, `redy-ai.css` ve `redy-ai.js` GitHub Pages kök dizininde çalışır. `index.html` menüsünden ve giriş ekranından erişilir.

Bu sürüm çevrimdışı örnek arayüzdür. Günlük, haftalık ve aylık rakamlar kurgusaldır; özetler sabit şablondur. Kopyalanan ve indirilen metinler de bu etiketi taşır. Claude API, Supabase, çerezler veya oturum depolaması kullanılmaz. `connect-src 'none'` ağ isteklerini engeller. Canlı rapor düğmesi devre dışıdır.

## Mevcut Supabase işleviyle sözleşme

12 Ekim'de incelenen canlı `redy-ai` işlevi: sürüm 3, `verify_jwt=true`.

- İstek: POST, JSON `{"mode":"report","period":"day"}`; dönem `day`, `week` veya `month`.
- `Authorization: Bearer <kullanıcı erişim JWT>` gerekir; genel publishable anahtar kullanıcı oturumu yerine geçmez.
- Yanıt: başarılı durumda `{"answer":"...","mode":"report"}`; hata durumunda non-2xx ve `error` alanı, ağ geçidinde `code/message` olabilir.
- `getUser(jwt)` ile kullanıcı, `profiles` ile aktiflik ve yönetici rolü doğrulanır. Sorgular kullanıcı JWT'siyle RLS altında çalışır. `profiles`, `visits`, `payments` tablolarında RLS açıktır. Profil yazma politikası yönetici kontrolüne bağlıdır.
- CORS kökeni `https://gbk50.github.io`; pilot aynı kökendedir. Canlı sorgu alanları veritabanı şemasıyla karşılaştırıldı ve mevcut.
- Claude'a yalnızca dönem, sayımlar, toplam tutar ve saat dağılımı gönderilir. API anahtarı sunucudan okunur.

Ücretsiz arayüz bu sözleşmeyi ÇAĞIRMAZ. İleride canlı entegrasyon ayrıca eklenmeli; yalnızca düğmenin kilidini kaldırmak yeterli değildir. Canlı yanıta ancak başarılı sunucu cevabından sonra Claude etiketi verilmeli; hata halinde örnek metin canlı çıktı olarak gösterilmemeli.

## Canlı AI açılmadan önce

1. Claude kredisi/model erişimi ve harcama sınırı doğrulanmalı. Bu çalışmada ödeme veya başarılı Claude isteği yapılmadı.
2. İşlevde kullanıcı başına kalıcı hız/kullanım kotası yok. Arayüz kapalı olsa da mevcut uç nokta geçerli yönetici oturumuyla çağrılabilir. Sunucu kotası ve tercihen sunucu tarafı açma/kapama anahtarı eklenmeli.
3. Ödeme yöntemi sınıflaması `Nakit/Kart/Havale/EFT` değerleriyle sınırlı. Ana uygulama `Kredi kartı`, `Yemek kartı` ve parçalı ödeme kullanıyor; bunların eşlenmesi doğrulanmadan dağılım güvenilir kabul edilmemeli.
4. İşlev aktiflik için hem `is_active=true` hem `status='Aktif'` arıyor; RLS yardımcıları farklı `coalesce` kuralı uyguluyor. İşlev `Yönetici` rolünü de kabul ederken `is_admin()` yalnızca `ADMIN` kullanıyor. Gerçek yönetici/personel hesaplarıyla tutarlılık testi gerekiyor.
5. Dönem başına 1.000 ziyaret/ödeme sınırı var; aşımda 422. Çok işletmeli veri izolasyonu yok. Başka işletmelere açılmamalı.

## Yapılan kontroller

- Üç dönemin toplamları, metin kopyalama/indirme etiketleri, kopyalama izni reddi ve mevcut ana uygulamanın scriptlerinin değişmediği yerel olarak kontrol edildi.
- Canlı işlev OPTIONS: 204 ve izin verilen GitHub Pages kökeni.
- Oturumsuz POST: 401, eksik yetkilendirme başlığı. Claude çağrısına ulaşmadı.
- Yönetici/personel uçtan uca AI testi ve başarılı Claude çıktısı henüz yok.

## Kaynak paket sınırı

İstenen `/mnt/data/REDY_AI_Ucretsiz_Pilot_ve_Claude_Startups_2026-10-12.zip` bu oturumda erişilebilir değildi. Önceki konuşma aktarımı asistan metinleri yerine referanslar döndürdü. Yerel indirilen `REDY_AI_Rapor_Entegrasyonu_2026-10-12.zip` incelendi; içindeki eski prototip Supabase'e yeniden dağıtılmadı. Bu arayüz mevcut repo ve canlı işlev incelenerek yeniden hazırlandı; erişilemeyen ZIP'in birebir kopyası değildir.

Kaynak: https://supabase.com/docs/guides/functions/auth
