'use client';

import { useState } from 'react';
import ImgSafe from './ImgSafe';
import Image from 'next/image';
type Mode = 'landing' | 'corporate' | 'commerce' | 'b2c';

export default function HeroPrime() {
  const [mode] = useState<Mode>('b2c'); // B2C başlasın, değişmesin
  const idx = { landing: 0, corporate: 1, commerce: 2, b2c: 3 }[mode];

  return (
    <section
      id="hero"
      className="relative"
      style={{
        background:
          'radial-gradient(60% 40% at 12% 0%, rgba(99,102,241,0.06), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,0.06), transparent)',
      }}
    >
      {/* Soft deco orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-20 h-72 w-72 rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(closest-side, rgba(99,102,241,0.22), transparent)' }}
        />
        <div
          className="absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,0.20), transparent)' }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20 grid md:grid-cols-12 gap-10 items-center">
        {/* Copy */}
        <div className="md:col-span-6">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] px-2 py-1 rounded bg-slate-900 text-white">
            Baksoft <span className="opacity-70">•</span> Ürünleşmiş Web
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-semibold leading-[1.05] text-slate-900 dark:text-text-dark">
            Paket değil, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">hızlandırıcı</span>.
          </h1>

          <p className="mt-4 text-lg text-slate-700 max-w-2xl dark:text-text-dark">
            Onlarca demo, yüzlerce varyasyon. Landing’den kurumsala, e-ticaretten B2C entegrasyonlara: mobil, SEO ve performans
            standart. <b>Her tasarım her sektöre</b> uyarlanır.
          </p>

          {/* Segmented switch */}
          <div
            className="mt-6 w-full rounded-2xl p-1 border bg-white/80 backdrop-blur"
            style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}
            role="tablist"
            aria-label="Önizleme modu"
          >
            <div className="relative grid grid-cols-4 gap-1">
              <div
                className="absolute inset-y-1 w-[calc(25%-4px)] rounded-xl bg-slate-900 transition-transform hero-slide"
                style={{ transform: `translateX(calc(${idx} * 100% + ${idx * 4}px))` }}
                aria-hidden
              />
              {([
                ['landing', 'Landing'],
                ['corporate', 'Kurumsal'],
                ['commerce', 'E-ticaret'],
                ['b2c', 'B2C'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={mode === key}
                  disabled={mode !== key} // diğerlerine tıklanmasın
                  className={`h-10 rounded-xl text-sm transition flex items-center justify-center ${
                    mode === key
                      ? 'text-white'
                      : 'hover:bg-slate-50 text-slate-400 cursor-not-allowed'
                  }`}
                  style={{ zIndex: 1 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#packages"
              className="h-11 px-5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm flex items-center justify-center"
            >
              Paketleri keşfet
            </a>
            {/* <a
              href="#pricing"
              className="h-11 px-5 rounded-xl border hover:bg-slate-50 dark:text-white flex items-center justify-center"
              style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}
            >
              Fiyatlandırma
            </a> */}
          </div>

          <div className="mt-8 text-xs text-slate-500">
            Referans konseptler: <span className="inline-flex gap-3 opacity-90">
              <span className="font-medium text-slate-700">Terra&Sea</span>
              <span className="font-medium text-slate-700">Aurex Rent</span>
              <span className="font-medium text-slate-700">Nova Clinic</span>
              <span className="font-medium text-slate-700">AntalyaStay</span>
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="md:col-span-6">
          <div className="relative isolate">
            <div
              className="pointer-events-none absolute -inset-3 rounded-[28px] opacity-60 z-0"
              style={{
                background:
                  'radial-gradient(40% 30% at 30% 0%, rgba(99,102,241,.22), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,.18), transparent)',
              }}
            />
            <div
              className="relative z-10 rounded-[24px] border bg-white shadow-[0_40px_80px_-32px_rgba(2,6,23,0.25)] overflow-hidden"
              style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}
            >
              <div
                className="h-10 px-4 border-b flex items-center gap-2"
                style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="ml-3 text-xs text-slate-500">Önizleme • {modeLabel(mode)}</div>
              </div>

              {/* Web görsel */}
              {/* Web görsel (TEST) */}
<div className="relative bg-black rounded-[24px] overflow-hidden">
  <Image
    src="/onizleme-web.webp"     // /public/onizleme-web.webp olmalı
    alt="Önizleme Web"
    width={1600}
    height={900}
    className="w-full h-auto object-contain"
    priority
  />
</div>

            </div>

            {/* Mobil görsel */}
            <div
              className="hidden lg:block absolute -right-4 bottom-4 w-32 rounded-3xl border bg-white shadow-xl overflow-hidden animate-float z-20"
              style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}
            >
              <div className="h-6 border-b" style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }} />
              <ImgSafe
                src="/onizleme-mobil.webp"
                alt="Önizleme Mobil"
                className="w-full h-52 object-cover object-top bg-black"
                unoptimized // ⬅ geçici çözüm
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float { 0% { transform: translateY(0) } 50% { transform: translateY(-6px) } 100% { transform: translateY(0) } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes hero-fade { from { opacity: .0; transform: scale(1.01) } to { opacity: 1; transform: scale(1) } }
        .animate-hero-fade { animation: hero-fade .45s ease forwards; }
        @media (prefers-reduced-motion: reduce){
          .animate-float{ animation: none }
          .animate-hero-fade{
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

function modeLabel(m: Mode) {
  if (m === 'landing') return 'One-Page Landing';
  if (m === 'corporate') return 'Kurumsal 4–10 Sayfa';
  if (m === 'commerce') return 'E-ticaret';
  return 'B2C / Özel Proje';
}

