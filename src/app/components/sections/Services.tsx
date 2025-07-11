"use client";

import { motion } from "framer-motion";
import { Dictionary, Locale } from "../../lib/i18n";

interface ServicesProps {
  dict: Dictionary;
  locale: Locale;
}

const Services = ({ dict, locale }: ServicesProps) => {
  const services = [
    {
      icon: "🌐",
      title: dict.services.web_development.title,
      description: dict.services.web_development.description,
      features:
        locale === "tr"
          ? [
              "React & Next.js ile modern web uygulamaları",
              ".NET Core backend geliştirme",
              "Responsive tasarım ve mobil uyumlu",
              "Yüksek performans ve SEO optimizasyonu",
            ]
          : [
              "Modern web applications with React & Next.js",
              ".NET Core backend development",
              "Responsive design and mobile compatibility",
              "High performance and SEO optimization",
            ],
      technologies: ["React", "Next.js", ".NET Core", "TypeScript"],
    },
    {
      icon: "📱",
      title: dict.services.mobile_development.title,
      description: dict.services.mobile_development.description,
      features:
        locale === "tr"
          ? [
              "iOS ve Android native geliştirme",
              "Cross-platform çözümler",
              "Kullanıcı deneyimi odaklı tasarım",
              "App Store ve Play Store yayınlama",
            ]
          : [
              "iOS and Android native development",
              "Cross-platform solutions",
              "User experience focused design",
              "App Store and Play Store publishing",
            ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    },
    {
      icon: "🤖",
      title: dict.services.ai_solutions.title,
      description: dict.services.ai_solutions.description,
      features:
        locale === "tr"
          ? [
              "Müzik dosyalarından akor çıkarma AI'ı",
              "Makine öğrenmesi modelleri",
              "Doğal dil işleme çözümleri",
              "Özel AI entegrasyonları",
            ]
          : [
              "AI for chord extraction from music files",
              "Machine learning models",
              "Natural language processing solutions",
              "Custom AI integrations",
            ],
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI"],
    },
    {
      icon: "☁️",
      title: locale === "tr" ? "SaaS Çözümleri" : "SaaS Solutions",
      description:
        locale === "tr"
          ? "Ölçeklenebilir SaaS ürünleri ve bulut tabanlı çözümlerle işinizi dijitalleştirin"
          : "Digitalize your business with scalable SaaS products and cloud-based solutions",
      features:
        locale === "tr"
          ? [
              "Hakoru gibi başarılı SaaS projeleri",
              "Bulut tabanlı altyapı",
              "Multi-tenant mimariler",
              "Gerçek zamanlı veri işleme",
            ]
          : [
              "Successful SaaS projects like Hakoru",
              "Cloud-based infrastructure",
              "Multi-tenant architectures",
              "Real-time data processing",
            ],
      technologies: ["Azure", "AWS", "Docker", "Kubernetes"],
    },
    {
      icon: "🔧",
      title: dict.services.consulting.title,
      description: dict.services.consulting.description,
      features:
        locale === "tr"
          ? [
              "Teknoloji stratejisi danışmanlığı",
              "Proje yönetimi ve planlama",
              "Teknik mimari tasarımı",
              "TÜBİTAK proje danışmanlığı",
            ]
          : [
              "Technology strategy consulting",
              "Project management and planning",
              "Technical architecture design",
              "TÜBİTAK project consulting",
            ],
      technologies: ["Agile", "Scrum", "DevOps", "Architecture"],
    },
    {
      icon: "🖥️",
      title:
        locale === "tr"
          ? "IoT ve Desktop Geliştirme"
          : "IoT & Desktop Development",
      description:
        locale === "tr"
          ? "IoT cihazları ve masaüstü uygulamaları ile kapsamlı çözümler sunuyoruz"
          : "We provide comprehensive solutions with IoT devices and desktop applications",
      features:
        locale === "tr"
          ? [
              "IoT cihaz entegrasyonları",
              "Desktop uygulama geliştirme",
              "Gerçek zamanlı veri toplama",
              "Sensör ve donanım entegrasyonu",
            ]
          : [
              "IoT device integrations",
              "Desktop application development",
              "Real-time data collection",
              "Sensor and hardware integration",
            ],
      technologies: ["C#", "WPF", "Arduino", "Raspberry Pi"],
    },
  ];

  return (
    <section className="py-20 bg-secondary dark:bg-secondary-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-6">
            {dict.services.title}
          </h2>
          <p className="text-xl text-subtext dark:text-subtext-dark max-w-3xl mx-auto">
            {dict.services.description}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary dark:bg-primary-dark rounded-xl p-8 hover:shadow-xl transition-all duration-300 border border-third dark:border-third-dark group hover:border-favorite dark:hover:border-favorite"
            >
              {/* Icon */}
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-subtext dark:text-subtext-dark mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <span className="text-favorite mt-1 text-sm">✓</span>
                    <span className="text-sm text-subtext dark:text-subtext-dark">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-secondary dark:bg-secondary-dark text-xs font-medium text-favorite border border-favorite rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-favorite to-accent p-8 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-4">
              {locale === "tr"
                ? "Projenizi Başlatalım"
                : "Let's Start Your Project"}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {locale === "tr"
                ? "Modern teknolojilerle hayalinizdeki projeyi gerçekleştirelim. Ücretsiz danışmanlık için hemen iletişime geçin."
                : "Let's realize your dream project with modern technologies. Contact us for free consultation."}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-favorite px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              {locale === "tr" ? "Ücretsiz Danışmanlık" : "Free Consultation"}
            </motion.button>
          </div>
        </motion.div>

        {/* Success Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 bg-primary dark:bg-primary-dark rounded-xl p-8 border border-third dark:border-third-dark"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="text-6xl">🎵</div>
          </div>
          <h3 className="text-2xl font-bold text-center text-text dark:text-text-dark mb-4">
            {locale === "tr"
              ? "Başarı Hikayemiz: Hakoru"
              : "Our Success Story: Hakoru"}
          </h3>
          <p className="text-center text-subtext dark:text-subtext-dark max-w-3xl mx-auto mb-6">
            {locale === "tr"
              ? "TÜBİTAK 1812 programından destek alan Hakoru projesi, Türkiye'nin en kapsamlı akor ve şarkı sözü platformu. AI destekli müzik analizi teknolojimizle müzik dosyalarından akor çıkarma özelliği geliştiriyoruz."
              : "Hakoru project, supported by TÜBİTAK 1812 program, is Turkey's most comprehensive chord and lyrics platform. We're developing AI-powered music analysis technology to extract chords from music files."}
          </p>
          <div className="flex justify-center">
            <motion.a
              href="https://hakoru.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-favorite text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors duration-300"
            >
              <span>
                {locale === "tr" ? "Hakoru'yu Keşfet" : "Explore Hakoru"}
              </span>
              <span>→</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
