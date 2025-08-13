export default function Paket9RestaurantColorful() {
  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-rose-50 via-white to-emerald-50 text-slate-900">
      {/* Üst Bar */}

       {/* Top strip */}
      <div className="text-xs" style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <span>Baksoft · Özelleştirilebilir Tasarım No:5</span>
          <span className="opacity-80">Edition • <b>Concept</b></span>
        </div>
      </div>
      <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur">
  <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
    {/* Logo + Marka */}
    <a
      href="/paketler"
      className="flex items-center gap-2"
    >
      <img
        src="/baksoftLogo.png"
        alt="Baksoft Logo"
        className="h-5 w-5 object-contain"
      />
      <span className="font-semibold tracking-wide">Baksoft Tasarım</span>
    </a>

    {/* Menü */}
    <nav className="hidden md:flex gap-6 text-sm text-slate-600">
      <a href="#menu" className="hover:text-slate-900">Menü</a>
      <a href="#seckiler" className="hover:text-slate-900">Şefin Seçkileri</a>
      <a href="#rezervasyon" className="hover:text-slate-900">Rezervasyon</a>
      <a href="#galeri" className="hover:text-slate-900">Galeri</a>
      <a href="#iletisim" className="hover:text-slate-900">İletişim</a>
    </nav>

    {/* Sağ buton */}
    <a
      href="#rezervasyon"
      className="rounded-xl px-3 py-1.5 text-sm bg-rose-600 text-white hover:bg-rose-700 transition"
    >
      Masa Ayırt
    </a>
  </div>
</header>


      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* renkli arka plan */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_15%_0%,rgba(244,63,94,0.18),transparent),radial-gradient(50%_35%_at_100%_0%,rgba(16,185,129,0.18),transparent)]" />
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <span className="inline-block text-xs uppercase tracking-widest text-rose-800 bg-rose-100 px-2 py-1 rounded">
              Odun Fırını · Taze Makarna · Doğal Şarap
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight font-serif">
              İştah Açan Renkler, <span className="text-emerald-700">Taze Tatlar</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Domatesin canlı kırmızısı ve fesleğenin ferah yeşiliyle tabakta Akdeniz. Günlük hamur, yerel
              üreticiler ve şef imzalı menüler.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#menu" className="px-5 py-3 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50">
                Menüyü Gör
              </a>
              <a href="#rezervasyon" className="px-5 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                Rezervasyon
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {["Vejetaryen Seçenek", "Glütensiz Makarna", "Sommelier Eşleşmesi"].map((t) => (
                <span key={t} className="px-2 py-1 rounded-full border bg-emerald-50 border-emerald-200 text-emerald-800">{t}</span>
              ))}
            </div>
          </div>

          {/* Hero görseli (external) */}
          <div className="md:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border shadow-sm">
              <img
                src="https://images.pexels.com/photos/590761/pexels-photo-590761.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Odun fırını pizza, taze fesleğen ve domates"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
            <p className="mt-2 text-xs text-slate-500">Foto: Pexels</p>
          </div>
        </div>
      </section>

      {/* ŞEFİN SEÇKİLERİ */}
      <section id="seckiler" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <h2 className="text-3xl font-semibold font-serif">Şefin Seçkileri</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Burrata Caprese",
                desc: "Renkli domatesler, burrata, fesleğen yağı",
                img: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1200",
              },
              {
                name: "Spaghetti Carbonara",
                desc: "Pecorino, yumurta, guanciale",
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Spaghetti_alla_carbonara%2C_2010.jpg/1024px-Spaghetti_alla_carbonara%2C_2010.jpg",
              },
              {
                name: "Panna Cotta & Çilek",
                desc: "Vanilya notaları, çilek sos",
                img: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=1200",
              },
            ].map((item) => (
              <article key={item.name} className="group rounded-2xl border overflow-hidden bg-white">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                </div>
                <div className="p-5">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 rounded-full text-xs border border-rose-200 text-rose-700">Domates</span>
                    <span className="px-2 py-1 rounded-full text-xs border border-emerald-200 text-emerald-700">Fesleğen</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MENÜ KATEGORİLERİ */}
      <section id="menu" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
          <h2 className="text-3xl font-semibold font-serif">Menü</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {/* Pizza */}
            <div className="rounded-2xl border overflow-hidden bg-white">
              <div className="relative aspect-[16/9]">
                <img
                  src="https://images.pexels.com/photos/4109084/pexels-photo-4109084.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Renkli sebzeli pizza"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-rose-600 text-white text-xs">Pizza</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                {[
                  ["Margherita", "Domates, mozzarella, fesleğen", "260"],
                  ["Diavola", "Acı salam, chili, mozzarella", "320"],
                  ["Verdura", "Izgara sebzeler, pesto", "310"],
                ].map(([n, d, p]) => (
                  <li key={n} className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-slate-600">{d}</div>
                    </div>
                    <div className="font-semibold tabular-nums">₺{p}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Makarna */}
            <div className="rounded-2xl border overflow-hidden bg-white">
              <div className="relative aspect-[16/9]">
                <img
                  src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Taze makarna tabağı"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-emerald-600 text-white text-xs">Makarna</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                {[
                  ["Tagliatelle Funghi", "Yaban mantar, kremalı sos", "340"],
                  ["Penne Arrabbiata", "Acı domates, sarımsak", "280"],
                  ["Gnocchi Pesto", "Fesleğen pesto, parmesan", "360"],
                ].map(([n, d, p]) => (
                  <li key={n} className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-slate-600">{d}</div>
                    </div>
                    <div className="font-semibold tabular-nums">₺{p}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Salata */}
            <div className="rounded-2xl border overflow-hidden bg-white md:col-span-1">
              <div className="relative aspect-[16/9]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Fresh_Salad_%28Unsplash%29.jpg/1024px-Fresh_Salad_%28Unsplash%29.jpg"
                  alt="Taze renkli salata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-emerald-600 text-white text-xs">Salatalar</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                {[
                  ["Renkli Caprese", "Domates çeşitleri, mozzarella, pesto", "240"],
                  ["Roka & Parmesan", "Limon zeytinyağı sos", "220"],
                ].map(([n, d, p]) => (
                  <li key={n} className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-slate-600">{d}</div>
                    </div>
                    <div className="font-semibold tabular-nums">₺{p}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tatlı */}
            <div className="rounded-2xl border overflow-hidden bg-white md:col-span-1">
              <div className="relative aspect-[16/9]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Porcion_de_tarta_de_chocolate.jpg"
                  alt="Çikolatalı tatlı dilimi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-rose-600 text-white text-xs">Tatlılar</div>
              </div>
              <ul className="p-5 space-y-3 text-sm">
                {[
                  ["Tiramisu", "Klasik espresso, mascarpone", "210"],
                  ["Çikolata Ganaj", "Deniz tuzu, zeytinyağı", "230"],
                ].map(([n, d, p]) => (
                  <li key={n} className="grid grid-cols-[1fr_auto] gap-4">
                    <div>
                      <div className="font-medium">{n}</div>
                      <div className="text-slate-600">{d}</div>
                    </div>
                    <div className="font-semibold tabular-nums">₺{p}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-500">* Görseller Pexels/Wikimedia kaynaklı örnek görsellerdir.</p>
        </div>
      </section>

      {/* REZERVASYON */}
      <section id="rezervasyon" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-6">
            <h2 className="text-3xl font-semibold font-serif">Rezervasyon</h2>
            <form className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600">Tarih</label>
                <input type="date" className="mt-1 w-full h-11 rounded-xl border px-3" />
              </div>
              <div>
                <label className="text-xs text-slate-600">Saat</label>
                <input type="time" className="mt-1 w-full h-11 rounded-xl border px-3" />
              </div>
              <div>
                <label className="text-xs text-slate-600">Kişi</label>
                <input type="number" defaultValue={2} min={1} className="mt-1 w-full h-11 rounded-xl border px-3" />
              </div>
              <div>
                <label className="text-xs text-slate-600">Ad Soyad</label>
                <input className="mt-1 w-full h-11 rounded-xl border px-3" />
              </div>
              <div className="col-span-2">
                <label className="text-xs text-slate-600">Telefon</label>
                <input className="mt-1 w-full h-11 rounded-xl border px-3" />
              </div>
              <button className="col-span-2 h-11 rounded-xl bg-rose-600 text-white hover:bg-rose-700">Masa Ayırt</button>
            </form>
            <p className="mt-3 text-xs text-slate-500">* Demo form. Gerçek entegrasyon sonradan bağlanır.</p>
          </div>

          <div className="md:col-span-6">
            <div className="rounded-2xl border bg-white p-6">
              <div className="text-sm text-slate-600">Bugün Uygun Seanslar</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["18:00", "18:30", "19:00", "19:30", "20:00", "21:00"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200">{t}</span>
                ))}
              </div>
              <div className="mt-6 text-sm">
                <div className="font-medium">Çalışma Saatleri</div>
                <p className="text-slate-600 mt-1">Pzt-Cmt 17:30–23:30 · Paz 13:00–22:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERİ + KONUM */}
      <section id="galeri" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <h2 className="text-3xl font-semibold font-serif">Galeri</h2>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/858508/pexels-photo-858508.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/2237/restaurant-person-people-hand.jpg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=800",
              ].map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border">
                  <img src={src} alt={`Galeri ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">Fotoğraflar: Pexels/Wikimedia – demo amaçlıdır.</p>
          </div>
          <div className="md:col-span-5">
            <h2 className="text-3xl font-semibold font-serif">Konum</h2>
            <div className="mt-6 aspect-[4/3] rounded-2xl border bg-slate-100 grid place-items-center text-sm text-slate-500">
              Harita (Placeholder)
            </div>
            <p className="mt-3 text-sm text-slate-600">Kaleiçi — Otopark 150 m · Toplu taşıma 2 dk</p>
          </div>
        </div>
      </section>

      {/* İLETİŞİM */}
      <section id="iletisim" className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border bg-white">
            <div className="text-sm text-slate-600">Telefon</div>
            <div className="text-lg font-semibold mt-1">0 (242) 000 00 00</div>
          </div>
          <div className="p-6 rounded-2xl border bg-white">
            <div className="text-sm text-slate-600">Adres</div>
            <div className="text-lg font-semibold mt-1">Kaleiçi, Antalya</div>
          </div>
          <div className="p-6 rounded-2xl border bg-white">
            <div className="text-sm text-slate-600">E-Posta</div>
            <div className="text-lg font-semibold mt-1">info@rossoverde.com</div>
          </div>
        </div>
      </section>

      {/* ALT BİLGİ */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between text-sm text-slate-600">
          <span>© {new Date().getFullYear()} Baksoft</span>
          <a href="#rezervasyon" className="underline">Masa Ayırt</a>
        </div>
      </footer>
    </main>
  );
}
