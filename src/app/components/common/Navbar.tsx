"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Dictionary, Locale } from "../../lib/i18n";
import { LanguageToggle } from "../../components/common/LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  dict: Dictionary;
  locale: Locale;
}

export function Navbar({ dict, locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: dict.nav.home, href: locale === "tr" ? "/" : `/${locale}` },
    {
      name: dict.nav.about,
      href: locale === "tr" ? "/hakkimizda" : `/${locale}/about`,
    },
    {
      name: dict.nav.services,
      href: locale === "tr" ? "/hizmetler" : `/${locale}/services`,
    },
    {
      name: dict.nav.projects,
      href: locale === "tr" ? "/projeler" : `/${locale}/projects`,
    },
    {
      name: dict.nav.contact,
      href: locale === "tr" ? "/iletisim" : `/${locale}/contact`,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/" || href === `/${locale}`) {
      return pathname === `/${locale}` || pathname === "/";
    }
    return pathname.includes(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary/80 dark:bg-primary-dark/80 backdrop-blur-md border-b border-secondary dark:border-secondary-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href={locale === "tr" ? "/" : `/${locale}`}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-favorite to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-text dark:text-text-dark">
                Baksoft
              </div>
              <div className="text-xs text-subtext dark:text-subtext-dark -mt-1">
                ARGE
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-favorite"
                    : "text-text dark:text-text-dark hover:text-favorite"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-favorite"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme & Language Toggle */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LanguageToggle currentLocale={locale} />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-6 h-6 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.span
                className="absolute block w-full h-0.5 bg-text dark:bg-text-dark transform transition-transform"
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
              />
              <motion.span
                className="absolute block w-full h-0.5 bg-text dark:bg-text-dark transform transition-opacity"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="absolute block w-full h-0.5 bg-text dark:bg-text-dark transform transition-transform"
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-secondary dark:bg-secondary-dark rounded-lg my-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-md transition-colors ${
                      isActive(item.href)
                        ? "text-favorite bg-third dark:bg-third-dark"
                        : "text-text dark:text-text-dark hover:text-favorite hover:bg-third dark:hover:bg-third-dark"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
