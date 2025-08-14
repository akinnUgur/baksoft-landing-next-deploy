'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';

/* ========= component DIŞI yardımcılar ========= */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(arr: readonly T[], seed: number): T[] {
  const rng = mulberry32(seed);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Paket10CoffeeHouseClient() {
  /* ========= Yerel görsel havuzu + seed'li rastgele seçim ========= */
  const KAHVE_IMG = useMemo(
    () => Array.from({ length: 5 }, (_, i) => `/kahve/kahve-${i + 1}.webp`),
    []
  );

  // Not: SEED'i değiştirerek farklı "rastgele" dağılım elde edebilirsin.
  const SEED = 1337;

  const pool = useMemo(() => seededShuffle(KAHVE_IMG, SEED), [KAHVE_IMG]); // ✅ seededShuffle deps’te değil
  const pick = useCallback((i: number) => pool[i % pool.length], [pool]);

  // Galeri için 6 görseli havuzdan döngüsel seçelim
  const gallery = useMemo(() => Array.from({ length: 6 }, (_, i) => pick(i + 1)), [pick]);

  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-emerald-950 via-emerald-980 to-stone-950 text-stone-100">
      {/* ÜST BAR */}
      {/* Top strip */}
      <div className="text-xs" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
        <div className="mx-auto max-w-7xl px-5 py-2 flex items-center justify-between">
          <span>Baksoft · Özelleştirilebilir Tasarım No:6</span>
          <span className="opacity-80">
            Edition • <b>Concept</b>
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur bg-emerald-950/70">
        <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          {/* Logo + Marka */}
          <a href="/paketler" className="flex items-center gap-2">
            <Image src="/baksoftLogo.png" alt="Baksoft Logo" width={32} height={32} className="object-contain" />
            <span className="font-semibold tracking-wide">Baksoft Tasarım </span>
          </a>

          {/* Menü */}
          <nav className="hidden md:flex gap-6 text-sm text-stone-300">
            <a href="#menu" className="hover:text-white">Menü</a>
            <a href="#signature" className="hover:text-white">Öne Çıkanlar</a>
            <a href="#order" className="hover:text-white">Sipariş</a>
            <a href="#gallery" className="hover:text-white">Galeri</a>
            <a href="#contact" className="hover:text-white">İletişim</a>
          </nav>

          {/* Sağ buton */}
          <a
            href="#order"
            className="rounded-xl px-3 py-1.5 text-sm bg-emerald-600 text-white hover:bg-emerald-500 transition"
          >
            Şimdi Sipariş Ver
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(70%_50%_at_20%_0%,rgba(16,185,129,0.25),transparent),radial-gradient(60%_40%_at_100%_0%,rgba(120,53,15,0.25),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <span className="inline-block text-[11px] uppercase tracking-widest text-emerald-300/90 bg-emerald-800/40 px-2 py-1 rounded border border-emerald-700/50">
              Single Origin · Third Wave · Specialty
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
              Koyu Yeşil, Koyu Kahve — <span className="text-emerald-400">Damakta Derinlik</span>
            </h1>
            <p className="mt-4 text-lg text-stone-300 max-w-2xl">
              El kavrumu çekirdekler, dengeli profiller, kakao ve fındık notaları. Filtre, espresso ve imza içecekler.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="px-5 py-3 rounded-xl border border-emerald-700/50 text-emerald-200 hover:bg-emerald-900/30"
              >
                Menüyü Gör
              </a>
              <a
                href="#order"
                className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500"
              >
                Sipariş Ver
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {['Etiyopya · Yıkanmış', 'Kolombiya · Doğal', 'Guatemala · Honey'].map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 rounded-full border border-white/10 bg-white/5 text-stone-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Hero görseli — yerel havuzdan */}
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_-20px_rgba(16,185,129,0.35)]">
              <Image
                src={pick(0)}
                alt="Latte art – koyu fon"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* kaynak: /public/kahve/kahve-*.webp */}
          </div>
        </div>
      </section>

      {/* ÖNE ÇIKANLAR */}
      <section id="signature" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Öne Çıkan İçecekler</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { name: 'Cacao Mocha', desc: 'Single espresso, zengin kakao, süt köpüğü', tagA: 'Kakao', tagB: 'Espresso', img: pick(1) },
              { name: 'Forest Matcha', desc: 'Seremoni sınıfı matcha, badem sütü', tagA: 'Matcha', tagB: 'Badem', img: pick(2) },
              { name: 'Spiced Flat White', desc: 'Tarçın & muskat dokunuşu', tagA: 'Baharat', tagB: 'Süt', img: pick(3) },
            ].map((i) => (
              <article
                key={i.name}
                className="group rounded-2xl border border-white/10 overflow-hidden bg-white/5 backdrop-blur hover:bg-white/10 transition"
              >
                <div className="relative aspect-[16/11]">
                  <Image
                    src={i.img}
                    alt={i.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>
                <div className="p-5">
                  <h3 className="font-medium">{i.name}</h3>
                  <p className="text-sm text-stone-300 mt-1">{i.desc}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 rounded-full text-[11px] border border-emerald-700/50 bg-emerald-900/30 text-emerald-200">
                      {i.tagA}
                    </span>
                    <span className="px-2 py-1 rounded-full text-[11px] border border-amber-700/40 bg-amber-900/20 text-amber-200">
                      {i.tagB}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MENÜ */}
      <section id="menu" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Menü</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Espresso Bazlı */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="relative aspect-[16/9]">
                <Image src={pick(4)} fill alt="Espresso shot" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-emerald-700 text-white text-xs">Espresso</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                {[
                  ['Espresso', 'Tek/duble shot', '85'],
                  ['Americano', 'Espresso + sıcak su', '95'],
                  ['Cappuccino', 'Espresso + süt köpüğü', '120'],
                  ['Flat White', 'Yoğun espresso + süt', '130'],
                ].map(([n, d, p]) => (
                  <li key={n} className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-stone-300">{d}</div>
                    </div>
                    <div className="font-semibold tabular-nums">₺{p}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filtre & Soğuk */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="relative aspect-[16/9]">
                <Image src={pick(1)} alt="Filtre kahve ve çekirdekler" fill className="object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-amber-700 text-white text-xs">Filtre & Soğuk</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                {[
                  ['V60 / Chemex', 'Günün çekirdeği', '125'],
                  ['Cold Brew', '12 saat demleme', '135'],
                  ['Nitro Cold Brew', 'Kremamsı doku', '155'],
                  ['Iced Latte', 'Soğuk süt + espresso', '135'],
                ].map(([n, d, p]) => (
                  <li key={n} className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-stone-300">{d}</div>
                    </div>
                    <div className="font-semibold tabular-nums">₺{p}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Çay/Matcha */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 md:col-span-1">
              <div className="relative aspect-[16/9]">
                <Image src={pick(2)} alt="Matcha latte" fill className="object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-emerald-700 text-white text-xs">Çay & Matcha</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                {[
                  ['Matcha Latte', 'Seremoni sınıfı', '150'],
                  ['Earl Grey', 'Bergamot aromalı', '90'],
                  ['Meyan Kökü Çayı', 'Doğal bitki çayı', '95'],
                ].map(([n, d, p]) => (
                  <li key={n} className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-stone-300">{d}</div>
                    </div>
                    <div className="font-semibold tabular-nums">₺{p}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tatlı & Atıştırmalık */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 md:col-span-1">
              <div className="relative aspect-[16/9]">
                <Image src={pick(3)} alt="Çikolatalı tatlı" width={256} height={256} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-amber-700 text-white text-xs">Tatlı & Atıştırmalık</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                {[
                  ['Bademli Brownie', 'Yoğun kakao', '95'],
                  ['Cheesecake', 'Vanilya · meyve sos', '115'],
                  ['Tereyağlı Kruvasan', 'Günlük taze', '85'],
                ].map(([n, d, p]) => (
                  <li key={n} className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-stone-300">{d}</div>
                    </div>
                    <div className="font-semibold tabular-nums">₺{p}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Harici kaynak dipnotu kaldırıldı; tüm görseller /public'ten. */}
        </div>
      </section>

      {/* SİPARİŞ (Pickup demo formu) */}
      <section id="order" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <h2 className="text-2xl md:text-3xl font-semibold">Şimdi Sipariş Ver (Al-Götür)</h2>
            <form className="mt-6 grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-xs text-stone-300">Ürün</label>
                <select className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/15 px-3">
                  <option>Flat White</option>
                  <option>V60</option>
                  <option>Iced Latte</option>
                  <option>Forest Matcha</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-300">Boy</label>
                <select className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/15 px-3">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-stone-300">Süt</label>
                <select className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/15 px-3">
                  <option>Tam Yağlı</option>
                  <option>Yulaf</option>
                  <option>Badem</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-stone-300">Ad Soyad</label>
                <input className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/15 px-3" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-stone-300">Telefon</label>
                <input className="mt-1 w-full h-11 rounded-xl bg-white/5 border border-white/15 px-3" />
              </div>
              <button className="col-span-2 h-11 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500">
                Sipariş Gönder
              </button>
            </form>
            <p className="mt-3 text-xs text-stone-400">* Demo form. Gerçek entegrasyon sonradan bağlanır.</p>
          </div>

          {/* Saatler + Hızlı bilgi */}
          <div className="md:col-span-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-stone-300">Bugün Uygun Saatler</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['10:00', '11:30', '13:00', '15:00', '17:00', '19:00'].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-900/30 text-emerald-200 text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 text-sm">
                <div className="font-medium">Çalışma Saatleri</div>
                <p className="text-stone-300 mt-1">Hafta içi 09:00–21:30 · Hafta sonu 10:00–23:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERİ */}
      <section id="gallery" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <h2 className="text-2xl md:text-3xl font-semibold">Galeri</h2>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden border border-white/10">
                <Image src={src} alt={`Galeri ${i + 1}`} width={256} height={256} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İLETİŞİM */}
      <section id="contact" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="text-sm text-stone-300">Telefon</div>
            <div className="text-lg font-semibold mt-1 text-white">0 (242) 000 00 00</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="text-sm text-stone-300">Adres</div>
            <div className="text-lg font-semibold mt-1 text-white">Kaleiçi, Antalya</div>
          </div>
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <div className="text-sm text-stone-300">E-Posta</div>
            <div className="text-lg font-semibold mt-1 text-white">hello@verde-cacao.com</div>
          </div>
        </div>
      </section>

      {/* ALT BİLGİ */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between text-sm text-stone-300">
          <span>© {new Date().getFullYear()} Baksoft</span>
          <a href="#order" className="underline hover:text-white">Şimdi Sipariş Ver</a>
        </div>
      </footer>
    </main>
  );
}
