"use client";

import { Code, Smartphone, Settings, Brain, Headphones, Mail } from "lucide-react";
import WebDevelopment from "../services/WebDevelopment";
import MobileDevelopment from "../services/MobileDevelopment";
import CustomSoftware from "../services/CustomSoftware";
import AiAndData from "../services/AiAndData";
import Consulting from "../services/Consulting";

const servicesNav = [
  { id: "web", title: "Web Geliştirme", icon: <Code className="w-6 h-6" /> },
  { id: "mobil", title: "Mobil Uygulama Geliştirme", icon: <Smartphone className="w-6 h-6" /> },
  { id: "ozel", title: "Özel Yazılım Geliştirme", icon: <Settings className="w-6 h-6" /> },
  { id: "ai", title: "Yapay Zekâ ve Veri Bilimi", icon: <Brain className="w-6 h-6" /> },
  { id: "destek", title: "Danışmanlık ve Teknik Destek", icon: <Headphones className="w-6 h-6" /> },
  { id: "iletisim", title: "İletişim", icon: <Mail className="w-6 h-6" />, external: true, href: "/contact" },
];

export default function Services() {
  const go = (id?: string) => {
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-label="Hizmetler"
      className="relative py-16 sm:py-24"
      style={{
        background:
          "radial-gradient(60% 40% at 12% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,0.06), transparent), var(--page-bg)",
      }}
    >
      {/* Soft deco orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.22), transparent)" }}
        />
        <div
          className="absolute top-1/3 -right-20 h-80 w-80 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.20), transparent)" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] px-2 py-1 rounded bg-slate-900 text-white">
            Baksoft <span className="opacity-70">•</span> Hizmetler
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-[1.1] text-text dark:text-text-dark">
            İhtiyaca göre <span className="text-transparent bg-clip-text bg-gradient-to-r from-favorite to-accent">çözümler</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-subtext dark:text-subtext-dark">
            Web’den mobile, özel yazılımdan AI’a: ölçeklenebilir, performans odaklı mimariler.
          </p>
        </div>

        {/* Mobile rail — icons only */}
        <div className="flex sm:hidden overflow-x-auto gap-3 pb-4 -mx-4 px-4 snap-x">
          {servicesNav.map((s) =>
            s.external ? (
              <a
                key={s.id}
                href={s.href}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-favorite/15 text-favorite flex items-center justify-center shadow-sm border border-white/10 snap-center"
              >
                {s.icon}
              </a>
            ) : (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-favorite/15 text-favorite flex items-center justify-center shadow-sm border border-white/10 snap-center"
              >
                {s.icon}
              </button>
            )
          )}
        </div>

        {/* Desktop grid — glass cards with hover shine */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {servicesNav.map((s) =>
            s.external ? (
              <a
                key={s.id}
                href={s.href}
                className="group relative p-6 rounded-2xl text-center bg-white/70 dark:bg-white/10 backdrop-blur border"
                style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
              >
                <CardBody title={s.title} icon={s.icon} />
              </a>
            ) : (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="group relative p-6 rounded-2xl text-center bg-white/70 dark:bg-white/10 backdrop-blur border"
                style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
              >
                <CardBody title={s.title} icon={s.icon} />
              </button>
            )
          )}
        </div>

        {/* Contents */}
        <div className="">
          <WebDevelopment />
          <MobileDevelopment />
          <CustomSoftware />
          <AiAndData />
          <Consulting />
        </div>
      </div>

      <style jsx>{`
        .card-shine {
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          background:
            radial-gradient(40% 30% at 30% 0%, rgba(99, 102, 241, 0.12), transparent),
            radial-gradient(40% 30% at 100% 0%, rgba(16, 185, 129, 0.10), transparent);
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
        }
        .group:hover .card-shine { opacity: 1; }
      `}</style>
    </section>
  );
}

function CardBody({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <>
      <div className="card-shine" aria-hidden />
      <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-favorite/20 to-accent/20 text-favorite mx-auto mb-4 border"
        style={{ borderColor: "color-mix(in oklab, #000 10%, transparent)" }}>
        {icon}
      </div>
      <span className="relative z-10 text-base sm:text-lg font-semibold text-text dark:text-text-dark leading-tight">
        {title}
      </span>
    </>
  );
}
