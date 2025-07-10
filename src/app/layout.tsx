import "./globals.css";
import { Inter } from "next/font/google";
import { i18n } from "./lib/i18n";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
