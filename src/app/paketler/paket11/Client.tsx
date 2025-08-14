'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

/* =========================
   Types
========================= */
type Board =
  | 'Room Only'
  | 'Bed & Breakfast'
  | 'Half Board'
  | 'Full Board'
  | 'All Inclusive'
  | 'Ultra All Inclusive';
type District = 'Konyaaltı' | 'Lara' | 'Belek' | 'Side' | 'Kemer' | 'Kaleiçi';
type Tag =
  | 'Denize Sıfır'
  | 'Özel Plaj'
  | 'Aquapark'
  | 'Spa'
  | 'Aile Dostu'
  | 'Yalnız Yetişkin';
type SortKey = 'pop' | 'priceLow' | 'priceHigh' | 'rating';

type Hotel = {
  id: string;
  name: string;
  image: string;
  district: District;
  stars: 3 | 4 | 5;
  rating: number; // 0..5
  reviews: number;
  board: Board;
  beachDistance: number; // metre
  pricePerNight: number; // TL/gece, 2 yetişkin için başlangıç
  tags: Tag[];
  popular?: boolean;
  featured?: boolean;
};

/* =========================
   Demo Data
========================= */
const HOTELS: Hotel[] = [
  {
    id: 'h-01',
    name: 'Akya Resort & Spa',
    image: '/hotel/hotel-1.webp',
    district: 'Belek',
    stars: 5,
    rating: 4.8,
    reviews: 1217,
    board: 'Ultra All Inclusive',
    beachDistance: 0,
    pricePerNight: 4890,
    tags: ['Denize Sıfır', 'Özel Plaj', 'Spa', 'Aile Dostu'],
    popular: true,
    featured: true,
  },
  {
    id: 'h-02',
    name: 'Luna Marina Hotel',
    image: '/hotel/hotel-2.webp',
    district: 'Lara',
    stars: 5,
    rating: 4.7,
    reviews: 903,
    board: 'All Inclusive',
    beachDistance: 120,
    pricePerNight: 4190,
    tags: ['Özel Plaj', 'Spa', 'Aile Dostu'],
    popular: true,
  },
  {
    id: 'h-03',
    name: 'Kaleiçi Heritage Boutique',
    image: '/hotel/hotel-3.webp',
    district: 'Kaleiçi',
    stars: 4,
    rating: 4.5,
    reviews: 356,
    board: 'Bed & Breakfast',
    beachDistance: 600,
    pricePerNight: 2190,
    tags: ['Spa'],
  },
  {
    id: 'h-04',
    name: 'Konyaaltı Blue Park',
    image: '/hotel/hotel-4.webp',
    district: 'Konyaaltı',
    stars: 4,
    rating: 4.4,
    reviews: 642,
    board: 'Half Board',
    beachDistance: 80,
    pricePerNight: 2790,
    tags: ['Denize Sıfır', 'Aile Dostu'],
  },
  {
    id: 'h-05',
    name: 'Side Sun Garden',
    image: '/hotel/hotel-5.webp',
    district: 'Side',
    stars: 5,
    rating: 4.6,
    reviews: 774,
    board: 'All Inclusive',
    beachDistance: 250,
    pricePerNight: 3490,
    tags: ['Aquapark', 'Aile Dostu'],
    popular: true,
  },
  {
    id: 'h-06',
    name: 'Kemer Pine Suites',
    image: '/hotel/hotel-1.webp',
    district: 'Kemer',
    stars: 3,
    rating: 4.2,
    reviews: 201,
    board: 'Full Board',
    beachDistance: 400,
    pricePerNight: 1890,
    tags: ['Aile Dostu'],
  },
];

/* =========================
   Helpers
========================= */
function toDate(d: string, t: string) {
  if (!d || !t) return null;
  const [y, m, dd] = d.split('-').map(Number);
  const [hh, mm] = t.split(':').map(Number);
  const dt = new Date(y, (m || 1) - 1, dd || 1, hh || 0, mm || 0, 0);
  return isNaN(dt.getTime()) ? null : dt;
}
function nightsBetween(ci: string, co: string) {
  const a = toDate(ci, '12:00');
  const b = toDate(co, '12:00');
  if (!a || !b) return null;
  const ms = b.getTime() - a.getTime();
  if (ms <= 0) return null;
  return Math.max(1, Math.ceil(ms / 86400000));
}
const formatPrice = (n: number) =>
  `₺${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`;
