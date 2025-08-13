"use client";

import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [mailShake, setMailShake] = useState(false);
  const [logoColor, setLogoColor] = useState("from-favorite to-accent");

  const navigation = [
    { name: "Anasayfa", href: "/" },
    { name: "Hizmetler", href: "/services" },
    { name: "Projeler", href: "/projects" },
    { name: "Paket web siteleri", href: "/paketler" },
    { name: "İletişim", href: "/contact" },
  ];

  const handleMailClick = () => {
    setMailShake(true);
    setTimeout(() => setMailShake(false), 500);
  };

  const handleLogoDoubleClick = () => {
    setLogoColor("from-blue-500 to-purple-500");
    setTimeout(() => setLogoColor("from-favorite to-accent"), 2000);
  };

  return (
    <footer
      className="relative overflow-hidden border-t bg-white/80 dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/70 transition-all"
      style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
    >
      {/* soft gradient hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-indigo-500/30 via-emerald-500/30 to-cyan-400/30" />

      {/* deco orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(closest-side, rgba(99,102,241,0.25), transparent)",
          }}
        />
        <div
          className="absolute top-1/3 -right-20 h-80 w-80 rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(closest-side, rgba(16,185,129,0.22), transparent)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand + mini about + chips */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="group flex items-center gap-3 hover:scale-[1.01] transition-transform"
              onDoubleClick={handleLogoDoubleClick}
            >
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${logoColor} grid place-items-center shadow-sm ring-1 ring-black/5`}
              >
                <span className="text-white font-extrabold text-2xl">B</span>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  Baksoft ARGE
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Yazılımın ötesinde bir vizyon
                </div>
              </div>
            </Link>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Antalya merkezli ekip; web, mobil ve yapay zekâ çözümleri. Ürünleşmiş
              web yaklaşımıyla hızlı kurulum, yüksek performans ve sürdürülebilir
              geliştirme.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Web", "Mobil", "AI", "E-ticaret"].map((x) => (
                <span
                  key={x}
                  className="px-2 py-1 rounded-lg text-[11px] border bg-white/70 dark:bg-white/10 text-slate-800 dark:text-slate-200"
                  style={{
                    borderColor:
                      "color-mix(in oklab, #000 12%, transparent)",
                  }}
                >
                  {x}
                </span>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-5">
              <Link
                href="https://www.linkedin.com/company/106287243"
                aria-label="Baksoft LinkedIn"
                className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors hover:scale-110"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:info@baksoftarge.com.tr"
                onClick={handleMailClick}
                aria-label="E-posta"
                className={`text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-all hover:scale-110 ${
                  mailShake ? "animate-shake" : ""
                }`}
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Map (glassy) */}
          <div className="md:col-span-4">
            <div
              className="rounded-2xl overflow-hidden border bg-white/70 dark:bg-white/5 shadow-sm backdrop-blur"
              style={{
                borderColor:
                  "color-mix(in oklab, #000 12%, transparent)",
              }}
            >
              <div
                className="h-10 grid place-items-center border-b text-xs text-slate-600 dark:text-slate-300"
                style={{
                  borderColor:
                    "color-mix(in oklab, #000 12%, transparent)",
                }}
              >
                Ofis konumu • Antalya Teknokent
              </div>
              <div className="h-48">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.508846501994!2d30.713569076587885!3d36.8848045722664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c390d40e5c48fb%3A0xd3c0626b2d8b5585!2sTeknokent%2C%20Antalya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                  title="Baksoft ofis konumu – Google Haritalar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Nav + Contact */}
          <div className="md:col-span-3">
            <div
              className="rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur p-5"
              style={{
                borderColor:
                  "color-mix(in oklab, #000 12%, transparent)",
              }}
            >
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide">
                Sayfalar
              </h3>
              <ul className="mt-3 space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-300 group-hover:bg-indigo-500 transition-colors" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wide">
                  İletişim
                </h3>
                <div className="mt-3 space-y-1.5 text-sm">
                  <p className="text-slate-600 dark:text-slate-300">
                    Antalya, Türkiye
                  </p>
                  <Link
                    href="mailto:info@baksoftarge.com.tr"
                    className="text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors"
                  >
                    info@baksoftarge.com.tr
                  </Link>
                  <Link
                    href="tel:+905369107050"
                    className="block text-slate-600 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
                  >
                    +90 (536) 910 70 50
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom line */}
        <div
          className="mt-10 pt-6 text-center border-t text-xs text-slate-600 dark:text-slate-300"
          style={{ borderColor: "color-mix(in oklab, #000 12%, transparent)" }}
        >
          © {new Date().getFullYear()} Baksoft ARGE. Tüm hakları saklıdır.
        </div>
      </div>

      {/* small CSS for shake */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out 2;
        }
      `}</style>
    </footer>
  );
}
