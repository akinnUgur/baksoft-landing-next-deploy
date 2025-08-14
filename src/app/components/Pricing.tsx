'use client';

import { useState } from 'react';
import { EstimatorConfig, Tier } from '../lib/types';
import { estimatePrice, recommendTier, TL } from '../lib/pricing';
import { BASE_PRICE, TIERS } from '../lib/data';


export default function Pricing() {
  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(180deg,#0b1220,#0f172a)' }}>
      <div className="p-6 md:p-10 text-white/90">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold font-serif">Fiyatlandırma</h2>
            <p className="mt-1 text-white/70 max-w-2xl">Mobil/SEO/Performans tüm planlarda dahil. Soldan kapsamı seç; önerilen plan ve tahmini aralığı gör.</p>
          </div>
          <a href="#contact" className="hidden md:grid h-10 px-4 rounded-xl bg-emerald-500 text-slate-900 place-items-center">Hızlı Teklif</a>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 rounded-2xl p-5 border/10 bg-white/5">
            <div className="text-sm text-white/80">Mini Konfigüratör</div>
            <PricingEstimatorDark />
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            <PricingTiersDark />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Estimator ===== */

function PricingEstimatorDark() {
  const [cfg, setCfg] = useState<EstimatorConfig>({ pages: 6, commerce: false, booking: false, blog: true, i18n: false });
  const { low, high } = estimatePrice(cfg);
  const rec = recommendTier(cfg);
  return (
    <div className="mt-3 space-y-4">
      <div>
        <div className="flex items-center justify-between text-sm">
          <span>Sayfa sayısı</span>
          <b className="text-white">{cfg.pages}</b>
        </div>
        <input type="range" min={1} max={15} value={cfg.pages} onChange={(e) => setCfg({ ...cfg, pages: Number(e.target.value) })} className="w-full" />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <ToggleDark label="E-ticaret" checked={cfg.commerce} onChange={(v) => setCfg({ ...cfg, commerce: v })} />
        <ToggleDark label="Rezervasyon" checked={cfg.booking} onChange={(v) => setCfg({ ...cfg, booking: v })} />
        <ToggleDark label="Blog/SSS" checked={cfg.blog} onChange={(v) => setCfg({ ...cfg, blog: v })} />
        <ToggleDark label="Çok dilli" checked={cfg.i18n} onChange={(v) => setCfg({ ...cfg, i18n: v })} />
      </div>
      <div className="rounded-xl border border-white/10 p-3 bg-white/5">
        <div className="text-xs text-white/60">Önerilen Plan</div>
        <div className="text-lg font-semibold mt-0.5 text-white">{TIERS.find((t) => t.id === rec)?.name}</div>
        <div className="text-xs text-white/70 mt-1">
          Tahmini başlangıç: <b>{TL(low)}</b> – <b>{TL(high)}</b>
        </div>
        <div className="text-[11px] text-white/50 mt-1">* Demo aralık; kapsam/entegrasyonlara göre değişir.</div>
      </div>
    </div>
  );
}

function ToggleDark({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`h-10 px-3 rounded-xl border text-left flex items-center justify-between ${checked ? 'bg-emerald-600/20' : 'bg-white/5'} border-white/10 text-white/90`}
    >
      <span>{label}</span>
      <span className={`h-5 w-9 rounded-full grid items-center ${checked ? 'bg-emerald-500' : 'bg-white/30'}`}>
        <span className={`h-4 w-4 rounded-full bg-white transition ${checked ? 'translate-x-4' : 'translate-x-1'}`} />
      </span>
    </button>
  );
}

/* ===== Tiers ===== */

function PricingTiersDark() {
  const [cfg] = useState<EstimatorConfig>({ pages: 6, commerce: false, booking: false, blog: true, i18n: false });
  const rec = recommendTier(cfg);
  return (
    <>
      {TIERS.map((t) => (
        <TierDark key={t.id} tier={t} highlight={t.id === rec} />
      ))}
    </>
  );
}

function TierDark({ tier, highlight }: { tier: Tier; highlight?: boolean }) {
  return (
    <div className={`relative rounded-2xl p-5 border border-white/10 bg-white/5 text-white ${highlight ? 'ring-2 ring-emerald-400/60' : ''}`}>
      {highlight && <div className="absolute -top-3 right-4 text-[11px] px-2 py-1 rounded-full bg-emerald-500 text-white">Önerilen</div>}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/60">Plan</div>
          <div className="text-xl font-semibold">{tier.name}</div>
          <div className="text-sm text-white/70">{tier.tagline}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold">{TL(BASE_PRICE[tier.id])}</div>
          <div className="text-[11px] text-white/60">Başlangıç</div>
        </div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-white/90">
        <li className="flex items-center gap-2"><BadgeDark/>Mobil uyumlu</li>
        <li className="flex items-center gap-2"><BadgeDark/>SEO temel şema</li>
        <li className="flex items-center gap-2"><BadgeDark/>Performans 90+ hedefi</li>
        {tier.canCommerce && <li className="flex items-center gap-2 text-xs text-white/70">E-ticaret yapılabilir</li>}
      </ul>
      <div className="mt-4 flex gap-2">
        <a href="#contact" className="h-10 px-3 rounded-xl bg-emerald-500 text-slate-900 text-sm grid place-items-center font-semibold">Teklif al</a>
        <a href="#packages" className="h-10 px-3 rounded-xl bg-white/10 text-white text-sm grid place-items-center border border-white/10">Paketleri gör</a>
      </div>
    </div>
  );
}

function BadgeDark() {
  return <span className="h-5 w-5 rounded-full grid place-items-center bg-emerald-500 text-slate-900">✓</span>;
}
