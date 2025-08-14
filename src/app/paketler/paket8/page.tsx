'use client';

import { useMemo, useState } from 'react';
import Image from "next/image";
/** --- Types --- */
type Category = 'Sneakers' | 'Giyim' | 'Aksesuar';
type Brand = 'Nova' | 'Aero' | 'Cloud' | 'Urban' | 'Daily';

type Product = {
  id: number;
  name: string;
  image: string;
  brand: Brand;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number; // 0..5
  reviews: number;
  freeShipping?: boolean;
  fastDelivery?: boolean;
  tag?: 'Yeni' | 'Çok Satan' | 'İndirim';
};

/** --- Mock Data (demo) --- */
const PRODUCTS: Product[] = [
  {
    id: 101,
    name: 'Aero Runner V2',
    image: '/car/car-3.webp',
    brand: 'Aero',
    category: 'Sneakers',
    price: 2999,
    oldPrice: 3799,
    rating: 4.7,
    reviews: 214,
    freeShipping: true,
    fastDelivery: true,
    tag: 'Çok Satan',
  },
  {
    id: 102,
    name: 'Urban Walk Low',
    image: '/clinic/clinic-4.webp',
    brand: 'Urban',
    category: 'Sneakers',
    price: 2199,
    oldPrice: 2599,
    rating: 4.4,
    reviews: 143,
    freeShipping: true,
    tag: 'İndirim',
  },
  {
    id: 103,
    name: 'Cloud Knit Hoodie',
    image: '/yemek/yemek-2.webp',
    brand: 'Cloud',
    category: 'Giyim',
    price: 1499,
    rating: 4.5,
    reviews: 98,
    fastDelivery: true,
    tag: 'Yeni',
  },
  {
    id: 104,
    name: 'Merino Basic Tee',
    image: '/hotel/hotel-5.webp',
    brand: 'Nova',
    category: 'Giyim',
    price: 649,
    rating: 4.3,
    reviews: 77,
  },
  {
    id: 105,
    name: 'Everyday Tote',
    image: '/kahve/kahve-1.webp',
    brand: 'Daily',
    category: 'Aksesuar',
    price: 1199,
    rating: 4.2,
    reviews: 56,
    freeShipping: true,
  },
  {
    id: 106,
    name: 'Thermo Bottle 750ml',
    image: '/mimarlik/mimarlik-2.webp',
    brand: 'Daily',
    category: 'Aksesuar',
    price: 399,
    rating: 4.6,
    reviews: 201,
    fastDelivery: true,
  },
  {
    id: 107,
    name: 'Trail Runner Pro',
    image: '/car/car-1.webp',
    brand: 'Aero',
    category: 'Sneakers',
    price: 3390,
    rating: 4.8,
    reviews: 321,
    tag: 'Çok Satan',
    freeShipping: true,
  },
  {
    id: 108,
    name: 'Packable Wind Jacket',
    image: '/yemek/yemek-4.webp',
    brand: 'Cloud',
    category: 'Giyim',
    price: 2190,
    rating: 4.1,
    reviews: 41,
  },
];


/** --- Helpers --- */
const formatPrice = (n: number) =>
  `₺${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`;

const discountOf = (p: Product) =>
  p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;

