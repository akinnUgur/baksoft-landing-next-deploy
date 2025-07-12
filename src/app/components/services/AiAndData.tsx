"use client";
import { motion } from "framer-motion";
import { Bot, BrainCircuit, Filter, ServerCog } from "lucide-react";

export const AiAndData = () => (
  <motion.section
    id="ai"
    className="scroll-mt-32 min-h-screen flex flex-col justify-center relative overflow-hidden"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {/* Background Decoration */}
    <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent-2-dark/10 to-favorite/20 blur-3xl opacity-30 dark:opacity-20 z-0" />

    <div className="max-w-5xl mx-auto px-4 relative z-10">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center text-text dark:text-text-dark mb-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Yapay Zekâ ve Veri Bilimi
      </motion.h2>

      <div className="h-1 w-16 bg-gradient-to-r from-accent-2 to-favorite mx-auto my-4 rounded-full" />

      <motion.p
        className="text-subtext dark:text-subtext-dark text-lg text-center max-w-3xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Verinizin potansiyelini ortaya çıkarın. İş süreçlerinde veriye dayalı karar alma kültürünü yapay zekâ ile birleştirin.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[
          {
            icon: <Bot className="w-5 h-5" />, 
            title: "İşletmelere Özel AI Çözümleri",
            desc: "Talep tahmini, üretim optimizasyonu, chatbotlar veya anomali tespiti gibi uygulamalarla karar süreçlerinizi akıllandırıyoruz."
          },
          {
            icon: <BrainCircuit className="w-5 h-5" />, 
            title: "Ürün Odaklı Veri Projeleri",
            desc: "Kişiselleştirme, görsel işleme veya sesli komut sistemleriyle AI’yı doğrudan son kullanıcıya ulaştırıyoruz."
          },
          {
            icon: <ServerCog className="w-5 h-5" />, 
            title: "Modern Teknoloji Altyapısı",
            desc: "Python, TensorFlow, Scikit-learn ve PyTorch gibi araçlarla geliştirilen modelleri frontend sistemlere entegre ediyoruz."
          },
          {
            icon: <Filter className="w-5 h-5" />, 
            title: "Veri Stratejisi ve Danışmanlık",
            desc: "Veri toplama, temizleme, etiketleme ve modelleme konularında yol haritanızı birlikte çiziyoruz."
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
        İster büyük veriyle çalışın ister yeni başlıyor olun; Baksoft, verinizi anlamlı ve işlevsel hale getirmenize yardımcı olur.
      </motion.p>
    </div>
  </motion.section>
);

export default AiAndData;