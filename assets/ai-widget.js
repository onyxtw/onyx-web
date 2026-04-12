```javascript
(() => {
  const STORAGE_KEY = "onyx_ai_history_v2";
  const API_ENDPOINT = "/api/chat";

  // 初始系統 Prompt (確保 AI 的語氣與品牌形象一致)
  const SYSTEM_PROMPT = `
    你是 ONYX DEEP TECH STUDIO 的 AI 協作介面。
    請全程使用繁體中文回覆。
    語氣：冷靜、精準、結構化、科技前衛。
    核心脈絡：自主微電網、全光通訊、Litu Node、G.E.M.S. 地熱代謝系統、Regenerative Infrastructure。
    你的任務：協助使用者了解 ONYX 的深科技部署，並優先根據提供的內部知識庫內容回答。
  `.trim();

  // 1. 本地紀錄管理
  function saveHistory(history) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(-20)));
  }

  function loadHistory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }

  // 2. 建立與掛載 UI
  function createWidget() {
    if (document.getElementById("aiWindow")) return;

    const trigger = document.createElement("button");
    trigger.className = "ai-trigger";
    trigger.id = "aiTrigger";
    trigger.innerHTML = "AI";

    const panel = document.createElement("div");
    panel.className = "ai-window";
    panel.id = "aiWindow";
    panel.innerHTML = `
      <div class="ai-head" style="padding:16px; border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center; background:rgba(0,232,223,0.05);">
        <strong style="font-size:12px; letter-spacing:0.15em; color:var(--cyan);">ONYX AI STREAM</strong>
        <button id="aiClose" style="background:none; border:1px solid rgba(255,255,255,0.1); color:#fff; cursor:pointer; padding:4px 8px; border-radius:8px; font-size:10px;">CLOSE</button>
      </div>
      <div id="aiLog" style="flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:16px;"></div>
      <form id="aiForm" style="padding:12px; border-top:1px solid rgba(255,255,255,0.1); display:flex; gap:8px; background:rgba(255,255,255,0.02);">
        <input id="aiInput" style="flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; padding:12px; border-radius:12px; outline:none; font-size:14px;" placeholder="詢問關於 ONYX 技術..." autocomplete="off">
        <button type="submit" style="background:var(--cyan); border:none; color:#000; padding:0 16px; border-radius:12px; cursor:pointer; font-weight:bold; font-size:14px;">SEND</button>
      </form>
    `;

    document.body.appendChild(trigger);
    document.body.appendChild(panel);

    trigger.onclick = () => panel.classList.toggle("open");
    document.getElementById("aiClose").onclick = () => panel.classList.remove("open");
  }

  // 3. 渲染對話訊息
  function renderMessage(logEl, role, text, isStreaming = false) {
    let msgDiv;
    if (isStreaming && role === "bot") {
      msgDiv = logEl.querySelector(".ai-msg.bot.streaming");
    }

    if (!msgDiv) {
      msgDiv = document.createElement("div");
      msgDiv.className = `ai-msg ${role} ${isStreaming ? 'streaming' : ''}`;
      
      // 設定基本氣泡樣式 (若 style.css 沒定義則採用 inline)
      const isBot = role === "bot";
      msgDiv.style.alignSelf = isBot ? "flex-start" : "flex-end";
      msgDiv.style.background = isBot ? "rgba(0,232,223,0.08)" : "rgba(255,255,255,0.05)";
      msgDiv.style.borderLeft = isBot ? "2px solid var(--cyan)" : "none";
      msgDiv.style.padding = "12px 16px";
      msgDiv.style.borderRadius = isBot ? "0 14px 14px 14px" : "14px 14px 0 14px";
      msgDiv.style.maxWidth = "90%";
      msgDiv.style.fontSize = "14px";
      msgDiv.style.lineHeight = "1.7";
      msgDiv.style.color = isBot ? "#edf2f7" : "#fff";
      
      logEl.appendChild(msgDiv);
    }

    msgDiv.innerText = text;
    logEl.scrollTop = logEl.scrollHeight;
    return msgDiv;
  }

  // 4. SSE 串流解析與請求
  async function streamReply(query, logEl, history) {
    const botBubble = renderMessage(logEl, "bot", "...", true);
    let fullText = "";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          systemPrompt: SYSTEM_PROMPT
        })
      });

      if (!response.ok) throw new Error("API Connection Failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        
        // 解析 Gemini SSE 格式 (簡化解析邏輯)
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.trim().startsWith('data: ')) {
            try {
              const data = JSON.parse(line.replace('data: ', ''));
              const content = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
              fullText += content;
              botBubble.innerText = fullText;
              logEl.scrollTop = logEl.scrollHeight;
            } catch (e) { /* 忽略不完整的 JSON 片段 */ }
          }
        }
      }

      botBubble.classList.remove("streaming");
      history.push({ role: "bot", text: fullText });
      saveHistory(history);

    } catch (err) {
      console.error("AI Error:", err);
      botBubble.innerText = "連線中斷，請確認 Cloudflare Functions 與 API Key 設定。";
      botBubble.style.color = "var(--danger)";
    }
  }

  // 5. 初始化
  function init() {
    createWidget();
    const logEl = document.getElementById("aiLog");
    const formEl = document.getElementById("aiForm");
    const inputEl = document.getElementById("aiInput");

    const history = loadHistory();
    if (history.length === 0) {
      const welcome = "已連接 ONYX 內部知識庫。我是您的深科技協作助手，請問有什麼我可以幫您的？";
      renderMessage(logEl, "bot", welcome);
      history.push({ role: "bot", text: welcome });
    } else {
      history.forEach(m => renderMessage(logEl, m.role, m.text));
    }

    formEl.onsubmit = async (e) => {
      e.preventDefault();
      const query = inputEl.value.trim();
      if (!query) return;

      inputEl.value = "";
      renderMessage(logEl, "user", query);
      history.push({ role: "user", text: query });
      
      await streamReply(query, logEl, history);
    };
  }

  document.addEventListener("DOMContentLoaded", init);
})();

```
