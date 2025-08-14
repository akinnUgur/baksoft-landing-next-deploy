'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';

/**
 * Paket17 · Beauty/Aesthetics — FULL (tek dosya)
 * - Editorial hero + Mood/Style switcher (Glow / Botanical / Noir)
 * - Ritüeller & Paketler (kategori & etiket filtreleri, arama, sıralama)
 * - Inline Ritüel Detayı (drawer yok, sayfa içinde genişleyen kart)
 * - Before/After slider (2 örnek)
 * - Glow Club (üyelik planları, faydalar, seans sayacı, referans/voucher mock)
 * - Tüm img'lerde ImgSafe fallback (görsel bozulsa da UI kırılmaz)
 *
 * Görseller: /public/merkez/merkez-1..5.webp (yerel)
 */

/* ============================ Types ============================ */
type StyleKey = 'Glow' | 'Botanical' | 'Noir';

type StylePreset = {
  key: StyleKey;
  name: string;
  palette: { bg: string; ink: string; accent: string; soft: string };
  collage: string[];
  textureClass: string;
};

type Category = 'Cilt' | 'Vücut' | 'Işık';

type Ritual = {
  id: string;
  name: string;
  cat: Category;
  tags: string[];
  minutes: number;
  price: number; // TL
  desc: string;
  image?: string;
};

type Plan = {
  id: string;
  name: string;
  monthly: number;
  perks: string[];
  color: string; // for accent ring/bg
};

/* ============================ Local image pool ============================ */
const LOCAL_IMG = [
  '/merkez/merkez-1.webp',
  '/merkez/merkez-2.webp',
  '/merkez/merkez-3.webp',
  '/merkez/merkez-4.webp',
  '/merkez/merkez-5.webp',
];
const pick = (i: number) => LOCAL_IMG[i % LOCAL_IMG.length];

/* ============================ Data ============================ */
const PRESETS: StylePreset[] = [
  {
    key: 'Glow',
    name: 'Glow',
    palette: { bg: '#fbf7f6', ink: '#0b1220', accent: '#b55f74', soft: '#f1e5e7' },
    collage: [pick(0), pick(1), pick(2)],
    textureClass:
      'bg-[radial-gradient(60%_40%_at_12%_0%,rgba(212,154,166,0.12),transparent),radial-gradient(40%_30%_at_100%_0%,rgba(42,42,42,0.06),transparent)]',
  },
  {
    key: 'Botanical',
    name: 'Botanical',
    palette: { bg: '#f6faf7', ink: '#0b1e14', accent: '#4d8a71', soft: '#e6f0ea' },
    collage: [pick(2), pick(3), pick(4)],
    textureClass:
      'bg-[radial-gradient(60%_40%_at_10%_0%,rgba(115,165,139,0.12),transparent),radial-gradient(40%_30%_at_100%_0%,rgba(18,32,24,0.06),transparent)]',
  },
  {
    key: 'Noir',
    name: 'Noir',
    palette: { bg: '#101012', ink: '#f2f2f4', accent: '#c1a16b', soft: '#1a1b1e' },
    collage: [pick(4), pick(0), pick(3)],
    textureClass:
      'bg-[radial-gradient(60%_40%_at_15%_0%,rgba(193,161,107,0.14),transparent),radial-gradient(40%_30%_at_100%_0%,rgba(242,242,244,0.05),transparent)]',
  },
];

