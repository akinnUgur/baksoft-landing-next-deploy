import { PageTransition } from "@/app/components/common/PageTransition";
import Projects from "@/app/components/sections/Projects";

export const metadata = {
  title: "Projelerimiz | Baksoft Yazılım Geliştirme Çözümleri",
  description:
    "Baksoft olarak geliştirdiğimiz projeleri keşfedin. Hakoru ile müzik akor çıkarımı, AI tabanlı analizler ve daha fazlası sizi bekliyor.",
  keywords: [
    "yazılım projeleri",
    "Antalya yazılım projeleri",
    "AI müzik platformu",
    "Hakoru nedir",
    "akor çıkarma yapay zeka",
    "baksoft projeleri",
    "yapay zeka müzik analizi",
    "Next.js müzik projesi",
    "TÜBİTAK 1812 destekli yazılım",
    "AI tabanlı müzik uygulaması",
    "şarkı sözleri ve akor platformu",
    "React yazılım örnekleri",
  ],
  openGraph: {
    title: "Projelerimiz | Baksoft Yazılım Geliştirme Çözümleri",
    description:
      "Yapay zeka destekli müzik analiz platformu Hakoru dahil olmak üzere geliştirdiğimiz projeleri inceleyin.",
    url: "https://www.baksoft.com/projects",
    siteName: "Baksoft",
    images: [
      {
        url: "https://www.baksoft.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Baksoft Projeler",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projelerimiz | Baksoft Yazılım Geliştirme Çözümleri",
    description:
      "Baksoft’un yapay zeka tabanlı yazılım projelerini keşfedin. Hakoru şu anda canlı!",
    images: ["https://www.baksoft.com/og-image.jpg"],
  },
  metadataBase: new URL("https://www.baksoft.com"),
  alternates: {
    canonical: "/projects",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <Projects />
    </PageTransition>
  );
}
