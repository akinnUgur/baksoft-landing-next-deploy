'use client';

import {   useState } from 'react';
import { CarouselItem, PackageItem } from '../lib/types';
import PackageCarousel from '../components/PackageCarousel';
import HeroPrime from '../components/HeroPrime';
import StoryScrollerPro from '../components/StoryScrollerPro';
import Pricing from '../components/Pricing';
import { CAROUSEL_ITEMS, PACKAGES, STORIES } from '../lib/data';
import PreviewOverlay from '../components/PreviewOverlay';

export default function Page() {
  
  const [preview, setPreview] = useState<PackageItem | null>(null);
  const [previewMeta, setPreviewMeta] = useState<CarouselItem | null>(null);

  return (
    <main
   className="min-h-[100dvh] w-full overflow-x-hidden"
    style={{
      color: '#0b1220',
      background:
        'radial-gradient(60% 40% at 12% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,0.06), transparent), var(--page-bg)',
    }}
  >
      {/* Deco orbs (global) */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.25), transparent)' }}
        />
        <div
          className="absolute top-1/3 -right-20 h-80 w-80 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,0.22), transparent)' }}
        />
      </div>

      {/* HERO */}
      <HeroPrime />

      {/* PACKAGE CAROUSEL */}
      <section id="packages" className="px-0 py-8 md:py-12">
        <PackageCarousel
          items={CAROUSEL_ITEMS}
          onPreview={(it) => {
            const match = PACKAGES.find((p) => p.slug === it.slug) ?? PACKAGES[0];
            setPreviewMeta(it);
            setPreview(match);
          }}
        />
      </section>

      {/* STORIES */}
      <StoryScrollerPro stories={STORIES} />

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <Pricing />
      </section>

      {/* CONTACT
      <section id="contact" className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div
          className="rounded-2xl border p-6 bg-white/80 backdrop-blur grid md:grid-cols-2 gap-6"
          style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Hazır mısın?</div>
            <h3 className="text-2xl font-semibold mt-1">Demonu gönderelim, kapsamı netleştirelim.</h3>
            <p className="text-slate-600 mt-2">
              Her paket her sektöre uyarlanır. İhtiyacını belirt, 24 saat içinde dönüş yapalım.
            </p>
          </div>
          <div className="flex items-end gap-2">
            <a href="mailto:hello@baksoft" className="h-11 px-5 rounded-xl bg-indigo-600 text-white grid place-items-center">
              E-posta
            </a>
            <a
              href="https://wa.me/"
              target="_blank"
              className="h-11 px-5 rounded-xl border grid place-items-center hover:bg-white"
              style={{ borderColor: 'color-mix(in oklab, #000 15%, transparent)' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section> */}

      {/* PREVIEW OVERLAY (Quick View) */}
      <PreviewOverlay preview={preview} meta={previewMeta} onClose={() => setPreview(null)} />

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
