'use client';

import { useMemo, useState } from 'react';
import Head from 'next/head';
import Image from "next/image";

/* ====== SEO sabitleri (kendine göre düzenle) ====== */
const SITE_URL = 'https://baksoftarge.com'; // <-- kendi domainin
const PAGE_PATH = '/paketler/paket1';
const CANONICAL = `${SITE_URL}${PAGE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og/paket1.jpg`; // varsa yerel bir görsel kullan

/* ============================ Types ============================ */
type StyleKey = 'Scandi' | 'Industrial' | 'Contemporary';
type Program = 'Residential' | 'Office' | 'Retail' | 'Hospitality' | 'Healthcare';
type Quality = 'Standard' | 'Premium' | 'Luxury';

type StylePreset = {
  key: StyleKey;
  name: string;
  palette: { bg: string; ink: string; accent: string; soft: string };
  collage: string[];
  textureClass: string;
};

type Project = {
  id: string;
  title: string;
  type: Program;
  year: number;
  area: number; // m²
  location: string;
  cover: string;
  photos: string[];
  blurb: string;
  specs: { program: string; client: string; status: 'Concept' | 'Built' };
  materials: string[];
};

/* ============================ Image Pool (LOCAL) ============================ */
/** /public altındaki yerel görseller:
 *  /public/mimarlik/mimarlik-1.webp ... mimarlik-6.webp (toplam 6)
 *  /public/mimarlik/mimarlik-oncesi.webp
 *  /public/mimarlik/mimarlik-sonrasi.webp
 */
const LOCAL_IMG = [
  '/mimarlik/mimarlik-1.webp',
  '/mimarlik/mimarlik-2.webp',
  '/mimarlik/mimarlik-3.webp',
  '/mimarlik/mimarlik-4.webp',
  '/mimarlik/mimarlik-5.webp',
  '/mimarlik/mimarlik-6.webp',
];
const pick = (i: number) => LOCAL_IMG[i % LOCAL_IMG.length];

/* ============================ Data ============================ */
const PRESETS: StylePreset[] = [
  {
    key: 'Scandi',
    name: 'Scandi',
    palette: { bg: '#f7f3ed', ink: '#1f2937', accent: '#7c9a6d', soft: '#e9e3da' },
    collage: [pick(0), pick(1), pick(2)],
    textureClass:
      'bg-[radial-gradient(60%_40%_at_10%_0%,rgba(124,154,109,0.10),transparent),radial-gradient(40%_30%_at_100%_0%,rgba(31,41,55,0.08),transparent)]',
  },
  {
    key: 'Industrial',
    name: 'Industrial',
    palette: { bg: '#efefef', ink: '#0f172a', accent: '#b4673a', soft: '#e3e3e3' },
    collage: [pick(3), pick(4), pick(5)],
    textureClass:
      'bg-[radial-gradient(60%_40%_at_15%_0%,rgba(180,103,58,0.10),transparent),radial-gradient(40%_30%_at_100%_0%,rgba(15,23,42,0.10),transparent)]',
  },
  {
    key: 'Contemporary',
    name: 'Contemporary',
    palette: { bg: '#f6f6f9', ink: '#111827', accent: '#b69357', soft: '#e9eaf2' },
    collage: [pick(2), pick(5), pick(1)],
    textureClass:
      'bg-[radial-gradient(60%_40%_at_10%_0%,rgba(182,147,87,0.10),transparent),radial-gradient(40%_30%_at_100%_0%,rgba(17,24,39,0.06),transparent)]',
  },
];

