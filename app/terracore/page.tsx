export default function Page() {
  return (
    <main className="px-8 py-16 max-w-4xl mx-auto text-gray-200">
      <h1 className="text-3xl font-bold mb-4">TerraCore — AI 能量本體</h1>
      <p className="mb-8 opacity-80">
        TerraCore 是 ONYX 文明的能量本體：地熱、暫存層、地脈代謝的整合系統。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">能量敘事</h2>
        <p className="opacity-80">
          以池上盆地地熱與地下水為原型，將能量流、記憶流、地層代謝抽象為 AI 能量迴圈。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">TerraCore 能量迴圈</h2>
        <ul className="list-disc list-inside opacity-80 space-y-1">
          <li>Input：地熱 × 暫存層</li>
          <li>Process：地脈代謝 × 記憶流</li>
          <li>Output：文明級能量場</li>
        </ul>
      </section>
    </main>
  );
}