const RITUALS: Ritual[] = [
  {
    id: 'r-glow',
    name: 'Signature Glow',
    cat: 'Cilt',
    tags: ['Hassas', 'Anti-Aging'],
    minutes: 60,
    price: 1550,
    desc: 'Enzim peeling + LED ışık + hyaluronik maske. Cildi yatıştırıp parlaklık verir.',
    image: pick(0),
  },
  {
    id: 'r-detox',
    name: 'Botanical Detox',
    cat: 'Cilt',
    tags: ['Detox', 'Hamile Uygun'],
    minutes: 50,
    price: 1350,
    desc: 'Bitkisel özlerle arındırıcı masaj ve maske. Koku profili hafif ve rahatlatıcı.',
    image: pick(2),
  },
  {
    id: 'r-lift',
    name: 'Sculpt & Lift',
    cat: 'Cilt',
    tags: ['Medikal', 'Anti-Aging'],
    minutes: 75,
    price: 1950,
    desc: 'Mikro akım ve manuel lifting ile kontür belirginliği. Boyun/dekolte dahil.',
    image: pick(2),
  },
  {
    id: 'r-aroma',
    name: 'Aroma Body Flow',
    cat: 'Vücut',
    tags: ['Detox'],
    minutes: 60,
    price: 1290,
    desc: 'Sirkülasyonu artıran aroma yağlarıyla bütünsel vücut masajı. Ritmik ve dingin.',
    image: pick(3),
  },
  {
    id: 'r-silk',
    name: 'Silk Body Polish',
    cat: 'Vücut',
    tags: ['Hassas'],
    minutes: 45,
    price: 1150,
    desc: 'Nazik vücut peelingi + nem maskesi. İpek hissi, pürüzsüz dokunuş.',
    image: pick(4),
  },
  {
    id: 'r-led',
    name: 'LED Light Therapy',
    cat: 'Işık',
    tags: ['Medikal'],
    minutes: 25,
    price: 700,
    desc: 'Kırmızı/mavi LED dalga boylarıyla kollajen uyarımı ve arındırma. Cilt bakımına eklenti.',
    image: pick(1),
  },
];

const PLANS: Plan[] = [
  { id: 'basic', name: 'Glow Basic', monthly: 490, perks: ['Aylık 1 LED seansı', 'Ritüellerde %10', 'Doğum günü mini set'], color: '#d49aa6' },
  { id: 'pro', name: 'Glow Pro', monthly: 890, perks: ['Aylık 1 Signature Glow', 'LED sınırsız', 'Ritüellerde %15', 'Öncelikli slot'], color: '#73a58b' },
  { id: 'elite', name: 'Glow Elite', monthly: 1490, perks: ['Aylık 2 ileri ritüel', 'VIP oda', 'Ritüellerde %20', 'Arkadaşına 2 hediye kupon'], color: '#c1a16b' },
];

/* ============================ Helpers ============================ */
const TL = (n: number) => `₺${n.toLocaleString('tr-TR')}`;