const PROJECTS: Project[] = [
  {
    id: 'p-loft',
    title: 'Kalamiş Loft',
    type: 'Residential',
    year: 2024,
    area: 165,
    location: 'İstanbul',
    cover: pick(0),
    photos: [pick(1), pick(2), pick(3)],
    blurb:
      'Endüstriyel kabuğu koruyup sıcak dokularla dengelenmiş bir loft yaşamı. Günışığına göre esneyen aydınlatma senaryosu.',
    specs: { program: 'Loft Daire', client: 'Özel', status: 'Built' },
    materials: ['Oak', 'Travertine', 'Brass', 'Graphite'],
  },
  {
    id: 'p-office',
    title: 'Kanyon Office',
    type: 'Office',
    year: 2025,
    area: 480,
    location: 'İstanbul',
    cover: pick(4),
    photos: [pick(5), pick(0), pick(2)],
    blurb:
      'Açık ofis ile odak alanlarının hibrit kurgusu. Akustik elemanlar ve biyofilik içeriğin dengesi.',
    specs: { program: 'Kurumsal Ofis', client: 'Aurex Tech', status: 'Built' },
    materials: ['Graphite', 'Linen', 'Oak', 'Brass'],
  },
  {
    id: 'p-retail',
    title: 'Arcade Retail',
    type: 'Retail',
    year: 2023,
    area: 220,
    location: 'İzmir',
    cover: pick(1),
    photos: [pick(3), pick(4), pick(5)],
    blurb:
      'Modüler vitrin ve pirinç aksesuarlı teşhir. Esnek sezonsal dönüşüme uygun raf sistemleri.',
    specs: { program: 'Perakende', client: 'Arcade', status: 'Built' },
    materials: ['Brass', 'Travertine', 'Graphite'],
  },
  {
    id: 'p-hotel',
    title: 'Courtyard Hotel',
    type: 'Hospitality',
    year: 2024,
    area: 1200,
    location: 'Antalya',
    cover: pick(2),
    photos: [pick(0), pick(5), pick(4)],
    blurb:
      'Avlu etrafında kurulu oda tipolojisi ve doğal taş ağırlıklı peyzaj entegrasyonu.',
    specs: { program: 'Butik Otel', client: 'Private', status: 'Concept' },
    materials: ['Travertine', 'Oak', 'Linen'],
  },
  {
    id: 'p-clinic',
    title: 'Nişantaşı Clinic',
    type: 'Healthcare',
    year: 2025,
    area: 340,
    location: 'İstanbul',
    cover: pick(5),
    photos: [pick(1), pick(3), pick(2)],
    blurb:
      'Hijyenik kabukta sıcak dokular: traverten, pirinç ve keten ile klinik ortamına huzur katan yaklaşım.',
    specs: { program: 'Klinik İç Mekân', client: 'Nova', status: 'Built' },
    materials: ['Travertine', 'Brass', 'Linen'],
  },
];

const MATERIALS = [
  { n: 'Oak', c: '#c8a67b', cat: 'Wood' },
  { n: 'Walnut', c: '#9b6b43', cat: 'Wood' },
  { n: 'Travertine', c: '#d8c6b3', cat: 'Stone' },
  { n: 'Marble', c: '#e6e6e8', cat: 'Stone' },
  { n: 'Graphite', c: '#2b2f33', cat: 'Metal' },
  { n: 'Brass', c: '#b69357', cat: 'Metal' },
  { n: 'Linen', c: '#ddd7c8', cat: 'Textile' },
  { n: 'Charcoal Paint', c: '#1f2937', cat: 'Paint' },
  { n: 'Sage Paint', c: '#7c9a6d', cat: 'Paint' },
];

