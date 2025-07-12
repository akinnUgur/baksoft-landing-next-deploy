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
    <section className="relative py-32 px-6 bg-secondary dark:bg-secondary-dark overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-text dark:text-text-dark mb-4">
          Neden Baksoft?
        </h2>
        <p className="text-lg text-subtext dark:text-subtext-dark text-center mb-12">
          Koddan fazlasını sunuyoruz: Vizyon, deneyim ve teknolojiyi birleştiriyoruz.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full min-h-[280px] max-h-[320px] p-6 rounded-2xl backdrop-blur-md bg-white/5 dark:bg-white/10 border border-white/10 shadow-[0_0_12px_rgba(74,144,226,0.15)] hover:shadow-[0_0_24px_rgba(74,144,226,0.25)] transition-all duration-300 select-none"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-favorite/10 text-favorite mb-4 shadow-inner">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-text dark:text-text-dark mb-2">
                  {f.title}
                </h3>
                <p className="text-subtext dark:text-subtext-dark text-sm">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