/* ============================ Page ============================ */
export default function Paket17BeautyClient() {
  // Style / ambience
  const [style, setStyle] = useState<StyleKey>('Glow');
  const [ambience, setAmbience] = useState(70);
  const active = useMemo(() => PRESETS.find((p) => p.key === style)!, [style]);

  const cssVars = {
    ['--bg' as any]: active.palette.bg,
    ['--ink' as any]: active.palette.ink,
    ['--accent' as any]: active.palette.accent,
    ['--soft' as any]: active.palette.soft,
  } as any;

  // Ritual filters
  const [cat, setCat] = useState<Category | 'Tümü'>('Tümü');
  // const TAGS = ['Hassas', 'Hamile Uygun', 'Medikal', 'Anti-Aging', 'Detox'];
  const [onTags, setOnTags] = useState<string[]>([]);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'pop' | 'asc' | 'desc' | 'time'>('pop');
  const [openRitual, setOpenRitual] = useState<Ritual | null>(null);

  const filtered = useMemo(() => {
    let arr = RITUALS.slice();
    if (cat !== 'Tümü') arr = arr.filter((r) => r.cat === cat);
    if (onTags.length) arr = arr.filter((r) => onTags.every((t) => r.tags.includes(t)));
    if (q.trim()) arr = arr.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
    switch (sort) {
      case 'asc':
        arr.sort((a, b) => a.price - b.price);
        break;
      case 'desc':
        arr.sort((a, b) => b.price - a.price);
        break;
      case 'time':
        arr.sort((a, b) => a.minutes - b.minutes);
        break;
      default:
        arr.sort((a, b) => b.price - a.price);
    }
    return arr;
  }, [cat, onTags, q, sort]);

  // Glow Club state (demo)
  const [planId, setPlanId] = useState<string>('pro');
  const [sessions, setSessions] = useState(0); // alınan seans sayısı
  const [voucher, setVoucher] = useState<string>('');

  const paletteBg = { background: 'var(--bg)', color: 'var(--ink)' } as const;

  return (
    <main
      className="min-h-[100dvh]"
      style={{ ...cssVars, background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      {/* Top strip */}
      <div className="text-xs" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span>Baksoft · Özelleştirilebilir Tasarım No:4</span>
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
          borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-4">
          {/* Logo + Marka */}
          <a href="/paketler" className="flex items-center gap-3">
            <Image src="/baksoftLogo.png" alt="Baksoft Logo" width={32} height={32} className="object-contain" />
            <div className="font-serif text-lg font-semibold tracking-tight">Baksoft Tasarım</div>
          </a>

          {/* Menü */}
          <nav className="hidden md:flex ml-6 gap-6 text-sm opacity-80">
            <a href="#editorial" className="hover:opacity-100">Editoryal</a>
            <a href="#rituals" className="hover:opacity-100">Ritüeller</a>
            <a href="#beforeafter" className="hover:opacity-100">Önce/Sonra</a>
            <a href="#club" className="hover:opacity-100">Glow Club</a>
          </nav>

          {/* Style selector */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs opacity-70">Stil:</span>
            <div
              className="rounded-xl border p-1 flex gap-1"
              style={{
                borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)',
                background: 'color-mix(in oklab, var(--soft) 60%, transparent)',
              }}
            >
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setStyle(p.key)}
                  className="px-3 h-8 rounded-lg text-sm"
                  style={{
                    color: style === p.key ? (p.key === 'Noir' ? '#101012' : '#111827') : 'color-mix(in oklab, var(--ink) 90%, transparent)',
                    background: style === p.key ? 'var(--accent)' : 'transparent',
                    border: style === p.key ? '1px solid color-mix(in oklab, var(--ink) 10%, transparent)' : '1px solid transparent',
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* HERO · Editorial */}
      <section
        id="editorial"
        className={`relative overflow-hidden ${active.textureClass}`}
        style={{ background: 'linear-gradient(180deg, var(--bg), color-mix(in oklab, var(--soft) 55%, var(--bg)))' }}
      >
        {/* grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            opacity: 0.05,
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-start">
          {/* Text */}
          <div className="md:col-span-6">
            <span
              className="inline-block text-[11px] uppercase tracking-[0.2em] rounded px-2 py-1"
              style={{ color: active.key === 'Noir' ? '#101012' : 'var(--bg)', background: 'var(--ink)' }}
            >
              Cilt · Işık · Ritim
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-serif leading-[1.05]">
              Işığı <em className="not-italic" style={{ color: 'var(--accent)' }}>cildin ritmine</em> uyarlıyoruz.
            </h1>
            <p className="mt-4 text-lg opacity-80 max-w-2xl">
              Klinik disiplinini spa dinginliğiyle birleştiren ritüeller: <strong>glow, detox, lift</strong>.
              Malzeme ve ışıkla sakin, zamansız bir dil.
            </p>

            {/* Principles */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              {[
                ['✺', 'Hassas Bakım'],
                ['≋', 'Denge'],
                ['⌁', 'Işık Senaryosu'],
                ['∞', 'Sürdürülebilir'],
              ].map(([i, t]) => (
                <div
                  key={t}
                  className="rounded-xl px-3 py-2 border"
                  style={{
                    borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)',
                    background: 'color-mix(in oklab, var(--soft) 40%, transparent)',
                  }}
                >
                  <span className="text-base mr-2">{i}</span>
                  <span className="opacity-80">{t}</span>
                </div>
              ))}
            </div>

            {/* Ambience dial */}
            <div className="mt-6">
              <label className="text-xs opacity-70">Ambiyans · {ambience}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={ambience}
                onChange={(e) => setAmbience(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>

          {/* Collage */}
          <div className="md:col-span-6">
            <HeroCollage srcs={active.collage} ambience={ambience} />
          </div>
        </div>
      </section>

      {/* ================= Ritüeller & Paketler ================= */}
      <section id="rituals" className="mx-auto max-w-7xl px-4 py-14" style={paletteBg}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold font-serif">Ritüeller & Paketler</h2>
            <p className="opacity-80 mt-1">Kategori ve etikete göre keşfet; kart içinde detay açılır.</p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ara: glow, detox…"
              className="h-10 rounded-xl border px-3 text-sm"
              style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)', background: 'var(--bg)' }}
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="h-10 rounded-xl border px-3 text-sm"
              style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)', background: 'color-mix(in oklab, var(--soft) 60%, transparent)' }}
            >
              <option value="pop">Popüler</option>
              <option value="asc">Fiyat (Artan)</option>
              <option value="desc">Fiyat (Azalan)</option>
              <option value="time">Süre</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          {(['Tümü', 'Cilt', 'Vücut', 'Işık'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="px-3 h-9 rounded-xl border"
              style={{
                borderColor: cat === c ? 'var(--accent)' : 'color-mix(in oklab, var(--ink) 15%, transparent)',
                background: cat === c ? 'color-mix(in oklab, var(--soft) 55%, transparent)' : 'var(--bg)',
              }}
            >
              {c}
            </button>
          ))}
          <span className="ml-2 text-xs opacity-60">Etiket:</span>
          {['Hassas', 'Hamile Uygun', 'Medikal', 'Anti-Aging', 'Detox'].map((t) => {
            const on = onTags.includes(t);
            return (
              <button
                key={t}
                onClick={() => setOnTags((prev) => (on ? prev.filter((x) => x !== t) : [...prev, t]))}
                className="px-3 h-9 rounded-xl border"
                style={{
                  borderColor: on ? 'var(--accent)' : 'color-mix(in oklab, var(--ink) 15%, transparent)',
                  background: on ? 'color-mix(in oklab, var(--soft) 55%, transparent)' : 'var(--bg)',
                }}
              >
                {t}
              </button>
            );
          })}
          {(onTags.length > 0 || cat !== 'Tümü' || q) && (
            <button
              onClick={() => {
                setOnTags([]);
                setCat('Tümü');
                setQ('');
                setSort('pop');
              }}
              className="ml-auto px-3 h-9 rounded-xl border text-sm"
              style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)' }}
            >
              Sıfırla
            </button>
          )}
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => (
            <article
              key={r.id}
              className="group rounded-2xl border overflow-hidden"
              style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'var(--bg)' }}
            >
              <div className="relative">
                <ImgSafe src={r.image} alt={r.name} className="w-full aspect-[16/10] object-cover group-hover:scale-[1.01] transition" />
                <span className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-white/90">
                  {r.cat}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold leading-tight">{r.name}</h3>
                    <div className="mt-1 text-xs opacity-70">{r.minutes} dk</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-70">Fiyat</div>
                    <div className="font-extrabold">{TL(r.price)}</div>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded-full text-[11px] border"
                      style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'color-mix(in oklab, var(--soft) 40%, transparent)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setOpenRitual((o) => (o?.id === r.id ? null : r))}
                  className="mt-4 w-full h-10 rounded-xl border text-sm hover:opacity-100"
                  style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)', background: 'color-mix(in oklab, var(--soft) 45%, transparent)' }}
                >
                  {openRitual?.id === r.id ? 'Kapat' : 'İçeriği Gör'}
                </button>

                {/* Inline detail */}
                {openRitual?.id === r.id && (
                  <div
                    className="mt-4 rounded-xl border p-3 text-sm"
                    style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'color-mix(in oklab, var(--soft) 40%, transparent)' }}
                  >
                    <div className="opacity-80">{r.desc}</div>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                      <div className="rounded-lg border p-2" style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)' }}>
                        Süre: <b>{r.minutes} dk</b>
                      </div>
                      <div className="rounded-lg border p-2" style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)' }}>
                        Öneri: <b>Ayda 1</b>
                      </div>
                      <div className="rounded-lg border p-2" style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)' }}>
                        Uygunluk: <b>{r.tags.includes('Hamile Uygun') ? 'Hamile uygun' : 'Genel'}</b>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {!filtered.length && (
          <div
            className="mt-10 rounded-2xl border p-8 text-center text-sm opacity-80"
            style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'var(--bg)' }}
          >
            Sonuç yok. Filtreleri gevşetmeyi deneyin.
          </div>
        )}
      </section>

      {/* ================= Before / After ================= */}
      <section id="beforeafter" className="mx-auto max-w-7xl px-4 py-14" style={paletteBg}>
        <h2 className="text-3xl font-semibold font-serif">Önce / Sonra</h2>
        <p className="opacity-80 mt-1">Inline slider; tek hareketle farkı görün.</p>
        <div className="mt-5 grid md:grid-cols-2 gap-6">
          <BeforeAfter before={pick(0)} after={pick(3)} />
          <BeforeAfter before={pick(2)} after={pick(4)} />
        </div>
      </section>

      {/* ================= Glow Club ================= */}
      <section id="club" className="mx-auto max-w-7xl px-4 py-14" style={paletteBg}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold font-serif">Glow Club</h2>
            <p className="opacity-80 mt-1">Üyelikle ayrıcalıklar: indirim, öncelikli slot, hediye kuponlar.</p>
          </div>
          <div className="shrink-0">
            <select
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
              className="h-10 rounded-xl border px-3 text-sm"
              style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)', background: 'var(--bg)' }}
            >
              {PLANS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-5">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} active={planId === p.id} onPick={() => setPlanId(p.id)} />
          ))}
        </div>

        {/* Member utilities (demo) */}
        <div className="mt-8 grid lg:grid-cols-12 gap-6">
          <div
            className="lg:col-span-5 rounded-2xl p-5 border"
            style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'color-mix(in oklab, var(--soft) 45%, transparent)' }}
          >
            <div className="text-sm opacity-70">Seans Sayacı</div>
            <ProgressWidget sessions={sessions} setSessions={setSessions} />
          </div>

          <div
            className="lg:col-span-7 rounded-2xl p-5 border"
            style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'color-mix(in oklab, var(--soft) 45%, transparent)' }}
          >
            <div className="text-sm opacity-70">Referans & Voucher</div>
            <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'var(--bg)' }}
              >
                <div className="font-medium">Referans Kodu</div>
                <div className="mt-1 text-xs opacity-70">Arkadaşın ilk ritüelde %15 indirime hak kazanır.</div>
                <div className="mt-3 flex items-center gap-2">
                  <code
                    className="px-3 h-10 rounded-xl border grid place-items-center"
                    style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)' }}
                  >
                    {voucher || '— — — — —'}
                  </code>
                  <button
                    onClick={() => setVoucher(genCode())}
                    className="h-10 px-3 rounded-xl border"
                    style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)', background: 'color-mix(in oklab, var(--soft) 50%, transparent)' }}
                  >
                    Kod Oluştur
                  </button>
                </div>
              </div>
              <div
                className="rounded-xl border p-4"
                style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'var(--bg)' }}
              >
                <div className="font-medium">Hediye Kuponu</div>
                <div className="mt-1 text-xs opacity-70">Seçili ritüellerde nakit yerine kupon kullanımı.</div>
                <div className="mt-3 flex items-center gap-2">
                  <input
                    placeholder="Kupon kodu"
                    className="h-10 flex-1 rounded-xl border px-3"
                    style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)' }}
                  />
                  <button
                    className="h-10 px-3 rounded-xl border"
                    style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)', background: 'color-mix(in oklab, var(--soft) 50%, transparent)' }}
                  >
                    Uygula
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="border-t"
        style={{
          borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)',
          background: 'color-mix(in oklab, var(--soft) 55%, var(--bg))',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between text-sm opacity-80">
          <span>© {new Date().getFullYear()} Lúmina Aesthetics</span>
          <span className="font-serif">Görsel deneyim odaklı demo</span>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}

