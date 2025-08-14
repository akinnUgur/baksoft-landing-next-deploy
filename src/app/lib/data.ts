// src/app/lib/data.ts
import { CarouselItem, Feature, PackageItem, Story, Tier, TierId } from "./types";

/* ========================= PACKAGES ========================= */
/** Not: slug'lar /paketler/paketX olarak normalize edildi */
export const PACKAGES: PackageItem[] = [
  { id: 1,  slug: "/paketler/paket1",  title: "Baksoft Paket 1",  subtitle: "Portföy / Proje — (Mimarlık temalı) — her sektöre uyarlanır", vibe: "editorial", features: ["landing", "pages_4_10", "gallery", "blog"] },
  { id: 2,  slug: "/paketler/paket2",  title: "Baksoft Paket 2",  subtitle: "Restoran — Menü/Rezervasyon — her sektöre uyarlanır",           vibe: "premium",   features: ["landing", "booking", "gallery"] },
  { id: 3,  slug: "/paketler/paket3",  title: "Baksoft Paket 3",  subtitle: "Kafe — Menü/Konum — her sektöre uyarlanır",                      vibe: "minimal",   features: ["landing", "gallery"] },
  { id: 4,  slug: "/paketler/paket4",  title: "Baksoft Paket 4",  subtitle: "Güzellik (Lúmina) — Paketler/Önce-Sonra/Üyelik — her sektöre uyarlanır", vibe: "editorial", features: ["landing", "booking", "membership", "gallery"] },
  { id: 5,  slug: "/paketler/paket5",  title: "Baksoft Paket 5",  subtitle: "Restoran — Menü/Landing — her sektöre uyarlanır",                vibe: "premium",   features: ["landing", "gallery", "booking"] },
  { id: 6,  slug: "/paketler/paket6",  title: "Baksoft Paket 6",  subtitle: "Kafe — Landing — her sektöre uyarlanır",                         vibe: "minimal",   features: ["landing"] },
  { id: 7,  slug: "/paketler/paket7",  title: "Baksoft Paket 7",  subtitle: "Araç Kiralama — Liste/Filtre/Rezervasyon — her sektöre uyarlanır", vibe: "premium",  features: ["pages_4_10", "booking", "gallery"] },
  { id: 8,  slug: "/paketler/paket8",  title: "Baksoft Paket 8",  subtitle: "E-Ticaret — Katalog/Sepet — her sektöre uyarlanır",              vibe: "premium",   features: ["commerce", "cart", "gallery", "blog"] },
  { id: 9,  slug: "/paketler/paket9",  title: "Baksoft Paket 9",  subtitle: "Spor Salonu — Program/Üyelik/Rezervasyon — her sektöre uyarlanır", vibe: "sport",    features: ["pages_4_10", "membership", "booking"] },
  { id: 10, slug: "/paketler/paket10", title: "Baksoft Paket 10", subtitle: "Klinik (Diş) — Hizmetler/Randevu/Önce-Sonra — her sektöre uyarlanır", vibe: "minimal", features: ["pages_4_10", "booking", "gallery"] },
  { id: 11, slug: "/paketler/paket11", title: "Baksoft Paket 11", subtitle: "Otel — Oda Galerisi/Rezervasyon — her sektöre uyarlanır",        vibe: "premium",   features: ["pages_4_10", "booking", "gallery"] },
];

/* ========================= CAROUSEL ========================= */
export const CAROUSEL_ITEMS: CarouselItem[] = [
  { slug: "/paketler/paket1",  title: "Baksoft Paket 1",  subtitle: "Portföy / Proje", vibe: "Editorial",
    cover: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/paketler/paket1/cover.jpg
    chips: ["landing","pages_4_10","gallery"] },

  { slug: "/paketler/paket2",  title: "Baksoft Paket 2",  subtitle: "Restoran", vibe: "Premium",
    cover: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600",   // ALT: /images/paketler/paket2/cover.jpg
    chips: ["landing","booking","gallery"] },

  { slug: "/paketler/paket3",  title: "Baksoft Paket 3",  subtitle: "Kafe", vibe: "Minimal",
    cover: "https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=1600",   // ALT: /images/paketler/paket3/cover.jpg
    chips: ["landing","gallery"] },

  { slug: "/paketler/paket4",  title: "Baksoft Paket 4",  subtitle: "Güzellik", vibe: "Editorial",
    cover: "https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/paketler/paket4/cover.jpg
    chips: ["landing","membership","booking"] },

  { slug: "/paketler/paket5",  title: "Baksoft Paket 5",  subtitle: "Restoran", vibe: "Premium",
    cover: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600",   // ALT: /images/paketler/paket5/cover.jpg
    chips: ["landing","booking"] },

  { slug: "/paketler/paket6",  title: "Baksoft Paket 6",  subtitle: "Kafe", vibe: "Minimal",
    cover: "https://images.pexels.com/photos/2240762/pexels-photo-2240762.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/paketler/paket6/cover.jpg
    chips: ["landing"] },

  { slug: "/paketler/paket7",  title: "Baksoft Paket 7",  subtitle: "Rent-a-Car", vibe: "Premium",
    cover: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1600",   // ALT: /images/paketler/paket7/cover.jpg
    chips: ["pages_4_10","booking","gallery"] },

  { slug: "/paketler/paket8",  title: "Baksoft Paket 8",  subtitle: "E-Ticaret", vibe: "Sport",
    cover: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/paketler/paket8/cover.jpg
    chips: ["commerce","cart","blog"] },

  { slug: "/paketler/paket9",  title: "Baksoft Paket 9",  subtitle: "Spor Salonu", vibe: "Sport",
    cover: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/paketler/paket9/cover.jpg
    chips: ["pages_4_10","membership","booking"] },

  { slug: "/paketler/paket10", title: "Baksoft Paket 10", subtitle: "Klinik", vibe: "Editorial",
    cover: "https://images.pexels.com/photos/3845762/pexels-photo-3845762.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/paketler/paket10/cover.jpg
    chips: ["pages_4_10","booking","gallery"] },

  { slug: "/paketler/paket11", title: "Baksoft Paket 11", subtitle: "Otel", vibe: "Premium",
    cover: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1600",   // ALT: /images/paketler/paket11/cover.jpg
    chips: ["pages_4_10","booking","gallery"] },
];

