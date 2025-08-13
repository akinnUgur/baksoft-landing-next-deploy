'use client';

import { useMemo, useState } from 'react';

/*
  KAFE TANITIM + MENÜ (Friends / Mackbear vibe)
  - Renk paleti: odunsu kahverengi, koyu yeşil, bordo/kırmızı, amber sıcak ışık
  - Solda dikey "brand strip" (ahşap doku + ışık şeridi)
  - Hero: loş kafe + string lights
  - Menü: "chalkboard" (kara tahta) efekti, kategori sekmeleri + etiket filtreleri
  - "Bugünün Kahvesi" köşesi
  - Yorumlar: not kağıdı / post-it stili
  - Tüm görsellere altına /public alternatif yol için yorum satırı eklendi
*/

/* =========================
   Types & Demo Data
========================= */
type Course = 'Kahveler' | 'Çaylar' | 'Tatlılar' | 'Atıştırmalık';
type Tag = 'Sıcak' | 'Soğuk' | 'Vegan' | 'Glutensiz' | 'Yeni';

type Item = {
  id: string;
  title: string;
  desc: string;
  price: number; // ₺
  course: Course;
  tags: Tag[];
  image: string;
  popular?: boolean;
};

const MENU: Item[] = [
  {
    id: 'i1',
    title: 'Cinnamon Latte',
    desc: 'Tarçın, hafif muskat ve esmer şeker notalarıyla.',
    price: 165,
    course: 'Kahveler',
    tags: ['Sıcak', 'Yeni'],
    image:
      'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop',
    // /public/cafe/menu/cinnamon-latte.webp
  },
  {
    id: 'i2',
    title: 'Cold Brew Evergreen',
    desc: '12 saat demleme, narenciye kabuğu ile tazelik.',
    price: 155,
    course: 'Kahveler',
    tags: ['Soğuk'],
    image:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop',
    // /public/cafe/menu/coldbrew-evergreen.webp
  },
  {
    id: 'i3',
    title: 'Matcha Affogato',
    desc: 'Sıcak matcha üzerine vanilya gelato.',
    price: 180,
    course: 'Çaylar',
    tags: ['Sıcak', 'Yeni'],
    image:
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1600&auto=format&fit=crop',
    // /public/cafe/menu/matcha-affogato.webp
  },
  {
    id: 'i4',
    title: 'Brownie (Glutensiz)',
    desc: 'Yoğun kakao, deniz tuzu serpiştirmesi.',
    price: 140,
    course: 'Tatlılar',
    tags: ['Glutensiz'],
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1600&auto=format&fit=crop',
    // /public/cafe/menu/brownie-gf.webp
  },
  {
    id: 'i5',
    title: 'Bademli Kruvasan',
    desc: 'Tereyağlı hamur, badem kreması ve pudra şekeri.',
    price: 95,
    course: 'Atıştırmalık',
    tags: [],
    image:
      'https://images.unsplash.com/photo-1541781286675-f9c9ae2126c7?q=80&w=1600&auto=format&fit=crop',
    // /public/cafe/menu/almond-croissant.webp
  },
  {
    id: 'i6',
    title: 'Vegan Havuçlu Kek',
    desc: 'Ceviz kırığı, tarçın ve yumuşak doku.',
    price: 120,
    course: 'Tatlılar',
    tags: ['Vegan'],
    image:
      'https://images.unsplash.com/photo-1513135065346-a098b3e31895?q=80&w=1600&auto=format&fit=crop',
    // /public/cafe/menu/vegan-carrot-cake.webp
  },
];

const TODAY_SPECIAL = {
  title: 'Gingerbread Latte',
  desc: 'Zencefil, karanfil ve hafif pekmez; üstünde mini marshmallow.',
  price: 175,
  image:
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop',
  // /public/cafe/specials/gingerbread-latte.webp
};

const REVIEWS = [
  {
    id: 'r1',
    name: 'Deniz',
    text: 'Loş ışık, iyi müzik ve efsane cinnamon latte. Tam “Friends” havası!',
  },
  {
    id: 'r2',
    name: 'Merve',
    text: 'Kış akşamı için ideal. Gingerbread latte bağımlılık yapıyor.',
  },
  {
    id: 'r3',
    name: 'Ege',
    text: 'Brownie glutensiz olmasına rağmen çok yoğun ve dengeli.',
  },
];

