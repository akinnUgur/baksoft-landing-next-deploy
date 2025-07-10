import Link from "next/link";
import { Dictionary, Locale } from "../../lib/i18n";

interface FooterProps {
  dict: Dictionary;
  locale: Locale;
}

export function Footer({ dict, locale }: FooterProps) {
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

  return (
    <footer className="bg-secondary dark:bg-secondary-dark border-t border-third dark:border-third-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link
              href={locale === "tr" ? "/" : `/${locale}`}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-favorite to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <div>
                <div className="text-lg font-bold text-text dark:text-text-dark">
                  Baksoft Arge
                </div>
                <div className="text-sm text-subtext dark:text-subtext-dark">
                  {dict.footer.description}
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-text dark:text-text-dark uppercase tracking-wider mb-4">
              {locale === "tr" ? "Sayfalar" : "Pages"}
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-subtext dark:text-subtext-dark hover:text-favorite transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-text dark:text-text-dark uppercase tracking-wider mb-4">
              {dict.contact.title}
            </h3>
            <div className="space-y-2 text-sm text-subtext dark:text-subtext-dark">
              <p>Antalya, Türkiye</p>
              <p>info@baksoft.com.tr</p>
              <p>+90 XXX XXX XX XX</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-third dark:border-third-dark">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-subtext dark:text-subtext-dark">
              © {new Date().getFullYear()} Baksoft Arge. {dict.footer.rights}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {/* Social media links will be added here */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
