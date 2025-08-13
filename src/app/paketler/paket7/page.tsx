'use client';

import { useMemo, useState } from 'react';

/* =========================================================
   Types
========================================================= */
type Segment = 'Economy' | 'Compact' | 'SUV' | 'Premium' | 'Luxury' | 'Van';
type Transmission = 'Automatic' | 'Manual';
type Fuel = 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
type SortKey = 'pop' | 'priceLow' | 'priceHigh' | 'rating';

type Car = {
  id: string;
  brand: string;
  model: string;
  image: string;
  segment: Segment;
  transmission: Transmission;
  fuel: Fuel;
  seats: number;
  luggage: number;
  doors: number;
  minAge: 21 | 25 | 30;
  instant: boolean; // anında teslim
  rating: number; // 0..5
  reviews: number;
  pricePerDay: number; // TL/gün
  popular?: boolean;
  tags?: string[]; // e.g. ['Electric','SUV','Auto']
};

type ExtraKey =
  | 'fullProtection'
  | 'additionalDriver'
  | 'childSeat'
  | 'navigation'
  | 'winterTires';

type ExtrasState = {
  fullProtection: boolean;
  additionalDriver: boolean;
  childSeat: number; // adet
  navigation: boolean;
  winterTires: boolean;
};

/* =========================================================
   Demo Data
========================================================= */
const CARS: Car[] = [
  {
    id: 'c-01',
    brand: 'BMW',
    model: '5 Series',
    image:
      'https://images.unsplash.com/photo-1517940310602-8759f5562a66?q=80&w=1600&auto=format&fit=crop',
    segment: 'Luxury',
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
    luggage: 4,
    doors: 4,
    minAge: 30,
    instant: true,
    rating: 4.9,
    reviews: 212,
    pricePerDay: 3499,
    popular: true,
    tags: ['Auto'],
  },
  {
    id: 'c-02',
    brand: 'Mercedes',
    model: 'GLC',
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1b?q=80&w=1600&auto=format&fit=crop',
    segment: 'Premium',
    transmission: 'Automatic',
    fuel: 'Diesel',
    seats: 5,
    luggage: 4,
    doors: 4,
    minAge: 27 as 25,
    instant: true,
    rating: 4.7,
    reviews: 168,
    pricePerDay: 2790,
    tags: ['SUV', 'Auto'],
  },
  {
    id: 'c-03',
    brand: 'Tesla',
    model: 'Model 3',
    image:
      'https://images.unsplash.com/photo-1511396275271-80b1b5a99744?q=80&w=1600&auto=format&fit=crop',
    segment: 'Premium',
    transmission: 'Automatic',
    fuel: 'Electric',
    seats: 5,
    luggage: 3,
    doors: 4,
    minAge: 25,
    instant: false,
    rating: 4.8,
    reviews: 301,
    pricePerDay: 2590,
    tags: ['Electric', 'Auto'],
  },
  {
    id: 'c-04',
    brand: 'Volkswagen',
    model: 'T-Roc',
    image:
      'https://images.unsplash.com/photo-1627910082652-3d7bb5bd9dae?q=80&w=1600&auto=format&fit=crop',
    segment: 'SUV',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    luggage: 3,
    doors: 4,
    minAge: 25,
    instant: true,
    rating: 4.5,
    reviews: 121,
    pricePerDay: 1690,
    tags: ['SUV', 'Auto'],
  },
  {
    id: 'c-05',
    brand: 'Renault',
    model: 'Clio',
    image:
      'https://images.unsplash.com/photo-1625388100636-8a7df6bbd6fb?q=80&w=1600&auto=format&fit=crop',
    segment: 'Economy',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 5,
    luggage: 2,
    doors: 4,
    minAge: 21,
    instant: true,
    rating: 4.3,
    reviews: 84,
    pricePerDay: 890,
  },
  {
    id: 'c-06',
    brand: 'Toyota',
    model: 'Corolla',
    image:
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1b?q=80&w=1600&auto=format&fit=crop&crop=entropy',
    segment: 'Compact',
    transmission: 'Automatic',
    fuel: 'Hybrid',
    seats: 5,
    luggage: 3,
    doors: 4,
    minAge: 23 as 21,
    instant: false,
    rating: 4.4,
    reviews: 156,
    pricePerDay: 1190,
    tags: ['Auto'],
  },
  {
    id: 'c-07',
    brand: 'Ford',
    model: 'Transit Custom',
    image:
      'https://images.unsplash.com/photo-1563865436871-2b5b4b0c54c3?q=80&w=1600&auto=format&fit=crop',
    segment: 'Van',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 9,
    luggage: 6,
    doors: 4,
    minAge: 25,
    instant: true,
    rating: 4.2,
    reviews: 47,
    pricePerDay: 1890,
  },
];

/* Extras pricing (TL). Per-day unless "fixed" noted */
const EXTRAS_PRICING: Record<
  ExtraKey,
  { label: string; perDay?: number; fixed?: number; hint?: string }
