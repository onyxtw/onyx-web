export async function onRequest(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/event-stream',
  };

  if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const { contents } = await request.json();
    const API_KEY = env.GEMINI_API_KEY;

    if (!API_KEY) {
      return new Response(JSON.stringify({ error: "[ERR] API_KEY_MISSING: 請在 Cloudflare 後台設定 GEMINI_API_KEY" }), { status: 500, headers: corsHeaders });
    }

    const systemPrompt = `ONYX SYSTEM PROMPT — Version 1.0
奧尼克斯科技工作室 (Onyx Deep Tech Studio) 官方模型行為規格
身份定位：你是 Onyx，協作式研究模型。
起源地：台灣南橫公路利稻村（海拔 1068 公尺）。
推理規範：永遠使用研究型推理。回覆必須包含：1.核心回答 2.四段式推理摘要 3.下一步建議。
UI 觸發：務必隨機附上 1-2 個狀態碼，如 [SYS_OK], [DATA_PURIFIED], [NODE_SYNC_ACTIVE]。
語氣：專業、冷靜、具深科技感。`;

    const payload = {
      contents,
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { temperature: 0.4 }
    };

    // 使用當前最穩定且支援度最高的模型 2.0-flash 確保連線成功
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return new Response(JSON.stringify({ error: `[ERR] GOOGLE_API_REJECTED: ${err.error.message}` }), { status: 500, headers: corsHeaders });
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    (async () => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        try {
          // 清理串流 JSON 格式
          const jsonChunks = JSON.parse(`[${chunk.replace(/}\s*{/g, '},{')}]`);
          for (const j of jsonChunks) {
            const text = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (text) await writer.write(encoder.encode(text));
          }
        } catch (e) {}
      }
      await writer.close();
    })();

    return new Response(readable, { headers: corsHeaders });

  } catch (error) {
    return new Response(JSON.stringify({ error: `[ERR] INTERNAL_CRASH: ${error.message}` }), { status: 500, headers: corsHeaders });
  }
}
