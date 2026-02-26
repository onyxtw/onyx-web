export async function onRequest(context) {
  const { request, env } = context;

  // 1. 強效 CORS 防禦：只允許你的域名存取
  const allowedOrigins = ['https://onyx.tw', 'https://onyxtw.pages.dev'];
  const origin = request.headers.get('Origin');
  const corsHeaders = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/event-stream', // 支援串流輸出
  };

  if (allowedOrigins.includes(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
  }

  // 處理預檢請求 (OPTIONS)
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { contents, systemInstruction } = await request.json();
    const API_KEY = env.GEMINI_API_KEY;

    if (!API_KEY) {
      return new Response('API Key missing', { status: 500 });
    }

    // 2. 呼叫 Gemini API (串流模式)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      }
    );

    // 3. 建立 ReadableStream 將結果傳回前端
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
        // 解析 Google 的串流格式並轉發
        try {
          const jsonChunks = JSON.parse(`[${chunk.replace(/}\s*{/g, '},{')}]`);
          for (const j of jsonChunks) {
            const text = j.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (text) await writer.write(encoder.encode(text));
          }
        } catch (e) {
          // 處理不完整的 JSON 區塊
        }
      }
      await writer.close();
    })();

    return new Response(readable, { headers: corsHeaders });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
