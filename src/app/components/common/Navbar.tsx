"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

 const navigation = [
    { name: "Anasayfa", href: "/" },
    // { name: "Hakkımızda", href: "/about" },
    { name: "Hizmetler", href: "/services" },
    { name: "Projeler", href: "/projects" },
    { name: "İletişim", href: "/contact" },
  ];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-primary/80 dark:bg-primary-dark/80 backdrop-blur-md border-b border-secondary dark:border-secondary-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-favorite to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div className="block">
  <div className="text-lg font-bold text-text dark:text-text-dark leading-none">
    Baksoft
  </div>
  <div className="text-xs text-subtext dark:text-subtext-dark -mt-0.5">
    ARGE
  </div>
</div>

          </Link>

          {/* Desktop Menu */}
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

          {/* Sağ ikonlar */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button
              className="md:hidden relative w-6 h-6 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Mobil Menü"
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
        {/* Mobile Dropdown Menu – ekranı kaydırmadan açılır */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="md:hidden absolute right-4 top-16 z-40 w-48 bg-secondary dark:bg-secondary-dark shadow-lg rounded-xl overflow-hidden"
    >
      <div className="py-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`block px-4 py-2 text-sm font-medium transition-colors ${
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
