import TerraCoreFlow from "@/components/TerraCoreFlow";
import AtlasGlobe from "@/components/AtlasGlobe";

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-black text-white space-y-8">
      <h1 className="text-3xl font-bold tracking-widest text-blue-500">GLOBAL GRID NODE</h1>
      <AtlasGlobe />
      <TerraCoreFlow />
    </main>
  );
}
