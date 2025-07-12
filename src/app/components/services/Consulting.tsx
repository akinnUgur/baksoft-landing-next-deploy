"use client";
import { motion } from "framer-motion";
import {  Headset, UserCog, LocateFixed, Lightbulb } from "lucide-react";

export const Consulting = () => (
  <motion.section
    id="destek"
    className="scroll-mt-32 min-h-screen flex flex-col justify-center relative overflow-hidden"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {/* Background Decoration */}
    <div className="absolute -bottom-32 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/10 to-favorite/20 blur-3xl opacity-30 dark:opacity-20 z-0" />

    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center text-text dark:text-text-dark mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Danışmanlık ve Teknik Destek
      </motion.h2>

      <div className="h-1 w-16 bg-gradient-to-r from-accent to-favorite mx-auto my-4 rounded-full" />

      <motion.p
        className="text-subtext dark:text-subtext-dark text-lg text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Yazılım sadece kod değildir. Planlama, bakım, karar desteği ve hızlı müdahale ile dijital projelerinizin her aşamasında yanınızdayız.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[
          {
            icon: <Lightbulb className="w-5 h-5" />, 
            title: "Proje Öncesi Danışmanlık",
            desc: "İhtiyaç analizi, teknoloji seçimi ve altyapı planlamasıyla projeye daha başlamadan avantaj kazanırsınız."
          },
          {
            icon: <Headset className="w-5 h-5" />, 
            title: "Sürekli Teknik Destek",
            desc: "Bakım, versiyon güncelleme, hata düzeltme ve yerinde destek hizmetleriyle daima yanınızdayız."
          },
          {
            icon: <UserCog className="w-5 h-5" />, 
            title: "CTO-as-a-Service",
            desc: "Girişimler ve teknik ekip kurmayan yapılar için CTO gibi stratejik teknoloji desteği sağlıyoruz."
          },
          {
            icon: <LocateFixed className="w-5 h-5" />, 
            title: "Yerinde & Uzaktan Çözüm",
            desc: "API entegrasyonları, e-fatura gibi sistemler için düzenli destek paketleri ve hızlı müdahale imkanı sunuyoruz."
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-2xl bg-gradient-to-tr from-third via-fourth to-fifth dark:from-third-dark dark:via-fourth-dark dark:to-fifth-dark shadow-md hover:shadow-lg hover:ring-2 hover:ring-accent/30 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="flex items-center gap-3 mb-3 text-favorite">
              {item.icon}
              <h3 className="text-lg font-semibold text-text dark:text-text-dark">
                {item.title}
              </h3>
            </div>
            <p className="text-subtext dark:text-subtext-dark text-sm leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="text-subtext dark:text-subtext-dark text-center mt-16 text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Yazılım yaşam döngünüzün her aşamasında doğru rehberlik ve kesintisiz destek için Baksoft sizinle.
      </motion.p>
    </div>
  </motion.section>
);

export default Consulting;