/* ========================= STORIES ========================= */
export const STORIES: Story[] = [
  {
    id: "landing",
    title: "One-Page Landing",
    kicker: "Hızlı kurulum, tek sayfada yüksek etki",
    cover: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/stories/landing.jpg
    steps: [
      { title: "Sorun",       desc: "Dağınık iletişim, kopuk CTA, düşük dönüşüm.",                                   icon: "⚠️" },
      { title: "Çözüm",       desc: "Net hero mesajı + güçlü CTA + sosyal kanıt.",                                   icon: "✅" },
      { title: "Teslimatlar", desc: "Hero, özellik blokları, referans slayt, teklif/iletişim formu.",               icon: "📦" },
      { title: "Canlı",       desc: "/paket1–6 gibi landing örnekleri; sektör bağımsız uyarlanır.",                 icon: "🔗" },
    ],
  },
  {
    id: "corporate",
    title: "Kurumsal 4–10 Sayfa",
    kicker: "Bilgi mimarisi, blog/SSS ve SEO kalıpları",
    cover: "https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/stories/corporate.jpg
    steps: [
      { title: "IA",     desc: "Anasayfa → Hakkında → Hizmetler → Blog/SSS → İletişim.", icon: "🗂️" },
      { title: "SEO",    desc: "Şema işaretleme, anlamlı URL, hızlı LCP ve CLS kontrolü.", icon: "🔍" },
      { title: "İçerik", desc: "Koleksiyon temelli komponentler ve varyantlar.",           icon: "🧩" },
      { title: "Yayın",  desc: "CI/CD, edge cache, roll-back güvenliği.",                 icon: "🚀" },
    ],
  },
  {
    id: "b2c",
    title: "B2C / Özel Proje",
    kicker: "Keşif → UX → Entegrasyon → Sprint",
    cover: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1600", // ALT: /images/stories/b2c.jpg
    steps: [
      { title: "Keşif",        desc: "İş hedefleri, akışlar, riskler, başarı ölçütleri.", icon: "🎯" },
      { title: "UX Akışları",  desc: "User journey, wireframe, prototip doğrulama.",      icon: "🗺️" },
      { title: "Entegrasyonlar", desc: "Ödeme, CRM, analitik, arama/filtre, i18n.",      icon: "🔗" },
      { title: "Sprint",       desc: "2-3 haftalık iterasyonlar, demo ve ölçüm.",         icon: "⏱️" },
    ],
  },
];

/* ========================= LABELS ========================= */
export const FEATURE_LABEL: Record<Feature, string> = {
  landing: "Landing",
  pages_4_10: "4–10 Sayfa",
  commerce: "E-ticaret",
  booking: "Rezervasyon",
  gallery: "Galeri",
  blog: "Blog",
  membership: "Üyelik",
  cart: "Sepet",
};

/* ========================= PRICING ========================= */
export const TIERS: Tier[] = [
  { id: "lite",       name: "Lite",       tagline: "1–3 sayfa tanıtım",        includes: { mobile: true, seo: true, perf: true } },
  { id: "core",       name: "Core",       tagline: "4–8 sayfa kurumsal",       includes: { mobile: true, seo: true, perf: true } },
  { id: "plus",       name: "Plus",       tagline: "9–15 sayfa gelişmiş",      includes: { mobile: true, seo: true, perf: true } },
  { id: "commerce",   name: "Commerce",   tagline: "Katalog / E-ticaret",      includes: { mobile: true, seo: true, perf: true }, canCommerce: true },
  { id: "enterprise", name: "Enterprise", tagline: "B2C / Özel proje",         includes: { mobile: true, seo: true, perf: true }, canCommerce: true },
];

export const BASE_PRICE: Record<TierId, number> = {
  lite: 12000,
  core: 25000,
  plus: 45000,
  commerce: 85000,
  enterprise: 140000,
};
