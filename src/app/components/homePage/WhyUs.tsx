"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket, Brain, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Genç AR-GE Ekibi",
    desc: "Tutkulu, hızlı ve multidisipliner mühendis ekibimizle geleceği yazıyoruz.",
    icon: Sparkles,
  },
  {
    title: "Kurumsal Proje Deneyimi",
    desc: "Start-up enerjisiyle kurumsal yazılım projelerinde derin deneyim sunuyoruz.",
    icon: ShieldCheck,
  },
  {
    title: "AI & Veri Odaklılık",
    desc: "Yapay zekâ ve veri analitiği projelerinde derin teknoloji uzmanlığı.",
    icon: Brain,
  },
  {
    title: "Ölçeklenebilir Sistemler",
    desc: "API, SaaS, mikroservis mimarisiyle büyüyen sistemler geliştiriyoruz.",
    icon: Rocket,
  },
];

export default function WhyBaksoft() {
  return (
    <section
      className="relative py-24 md:py-28 overflow-hidden"
      // global bütünlük için soft radial arkaplan
      style={{
        background:
          "radial-gradient(80% 60% at 0% 0%, rgba(56,189,248,0.07), transparent), radial-gradient(80% 60% at 100% 0%, rgba(168,85,247,0.07), transparent)",
      }}
    >
      {/* dekoratif orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-20 h-72 w-72 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(closest-side, rgba(99,102,241,.22), transparent)" }}
        />
        <div
          className="absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-3xl opacity-20"
          style={{ background: "radial-gradient(closest-side, rgba(16,185,129,.20), transparent)" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* başlık bloğu */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] px-2 py-1 rounded bg-slate-900 text-white">
            Baksoft • Neden biz?
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-text dark:text-text-dark">
            Neden <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">Baksoft</span>?
          </h2>
          <p className="mt-3 text-lg text-subtext dark:text-subtext-dark">
            Koddan fazlası: vizyon, deneyim ve teknolojiyi birleştiriyoruz.
          </p>
        </div>

        {/* kartlar */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.article
                key={i}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur p-6 shadow-[0_20px_40px_-24px_rgba(2,6,23,0.25)]"
                style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
              >
                {/* hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition"
                  style={{
                    background:
                      "radial-gradient(40% 30% at 30% 0%, rgba(56,189,248,0.18), transparent), radial-gradient(50% 40% at 100% 0%, rgba(168,85,247,0.16), transparent)",
                  }}
                />
                {/* icon badge */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-favorite to-accent text-white shadow-inner mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="relative text-lg font-semibold text-text dark:text-text-dark">
                  {f.title}
                </h3>
                <p className="relative mt-1 text-sm leading-relaxed text-subtext dark:text-subtext-dark">
                  {f.desc}
                </p>

                {/* alt ince gradient çizgisi */}
                <div
                  aria-hidden
                  className="relative mt-5 h-px w-full rounded bg-gradient-to-r from-indigo-500/30 via-emerald-500/30 to-cyan-400/30"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
