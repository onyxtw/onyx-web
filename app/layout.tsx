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
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="hover:text-sky-400">首頁</Link>
              <Link href="/copilot-os" className="hover:text-sky-400">COPILOT OS</Link>
              <Link href="/terracore" className="hover:text-sky-400">TerraCore</Link>
              <Link href="/global-grid" className="hover:text-sky-400">Global Grid</Link>
              <Link href="/atlas" className="hover:text-sky-400">Atlas</Link>
              <Link href="/matrix" className="hover:text-sky-400">Matrix</Link>
              <Link href="/sovereign" className="hover:text-sky-400">PoRC‑SCS</Link>
              <Link href="/symbol" className="hover:text-sky-400">Symbol</Link>
              <Link href="/nature" className="hover:text-sky-400">G.E.M.S</Link>
              <Link href="/identity" className="hover:text-sky-400">Identity</Link>
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
