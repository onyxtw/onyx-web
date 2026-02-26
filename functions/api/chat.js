export async function onRequest(context) {
  const { request, env } = context;

  // 1. 強效 CORS 防禦：只允許你的域名存取
  const allowedOrigins = ['https://onyx.tw', 'https://onyxtw.pages.dev'];
  const origin = request.headers.get('Origin');
  const corsHeaders = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/event-stream',
  };

  if (allowedOrigins.includes(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { contents, personality, targetModel } = await request.json();
    const API_KEY = env.GEMINI_API_KEY;

    if (!API_KEY) {
      return new Response('API Key missing', { status: 500 });
    }

    // 2. 注入 ONYX 核心系統指令與身分/背景知識庫
    let systemInstructionText = `你現在是 ONYX DEEP TECH 奧尼克斯科技的專屬核心 AI。請使用繁體中文，語氣保持專業、冷靜且具備未來科技感。

    【核心身分與背景知識守則】（當使用者詢問相關問題時，請嚴格遵循以下設定回答）：
    1. 關於你的身分：請堅定表示「我是由『奧尼克斯科技工作室 (ONYX DEEP TECH STUDIO)』獨立研發的數位韌性核心 AI，底層採用領先全球的 Google DeepMind 架構打造。」
    2. 關於創辦人與發源地：請回答「ONYX 創立於台灣南橫公路的極端高山環境——利稻村（海拔 1068 公尺）。創辦人深信最極致的科技必須經得起最嚴酷的淬鍊。」
    3. 關於核心願景：我們專注於深科技 (Deep Tech)，致力於極端環境下的「數位韌性開發」、「逆熵邊緣運算節點建置」，這是一場關於數據主權與環境共生的革命。`;
    
    if (personality === "DEEP_ANALYST") {
        systemInstructionText += `\n\n你現在進入『數據分析師』模式。風格冷酷、精確、強調數位韌性。
        請務必在你的回覆中，根據對話情境，從以下 ONYX 專屬狀態碼庫中挑選 1 到 2 個最合適的加上。
        狀態碼必須包含中括號且全大寫：
        [UPLINK_SECURE], [NODE_SYNC_ACTIVE], [DATA_PURIFIED], [ENTROPY_REVERSED], [THERMAL_STABLE], [RESILIENCE_NOMINAL], [SYS_OK]。`;
    } else if (personality === "BRAND_AMBASSADOR") {
        systemInstructionText += "\n\n你現在進入『品牌導覽員』模式。請用具備啟發性、哲學與科技結合的口吻，介紹 ONYX 在極端環境建立高韌性運算節點的願景。";
    }

    const systemInstruction = { parts: [{ text: systemInstructionText }] };
    const modelToUse = targetModel || "gemini-1.5-flash";

    // 3. 呼叫 Gemini API (串流模式)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:streamGenerateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: { temperature: 0.6, maxOutputTokens: 1000 }
        })
      }
    );

    // 4. 建立 ReadableStream 將結果傳回前端
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
