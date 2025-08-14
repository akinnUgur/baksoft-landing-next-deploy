"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PageTransition } from "@/app/components/common/PageTransition";
import Hero from "@/app/components/sections/Hero";
import WhyBaksoft from "@/app/components/homePage/WhyUs";
import HowWeWork from "@/app/components/homePage/HowWork";
import PackageCarousel from "@/app/components/PackageCarousel";
import { CarouselItem } from "../lib/types";
import { CAROUSEL_ITEMS } from "../lib/data";


type CarouselItemLite = { slug: string; title: string };

export default function HomePageClient({ items }: { items?: CarouselItemLite[] }) {
  // /paket → /paketler/paket... dönüştür
  const normalizeSlug = (s: string) => {
    if (!s) return s;
    if (s.startsWith("/paketler/")) return s;
    if (s.startsWith("/paket")) return `/paketler${s}`;
    return s;
  };

  // Full veriyi slug → item map’ine çevir
  const fullBySlug = useMemo(() => {
    const m = new Map<string, CarouselItem>();
    for (const it of CAROUSEL_ITEMS) m.set(it.slug, it);
    return m;
  }, []);

  // Eğer parent "lite" item’lar veriyorsa full veriyle eşle; yoksa data.ts’teki default listeyi kullan
  const normalizedItems = useMemo<CarouselItem[]>(() => {
    if (!items || items.length === 0) return CAROUSEL_ITEMS;

    return items.map((lite) => {
      const slug = normalizeSlug(lite.slug);
      const found = fullBySlug.get(slug);
      if (found) return found;

      // Fallback: bulunamazsa güvenli varsayılanlar
      return {
        slug,
        title: lite.title,
        subtitle: "",
        vibe: "minimal",
        cover: "/default-icons/mobil.webp",
        chips: [],
      } as unknown as CarouselItem;
    });
  }, [items, fullBySlug]);

  // Önizleme modal
  const [preview, setPreview] = useState<{ slug: string; title: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [frameFailed, setFrameFailed] = useState(false);
  const frameTimerRef = useRef<number | null>(null);

  // Modal açıkken body scroll kilidi + ESC
  useEffect(() => {
    if (!preview) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPreview(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [preview]);

  // Yeni önizleme: loading + hata reset
  useEffect(() => {
    if (preview) {
      setLoading(true);
      setFrameFailed(false);
    }
  }, [preview]);

  return (
    <main
      className="min-h-[100dvh]"
      style={{
        color: "#0b1220",
        background:
          "radial-gradient(60% 40% at 12% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,0.06), transparent), var(--page-bg)",
      }}
    >
      {/* Deco orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.25), transparent)" }}
        />
        <div
          className="absolute top-1/3 -right-20 h-80 w-80 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.22), transparent)" }}
        />
      </div>

      <PageTransition>
        <Hero />

        {/* Paketler */}
        <section>
          <div>
            <PackageCarousel
              items={normalizedItems} // ✅ artık CarouselItem[]
              onPreview={(it) => setPreview({ slug: it.slug, title: it.title })}
            />
          </div>
        </section>

        <WhyBaksoft />
        <HowWeWork />

        {/* Quick View Modal */}
        {preview && (
          <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setPreview(null)}
            />
            <div
              className="absolute inset-x-0 top-10 mx-auto max-w-6xl rounded-2xl border bg-white shadow-2xl overflow-hidden"
              style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
            >
              {/* Header */}
              <div
                className="h-14 px-4 border-b flex items-center justify-between bg-white/80 backdrop-blur"
                style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] bg-slate-900 text-white">
                    Önizleme
                  </span>
                  <div className="font-semibold text-slate-900">{preview.title}</div>
                </div>

                <button
                  onClick={() => {
                    if (frameTimerRef.current) {
                      window.clearTimeout(frameTimerRef.current);
                      frameTimerRef.current = null;
                    }
                    setPreview(null);
                  }}
                  className="h-9 px-3 rounded-lg border text-sm hover:bg-slate-50"
                  style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
                >
                  Kapat
                </button>
              </div>

              {/* iFrame alanı */}
              <div className="relative w-full h-[70vh]">
                {loading && !frameFailed && (
                  <div className="absolute inset-0 grid place-items-center bg-white/60">
                    <div className="h-12 w-12 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
                  </div>
                )}

                <iframe
                  key={preview.slug}
                  src={preview.slug}
                  className="w-full h-[70vh]"
                  loading="eager"
                  onLoad={() => {
                    setLoading(false);
                    setFrameFailed(false);
                    if (frameTimerRef.current) {
                      window.clearTimeout(frameTimerRef.current);
                      frameTimerRef.current = null;
                    }
                  }}
                  onError={() => {
                    setLoading(false);
                    setFrameFailed(true);
                    if (frameTimerRef.current) {
                      window.clearTimeout(frameTimerRef.current);
                      frameTimerRef.current = null;
                    }
                  }}
                  title={`Önizleme: ${preview.title}`}
                />

                {frameFailed && (
                  <div className="absolute inset-0 grid place-items-center bg-white/90 text-center p-6">
                    <div className="max-w-sm">
                      <div className="text-sm text-slate-600">
                        Önizleme bu tarayıcıda gösterilemedi.
                      </div>
                      <a
                        href={preview.slug}
                        target="_blank"
                        className="mt-3 inline-flex h-10 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white items-center justify-center"
                      >
                        Yeni sekmede aç
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Alt bar */}
              <div
                aria-hidden
                className="h-px bg-gradient-to-r from-indigo-500/30 via-emerald-500/30 to-cyan-400/30"
              />
            </div>
          </div>
        )}
      </PageTransition>

      <style jsx global>{`
        :root { --page-bg: #f7f9ff; }
        .dark { --page-bg: #0b1220; }
      `}</style>
    </main>
  );
}
