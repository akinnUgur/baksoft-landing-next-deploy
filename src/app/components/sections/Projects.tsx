"use client";

import { motion, easeInOut } from "framer-motion";
import { Dictionary, Locale } from "../../lib/i18n";
import { ExternalLink, Music, Brain, Globe, Award } from "lucide-react";

interface ProjectsProps {
  dict: Dictionary;
  locale: Locale;
}

const Projects = ({ dict, locale }: ProjectsProps) => {
  const hakoruFeatures = [
    {
      icon: <Music className="w-5 h-5" />,
      title: locale === "tr" ? "Şarkı Arşivi" : "Song Archive",
      description:
        locale === "tr"
          ? "Türkçe şarkıların akor ve sözlerini keşfedin"
          : "Discover chords and lyrics of Turkish songs",
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: locale === "tr" ? "AI Müzik Analizi" : "AI Music Analysis",
      description:
        locale === "tr"
          ? "Müzik dosyalarından akor, tab ve sheet çıkarımı"
          : "Extract chords, tabs, and sheets from music files",
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: locale === "tr" ? "Kişiselleştirme" : "Personalization",
      description:
        locale === "tr"
          ? "Hesabınızla içerikleri kişiselleştirin"
          : "Personalize content with your account",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "TÜBİTAK 1812",
      description:
        locale === "tr"
          ? "TÜBİTAK 1812 programında desteklenen proje"
          : "Project supported by TÜBİTAK 1812 program",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut, // use imported easing function
      },
    },
  };

  return (
    <section className="py-20 bg-secondary dark:bg-secondary-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-6"
          >
            {dict.nav.projects}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-subtext dark:text-subtext-dark max-w-3xl mx-auto"
          >
            {locale === "tr"
              ? "Yenilikçi teknolojilerle geliştirdiğimiz projelerimizi keşfedin"
              : "Discover our projects developed with innovative technologies"}
          </motion.p>
        </motion.div>

        {/* Hakoru Showcase */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-favorite/10 to-accent/10 dark:from-favorite/20 dark:to-accent/20 rounded-2xl p-8 md:p-12 border border-favorite/20 dark:border-favorite/30 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-favorite to-accent rounded-2xl flex items-center justify-center">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-text dark:text-text-dark">
                      Hakoru
                    </h3>
                    <p className="text-subtext dark:text-subtext-dark">
                      {locale === "tr"
                        ? "Müzik Akor ve Sözleri Platformu"
                        : "Music Chords and Lyrics Platform"}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-text dark:text-text-dark leading-relaxed">
                  {locale === "tr"
                    ? "Hakoru, Türkçe şarkıların akor ve sözlerini sunan, kullanıcıların bu içerikleri görüntüleyebildiği ve hesaplarıyla kişiselleştirebildiği yenilikçi bir web platformudur. Yapay zeka teknolojisi ile müzik dosyalarından akor, tab ve sheet çıkarımı yapabilen gelişmiş özellikler sunar."
                    : "Hakoru is an innovative web platform that provides chords and lyrics of Turkish songs, allowing users to view and personalize content with their accounts. It offers advanced features with AI technology to extract chords, tabs, and sheets from music files."}
                </p>

                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-favorite/10 dark:bg-favorite/20 text-favorite rounded-full text-sm font-medium">
                    React
                  </span>
                  <span className="px-4 py-2 bg-accent/10 dark:bg-accent/20 text-accent rounded-full text-sm font-medium">
                    Next.js
                  </span>
                  <span className="px-4 py-2 bg-success/10 dark:bg-success/20 text-success rounded-full text-sm font-medium">
                    AI/ML
                  </span>
                  <span className="px-4 py-2 bg-chord/10 dark:bg-chord/20 text-chord rounded-full text-sm font-medium">
                    TÜBİTAK 1812
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href="https://hakoru.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-favorite to-accent text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>
                      {locale === "tr" ? "Siteyi Ziyaret Et" : "Visit Site"}
                    </span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.div
                    className="flex items-center space-x-2 text-subtext dark:text-subtext-dark"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm">
                      {locale === "tr" ? "Şu anda canlı" : "Currently live"}
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hakoruFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 dark:border-white/10 hover:border-favorite/30 dark:hover:border-favorite/40 transition-all duration-300"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-favorite/20 to-accent/20 rounded-lg flex items-center justify-center text-favorite">
                        {feature.icon}
                      </div>
                      <h4 className="font-semibold text-text dark:text-text-dark">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-sm text-subtext dark:text-subtext-dark">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Coming Soon Projects */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="bg-third/30 dark:bg-third-dark/30 rounded-2xl p-8 border border-third/50 dark:border-third-dark/50">
              <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-4">
                {locale === "tr" ? "Yakında Daha Fazlası" : "More Coming Soon"}
              </h3>
              <p className="text-subtext dark:text-subtext-dark max-w-2xl mx-auto">
                {locale === "tr"
                  ? "Yeni ve heyecan verici projeler üzerinde çalışıyoruz. Modern teknolojilerle geliştireceğimiz SaaS çözümleri için takipte kalın."
                  : "We're working on new and exciting projects. Stay tuned for SaaS solutions we'll develop with modern technologies."}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