/* ============================ Components ============================ */

function HeroCollage({ srcs, ambience }: { srcs: string[]; ambience: number }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <ImgSafe src={srcs[0]} alt="kolaj-1" className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md" />
        </div>
        <div className="col-span-2 self-end">
          <ImgSafe src={srcs[1]} alt="kolaj-2" className="w-full aspect-[3/4] object-cover rounded-2xl shadow-md" />
        </div>
        <div className="col-span-3 -mt-8">
          <ImgSafe src={srcs[2]} alt="kolaj-3" className="w-full aspect-[16/10] object-cover rounded-2xl shadow-md" />
        </div>
      </div>
      {/* ambience overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          mixBlendMode: 'multiply',
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(0,0,0,0.25))',
          opacity: (100 - ambience) / 130,
        }}
      />
    </div>
  );
}

/* Safe image with graceful fallback */
function ImgSafe({ src, alt, className }: { src?: string; alt: string; className?: string }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ background: 'repeating-linear-gradient(45deg, rgba(0,0,0,0.04) 0 10px, rgba(0,0,0,0.06) 10px 20px)' }}
        aria-label={alt}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(60% 40% at 10% 0%, color-mix(in oklab, var(--accent) 15%, transparent), transparent)' }}
        />
      </div>
    );
  }
  return <Image src={src} width={512} height={512} alt={alt} className={className} onError={() => setOk(false)} />;
}

