"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary dark:bg-primary-dark px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-6xl font-extrabold text-favorite drop-shadow-sm"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-2xl font-semibold text-text dark:text-text-dark mt-4"
      >
        Sayfa bulunamadı
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-subtext dark:text-subtext-dark mt-2 mb-6 max-w-md"
      >
        Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <Link
          href="/"
          className="px-6 py-3 bg-favorite text-black rounded-full font-medium shadow hover:shadow-lg transition"
        >
          Ana Sayfaya Dön
        </Link>
      </motion.div>
    </div>
  );
}
