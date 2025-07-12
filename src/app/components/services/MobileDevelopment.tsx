"use client";
import { motion } from "framer-motion";
import {  AppWindow, Target, Store, Workflow } from "lucide-react";

export const MobileDevelopment = () => (
  <motion.section
    id="mobil"
    className="scroll-mt-32 min-h-screen flex flex-col justify-center relative overflow-hidden"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {/* Gradient Background Blob */}
    <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-accent-2/10 to-favorite/20 blur-3xl opacity-30 dark:opacity-20 z-0" />

    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center text-text dark:text-text-dark mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mobil Uygulama Geliştirme
      </motion.h2>

      <div className="h-1 w-16 bg-gradient-to-r from-favorite to-accent mx-auto my-4 rounded-full" />

      <motion.p
        className="text-subtext dark:text-subtext-dark text-lg text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        İşletmenize özel geliştirilen bir mobil uygulama ile müşterilerin cebine girin. iOS ve Android platformlarında etkili ve estetik çözümler sunuyoruz.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[
          {
            icon: <AppWindow className="w-5 h-5" />, 
            title: "Kullanıcı Odaklı Arayüz",
            desc: "React Native ve Flutter altyapılı uygulamalarımız her cihazda hızlı, estetik ve sezgisel bir deneyim sunar."
          },
          {
            icon: <Workflow className="w-5 h-5" />,
            title: "İş Süreçlerinin Mobil Versiyonu",
            desc: "Saha yönetiminden e-ticarete kadar tüm süreçlerinizi mobil cihazlara taşıyacak özelleştirilmiş çözümler geliştiriyoruz."
          },
          {
            icon: <Store className="w-5 h-5" />,
            title: "Yayınlama ve Destek",
            desc: "App Store ve Google Play mağazalarındaki tüm başvuru, sürüm ve bakım süreçlerini sizin adınıza biz yürütüyoruz."
          },
          {
            icon: <Target className="w-5 h-5" />,
            title: "Sektöre Özel Yaklaşım",
            desc: "Antalya'daki işletmelere hedef kitlesine uygun, ticari başarısı yüksek uygulamalar sunuyoruz."
          }
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
        Baksoft ile geliştireceğiniz mobil uygulama, yalnızca yazılım değil; müşterilerinize ulaşan en etkili dijital araçlardan biri olur.
      </motion.p>
    </div>
  </motion.section>
);

export default MobileDevelopment;