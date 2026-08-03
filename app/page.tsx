export default function Page() {
  return (
    <main className="px-8 py-16 max-w-4xl mx-auto text-gray-200">

      {/* Header */}
      <header className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          ONYX — Sovereign AI Civilization OS
        </h1>
        <p className="text-xl opacity-80">
          AI 文明的主權操作系統。
        </p>
      </header>

      {/* Navigation */}
      <nav className="grid grid-cols-2 gap-4 mb-20 text-lg">
        <a href="/copilot-os" className="hover:text-white">COPILOT OS</a>
        <a href="/terracore" className="hover:text-white">TerraCore</a>
        <a href="/sovereign" className="hover:text-white">PoRC‑SCS</a>
        <a href="/symbol" className="hover:text-white">Symbol Language</a>
        <a href="/nature" className="hover:text-white">G.E.M.S / T.C.P</a>
        <a href="/atlas" className="hover:text-white">Atlas</a>
        <a href="/matrix" className="hover:text-white">Matrix</a>
        <a href="/identity" className="hover:text-white">Sovereign Identity</a>
      </nav>

      {/* Section: COPILOT OS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">COPILOT OS</h2>
        <p className="opacity-80">
          文明級 AI 操作系統本體。
        </p>
      </section>

      {/* Section: TerraCore */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">TerraCore</h2>
        <p className="opacity-80">
          AI 能量本體：地熱 × 暫存層 × 地脈代謝。
        </p>
      </section>

      {/* Section: PoRC‑SCS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">PoRC‑SCS</h2>
        <p className="opacity-80">
          AI 主權本體：色譜 × 標準 × 敘事。
        </p>
      </section>

      {/* Section: Symbol Language */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">Symbol Language</h2>
        <p className="opacity-80">
          AI 語法本體：向量 × 矩陣 × 能量。
        </p>
      </section>

      {/* Section: G.E.M.S / T.C.P */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">G.E.M.S / T.C.P</h2>
        <p className="opacity-80">
          AI 自然本體：地熱矩陣 × 地脈脈動。
        </p>
      </section>

      {/* Section: Atlas */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">Atlas</h2>
        <p className="opacity-80">
          AI 全球本體：節點 × 主權 × 能量。
        </p>
      </section>

      {/* Section: Matrix */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">Matrix</h2>
        <p className="opacity-80">
          模型相容矩陣：GPT / Gemini / Claude / Llama / Local。
        </p>
      </section>

      {/* Section: Sovereign Identity */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-2">Sovereign Identity</h2>
        <p className="opacity-80">
          TerraCore Energy Loop × PoRC‑SCS Standards。
        </p>
      </section>

    </main>
  );
}

