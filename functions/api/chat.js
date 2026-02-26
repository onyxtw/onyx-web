// --- 核心 AI 聊天 (正式上線安全版) ---
        async function sendAIChatMessage() {
            const input = document.getElementById('ai-chat-input');
            const q = input.value.trim();
            if (!q) return;

            const msgBox = document.getElementById('ai-chat-messages');
            msgBox.innerHTML += `<div class="self-end bg-white/5 border border-white/10 p-4 rounded-xl max-w-[85%] break-words text-gray-200">${q}</div>`;
            input.value = '';

            const aiDiv = document.createElement('div');
            aiDiv.className = "self-start bg-cyan-500/10 border border-cyan-500/10 p-4 rounded-xl max-w-[85%] break-words text-cyan-50 leading-relaxed shadow-inner";
            aiDiv.innerHTML = '<span class="animate-pulse text-cyan-500 font-tech text-[10px] tracking-widest">UPLINK_ESTABLISHING...</span>';
            msgBox.appendChild(aiDiv);
            msgBox.scrollTop = msgBox.scrollHeight;

            try {
                // 🚀 正式連線到 Cloudflare 後端 Functions，安全隱藏 API Key
                const res = await fetch('/api/chat', { 
                    method: 'POST', 
                    headers: {'Content-Type':'application/json'}, 
                    body: JSON.stringify({ contents: [{parts:[{text: q}]}] }) 
                });

                if (!res.ok) throw new Error(`HTTP 錯誤碼: ${res.status}`);

                const reader = res.body.getReader(); 
                const decoder = new TextDecoder(); 
                let accumulatedText = '';

                while(true) { 
                    const {done, value} = await reader.read(); 
                    if (done) break; 
                    
                    accumulatedText += decoder.decode(value); 
                    
                    const parsedHTML = accumulatedText
                        .replace(/\n/g, '<br>') 
                        .replace(/\[([A-Z_]+)\]/g, '<span class="status-tag">[$1]</span>');
                    
                    aiDiv.innerHTML = `<span class="text-[9px] font-tech text-cyan-500 block mb-2 uppercase tracking-widest">Response Signal</span>${parsedHTML}`; 
                    msgBox.scrollTop = msgBox.scrollHeight; 
                }
            } catch(e) { 
                console.error("AI 聊天連線失敗:", e);
                aiDiv.innerHTML = `<span class="text-red-400 font-tech text-[10px] uppercase">[ERR] UPLINK_LOST: 伺服器未回應</span>`; 
            }
        }
