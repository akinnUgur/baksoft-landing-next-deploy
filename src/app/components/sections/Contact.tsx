"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success">(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Adres",
      info: "Akdeniz Üniversitesi Teknokent, Antalya",
      link: "https://maps.google.com/?q=Akdeniz+Üniversitesi+Teknokent",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "E-posta",
      info: "info@baksoftarge.com",
      link: "mailto:info@baksoftarge.com",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
          />
        </svg>
      ),
      title: "Web Sitesi",
      info: "hakoru.com",
      link: "https://hakoru.com",
    },
  ];

  return (
    <section className="py-20 bg-primary dark:bg-primary-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-favorite/5 to-accent/5 dark:from-favorite/10 dark:to-accent/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-6">
              Projeleriniz İçin
              <span className="text-favorite block">
                Bizimle İletişime Geçin
              </span>
            </h2>
            <p className="text-xl text-subtext dark:text-subtext-dark max-w-2xl mx-auto">
              Yeni ve dinamik ekibimizle, modern teknolojiler kullanarak
              projelerinizi hayata geçirelim
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-6">
                  İletişim Bilgileri
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="flex items-start space-x-4"
                    >
                      <div className="w-12 h-12 bg-favorite/10 dark:bg-favorite/20 rounded-lg flex items-center justify-center text-favorite flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-text dark:text-text-dark mb-1">
                          {item.title}
                        </h4>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-subtext dark:text-subtext-dark hover:text-favorite transition-colors"
                        >
                          {item.info}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-secondary/50 dark:bg-secondary-dark/50 rounded-2xl p-6 border border-third dark:border-third-dark"
              >
                <h4 className="text-xl font-bold text-text dark:text-text-dark mb-4">
                  Baksoft Arge Hakkında
                </h4>
                <div className="space-y-3 text-subtext dark:text-subtext-dark">
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-favorite rounded-full mr-3"></span>
                    Akdeniz Üniversitesi Teknokent&apos;te faaliyet gösteriyoruz
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-favorite rounded-full mr-3"></span>
                    TÜBİTAK 1812 programından destek alan Hakoru projesi
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-favorite rounded-full mr-3"></span>
                    Modern teknolojilerle SaaS çözümleri geliştiriyoruz
                  </p>
                  <p className="flex items-center">
                    <span className="w-2 h-2 bg-favorite rounded-full mr-3"></span>
                    Küçük ama yetkin ekibimizle hızlı çözümler sunuyoruz
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-secondary/30 dark:bg-secondary-dark/30 rounded-2xl p-8 border border-third dark:border-third-dark backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-6">
                Proje Teklifi Alın
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                      Ad Soyad
                    </div>
                    <div className="w-full px-4 py-3 bg-primary dark:bg-primary-dark border border-third dark:border-third-dark rounded-lg focus:ring-2 focus:ring-favorite focus:border-favorite transition-colors text-text dark:text-text-dark placeholder-subtext dark:placeholder-subtext-dark">
                      {formData.name || "Adınızı ve soyadınızı girin"}
                    </div>
                  </div>
                  <div>
                    <div className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                      E-posta
                    </div>
                    <div className="w-full px-4 py-3 bg-primary dark:bg-primary-dark border border-third dark:border-third-dark rounded-lg focus:ring-2 focus:ring-favorite focus:border-favorite transition-colors text-text dark:text-text-dark placeholder-subtext dark:placeholder-subtext-dark">
                      {formData.email || "E-posta adresinizi girin"}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                    Konu
                  </div>
                  <div className="w-full px-4 py-3 bg-primary dark:bg-primary-dark border border-third dark:border-third-dark rounded-lg focus:ring-2 focus:ring-favorite focus:border-favorite transition-colors text-text dark:text-text-dark">
                    {formData.subject || "Konu seçiniz"}
                  </div>
                </div>

                <div>
                  <div className="block text-sm font-medium text-text dark:text-text-dark mb-2">
                    Mesajınız
                  </div>
                  <div className="w-full px-4 py-3 bg-primary dark:bg-primary-dark border border-third dark:border-third-dark rounded-lg focus:ring-2 focus:ring-favorite focus:border-favorite transition-colors text-text dark:text-text-dark placeholder-subtext dark:placeholder-subtext-dark min-h-[150px]">
                    {formData.message ||
                      "Projeniz hakkında detaylı bilgi verin..."}
                  </div>
                </div>

                <motion.button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-favorite hover:bg-favorite/90 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      <span>Mesajı Gönder</span>
                    </>
                  )}
                </motion.button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-success/10 border border-success/30 text-success px-4 py-3 rounded-lg text-center"
                  >
                    ✓ Mesajınız başarıyla gönderildi! En kısa sürede sizinle
                    iletişime geçeceğiz.
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-favorite to-accent rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Projelerinizi Birlikte Hayata Geçirelim
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Modern teknolojiler ve yenilikçi yaklaşımlarla, işletmenizin
                dijital dönüşümüne katkı sağlıyoruz.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  Web Development
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  Mobile Apps
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  AI Solutions
                </span>
                <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                  SaaS Projects
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
