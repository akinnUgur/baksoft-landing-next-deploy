// app/sitemap/route.ts

import { NextResponse } from "next/server";
// CAROUSEL_ITEMS burada ortak bir yerdeyse bu import yolu doğru olur.
// Projede farklıysa "@/app/lib/data" yolunu kendi yapına göre güncelle.
import { CAROUSEL_ITEMS } from "@/app/lib/data";

function normalizeSlug(raw: string): string {
  if (!raw) return "";
  // absolute URL verilmişse path'ini al
  let path = raw.startsWith("http") ? new URL(raw).pathname : raw;

  // başında slash yoksa ekle
  if (!path.startsWith("/")) path = `/${path}`;

  // /paket/... → /paketler/... olarak normalize et
  // (/paketler/... ise dokunma)
  if (path.startsWith("/paket/")) {
    path = path.replace(/^\/paket(?!ler)\b/, "/paketler");
  }

  return path;
}

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    "https://www.baksoftarge.com";

  // sabit sayfalar
  const staticUrls = ["/", "/services", "/projects", "/contact", "/paketler"];

  // paket detay sayfaları (CAROUSEL_ITEMS içindeki slug'lardan)
  const packageUrls = (CAROUSEL_ITEMS || [])
    .map((it) => normalizeSlug(it.slug))
    .filter(Boolean);

  // tekrarları at
  const allPaths = Array.from(new Set([...staticUrls, ...packageUrls]));

  const now = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (p) => `  <url>
    <loc>${baseUrl}${p}</loc>
    <lastmod>${now}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
