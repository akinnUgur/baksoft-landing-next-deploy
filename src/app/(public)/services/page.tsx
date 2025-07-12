import { PageTransition } from "@/app/components/common/PageTransition";
import Services from "@/app/components/sections/Services";

export const metadata = {
  title: "Hizmetler | Antalya Web Yazılım, Mobil Uygulama ve AI Geliştirme",
  description:
    "Baksoft olarak web yazılım, mobil uygulama, özel yazılım geliştirme, yapay zeka ve teknik danışmanlık alanlarında Antalya merkezli çözümler sunuyoruz.",
  keywords: [
    "Antalya yazılım hizmetleri",
    "web geliştirme Antalya",
    "mobil uygulama geliştirme",
    "özel yazılım geliştirme Antalya",
    "yapay zeka çözümleri",
    "teknik destek yazılım",
    "veri bilimi projeleri",
    "frontend backend yazılım",
    "yazılım danışmanlığı",
    "kurumsal web tasarım Antalya",
    "mobil app yapan firmalar",
    "Antalya web tasarım ajansı",
    "Baksoft yazılım hizmetleri"
  ],
  openGraph: {
    title: "Hizmetler | Antalya Web Yazılım, Mobil Uygulama ve AI Geliştirme",
    description:
      "Antalya merkezli yazılım şirketi Baksoft'un sunduğu web, mobil, özel yazılım ve yapay zeka çözümleri.",
    url: "https://www.baksoft.com/services",
    siteName: "Baksoft",
    images: [
      {
        url: "https://www.baksoft.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Baksoft Hizmetler Sayfası",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetler | Antalya Web Yazılım ve Yapay Zeka Geliştirme",
    description:
      "Baksoft'un sunduğu kapsamlı yazılım hizmetlerini keşfedin: web, mobil, özel yazılım, AI ve teknik destek.",
    images: ["https://www.baksoft.com/og-image.jpg"],
  },
  metadataBase: new URL("https://www.baksoft.com"),
  alternates: {
    canonical: "/services",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <Services />
    </PageTransition>
  );
}
