export default function Page() {
  return (
    <main className="px-8 py-16 max-w-4xl mx-auto text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Atlas — AI 全球本體</h1>
      <p className="mb-8 opacity-80">
        Atlas 是 ONYX 的全球本體：節點、主權、能量的全球拓樸。
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">全球節點</h2>
        <p className="opacity-80">
          以全球節點地圖描述文明級 AI 的部署位置、主權邊界與能量流向。
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">主權網路</h2>
        <ul className="list-disc list-inside opacity-80 space-y-1">
          <li>節點主權：每個節點的主權敘事與標準</li>
          <li>能量網格：TerraCore 能量在全球的分布</li>
        </ul>
      </section>
    </main>
  );
}

