/* ==================================================================
 * ［第一區：模型API環境配置與金鑰設定］
 * 若需要更換連接到其他的 API Endpoint 或是模型庫位置，直接於此操作設定。
 * ================================================================== */
const AI_SETTINGS = {
    // <--- 【設定模型 API 位置】
    // 若為自有後端或 OpenAI 相容端點，例如: "/api/chat" 或 "https://api.openai.com/v1/chat/completions"
    API_URL: "/api/chat",                    
    
    // <--- 【設定模型名稱】 (如：gpt-4o, gpt-3.5-turbo, gemini-1.5-flash)
    MODEL_NAME: "gpt-3.5-turbo",                          

    // <--- 【設定您的 API 金鑰】(若打自有後端可留空)
    API_KEY: "",                             
};


/* ==================================================================
 * ［第二區：對話預設開頭文字、系統設定與提示指令］
 * ================================================================== */
const AI_CONTENT = {
    SYSTEM_PROMPT: "你是一位專屬 ONYX DEEP TECH 的 AI 協作研究模型，專注於提供冷靜、結構化、可操作的分析，回答請一律使用流暢的繁體中文。",
    WELCOME_MESSAGE: "我是 Onyx，奧尼克斯 Onyx Studio 的協作式研究模型，專注於提供清晰、結構化、可操作的分析。<span class=\"status-tag\">[SYS_OK]</span> 請問有什麼需要我協助的嗎？",
    WELCOME_SUBTITLE: "System Link Active",
    UPLINK_STATUS: "UPLINK_ESTABLISHING...",
    RESPONSE_STATUS: "Response Signal",
    ERROR_TEXT: "[ERR] 連線中斷或回應解析失敗，無法從中獲取最新資料。",
    NODE_ANALYSIS_PROMPT_PREFIX: "目前的「ONYX 節點」即時數據：天氣狀態 ",
    NODE_ANALYSIS_PROMPT_SUFFIX: "。請以繁體中文給出一段約 50 字以內的冷靜、專業的「系統營運評估」。",
    NODE_ANALYSING_TEXT: "<i class=\"fa-solid fa-circle-notch fa-spin\"></i> 分析中...",
    NODE_IDLE_TEXT: "<i class=\"fa-solid fa-sparkles\"></i> AI 分析"
};


