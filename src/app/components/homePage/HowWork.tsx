"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, PenTool, Code2, RefreshCcw } from "lucide-react";
import EyeTracker from "./EyeTracker";

const steps = [
  {
    title: "İhtiyaç Analizi",
    desc: "Projenin hedeflerini, teknik gereksinimlerini, kullanıcı beklentilerini ve iş hedeflerinizi birlikte netleştiririz. Böylece yazılımın doğru temeller üzerine kurulmasını sağlarız.",
    icon: <Compass className="w-5 h-5 text-accent group-hover:text-accent" />,
  },
  {
    title: "Tasarım Süreci",
    desc: "Kullanıcı deneyimini merkeze alan wireframe ve UI/UX tasarımları oluştururuz. Renkler, tipografi, etkileşimler en ince detayına kadar planlanır.",
    icon: <PenTool className="w-5 h-5 text-favorite group-hover:text-favorite" />,
  },
  {
    title: "Yazılım Geliştirme",
    desc: "Modern framework’ler kullanarak hızlı, güvenli ve ölçeklenebilir kod altyapısı kurarız. API, veritabanı ve frontend katmanları senkron şekilde ilerler.",
    icon: <Code2 className="w-5 h-5 text-favorite group-hover:text-favorite" />,
  },
  {
    title: "Test, Yayınlama ve Destek",
    desc: "Yayına almadan önce test senaryoları uygulayıp hataları gideririz. Sonrasında düzenli bakım, güncelleme ve teknik destek süreçlerini yönetiriz.",
    icon: <RefreshCcw className="w-5 h-5 text-accent-2 group-hover:text-accent-2" />,
  },
];

export default function HowWeWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-gradient-to-b from-primary via-secondary/40 to-primary dark:from-primary-dark dark:via-secondary-dark/40 dark:to-primary-dark">
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-favorite/10 blur-3xl z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-text dark:text-text-dark mb-4">
          Nasıl Çalışırız?
        </h2>
        <p className="text-lg text-subtext dark:text-subtext-dark text-center mb-12 max-w-2xl mx-auto hidden md:block">
          Süreçlerimiz verimli, şeffaf ve kullanıcı odaklıdır. Her adım kontrollü ve sürdürülebilir ilerler.
        </p>

        <div className="relative flex flex-col md:flex-row gap-12">
          <div className="md:w-2/3 border-l-2 border-accent/20 ml-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative mb-16 pl-8 group"
              >
                <div className="absolute -left-[14px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-tr from-favorite to-accent shadow-md group-hover:scale-125 transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-2">
                  {step.icon}
                  <h3 className="text-lg font-semibold text-text dark:text-text-dark group-hover:text-accent transition-all duration-300 group-hover:scale-[1.04]">
                    {step.title}
                  </h3>
                </div>
                <p className="text-subtext dark:text-subtext-dark text-sm max-w-xl dark:group-hover:text-primary transition-colors">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sağda sevimli göz animasyonu */}
          <div className="hidden md:flex md:w-1/3 items-center justify-center">
            <EyeTracker />
          </div>
        </div>
      </div>
    </section>
  );
}