/** --- Page --- */
export default function Paket12TrendyEcom() {
  // Filters / UI
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<'Tümü' | Category>('Tümü');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [sort, setSort] = useState<'pop' | 'low' | 'high' | 'new'>('pop');
  const [maxPrice, setMaxPrice] = useState(() =>
    Math.max(...PRODUCTS.map((p) => p.price))
  );
  const [fav, setFav] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const priceCeil = useMemo(
    () => Math.max(...PRODUCTS.map((p) => p.price)),
    []
  );

  const categories: Array<'Tümü' | Category> = ['Tümü', 'Sneakers', 'Giyim', 'Aksesuar'];
  const brandUniverse: Brand[] = ['Nova', 'Aero', 'Cloud', 'Urban', 'Daily'];

  const filtered = useMemo(() => {
    let arr = PRODUCTS.filter((p) => p.price <= maxPrice);
    if (cat !== 'Tümü') arr = arr.filter((p) => p.category === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.brand.toLowerCase().includes(s) ||
          p.category.toLowerCase().includes(s)
      );
    }
    if (brands.length) arr = arr.filter((p) => brands.includes(p.brand));

    switch (sort) {
      case 'low':
        arr = arr.slice().sort((a, b) => a.price - b.price);
        break;
      case 'high':
        arr = arr.slice().sort((a, b) => b.price - a.price);
        break;
      case 'new':
        arr = arr.slice().sort((a, b) => (b.tag === 'Yeni' ? 1 : 0) - (a.tag === 'Yeni' ? 1 : 0) || b.id - a.id);
        break;
      default:
        arr = arr
          .slice()
          .sort((a, b) => (b.tag === 'Çok Satan' ? 1 : 0) - (a.tag === 'Çok Satan' ? 1 : 0) || b.reviews - a.reviews);
    }
    return arr;
  }, [q, cat, brands, sort, maxPrice]);

  const subtotal = useMemo(
    () => cart.reduce((sum, id) => sum + (PRODUCTS.find((p) => p.id === id)?.price ?? 0), 0),
    [cart]
  );

  return (
    <main className="min-h-[100dvh] bg-neutral-50 text-neutral-900">
      {/* Promo bar */}
      <div className="bg-orange-600 text-white text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-4">
          <span className="font-semibold">Baksoft </span>
          <span className="opacity-95"> ·  Özelleştirilebilir Tasarım No:8</span>
        </div>
      </div>

     <header className="sticky top-0 z-40 border-b bg-white">
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

    {/* Search */}
    <div className="relative flex-1 max-w-3xl ml-4">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ürün, kategori veya marka ara"
        className="w-full h-12 rounded-full border border-neutral-300 px-5 pr-28 bg-white placeholder:text-neutral-500 text-[15px]"
      />
      <button className="absolute right-1 top-1 h-10 px-5 rounded-full bg-orange-600 text-white text-sm font-medium hover:bg-orange-700">
        Ara
      </button>
    </div>

    <div className="ml-auto flex items-center gap-2">
      <button
        onClick={() => setCartOpen(true)}
        className="relative rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
        aria-label="Sepet"
      >
        Sepet
        {cart.length ? (
          <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-orange-600 text-white text-xs grid place-items-center">
            {cart.length}
          </span>
        ) : null}
      </button>
    </div>
  </div>

  {/* Category pills + sort */}
  <div className="mx-auto max-w-7xl px-4 pb-3 flex items-center gap-2 overflow-x-auto">
    {categories.map((c) => (
      <button
        key={c}
        onClick={() => setCat(c)}
        className={
          'px-3 py-1.5 rounded-full border text-sm font-medium ' +
          (cat === c
            ? 'bg-orange-600 border-orange-600 text-white'
            : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50')
        }
      >
        {c}
      </button>
    ))}
    <div className="ml-auto flex items-center gap-2">
      <label className="text-sm text-neutral-700">Sırala:</label>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as any)}
        className="h-10 rounded-lg border border-neutral-300 px-2 text-sm bg-white"
      >
        <option value="pop">Öne Çıkanlar</option>
        <option value="new">Yeni Gelenler</option>
        <option value="low">Fiyat Artan</option>
        <option value="high">Fiyat Azalan</option>
      </select>
    </div>
  </div>
