"use client";

import { motion } from "framer-motion";
import { Globe, LayoutDashboard, TrendingUp, Cloud } from "lucide-react";

const items = [
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Modern & Uyumlu Tasarımlar",
    desc:
      "Tüm cihazlarda kusursuz çalışan, kullanıcı dostu arayüzlerle müşterilerinize unutulmaz bir deneyim sunun.",
  },
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    title: "Yönetim Panelleri",
    desc:
      "Personel, stok ve bayi ağı gibi ihtiyaçlarınıza özel geliştirilmiş admin panelleriyle işinizi kolaylaştırın.",
  },
  {
    icon: <Cloud className="w-5 h-5" />,
    title: "Entegrasyon Gücü",
    desc:
      "CRM, e-fatura, randevu vb. sistemlerinizi tek merkezde toplayan akıllı entegrasyonlar tasarlıyoruz.",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "SEO & Performans",
    desc:
      "Google dostu yapı, Core Web Vitals odaklı performans ve temiz mimariyle zirveyi hedefleyin.",
  },
];

export default function WebDevelopment() {
  return (
    <motion.section
      id="web"
      className="scroll-mt-32 min-h-screen flex flex-col justify-center relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* soft blob */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/10 to-favorite/20 blur-3xl opacity-30 dark:opacity-20 -z-10" />

      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-text dark:text-text-dark mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Web Geliştirme
        </motion.h2>

        <div className="h-1 w-16 bg-gradient-to-r from-accent to-favorite mx-auto my-4 rounded-full" />

        <motion.p
          className="text-subtext dark:text-subtext-dark text-lg text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          İşinize özel, güçlü ve şık web uygulamaları ile dijitalde öne çıkın. Antalya’da yazılım gücünüz biziz.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              className="p-6 rounded-2xl bg-gradient-to-tr from-third via-fourth to-fifth dark:from-third-dark dark:via-fourth-dark dark:to-fifth-dark shadow-md hover:shadow-lg hover:ring-2 hover:ring-accent/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="flex items-center gap-3 mb-3 text-favorite">
                {it.icon}
                <h3 className="text-lg font-semibold text-text dark:text-text-dark">{it.title}</h3>
              </div>
              <p className="text-subtext dark:text-subtext-dark text-sm leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-subtext dark:text-subtext-dark text-center mt-16 text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Küçük bir girişimden büyük bir kuruma kadar; vizyonunuzu ölçeklenebilir bir web altyapısıyla geleceğe taşıyoruz.
        </motion.p>
      </div>
    </motion.section>
  );
}