/* Before/After Slider */
function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [v, setV] = useState(50);
  return (
    <div
      className="relative rounded-2xl overflow-hidden border"
      style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)', background: 'var(--bg)' }}
    >
      <div className="relative">
        <ImgSafe src={after} alt="Sonra" className="w-full aspect-[16/9] object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>
          <ImgSafe src={before} alt="Önce" className="w-full aspect-[16/9] object-cover" />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${v}%` }}>
          <div className="w-[2px] h-full bg-white/80 shadow" />
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white grid place-items-center shadow">↔</div>
        </div>
        <span className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-slate-900/80 text-white">Önce</span>
        <span className="absolute right-3 top-3 text-[11px] px-2 py-1 rounded-full bg-emerald-600 text-white">Sonra</span>
      </div>
      <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} className="w-full" />
    </div>
  );
}

/* Plan Card */
function PlanCard({ plan, active, onPick }: { plan: Plan; active: boolean; onPick: () => void }) {
  return (
    <div
      className="rounded-2xl p-5 border"
      style={{
        borderColor: active ? plan.color : 'color-mix(in oklab, var(--ink) 12%, transparent)',
        background: active ? 'color-mix(in oklab, var(--soft) 55%, transparent)' : 'var(--bg)',
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{plan.name}</div>
          <div className="text-3xl font-extrabold mt-1">
            {TL(plan.monthly)}
            <span className="text-sm opacity-70">/ay</span>
          </div>
        </div>
        <div className="h-8 w-8 rounded-lg" style={{ background: plan.color, opacity: 0.6 }} />
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {plan.perks.map((p) => (
          <li key={p} className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full grid place-items-center border" style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)' }}>✓</span>
            <span className="opacity-80">{p}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onPick}
        className="mt-4 w-full h-11 rounded-xl border font-medium"
        style={{ borderColor: active ? plan.color : 'color-mix(in oklab, var(--ink) 15%, transparent)', background: active ? 'color-mix(in oklab, var(--soft) 50%, transparent)' : 'var(--bg)' }}
      >
        {active ? 'Seçildi' : 'Seç'}
      </button>
    </div>
  );
}

/* Progress Widget */
function ProgressWidget({ sessions, setSessions }: { sessions: number; setSessions: (n: number) => void }) {
  const target = 6; // demo: ayda 6 seans hedefi
  const pct = Math.max(0, Math.min(100, Math.round((sessions / target) * 100)));
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <div className="opacity-80">Bu ay alınan</div>
        <div className="font-medium">
          {sessions} / {target}
        </div>
      </div>
      <div className="mt-2 h-3 rounded-full overflow-hidden border" style={{ borderColor: 'color-mix(in oklab, var(--ink) 12%, transparent)' }}>
        <div className="h-full" style={{ width: `${pct}%`, background: 'var(--accent)' }} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={() => setSessions(Math.max(0, sessions - 1))} className="h-9 w-9 rounded-lg border" style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)' }}>
          −
        </button>
        <button onClick={() => setSessions(Math.min(target, sessions + 1))} className="h-9 w-9 rounded-lg border" style={{ borderColor: 'color-mix(in oklab, var(--ink) 15%, transparent)' }}>
          +
        </button>
      </div>
      <div className="mt-2 text-xs opacity-70">Hedefe {Math.max(0, target - sessions)} seans kaldı.</div>
    </div>
  );
}

/* Utilities */
function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}
