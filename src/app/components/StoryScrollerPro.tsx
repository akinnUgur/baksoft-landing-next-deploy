'use client';

import { useEffect, useRef, useState } from 'react';
import ImgSafe from './ImgSafe';
import { Story } from '../lib/types';


export default function StoryScrollerPro({ stories }: { stories: Story[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const handle = () => {
      const cards = stories.map(s => cardRefs.current[s.id]).filter(Boolean) as HTMLElement[];
      if (!cards.length) return;

      const mid = window.innerHeight / 2;
      let best = 0, bestDiff = Infinity;
      cards.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - mid);
        if (d < bestDiff) { bestDiff = d; best = i; }
      });
      setActive(best);

      const first = cards[0]!.getBoundingClientRect();
      const last  = cards[cards.length - 1]!.getBoundingClientRect();
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      const firstTopAbs = scrollY + first.top;
      const lastBottomAbs = scrollY + last.bottom;

      const start = firstTopAbs - window.innerHeight * 0.25;
      const end   = lastBottomAbs - window.innerHeight * 0.75;

      const t = (scrollY - start) / Math.max(1, end - start);
      const pct = Math.min(1, Math.max(0, t)) * 100;
      setProg(Math.round(pct));
    };

    const onScroll = () => requestAnimationFrame(handle);
    handle();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [stories]);

  const scrollTo = (id: string) => {
    const el = cardRefs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="stories" className="mx-auto max-w-7xl px-4 py-12 md:py-16" ref={ref}>
      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Sticky timeline */}
        <aside className="md:col-span-4 sticky top-24 self-start">
          <div className="rounded-2xl border p-5 bg-white/80 backdrop-blur" style={{borderColor:'color-mix(in oklab, #000 12%, transparent)'}}>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Hizmet Hikâyeleri</div>
            <h3 className="mt-1 text-xl font-semibold">Nasıl çalışıyoruz?</h3>

            <div className="relative mt-4">
              <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-slate-200" />
              <div className="absolute left-[11px] top-0 w-[2px] bg-indigo-600" style={{ height: `${prog}%` }} />
              <ul className="space-y-3 relative">
                {stories.map((s, i) => (
                  <li key={s.id} className="pl-8 flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`h-5 w-5 rounded-full border grid place-items-center text-[10px] ${
                        i === active ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500'
                      }`}
                      style={{borderColor:'color-mix(in oklab, #000 12%, transparent)'}}
                    >
                      {i + 1}
                    </span>
                    <button
                      onClick={() => scrollTo(s.id)}
                      className={`text-sm ${i === active ? 'font-semibold text-slate-900' : 'text-slate-600 hover:text-slate-800'}`}
                    >
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-xs text-slate-600">İlerleme: {prog}%</div>
            </div>
          </div>
        </aside>

        {/* Cards */}
        <div className="md:col-span-8 space-y-8">
          {stories.map((s, i) => (
            <article
              key={s.id}
              id={`story-${s.id}`}
              data-index={i}
              ref={(el) => (cardRefs.current[s.id] = el)}
              className={`rounded-3xl overflow-hidden border bg-white pkg-tilt transition scroll-mt-24 ${i === active ? 'ring-2 ring-indigo-500/70' : ''}`}
              style={{borderColor:'color-mix(in oklab, #000 12%, transparent)'}}
            >
              <div className="relative">
                <ImgSafe src={s.cover} alt={s.title} className="w-full h-56 md:h-72 object-cover" />
                <div className="absolute left-4 top-4 px-2 py-1 rounded-full text-[11px] bg-white/90 border" style={{borderColor:'color-mix(in oklab, #000 12%, transparent)'}}>
                  {s.kicker}
                </div>
              </div>

              <div className="p-5 md:p-6">
                <h4 className="text-xl md:text-2xl font-semibold">{s.title}</h4>
                <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                  {s.steps.map((st, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="h-6 w-6 rounded-lg border grid place-items-center" style={{borderColor:'color-mix(in oklab, #000 12%, transparent)'}}>{st.icon || '•'}</span>
                      <div>
                        <div className="font-medium">{st.title}</div>
                        <div className="text-slate-700">{st.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
