/* Offline preview only. No credentials, storage, database access or network requests. */
(() => {
  'use strict';
  const samples = {
    day: { label: 'Günlük örnek · 12 Ekim 2026', visits: 48, payments: 36, cash: 6000, card: 10500, other: 1500, hour: '16:00–16:59', peak: 12 },
    week: { label: 'Haftalık örnek · 5–11 Ekim 2026', visits: 312, payments: 240, cash: 38000, card: 72000, other: 10000, hour: '17:00–17:59', peak: 62 },
    month: { label: 'Aylık örnek · Eylül 2026', visits: 1240, payments: 950, cash: 145000, card: 300000, other: 30000, hour: '16:00–16:59', peak: 230 }
  };
  const byId = id => document.getElementById(id);
  const money = value => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value);
  let report = '';
  function render() {
    const sample = samples[byId('period').value] || samples.day;
    const total = sample.cash + sample.card + sample.other;
    byId('periodLabel').textContent = sample.label + ' · Tüm rakamlar kurgusaldır';
    for (const key of ['visits', 'payments']) byId(key).textContent = sample[key].toLocaleString('tr-TR');
    for (const key of ['cash', 'card', 'other']) byId(key).textContent = money(sample[key]);
    byId('revenue').textContent = money(total);
    byId('hour').textContent = sample.hour;
    byId('hourVisits').textContent = sample.peak + ' örnek ziyaret · Europe/Istanbul';
    const text = `Bu örnek dönemde ${sample.visits.toLocaleString('tr-TR')} ziyaret ve ${sample.payments.toLocaleString('tr-TR')} ödeme işlemi bulunmaktadır. Örnek toplam tahsilat ${money(total)}; bunun ${money(sample.cash)} tutarı nakit, ${money(sample.card)} tutarı kart, ${money(sample.other)} tutarı diğer yöntemlerdir. Örnek girişlerin en yoğun olduğu saat ${sample.hour} aralığıdır (${sample.peak} ziyaret).`;
    byId('answer').textContent = text;
    report = `REDY AI — ÖRNEK RAPOR\n${sample.label}\nKURGUSAL VERİ — Claude veya canlı AI çıktısı değildir.\n\n${text}\n\nSabit şablonla hazırlanmıştır. Gerçek işletme verisi içermez.`;
    byId('status').textContent = '';
  }
  byId('period').addEventListener('change', render);
  byId('copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(report); byId('status').textContent = 'Örnek veri etiketiyle kopyalandı.'; }
    catch { byId('status').textContent = 'Kopyalama izni verilmedi. Metin olarak indir seçeneğini kullanabilirsiniz.'; }
  });
  byId('download').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob(['\uFEFF' + report], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = `REDY_AI_ORNEK_${byId('period').value}.txt`;
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    byId('status').textContent = 'Örnek rapor indirmesi başlatıldı.';
  });
  render();
})();