const starsLabel = (s: 3 | 4 | 5) => '★'.repeat(s);

/* =========================
   Page
========================= */
export default function AntalyaHotelsClient() {
  /* ---- Search ---- */
  const [checkin, setCheckin] = useState<string>('');
  const [checkout, setCheckout] = useState<string>('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [district, setDistrict] = useState<District | 'Tümü'>('Tümü');
  const [starFilter, setStarFilter] = useState<3 | 4 | 5 | 0>(0);
  const [board, setBoard] = useState<Board | 'Tümü'>('Tümü');
  const [tag, setTag] = useState<Tag | 'Tümü'>('Tümü');

  const minPrice = useMemo(
    () => Math.min(...HOTELS.map((h) => h.pricePerNight)),
    []
  );
  const maxHotelPrice = useMemo(
    () => Math.max(...HOTELS.map((h) => h.pricePerNight)),
    []
  );
  const [maxPrice, setMaxPrice] = useState(maxHotelPrice);

  const [sort, setSort] = useState<SortKey>('pop');
  const [error, setError] = useState('');

  const nightCount = useMemo(
    () => nightsBetween(checkin, checkout),
    [checkin, checkout]
  );
  const pax = adults + children;

  /* ---- Derived list ---- */
  const filtered = useMemo(() => {
    let arr = HOTELS.filter((h) => h.pricePerNight <= maxPrice);
    if (district !== 'Tümü') arr = arr.filter((h) => h.district === district);
    if (starFilter) arr = arr.filter((h) => h.stars === starFilter);
    if (board !== 'Tümü') arr = arr.filter((h) => h.board === board);
    if (tag !== 'Tümü') arr = arr.filter((h) => h.tags.includes(tag));

    switch (sort) {
      case 'priceLow':
        arr = arr.slice().sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'priceHigh':
        arr = arr.slice().sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating':
        arr = arr
          .slice()
          .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      default:
        arr = arr
          .slice()
          .sort(
            (a, b) =>
              (b.popular ? 1 : 0) - (a.popular ? 1 : 0) ||
              (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
              b.reviews - a.reviews
          );
    }
    return arr;
  }, [district, starFilter, board, tag, maxPrice, sort]);

  /* ---- Submit ---- */
  function submitSearch() {
    if (!checkin || !checkout) return setError('Giriş/çıkış tarihlerini seçin.');
    if (!nightCount)
      return setError('Çıkış tarihi, giriş tarihinden sonra olmalı.');
    if (adults < rooms)
      return setError('Her oda için en az 1 yetişkin gerekir.');
    setError('');
    document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' });
  }

  /* ---- Booking Drawer (demo) ---- */
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<Hotel | null>(null);

  const totalPrice = (h: Hotel) => {
    const n = nightCount ?? 1;
    return h.pricePerNight * n; // * paket başlangıç fiyatı, 2 yetişkin baz
  };

  /* =========================
      Render
  ========================== */
  return (
    <main className="min-h-[100dvh] bg-slate-950 text-slate-100">
      {/* Top promo */}
      <div className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 text-slate-900 text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span className="font-semibold">
            Baksoft · Özelleştirilebilir Tasarım No:11
          </span>
          <a href="#search" className="underline underline-offset-4">
            Tarih Seç
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
          {/* Logo + Marka */}
          <a href="/paketler" className="flex items-center gap-3">
            <Image
              src="/baksoftLogo.png"
              alt="Baksoft Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
            <div className="font-semibold tracking-wide">Baksoft Tasarım</div>
          </a>

          {/* Menü */}
          <nav className="hidden md:flex ml-6 gap-6 text-sm text-slate-300">
            <a href="#search" className="hover:text-white">
              Arama
            </a>
            <a href="#hotels" className="hover:text-white">
              Oteller
            </a>
            <a href="#map" className="hover:text-white">
              Harita
            </a>
            <a href="#faq" className="hover:text-white">
              SSS
            </a>
          </nav>

          {/* Sağ buton */}
          <a
            href="#search"
            className="ml-auto rounded-xl px-4 h-10 grid place-items-center bg-teal-300 text-slate-900 font-semibold hover:bg-teal-200 transition"
          >
            Fiyatları Gör
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop"
            alt="Antalya sahil"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_10%_0%,rgba(94,234,212,0.18),transparent),radial-gradient(50%_35%_at_100%_0%,rgba(103,232,249,0.18),transparent)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/30 via-slate-950 to-slate-950" />

        {/* md:py-26 -> mevcut değil; md:py-24 yaptık */}
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <span className="inline-block text-[11px] uppercase tracking-widest text-teal-200 bg-white/5 border border-white/10 px-2 py-1 rounded">
              Antalya · Otel + Tatil Paketleri
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.06]">
              <span className="text-white">Akdeniz’de</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-cyan-200 to-emerald-200 drop-shadow-[0_0_30px_rgba(94,234,212,0.35)]">
                Mükemmel Konaklama
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Denize sıfır lüks resortlardan Kaleiçi butiklerine. Esnek iptal,
              şeffaf fiyatlar, güvenli rezervasyon.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                ['🏖️', 'Denize Sıfır'],
                ['🧴', 'Ultra Her Şey Dahil'],
                ['🧖', 'Spa & Wellness'],
                ['⭐', '4.7/5 Müşteri'],
              ].map(([i, t]) => (
                <div
                  key={t}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center gap-2"
                >
                  <span className="text-lg">{i}</span>
                  <span className="text-slate-200">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search card */}
          <aside id="search" className="md:col-span-5">
            <div className="rounded-2xl border border-teal-300/30 bg-white/[0.06] backdrop-blur p-5 shadow-[0_0_100px_-35px_rgba(94,234,212,0.55)]">
              <div className="text-sm text-slate-200 font-medium">
                Tarih & Misafir
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSearch();
                }}
                className="mt-3 grid grid-cols-2 gap-3 text-sm"
              >
                <div>
                  <Label>Giriş</Label>
                  <input
                    type="date"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>
                <div>
                  <Label>Çıkış</Label>
                  <input
                    type="date"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>

                <Stepper
                  label="Yetişkin"
                  value={adults}
                  setValue={setAdults}
                  min={1}
                  max={10}
                />
                <Stepper
                  label="Çocuk"
                  value={children}
                  setValue={setChildren}
                  min={0}
                  max={10}
                />
                <Stepper
                  label="Oda"
                  value={rooms}
                  setValue={setRooms}
                  min={1}
                  max={5}
                />

                <div className="col-span-2">
                  <Label>Bölge</Label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value as any)}
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3"
                  >
                    {[
                      'Tümü',
                      'Konyaaltı',
                      'Lara',
                      'Belek',
                      'Side',
                      'Kemer',
                      'Kaleiçi',
                    ].map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* summary */}
                <div className="col-span-2 text-xs text-slate-300 flex items-center gap-3">
                  <span aria-hidden>⏱</span>
                  {nightCount ? (
                    <span>
                      {nightCount} gece · {pax} kişi
                    </span>
                  ) : (
                    <span>Süre hesaplanamadı</span>
                  )}
                </div>

                {error && (
                  <div className="col-span-2 rounded-xl border border-rose-400/40 bg-rose-500/10 text-rose-200 px-3 py-2 text-xs">
                    {error}
                  </div>
                )}

                <button className="col-span-2 h-12 rounded-xl bg-teal-300 text-slate-900 font-semibold hover:bg-teal-200">
                  Otelleri Göster
                </button>
                <p className="col-span-2 text-[11px] text-slate-400">
                  * Demo arama; sonuçlar aşağıdaki gridde filtrelenir.
                </p>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Filters + List */}
      <section
        id="hotels"
        className="mx-auto max-w-7xl px-4 py-14 border-t border-white/10"
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Oteller</h2>
            <p className="text-slate-400 mt-1">
              {filtered.length} sonuç ·{' '}
              {nightCount ? `${nightCount} gece` : 'Tarih seçin'}
            </p>
          </div>

          {/* sort */}
          <div className="shrink-0 flex items-center gap-2">
            <label className="text-sm text-slate-300">Sırala</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-lg bg-slate-900/60 border border-white/10 px-2 text-sm"
            >
              <option value="pop">Popüler</option>
              <option value="priceLow">Fiyat (Artan)</option>
              <option value="priceHigh">Fiyat (Azalan)</option>
              <option value="rating">Puan</option>
            </select>
          </div>
        </div>

        {/* quick pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(
            [
              'Tümü',
              'Denize Sıfır',
              'Özel Plaj',
              'Aquapark',
              'Spa',
              'Aile Dostu',
              'Yalnız Yetişkin',
            ] as const
          ).map((t) => (
            <Pill key={t} active={tag === t} onClick={() => setTag(t)}>
              {t}
            </Pill>
          ))}
          <div className="ml-auto hidden md:flex items-center gap-3 text-sm">
            <select
              value={starFilter || 0}
              onChange={(e) => setStarFilter(Number(e.target.value) as any)}
              className="h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3 text-sm"
            >
              <option value={0}>Yıldız: Tümü</option>
              <option value={5}>5★</option>
              <option value={4}>4★</option>
              <option value={3}>3★</option>
            </select>

            <select
              value={board}
              onChange={(e) => setBoard(e.target.value as any)}
              className="h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3 text-sm"
            >
              {(
                [
                  'Tümü',
                  'Room Only',
                  'Bed & Breakfast',
                  'Half Board',
                  'Full Board',
                  'All Inclusive',
                  'Ultra All Inclusive',
                ] as const
              ).map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <div className="h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3 flex items-center gap-3 text-sm">
              <span>Azami Gecelik</span>
              <input
                type="range"
                min={minPrice}
                max={maxHotelPrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-40"
              />
              <span className="font-medium">{formatPrice(maxPrice)}</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
              Kriterlere uygun tesis bulunamadı. Filtreleri gevşetmeyi deneyin.
            </div>
          )}

          {filtered.map((h) => (
            <article
              key={h.id}
              className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              <div className="relative">
                {/* layout/objectFit yerine width/height ya da fill+sizes */}
                <Image
                  src={h.image}
                  alt={h.name}
                  width={1280}
                  height={720}
                  className="w-full aspect-[16/9] object-cover transition group-hover:scale-[1.02]"
                />
                {h.featured && (
                  <span className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-cyan-400 text-slate-900 font-semibold">
                    Öne Çıkan
                  </span>
                )}
                {h.popular && (
                  <span className="absolute right-3 top-3 text-[11px] px-2 py-1 rounded-full bg-teal-300 text-slate-900 font-semibold">
                    Popüler
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold leading-tight">{h.name}</h3>
                    <div className="mt-1 text-xs text-slate-300 flex items-center gap-2">
                      <span>{h.district}</span>
                      <span>·</span>
                      <span aria-label={`${h.stars} yıldız`}>
                        {starsLabel(h.stars)}
                      </span>
                      <span>·</span>
                      <span>{h.board}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-400 flex items-center gap-2">
                      <span>
                        🏝️{' '}
                        {h.beachDistance === 0
                          ? 'Denize Sıfır'
                          : `${h.beachDistance} m`}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-300">
                      <Stars value={h.rating} />
                      <span aria-label={`${h.reviews} yorum`}>{h.reviews}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Gecelik</div>
                    <div className="text-xl font-extrabold">
                      {formatPrice(h.pricePerNight)}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      {nightCount
                        ? `Toplam: ${formatPrice(totalPrice(h))}`
                        : 'Tarih seçin'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {h.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-[11px] bg-slate-900/60 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setPicked(h);
                      setOpen(true);
                    }}
                    disabled={!nightCount}
                    className={
                      'col-span-2 h-11 rounded-xl font-semibold ' +
                      (!nightCount
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-teal-300 text-slate-900 hover:bg-teal-200')
                    }
                  >
                    {nightCount ? 'Rezervasyona Devam Et' : 'Tarih Seçin'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Map placeholder */}
      <section
        id="map"
        className="mx-auto max-w-7xl px-4 pb-16 border-t border-white/10"
      >
        <h3 className="text-xl font-semibold mb-3">Harita</h3>
        <div className="rounded-2xl border border-white/10 bg-white/5 h-72 grid place-items-center text-slate-400">
          Harita entegrasyonu (Google Maps / Leaflet) için placeholder
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto max-w-7xl px-4 pb-20 border-t border-white/10"
      >
        <h3 className="text-xl font-semibold mb-3">Sık Sorulan Sorular</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <Faq
            q="Ücretsiz iptal var mı?"
            a="Birçok tesiste giriş tarihinden 3 gün öncesine kadar ücretsiz iptal bulunur. Her tesisin iptal politikası kartta belirtilir."
          />
          <Faq
            q="Fiyatlar kişi başı mı, oda başı mı?"
            a="Fiyatlar varsayılan olarak 2 yetişkin tek oda içindir. Arama formundaki misafir/oda sayısına göre güncellenir."
          />
          <Faq
            q="Transfer hizmeti sağlanıyor mu?"
            a="Seçili otellerde ek ücretle havalimanı transferi sağlanır. Rezervasyon sırasında talep edebilirsiniz."
          />
          <Faq
            q="Çocuk indirimleri var mı?"
            a="Aile dostu tesislerde çocuk-yaş aralığına göre indirim uygulanır. Tesis detayında belirtilir."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-400 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div>
            © {new Date().getFullYear()} Baksoft · Özelleştirilebilir Tasarım
            No:11
          </div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#faq">
              SSS
            </a>
            <a className="hover:text-white" href="#">
              Gizlilik
            </a>
            <a className="hover:text-white" href="#">
              KVKK
            </a>
          </div>
        </div>
      </footer>

      {/* Booking Drawer (Demo) */}
      {open && picked && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-950 border-l border-white/10 p-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Rezervasyon Özeti</h4>
              <button
                onClick={() => setOpen(false)}
                className="h-9 w-9 rounded-lg border border-white/10"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 overflow-hidden">
              <Image
                src={picked.image}
                alt={picked.name}
                width={1280}
                height={720}
                className="w-full aspect-[16/9] object-cover"
                // local /public altında: optimize OK
              />
              <div className="p-4">
                <div className="font-semibold">{picked.name}</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>{picked.district}</span>
                  <span>·</span>
                  <span>{starsLabel(picked.stars)}</span>
                  <span>·</span>
                  <span>{picked.board}</span>
                </div>
                <div className="mt-2 text-sm flex items-center gap-2">
                  <Stars value={picked.rating} />
                  <span className="text-slate-400">{picked.reviews}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <Row k="Giriş" v={checkin || '-'} />
              <Row k="Çıkış" v={checkout || '-'} />
              <Row k="Gece" v={nightCount ? `${nightCount}` : '-'} />
              <Row
                k="Misafir"
                v={`${adults} yetişkin${children ? `, ${children} çocuk` : ''}`}
              />
              <Row k="Oda" v={`${rooms}`} />
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Toplam</span>
                <span className="text-xl font-extrabold">
                  {nightCount ? formatPrice(totalPrice(picked)) : '-'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                * 2 yetişkin başlangıç fiyatı, vergiler dahil (demo).
              </p>
            </div>

            <button
              disabled={!nightCount}
              className={
                'mt-4 w-full h-12 rounded-xl font-semibold ' +
                (!nightCount
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-teal-300 text-slate-900 hover:bg-teal-200')
              }
              onClick={() => alert('Demo: Ödeme akışı burada başlar.')}
            >
              {nightCount ? 'Ödeme Adımına Geç' : 'Önce Tarih Seçin'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

/* =========================
   UI Bits
========================= */
function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-slate-400 text-xs">{children}</label>;
}
function Stepper({
  label,
  value,
  setValue,
  min,
  max,
}: {
  label: string;
  value: number;
  setValue: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setValue(Math.max(min, value - 1))}
          className="h-7 w-7 rounded-lg border border-white/10"
          aria-label={`${label} azalt`}
        >
          −
        </button>
        <span className="w-6 text-center">{value}</span>
        <button
          type="button"
          onClick={() => setValue(Math.min(max, value + 1))}
          className="h-7 w-7 rounded-lg border border-white/10"
          aria-label={`${label} artır`}
        >
          +
        </button>
      </div>
    </div>
  );
}
function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Puan ${value.toFixed(1)}`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={'f' + i}>★</span>
      ))}
      {half && <span>⯪</span>}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <span key={'e' + i} className="text-slate-500">
          ☆
        </span>
      ))}
      <span className="ml-1 text-slate-300 text-xs">{value.toFixed(1)}</span>
    </div>
  );
}
function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'px-3 h-9 rounded-full text-sm border ' +
        (active
          ? 'border-teal-300 text-teal-200 bg-teal-300/10'
          : 'border-white/15 hover:bg-white/5 text-slate-200')
      }
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 font-medium flex items-center justify-between"
        aria-expanded={open}
      >
        <span>{q}</span>
        <span className="text-slate-400">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4 text-slate-300">{a}</div>}
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{k}</span>
      <span className="text-slate-200">{v}</span>
    </div>
  );
}
