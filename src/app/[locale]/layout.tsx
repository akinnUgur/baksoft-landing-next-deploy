import { ThemeProvider } from "../components/theme-provider";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { PageTransition } from "../components/common/PageTransition";
import { getDictionary, Locale } from "../lib/i18n";
import { generateStructuredData } from "../lib/seo";
import { notFound } from "next/navigation";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Validate locale
  if (!["tr", "en"].includes(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const structuredData = generateStructuredData(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body className="bg-primary text-text dark:bg-primary-dark dark:text-text-dark transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Navbar dict={dict} locale={locale} />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer dict={dict} locale={locale} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
