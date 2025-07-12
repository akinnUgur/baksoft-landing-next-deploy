"use client";

import {
  Code,
  Smartphone,
  Settings,
  Brain,
  Headphones,
  Mail,
} from "lucide-react";
import WebDevelopment from "../services/WebDevelopment";
import MobileDevelopment from "../services/MobileDevelopment";
import CustomSoftware from "../services/CustomSoftware";
import AiAndData from "../services/AiAndData";
import Consulting from "../services/Consulting";

const servicesNav = [
  { id: "web", title: "Web Geliştirme", icon: <Code className="w-6 h-6" /> },
  { id: "mobil", title: "Mobil Uygulama Geliştirme", icon: <Smartphone className="w-6 h-6" /> },
  { id: "ozel", title: "Özel Yazılım Geliştirme", icon: <Settings className="w-6 h-6" /> },
  { id: "ai", title: "Yapay Zekâ ve Veri Bilimi", icon: <Brain className="w-6 h-6" /> },
  { id: "destek", title: "Danışmanlık ve Teknik Destek", icon: <Headphones className="w-6 h-6" /> },
  { id: "iletisim", title: "İletişim", icon: <Mail className="w-6 h-6" />, external: true, href: "/contact" },
];

const Services = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b to-secondary-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobil: Sadece ikonlar, yatay scroll */}
        <div className="flex sm:hidden overflow-x-auto gap-3 pb-4 -mx-4 px-4 snap-x">
          {servicesNav.map((s) =>
            s.external ? (
              <a
                key={s.id}
                href={s.href}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-favorite/20 text-favorite flex items-center justify-center shadow-md snap-center"
              >
                {s.icon}
              </a>
            ) : (
              <button
                key={s.id}
                onClick={() =>
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex-shrink-0 w-12 h-12 rounded-full bg-favorite/20 text-favorite flex items-center justify-center shadow-md snap-center"
              >
                {s.icon}
              </button>
            )
          )}
        </div>

        {/* Desktop: Gelişmiş kutucuklar */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {servicesNav.map((s) =>
            s.external ? (
              <a
                key={s.id}
                href={s.href}
                className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-favorite/10 to-favorite/20 dark:from-favorite/20 dark:to-favorite/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-favorite/20 text-favorite mx-auto mb-4">
                  {s.icon}
                </div>
                <span className="text-lg font-semibold text-text dark:text-text-dark leading-tight">
                  {s.title}
                </span>
              </a>
            ) : (
              <button
                key={s.id}
                onClick={() =>
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-favorite/10 to-favorite/20 dark:from-favorite/20 dark:to-favorite/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-favorite/20 text-favorite mx-auto mb-4">
                  {s.icon}
                </div>
                <span className="text-lg font-semibold text-text dark:text-text-dark leading-tight">
                  {s.title}
                </span>
              </button>
            )
          )}
        </div>

        {/* Hizmet içerikleri */}
        <div className="space-y-24 sm:space-y-32">
          <WebDevelopment />
          <MobileDevelopment />
          <CustomSoftware />
          <AiAndData />
          <Consulting />
        </div>
      </div>
    </section>
  );
};

export default Services;
