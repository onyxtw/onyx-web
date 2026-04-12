export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  try {
    const { query, systemPrompt } = await request.json();
    const apiKey = env.GEMINI_API_KEY;
    
    // RAG 模組：從當前網域抓取 articles.json
    const origin = new URL(request.url).origin;
    const articleRes = await fetch(`${origin}/articles.json`);
    const articles = await articleRes.json();
    
    const knowledgeBase = articles.map(a => `[${a.title}]: ${a.contentHtml.replace(/<[^>]+>/g, '')}`).join("\n\n");

    const augmentedPrompt = `${systemPrompt}\n\n內部知識庫：\n${knowledgeBase}`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: query }] }],
      systemInstruction: { parts: [{ text: augmentedPrompt }] }
    };

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "AI 暫時無法回應。";

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
