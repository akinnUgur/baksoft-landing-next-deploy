'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

/* =========================================================
   TYPES
========================================================= */
type Branch = 'Nişantaşı' | 'Ataşehir';
type Dept =
  | 'Genel Diş'
  | 'Ortodonti'
  | 'İmplant'
  | 'Diş Estetiği'
  | 'Pedodonti';

type Service = {
  id: string;
  name: string;
  dept: Dept;
  min: number;
  max: number;
  durationMin: number;
  desc: string;
  image?: string; // optional
  tag?: 'Popüler' | 'Yeni' | 'Kampanya';
};

type Doctor = {
  id: string;
  name: string;
  rating: number;
  specialties: Dept[];
  branches: Branch[];
  languages: string[];
  insurances: string[];
  bio: string;
  schedule: Partial<Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string[]>>;
  avatar?: string;
};

type BookingSel = {
  branch?: Branch;
  dept?: Dept;
  doctorId?: string;
  serviceId?: string;
  date?: string; // YYYY-MM-DD
  time?: string; // HH:MM
};

/* =========================================================
   DEMO DATA
========================================================= */
const BRANCHES: Branch[] = ['Nişantaşı', 'Ataşehir'];

const SERVICES: Service[] = [
  {
    id: 'srv-clean',
    name: 'Diş Taşı Temizliği',
    dept: 'Genel Diş',
    min: 900,
    max: 1200,
    durationMin: 30,
    desc:
      'Ultrasonik scaler ile tartar temizliği ve cilalama. 6 ayda bir önerilir.',
    image: '/clinic/clinic-1.webp',
    tag: 'Popüler',
  },
  {
    id: 'srv-white',
    name: 'Ofis Tipi Beyazlatma',
    dept: 'Diş Estetiği',
    min: 2500,
    max: 3500,
    durationMin: 60,
    desc:
      'Heim ışık destekli tek seansta beyazlatma. Duyarlılık için koruyucu jel uygulanır.',
    image: '/clinic/clinic-2.webp',
    tag: 'Kampanya',
  },
  {
    id: 'srv-root',
    name: 'Kanal Tedavisi (Tek Kanal)',
    dept: 'Genel Diş',
    min: 3500,
    max: 5000,
    durationMin: 90,
    desc:
      'Lokal anestezi ile enfekte pulpanın çıkarılıp kanalın doldurulması. Mikroskop destekli.',
    image: '/clinic/clinic-3.webp',
  },
  {
    id: 'srv-veneer',
    name: 'Porselen Lamina (Veneer)',
    dept: 'Diş Estetiği',
    min: 8000,
    max: 12000,
    durationMin: 120,
    desc:
      'Mine dostu minimal aşındırma ile ön bölge estetik lamine porselen uygulaması.',
    image: '/clinic/clinic-4.webp',
    tag: 'Yeni',
  },
  {
    id: 'srv-implant',
    name: 'Diş İmplantı (Tek Ünite)',
    dept: 'İmplant',
    min: 12000,
    max: 18000,
    durationMin: 120,
    desc:
      'Titanyum implant yerleştirme. Gerekirse kemik grefti ve geçici kron opsiyonlu.',
    image: '/clinic/clinic-5.webp',
  },
  {
    id: 'srv-ortho',
    name: 'Ortodontik Muayene',
    dept: 'Ortodonti',
    min: 0,
    max: 300,
    durationMin: 30,
    desc:
      'Diş dizilimi ve kapanış analizi. Şeffaf plak veya braket için başlangıç değerlendirmesi.',
    image: '/clinic/clinic-1.webp',
  },
];

