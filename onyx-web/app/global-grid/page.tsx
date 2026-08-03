import TerraCoreFlow from "@/components/TerraCoreFlow";
import AtlasGlobe from "@/components/AtlasGlobe";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black text-white gap-6">
      <h1 className="text-3xl font-bold text-cyan-400">[ GLOBAL GRID MONITOR ]</h1>
      <AtlasGlobe />
      <TerraCoreFlow />
    </main>
  );
}