</header>


      {/* Layout */}
      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10 grid grid-cols-12 gap-6">
        {/* Filters (desktop) */}
        <aside className="hidden lg:block col-span-3">
          <div className="rounded-2xl border border-neutral-300 bg-white p-5 sticky top-28">
            <h3 className="font-semibold text-neutral-900">Filtreler</h3>

            {/* Price */}
            <div className="mt-5">
              <div className="text-sm text-neutral-700 flex items-center justify-between">
                <span>Azami fiyat</span>
                <span className="font-semibold">{formatPrice(maxPrice)}</span>
              </div>
              <input
                aria-label="Azami fiyat"
                type="range"
                min={0}
                max={priceCeil}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>

            {/* Brand */}
            <div className="mt-6">
              <div className="text-sm text-neutral-700 mb-2">Marka</div>
              <div className="grid grid-cols-1 gap-2">
                {brandUniverse.map((b) => {
                  const active = brands.includes(b);
                  return (
                    <label key={b} className="flex items-center gap-2 text-sm text-neutral-900">
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() =>
                          setBrands((prev) =>
                            active ? prev.filter((x) => x !== b) : [...prev, b]
                          )
                        }
                      />
                      <span>{b}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={() => {
                setQ('');
                setCat('Tümü');
                setBrands([]);
                setSort('pop');
                setMaxPrice(priceCeil);
              }}
              className="mt-6 w-full h-11 rounded-xl border border-neutral-300 text-sm font-medium bg-white hover:bg-neutral-50"
            >
              Filtreleri Temizle
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="col-span-12 lg:col-span-9">
          {/* Mobile filter/search */}
          <div className="lg:hidden mb-4 flex items-center gap-2">
            <div className="flex-1">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ara"
                className="w-full h-11 rounded-xl border border-neutral-300 px-4 bg-white placeholder:text-neutral-500"
              />
            </div>
            <button
              onClick={() => {
                setQ('');
                setCat('Tümü');
                setBrands([]);
                setSort('pop');
                setMaxPrice(priceCeil);
              }}
              className="h-11 px-3 rounded-xl border border-neutral-300 bg-white text-sm font-medium hover:bg-neutral-50"
            >
              Sıfırla
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                fav={fav.includes(p.id)}
                toggleFav={() =>
                  setFav((prev) =>
                    prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id]
                  )
                }
                addToCart={() => {
                  setCart((prev) => [...prev, p.id]);
                  setCartOpen(true);
                }}
              />
            ))}
          </div>

          {!filtered.length && (
            <div className="mt-10 rounded-2xl border border-neutral-300 p-8 text-center bg-white">
              <div className="text-lg font-semibold text-neutral-900">Sonuç bulunamadı</div>
              <div className="text-sm text-neutral-700">
                Filtreleri gevşetmeyi deneyin.
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        removeAt={(i) => setCart((prev) => prev.filter((_, idx) => idx !== i))}
        subtotal={subtotal}
      />
    </main>
  );
}

/** --- Components --- */

