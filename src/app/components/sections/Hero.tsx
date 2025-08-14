"use client";

import React from "react";
import { motion, easeInOut } from "framer-motion";
import { ArrowRight, Play, Sparkles, Code, Zap, Rocket } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeInOut },
    },
  };

  const floatingIcons = [
    { icon: Code, delay: 0, x: 20, y: -10 },
    { icon: Zap, delay: 0.5, x: -30, y: 20 },
    { icon: Sparkles, delay: 1, x: 40, y: 30 },
    { icon: Rocket, delay: 1.5, x: -20, y: -30 },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden" // ❌ kendi bg- gradient'i kaldırıldı
    >
      {/* Hafif animasyonlu arka plan detayları (sayfa bg üstüne ince efekt) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.18), transparent)" }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.16), transparent)" }}
          animate={{ x: [0, -40, 0], y: [0, 20, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute"
            
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, item.x, 0],
              y: [0, item.y, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
            {...{ style: { left: `${20 + index * 20}%`, top: `${20 + index * 15}%`, color: "rgba(99,102,241,0.25)" } }}
          >
            <item.icon size={24} />
          </motion.div>
        ))}
      </div>

      {/* İçerik */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className=" inline-flex items-center space-x-2 bg-white/70 backdrop-blur px-4 py-2 rounded-full border "
            style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
          >
            <Sparkles className="w-4 h-4 text-favorite " />
            <span className="text-sm font-medium text-slate-800 ">
              {" Teknokent'ten Yenilikçi Çözümler"}
            </span>
          </motion.div>

          {/* Başlık */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-text dark:text-text-dark mb-6 mt-12 "
          >
            <span className="block">Yazılım Çözümlerinizin</span>
            <span className="block bg-gradient-to-r from-favorite to-accent bg-clip-text text-transparent">
              Dijital Partneri
            </span>
          </motion.h1>

          {/* Açıklama */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-subtext dark:text-subtext-dark mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Antalya merkezli yazılım çözümleri ile işinizi büyütün. Web, mobil ve yapay zeka teknolojileriyle
            geleceği şekillendirin.
          </motion.p>

          {/* CTA Butonları */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/contact">
              <motion.button
                className="group relative px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ background: "linear-gradient(90deg, #4f46e5, #10b981)" }} // markaya uyumlu gradient
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Projeni Başlat</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                  style={{ background: "linear-gradient(90deg, rgba(79,70,229,.2), rgba(16,185,129,.2))" }}
                />
              </motion.button>
            </Link>

            <Link href="/services">
              <motion.button
                className="group px-8 py-4 border-2 rounded-full font-semibold text-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ borderColor: "color-mix(in oklab, #000 20%, transparent)", color: "#0b1220" }}
              >
                <span className="flex items-center space-x-2 dark:text-text-dark">
                  <Play className="w-5 h-5" />
                  <span>Hizmetleri Keşfet</span>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* İstatistikler */}
          {/* İstatistikler */}
<motion.div
  variants={itemVariants}
  className="flex flex-wrap justify-center gap-6 max-w-full mx-auto text-sm sm:text-base"
>
  <div className="text-center min-w-[90px]">
    <div className="text-xl sm:text-3xl font-bold text-favorite mb-1">2025</div>
    <div className="text-xs sm:text-sm text-subtext dark:text-subtext-dark">Kuruluş Yılı</div>
  </div>
  <div className="text-center min-w-[90px]">
    <div className="text-xl sm:text-3xl font-bold text-favorite mb-1">TÜBİTAK</div>
    <div className="text-xs sm:text-sm text-subtext dark:text-subtext-dark">Destekli Proje</div>
  </div>
  <div className="text-center min-w-[90px]">
    <div className="text-xl sm:text-3xl font-bold text-favorite mb-1">SaaS</div>
    <div className="text-xs sm:text-sm text-subtext dark:text-subtext-dark">Odaklı Çözümler</div>
  </div>
</motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
