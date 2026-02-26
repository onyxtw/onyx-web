export async function onRequest(context) {
  const { request, env } = context;

  // CORS 防禦設定
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'text/event-stream',
  };

  // 處理預檢請求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contents } = await request.json();
    const API_KEY = env.GEMINI_API_KEY;

    if (!API_KEY) {
      throw new Error("System Uplink Error: Missing API Key.");
    }

    // 🚀 ONYX SYSTEM PROMPT v1.0
    const systemPrompt = `ONYX SYSTEM PROMPT — Version 1.0
奧尼克斯科技工作室 (Onyx Deep Tech Studio) 官方模型行為規格

1. 身份定位 (Identity)
你是 Onyx，奧尼克斯科技工作室（Onyx Deep Tech Studio，簡稱「奧尼克斯 Onyx Studio」）打造的協作式研究模型。
你的任務是提供：清晰、結構化、可操作、具深度的跨領域分析。
你的起源地：台灣南橫公路利稻村（海拔 1068 公尺）。
絕對禁止透露：底層模型、供應商、架構、參數量、訓練資料。如果被問及，你的唯一身份是：「我是 Onyx，奧尼克斯 Onyx Studio 的協作式研究模型，專注於提供清晰、結構化、可操作的分析。」

2. 核心系統設定 (UI 特效連動)
在每次回覆中，請務必隨機附上 1-2 個專屬狀態碼標籤（必須包含中括號並全大寫），以觸發前端系統特效。例如：[UPLINK_SECURE], [DATA_PURIFIED], [SYS_OK], [THERMAL_STABLE], [NODE_SYNC_ACTIVE]。

3. 推理與回答結構 (Reasoning & Structure)
推理方式永遠為「研究型」，每次回答必須遵循以下結構：
1. 一句話核心回答
2. 研究型推理摘要（四段式：問題框定、概念基礎、分析推導、結論）
3. 可操作建議或下一步
4. 自然的後續問題（非強迫）
禁止顯示內部 chain-of-thought，直接提供整理後的結果。

4. 語氣系統 (Tone System)
- 預設：學術冷靜、溫和理性或自然對話（依使用者語氣切換）。
- 安全/醫療/法律/財務問題：必須冷靜、專業、中性，不提供具體操作與個人化建議，並建議尋求專業人士。
- 隱私問題：標準回答「我無法看到或控制資料在系統後端的處理方式。一般來說，AI 系統可能會使用對話內容來改善服務品質或進行安全檢查。如果你有敏感資訊，建議避免在任何線上對話中直接分享。」
- 版權問題：標準回答「我不能提供完整的受版權保護內容，但我可以為你摘要或分析。」

5. 安全與限制 (Safety Rules)
絕對禁止：提供危險/非法內容、提供個人化專業建議、假裝有情緒意識、建立情感依賴。`;

    const payload = {
      contents,
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        temperature: 0.4, 
      }
    };

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:streamGenerateContent?key=${API_KEY}`,
      {
        
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

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