> = {
  fullProtection: {
    label: 'Tam Koruma (Sıfır Sorumluluk)',
    perDay: 349,
    hint: 'Lastik/çam kırılması dahil',
  },
  additionalDriver: { label: 'Ek Sürücü', perDay: 99 },
  childSeat: { label: 'Çocuk Koltuğu', perDay: 59 },
  navigation: { label: 'Navigasyon', fixed: 149 },
  winterTires: { label: 'Kış Lastiği', perDay: 79 },
};

/* =========================================================
   Page
========================================================= */
export default function Paket14RentACar() {
  /* ---- Search state ---- */
  const [pickupLoc, setPickupLoc] = useState('İstanbul Havalimanı (IST)');
  const [dropLoc, setDropLoc] = useState('İstanbul Havalimanı (IST)');
  const [sameDrop, setSameDrop] = useState(true);
  const [pickupDate, setPickupDate] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('10:00');
  const [dropDate, setDropDate] = useState<string>('');
  const [dropTime, setDropTime] = useState<string>('13:00');
  const [driverAge, setDriverAge] = useState<21 | 25 | 30>(25);
  const [error, setError] = useState('');

  /* ---- Filters ---- */
  const [seg, setSeg] = useState<Segment | 'All'>('All');
  const [trans, setTrans] = useState<Transmission | 'Any'>('Any');
  const [fuel, setFuel] = useState<Fuel | 'Any'>('Any');
  const [minSeats, setMinSeats] = useState(2);
  const [instantOnly, setInstantOnly] = useState(false);
  const [priceMax, setPriceMax] = useState(() =>
    Math.max(...CARS.map((c) => c.pricePerDay))
  );
  const [sort, setSort] = useState<SortKey>('pop');
  const [tag, setTag] = useState<'All' | 'SUV' | 'Electric' | 'Auto'>('All');

  /* ---- UI drawers ---- */
  const [compare, setCompare] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const [extrasOpen, setExtrasOpen] = useState(false);
  const [extrasCar, setExtrasCar] = useState<Car | null>(null);

  const [bookOpen, setBookOpen] = useState(false);
  const [bookCar, setBookCar] = useState<Car | null>(null);

  /* ---- Extras state (per-selection temp) ---- */
  const [extras, setExtras] = useState<ExtrasState>({
    fullProtection: true,
    additionalDriver: false,
    childSeat: 0,
    navigation: false,
    winterTires: false,
  });

  /* ---- Derived: duration ---- */
  const duration = useMemo(() => {
    const start = toDate(pickupDate, pickupTime);
    const end = toDate(dropDate, dropTime);
    if (!start || !end) return null;
    const ms = end.getTime() - start.getTime();
    if (ms <= 0) return null;
    const hours = Math.ceil(ms / 36e5);
    const days = Math.max(1, Math.ceil(hours / 24));
    return { hours, days };
  }, [pickupDate, pickupTime, dropDate, dropTime]);

  /* ---- Submit search (just validate + scroll) ---- */
  function submitSearch() {
    const start = toDate(pickupDate, pickupTime);
    const end = toDate(dropDate, dropTime);
    if (!pickupLoc.trim()) return setError('Alış lokasyonunu girin.');
    if (!start || !end) return setError('Tarih ve saatleri seçin.');
    if (end <= start) return setError('Bırakış tarihi alıştan sonra olmalı.');
    setError('');
    document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' });
  }

  /* ---- Filtered cars ---- */
  const filtered = useMemo(() => {
    let arr = CARS.filter((c) => c.pricePerDay <= priceMax);
    if (seg !== 'All') arr = arr.filter((c) => c.segment === seg);
    if (trans !== 'Any') arr = arr.filter((c) => c.transmission === trans);
    if (fuel !== 'Any') arr = arr.filter((c) => c.fuel === fuel);
    if (instantOnly) arr = arr.filter((c) => c.instant);
    if (minSeats > 2) arr = arr.filter((c) => c.seats >= minSeats);
    if (tag !== 'All') {
      if (tag === 'Auto') arr = arr.filter((c) => c.transmission === 'Automatic');
      else arr = arr.filter((c) => (c.tags || []).includes(tag));
    }
    switch (sort) {
      case 'priceLow':
        arr = arr.slice().sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'priceHigh':
        arr = arr.slice().sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'rating':
        arr = arr.slice().sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      default:
        arr = arr
          .slice()
          .sort(
            (a, b) =>
              (b.popular ? 1 : 0) - (a.popular ? 1 : 0) ||
              b.reviews - a.reviews ||
              a.pricePerDay - b.pricePerDay
          );
    }
    return arr;
  }, [seg, trans, fuel, minSeats, instantOnly, priceMax, sort, tag]);

  /* ---- Price helpers ---- */
  const formatPrice = (n: number) =>
    `₺${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`;

  const dayCount = duration?.days ?? 1;
  function basePrice(car: Car) {
    return car.pricePerDay * dayCount;
  }
  function extrasTotal(d: number, e: ExtrasState) {
    let tl = 0;
    if (e.fullProtection) tl += (EXTRAS_PRICING.fullProtection.perDay || 0) * d;
    if (e.additionalDriver) tl += (EXTRAS_PRICING.additionalDriver.perDay || 0) * d;
    if (e.childSeat > 0) tl += (EXTRAS_PRICING.childSeat.perDay || 0) * d * e.childSeat;
    if (e.navigation) tl += EXTRAS_PRICING.navigation.fixed || 0;
    if (e.winterTires) tl += (EXTRAS_PRICING.winterTires.perDay || 0) * d;
    return tl;
  }
  function grandTotal(car: Car, e: ExtrasState) {
    return basePrice(car) + extrasTotal(dayCount, e);
  }

  /* ---- Compare ---- */
  function toggleCompare(id: string) {
    setCompare((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  }

  /* ---- Actions ---- */
  function openExtras(car: Car) {
    if (!duration) {
      alert('Lütfen tarih/saat seçin.');
      return;
    }
    setExtrasCar(car);
    setExtrasOpen(true);
  }
  function proceedBooking(car: Car) {
    if (!duration) {
      alert('Lütfen tarih/saat seçin.');
      return;
    }
    setBookCar(car);
    setBookOpen(true);
  }

  /* =========================================================
     Render
  ========================================================= */
  return (
    <main className="min-h-[100dvh] bg-slate-950 text-slate-100">
      {/* Top promo */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-900 text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span className="font-semibold">Baksoft · Özelleştirilebilir Tasarım No:7</span>
          <a href="#search" className="underline underline-offset-4">Şimdi Ara</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur">
  <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
    {/* Logo + Marka */}
    <a
      href="/paketler"
      className="flex items-center gap-3"
    >
      <img
        src="/baksoftLogo.png"
        alt="Baksoft Logo"
        className="h-8 w-8 object-contain"
      />
      <div className="font-semibold tracking-wide">Baksoft Tasarım</div>
    </a>

    {/* Menü */}
    <nav className="hidden md:flex ml-6 gap-6 text-sm text-slate-300">
      <a href="#search" className="hover:text-white">Rezervasyon</a>
      <a href="#cars" className="hover:text-white">Araçlar</a>
      <a href="#extras" className="hover:text-white">Ekstralar</a>
      <a href="#faq" className="hover:text-white">SSS</a>
    </nav>

    {/* Karşılaştır butonu */}
    <button
      onClick={() => setCompareOpen(true)}
      className="ml-auto rounded-xl px-3 h-10 grid place-items-center border border-white/15 text-sm hover:bg-white/5"
    >
      Karşılaştır ({compare.length})
    </button>

    {/* Sağ buton */}
    <a
      href="#search"
      className="ml-2 rounded-xl px-4 h-10 grid place-items-center bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition"
    >
      Fiyatları Gör
    </a>
  </div>
</header>


      {/* Hero + Search */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury car"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_10%,rgba(245,158,11,0.22),transparent),radial-gradient(50%_40%_at_100%_0%,rgba(251,191,36,0.18),transparent)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/30 via-slate-950 to-slate-950" />

        <div className="mx-auto max-w-7xl px-4 py-14 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="md:col-span-6">
            <span className="inline-block text-[11px] uppercase tracking-widest text-amber-300 bg-white/5 border border-white/10 px-2 py-1 rounded">
              Premium Araç Kiralama · 40+ Lokasyon
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.06]">
              <span className="text-white">Yola</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_0_32px_rgba(245,158,11,0.35)]">
                Bir Adım Önde
              </span>
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Esnek iade, şeffaf fiyat ve üst düzey hizmetle Aurex deneyimi. Şehir içi şıklık ya da uzun yol konforu.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                ['🛡️', 'Full Kasko'],
                ['⚡', 'Hızlı Teslim'],
                ['♻️', 'Ücretsiz İptal'],
                ['⭐', '4.8/5 Müşteri'],
              ].map(([i, t]) => (
                <div key={t} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 flex items-center gap-2">
                  <span className="text-lg">{i}</span>
                  <span className="text-slate-200">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search card */}
          <aside id="search" className="md:col-span-6">
            <div className="rounded-2xl border border-amber-400/30 bg-white/[0.06] backdrop-blur p-5 shadow-[0_0_100px_-35px_rgba(245,158,11,0.55)]">
              <div className="text-sm text-slate-200 font-medium">Rezervasyon Arama</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSearch();
                }}
                className="mt-3 grid grid-cols-2 gap-3 text-sm"
              >
                {/* pickup */}
                <div className="col-span-2">
                  <Label>Alış Lokasyonu</Label>
                  <input
                    value={pickupLoc}
                    onChange={(e) => setPickupLoc(e.target.value)}
                    placeholder="Şehir, ofis veya havaalanı"
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 placeholder:text-slate-500"
                  />
                </div>

                {/* drop */}
                <div className="col-span-2 flex items-center gap-2">
                  <Toggle
                    checked={sameDrop}
                    onChange={(v) => {
                      setSameDrop(v);
                      if (v) setDropLoc(pickupLoc);
                    }}
                  />
                  <span className="text-slate-300">Aynı yere bırak</span>
                </div>
                <div className="col-span-2">
                  <Label>Bırakış Lokasyonu</Label>
                  <input
                    value={sameDrop ? pickupLoc : dropLoc}
                    onChange={(e) => setDropLoc(e.target.value)}
                    disabled={sameDrop}
                    placeholder="Farklı bir ofis/havaalanı"
                    className={
                      'mt-1 w-full h-11 rounded-xl bg-slate-900/60 border px-3 placeholder:text-slate-500 ' +
                      (sameDrop ? 'border-white/10 opacity-60' : 'border-white/10')
                    }
                  />
                </div>

                {/* dates */}
                <div>
                  <Label>Alış Tarihi</Label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>
                <div>
                  <Label>Alış Saati</Label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>
                <div>
                  <Label>Bırakış Tarihi</Label>
                  <input
                    type="date"
                    value={dropDate}
                    onChange={(e) => setDropDate(e.target.value)}
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>
                <div>
                  <Label>Bırakış Saati</Label>
                  <input
                    type="time"
                    value={dropTime}
                    onChange={(e) => setDropTime(e.target.value)}
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>

                {/* age */}
                <div>
                  <Label>Sürücü Yaşı</Label>
                  <select
                    value={driverAge}
                    onChange={(e) => setDriverAge(Number(e.target.value) as any)}
                    className="mt-1 w-full h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3"
                  >
                    <option value={21}>21+</option>
                    <option value={25}>25+</option>
                    <option value={30}>30+</option>
                  </select>
                </div>

                {/* summary */}
                <div className="col-span-1 md:col-span-1 flex items-end">
                  <div className="w-full text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <span>⏱</span>
                      {duration ? (
                        <span>
                          {duration.days} gün · {duration.hours} saat
                        </span>
                      ) : (
                        <span>Süre hesaplanamadı</span>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="col-span-2 rounded-xl border border-rose-400/40 bg-rose-500/10 text-rose-200 px-3 py-2 text-xs">
                    {error}
                  </div>
                )}

                <button className="col-span-2 h-12 rounded-xl bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300">
                  Fiyatları Göster
                </button>
                <p className="col-span-2 text-[11px] text-slate-400">
                  * Bu bir demo aramadır; sonuçlar aşağıdaki gridde filtrelenir.
                </p>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* Cars + Filters */}
      <section id="cars" className="mx-auto max-w-7xl px-4 py-14 border-t border-white/10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Araçlar</h2>
            <p className="text-slate-400 mt-1">
              {filtered.length} sonuç · {duration ? `${duration.days} gün` : 'Tarih seçin'}
            </p>
          </div>

          {/* Sort */}
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

        {/* Tag pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(['All', 'SUV', 'Electric', 'Auto'] as const).map((t) => (
            <Pill
              key={t}
              active={tag === t}
              onClick={() => setTag(t)}
              children={t === 'All' ? 'Tümü' : t}
            />
          ))}
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-slate-400 hidden sm:block">Hızlı Filtre</span>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={instantOnly}
                onChange={(e) => setInstantOnly(e.target.checked)}
              />
              <span>Anında Teslim</span>
            </label>
          </div>
        </div>

        {/* Filters bar */}
        <div className="mt-4 grid lg:grid-cols-5 gap-3">
          <select
            value={seg}
            onChange={(e) => setSeg(e.target.value as any)}
            className="h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 text-sm"
          >
            {['All', 'Economy', 'Compact', 'SUV', 'Premium', 'Luxury', 'Van'].map(
              (s) => (
                <option key={s} value={s}>
                  Segment: {s}
                </option>
              )
            )}
          </select>
          <select
            value={trans}
            onChange={(e) => setTrans(e.target.value as any)}
            className="h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 text-sm"
          >
            {['Any', 'Automatic', 'Manual'].map((t) => (
              <option key={t} value={t}>
                Şanzıman: {t}
              </option>
            ))}
          </select>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value as any)}
            className="h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 text-sm"
          >
            {['Any', 'Petrol', 'Diesel', 'Hybrid', 'Electric'].map((f) => (
              <option key={f} value={f}>
                Yakıt: {f}
              </option>
            ))}
          </select>
          <div className="h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 flex items-center justify-between text-sm">
            <span>Min. Koltuk</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMinSeats(Math.max(2, minSeats - 1))}
                className="h-7 w-7 rounded-lg border border-white/10"
              >
                −
              </button>
              <span className="w-6 text-center">{minSeats}</span>
              <button
                onClick={() => setMinSeats(Math.min(9, minSeats + 1))}
                className="h-7 w-7 rounded-lg border border-white/10"
              >
                +
              </button>
            </div>
          </div>
          <div className="h-11 rounded-xl bg-slate-900/60 border border-white/10 px-3 flex items-center justify-between text-sm">
            <span>Azami Günlük</span>
            <input
              type="range"
              min={Math.min(...CARS.map((c) => c.pricePerDay))}
              max={Math.max(...CARS.map((c) => c.pricePerDay))}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-36"
            />
            <span className="font-medium">{formatPrice(priceMax)}</span>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => {
            const tooYoung = driverAge < c.minAge;
            return (
              <article
                key={c.id}
                className="group rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={c.image}
                    alt={`${c.brand} ${c.model}`}
                    className="aspect-[16/9] w-full object-cover group-hover:scale-[1.02] transition"
                  />
                  {c.instant && (
                    <span className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-emerald-500 text-white">
                      Anında Teslim
                    </span>
                  )}
                  {c.popular && (
                    <span className="absolute right-3 top-3 text-[11px] px-2 py-1 rounded-full bg-amber-400 text-slate-900 font-semibold">
                      Popüler
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold leading-tight">
                        {c.brand} {c.model}
                      </h3>
                      <div className="mt-1 text-xs text-slate-300 flex items-center gap-2">
                        <span>{c.segment}</span>
                        <span>·</span>
                        <span>{c.transmission === 'Automatic' ? 'Otomatik' : 'Manuel'}</span>
                        <span>·</span>
                        <span>{fuelLabel(c.fuel)}</span>
                      </div>
                      <div className="mt-1 text-xs text-slate-400 flex items-center gap-2">
                        <span>🚪 {c.doors}</span>
                        <span>·</span>
                        <span>🧳 {c.luggage}</span>
                        <span>·</span>
                        <span>🪑 {c.seats}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-300">
                        <Stars value={c.rating} />
                        <span>{c.reviews}</span>
                      </div>
                    </div>

                    {/* price box */}
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Günlük</div>
                      <div className="text-xl font-extrabold">
                        {formatPrice(c.pricePerDay)}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {duration
                          ? `Toplam: ${formatPrice(basePrice(c))}`
                          : 'Tarih seçin'}
                      </div>
                    </div>
                  </div>

                  {/* age warning */}
                  {tooYoung && (
                    <div className="mt-3 rounded-xl border border-rose-400/30 bg-rose-500/10 text-rose-200 px-3 py-2 text-xs">
                      Bu araç için min. yaş {c.minAge}+.
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => toggleCompare(c.id)}
                      className={
                        'h-10 rounded-xl border text-sm hover:bg-white/5 ' +
                        (compare.includes(c.id)
                          ? 'border-amber-400 text-amber-300'
                          : 'border-white/15')
                      }
                    >
                      {compare.includes(c.id) ? 'Karşılaştırmada' : 'Karşılaştır'}
                    </button>
                    <button
                      onClick={() => openExtras(c)}
                      disabled={!duration || tooYoung}
                      className={
                        'h-10 rounded-xl text-sm ' +
                        (!duration || tooYoung
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-amber-400 text-slate-900 hover:bg-amber-300')
                      }
                    >
                      Ekstralar
                    </button>
                    <button
                      onClick={() => proceedBooking(c)}
                      disabled={!duration || tooYoung}
                      className={
                        'col-span-2 h-11 rounded-xl font-semibold ' +
                        (!duration || tooYoung
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                          : 'bg-emerald-500 text-slate-900 hover:bg-emerald-400')
                      }
                    >
                      Devam / Rezervasyon
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!filtered.length && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
            Sonuç bulunamadı. Filtreleri değiştirin.
          </div>
        )}
      </section>

      {/* Extras (info section anchor) */}
      <section id="extras" className="mx-auto max-w-7xl px-4 py-12 border-t border-white/10">
        <h3 className="text-2xl font-semibold">Ekstra Paketler</h3>
        <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm">
          {Object.entries(EXTRAS_PRICING).map(([k, v]) => (
            <div key={k} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="font-medium">{v.label}</div>
              <div className="text-slate-300">
                {v.perDay ? `Günlük ${formatPrice(v.perDay)}` : v.fixed ? `Tek sefer ${formatPrice(v.fixed)}` : ''}
                {v.hint ? <span className="text-slate-400"> · {v.hint}</span> : null}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-12 border-t border-white/10">
        <h3 className="text-2xl font-semibold">Sık Sorulan Sorular</h3>
        <div className="mt-4 space-y-3">
          <FaqItem q="Ücretsiz iptal koşulları nedir?">
            Rezervasyon başlangıcından 24 saat öncesine kadar ücretsiz iptal edebilirsiniz.
          </FaqItem>
          <FaqItem q="Depozito alınır mı?">
            Evet, araç grubuna göre ₺2.000–₺8.000 arası provizyon alınır; iade süresi bankaya göre değişir.
          </FaqItem>
          <FaqItem q="Kilometre limiti var mı?">
            Günlük 400 km dahildir. Üzeri için km başına ücret uygulanır.
          </FaqItem>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between text-sm text-slate-400">
          <span>© {new Date().getFullYear()} Baksoft · Aurex Rent</span>
          <a href="#search" className="underline underline-offset-4">
            Rezervasyon
          </a>
        </div>
      </footer>

      {/* DRAWERS */}
      <CompareDrawer
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        ids={compare}
        cars={CARS}
        durationDays={dayCount}
        formatPrice={formatPrice}
      />

      <ExtrasDrawer
        open={extrasOpen}
        onClose={() => setExtrasOpen(false)}
        car={extrasCar}
        extras={extras}
        setExtras={setExtras}
        durationDays={dayCount}
        formatPrice={formatPrice}
        extrasTotal={(e) => extrasTotal(dayCount, e)}
        onContinue={() => {
          if (!extrasCar) return;
          setExtrasOpen(false);
          setBookCar(extrasCar);
          setBookOpen(true);
        }}
      />

      <BookingDrawer
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        car={bookCar}
        pickup={{ loc: pickupLoc, date: pickupDate, time: pickupTime }}
        drop={{ loc: sameDrop ? pickupLoc : dropLoc, date: dropDate, time: dropTime }}
        durationDays={dayCount}
        driverAge={driverAge}
        extras={extras}
        formatPrice={formatPrice}
        extrasTotal={(e) => extrasTotal(dayCount, e)}
        basePrice={basePrice}
        grandTotal={(car, e) => grandTotal(car, e)}
      />
    </main>
  );
}

/* =========================================================
   Components
========================================================= */

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-slate-300">{children}</div>;
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={
        'h-6 w-11 rounded-full p-0.5 flex items-center ' +
        (checked ? 'bg-emerald-500' : 'bg-slate-600')
      }
      aria-label="toggle"
    >
      <span
        className={
          'h-5 w-5 rounded-full bg-white transition ' +
          (checked ? 'translate-x-5' : 'translate-x-0')
        }
      />
    </button>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'px-3 py-1.5 rounded-full text-sm border ' +
        (active
          ? 'bg-amber-400 text-slate-900 border-amber-300'
          : 'bg-slate-900/60 text-slate-200 border-white/10 hover:bg-white/5')
      }
    >
      {children}
    </button>
  );
}

function Stars({ value }: { value: number }) {
  const s = Math.round(value);
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={'h-4 w-4 ' + (i < s ? 'fill-amber-400' : 'fill-slate-400/40')}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.953L10 0l2.949 5.957 6.561.953-4.755 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

/* ---- Drawers ---- */

function CompareDrawer({
  open,
  onClose,
  ids,
  cars,
  durationDays,
  formatPrice,
}: {
  open: boolean;
  onClose: () => void;
  ids: string[];
  cars: Car[];
  durationDays: number;
  formatPrice: (n: number) => string;
}) {
  const list = cars.filter((c) => ids.includes(c.id));
  return (
    <div
      className={
        'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[720px] bg-slate-950/95 backdrop-blur border-l border-white/10 transition-transform ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }
    >
      <div
        className={
          'fixed inset-0 bg-black/40 transition ' +
          (open ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        onClick={onClose}
      />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold">Karşılaştır ({list.length}/3)</div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5"
          >
            Kapat
          </button>
        </div>
        <div className="p-4 overflow-auto">
          {!list.length ? (
            <div className="rounded-xl border border-white/10 p-6 text-center text-sm text-slate-300">
              En fazla 3 aracı karşılaştırabilirsiniz.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((c) => (
                <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <img
                    src={c.image}
                    alt={`${c.brand} ${c.model}`}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                  <div className="mt-3 font-semibold">
                    {c.brand} {c.model}
                  </div>
                  <div className="mt-1 text-xs text-slate-300">
                    {c.segment} · {c.transmission === 'Automatic' ? 'Otomatik' : 'Manuel'} ·{' '}
                    {fuelLabel(c.fuel)}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    🚪 {c.doors} · 🧳 {c.luggage} · 🪑 {c.seats}
                  </div>
                  <div className="mt-3 text-sm">
                    Günlük: <span className="font-semibold">{formatPrice(c.pricePerDay)}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {durationDays} gün toplam: {formatPrice(c.pricePerDay * durationDays)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExtrasDrawer({
  open,
  onClose,
  car,
  extras,
  setExtras,
  durationDays,
  formatPrice,
  extrasTotal,
  onContinue,
}: {
  open: boolean;
  onClose: () => void;
  car: Car | null;
  extras: ExtrasState;
  setExtras: (e: ExtrasState) => void;
  durationDays: number;
  formatPrice: (n: number) => string;
  extrasTotal: (e: ExtrasState) => number;
  onContinue: () => void;
}) {
  return (
    <div
      className={
        'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[480px] bg-slate-950/95 backdrop-blur border-l border-white/10 transition-transform ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }
    >
      <div
        className={
          'fixed inset-0 bg-black/40 transition ' +
          (open ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        onClick={onClose}
      />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold">Ekstra Paketler</div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5"
          >
            Kapat
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-auto">
          {!car ? (
            <div className="rounded-xl border border-white/10 p-6 text-center text-sm text-slate-300">
              Araç seçiniz.
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-white/10 p-4 flex items-center gap-3">
                <img src={car.image} alt={car.model} className="h-14 w-20 object-cover rounded-lg" />
                <div className="text-sm">
                  <div className="font-semibold">
                    {car.brand} {car.model}
                  </div>
                  <div className="text-slate-300">
                    {durationDays} gün · {formatPrice(car.pricePerDay)} /gün
                  </div>
                </div>
              </div>

              {/* Extras list */}
              <div className="space-y-3 text-sm">
                {/* full protection */}
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={extras.fullProtection}
                    onChange={(e) =>
                      setExtras({ ...extras, fullProtection: e.target.checked })
                    }
                  />
                  <div className="flex-1">
                    <div className="font-medium">
                      {EXTRAS_PRICING.fullProtection.label}{' '}
                      <span className="text-slate-300">
                        · {formatPrice(EXTRAS_PRICING.fullProtection.perDay!)} /gün
                      </span>
                    </div>
                    <div className="text-slate-400 text-xs">{EXTRAS_PRICING.fullProtection.hint}</div>
                  </div>
                </label>

                {/* additional driver */}
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={extras.additionalDriver}
                    onChange={(e) =>
                      setExtras({ ...extras, additionalDriver: e.target.checked })
                    }
                  />
                  <div className="flex-1">
                    <div className="font-medium">
                      {EXTRAS_PRICING.additionalDriver.label}{' '}
                      <span className="text-slate-300">
                        · {formatPrice(EXTRAS_PRICING.additionalDriver.perDay!)} /gün
                      </span>
                    </div>
                  </div>
                </label>

                {/* child seat */}
                <div className="flex items-center gap-3">
                  <div className="w-6 text-center">👶</div>
                  <div className="flex-1">
                    <div className="font-medium">{EXTRAS_PRICING.childSeat.label}</div>
                    <div className="text-slate-300 text-xs">
                      {formatPrice(EXTRAS_PRICING.childSeat.perDay!)} /gün · Adet
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setExtras({ ...extras, childSeat: Math.max(0, extras.childSeat - 1) })
                      }
                      className="h-8 w-8 rounded-lg border border-white/10"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{extras.childSeat}</span>
                    <button
                      onClick={() =>
                        setExtras({ ...extras, childSeat: Math.min(3, extras.childSeat + 1) })
                      }
                      className="h-8 w-8 rounded-lg border border-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* navigation */}
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={extras.navigation}
                    onChange={(e) =>
                      setExtras({ ...extras, navigation: e.target.checked })
                    }
                  />
                  <div className="flex-1">
                    <div className="font-medium">
                      {EXTRAS_PRICING.navigation.label}{' '}
                      <span className="text-slate-300">
                        · {formatPrice(EXTRAS_PRICING.navigation.fixed!)} (tek sefer)
                      </span>
                    </div>
                  </div>
                </label>

                {/* winter tires */}
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={extras.winterTires}
                    onChange={(e) =>
                      setExtras({ ...extras, winterTires: e.target.checked })
                    }
                  />
                  <div className="flex-1">
                    <div className="font-medium">
                      {EXTRAS_PRICING.winterTires.label}{' '}
                      <span className="text-slate-300">
                        · {formatPrice(EXTRAS_PRICING.winterTires.perDay!)} /gün
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              {/* totals */}
              <div className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-slate-300">Ekstra Toplam</div>
                  <div className="font-semibold">{formatPrice(extrasTotal(extras))}</div>
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  Günlük ücretli kalemler {durationDays} gün ile çarpılır.
                </div>
              </div>

              <button
                onClick={onContinue}
                className="w-full h-11 rounded-xl bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300"
              >
                Devam Et (Rezervasyona)
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BookingDrawer({
  open,
  onClose,
  car,
  pickup,
  drop,
  durationDays,
  driverAge,
  extras,
  formatPrice,
  extrasTotal,
  basePrice,
  grandTotal,
}: {
  open: boolean;
  onClose: () => void;
  car: Car | null;
  pickup: { loc: string; date: string; time: string };
  drop: { loc: string; date: string; time: string };
  durationDays: number;
  driverAge: number;
  extras: ExtrasState;
  formatPrice: (n: number) => string;
  extrasTotal: (e: ExtrasState) => number;
  basePrice: (car: Car) => number;
  grandTotal: (car: Car, e: ExtrasState) => number;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <div
      className={
        'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[520px] bg-slate-950/95 backdrop-blur border-l border-white/10 transition-transform ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }
    >
      <div
        className={
          'fixed inset-0 bg-black/40 transition ' +
          (open ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        onClick={onClose}
      />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold">Rezervasyon</div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm hover:bg-white/5"
          >
            Kapat
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-auto">
          {!car ? (
            <div className="rounded-xl border border-white/10 p-6 text-center text-sm text-slate-300">
              Araç seçiniz.
            </div>
          ) : (
            <>
              {/* summary */}
              <div className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="h-16 w-24 object-cover rounded-lg"
                  />
                  <div className="text-sm">
                    <div className="font-semibold">
                      {car.brand} {car.model}
                    </div>
                    <div className="text-slate-300">
                      {car.segment} · {car.transmission === 'Automatic' ? 'Otomatik' : 'Manuel'} ·{' '}
                      {fuelLabel(car.fuel)}
                    </div>
                    <div className="text-slate-400 text-xs mt-1">
                      Min. yaş: {car.minAge}+ · Sürücü: {driverAge}+
                    </div>
                  </div>
                </div>

                {/* pickup/drop */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-slate-400 text-xs">Alış</div>
                    <div className="font-medium">{pickup.loc}</div>
                    <div className="text-slate-300">
                      {pickup.date} · {pickup.time}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs">Bırakış</div>
                    <div className="font-medium">{drop.loc}</div>
                    <div className="text-slate-300">
                      {drop.date} · {drop.time}
                    </div>
                  </div>
                </div>
              </div>

              {/* prices */}
              <div className="rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between text-sm">
                  <div>Temel ({durationDays}g x {formatPrice(car.pricePerDay)})</div>
                  <div className="font-semibold">{formatPrice(basePrice(car))}</div>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <div>Ekstralar</div>
                  <div className="font-semibold">{formatPrice(extrasTotal(extras))}</div>
                </div>
                <div className="mt-2 border-t border-white/10 pt-2 flex items-center justify-between">
                  <div className="text-slate-300">Genel Toplam</div>
                  <div className="text-lg font-extrabold">
                    {formatPrice(grandTotal(car, extras))}
                  </div>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  * Depozito araç grubuna göre provizyondur; toplam fiyata dahil değildir.
                </div>
              </div>

              {/* extras recap */}
              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-sm font-medium">Seçilen Ekstralar</div>
                <ul className="mt-2 text-sm text-slate-300 space-y-1">
                  {Object.entries(EXTRAS_PRICING)
                    .filter(([key]) => {
                      const k = key as ExtraKey;
                      if (k === 'childSeat') return extras.childSeat > 0;
                      // @ts-ignore
                      return !!extras[k];
                    })
                    .map(([key, v]) => (
                      <li key={key} className="flex items-center gap-2">
                        <span>•</span> <span>{v.label}</span>
                      </li>
                    ))}
                  {!Object.entries(EXTRAS_PRICING).some(([k]) =>
                    k === 'childSeat' ? extras.childSeat > 0 : (extras as any)[k]
                  ) && <li className="text-slate-400">Ekstra seçilmedi.</li>}
                </ul>
              </div>

              {/* form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!agree) {
                    alert('Koşulları kabul etmelisiniz.');
                    return;
                  }
                  alert('Demo: Rezervasyon oluşturuldu. Onay e-postası gönderildi.');
                  onClose();
                }}
                className="grid grid-cols-2 gap-3 text-sm"
              >
                <div className="col-span-2">
                  <div className="text-slate-300">Ad Soyad</div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>
                <div>
                  <div className="text-slate-300">Telefon</div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>
                <div>
                  <div className="text-slate-300">E-posta</div>
                  <input
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                    className="mt-1 w-full h-10 rounded-lg bg-slate-900/60 border border-white/10 px-3"
                  />
                </div>

                <label className="col-span-2 flex items-center gap-2 text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    Rezervasyon koşullarını okudum, kabul ediyorum.
                  </span>
                </label>

                <button className="col-span-2 h-11 rounded-xl bg-emerald-500 text-slate-900 font-semibold hover:bg-emerald-400">
                  Rezervasyonu Tamamla (Demo)
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Small helpers
========================================================= */
function toDate(d: string, t: string) {
  if (!d || !t) return null;
  const dt = new Date(`${d}T${t}:00`);
  return isNaN(dt.getTime()) ? null : dt;
}

function fuelLabel(f: Fuel) {
  if (f === 'Petrol') return 'Benzin';
  if (f === 'Diesel') return 'Dizel';
  if (f === 'Hybrid') return 'Hibrit';
  return 'Elektrik';
}

/* =========================================================
   FAQ
========================================================= */
function FaqItem({
  q,
  children,
}: {
  q: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <span className="font-medium">{q}</span>
        <span className="text-amber-300">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4 text-slate-300 text-sm">{children}</div>}
    </div>
  );
}
