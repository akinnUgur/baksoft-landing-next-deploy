"use client";
import React from "react";
import { motion } from "framer-motion";

interface AboutProps {
  dict: {
    about: {
      title: string;
      description: string;
      mission: string;
      vision: string;
      values: string;
    };
  };
  locale: "tr" | "en";
}

const About = ({ dict, locale }: AboutProps) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const aboutContent = {
    tr: {
      story: {
        title: "Hikayemiz",
        content:
          "Üniversitenin başından beri müzik ve yazılım ile haşır neşir olan iki arkadaşın kurduğu bir şirket olan Baksoft Arge, müziğin kaotik doğası ile yazılımın teorik mantığını birleştirerek eşsiz projeler geliştiriyor. Akdeniz Üniversitesi Teknokent'te kurulan şirketimiz, 2025'in ocak ayında hayata geçirdiğimiz Hakoru projesi ile faaliyetlerine başladı.",
      },
      vision: {
        title: "Vizyonumuz",
        content:
          "Yeni ve dinamik ekibimizle, teknolojinin sınırlarını zorlamak ve her projede özverili, başarılı işler yapmak. En yeni teknolojilerle her türlü ihtiyaca yönelik SaaS projeler geliştirerek, dijital dünyada fark yaratan çözümler sunuyoruz.",
      },
      mission: {
        title: "Misyonumuz",
        content:
          "Web teknolojilerinde uzmanlaşmış ekibimizle (.NET, React, Next.js), mobil, desktop ve IoT alanlarında da projeler geliştiriyoruz. Müşterilerimizin ihtiyaçlarına özel, yenilikçi ve kaliteli yazılım çözümleri sunmak bizim önceliğimiz.",
      },
      values: {
        title: "Değerlerimiz",
        items: [
          {
            title: "Yenilikçilik",
            desc: "Teknolojinin en son trendlerini takip eder, projelerimizde uygularız",
          },
          {
            title: "Kalite",
            desc: "Her projede mükemmellik peşinde koşar, en yüksek standartları hedefleriz",
          },
          {
            title: "Özgünlük",
            desc: "Müziğin yaratıcılığını yazılıma yansıtır, eşsiz çözümler üretiriz",
          },
          {
            title: "Güvenilirlik",
            desc: "Müşterilerimizle kurduğumuz güven köprüsünü asla sarsmayız",
          },
        ],
      },
      highlight: {
        title: "Öne Çıkan Projemiz: Hakoru",
        content:
          "TÜBİTAK 1812 programında destek almış Hakoru projemiz, Türkçe şarkıların akor ve sözlerini sunan, kullanıcıların kişiselleştirebildiği bir web platformu. Aynı zamanda AI modeli ile müzik dosyalarından akor, tab ve sheet gibi müzikal özelliklerin çıkarılmasını sağlayan yapay zeka teknolojisi geliştiriyoruz.",
      },
    },
    en: {
      story: {
        title: "Our Story",
        content:
          "Founded by two friends who have been involved with music and software since university, Baksoft Arge combines the chaotic nature of music with the theoretical logic of software to develop unique projects. Our company, established at Akdeniz University Technopark, began operations in January 2025 with the Hakoru project.",
      },
      vision: {
        title: "Our Vision",
        content:
          "With our new and dynamic team, we aim to push the boundaries of technology and create dedicated, successful work in every project. We develop SaaS projects for all kinds of needs using the latest technologies, providing solutions that make a difference in the digital world.",
      },
      mission: {
        title: "Our Mission",
        content:
          "With our team specialized in web technologies (.NET, React, Next.js), we also develop projects in mobile, desktop and IoT areas. Our priority is to provide innovative and quality software solutions tailored to our customers' needs.",
      },
      values: {
        title: "Our Values",
        items: [
          {
            title: "Innovation",
            desc: "We follow the latest technology trends and apply them in our projects",
          },
          {
            title: "Quality",
            desc: "We pursue excellence in every project, targeting the highest standards",
          },
          {
            title: "Originality",
            desc: "We reflect the creativity of music into software, producing unique solutions",
          },
          {
            title: "Reliability",
            desc: "We never compromise the trust bridge we build with our customers",
          },
        ],
      },
      highlight: {
        title: "Featured Project: Hakoru",
        content:
          "Our Hakoru project, supported by TÜBİTAK 1812 program, is a web platform that provides chords and lyrics of Turkish songs that users can personalize. We're also developing AI technology that extracts musical features like chords, tabs and sheets from music files using AI models.",
      },
    },
  };

  const content = aboutContent[locale];

  return (
    <section id="about" className="py-20 bg-secondary dark:bg-secondary-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-4">
              {dict.about.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-favorite to-accent mx-auto mb-6"></div>
            <p className="text-xl text-subtext dark:text-subtext-dark max-w-3xl mx-auto">
              {dict.about.description}
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div variants={fadeInUp} className="mb-16">
            <div className="bg-primary dark:bg-primary-dark rounded-2xl p-8 md:p-12 shadow-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark mb-6 flex items-center">
                <div className="w-8 h-8 bg-favorite rounded-full mr-3 flex items-center justify-center">
                  <span className="text-white text-sm">📖</span>
                </div>
                {content.story.title}
              </h3>
              <p className="text-lg text-subtext dark:text-subtext-dark leading-relaxed">
                {content.story.content}
              </p>
            </div>
          </motion.div>

          {/* Vision & Mission */}
          <motion.div
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-primary dark:bg-primary-dark rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-6 flex items-center">
                <div className="w-8 h-8 bg-accent rounded-full mr-3 flex items-center justify-center">
                  <span className="text-white text-sm">🎯</span>
                </div>
                {content.vision.title}
              </h3>
              <p className="text-subtext dark:text-subtext-dark leading-relaxed">
                {content.vision.content}
              </p>
            </div>

            <div className="bg-primary dark:bg-primary-dark rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-6 flex items-center">
                <div className="w-8 h-8 bg-favorite rounded-full mr-3 flex items-center justify-center">
                  <span className="text-white text-sm">🚀</span>
                </div>
                {content.mission.title}
              </h3>
              <p className="text-subtext dark:text-subtext-dark leading-relaxed">
                {content.mission.content}
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div variants={fadeInUp} className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-text dark:text-text-dark mb-8 text-center">
              {content.values.title}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.values.items.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="bg-primary dark:bg-primary-dark rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-favorite to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl">
                      {index === 0
                        ? "💡"
                        : index === 1
                        ? "⭐"
                        : index === 2
                        ? "🎨"
                        : "🤝"}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-text dark:text-text-dark mb-2">
                    {value.title}
                  </h4>
                  <p className="text-sm text-subtext dark:text-subtext-dark">
                    {value.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Highlight Project */}
          <motion.div variants={fadeInUp} className="text-center">
            <div className="bg-gradient-to-r from-favorite to-accent rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                {content.highlight.title}
              </h3>
              <p className="text-lg leading-relaxed opacity-90 max-w-4xl mx-auto">
                {content.highlight.content}
              </p>
              <div className="mt-8">
                <a
                  href="https://hakoru.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white text-favorite rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300"
                >
                  Hakoru&apos;yu Keşfet
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
