"use client";

import Image from "next/image";
import Link from "next/link";

export function Navbar() {
    return (
        <header className="w-full sticky top-0 z-50 bg-primary dark:bg-black border-b border-secondary dark:border-secondary-dark">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/baksoftLogo.png"
                        alt="Baksoft Arge Logo"
                        width={104}
                        height={104}
                        priority
                    />

                    <span className="font-semibold text-lg text-text dark:text-text-dark">
                        Baksoft Arge
                    </span>
                </Link>

                {/* Navigation (şimdilik boş) */}
                <nav className="hidden md:flex items-center gap-6">
                    {/* Örnek link */}
                    {/* <Link href="/hakkimizda" className="text-subtext hover:text-accent transition">Hakkımızda</Link> */}
                </nav>
            </div>
        </header>
    );
}
