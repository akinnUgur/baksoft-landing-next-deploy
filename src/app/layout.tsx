import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ClientShell from "./ClientShell";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Baksoft",
  url: "https://www.baksoftarge.com",
  logo: "https://www.baksoftarge.com/logo.png",
  sameAs: [
    "https://www.linkedin.com/company/baksoft",
    "https://www.instagram.com/baksoft",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Baksoft",
  url: "https://www.baksoftarge.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.baksoftarge.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Navbar/Footer göster/gizle mantığı ClientShell içinde */}
          <ClientShell>{children}</ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
