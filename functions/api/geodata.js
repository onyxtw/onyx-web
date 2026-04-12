export async function onRequest() {
  const data = {
    microgridStatus: "Nominal",
    latencyMs: (7.5 + Math.random() * 0.5).toFixed(2),
    stabilityPct: (99.9 + Math.random() * 0.1).toFixed(2),
    airTempC: (18.6 + (Math.random() - 0.5)).toFixed(1),
    outputMw: (2.8 + (Math.random() - 0.5) * 0.1).toFixed(2),
    updatedAt: new Date().toISOString()
  };
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
