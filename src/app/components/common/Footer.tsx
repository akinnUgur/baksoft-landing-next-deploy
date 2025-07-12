"use client";

import Link from "next/link";
import {  Linkedin, Mail } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [mailShake, setMailShake] = useState(false);
  const [logoColor, setLogoColor] = useState("from-favorite to-accent");

  const navigation = [
    { name: "Anasayfa", href: "/" },
    // { name: "Hakkımızda", href: "/about" },
    { name: "Hizmetler", href: "/services" },
    { name: "Projeler", href: "/projects" },
    { name: "İletişim", href: "/contact" },
  ];

  const handleMailClick = () => {
    setMailShake(true);
    setTimeout(() => setMailShake(false), 500);
  };

  const handleLogoDoubleClick = () => {
    setLogoColor("from-blue-500 to-purple-500");
    setTimeout(() => setLogoColor("from-favorite to-accent"), 2000); // 2 saniye sonra normale döner
  };

  return (
    <footer className="bg-secondary dark:bg-secondary-dark border-t border-third dark:border-third-dark transition-all duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Slogan + Maps */}
          <div className="md:col-span-2 space-y-6">
            <Link
              href="/"
              className="group flex items-center space-x-3 hover:scale-105 transition-transform duration-300"
              onDoubleClick={handleLogoDoubleClick}
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${logoColor} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-accent/50 transition-shadow`}
              >
                <span className="text-white font-extrabold text-2xl">B</span>
              </div>
              <div>
                <div className="text-xl font-bold text-text dark:text-text-dark group-hover:text-accent transition-colors">
                  Baksoft Arge
                </div>
                <div className="text-sm text-subtext dark:text-subtext-dark">
                  Yazılımın ötesinde bir vizyon
                </div>
              </div>
            </Link>

            <div className="w-full h-48 rounded-xl overflow-hidden shadow-md border border-third dark:border-third-dark transform hover:scale-102 transition-transform duration-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.508846501994!2d30.713569076587885!3d36.8848045722664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c390d40e5c48fb%3A0xd3c0626b2d8b5585!2sTeknokent%2C%20Antalya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                title="Baksoft ofis konumu – Google Haritalar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-base font-bold text-text dark:text-text-dark uppercase tracking-wider mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-accent after:transition-all after:duration-300 hover:after:w-16">
              Sayfalar
            </h3>
            <ul className="space-y-3">
              {navigation.map((item) => (
                <li
                  key={item.name}
                  className="border-l-2 border-transparent hover:border-accent pl-3 transition-all duration-300"
                >
                  <Link
                    href={item.href}
                    className="text-subtext dark:text-subtext-dark hover:text-favorite hover:translate-x-2 transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim + Sosyal */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-text dark:text-text-dark uppercase tracking-wider mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-accent after:transition-all after:duration-300 hover:after:w-16">
                İletişim
              </h3>
              <div className="text-sm text-subtext dark:text-subtext-dark space-y-2">
                <p className="hover:text-favorite transition-colors duration-300">Antalya, Türkiye</p>
                <p className="hover:text-favorite transition-colors duration-300">info@baksoftarge.com.tr</p>
                <p className="hover:text-favorite transition-colors duration-300">+90(536) 910 70 50</p>
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-text dark:text-text-dark uppercase tracking-wider mb-3 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-accent after:transition-all after:duration-300 hover:after:w-16">
                Sosyal
              </h3>
              <div className="flex items-center space-x-6">
                {/* <Link
                  href="#"
                  aria-label="Baksoft GitHub hesabı"
                  className="text-subtext dark:text-subtext-dark hover:text-accent hover:scale-125 transition-all duration-300"
                >
                  <Github className="w-6 h-6" />
                </Link> */}
                <Link
                  href="https://www.linkedin.com/company/106287243"
                  aria-label="Baksoft LinkedIn profili"
                  className="text-subtext dark:text-subtext-dark hover:text-accent hover:scale-125 transition-all duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link
                  href="mailto:info@baksoftarge.com.tr"
                  onClick={handleMailClick}
                  aria-label="Baksoft e-posta adresi"
                  className={`text-subtext dark:text-subtext-dark hover:text-accent hover:scale-125 transition-all duration-300 ${mailShake ? "animate-shake" : ""
                    }`}
                >
                  <Mail className="w-6 h-6" />
                </Link>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-third dark:border-third-dark text-center">
          <p className="text-xs text-subtext dark:text-subtext-dark hover:text-favorite transition-colors duration-300">
            © {new Date().getFullYear()} Baksoft Arge. Tüm hakları saklıdır.
          </p>
        </div>
      </div>

      {/* CSS Animasyonları */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out 2;
        }
      `}</style>
    </footer>
  );
}