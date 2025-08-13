'use client';

import { useMemo, useState } from 'react';

/* =========================
   Types & Demo Data
========================= */
type Course = 'Kahvaltı' | 'Öğle' | 'Akşam' | 'Tatlı' | 'İçecek';
type Tag = 'Vegan' | 'Vejetaryen' | 'Acılı' | 'Glutensiz' | 'Şef Önerisi';

type MenuItem = {
  id: string;
  title: string;
  desc: string;
  price: number; // ₺
  course: Course;
  tags: Tag[];
  image: string;
  popular?: boolean;
};

const MENU: MenuItem[] = [
  {
    id: 'm1',
    title: 'Güneşli Akdeniz Kahvaltısı',
    desc: 'Zeytin, domates, keçi peyniri, sıcak pide ve zeytinyağı.',
    price: 320,
    course: 'Kahvaltı',
    tags: ['Vejetaryen', 'Glutensiz', 'Şef Önerisi'],
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 'm2',
    title: 'Odun Fırınlı Levrek',
    desc: 'Rezene & limon kabuğu, közlenmiş sebze, zahter yağı.',
    price: 560,
    course: 'Akşam',
    tags: ['Glutensiz', 'Şef Önerisi'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'm3',
    title: 'Baharatlı Nohut Bowl',
    desc: 'Kavrulmuş nohut, tahin sosu, nar ekşisi, roka.',
    price: 290,
    course: 'Öğle',
    tags: ['Vegan', 'Glutensiz'],
    image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'm4',
    title: 'Sütlü İrmik & Mandalina',
    desc: 'Taze mandalina dilimleri, badem kırığı, tarçın.',
    price: 210,
    course: 'Tatlı',
    tags: ['Vejetaryen'],
    image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=1600&auto=format&fit=crop',
    popular: true,
  },
  {
    id: 'm5',
    title: 'Anadolu Acılı Kuzu Kokoreç Taco',
    desc: 'Lavash taco, sumak soğan, biber turşusu, yoğurt.',
    price: 340,
    course: 'Öğle',
    tags: ['Acılı', 'Şef Önerisi'],
    image: 'https://images.unsplash.com/photo-1551503766-ac63dfa6401f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'm6',
    title: 'Soğuk Demleme Hibiskus',
    desc: 'Narenciye kabuğu, hafif tatlılık, serinletici.',
    price: 140,
    course: 'İçecek',
    tags: ['Vegan', 'Glutensiz'],
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'm7',
    title: 'Izgara Ahtapot & Firik Pilavı',
    desc: 'Kömür aroması, limon tereyağı, kapari.',
    price: 620,
    course: 'Akşam',
    tags: ['Glutensiz', 'Şef Önerisi'],
    image: 'https://images.unsplash.com/photo-1544025162-8a9132f0b4a9?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'm8',
    title: 'Lav Çikolatalı Sufle',
    desc: 'Sıcak akışkan merkez, dondurma ile servis.',
    price: 230,
    course: 'Tatlı',
    tags: ['Vejetaryen'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=1600&auto=format&fit=crop',
  },
];

/* =========================
   Page
========================= */
export default function Paket17Bistro() {
  const [activeCourse, setActiveCourse] = useState<Course | 'Tümü'>('Tümü');
  const [tag, setTag] = useState<Tag | 'Tümü'>('Tümü');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let arr = MENU.slice();
    if (activeCourse !== 'Tümü') arr = arr.filter((m) => m.course === activeCourse);
    if (tag !== 'Tümü') arr = arr.filter((m) => m.tags.includes(tag));
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((m) => (m.title + ' ' + m.desc).toLowerCase().includes(q));
    }
    // öne çıkanları üsttele
    arr = arr.sort(
      (a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0) || b.price - a.price
    );
    return arr;
  }, [activeCourse, tag, query]);

  return (
    <main className="min-h-[100dvh] bg-[#fbf7f2] text-stone-900 selection:bg-amber-200/60">
      {/* SOL RAY - Marka Şeridi */}
      <aside className="fixed left-0 top-0 hidden lg:flex h-screen w-20 flex-col items-center justify-between py-8 bg-gradient-to-b from-amber-100 to-rose-50 border-r border-amber-200/60">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-rose-400 shadow-md" />
        <div className="-rotate-90 tracking-[0.3em] text-xs text-stone-600">BISTRO · ANTALYA</div>
        <div className="w-[2px] h-16 bg-amber-300/60 rounded-full" />
      </aside>
{/* Top strip */}
      <div style={{ background: 'var(--accent)', color: 'var(--bg)' }} className="text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span className="tracking-wide opacity-90">Baksoft · Özelleştirilebilir Tasarım No:2 </span>
          <span className="opacity-80">Edition • <b>Concept</b></span>
        </div>
      </div>
      {/* HEADER */}
      <header className="lg:ml-20 sticky top-0 z-40 border-b border-amber-200/60 bg-[#fbf7f2]/80 backdrop-blur">
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
      <span className="text-amber-700">Baksoft Tasarım</span>
    </a>

    {/* Menü */}
    <nav className="hidden md:flex ml-6 gap-6 text-sm text-stone-600">
      <a href="#menu" className="hover:text-stone-900">Menü</a>
      <a href="#chef" className="hover:text-stone-900">Şefin Önerileri</a>
      <a href="#reserve" className="hover:text-stone-900">Rezervasyon</a>
    </nav>

    {/* Sağ buton */}
    <a
      href="#reserve"
      className="ml-auto rounded-xl px-4 h-10 grid place-items-center bg-stone-900 text-amber-100 font-medium hover:opacity-90"
    >
      Masa Ayırt
    </a>
  </div>
</header>



      {/* HERO – Asimetrik, açık tema + organik dalga */}
      <section className="lg:ml-20 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-rose-200/60 blur-3xl" />
          <div className="absolute top-40 -left-24 w-[340px] h-[340px] rounded-full bg-amber-200/70 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-5 py-12 md:py-20 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-stone-600 bg-white/60 border border-amber-200/70 px-2 py-1 rounded">
              Akdeniz · Modern Anadolu · Doğal Ateş
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.06]">
              Kıyıdan Sofraya <span className="text-rose-700">Sıcak</span> ve{' '}
              <span className="text-amber-700">Samimi</span>
            </h1>
            <p className="mt-4 text-lg text-stone-700 max-w-2xl">
              Yerel üretici, odun fırını ve mevsimsel ürünlerle şekillenen menü. Antalya’nın deniz tuzu ve dağ rüzgârı aynı tabakta.
            </p>

            {/* Arama + Etiket Kısa Filtre */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Bir yemek, malzeme ya da tat yazın…"
                className="h-12 flex-1 rounded-xl bg-white border border-amber-200/70 px-4 placeholder:text-stone-400"
              />
              <div className="flex gap-2">
                {(['Vegan', 'Acılı', 'Glutensiz'] as Tag[]).map((t) => (
                  <Chip key={t} active={tag === t} onClick={() => setTag(tag === t ? 'Tümü' : t)}>
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </div>

          {/* hero görseli - eğik mask */}
          <div className="md:col-span-6 relative">
            <img
              src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop"
              alt="Bistro sofrası"
              className="w-full h-[360px] object-cover rounded-3xl shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] [clip-path:polygon(6%_0,100%_0,94%_100%,0_100%)]"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl border border-amber-200/70 px-4 py-3 text-sm shadow">
              <div className="font-semibold">Günlük Menü</div>
              <div className="text-stone-600">Şef seçimleri her gün 17:00’de güncellenir</div>
            </div>
          </div>
        </div>

        {/* wave ayracı */}
        <svg className="w-full h-16 text-amber-100" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,0 C240,80 480,80 720,40 C960,0 1200,0 1440,40 L1440,100 L0,100 Z" />
        </svg>
      </section>

      {/* MENÜ – Pastel kartlar + segmentasyon */}
      <section id="menu" className="lg:ml-20 bg-amber-100/40">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex flex-wrap items-end gap-3">
            <h2 className="text-3xl font-semibold">Menü</h2>
            <div className="ml-auto flex flex-wrap gap-2">
              {(['Tümü', 'Kahvaltı', 'Öğle', 'Akşam', 'Tatlı', 'İçecek'] as const).map((c) => (
                <Tab key={c} active={activeCourse === c} onClick={() => setActiveCourse(c as any)}>
                  {c}
                </Tab>
              ))}
            </div>
          </div>

          {/* Grid – asimetrik kartlar */}
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((m, i) => (
              <article
                key={m.id}
                className={
                  'group overflow-hidden rounded-3xl border border-amber-200/70 bg-white ' +
                  (i % 3 === 0 ? 'shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)]' : 'shadow-sm')
                }
              >
                <div className="relative">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.02]"
                  />
                  {m.popular && (
                    <span className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-stone-900 text-amber-100 font-semibold">
                      Popüler
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold leading-tight">{m.title}</h3>
                      <p className="mt-1 text-sm text-stone-600">{m.desc}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {m.tags.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full text-[11px] bg-amber-50 border border-amber-200/80 text-stone-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-stone-500">{m.course}</div>
                      <div className="text-xl font-extrabold text-stone-900">₺{m.price.toLocaleString('tr-TR')}</div>
                    </div>
                  </div>
                  <button className="mt-4 w-full h-11 rounded-xl border border-stone-900 text-stone-900 font-medium hover:bg-stone-900 hover:text-amber-100 transition">
                    Sepete Ekle (Demo)
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ŞEFİN ÖNERİLERİ – alternatif layout (yatay kartlar) */}
      <section id="chef" className="lg:ml-20">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-2xl md:text-3xl font-semibold">Şefin Önerileri</h3>
            <div className="text-sm text-stone-600">Mevsime göre değişir</div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-5">
            {MENU.filter((m) => m.tags.includes('Şef Önerisi')).map((m) => (
              <div key={m.id} className="rounded-3xl overflow-hidden border border-amber-200/70 bg-white grid grid-cols-[140px_1fr]">
                <img src={m.image} alt={m.title} className="h-full w-full object-cover" />
                <div className="p-4 flex flex-col">
                  <div className="text-xs text-stone-500">{m.course}</div>
                  <div className="text-lg font-semibold">{m.title}</div>
                  <p className="text-sm text-stone-600 line-clamp-2">{m.desc}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-xl font-extrabold text-stone-900">₺{m.price.toLocaleString('tr-TR')}</div>
                    <button className="h-10 px-4 rounded-xl bg-stone-900 text-amber-100 font-medium hover:opacity-90">Sipariş (Demo)</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REZERVASYON CTA – farklı renk bloğu */}
      <section id="reserve" className="lg:ml-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-200 opacity-80" />
        <div className="mx-auto max-w-7xl px-5 py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h4 className="text-3xl font-semibold">Akşam İçin Masa Ayırtın</h4>
              <p className="mt-2 text-stone-700">
                Gün batımında teras, kışın iç mekânda odun fırını yanı. Online rezervasyonla beklemeden yerinizi alın.
              </p>
            </div>
            <div className="md:col-span-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Demo: Rezervasyon isteğiniz alındı.');
                }}
                className="rounded-3xl bg-white/70 border border-amber-200/70 backdrop-blur p-5 grid grid-cols-2 gap-3"
              >
                <input required placeholder="İsim" className="col-span-2 h-11 rounded-xl bg-white border border-amber-200/70 px-3" />
                <input required type="tel" placeholder="Telefon" className="col-span-2 md:col-span-1 h-11 rounded-xl bg-white border border-amber-200/70 px-3" />
                <input required type="date" className="col-span-1 h-11 rounded-xl bg-white border border-amber-200/70 px-3" />
                <input required type="time" className="col-span-1 h-11 rounded-xl bg-white border border-amber-200/70 px-3" />
                <select className="col-span-1 h-11 rounded-xl bg-white border border-amber-200/70 px-3">
                  {[2, 3, 4, 5, 6, 8].map((n) => <option key={n} value={n}>{n} kişilik</option>)}
                </select>
                <select className="col-span-1 h-11 rounded-xl bg-white border border-amber-200/70 px-3">
                  {['İç Mekân', 'Teras', 'Bar'].map((n) => <option key={n}>{n}</option>)}
                </select>
                <button className="col-span-2 h-12 rounded-xl bg-stone-900 text-amber-100 font-medium hover:opacity-90">
                  Rezervasyon Gönder
                </button>
                <p className="col-span-2 text-[11px] text-stone-500">* Bu bir demo formudur.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lg:ml-20 border-t border-amber-200/60">
        <div className="mx-auto max-w-7xl px-5 py-10 text-sm text-stone-600 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div>© {new Date().getFullYear()} Terra & Sea Bistro — Antalya</div>
          <div className="flex gap-4">
            <a className="hover:text-stone-900" href="#menu">Menü</a>
            <a className="hover:text-stone-900" href="#reserve">Rezervasyon</a>
            <a className="hover:text-stone-900" href="#">KVKK</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* =========================
   UI Bits
========================= */
function Tab({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode; }) {
  return (
    <button
      onClick={onClick}
      className={
        'h-10 rounded-full px-4 text-sm border ' +
        (active
          ? 'border-stone-900 bg-stone-900 text-amber-100'
          : 'border-amber-200/80 bg-white hover:bg-amber-50')
      }
    >
      {children}
    </button>
  );
}
function Chip({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode; }) {
  return (
    <button
      onClick={onClick}
      className={
        'h-12 px-4 rounded-xl border text-sm ' +
        (active
          ? 'bg-stone-900 text-amber-100 border-stone-900'
          : 'bg-white border-amber-200/80 hover:bg-amber-50')
      }
    >
      {children}
    </button>
  );
}
