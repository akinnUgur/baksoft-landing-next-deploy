"use client";

import { motion } from "framer-motion";
import { Smartphone, MonitorSmartphone, ShieldCheck, Cpu } from "lucide-react";

const items = [
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "iOS & Android",
    desc:
      "Native ve cross-platform yaklaşımlarla App Store/Google Play uyumlu, pürüzsüz mobil deneyimler.",
  },
  {
    icon: <MonitorSmartphone className="w-5 h-5" />,
    title: "UI/UX & Prototipleme",
    desc:
      "Kullanıcı akışları, wireframe ve hızlı prototiplerle doğru ürünü daha erken doğrulayın.",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Performans & Offline",
    desc:
      "Hızlı açılış, düşük bellek kullanımı ve çevrimdışı çalışabilen veri katmanları.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Güvenlik & Sürümleme",
    desc:
      "Güvenli oturum, şifreleme, geri bildirim odaklı sürüm planları ve CI/CD dağıtımları.",
  },
];

export default function MobileDevelopment() {
  return (
    <motion.section
      id="mobil"
      className="scroll-mt-32 min-h-screen flex flex-col justify-center relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute -right-32 -top-20 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-favorite/20 to-accent/10 blur-3xl opacity-30 dark:opacity-20 -z-10" />

      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-text dark:text-text-dark mb-3">
          Mobil Uygulama Geliştirme
        </h2>
        <div className="h-1 w-16 bg-gradient-to-r from-accent to-favorite mx-auto my-4 rounded-full" />
        <p className="text-subtext dark:text-subtext-dark text-lg text-center max-w-3xl mx-auto mb-12">
          Fikirden mağazaya; güçlü mimari, modern arayüz ve güvenli veri katmanı ile uygulamanızı büyütüyoruz.
        </p>

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
      </div>
    </motion.section>
  );
}
