import type { Metadata } from "next";
import HomePageClient from "./components/HomePageClient";
import { CAROUSEL_ITEMS } from "./lib/data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Baksoft | Antalya Web Yazılım, Mobil Uygulama ve Yapay Zeka Çözümleri",
    description:
      "Baksoft, Antalya merkezli yazılım şirketi olarak web geliştirme, mobil uygulama ve yapay zeka entegrasyonu hizmetleri sunar. İşletmeniz için özel çözümler üretiriz.",
    keywords: [
      "Antalya yazılım",
      "web tasarım Antalya",
      "mobil uygulama geliştirme",
      "Antalya mobil uygulama firması",
      "Antalya'da web sitesi yaptırmak istiyorum",
      "kurumsal web sitesi fiyatları 2025",
      "Antalya yapay zeka danışmanlığı",
      "yazılım ajansı Antalya",
      "Antalya web yazılım şirketi",
      "mobil uygulama fiyatları 2025",
      "yapay zeka tabanlı iş çözümleri",
      "startup için yazılım geliştirme",
      "Antalya mobil uygulama yazdırmak",
      "baksoft yazılım",
      "mobil uygulama yapan firmalar Antalya",
    ],
    openGraph: {
      title: "Baksoft | Antalya Web Yazılım ve Yapay Zeka Çözümleri",
      description:
        "Antalya merkezli yazılım ajansı Baksoft, web ve mobil teknolojilerde modern çözümler sunar.",
      url: "https://www.baksoftarge.com/",
      siteName: "Baksoft",
      images: [
        { url: "https://www.baksoftarge.com/og-image.jpg", width: 1200, height: 630, alt: "Baksoft Açılış Görseli" },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Baksoft | Antalya Web Yazılım ve Yapay Zeka Çözümleri",
      description: "Web, mobil ve AI alanında Antalya'nın yükselen yazılım şirketi.",
      images: ["https://www.baksoftarge.com/og-image.jpg"],
    },
    metadataBase: new URL("https://www.baksoftarge.com"),
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return <HomePageClient items={CAROUSEL_ITEMS} />;
}