/* =========================
   Page
========================= */
export default function Paket18CozyCafe() {
  const [course, setCourse] = useState<Course | 'Tümü'>('Tümü');
  const [tag, setTag] = useState<Tag | 'Tümü'>('Tümü');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let arr = MENU.slice();
    if (course !== 'Tümü') arr = arr.filter((m) => m.course === course);
    if (tag !== 'Tümü') arr = arr.filter((m) => m.tags.includes(tag));
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((m) => (m.title + ' ' + m.desc).toLowerCase().includes(q));
    }
    // popülerleri üste
    return arr.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
  }, [course, tag, query]);

  return (
    <main className="min-h-[100dvh] bg-[#15110f] text-amber-100 selection:bg-red-400/30">
      {/* SOL DİKEY BRAND STRIP — ahşap doku + ışık şeridi */}
      <aside className="fixed left-0 top-0 hidden lg:flex h-screen w-24 flex-col items-center justify-between py-8 bg-[url('https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center border-r border-amber-900/50">
        {/* /public/cafe/textures/wood-strip.webp */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-800 to-amber-600 shadow-[0_0_40px_-10px_rgba(234,179,8,0.5)]" />
        <div className="-rotate-90 tracking-[0.35em] text-[11px] text-amber-200/90">
          COZY · CENTRAL · CAFE
        </div>
        <div className="w-[2px] h-16 bg-red-700/70 rounded-full shadow-[0_0_20px_rgba(185,28,28,0.6)]" />
      </aside>
{/* Top strip */}
      <div style={{ background: 'var(--accent)', color: 'var(--bg)' }} className="text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span className="tracking-wide opacity-90">Baksoft · Özelleştirilebilir Tasarım No:3 </span>
          <span className="opacity-80">Edition • <b>Concept</b></span>
        </div>
      </div>
      {/* HEADER */}
      <header className="lg:ml-24 sticky top-0 z-40 border-b border-amber-900/40 bg-[#15110f]/70 backdrop-blur">
  <div className="mx-auto max-w-7xl px-5 h-16 flex items-center gap-4">
    {/* Logo + Marka */}
    <a
      href="/paketler"
      className="font-semibold tracking-wide flex items-center gap-2"
    >
      <img
        src="/baksoftLogo.png"
        alt="Baksoft Logo"
        className="h-8 w-8 object-contain"
      />
      <span className="text-amber-400">Baksoft Tasarım</span>
    </a>

    {/* Menü */}
    <nav className="hidden md:flex ml-6 gap-6 text-sm text-amber-200/80">
      <a href="#menu" className="hover:text-amber-100">Menü</a>
      <a href="#special" className="hover:text-amber-100">Bugünün Kahvesi</a>
      <a href="#reviews" className="hover:text-amber-100">Yorumlar</a>
      <a href="#reserve" className="hover:text-amber-100">Rezervasyon</a>
    </nav>

    {/* Sağ buton */}
    <a
      href="#reserve"
      className="ml-auto rounded-xl px-4 h-10 grid place-items-center bg-red-600 text-amber-50 font-medium hover:bg-red-500"
    >
      Masa Ayırt
    </a>
  </div>
</header>


      {/* HERO — loş kafe + string lights + Xmas vibe */}
      <section className="lg:ml-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          {/* string lights bokeh */}
          <img
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop"
            alt="Lights overlay"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          {/* /public/cafe/overlays/string-lights.webp */}
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-10 md:py-16 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6">
            <span className="inline-block text-[11px] uppercase tracking-[0.22em] text-amber-200/80 bg-[#221b17] border border-amber-900/40 px-2 py-1 rounded">
              Odunsu · Koyu Yeşil · Bordo — Friends Tadında
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.06]">
              Şehrin <span className="text-green-400">Sıcak</span> Köşesi,{' '}
              <span className="text-red-400">Kahvenin</span> En Güzel Hâli
            </h1>
            <p className="mt-4 text-lg text-amber-200/90 max-w-2xl">
              Loş ışık, ahşap dokular ve tarçın kokusu. Kış akşamlarını
              <span className="text-amber-300"> sıcak kupalar</span> ve iyi sohbetler tamamlar.
            </p>

            {/* Hızlı arama/filtre */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Bir içecek ya da tatlı ara…"
                className="h-12 flex-1 rounded-xl bg-[#221b17] border border-amber-900/40 px-4 placeholder:text-amber-400/50"
              />
              <div className="flex gap-2">
                {(['Sıcak', 'Soğuk', 'Vegan'] as Tag[]).map((t) => (
                  <Chip key={t} active={tag === t} onClick={() => setTag(tag === t ? 'Tümü' : t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </div>

          {/* hero görseli — kırmızı/yeşil tonlu kafe */}
          <div className="md:col-span-6 relative">
            <img
              src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1600&auto=format&fit=crop"
              alt="Cozy cafe interior"
              className="w-full h-[360px] object-cover rounded-3xl shadow-[0_30px_90px_-40px_rgba(0,0,0,0.6)] ring-1 ring-amber-900/40"
            />
            {/* /public/cafe/hero/room-cozy.webp */}
            <img
              src="https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop"
              alt="Hot cup detail"
              className="absolute -bottom-6 -left-6 w-40 h-40 object-cover rounded-2xl border border-amber-900/40"
            />
            {/* /public/cafe/hero/cup-close.webp */}
          </div>
        </div>

        {/* ince ayraç */}
        <svg className="w-full h-14 text-amber-900/30" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,40 C240,0 480,0 720,40 C960,80 1200,80 1440,40 L1440,100 L0,100 Z" />
        </svg>
      </section>

      {/* MENU — Chalkboard (kara tahta) alanı */}
      <section id="menu" className="lg:ml-24">
        <div className="mx-auto max-w-7xl px-5 pb-12">
          <div className="flex flex-wrap items-end gap-3">
            <h2 className="text-3xl font-semibold">Menü</h2>
            <div className="ml-auto flex flex-wrap gap-2">
              {(['Tümü', 'Kahveler', 'Çaylar', 'Tatlılar', 'Atıştırmalık'] as const).map((c) => (
                <Tab key={c} active={course === c} onClick={() => setCourse(c as any)}>
                  {c}
                </Tab>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-amber-900/40 bg-[radial-gradient(120%_90%_at_50%_50%,rgba(0,0,0,0.6),rgba(0,0,0,0.9))] p-4 md:p-6">
            {/* chalkboard grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((m, i) => (
                <article
                  key={m.id}
                  className={
                    'group overflow-hidden rounded-2xl border border-amber-900/30 bg-[#1b1714] ' +
                    (i % 3 === 0 ? 'shadow-[0_30px_90px_-40px_rgba(0,0,0,0.6)]' : '')
                  }
                >
                  <div className="relative">
                    <img
                      src={m.image}
                      alt={m.title}
                      className="aspect-[4/3] w-full object-cover opacity-90 group-hover:opacity-100 transition"
                    />
                    {/* /public/cafe/menu/<id>.webp */}
                    {m.popular && (
                      <span className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-red-600 text-amber-50 font-semibold">
                        Popüler
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold leading-tight">{m.title}</h3>
                        <p className="mt-1 text-sm text-amber-200/80">{m.desc}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {m.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-full text-[11px] bg-[#221b17] border border-amber-900/40"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs text-amber-300/70">{m.course}</div>
                        <div className="text-xl font-extrabold text-amber-100">
                          ₺{m.price.toLocaleString('tr-TR')}
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 w-full h-11 rounded-xl border border-amber-900/50 bg-[#201a16] text-amber-100 font-medium hover:bg-[#2a221d]">
                      Sepete Ekle (Demo)
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BUGÜNÜN KAHVESİ — yeşil/bordo tonlu vurgu alanı */}
      <section id="special" className="lg:ml-24">
        <div className="mx-auto max-w-7xl px-5 pb-12">
          <div className="rounded-3xl border border-green-900/40 bg-gradient-to-r from-green-950 via-[#1b1714] to-red-950 p-5 md:p-8 grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5">
              <img
                src={TODAY_SPECIAL.image}
                alt={TODAY_SPECIAL.title}
                className="w-full h-[280px] object-cover rounded-2xl ring-1 ring-amber-900/40"
              />
              {/* /public/cafe/specials/gingerbread-latte.webp */}
            </div>
            <div className="md:col-span-7">
              <div className="text-amber-200/80 text-xs uppercase tracking-[0.25em]">
                Bugünün Kahvesi
              </div>
              <h3 className="mt-2 text-3xl font-semibold">{TODAY_SPECIAL.title}</h3>
              <p className="mt-2 text-amber-200/90">{TODAY_SPECIAL.desc}</p>
              <div className="mt-4 text-2xl font-extrabold">
                ₺{TODAY_SPECIAL.price.toLocaleString('tr-TR')}
              </div>
              <div className="mt-6 flex gap-3">
                <button className="h-11 px-5 rounded-xl bg-green-700 text-amber-50 font-medium hover:bg-green-600">
                  Hemen Al (Demo)
                </button>
                <button className="h-11 px-5 rounded-xl border border-amber-900/50 bg-[#201a16] hover:bg-[#2a221d]">
                  Menüye Dön
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YORUMLAR — post-it / yırtık not kağıdı stili */}
      <section id="reviews" className="lg:ml-24">
        <div className="mx-auto max-w-7xl px-5 pb-16">
          <h3 className="text-2xl md:text-3xl font-semibold mb-4">Ziyaretçi Notları</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r, idx) => (
              <div
                key={r.id}
                className={
                  'relative rounded-2xl p-5 bg-[#201a16] border border-amber-900/40 ' +
                  (idx % 2 ? 'rotate-1' : '-rotate-1')
                }
              >
                <div className="absolute -top-3 left-6 w-6 h-6 rounded-full bg-amber-700 shadow-[0_0_18px_rgba(180,83,9,0.6)]" />
                <p className="text-amber-100/90">{r.text}</p>
                <div className="mt-3 text-sm text-amber-300/80">— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REZERVASYON */}
      <section id="reserve" className="lg:ml-24 border-t border-amber-900/40">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-6">
              <h4 className="text-3xl font-semibold">Akşam İçin Masa Ayırt</h4>
              <p className="mt-2 text-amber-200/90">
                Friends tadında bir akşam, odunsu kokular ve sıcak kupalar. Online rezervasyonla sıraya
                takılmayın.
              </p>
            </div>
            <div className="md:col-span-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Demo: Rezervasyon isteğiniz alındı.');
                }}
                className="rounded-3xl bg-[#201a16] border border-amber-900/50 p-5 grid grid-cols-2 gap-3"
              >
                <input
                  required
                  placeholder="İsim"
                  className="col-span-2 h-11 rounded-xl bg-[#221b17] border border-amber-900/40 px-3"
                />
                <input
                  required
                  type="tel"
                  placeholder="Telefon"
                  className="col-span-2 md:col-span-1 h-11 rounded-xl bg-[#221b17] border border-amber-900/40 px-3"
                />
                <input
                  required
                  type="date"
                  className="col-span-1 h-11 rounded-xl bg-[#221b17] border border-amber-900/40 px-3"
                />
                <input
                  required
                  type="time"
                  className="col-span-1 h-11 rounded-xl bg-[#221b17] border border-amber-900/40 px-3"
                />
                <select className="col-span-1 h-11 rounded-xl bg-[#221b17] border border-amber-900/40 px-3">
                  {[2, 3, 4, 5, 6, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} kişilik
                    </option>
                  ))}
                </select>
                <select className="col-span-1 h-11 rounded-xl bg-[#221b17] border border-amber-900/40 px-3">
                  {['Salon', 'Pencere Kenarı', 'Bar'].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
                <button className="col-span-2 h-12 rounded-xl bg-red-600 text-amber-50 font-medium hover:bg-red-500">
                  Rezervasyon Gönder
                </button>
                <p className="col-span-2 text-[11px] text-amber-300/70">* Bu bir demo formudur.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lg:ml-24 border-t border-amber-900/40">
        <div className="mx-auto max-w-7xl px-5 py-10 text-sm text-amber-300/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div>© {new Date().getFullYear()} Cozy Central Cafe — Antalya</div>
          <div className="flex gap-4">
            <a className="hover:text-amber-100" href="#menu">
              Menü
            </a>
            <a className="hover:text-amber-100" href="#special">
              Bugünün Kahvesi
            </a>
            <a className="hover:text-amber-100" href="#">
              KVKK
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =========================
   UI Bits
========================= */
function Tab({
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
      onClick={onClick}
      className={
        'h-10 rounded-full px-4 text-sm border ' +
        (active
          ? 'border-amber-400 bg-red-700 text-amber-50'
          : 'border-amber-900/50 bg-[#201a16] hover:bg-[#2a221d]')
      }
    >
      {children}
    </button>
  );
}
function Chip({
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
      onClick={onClick}
      className={
        'h-12 px-4 rounded-xl border text-sm ' +
        (active
          ? 'bg-green-700 text-amber-50 border-green-600'
          : 'bg-[#221b17] border-amber-900/40 hover:bg-[#2a221d]')
      }
    >
      {children}
    </button>
  );
}
