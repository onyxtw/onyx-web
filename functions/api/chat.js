```javascript
// functions/api/chat.js
// 這是 Cloudflare Pages Functions 的標準入口點
export async function onRequestPost(context) {
    const { request, env } = context; // 從 context 獲取 request 和環境變數 env
    
    // 確保只接受 POST 請求，提高安全性
    if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const payload = await request.json(); // 解析前端傳來的 JSON 請求體
        const apiKey = env.GEMINI_API_KEY; // 安全地從 Cloudflare 環境變數中獲取 Gemini API 金鑰
        const isStreaming = payload.stream === true; // 檢查前端是否請求串流模式

        // 根據前端的請求，選擇 Gemini API 的串流或非串流端點
        // 這裡選用 gemini-1.5-flash 模型，它在速度和質量之間取得良好平衡，適合聊天應用
        const geminiEndpoint = isStreaming ? "streamGenerateContent" : "generateContent";
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:${geminiEndpoint}?key=${apiKey}`; 

        // 移除前端自定義的 'stream' 屬性，因為 Gemini API 不需要它
        delete payload.stream;

        // 向 Gemini API 發送請求
        const geminiResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // 檢查 Gemini API 的回應狀態
        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error("Gemini API error:", geminiResponse.status, errorText);
            // 將錯誤信息轉發給前端
            return new Response(JSON.stringify({ error: `Gemini API returned an error: ${geminiResponse.status} - ${errorText}` }), { 
                status: geminiResponse.status, 
                headers: { 'Content-Type': 'application/json' } 
            });
        }

        if (isStreaming) {
            // ✨ 處理串流回應的核心邏輯
            const { readable, writable } = new TransformStream(); // 創建一個可讀寫的轉換流
            const writer = writable.getWriter(); // 獲取寫入器，用於向前端發送數據塊
            const decoder = new TextDecoder(); // 用於解碼從 Gemini API 接收的數據
            let buffer = ''; // 緩衝區，用於儲存未完全解析的數據塊

            // 異步讀取 Gemini API 的回應流
            (async () => {
                const reader = geminiResponse.body.getReader(); // 獲取 Gemini API 回應體的可讀流
                try {
                    while (true) {
                        const { done, value } = await reader.read(); // 逐塊讀取數據
                        if (done) break; // 如果流已結束，則跳出循環

                        buffer += decoder.decode(value, { stream: true }); // 將數據塊解碼並添加到緩衝區

                        // Gemini API 的串流數據通常以 "data: {JSON}\n\n" 格式傳輸
                        // 我們需要解析完整的 JSON 對象
                        let lastNewlineIndex;
                        while ((lastNewlineIndex = buffer.indexOf('\n\n')) !== -1) {
                            let chunk = buffer.substring(0, lastNewlineIndex); // 提取一個潛在的完整數據塊
                            buffer = buffer.substring(lastNewlineIndex + 2); // 移除已處理的數據塊

                            if (chunk.startsWith('data:')) {
                                chunk = chunk.substring(5).trim(); // 移除 "data:" 前綴
                            }
                            
                            try {
                                const json = JSON.parse(chunk); // 解析 JSON
                                const text = json.candidates?.[0]?.content?.parts?.[0]?.text || ''; // 提取 AI 生成的文本
                                if (text) {
                                    // 將提取的文本片段直接寫入響應流，前端會逐字接收
                                    await writer.write(new TextEncoder().encode(text));
                                }
                            } catch (e) {
                                console.error("Error parsing stream chunk:", e, chunk);
                                // 如果解析失敗，可以選擇發送一個錯誤提示給前端，或忽略
                            }
                        }
                    }
                    // 處理流結束後，緩衝區中可能剩餘的數據
                    if (buffer.trim().startsWith('data:')) {
                        let finalChunk = buffer.trim().substring(5).trim();
                        try {
                            const json = JSON.parse(finalChunk);
                            const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
                            if (text) {
                                await writer.write(new TextEncoder().encode(text));
                            }
                        } catch (e) {
                            console.error("Error parsing final stream chunk:", e, finalChunk);
                        }
                    }

                } catch (e) {
                    console.error("Error processing Gemini stream in Worker:", e);
                } finally {
                    writer.close(); // 無論成功或失敗，最後都要關閉寫入器
                }
            })();

            // 返回一個可讀流。Content-Type 設置為 text/plain 讓瀏覽器直接處理文本流
            return new Response(readable, {
                headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });

        } else {
            // 如果不是串流模式 (例如用於 AI 摘要、分析等，一次性回覆)
            const data = await geminiResponse.json();
            return new Response(JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        console.error("Worker caught an error:", error);
        // 處理 Function 執行時發生的未知錯誤
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
```