/* ============================ Page ============================ */
export default function Paket1Interior() {
  /* ===== SEO: Head (tek dosyada) ===== */
  const title =
    'Paket 1 — İç Mimarlık Web Sitesi | Hızlı, Portföy Odaklı | BaksoftARGE';
  const description =
    'İç mimarlar için hızlı, mobil ve SEO uyumlu web sitesi paketi. Proje mozaiği, malzeme kütüphanesi, önce/sonra slider ve bütçe hesaplayıcı ile portföyünüzü etkili sergileyin.';
  const keywords =
    'iç mimarlık web sitesi, mimar portföy, mimarlık kurumsal site, web tasarım paketleri, baksoft arge paketler';

  // Style
  const [style, setStyle] = useState<StyleKey>('Contemporary');
  const [daylight, setDaylight] = useState(70);

  const active = useMemo(() => PRESETS.find((p) => p.key === style)!, [style]);
  const cssVars: React.CSSProperties = {
    ['--bg' as any]: active.palette.bg,
    ['--accent' as any]: active.palette.accent,
    ['--soft' as any]: active.palette.soft,
  };

  // Mosaic
  const [filter, setFilter] = useState<Program | 'All'>('All');
  const [activeCase, setActiveCase] = useState<Project | null>(null);

  // Materials
  const [picked, setPicked] = useState<string[]>([]);
  const pickedSwatches = MATERIALS.filter((m) => picked.includes(m.n));

  // Budget
  const [area, setArea] = useState(120);
  const [prog, setProg] = useState<Program>('Residential');
  const [quality, setQuality] = useState<Quality>('Premium');

  const paletteBg = { background: 'var(--bg)' };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={CANONICAL} />
        <meta name="robots" content="index,follow" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:title" content="Paket 1 — İç Mimarlık Web Sitesi | BaksoftARGE" />
        <meta
          property="og:description"
          content="İç mimarlar için hızlı, mobil ve SEO uyumlu web sitesi paketi. Proje mozaiği, malzeme kütüphanesi, önce/sonra ve bütçe modülü."
        />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:locale" content="tr_TR" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paket 1 — İç Mimarlık Web Sitesi | BaksoftARGE" />
        <meta
          name="twitter:description"
          content="İç mimarlar için hızlı, mobil ve SEO uyumlu web sitesi paketi."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>

      <main
        className="min-h-[100dvh] text-slate-900"
        style={{ ...cssVars, background: 'var(--bg)', overflowX: 'clip' }}
      >
        {/* Top strip (bilgi şeridi) */}
        <div style={{ background: 'var(--accent)', color: 'var(--bg)' }} className="text-xs">
          <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
            <span className="tracking-wide opacity-90">Baksoft · Özelleştirilebilir Tasarım No:1 </span>
            <span className="opacity-80">
              Edition • <b>Concept</b>
            </span>
          </div>
        </div>

        {/* Header */}
        <header
          className="sticky top-0 z-30 border-b backdrop-blur"
          style={{
            background: 'color-mix(in oklab, var(--bg) 92%, transparent)',
            borderColor: 'rgb(0 0 0 / 0.10)',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
            {/* Logo + Marka */}
            <a href="/paketler" className="flex items-center gap-3">
              <div
                className="h-8 w-8 rounded-lg"
                style={{
                  background:
                    'conic-gradient(from 140deg, var(--accent), var(--soft), var(--accent))',
                }}
              />
              <div className="font-serif text-lg font-semibold tracking-tight">Baksoft Tasarım</div>
            </a>

            {/* Menü */}
            <nav className="hidden md:flex ml-6 gap-6 text-sm opacity-80">
              <a href="#mosaic" className="hover:opacity-100">
                Projeler
              </a>
              <a href="#materials" className="hover:opacity-100">
                Malzemeler
              </a>
              <a href="#beforeafter" className="hover:opacity-100">
                Önce/Sonra
              </a>
              <a href="#process" className="hover:opacity-100">
                Süreç
              </a>
              <a href="#budget" className="hover:opacity-100">
                Budget
              </a>
            </nav>

            {/* Style selector */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs opacity-70">Stil:</span>
              <div
                className="rounded-xl border p-1 flex gap-1"
                style={{
                  borderColor: 'rgb(0 0 0 / 0.15)',
                  background: 'color-mix(in oklab, var(--soft) 60%, transparent)',
                }}
              >
                {PRESETS.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setStyle(p.key)}
                    className="px-3 h-8 rounded-lg text-sm"
                    style={{
                      color: style === p.key ? 'var(--bg)' : 'rgb(0 0 0 / 0.80)',
                      background: style === p.key ? 'var(--accent)' : 'transparent',
                      border:
                        style === p.key
                          ? '1px solid rgb(0 0 0 / 0.10)'
                          : '1px solid transparent',
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* HERO  —— H1 burada */}
        <section
          className={`relative overflow-hidden ${active.textureClass}`}
          style={{
            background:
              'linear-gradient(180deg, var(--bg), color-mix(in oklab, var(--soft) 55%, var(--bg)))',
          }}
        >
          {/* blueprint grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
              backgroundSize: '48px 48px, 48px 48px',
              maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
              opacity: 0.06,
            }}
          />
          <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-6">
              <span
                className="inline-block text-[11px] uppercase tracking-[0.2em] rounded px-2 py-1"
                style={{ color: 'var(--bg)', background: 'rgb(0 0 0)' }}
              >
                İç Mimarlık · Kurgu odaklı
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-serif leading-[1.05]">
                Paket 1 — İç Mimarlık Web Sitesi
              </h1>
              <p className="mt-4 text-lg opacity-80 max-w-2xl">
                Işık, oran, doku ve akış. Konutu, ofisi ve sosyal alanları markanın diliyle birleştiren{' '}
                <strong>Atelier Aure</strong> yaklaşımı.
              </p>

              {/* H3 alt başlık: Günışığı */}
              <h3 className="mt-6 text-base font-semibold opacity-80">Günışığı Ayarı</h3>
              <div className="mt-2">
                <label className="text-xs opacity-70">Günışığı · {daylight}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={daylight}
                  onChange={(e) => setDaylight(Number(e.target.value))}
                  className="w-full mt-2"
                />
              </div>
            </div>

            <div className="md:col-span-6">
              <HeroCollage srcs={active.collage} daylight={daylight} />
            </div>
          </div>
        </section>

        {/* ================= Proje Mozaiği + Case Reader ================= */}
        <section id="mosaic" className="mx-auto max-w-7xl px-4 py-14" style={paletteBg}>
          <h2 className="text-3xl font-semibold font-serif">Proje Mozaiği</h2>
          <p className="opacity-80 mt-1">
            Asimetrik grid; hover’da çizim/spec, tıklayınca inline okuma.
          </p>

          <div className="mt-4">
            <label className="text-xs opacity-70 mr-2">Filtre:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="h-10 rounded-xl border px-3"
              style={{
                borderColor: 'rgb(0 0 0 / 0.15)',
                background: 'color-mix(in oklab, var(--soft) 60%, transparent)',
              }}
            >
              {(
                ['All', 'Residential', 'Office', 'Retail', 'Hospitality', 'Healthcare'] as const
              ).map((p) => (
                <option key={p} value={p}>
                  {p === 'All' ? 'Tümü' : p}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-4">
            {PROJECTS.filter((pr) => (filter === 'All' ? true : pr.type === filter)).map(
              (pr, idx) => (
                <article
                  key={pr.id}
                  className={`group relative overflow-hidden rounded-2xl border`}
                  style={{
                    borderColor: 'rgb(0 0 0 / 0.12)',
                    background: 'color-mix(in oklab, var(--soft) 35%, transparent)',
                  }}
                >
                  <div
                    className={`${
                      idx % 5 === 0
                        ? 'col-span-12 md:col-span-8 row-span-2'
                        : idx % 3 === 0
                        ? 'col-span-12 md:col-span-4'
                        : 'col-span-12 md:col-span-6'
                    } col-span-12`}
                  >
                    <ImgSafe
                      src={pr.cover}
                      alt={pr.title}
                      className="w-full aspect-[16/10] md:aspect-[4/3] object-cover group-hover:scale-[1.02] transition"
                    />
                  </div>
                  {/* overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[rgba(0,0,0,0.35)] to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="absolute left-3 bottom-3 right-3 flex items-end justify-between gap-3">
                    <div>
                      <div className="text-white text-lg font-semibold drop-shadow">{pr.title}</div>
                      <div className="text-white/80 text-xs">
                        {pr.location} · {pr.year} · {pr.area} m²
                      </div>
                    </div>
                    <div className="hidden sm:flex gap-2">
                      <span className="px-2 py-1 rounded-lg text-[11px] bg-white/90">Spec</span>
                      <span className="px-2 py-1 rounded-lg text-[11px] bg-white/90">{pr.type}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveCase(pr)}
                    className="absolute inset-0"
                    aria-label={`Aç: ${pr.title}`}
                  />
                </article>
              )
            )}
          </div>

          {/* Inline Case Reader */}
          {activeCase && (
            <div
              className="mt-8 rounded-2xl border overflow-hidden"
              style={{
                borderColor: 'rgb(0 0 0 / 0.12)',
                background: 'color-mix(in oklab, var(--soft) 35%, transparent)',
              }}
            >
              <div
                className="flex items-center justify-between px-4 h-12 border-b"
                style={{ borderColor: 'rgb(0 0 0 / 0.12)' }}
              >
                <div className="font-medium">
                  {activeCase.title} — <span className="opacity-70">{activeCase.type}</span>
                </div>
                <button
                  onClick={() => setActiveCase(null)}
                  className="text-sm px-3 py-1.5 rounded-lg border hover:opacity-100"
                  style={{ borderColor: 'rgb(0 0 0 / 0.15)' }}
                >
                  Kapat
                </button>
              </div>

              <div className="p-5 grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <ImgSafe
                    src={activeCase.photos[0]}
                    alt={activeCase.title}
                    className="w-full aspect-[16/9] object-cover rounded-xl"
                  />
                  <p className="mt-4 text-lg opacity-90">{activeCase.blurb}</p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {activeCase.photos.slice(1).map((ph, i) => (
                      <ImgSafe
                        key={i}
                        src={ph}
                        alt={`${activeCase.title} ${i}`}
                        className="w-full aspect-[4/3] object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>
                <aside className="lg:col-span-5">
                  <div
                    className="rounded-xl border p-4"
                    style={{
                      borderColor: 'rgb(0 0 0 / 0.12)',
                      background: 'var(--bg)',
                    }}
                  >
                    <div className="text-sm opacity-70">Proje Bilgileri</div>
                    <div className="mt-2 grid grid-cols-2 gap-y-2 text-sm">
                      <Spec label="Program" value={activeCase.specs.program} />
                      <Spec label="Durum" value={activeCase.specs.status} />
                      <Spec label="Müşteri" value={activeCase.specs.client} />
                      <Spec label="Konum" value={activeCase.location} />
                      <Spec label="Yıl" value={String(activeCase.year)} />
                      <Spec label="Alan" value={`${activeCase.area} m²`} />
                    </div>
                  </div>
                  <div
                    className="mt-4 rounded-xl border p-4"
                    style={{
                      borderColor: 'rgb(0 0 0 / 0.12)',
                      background: 'var(--bg)',
                    }}
                  >
                    <div className="text-sm opacity-70 mb-2">Kullanılan Malzemeler</div>
                    <div className="grid grid-cols-4 gap-2">
                      {activeCase.materials.map((m) => {
                        const sw = MATERIALS.find((x) => x.n === m)!;
                        return (
                          <div key={m} className="text-center">
                            <div
                              className="h-12 rounded-lg border"
                              style={{
                                background: sw.c,
                                borderColor: 'rgb(0 0 0 / 0.10)',
                              }}
                            />
                            <div className="mt-1 text-xs">{m}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </section>

        {/* ================= Malzeme Kütüphanesi + Kombin ================= */}
        <section id="materials" className="mx-auto max-w-7xl px-4 py-14" style={paletteBg}>
          <h2 className="text-3xl font-semibold font-serif">Malzeme Kütüphanesi</h2>
          <p className="opacity-80 mt-1">
            En fazla 3 swatch seç; algoritma Base/Accent/Metal rol önerisi yapsın.
          </p>

          <div className="mt-5 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MATERIALS.map((m) => {
              const active = picked.includes(m.n);
              return (
                <button
                  key={m.n}
                  onClick={() => {
                    setPicked((prev) =>
                      active ? prev.filter((x) => x !== m.n) : prev.length >= 3 ? prev : [...prev, m.n]
                    );
                  }}
                  className="rounded-2xl p-3 border text-left"
                  style={{
                    borderColor: active ? 'var(--accent)' : 'rgb(0 0 0 / 0.12)',
                    background: active
                      ? 'color-mix(in oklab, var(--soft) 55%, transparent)'
                      : 'var(--bg)',
                  }}
                >
                  <div
                    className="h-16 w-full rounded-xl border"
                    style={{ background: m.c, borderColor: 'rgb(0 0 0 / 0.10)' }}
                  />
                  <div className="mt-2 font-medium">{m.n}</div>
                  <div className="text-xs opacity-70">{m.cat}</div>
                </button>
              );
            })}
          </div>

          {/* Combo Suggestion */}
          <div className="mt-6">
            <ComboSuggestion picks={pickedSwatches} />
          </div>
        </section>

        {/* ================= Before / After ================= */}
        <section id="beforeafter" className="mx-auto max-w-7xl px-4 py-14" style={paletteBg}>
          <h2 className="text-3xl font-semibold font-serif">Önce / Sonra</h2>
          <p className="opacity-80 mt-1">Inline slider; modal yok, tek hareketle farkı görün.</p>
          <div className="mt-5 grid md:grid-cols-2 gap-6">
            <BeforeAfter
              before="/mimarlik/mimarlik-oncesi.webp"
              after="/mimarlik/mimarlik-sonrasi.webp"
            />
            <BeforeAfter
              before="/mimarlik/mimarlik-oncesi.webp"
              after="/mimarlik/mimarlik-sonrasi.webp"
            />
          </div>
        </section>

        {/* ================= Process Timeline ================= */}
        <section id="process" className="mx-auto max-w-7xl px-4 py-14" style={paletteBg}>
          <h2 className="text-3xl font-semibold font-serif">Süreç</h2>
          <p className="opacity-80 mt-1">Keşif → Tasarım → Uygulama — yalın, anlaşılır akış.</p>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {[
              ['Keşif', 'İhtiyaç analizi, davranış ve ışık okuması; brief netleştirme.'],
              ['Tasarım', 'Plan, 3D konsept, malzeme seti ve aydınlatma senaryosu.'],
              ['Uygulama', 'Detay çizimleri, metraj, şantiye koordinasyonu ve teslim.'],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="rounded-2xl p-5 border relative"
                style={{
                  borderColor: 'rgb(0 0 0 / 0.12)',
                  background: 'color-mix(in oklab, var(--soft) 40%, transparent)',
                }}
              >
                <span
                  className="absolute -top-3 left-4 h-6 w-6 rounded-full grid place-items-center text-sm"
                  style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                >
                  {i + 1}
                </span>
                <div className="font-medium">{t}</div>
                <div className="text-sm opacity-80 mt-1">{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= Space Budget Estimator ================= */}
        <section id="budget" className="mx-auto max-w-7xl px-4 py-14" style={paletteBg}>
          <h2 className="text-3xl font-semibold font-serif">Space Budget — Mini</h2>
          <p className="opacity-80 mt-1">
            Hızlı tahmin: m² × program × kalite. Tamamen demonstratif.
          </p>

          <div className="mt-5 grid lg:grid-cols-12 gap-6">
            <div
              className="lg:col-span-5 rounded-2xl p-5 border"
              style={{
                borderColor: 'rgb(0 0 0 / 0.12)',
                background: 'color-mix(in oklab, var(--soft) 40%, transparent)',
              }}
            >
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs opacity-70">Alan (m²)</div>
                  <input
                    type="number"
                    min={20}
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value) || 0)}
                    className="mt-1 w-full h-10 rounded-xl border px-3"
                    style={{
                      borderColor: 'rgb(0 0 0 / 0.15)',
                      background: 'var(--bg)',
                    }}
                  />
                </div>
                <div>
                  <div className="text-xs opacity-70">Program</div>
                  <select
                    value={prog}
                    onChange={(e) => setProg(e.target.value as Program)}
                    className="mt-1 w-full h-10 rounded-xl border px-3"
                    style={{
                      borderColor: 'rgb(0 0 0 / 0.15)',
                      background: 'var(--bg)',
                    }}
                  >
                    {(
                      ['Residential', 'Office', 'Retail', 'Hospitality', 'Healthcare'] as const
                    ).map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <div className="text-xs opacity-70">Kalite</div>
                  <div className="mt-1 flex gap-2">
                    {(['Standard', 'Premium', 'Luxury'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className="h-10 px-3 rounded-xl border text-sm"
                        style={{
                          borderColor:
                            quality === q ? 'var(--accent)' : 'rgb(0 0 0 / 0.15)',
                          background:
                            quality === q
                              ? 'color-mix(in oklab, var(--soft) 55%, transparent)'
                              : 'var(--bg)',
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <BudgetCard className="lg:col-span-7" area={area} program={prog} quality={quality} />
          </div>
        </section>

        <footer
          className="border-t"
          style={{
            borderColor: 'rgb(0 0 0 / 0.12)',
            background: 'color-mix(in oklab, var(--soft) 55%, var(--bg))',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between text-sm opacity-80">
            <span>© {new Date().getFullYear()} Atelier Aure</span>
            <span className="font-serif">Görsel deneyim odaklı demo</span>
          </div>
        </footer>

        <style jsx global>{`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </main>
    </>
  );
}

/* ============================ Components ============================ */

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs opacity-70">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function HeroCollage({ srcs, daylight }: { srcs: string[]; daylight: number }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <ImgSafe
            src={srcs[0]}
            alt="kolaj-1"
            className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md"
          />
        </div>
        <div className="col-span-2 self-end">
          <ImgSafe
            src={srcs[1]}
            alt="kolaj-2"
            className="w-full aspect-[3/4] object-cover rounded-2xl shadow-md"
          />
        </div>
        <div className="col-span-3 -mt-8">
          <ImgSafe
            src={srcs[2]}
            alt="kolaj-3"
            className="w-full aspect-[16/10] object-cover rounded-2xl shadow-md"
          />
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          mixBlendMode: 'multiply',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(0,0,0,0.25))',
          opacity: (100 - daylight) / 130,
        }}
      />
    </div>
  );
}

/* --- Safe image with graceful fallback --- */
function ImgSafe({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{
          background:
            'repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 10px, rgba(0,0,0,0.06) 10px 20px)',
        }}
        aria-label={alt}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 40% at 10% 0%, color-mix(in oklab, var(--accent) 15%, transparent), transparent)',
          }}
        />
      </div>
    );
  }
return (
  <div className={`relative ${className || ""}`}>
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      className="object-cover"
      onError={() => setOk(false)}
    />
  </div>
);

}

/* --- Combo Suggestion --- */
function ComboSuggestion({
  picks,
}: {
  picks: { n: string; c: string; cat: string }[];
}) {
  if (!picks.length) {
    return (
      <div
        className="rounded-2xl p-5 border text-sm"
        style={{
          borderColor: 'rgb(0 0 0 / 0.12)',
          background: 'color-mix(in oklab, var(--soft) 45%, transparent)',
        }}
      >
        En fazla <b>3</b> malzeme seçin. Örneğin <i>Oak + Travertine + Brass</i>.
      </div>
    );
  }

  const roles = computeRoles(picks);
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {(['Base', 'Accent', 'Metal'] as const).map((r) => {
        const sw = roles[r];
        return (
          <div
            key={r}
            className="rounded-2xl p-4 border"
            style={{
              borderColor: 'rgb(0 0 0 / 0.12)',
              background: 'var(--bg)',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-14 w-14 rounded-xl border"
                style={{
                  background: sw?.c ?? 'transparent',
                  borderColor: 'rgb(0 0 0 / 0.10)',
                }}
              />
              <div>
                <div className="font-semibold">{r}</div>
                <div className="text-sm opacity-70">
                  {sw ? `${sw.n} · ${sw.cat}` : '—'}
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm opacity-80">{roleTip(r)}</p>
          </div>
        );
      })}
    </div>
  );
}

function roleTip(r: 'Base' | 'Accent' | 'Metal') {
  if (r === 'Base')
    return 'Zemin/duvar gibi geniş yüzeyler: sakin ve zamansız tonlar.';
  if (r === 'Accent') return 'Bir duvar, niş, tekstil; odak noktası için canlılık.';
  return 'Armatür, kulp, detay profilleri; parıltı ile denge.';
}

function computeRoles(picks: { n: string; c: string; cat: string }[]) {
  // basit yaklaşım: en açık ton -> Base, en sıcak/yoğun -> Accent, metal/graphite -> Metal
  const metal =
    picks.find((p) => p.cat === 'Metal') ||
    picks.find((p) => p.n.includes('Graphite'));
  const byLum = [...picks].sort(
    (a, b) => luminance(hexToRgb(a.c)) - luminance(hexToRgb(b.c))
  );
  const base = byLum[byLum.length - 1]; // daha açık
  const accent =
    picks.find(
      (p) =>
        p.cat === 'Paint' ||
        p.cat === 'Textile' ||
        (p.cat === 'Wood' && p !== base)
    ) || byLum[0];
  return { Base: base, Accent: accent, Metal: metal };
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const b = parseInt(
    h.length === 3 ? h.split('').map((x) => x + x).join('') : h,
    16
  );
  return { r: (b >> 16) & 255, g: (b >> 8) & 255, b: b & 255 };
}
function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

/* --- Before/After Slider --- */
function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [v, setV] = useState(50);
  return (
    <div
      className="relative rounded-2xl overflow-hidden border"
      style={{ borderColor: 'rgb(0 0 0 / 0.12)', background: 'var(--bg)' }}
    >
      <div className="relative">
        <ImgSafe src={after} alt="Sonra" className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
          <ImgSafe src={before} alt="Önce" className="w-full aspect-[16/9] object-cover" />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${v}%` }}>
          <div className="w-[2px] h-full bg-white/80 shadow" />
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white grid place-items-center shadow">
            ↔
          </div>
        </div>
        <span className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-slate-900/80 text-white">
          Önce
        </span>
        <span className="absolute right-3 top-3 text-[11px] px-2 py-1 rounded-full bg-emerald-600 text-white">
          Sonra
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={v}
        onChange={(e) => setV(Number(e.target.value))}
        className="w-full accent-current"
      />
    </div>
  );
}

/* --- Budget Card --- */
function BudgetCard({
  className,
  area,
  program,
  quality,
}: {
  className?: string;
  area: number;
  program: Program;
  quality: Quality;
}) {
  const unit = unitCost(program, quality);
  const subtotal = Math.max(0, Math.round(unit * area));
  const parts = splitCost(subtotal, program);
  return (
    <div
      className={`${className || ''} rounded-2xl p-5 border`}
      style={{
        borderColor: 'rgb(0 0 0 / 0.12)',
        background: 'color-mix(in oklab, var(--soft) 40%, transparent)',
      }}
    >
      <div className="grid md:grid-cols-2 gap-4 items-start">
        <div>
          <div className="text-sm opacity-70">Birim Maliyet (tahmini)</div>
          <div className="text-2xl font-extrabold">
            ₺{unit.toLocaleString('tr-TR')}
          </div>
          <div className="text-sm opacity-70 mt-1">
            {program} · {quality}
          </div>
        </div>
        <div>
          <div className="text-sm opacity-70">Toplam</div>
          <div className="text-3xl font-extrabold">
            ₺{subtotal.toLocaleString('tr-TR')}
          </div>
          <div className="text-xs opacity-70 mt-1">
            * Tamamen demo amaçlıdır; piyasaya göre değişir.
          </div>
        </div>
      </div>

      {/* breakdown */}
      <div className="mt-5">
        <div className="text-sm opacity-70 mb-2">Dağılım (yaklaşık)</div>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          {parts.map((p) => (
            <div
              key={p.label}
              className="rounded-xl p-3 border"
              style={{ borderColor: 'rgb(0 0 0 / 0.12)', background: 'var(--bg)' }}
            >
              <div className="font-medium">{p.label}</div>
              <div className="text-lg font-extrabold">
                ₺{p.value.toLocaleString('tr-TR')}
              </div>
              <div className="text-xs opacity-70">{p.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function unitCost(p: Program, q: Quality) {
  // kaba demo değerler (₺/m²)
  const base: Record<Program, number> = {
    Residential: 17000,
    Office: 14000,
    Retail: 16000,
    Hospitality: 19000,
    Healthcare: 20000,
  };
  const mult: Record<Quality, number> = { Standard: 1, Premium: 1.25, Luxury: 1.6 };
  return Math.round(base[p] * mult[q]);
}
function splitCost(total: number, p: Program) {
  // programa göre dağılım yüzdeleri
  const share = {
    Residential: { Design: 10, Construction: 70, FF_E: 20 },
    Office: { Design: 12, Construction: 63, FF_E: 25 },
    Retail: { Design: 12, Construction: 58, FF_E: 30 },
    Hospitality: { Design: 14, Construction: 56, FF_E: 30 },
    Healthcare: { Design: 15, Construction: 60, FF_E: 25 },
  }[p];
  return (Object.entries(share) as Array<[string, number]>).map(([k, pct]) => ({
    label: k.replace('_', '&'),
    pct,
    value: Math.round((total * pct) / 100),
  }));
}
