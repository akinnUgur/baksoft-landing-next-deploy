"use client";
import { motion } from "framer-motion";
import {  Layers, Users, ShieldCheck, MonitorSmartphone } from "lucide-react";

export const CustomSoftware = () => (
  <motion.section
    id="ozel"
    className="scroll-mt-32 min-h-screen flex flex-col justify-center relative overflow-hidden"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {/* Background Decoration */}
    <div className="absolute -bottom-24 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent-dark/10 to-favorite/20 blur-3xl opacity-30 dark:opacity-20 z-0" />

    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center text-text dark:text-text-dark mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Özel Yazılım Geliştirme
      </motion.h2>

      <div className="h-1 w-16 bg-gradient-to-r from-accent to-favorite mx-auto my-4 rounded-full" />

      <motion.p
        className="text-subtext dark:text-subtext-dark text-lg text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Hazır yazılımlar sizi kısıtlıyorsa, tam ihtiyacınıza uygun sistemleri Baksoft sizin için geliştirir. Antalya merkezli ekibimizle özgün yazılımlar sunuyoruz.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[
          {
            icon: <Layers className="w-5 h-5" />, 
            title: "İhtiyaca Uygun Mimari",
            desc: "B2B operasyon sistemlerinden B2C dijital ürünlere kadar tüm yapıları sizin için sıfırdan geliştiriyoruz."
          },
          {
            icon: <Users className="w-5 h-5" />, 
            title: "B2B & B2C Odaklı Yaklaşım",
            desc: "ERP, muhasebe ve servis entegrasyonlarıyla şirket içi süreçleri entegre ederken; kullanıcı deneyimini de ihmal etmiyoruz."
          },
          {
            icon: <ShieldCheck className="w-5 h-5" />, 
            title: "Güvenli ve Esnek Altyapı",
            desc: ".NET, Node.js, Python gibi güncel teknolojilerle, sürdürülebilir ve ölçeklenebilir sistemler kuruyoruz."
          },
          {
            icon: <MonitorSmartphone className="w-5 h-5" />, 
            title: "Geleceğe Hazır Kodlama",
            desc: "Yalnızca bugünü değil, yarının ihtiyaçlarını da göz önüne alarak geliştirilen yapılar sunuyoruz."
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
        Hazır sistemlerle sınırlanmak yerine, tamamen sizin işinize odaklı bir yazılım için Baksoft ile çalışın.
      </motion.p>
    </div>
  </motion.section>
);

export default CustomSoftware;