'use client';

import { useMemo } from 'react';
import { Code, Smartphone, Settings, Brain, Headphones } from 'lucide-react';
import { PageTransition } from '@/app/components/common/PageTransition';

import WebDevelopment from '@/app/components/services/WebDevelopment';
import MobileDevelopment from '@/app/components/services/MobileDevelopment';
import CustomSoftware from '@/app/components/services/CustomSoftware';
import AiAndData from '@/app/components/services/AiAndData';
import Consulting from '@/app/components/services/Consulting';

const NAV = [
  { id: 'web',    title: 'Web Geliştirme',              icon: Code },
  { id: 'mobil',  title: 'Mobil Uygulama Geliştirme',   icon: Smartphone },
  { id: 'ozel',   title: 'Özel Yazılım Geliştirme',     icon: Settings },
  { id: 'ai',     title: 'Yapay Zekâ ve Veri Bilimi',   icon: Brain },
  { id: 'destek', title: 'Danışmanlık ve Teknik Destek',icon: Headphones },
];

export default function ServicesPage() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main
      className="min-h-[100dvh]"
      style={{
        color: '#0b1220',
        background:
          'radial-gradient(60% 40% at 12% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,0.06), transparent), var(--page-bg)',
      }}
    >
      {/* global deco orbs */}
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

      <PageTransition>
        {/* HERO */}
        <section className="mx-auto max-w-7xl px-4 pt-14 md:pt-20 pb-8 md:pb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] px-2 py-1 rounded bg-slate-900 text-white">
              Baksoft • Hizmetler
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-[1.05] dark:text-text-dark">
              İhtiyaca uygun,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">
                ürünleşmiş çözümler
              </span>
              .
            </h1>
            <p className="mt-4 text-lg text-slate-700 max-w-2xl dark:text-text-dark">
              Web, mobil, özel yazılım, yapay zekâ ve danışmanlığı tek akışta topladık. Aşağıdan
              başlığa tıkla, ilgili bölüme kay.
            </p>
          </div>

          {/* Sticky/quick nav */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {NAV.map(({ id, title, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group relative rounded-2xl border bg-white/70 backdrop-blur p-4 hover:bg-white"
                style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition"
                  style={{
                    background:
                      'radial-gradient(40% 30% at 30% 0%, rgba(56,189,248,0.18), transparent), radial-gradient(50% 40% at 100% 0%, rgba(168,85,247,0.16), transparent)',
                  }}
                />
                <div className="relative flex items-center gap-3">
                  <span className="h-10 w-10 rounded-xl grid place-items-center bg-gradient-to-br from-indigo-500 to-emerald-500 text-white shadow-inner">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-slate-900">{title}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CONTENT SECTIONS (tek sayfa akış) */}
        <section id="web" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <WebDevelopment />
        </section>

        <section id="mobil" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <MobileDevelopment />
        </section>

        <section id="ozel" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <CustomSoftware />
        </section>

        <section id="ai" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <AiAndData />
        </section>

        <section id="destek" className="mx-auto max-w-7xl px-4 py-6 md:py-8">
          <Consulting />
        </section>

        {/* CTA */}
        
      </PageTransition>

      <style jsx global>{`
        :root { --page-bg: #f7f9ff; }
        .dark { --page-bg: #0b1220; }
        html { scroll-behavior: smooth; }
      `}</style>
    </main>
  );
}