function ProductCard({
  p,
  fav,
  toggleFav,
  addToCart,
}: {
  p: Product;
  fav: boolean;
  toggleFav: () => void;
  addToCart: () => void;
}) {
  const discount = discountOf(p);
  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-300 bg-white">
      <div className="relative">
        <Image
          src={p.image}
          alt={p.name}
          width={400}
          height={500}
          className="aspect-[4/5] w-full object-cover group-hover:scale-[1.02] transition"
        />

        {/* Discount ribbon */}
        {discount > 0 && (
          <div className="absolute left-0 top-0">
            <div className="bg-rose-600 text-white text-xs px-2 py-1 rounded-br-lg font-semibold">
              %{discount} İndirim
            </div>
          </div>
        )}

        {/* Tag chip */}
        {p.tag && (
          <span className="absolute left-2 bottom-2 text-xs px-2 py-1 rounded bg-black/75 text-white font-medium">
            {p.tag}
          </span>
        )}

        {/* Fav */}
        <button
          onClick={toggleFav}
          aria-label="Favori"
          className="absolute right-2 top-2 h-9 w-9 grid place-items-center rounded-full bg-white border border-neutral-300 hover:bg-neutral-50"
        >
          <svg
            viewBox="0 0 24 24"
            className={'h-5 w-5 ' + (fav ? 'fill-rose-600' : 'fill-neutral-300')}
          >
            <path d="M12 21s-6.716-4.303-9.428-7.015C.132 11.545.42 7.88 3.05 6.14 5.28 4.67 7.83 5.27 9.34 6.78L12 9.44l2.66-2.66c1.51-1.51 4.06-2.11 6.29-.64 2.63 1.74 2.92 5.41.48 7.845C18.716 16.697 12 21 12 21z" />
          </svg>
        </button>

        {/* Hover CTA */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition">
          <div className="p-2">
            <button
              onClick={addToCart}
              className="pointer-events-auto w-full h-11 rounded-xl bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 shadow"
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>

      <div className="p-3">
        <div className="text-sm text-neutral-700">{p.brand}</div>
        <h3 className="text-[15px] font-semibold leading-snug text-neutral-900 line-clamp-2">
          {p.name}
        </h3>

        {/* rating */}
        <div className="mt-1 flex items-center gap-1 text-sm text-neutral-800">
          <Stars value={p.rating} />
          <span className="ml-1 font-medium">{p.rating.toFixed(1)}</span>
          <span className="text-neutral-600">({p.reviews})</span>
        </div>

        {/* price */}
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-xl font-bold tabular-nums text-neutral-900">
            {formatPrice(p.price)}
          </div>
          {p.oldPrice && (
            <div className="text-sm text-neutral-600 line-through tabular-nums">
              {formatPrice(p.oldPrice)}
            </div>
          )}
        </div>

        {/* badges */}
        <div className="mt-2 flex flex-wrap gap-1">
          {p.freeShipping && (
            <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
              Kargo Bedava
            </span>
          )}
          {p.fastDelivery && (
            <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 text-xs font-medium">
              Hızlı Teslimat
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Stars({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="flex items-center">
      {stars.map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={
            'h-4 w-4 ' + (i <= Math.round(value) ? 'fill-amber-400' : 'fill-neutral-300')
          }
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.561-.953L10 0l2.949 5.957 6.561.953-4.755 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

function CartDrawer({
  open,
  onClose,
  cart,
  removeAt,
  subtotal,
}: {
  open: boolean;
  onClose: () => void;
  cart: number[];
  removeAt: (i: number) => void;
  subtotal: number;
}) {
  return (
    <div
      className={
        'fixed inset-y-0 right-0 z-50 w-[92%] sm:w-[420px] bg-white shadow-2xl border-l border-neutral-300 transition-transform ' +
        (open ? 'translate-x-0' : 'translate-x-full')
      }
    >
      <div className="h-14 px-4 border-b border-neutral-300 flex items-center justify-between">
        <div className="font-semibold text-neutral-900">Sepetim</div>
        <button
          onClick={onClose}
          className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
        >
          Kapat
        </button>
      </div>
      <div className="p-4 space-y-3 max-h-[calc(100vh-220px)] overflow-auto">
        {cart.length === 0 && (
          <div className="rounded-xl border border-neutral-300 p-6 text-center text-sm text-neutral-800 bg-white">
            Sepetiniz boş.
          </div>
        )}
        {cart.map((id, idx) => {
          const p = PRODUCTS.find((x) => x.id === id)!;
          return (
            <div key={idx} className="flex items-center gap-3 rounded-xl border border-neutral-300 p-3 bg-white">
              <Image src={p.image} alt={p.name} width={64} height={64} className="rounded-lg object-cover" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-neutral-900 line-clamp-2">{p.name}</div>
                <div className="text-xs text-neutral-700">{p.brand}</div>
                <div className="text-sm font-semibold text-neutral-900">{formatPrice(p.price)}</div>
              </div>
              <button
                onClick={() => removeAt(idx)}
                className="text-xs text-rose-700 hover:underline font-medium"
              >
                Kaldır
              </button>
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-0 inset-x-0 border-t border-neutral-300 p-4 bg-white">
        <div className="flex items-center justify-between text-sm">
          <div className="text-neutral-800">Ara toplam</div>
          <div className="font-semibold text-neutral-900">{formatPrice(subtotal)}</div>
        </div>
        <div className="mt-1 text-xs text-neutral-700">Kargo ücreti ödeme adımında hesaplanır.</div>
        <button className="mt-3 w-full h-11 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700">
          Güvenli Ödeme (Demo)
        </button>
      </div>
    </div>
  );
}