/* ==================================================================
 * ［第三區：網頁對象之 DOM 選取器與元件掛載運作邏輯初始化設定］
 * ================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const chatWindow   = document.getElementById("ai-chat-window");
    const toggleBtn    = document.getElementById("ai-chat-trigger-btn");
    const closeBtn     = document.getElementById("ai-chat-close-btn");
    const sendBtn      = document.getElementById("ai-chat-send-btn");
    const chatInput    = document.getElementById("ai-chat-input");
    const msgContainer = document.getElementById("ai-chat-messages");
    const nodeAiBtn    = document.getElementById("ai-node-btn");

    let hasInitializedChat = false;

    if (toggleBtn) toggleBtn.addEventListener("click", toggleChatVisibility);
    if (closeBtn) closeBtn.addEventListener("click", toggleChatVisibility);
    if (sendBtn) sendBtn.addEventListener("click", submitChatMessage);
    if (chatInput) {
        chatInput.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') submitChatMessage();
        });
    }
    if (nodeAiBtn) nodeAiBtn.addEventListener("click", submitNodeEnvironmentAnalysis);


    /* ==================================================================
     * ［第四區：畫面視覺邏輯對應之應用交互核心與互動發信事件處理函式］
     * ================================================================== */
    function toggleChatVisibility() {
        if (!chatWindow) return;
        chatWindow.classList.toggle('hidden');
        chatWindow.classList.toggle('flex');
        
        if (!hasInitializedChat && !chatWindow.classList.contains('hidden')) {
            if(msgContainer) msgContainer.innerHTML = '';
            generateAiBubbleElement(AI_CONTENT.WELCOME_SUBTITLE, AI_CONTENT.WELCOME_MESSAGE, false);
            hasInitializedChat = true;
        }
    }

    async function submitChatMessage() {
        const rawQuery = chatInput.value.trim();
        if (!rawQuery) return;

        const userBubbleWrapper = document.createElement('div');
        userBubbleWrapper.className = "self-end bg-white/5 border border-white/10 p-4 rounded-xl max-w-[85%] break-words text-gray-200";
        userBubbleWrapper.textContent = rawQuery;
        msgContainer.appendChild(userBubbleWrapper);
        chatInput.value = ''; 
        msgContainer.scrollTop = msgContainer.scrollHeight;

        const { aiTextUIContainer } = generateAiBubbleElement(
            "UPLINK", 
            `<span class="animate-pulse font-tech tracking-widest text-cyan-500">${AI_CONTENT.UPLINK_STATUS}</span>`, 
            true
        );

        try {
            await postStreamAIRequest(rawQuery, (updatedStreamString) => {
                const replacedStyledHTML = updatedStreamString
                    .replace(/\n/g, '<br>') 
                    .replace(/\[([A-Z_]+)\]/g, '<span class="status-tag">[$1]</span>');
                aiTextUIContainer.innerHTML = `<span class="text-[9px] font-tech text-cyan-500 block mb-2 uppercase tracking-widest">${AI_CONTENT.RESPONSE_STATUS}</span>${replacedStyledHTML}`;
                msgContainer.scrollTop = msgContainer.scrollHeight;
            });
        } catch (requestError) {
            console.error("取得AI常規模型交流對答處理遭遇非預期打擊狀態:", requestError);
            aiTextUIContainer.innerHTML = `<span class="text-red-400 font-tech text-[10px] uppercase">${AI_CONTENT.ERROR_TEXT}<br>${requestError.message}</span>`;
            msgContainer.scrollTop = msgContainer.scrollHeight;
        }
    }

    async function submitNodeEnvironmentAnalysis() {
        if (!nodeAiBtn) return;

        const vWeather = document.getElementById('env-weather') ? document.getElementById('env-weather').innerText : '';
        const vTemp    = document.getElementById('env-temp')    ? document.getElementById('env-temp').innerText : '';
        const vFlow    = document.getElementById('traffic-vph') ? document.getElementById('traffic-vph').innerText : '';

        nodeAiBtn.innerHTML = AI_CONTENT.NODE_ANALYSING_TEXT;
        nodeAiBtn.disabled  = true;

        const assembledFinalPrompt = `${AI_CONTENT.SYSTEM_PROMPT}\n${AI_CONTENT.NODE_ANALYSIS_PROMPT_PREFIX}${vWeather}，溫度 ${vTemp}，車流 ${vFlow} vph${AI_CONTENT.NODE_ANALYSIS_PROMPT_SUFFIX}`;
        
        try {
            const visualLogsFrame = document.getElementById('log-container');
            const specificLogOuterBody = document.createElement('div');
            specificLogOuterBody.className = "border-l-[2px] border-luxury-gold pl-4 py-3 mt-2 mb-2 bg-luxury-gold/5 rounded-r";
            
            const headTitle = document.createElement('span');
            headTitle.className = "text-luxury-gold font-bold text-[9px] tracking-widest mb-1 block";
            headTitle.innerHTML = '<i class="fa-solid fa-sparkles"></i> AI_STRATEGIC_ANALYSIS_';
            
            const textContentTargetNode = document.createElement('span');
            textContentTargetNode.className = "text-gray-300 text-[11px] leading-relaxed";
            
            specificLogOuterBody.appendChild(headTitle);
            specificLogOuterBody.appendChild(textContentTargetNode);
            if (visualLogsFrame) visualLogsFrame.prepend(specificLogOuterBody);

            await postStreamAIRequest(assembledFinalPrompt, (updatedStreamString) => {
                textContentTargetNode.innerHTML = updatedStreamString.replace(/\n/g, '<br>');
            });

        } catch (requestError) {
            console.error("分析任務獲取處理過程中被干擾：", requestError);
        } finally {
            nodeAiBtn.innerHTML = AI_CONTENT.NODE_IDLE_TEXT;
            nodeAiBtn.disabled  = false;
        }
    }


    /* ==================================================================
     * ［第五區：基礎公用封裝元件生成函式區］(已更新為 OpenAI SSE 相容)
     * ================================================================== */
    
    function generateAiBubbleElement(captionSubtext, sourceInjectHtml, dynamicBindingMode = false) {
        const containerLevelNode = document.createElement('div');
        containerLevelNode.className = "self-start bg-cyan-500/10 border border-cyan-500/10 p-4 rounded-xl max-w-[85%] break-words text-cyan-50 leading-relaxed shadow-inner";
        
        if (!dynamicBindingMode) {
            containerLevelNode.innerHTML = `<span class="text-[9px] font-tech text-cyan-500 block mb-2 uppercase tracking-widest">${captionSubtext}</span>${sourceInjectHtml}`;
            msgContainer.appendChild(containerLevelNode);
            msgContainer.scrollTop = msgContainer.scrollHeight;
            return null;
        } else {
            containerLevelNode.innerHTML = sourceInjectHtml;
            msgContainer.appendChild(containerLevelNode);
            msgContainer.scrollTop = msgContainer.scrollHeight;
            return { aiTextUIContainer: containerLevelNode };
        }
    }

    // 核心 API 呼叫區塊：改寫為相容 OpenAI/SSE 的 Payload 與流解析
    async function postStreamAIRequest(inputDemandQuery, eventCallbackWithStr) {
        // 準備 OpenAI 格式的 Payload
        const restBodyDefinitionData = {
            model: AI_SETTINGS.MODEL_NAME || "gpt-3.5-turbo",
            messages: [
                { role: "system", content: AI_CONTENT.SYSTEM_PROMPT },
                { role: "user", content: inputDemandQuery }
            ],
            stream: true // 開啟 SSE 串流
        };
        
        const headersConfig = { 'Content-Type': 'application/json' };
        if(AI_SETTINGS.API_KEY) {
            headersConfig['Authorization'] = `Bearer ${AI_SETTINGS.API_KEY}`;
        }

        const apiRawFetchReq = await fetch(AI_SETTINGS.API_URL, {
            method: 'POST',
            headers: headersConfig,
            body: JSON.stringify(restBodyDefinitionData)
        });

        if (!apiRawFetchReq.ok) {
            let throwBackCauseText = await apiRawFetchReq.text();
            try {
                const validJSONCause = JSON.parse(throwBackCauseText);
                throwBackCauseText = validJSONCause.error ? (validJSONCause.error.message || validJSONCause.error) : throwBackCauseText;
            } catch(jsonErr) {}
            throw new Error(`遠端連線異常回報 [\n${apiRawFetchReq.status}]: ${throwBackCauseText}`);
        }

        // SSE (Server-Sent Events) 串流資料解析
        const resChunckBufferReadStream = apiRawFetchReq.body.getReader();
        const charStringDecorderTool = new TextDecoder("utf-8");
        
        let accumulatingLiveAnswerContent = '';
        let chunkBuffer = ''; // 用來儲存可能被截斷的字串碎片

        while (true) {
            const { done, value } = await resChunckBufferReadStream.read();
            if (done) break;
            
            // 解碼取得字串，並與前一次未處理完的碎片拼接
            chunkBuffer += charStringDecorderTool.decode(value, { stream: true });
            
            // 透過換行符號切割每一筆資料
            const lines = chunkBuffer.split('\n');
            
            // 將最後一行不完整的資料放回 buffer 等待下一個封包
            chunkBuffer = lines.pop();

            for (const line of lines) {
                const trimmedLine = line.trim();
                
                // 確認是否為 OpenAI 規範的 data 格式
                if (trimmedLine.startsWith('data: ')) {
                    const dataStr = trimmedLine.slice(6);
                    
                    // 結束標記
                    if (dataStr === '[DONE]') continue;

                    try {
                        const parsedData = JSON.parse(dataStr);
                        // 提取 OpenAI 格式下的字串片段 (delta.content)
                        const deltaContent = parsedData.choices?.[0]?.delta?.content || "";
                        if (deltaContent) {
                            accumulatingLiveAnswerContent += deltaContent;
                            eventCallbackWithStr(accumulatingLiveAnswerContent);
                        }
                    } catch (parseError) {
                        console.warn("SSE 解析碎片忽略:", parseError, dataStr);
                    }
                }
            }
        }
    }
});
