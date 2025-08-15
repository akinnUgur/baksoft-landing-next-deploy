'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import type { CarouselItem, PackageItem } from '../lib/types';
import HeroPrime from '../components/HeroPrime';
// import Pricing from '../components/Pricing';
import { CAROUSEL_ITEMS, PACKAGES, STORIES } from '../lib/data';

// Ağır parçaları split edelim:
const PackageCarousel = dynamic(() => import('../components/PackageCarousel'), {
  ssr: false,
  loading: () => (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="h-40 rounded-2xl border border-slate-200/40 bg-white/70 animate-pulse" />
    </section>
  ),
});

const StoryScrollerPro = dynamic(() => import('../components/StoryScrollerPro'), {
  ssr: false,
  loading: () => (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="h-24 rounded-2xl border border-slate-200/40 bg-white/70 animate-pulse" />
    </section>
  ),
});

const PreviewOverlay = dynamic(() => import('../components/PreviewOverlay'), {
  ssr: false,
});

export default function HomeClient() {
  const [preview, setPreview] = useState<PackageItem | null>(null);
  const [previewMeta, setPreviewMeta] = useState<CarouselItem | null>(null);

  // küçük optimizasyon: callback memo
  const handlePreview = useCallback((it: CarouselItem) => {
    const match = PACKAGES.find((p) => p.slug === it.slug) ?? PACKAGES[0];
    setPreviewMeta(it);
    setPreview(match);
  }, []);

  return (
    <main
      className="min-h-[100dvh] w-full overflow-x-hidden"
      style={{
        color: '#0b1220',
        background:
          'radial-gradient(60% 40% at 12% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,0.06), transparent), var(--page-bg)',
      }}
      aria-label="Baksoft Prime paketler ana sayfa"
    >
      {/* Deco orbs (global) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{
            background:
              'radial-gradient(closest-side, rgba(99,102,241,0.25), transparent)',
          }}
        />
        <div
          className="absolute top-1/3 -right-20 h-80 w-80 rounded-full blur-3xl opacity-25"
          style={{
            background:
              'radial-gradient(closest-side, rgba(16,185,129,0.22), transparent)',
          }}
        />
      </div>

      {/* HERO */}
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading" className="sr-only">
          Baksoft Prime: Özelleştirilebilir Next.js paketleri
        </h1>
        <HeroPrime />
      </section>

      {/* PACKAGE CAROUSEL */}
      <section id="packages" className="px-0 py-8 md:py-12" aria-labelledby="pkg-heading">
        <h2 id="pkg-heading" className="sr-only">Paket galerisi</h2>
        <PackageCarousel items={CAROUSEL_ITEMS} onPreview={handlePreview} />
      </section>

      {/* STORIES */}
      <section aria-labelledby="stories-heading">
        <h2 id="stories-heading" className="sr-only">Örnek hikayeler</h2>
        <StoryScrollerPro stories={STORIES} />
      </section>

      {/* PRICING
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-12 md:py-16" aria-labelledby="pricing-heading">
        <h2 id="pricing-heading" className="sr-only">Fiyatlandırma</h2>
        <Pricing />
      </section> */}

      {/* PREVIEW OVERLAY (Quick View) */}
      <PreviewOverlay
        preview={preview}
        meta={previewMeta}
        onClose={() => setPreview(null)}
      />

      <style jsx global>{`
        :root { --page-bg: #f7f9ff; }
        .dark { --page-bg: #0b1220; }
        html { scroll-behavior: smooth; }

        .pkg-tilt { transition: transform .25s ease, box-shadow .25s ease }
        .pkg-tilt:hover { transform: translateY(-3px) rotate3d(1,1,0,1deg) }

        @media (prefers-reduced-motion: reduce) {
          .pkg-tilt { transition: none }
          .pkg-tilt:hover { transform: none }
          .hero-slide { transition: none }
        }
      `}</style>
    </main>
  );
}
