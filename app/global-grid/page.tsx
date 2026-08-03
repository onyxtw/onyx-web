// app/global-grid/page.tsx
import TerraCoreFlow from "../components/TerraCoreFlow";
import AtlasGlobe from "../components/AtlasGlobe";

export default function Page() {
  return (
    <main className="px-8 py-16 max-w-5xl mx-auto text-gray-200 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">ONYX Global Grid</h1>
        <p className="text-sm text-gray-400">
          ONYX Global Grid 將 TerraCore 地脈矩陣與主權級全球網格整合，
          形成從池上盆地到行星級的監測與治理 OS。
        </p>
      </header>

      {/* ONYX Matrix：地脈能量流 + 全球矩陣 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">ONYX Matrix 視覺化</h2>
        <p className="text-xs text-gray-400">
          下方為 ONYX Matrix 的雙層視覺化：左側為 TerraCore 能量流矩陣，
          右側為 AtlasGlobe 全球網格示意。兩者共同構成主權級文明 OS 的
          地脈—行星級監測框架。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-gray-700 bg-black/40 p-4">
            <h3 className="text-sm font-semibold mb-2">TerraCore 能量流矩陣</h3>
            <TerraCoreFlow />
          </div>

          <div className="rounded-xl border border-sky-700 bg-black/40 p-4">
            <h3 className="text-sm font-semibold mb-2">AtlasGlobe 全球網格</h3>
            <AtlasGlobe />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">主權級 OS 對接層</h2>
        <p className="text-xs text-gray-400">
          ONYX Matrix 作為主權級 OS 的核心視覺層，可對接：
          地層災害模型、地下水監測、文明級治理儀表板，以及 AI COPILOT OS 的
          全域決策矩陣。
        </p>
      </section>
    </main>
  );
}

