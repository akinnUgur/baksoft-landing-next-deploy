"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { name: "Anasayfa", href: "/" },
  { name: "Paket web siteleri", href: "/paketler" },
  { name: "Hizmetler", href: "/services" },
  { name: "Projeler", href: "/projects" },
  { name: "İletişim", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 border-b transition-all ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/75 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm"
          : "bg-white/60 dark:bg-slate-900/60 backdrop-blur supports-[backdrop-filter]:bg-white/50"
      }`}
      style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
    >
      {/* gradient hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-indigo-500/30 via-emerald-500/30 to-cyan-400/30"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-favorite to-accent grid place-items-center shadow-sm">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div className="leading-none">
              <div className="text-lg font-bold text-text dark:text-text-dark">
                Baksoft
              </div>
              <div className="text-xs text-subtext dark:text-subtext-dark -mt-0.5">
                ARGE
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
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
                    className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Sağ ikonlar */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              className="md:hidden relative w-7 h-7 focus:outline-none"
              onClick={() => setIsOpen((s) => !s)}
              aria-label="Mobil Menü"
              aria-expanded={isOpen}
            >
              <motion.span
                className="absolute block w-full h-0.5 bg-text dark:bg-text-dark"
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute block w-full h-0.5 bg-text dark:bg-text-dark"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute block w-full h-0.5 bg-text dark:bg-text-dark"
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="md:hidden absolute right-4 top-16 z-40 w-56 rounded-xl border bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-xl overflow-hidden"
              style={{
                borderColor: "color-mix(in oklab, #000 12%, transparent)",
              }}
            >
              <div
                aria-hidden
                className="h-px bg-gradient-to-r from-indigo-500/40 via-emerald-500/40 to-cyan-400/40"
              />
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                  show: { transition: { staggerChildren: 0.04 } },
                }}
                className="py-2"
              >
                {navigation.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={{
                      hidden: { opacity: 0, y: -6 },
                      show: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 text-sm font-medium rounded-lg mx-2 ${
                        isActive(item.href)
                          ? "text-favorite bg-third/70 dark:bg-third-dark/70"
                          : "text-text dark:text-text-dark hover:text-favorite hover:bg-third/70 dark:hover:bg-third-dark/70"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
