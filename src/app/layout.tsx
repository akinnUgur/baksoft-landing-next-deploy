
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/common/Navbar";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Baksoft Arge | Antalya Yazılım Çözümleri",
  description:
    "Baksoft Arge, Antalya merkezli yazılım çözümleri sunar. Web, mobil ve yapay zeka tabanlı teknolojilerle işinizi büyütün.",
  keywords: [
    "Antalya yazılım",
    "yazılım ajansı",
    "frontend",
    "mobil uygulama",
    "baksoft arge",
  ],
  metadataBase: new URL("https://www.baksoft.com.tr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Baksoft Arge | Antalya Yazılım Çözümleri",
    description:
      "Antalya merkezli yazılım çözümleri ile işinizi büyütün. Web, mobil, yapay zeka.",
    url: "https://www.baksoft.com.tr",
    siteName: "Baksoft Arge",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baksoft Arge",
    description: "Antalya yazılım çözümleri",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-primary text-text dark:bg-primary-dark dark:text-text-dark transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
