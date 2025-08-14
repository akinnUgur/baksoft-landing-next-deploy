"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import ImgSafe from "./ImgSafe";
import { CarouselItem, Feature } from "../lib/types";

export default function PackageCarousel({
  items,
  onPreview,
}: {
  items: CarouselItem[];
  onPreview?: (it: CarouselItem) => void;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Light moddaysa koyu, dark moddaysa açık yüzey kullan (ters mantık)
  const isDarkSurface = (mounted ? resolvedTheme : "light") === "light";
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 639px)"); // sm breakpoint altı
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const GAP = 16;
  const clones = 3;

  const [idx, setIdx] = useState(clones);
  const [anim, setAnim] = useState(true);
  const [cardW, setCardW] = useState(360);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const looped = useMemo(() => {
    const head = items.slice(-clones);
    const tail = items.slice(0, clones);
    return [...head, ...items, ...tail];
  }, [items]);

  const normalize = (i: number) => {
    const n = items.length;
    let k = (i - clones) % n;
    if (k < 0) k += n;
    return k;
  };

  useEffect(() => {
    const el = wrapRef.current?.querySelector("[data-card]") as HTMLElement | null;
    const measure = () => {
      if (!el) return;
      const w = Math.round(el.getBoundingClientRect().width);
      setCardW(w);
      setAnim(false);
      setIdx((x) => x);
      requestAnimationFrame(() => setAnim(true));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const tx = (i: number) => -(i * (cardW + GAP));

  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transition = anim
      ? "transform 420ms cubic-bezier(.22,.61,.36,1)"
      : "none";
    trackRef.current.style.transform = `translateX(${-(idx * (cardW + GAP))}px)`; // ✅ tx yok
  }, [idx, anim, cardW]); // bağımlılıklar aynı


  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const onEnd = () => {
      const n = items.length;
      if (idx >= n + clones) {
        setAnim(false);
        setIdx(idx - n);
        requestAnimationFrame(() => setAnim(true));
      }
      if (idx < clones) {
        setAnim(false);
        setIdx(idx + n);
        requestAnimationFrame(() => setAnim(true));
      }
    };
    node.addEventListener("transitionend", onEnd);
    return () => node.removeEventListener("transitionend", onEnd);
  }, [idx, items.length]);

  const next = () => setIdx((i) => i + 1);
  const prev = () => setIdx((i) => i - 1);

  const drag = useRef<{ startX: number; startTx: number; dragging: boolean }>({
    startX: 0,
    startTx: 0,
    dragging: false,
  });
  const onDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startTx: tx(idx), dragging: true };
    setAnim(false);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.dragging || !trackRef.current) return;
    const dx = e.clientX - drag.current.startX;
    trackRef.current.style.transform = `translateX(${drag.current.startTx + dx}px)`;
  };
  const onUp = (e: React.PointerEvent) => {
    if (!drag.current.dragging) return;
    drag.current.dragging = false;
    const dx = e.clientX - drag.current.startX;
    const step = Math.round(dx / (cardW + GAP));
    setAnim(true);
    setIdx((i) => i - step);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const curr = normalize(idx);
  const total = items.length;

  const bgDark =
    "radial-gradient(80% 60% at 0% 0%, rgba(56,189,248,0.12), transparent), radial-gradient(80% 60% at 100% 0%, rgba(168,85,247,0.12), transparent), linear-gradient(180deg, #0b1020, #0a0e18)";
  const bgLight =
    "radial-gradient(80% 60% at 0% 0%, rgba(56,189,248,0.25), transparent), radial-gradient(80% 60% at 100% 0%, rgba(168,85,247,0.25), transparent), linear-gradient(180deg, #ffffff, #f7f9ff)";

  const subtle = isDarkSurface ? "text-white/70" : "text-slate-600";
  const subtleDim = isDarkSurface ? "text-white/60" : "text-slate-500";
  const ctrlBtn =
    isDarkSurface
      ? "border-white/10 bg-white/5 hover:bg-white/10 text-white"
      : "border-black/10 bg-black/[0.04] hover:bg-black/[0.08] text-slate-800";

  const cardBox =
    isDarkSurface
      ? "border-white/10 bg-white/5 hover:bg-white/[0.08] text-white/90"
      : "border-black/10 bg-white hover:bg-slate-50 text-slate-900";

  const pillLive =
    isDarkSurface
      ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-200 hover:bg-cyan-400/20"
      : "border-cyan-600/30 bg-cyan-50 text-cyan-700 hover:bg-cyan-100";

  const btnPrimary =
    isDarkSurface
      ? "bg-cyan-400 text-[#0b1020] hover:brightness-110 active:brightness-95"
      : "bg-cyan-600 text-white hover:brightness-110 active:brightness-95";

  const btnGhost =
    isDarkSurface
      ? "border-white/15 text-white/90 hover:bg-white/10"
      : "border-black/10 text-slate-800 hover:bg-slate-100";

  return (
    <section
      className="relative"
      aria-label="Baksoft Paket Galerisi"
      style={{
        background: isDarkSurface ? bgDark : bgLight,
        color: isDarkSurface ? "#E6E8EE" : "#0b1220",
      }}
    >
      {/* Header: CONTAINER */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:pt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className={`text-[11px] uppercase tracking-[0.25em] ${subtleDim}`}>
              Baksoft • Paket Hub
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-semibold">Paket Galerisi</h2>
            <p className={`text-sm mt-1 ${subtle}`}>İstediğiniz tarza ve konsepte uyarlayabileceğimiz paketlerimizle tanışın.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-sm tabular-nums ${subtle}`}>
              {curr + 1} / {total}
            </div>
            <button onClick={prev} aria-label="Önceki" className={`h-10 w-10 rounded-xl border grid place-items-center ${ctrlBtn}`}>
              ‹
            </button>
            <button onClick={next} aria-label="Sonraki" className={`h-10 w-10 rounded-xl border grid place-items-center ${ctrlBtn}`}>
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Track: FULL-BLEED */}
      <div className="relative w-screen left-1/2 -ml-[50vw] right-1/2 -mr-[50vw] overflow-hidden">
        <div
          ref={wrapRef}
          className="mt-6 select-none px-4 sm:px-6 md:px-10"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div ref={trackRef} className="flex" style={{ gap: `${GAP}px`, willChange: "transform" }}>
            {looped.map((p, i) => (
              <article
                key={`${p.slug}-${i}`}
                data-card
                className={`group shrink-0 w-[82vw] sm:w-[340px] md:w-[360px] lg:w-[380px] rounded-2xl overflow-hidden border backdrop-blur-sm relative ${cardBox}`}
              >
                <div className="relative">
                  {p.cover.startsWith("css:") ? (
                    <div
                      className="relative w-full h-[180px] sm:h-[200px] flex items-center justify-center text-center"
                      style={{ background: p.cover.slice(4) }}
                    >
                      {/* Yazı katmanı */}
                      <div className="absolute inset-0 bg-black/30" /> {/* hafif karartma */}
                      <div className="relative z-10 px-3">
                        <h3 className="text-lg font-bold text-white drop-shadow">{p.title}</h3>
                        <p className="text-sm text-white/90 drop-shadow">{p.subtitle}</p>
                      </div>
                    </div>
                  ) : (
                    <ImgSafe
                      src={p.cover}
                      alt={p.title}
                      className="w-full h-[180px] sm:h-[200px] object-cover"
                    />
                  )}


                  <span
                    className={`absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full border ${isDarkSurface
                      ? "bg-black/60 border-white/10 text-white/90"
                      : "bg-white/90 border-black/10 text-slate-700"
                      }`}
                  >
                    {p.vibe}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">{p.title}</h3>
                      <p className={`text-sm leading-snug ${subtle}`}>{p.subtitle}</p>
                    </div>
                    <a href={p.slug} className={`text-xs rounded-lg border px-2 py-1 ${pillLive}`}>
                      Canlı Aç
                    </a>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.chips.map((c) => (
                      <span key={c} className={chipClass(c, isDarkSurface)}>
                        {FEATURE_LABEL[c]}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
  {!isMobile && (
    <button onClick={() => onPreview?.(p)} className={`h-10 px-4 rounded-xl font-medium ${btnPrimary}`}>
      Önizle
    </button>
  )}
  <a href={p.slug} className={`h-10 px-4 rounded-xl border grid place-items-center ${btnGhost}`}>
    Detay
  </a>
</div>

                </div>

                <div
                  className="pointer-events-none absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition"
                  style={{
                    background:
                      "radial-gradient(40% 30% at 30% 0%, rgba(56,189,248,0.18), transparent), radial-gradient(50% 40% at 100% 0%, rgba(168,85,247,0.16), transparent)",
                  }}
                />
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-10 sm:pb-14" />
    </section>
  );
}

function chipClass(t: Feature, darkSurface: boolean) {
  const base = "px-2 py-1 rounded-full text-[11px] border";
  if (darkSurface) {
    // Light mod → koyu zemin
    const mapDark: Record<Feature, string> = {
      landing: "border-sky-400/40 bg-sky-400/10 text-sky-200",
      pages_4_10: "border-violet-400/40 bg-violet-400/10 text-violet-200",
      commerce: "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
      booking: "border-amber-400/40 bg-amber-400/10 text-amber-200",
      gallery: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-200",
      blog: "border-cyan-400/40 bg-cyan-400/10 text-cyan-200",
      membership: "border-rose-400/40 bg-rose-400/10 text-rose-200",
      cart: "border-lime-400/40 bg-lime-400/10 text-lime-200",
    };
    return `${base} ${mapDark[t]}`;
  } else {
    // Dark mod → açık zemin
    const mapLight: Record<Feature, string> = {
      landing: "border-sky-300 bg-sky-50 text-sky-700",
      pages_4_10: "border-violet-300 bg-violet-50 text-violet-700",
      commerce: "border-emerald-300 bg-emerald-50 text-emerald-700",
      booking: "border-amber-300 bg-amber-50 text-amber-700",
      gallery: "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-700",
      blog: "border-cyan-300 bg-cyan-50 text-cyan-700",
      membership: "border-rose-300 bg-rose-50 text-rose-700",
      cart: "border-lime-300 bg-lime-50 text-lime-700",
    };
    return `${base} ${mapLight[t]}`;
  }
}

const FEATURE_LABEL: Record<Feature, string> = {
  landing: "Landing",
  pages_4_10: "4–10 Sayfa",
  commerce: "E-ticaret",
  booking: "Rezervasyon",
  gallery: "Galeri",
  blog: "Blog",
  membership: "Üyelik",
  cart: "Sepet",
};
