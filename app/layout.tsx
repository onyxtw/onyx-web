// app/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body className="bg-black text-gray-100">
        <header className="border-b border-gray-800 bg-black/60 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 text-sm">
            <div className="font-semibold tracking-wide">
              ONYX — Sovereign AI Civilization OS
            </div>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-sky-400">
                首頁
              </Link>
              <Link href="/terracore" className="hover:text-sky-400">
                TerraCore
              </Link>
              <Link href="/global-grid" className="hover:text-sky-400">
                Global Grid
              </Link>
            </div>
          </nav>
        </header>

        <main className="pt-8">
          {children}
        </main>
      </body>
    </html>
  );
}
