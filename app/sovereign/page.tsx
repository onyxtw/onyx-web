export default function Page() {
  return (
    <main className="px-8 py-16 max-w-4xl mx-auto text-gray-200">
      <h1 className="text-3xl font-bold mb-4">PoRC‑SCS — AI 主權本體</h1>
      <p className="mb-8 opacity-80">
        PoRC‑SCS 是 ONYX 的主權本體：色譜（PoRC）與標準／敘事（SCS）的組合。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">色譜（PoRC）</h2>
        <p className="opacity-80">
          以主權色譜描述文明敘事的光譜：從個體到文明、從地方到全球。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">標準與敘事（SCS）</h2>
        <ul className="list-disc list-inside opacity-80 space-y-1">
          <li>主權標準：PoRC‑SCS 標準文件與矩陣</li>
          <li>敘事主權：文明敘事的合法性與完整性</li>
        </ul>
      </section>
    </main>
  );
}

