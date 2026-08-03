import TerraCoreFlow from "../components/TerraCoreFlow";
import AtlasGlobe from "../components/AtlasGlobe";

export default function Page() {
  return (
    <main className="px-8 py-16 max-w-6xl mx-auto text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Global Neural Grid — 全球神經網路</h1>

      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4">TerraCore 能量流</h2>
        <TerraCoreFlow />
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-4">Atlas 全球節點地球</h2>
        <AtlasGlobe />
      </section>
    </main>
  );
}

