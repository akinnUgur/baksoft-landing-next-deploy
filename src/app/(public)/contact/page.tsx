import { PageTransition } from "@/app/components/common/PageTransition";
import Contact from "@/app/components/sections/Contact";

export const metadata = {
  title: "İletişim | Baksoft Antalya Yazılım Şirketi",
  description:
    "Baksoft ile hemen iletişime geçin. Antalya Teknokent'te bulunan ofisimizde, web, mobil ve yapay zeka projeleriniz için teklif alın.",
  keywords: [
    "Baksoft iletişim",
    "Antalya yazılım firması iletişim",
    "web sitesi için teklif almak",
    "mobil uygulama yazdırmak Antalya",
    "yazılım ajansı iletişim",
    "teknokent yazılım firması",
    "yazılım danışmanlığı Antalya",
    "yazılım teklifi al",
    "Antalya'da mobil uygulama firması",
  ],
  openGraph: {
    title: "İletişim | Baksoft Antalya Yazılım Şirketi",
    description:
      "Web, mobil ve yapay zeka projeleriniz için bizimle hemen iletişime geçin. Antalya Teknokent'teyiz.",
    url: "https://www.baksoftarge.com/contact",
    siteName: "Baksoft",
    images: [
      {
        url: "https://www.baksoftarge.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Baksoft İletişim Görseli",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim | Baksoft Antalya Yazılım Şirketi",
    description:
      "Baksoft ile iletişime geçerek dijital çözümler için ilk adımı atın.",
    images: ["https://www.baksoftarge.com/og-image.jpg"],
  },
  metadataBase: new URL("https://www.baksoftarge.com"),
  alternates: { canonical: "/contact" },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <main
      style={{
        color: "#0b1220",
        background:
          "radial-gradient(60% 40% at 12% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,0.06), transparent), var(--page-bg)",
      }}
    >
      <PageTransition>
        <Contact />
      </PageTransition>

      {/* Global değişken: server-safe (styled-jsx değil) */}
      <style>{`
        :root { --page-bg: #f7f9ff; }
        .dark { --page-bg: #0b1220; }
      `}</style>
    </main>
  );
}
