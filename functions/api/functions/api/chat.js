export async function onRequestPost(context) {
    const { request, env } = context;
    
    // 確保只接受 POST 請求
    if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {
        const payload = await request.json();
        // 讀取您在 Cloudflare 後台設定的金鑰
        const apiKey = env.GEMINI_API_KEY; 
        
        // 使用 Google 最新的穩定版模型
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
