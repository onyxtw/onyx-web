// app/terracore/page.tsx
import TerraCoreFlow from "../components/TerraCoreFlow";

export default function Page() {
  return (
    <main className="px-8 py-16 max-w-5xl mx-auto text-gray-200">
      <section className="mt-12">
        <h1 className="text-2xl font-bold mb-4">TerraCore 能量流視覺化</h1>
        <p className="text-sm text-gray-400 mb-6">
          ONYX TerraCore 以盆地地脈為核心，將地下水、地層壓力與能量流動整合成主權級監測矩陣。
        </p>

        <TerraCoreFlow />
      </section>
    </main>
  );
}