const DOCTORS: Doctor[] = [
  {
    id: 'd-elif',
    name: 'Dt. Elif Demir',
    rating: 4.9,
    specialties: ['Ortodonti', 'Genel Diş'],
    branches: ['Nişantaşı', 'Ataşehir'],
    languages: ['TR', 'EN'],
    insurances: ['Allianz', 'Anadolu Sigorta', 'Aksigorta'],
    bio:
      'Şeffaf plak ve estetik odaklı ortodonti. Erişkin vaka deneyimi yüksek.',
    schedule: {
      1: ['10:00', '11:00', '14:00', '16:00'],
      3: ['09:30', '11:00', '15:30', '17:00'],
      5: ['10:00', '13:00', '16:00'],
    },
  },
  {
    id: 'd-kerem',
    name: 'Dr. Kerem Aydın',
    rating: 4.8,
    specialties: ['İmplant', 'Genel Diş'],
    branches: ['Nişantaşı'],
    languages: ['TR', 'EN', 'DE'],
    insurances: ['Mapfre', 'Allianz'],
    bio:
      'İmplant ve ileri cerrahi. Rejeneratif prosedürler ve sinüs lift uygulamaları.',
    schedule: {
      2: ['10:00', '11:00', '12:00', '15:00', '17:00'],
      4: ['09:00', '10:30', '14:00', '16:30', '18:00'],
      6: ['11:00', '13:00', '15:00'],
    },
  },
  {
    id: 'd-nazli',
    name: 'Dt. Nazlı Yıldız',
    rating: 4.9,
    specialties: ['Diş Estetiği', 'Genel Diş'],
    branches: ['Ataşehir'],
    languages: ['TR', 'EN'],
    insurances: ['Anadolu Sigorta', 'Mapfre'],
    bio:
      'Gülüş tasarımı ve laminate veneer. Dijital planlama, fotoğraf ve mock-up ile ilerler.',
    schedule: {
      1: ['12:00', '14:00', '16:00', '17:30'],
      3: ['10:00', '11:30', '14:30', '16:30'],
      5: ['09:00', '10:30', '13:30', '15:30', '17:00'],
    },
  },
];

const INSURANCE_POOL = [
  'Allianz',
  'Anadolu Sigorta',
  'Aksigorta',
  'Mapfre',
  'Sompo',
];

/* =========================================================
   SMALL HELPERS
========================================================= */
const TL = (n: number) =>
  `₺${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`;

const DAY_TR: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string> = {
  1: 'Pzt',
  2: 'Sal',
  3: 'Çar',
  4: 'Per',
  5: 'Cum',
  6: 'Cmt',
  7: 'Paz',
};

function weekdayFromISO(date: string): 1 | 2 | 3 | 4 | 5 | 6 | 7 | 0 {
  if (!date) return 0;
  const d = new Date(date + 'T00:00:00');
  const js = d.getDay(); // 0=Sun..6=Sat
  return (js === 0 ? 7 : (js as any)) as any;
}

