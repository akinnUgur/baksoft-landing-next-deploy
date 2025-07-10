"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Locale } from "../../lib/i18n";

interface LanguageToggleProps {
  currentLocale: Locale;
}

export function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const newLocale = currentLocale === "tr" ? "en" : "tr";

    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, "") || "/";

    // Create new path
    const newPath =
      newLocale === "tr"
        ? pathWithoutLocale === "/"
          ? "/"
          : pathWithoutLocale
        : `/${newLocale}${pathWithoutLocale}`;

    // Set locale cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;

    router.push(newPath);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative flex items-center space-x-1 px-3 py-1.5 rounded-full bg-secondary dark:bg-secondary-dark border border-third dark:border-third-dark overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-favorite opacity-20"
        initial={false}
        animate={{
          x: currentLocale === "tr" ? 0 : "100%",
        }}
        transition={{ duration: 0.2 }}
      />

      <span
        className={`relative z-10 text-sm font-medium transition-colors ${
          currentLocale === "tr"
            ? "text-favorite"
            : "text-subtext dark:text-subtext-dark"
        }`}
      >
        TR
      </span>

      <div className="w-px h-4 bg-third dark:bg-third-dark" />

      <span
        className={`relative z-10 text-sm font-medium transition-colors ${
          currentLocale === "en"
            ? "text-favorite"
            : "text-subtext dark:text-subtext-dark"
        }`}
      >
        EN
      </span>
    </motion.button>
  );
}
