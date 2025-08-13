'use client';

import { useEffect, useMemo, useState } from 'react';
import ImgSafe from './ImgSafe';
import { CarouselItem, Feature, PackageItem } from '../lib/types';
import { FEATURE_LABEL } from '../lib/data';


export default function PreviewOverlay({
  preview,
  meta,
  onClose,
}: {
  preview: PackageItem | null;
  meta: CarouselItem | null;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [frameFailed, setFrameFailed] = useState(false);
  const frameSrc = useMemo(() => {
    if (!preview) return '';
    try {
      return new URL(preview.slug, window.location.origin).toString();
    } catch {
      return preview.slug;
    }
  }, [preview?.slug]);

  useEffect(() => {
    if (!preview) return;
    setLoading(true);
    setFrameFailed(false);
    const id = window.setTimeout(() => setFrameFailed(true), 3500);
    return () => window.clearTimeout(id);
  }, [frameSrc]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!preview) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10" onClick={onClose} />
      <div
        className="absolute inset-x-0 top-10 mx-auto max-w-6xl rounded-2xl border bg-white shadow-2xl overflow-hidden z-20 will-change-transform"
        style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)', transform: 'translateZ(0)' }}
      >
        <div className="h-14 px-4 border-b flex items-center justify-between"
             style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}>
          <div>
            <div className="text-sm text-slate-500">Önizleme</div>
            <div className="font-semibold">{preview.title}</div>
          </div>
          <button onClick={onClose} className="h-9 px-3 rounded-lg border text-sm"
                  style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}>
            Kapat
          </button>
        </div>

        <div className="grid md:grid-cols-12 gap-0">
          <div className="md:col-span-8 relative" style={{ transform: 'translateZ(0)' }}>
            {loading && !frameFailed && (
              <div className="absolute inset-0 grid place-items-center bg-white/60">
                <div className="h-12 w-12 rounded-full border-2 border-slate-300 border-t-transparent animate-spin" />
              </div>
            )}

            <iframe
              key={frameSrc}
              src={frameSrc}
              className="w-full h-[70vh]"
              loading="lazy"
              onLoad={() => { setLoading(false); setFrameFailed(false); }}
              title={`Önizleme: ${preview?.title || 'Önizleme'}`}
            />

            {frameFailed && (
              <div className="absolute inset-0 grid place-items-center bg-white/90 text-center p-6">
                <div className="max-w-sm">
                  <div className="text-sm text-slate-600">Önizleme bu tarayıcıda gösterilemedi.</div>
                  <a
                    href={preview.slug}
                    target="_blank"
                    className="mt-3 inline-flex h-10 px-4 rounded-xl bg-indigo-600 text-white items-center justify-center"
                  >
                    Yeni sekmede aç
                  </a>
                </div>
              </div>
            )}
          </div>

          <aside className="md:col-span-4 p-0 border-l" style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}>
            <div className="relative">
              <ImgSafe src={meta?.cover} alt={preview.title} className="w-full h-40 object-cover" />
              {meta?.vibe && (
                <span className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-black/60 text-white">{meta.vibe}</span>
              )}
            </div>
            <div className="p-4">
              <div className="text-sm text-slate-600">Önerilen kullanım</div>
              <div className="mt-1 text-sm">{preview.subtitle}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {(meta?.chips ?? preview.features).map((f) => (
                  <span
                    key={typeof f === 'string' ? f : String(f)}
                    className="px-2 py-1 rounded-full text-[11px] bg-white border"
                    style={{ borderColor: 'color-mix(in oklab, #000 12%, transparent)' }}
                  >
                    {FEATURE_LABEL[f as Feature]}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