/* =========================================================
   PAGE
========================================================= */
export default function Paket15Clinic() {
  // ----- Adım 1: Hero + Hızlı Randevu -----
  const [sel, setSel] = useState<BookingSel>({
    branch: 'Nişantaşı',
    dept: 'Genel Diş',
  });
  const [error, setError] = useState('');

  // ----- Adım 2: Hizmetler filtre -----
  const [deptFilter, setDeptFilter] = useState<Dept | 'Tümü'>('Tümü');
  const maxPrice = Math.max(...SERVICES.map((s) => s.max));
  const [priceCap, setPriceCap] = useState(maxPrice);

  // ----- Adım 3-4-5: Drawerlar -----
  const [serviceOpen, setServiceOpen] = useState(false);
  const [serviceView, setServiceView] = useState<Service | null>(null);

  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleDoctor, setScheduleDoctor] = useState<Doctor | null>(null);

  const [bookingOpen, setBookingOpen] = useState(false);

  const servicesFiltered = useMemo(() => {
    let arr = SERVICES.slice();
    if (deptFilter !== 'Tümü') arr = arr.filter((s) => s.dept === deptFilter);
    arr = arr.filter((s) => s.min <= priceCap || s.max <= priceCap);
    // tag + price then alphabetical
    return arr.sort(
      (a, b) =>
        (b.tag ? 1 : 0) - (a.tag ? 1 : 0) ||
        a.min - b.min ||
        a.name.localeCompare(b.name, 'tr')
    );
  }, [deptFilter, priceCap]);

  function tryOpenBooking() {
    if (!sel.branch || !sel.dept || !sel.date || !sel.time) {
      setError(
        'Lütfen şube, bölüm, tarih ve saat seçin. (Doktor/Hizmet isteğe bağlıdır.)'
      );
      return;
    }
    setError('');
    setBookingOpen(true);
  }

  return (
    <main
      className="min-h-[100dvh] w-full overflow-x-hidden text-slate-900 bg-gradient-to-b from-white via-sky-50/40 to-white"
    >
      {/* Top strip */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span className="font-semibold">Baksoft · Özelleştirilebilir Tasarım No:10</span>
          <a href="#booking" className="underline underline-offset-4">Randevu Al</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
          {/* Logo + Marka */}
          <a
            href="/paketler"
            className="flex items-center gap-2"
          >
            <Image
              src="/baksoftLogo.png"
              alt="Baksoft Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <div className="font-semibold tracking-wide">Baksoft Tasarım</div>
          </a>

          {/* Menü */}
          <nav className="hidden md:flex ml-6 gap-6 text-sm text-slate-600">
            <a href="#booking" className="hover:text-slate-900">Randevu</a>
            <a href="#services" className="hover:text-slate-900">Hizmetler</a>
            <a href="#doctors" className="hover:text-slate-900">Doktorlar</a>
            <a href="#gallery" className="hover:text-slate-900">Önce/Sonra</a>
            <a href="#faq" className="hover:text-slate-900">SSS</a>
          </nav>

          {/* Sağ buton */}
          <a
            href="#booking"
            className="ml-auto rounded-xl px-4 h-10 grid place-items-center bg-teal-500 text-white font-semibold hover:bg-teal-400 transition"
          >
            Randevu Al
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3881441/pexels-photo-3881441.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Klinik ortamı"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/40 via-sky-50/50 to-white" />
        <div className="mx-auto max-w-7xl px-4 py-14 md:py-22 grid md:grid-cols-12 gap-10 items-center relative">
          <div className="md:col-span-6">
            <span className="inline-block text-[11px] uppercase tracking-widest text-teal-700 bg-white/70 border border-slate-200 px-2 py-1 rounded">
              Dijital Planlama · Tecrübeli Doktorlar
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.06] text-slate-900">
              Gülüşünü <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500">yeniden tasarla</span>
            </h1>
            <p className="mt-4 text-lg text-slate-700 max-w-2xl">
              Nova Klinik’te şeffaf fiyat aralıkları, sigorta anlaşmaları ve size özel randevu esnekliği.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                ['🧪', 'Dijital'],
                ['🦷', 'Estetik'],
                ['🛡️', 'Steril'],
                ['⭐', '4.9/5'],
              ].map(([i, t]) => (
                <div key={t} className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 flex items-center gap-2">
                  <span className="text-lg">{i}</span>
                  <span className="text-slate-700">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick booking */}
          <aside id="booking" className="md:col-span-6">
            <div className="rounded-2xl border border-teal-300/50 bg-white/80 backdrop-blur p-5 shadow-[0_0_80px_-30px_rgba(20,184,166,0.45)]">
              <div className="text-sm text-slate-800 font-medium">Hızlı Randevu</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  tryOpenBooking();
                }}
                className="mt-3 grid grid-cols-2 gap-3 text-sm"
              >
                <div>
                  <Label>Şube</Label>
                  <select
                    value={sel.branch}
                    onChange={(e) =>
                      setSel((s) => ({ ...s, branch: e.target.value as Branch }))
                    }
                    className="mt-1 w-full h-11 rounded-xl bg-white border border-slate-200 px-3"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Bölüm</Label>
                  <select
                    value={sel.dept}
                    onChange={(e) =>
                      setSel((s) => ({ ...s, dept: e.target.value as Dept }))
                    }
                    className="mt-1 w-full h-11 rounded-xl bg-white border border-slate-200 px-3"
                  >
                    {(['Genel Diş', 'Ortodonti', 'İmplant', 'Diş Estetiği', 'Pedodonti'] as Dept[]).map(
                      (d) => (
                        <option key={d}>{d}</option>
                      )
                    )}
                  </select>
                </div>

                <div className="col-span-2">
                  <Label>Doktor (opsiyonel)</Label>
                  <select
                    value={sel.doctorId || ''}
                    onChange={(e) =>
                      setSel((s) => ({ ...s, doctorId: e.target.value || undefined }))
                    }
                    className="mt-1 w-full h-11 rounded-xl bg-white border border-slate-200 px-3"
                  >
                    <option value="">Farketmez</option>
                    {DOCTORS.filter(
                      (d) =>
                        (!sel.dept || d.specialties.includes(sel.dept)) &&
                        (!sel.branch || d.branches.includes(sel.branch))
                    ).map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Tarih</Label>
                  <input
                    type="date"
                    value={sel.date || ''}
                    onChange={(e) =>
                      setSel((s) => ({ ...s, date: e.target.value || undefined }))
                    }
                    className="mt-1 w-full h-11 rounded-xl bg-white border border-slate-200 px-3"
                  />
                </div>
                <div>
                  <Label>Saat</Label>
                  <input
                    type="time"
                    value={sel.time || ''}
                    onChange={(e) =>
                      setSel((s) => ({ ...s, time: e.target.value || undefined }))
                    }
                    className="mt-1 w-full h-11 rounded-xl bg-white border border-slate-200 px-3"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Hizmet (opsiyonel)</Label>
                  <select
                    value={sel.serviceId || ''}
                    onChange={(e) =>
                      setSel((s) => ({ ...s, serviceId: e.target.value || undefined }))
                    }
                    className="mt-1 w-full h-11 rounded-xl bg-white border border-slate-200 px-3"
                  >
                    <option value="">Seçim yapma</option>
                    {SERVICES.filter(
                      (x) => !sel.dept || x.dept === sel.dept
                    ).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({TL(s.min)}–{TL(s.max)})
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="col-span-2 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 px-3 py-2 text-xs">
                    {error}
                  </div>
                )}

                <button className="col-span-2 h-12 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400">
                  Randevuya Devam
                </button>
                <p className="col-span-2 text-[11px] text-slate-500">
                  * Bu demo akışıdır; ödeme/entegrasyon sonradan bağlanır.
                </p>
              </form>
            </div>
          </aside>
        </div>
      </section>

      {/* =========================
          Adım 2 · Hizmetler & Fiyat
      ========================== */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-14 border-t border-slate-200/60">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Hizmetler & Fiyat Aralıkları</h2>
            <p className="text-slate-600 mt-1">Şeffaf aralıklar, hekim muayenesi sonrasında netleştirilir.</p>
          </div>
          <div className="shrink-0 grid grid-cols-2 gap-2 text-sm">
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value as any)}
              className="h-10 rounded-xl bg-white border border-slate-200 px-3"
            >
              {(['Tümü', 'Genel Diş', 'Ortodonti', 'İmplant', 'Diş Estetiği', 'Pedodonti'] as const).map(
                (d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                )
              )}
            </select>
            <div className="h-10 rounded-xl bg-white border border-slate-200 px-3 flex items-center justify-between">
              <span className="text-slate-600">Azami</span>
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={priceCap}
                onChange={(e) => setPriceCap(Number(e.target.value))}
                className="w-36"
              />
              <span className="font-medium">{TL(priceCap)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesFiltered.map((s) => (
            <article
              key={s.id}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden"
            >
              <div className="relative">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={s.image || '/clinic/clinic-1.webp'}
                    alt={s.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                </div>
                {s.tag && (
                  <span
                    className={
                      'absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full text-white ' +
                      (s.tag === 'Kampanya'
                        ? 'bg-amber-500'
                        : s.tag === 'Yeni'
                        ? 'bg-teal-500'
                        : 'bg-cyan-500')
                    }
                  >
                    {s.tag}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold leading-tight">{s.name}</h3>
                    <div className="mt-1 text-xs text-slate-500">{s.dept} · {s.durationMin} dk</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Aralık</div>
                    <div className="font-extrabold">{TL(s.min)}–{TL(s.max)}</div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{s.desc}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setServiceView(s);
                      setServiceOpen(true);
                    }}
                    className="h-10 rounded-xl border border-slate-200 text-sm hover:bg-slate-50"
                  >
                    Detay
                  </button>
                  <button
                    onClick={() => {
                      setSel((v) => ({ ...v, serviceId: s.id, dept: s.dept }));
                      setBookingOpen(true);
                    }}
                    className="h-10 rounded-xl bg-teal-500 text-white text-sm hover:bg-teal-400"
                  >
                    Randevu Al
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================
          Adım 3 · Doktorlar & Kartlar
      ========================== */}
      <section id="doctors" className="mx-auto max-w-7xl px-4 py-14 border-t border-slate-200/60">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Doktorlarımız</h2>
            <p className="text-slate-600 mt-1">Uzmanlık, dil ve şubeye göre size uygun doktoru seçin.</p>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {DOCTORS.map((d) => (
            <article key={d.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                {/* Avatar (initials if missing) */}
                <Avatar name={d.name} src={d.avatar} />
                <div>
                  <div className="text-lg font-semibold">{d.name}</div>
                  <div className="text-sm text-slate-600">
                    <Stars value={d.rating} /> <span className="ml-1">{d.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600">{d.bio}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {d.specialties.map((s) => (
                  <span key={s} className="px-2 py-1 rounded-full text-[11px] bg-slate-100 border border-slate-200">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                <span>Şube: {d.branches.join(' / ')}</span>
                <span>·</span>
                <span>Dil: {d.languages.join(' / ')}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {d.insurances.map((ins) => (
                  <span key={ins} className="px-2 py-1 rounded-full text-[11px] bg-teal-50 border border-teal-200 text-teal-700">
                    {ins}
                  </span>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setScheduleDoctor(d);
                    setScheduleOpen(true);
                  }}
                  className="h-10 rounded-xl border border-slate-200 text-sm hover:bg-slate-50"
                >
                  Takvimi Gör
                </button>
                <button
                  onClick={() => {
                    setSel((s) => ({
                      ...s,
                      doctorId: d.id,
                      dept: s.dept || d.specialties[0],
                    }));
                    setBookingOpen(true);
                  }}
                  className="h-10 rounded-xl bg-teal-500 text-white text-sm hover:bg-teal-400"
                >
                  Randevu Al
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================
          Adım 4 · Sigorta · Yorumlar · Önce/Sonra
      ========================== */}
      <section id="gallery" className="mx-auto max-w-7xl px-4 py-14 border-t border-slate-200/60">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Insurance */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-semibold">Anlaşmalı Sigortalar</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {INSURANCE_POOL.map((i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-sm">
                  {i}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-600">
              Poliçe kapsamınıza göre fark ücretleri muayene sonrası netleşir.
            </p>
          </div>

          {/* Reviews */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-semibold">Hasta Yorumları</h3>
            <div className="mt-3 space-y-3">
              {[
                { n: 'S. K.', t: 'Beyazlatma işlemi sonrası hassasiyetim olmadı. Doktor hanım harikaydı!' },
                { n: 'E. Y.', t: 'İmplant süreci beklediğimden konforluydu. Tüm ekip ilgili.' },
                { n: 'A. D.', t: 'Ortodonti için şeffaf plak çok pratik; randevular da çok esnek.' },
              ].map((r, i) => (
                <div key={i} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{r.n}</span>
                    <span className="text-xs text-amber-600">★★★★★</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{r.t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Before/After */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-xl font-semibold">Önce / Sonra</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                {
                  before:
                    'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
                  after:
                    'https://images.pexels.com/photos/3760265/pexels-photo-3760265.jpeg?auto=compress&cs=tinysrgb&w=800',
                },
                {
                  before:
                    'https://images.pexels.com/photos/5355697/pexels-photo-5355697.jpeg?auto=compress&cs=tinysrgb&w=800',
                  after:
                    'https://images.pexels.com/photos/5355697/pexels-photo-5355697.jpeg?auto=compress&cs=tinysrgb&w=800',
                },
              ].map((g, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden border border-slate-200">
                  <div className="relative">
                    <div className="relative w-full aspect-[4/3]">
                      <Image src={g.before} alt="Önce" fill sizes="50vw" className="object-cover" />
                    </div>
                    <span className="absolute left-2 top-2 text-[11px] px-2 py-1 rounded-full bg-slate-900/80 text-white">Önce</span>
                  </div>
                  <div className="relative">
                    <div className="relative w-full aspect-[4/3]">
                      <Image src={g.after} alt="Sonra" fill sizes="50vw" className="object-cover" />
                    </div>
                    <span className="absolute left-2 top-2 text-[11px] px-2 py-1 rounded-full bg-emerald-600 text-white">Sonra</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-600">* Görseller temsili olup, her vaka kişiye özeldir.</p>
          </div>
        </div>
      </section>

      {/* =========================
          Adım 5 · SSS & İletişim
      ========================== */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-14 border-t border-slate-200/60">
        <h3 className="text-2xl font-semibold">Sık Sorulan Sorular</h3>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <Faq q="Fiyatlar neden aralık olarak veriliyor?">
            Klinik muayenesi sonrası diş durumu netleşir; gerekli ek işlemlere göre fiyat belirlenir.
          </Faq>
          <Faq q="Sigortam işlemi karşılar mı?">
            Poliçe kapsamı ve hizmete göre değişir. Ön muayene ardından danışmanımız bilgilendirir.
          </Faq>
          <Faq q="Randevuyu nasıl iptal ederim?">
            Randevu saatinden 24 saat öncesine kadar ücretsiz iptal edilebilir.
          </Faq>
          <Faq q="Ödeme seçenekleri nelerdir?">
            Kredi kartı, taksit ve havale/EFT geçerlidir.
          </Faq>
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="font-semibold">Nova Klinik</div>
            <div className="mt-2 text-slate-600">Nişantaşı & Ataşehir şubeleri ile hizmetinizde.</div>
          </div>
          <div>
            <div className="font-semibold">İletişim</div>
            <div className="mt-2 text-slate-600">T: (0212) 000 00 00<br/>E: info@novaklinik.tr</div>
          </div>
          <div>
            <div className="font-semibold">Konum</div>
            <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 h-24 grid place-items-center text-slate-500">
              Harita Placeholder
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 h-12 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Baksoft · Özelleştirilebilir Tasarım No:10</span>
          <a href="#booking" className="underline underline-offset-4">Randevu</a>
        </div>
      </footer>

      {/* DRAWERS */}
      <ServiceDrawer
        open={serviceOpen}
        onClose={() => setServiceOpen(false)}
        service={serviceView}
        onBook={() => {
          if (!serviceView) return;
          setSel((v) => ({ ...v, serviceId: serviceView.id, dept: serviceView.dept }));
          setServiceOpen(false);
          setBookingOpen(true);
        }}
      />

      <ScheduleDrawer
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        doctor={scheduleDoctor}
        onPick={(date, time) => {
          setSel((v) => ({ ...v, date, time, doctorId: scheduleDoctor?.id }));
          setScheduleOpen(false);
          setBookingOpen(true);
        }}
      />

      <BookingDrawer
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        sel={sel}
        setSel={setSel}
      />
    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */
function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-slate-600">{children}</div>;
}

function Stars({ value }: { value: number }) {
  const s = Math.round(value);
  return (
    <span className="inline-flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={'h-4 w-4 ' + (i < s ? 'fill-amber-500' : 'fill-slate-300')}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.953L10 0l2.949 5.957 6.561.953-4.755 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  );
}

/* ---- Avatar with initials ---- */
function Avatar({ name, src }: { name: string; src?: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();

  if (!src) {
    return (
      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 text-white grid place-items-center font-semibold">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative h-14 w-14 rounded-xl overflow-hidden">
      <Image src={src} alt={name} fill sizes="56px" className="object-cover" />
    </div>
  );
}

/* ---- FAQ ---- */
function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3 flex items-center justify-between"
      >
        <span className="font-medium">{q}</span>
        <span className="text-teal-600">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="px-4 pb-4 text-slate-700 text-sm">{children}</div>}
    </div>
  );
}

/* ---- Service Drawer ---- */
function ServiceDrawer({
  open,
  onClose,
  service,
  onBook,
}: {
  open: boolean;
  onClose: () => void;
  service: Service | null;
  onBook: () => void;
}) {
  return (
    <div
      className={
        'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[520px] bg-white/90 backdrop-blur border-l border-slate-200 transition-transform ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }
    >
      <div
        className={
          'fixed inset-0 bg-black/30 transition ' +
          (open ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        onClick={onClose}
      />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between bg-white/80">
          <div className="font-semibold">Hizmet Detayı</div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Kapat
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-auto">
          {!service ? (
            <div className="rounded-xl border border-slate-200 p-6 text-center text-sm text-slate-600 bg-white">
              Hizmet seçiniz.
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={service.image || '/clinic/clinic-1.webp'}
                    alt={service.name}
                    fill
                    sizes="(max-width: 520px) 100vw, 520px"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm text-slate-500">{service.dept}</div>
                  <h3 className="text-lg font-semibold">{service.name}</h3>
                  <div className="mt-1 text-slate-600 text-sm">{service.desc}</div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="text-slate-600">Süre: {service.durationMin} dk</div>
                    <div className="font-semibold">
                      {TL(service.min)}–{TL(service.max)}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onBook}
                className="w-full h-11 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400"
              >
                Randevuya Ekle
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- Schedule Drawer ---- */
function ScheduleDrawer({
  open,
  onClose,
  doctor,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  onPick: (date: string, time: string) => void;
}) {
  const [date, setDate] = useState('');
  const wd = weekdayFromISO(date); // 1..7
  const slots = doctor && wd ? doctor.schedule[wd as 1] || [] : [];

  return (
    <div
      className={
        'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[520px] bg-white/90 backdrop-blur border-l border-slate-200 transition-transform ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }
    >
      <div
        className={
          'fixed inset-0 bg-black/30 transition ' +
          (open ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        onClick={onClose}
      />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between bg-white/80">
          <div className="font-semibold">Doktor Takvimi</div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Kapat
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-auto">
          {!doctor ? (
            <div className="rounded-xl border border-slate-200 p-6 text-center text-sm text-slate-600 bg-white">
              Doktor seçiniz.
            </div>
          ) : (
            <>
              <div className="rounded-xl border border-slate-200 p-4 bg-white">
                <div className="flex items-center gap-3">
                  <Avatar name={doctor.name} src={doctor.avatar} />
                  <div>
                    <div className="font-semibold">{doctor.name}</div>
                    <div className="text-sm text-slate-600">
                      <Stars value={doctor.rating} />{' '}
                      <span className="ml-1">{doctor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-600">
                  Branş: {doctor.specialties.join(' / ')} · Şube: {doctor.branches.join(' / ')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label>Tarih</Label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => (setDate(e.target.value))}
                    className="mt-1 w-full h-11 rounded-xl bg-white border border-slate-200 px-3"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Uygun Saatler</Label>
                  {!date ? (
                    <div className="mt-2 text-sm text-slate-500">Önce tarih seçin.</div>
                  ) : !slots.length ? (
                    <div className="mt-2 text-sm text-slate-500">
                      {DAY_TR[wd as 1]} günü için uygun saat bulunamadı.
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {slots.map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            onPick(date, t);
                          }}
                          className="h-10 px-3 rounded-xl bg-teal-500 text-white text-sm hover:bg-teal-400"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---- Booking Drawer ---- */
function BookingDrawer({
  open,
  onClose,
  sel,
  setSel,
}: {
  open: boolean;
  onClose: () => void;
  sel: BookingSel;
  setSel: (u: any) => void;
}) {
  const svc = sel.serviceId
    ? SERVICES.find((s) => s.id === sel.serviceId)
    : undefined;
  const doc = sel.doctorId ? DOCTORS.find((d) => d.id === sel.doctorId) : undefined;

  // form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [ins, setIns] = useState<string>('');
  const [agree, setAgree] = useState(false);

  return (
    <div
      className={
        'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[560px] bg-white/90 backdrop-blur border-l border-slate-200 transition-transform ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }
    >
      <div
        className={
          'fixed inset-0 bg-black/30 transition ' +
          (open ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }
        onClick={onClose}
      />
      <div className="relative h-full flex flex-col">
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between bg-white/80">
          <div className="font-semibold">Randevu Özeti</div>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          >
            Kapat
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-auto">
          {/* Seçim */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-slate-500 text-xs">Şube</div>
                <select
                  value={sel.branch}
                  onChange={(e) => setSel((v: BookingSel) => ({ ...v, branch: e.target.value as Branch }))}
                  className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
                >
                  {BRANCHES.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Bölüm</div>
                <select
                  value={sel.dept}
                  onChange={(e) => setSel((v: BookingSel) => ({ ...v, dept: e.target.value as Dept }))}
                  className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
                >
                  {(['Genel Diş', 'Ortodonti', 'İmplant', 'Diş Estetiği', 'Pedodonti'] as Dept[]).map(
                    (d) => (
                      <option key={d}>{d}</option>
                    )
                  )}
                </select>
              </div>

              <div>
                <div className="text-slate-500 text-xs">Tarih</div>
                <input
                  type="date"
                  value={sel.date || ''}
                  onChange={(e) => setSel((v: BookingSel) => ({ ...v, date: e.target.value || undefined }))}
                  className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
                />
              </div>
              <div>
                <div className="text-slate-500 text-xs">Saat</div>
                <input
                  type="time"
                  value={sel.time || ''}
                  onChange={(e) => setSel((v: BookingSel) => ({ ...v, time: e.target.value || undefined }))}
                  className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
                />
              </div>

              <div className="col-span-2">
                <div className="text-slate-500 text-xs">Doktor</div>
                <select
                  value={sel.doctorId || ''}
                  onChange={(e) => setSel((v: BookingSel) => ({ ...v, doctorId: e.target.value || undefined }))}
                  className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
                >
                  <option value="">Farketmez</option>
                  {DOCTORS.filter(
                    (d) =>
                      (!sel.dept || d.specialties.includes(sel.dept)) &&
                      (!sel.branch || d.branches.includes(sel.branch))
                  ).map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <div className="text-slate-500 text-xs">Hizmet</div>
                <select
                  value={sel.serviceId || ''}
                  onChange={(e) => setSel((v: BookingSel) => ({ ...v, serviceId: e.target.value || undefined }))}
                  className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
                >
                  <option value="">Seçim yapma</option>
                  {SERVICES.filter((x) => !sel.dept || x.dept === sel.dept).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({TL(s.min)}–{TL(s.max)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Özet fiyat */}
          <div className="rounded-xl border border-slate-200 p-4 bg-white">
            <div className="flex items-center justify-between text-sm">
              <div className="text-slate-600">Tahmini Ücret</div>
              <div className="text-lg font-extrabold">
                {svc ? `${TL(svc.min)}–${TL(svc.max)}` : 'Muayene sonrası'}
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Nihai fiyat hekim muayenesi ve planlamaya göre belirlenir.
            </div>
          </div>

          {/* Hasta bilgileri */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!sel.branch || !sel.dept || !sel.date || !sel.time) {
                alert('Şube, bölüm, tarih ve saat gereklidir.');
                return;
              }
              if (!agree) {
                alert('Aydınlatma metnini onaylayın.');
                return;
              }
              alert('Demo: Randevu talebiniz alınmıştır. E-posta ile bilgilendirileceksiniz.');
              onClose();
            }}
            className="grid grid-cols-2 gap-3 text-sm"
          >
            <div className="col-span-2">
              <div className="text-slate-600">Ad Soyad</div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
              />
            </div>
            <div>
              <div className="text-slate-600">Telefon</div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
              />
            </div>
            <div>
              <div className="text-slate-600">E-posta</div>
              <input
                type="email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
                className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
              />
            </div>
            <div className="col-span-2">
              <div className="text-slate-600">Sigorta (opsiyonel)</div>
              <select
                value={ins}
                onChange={(e) => setIns(e.target.value)}
                className="mt-1 w-full h-10 rounded-lg bg-white border border-slate-200 px-3"
              >
                <option value="">Seçim yapma</option>
                {INSURANCE_POOL.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>

            <label className="col-span-2 flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <span>Kişisel verilerin işlenmesine ilişkin aydınlatma metnini okudum, onaylıyorum.</span>
            </label>

            <button className="col-span-2 h-11 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-400">
              Randevu Talebini Gönder (Demo)
            </button>
          </form>

          {/* Doktor/servis özet satırı */}
          {(doc || svc) && (
            <div className="rounded-xl border border-slate-200 p-4 bg-white text-sm">
              {doc && (
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Doktor:</span>
                  <span className="font-medium">{doc.name}</span>
                  <span className="text-xs text-slate-500">({doc.specialties.join(' / ')})</span>
                </div>
              )}
              {svc && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-500">Hizmet:</span>
                  <span className="font-medium">{svc.name}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
