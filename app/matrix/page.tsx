export default function Page() {
  return (
    <main className="px-8 py-16 max-w-4xl mx-auto text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Matrix — 模型相容矩陣</h1>
      <p className="mb-8 opacity-80">
        Matrix 是 ONYX 的模型相容本體：GPT、Gemini、Claude、Llama、Local 等模型的矩陣。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">模型矩陣</h2>
        <ul className="list-disc list-inside opacity-80 space-y-1">
          <li>雲端模型：GPT、Claude、Gemini 等</li>
          <li>開源模型：Llama 等</li>
          <li>在地模型：Local / Edge / Sovereign</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">多模型路由</h2>
        <p className="opacity-80">
          以矩陣形式管理模型選擇、語意同步與主權約束，作為文明級 AI 的智慧層。
        </p>
      </section>
    </main>
  );
}

