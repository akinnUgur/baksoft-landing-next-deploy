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
    url: "https://www.baksoftarge.com/projects",
    siteName: "Baksoft",
    images: [
      {
        url: "https://www.baksoftarge.com/og-image.jpg",
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
    images: ["https://www.baksoftarge.com/og-image.jpg"],
  },
  metadataBase: new URL("https://www.baksoftarge.com"),
  alternates: { canonical: "/projects" },
  robots: { index: true, follow: true },
};

export default function ProjectsPage() {
  return (
    <main
      style={{
        color: "#0b1220",
        background:
          "radial-gradient(60% 40% at 12% 0%, rgba(99,102,241,0.08), transparent), radial-gradient(40% 30% at 100% 0%, rgba(16,185,129,0.06), transparent), var(--page-bg, #f7f9ff)",
      }}
      className="min-h-[100dvh]"
    >
      {/* sayfa içeriği */}
      <PageTransition>
        <Projects />
      </PageTransition>

      {/* Dark/Light için sayfa bazlı değişken (styled-jsx yok) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root { --page-bg: #f7f9ff; }
            .dark { --page-bg: #0b1220; }
          `,
        }}
      />
    </main>
  );
}
