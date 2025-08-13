// app/ClientShell.tsx
'use client';

import type { ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";

export default function ClientShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const search = useSearchParams();

  // İstisna: ?chrome=1 ile zorla göster
  const forceShow = search?.get("chrome") === "1";

  // /paketler -> görünür, /paketler/... -> gizle
  const isPaketlerRoot = pathname === "/paketler" || pathname === "/paketler/";
  const isPaketlerChild = pathname.startsWith("/paketler/") && !isPaketlerRoot;

  const hideChrome = !forceShow && isPaketlerChild;

  if (hideChrome) {
    // Alt sayfalarda tam ekran içerik (Navbar/Footer yok)
    return <>{children}</>;
  }

  // Ana site ve /paketler root: Navbar + Footer var
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
