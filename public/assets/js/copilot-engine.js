document.addEventListener("DOMContentLoaded", () => {

  // === 基本元素 ===
  const buttons = document.querySelectorAll("[data-engine]");
  const output = document.getElementById("engine-output");
  const input = document.getElementById("engine-input");
  const sendBtn = document.getElementById("engine-send");
  const responseBox = document.getElementById("engine-response");

  let currentMode = "TerraCore Runtime";

  // === v1.1 模式切換 ===
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentMode = btn.getAttribute("data-engine");
      output.textContent = `已切換至行為矩陣模式：${currentMode}`;
    });
  });

  // === v1.2 指令送出（Functions API） ===
  sendBtn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;

    responseBox.textContent = "處理中…";

    try {
      const res = await fetch("/functions/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: currentMode,
          message: text
        })
      });

      const data = await res.json();
      const m = data.matrix;

      // === v1.4 矩陣視覺化 ===
      let modeClass = "matrix-generic";
      if (m.layer === "TerraCore") modeClass = "matrix-terra";
      else if (m.layer === "G.E.M.S.") modeClass = "matrix-gems";
      else if (m.layer === "T.C.P.") modeClass = "matrix-tcp";
      else if (m.layer === "LPDDR5") modeClass = "matrix-lpddr5";

      responseBox.innerHTML = `
        <div class="matrix-grid ${modeClass}">
          <div class="matrix-cell">
            <h4>Layer</h4>
            <div>${m.layer}</div>
          </div>
          <div class="matrix-cell">
            <h4>Type</h4>
            <div>${m.type}</div>
          </div>
          <div class="matrix-cell">
            <h4>Input</h4>
            <div>${m.input}</div>
          </div>
          <div class="matrix-cell">
            <h4>Output</h4>
            <div>${m.output}</div>
          </div>
        </div>
      `;
    } catch (err) {
      responseBox.textContent = "錯誤：無法連線到 ONYX AI 引擎。";
    }
  });

  // === v1.5 行為模擬器 ===
  const simBtn = document.getElementById("engine-simulate");
  const simOut = document.getElementById("engine-sim-output");

  simBtn.addEventListener("click", () => {
    let seq = [];

    if (currentMode === "TerraCore Runtime") {
      seq = [
        "Step 1: 掃描地脈資料流",
        "Step 2: 建立 TerraCore 計算矩陣",
        "Step 3: 執行地脈推演",
        "Step 4: 回寫至 Runtime Matrix"
      ];
    } else if (currentMode === "G.E.M.S. Energy Flow") {
      seq = [
        "Step 1: 收集 AI 廢熱",
        "Step 2: 導入地熱反應池",
        "Step 3: 觸發元素精煉序列",
        "Step 4: 更新能源流矩陣"
      ];
    } else if (currentMode === "T.C.P. Metabolic") {
      seq = [
        "Step 1: 掃描地脈代謝路徑",
        "Step 2: 建立 Terra-Compute Protocol 映射",
        "Step 3: 執行代謝協定序列",
        "Step 4: 回寫地脈閉環狀態"
      ];
    } else if (currentMode === "LPDDR5 Self-Heal") {
      seq = [
        "Step 1: 掃描暫存層錯誤區段",
        "Step 2: 建立自動修復矩陣",
        "Step 3: 執行修復與重映射",
        "Step 4: 更新 Runtime Matrix 狀態"
      ];
    } else {
      seq = [
        "Step 1: 一般模式初始化",
        "Step 2: 執行標準行為序列",
        "Step 3: 回寫狀態至矩陣"
      ];
    }

    simOut.textContent = seq.join("\n");
  });

  // === v1.6 行為動畫器（逐格渲染） ===
  const animBtn = document.getElementById("engine-animate");
  const animOut = document.getElementById("engine-anim-output");

  animBtn.addEventListener("click", async () => {
    animOut.textContent = "";
    let frames = [];

    if (currentMode === "TerraCore Runtime") {
      frames = [
        "[Frame 1] 地脈資料流啟動",
        "[Frame 2] TerraCore 計算矩陣展開",
        "[Frame 3] 地脈推演進行中",
        "[Frame 4] TerraCore 回寫至 Runtime Matrix"
      ];
    } else if (currentMode === "G.E.M.S. Energy Flow") {
      frames = [
        "[Frame 1] 收集 AI 廢熱",
        "[Frame 2] 地熱反應池啟動",
        "[Frame 3] 元素精煉序列進行中",
        "[Frame 4] 能源流矩陣更新"
      ];
    } else if (currentMode === "T.C.P. Metabolic") {
      frames = [
        "[Frame 1] 掃描地脈代謝路徑",
        "[Frame 2] 建立 T.C.P. 映射",
        "[Frame 3] 代謝協定序列進行中",
        "[Frame 4] 地脈閉環狀態更新"
      ];
    } else if (currentMode === "LPDDR5 Self-Heal") {
      frames = [
        "[Frame 1] 掃描暫存層錯誤區段",
        "[Frame 2] 建立修復矩陣",
        "[Frame 3] 修復與重映射進行中",
        "[Frame 4] 暫存層狀態更新"
      ];
    } else {
      frames = [
        "[Frame 1] 一般模式啟動",
        "[Frame 2] 標準行為序列進行中",
        "[Frame 3] 狀態回寫矩陣"
      ];
    }

    for (let i = 0; i < frames.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      animOut.textContent += frames[i] + "\n";
    }
  });

  // === v1.7 演化樹（Evolution Tree） ===
  const evolveBtn = document.getElementById("engine-evolve");
  const evolveOut = document.getElementById("engine-evolve-output");

  evolveBtn.addEventListener("click", () => {
    let tree = [];

    if (currentMode === "TerraCore Runtime") {
      tree = [
        "TerraCore",
        " ├─ 地脈資料流",
        " │   ├─ 地脈節點掃描",
        " │   └─ 地脈壓力映射",
        " └─ TerraCore 計算矩陣",
        "     ├─ 推演核心",
        "     └─ 回寫閉環"
      ];
    } else if (currentMode === "G.E.M.S. Energy Flow") {
      tree = [
        "G.E.M.S.",
        " ├─ AI 廢熱收集",
        " │   ├─ 熱流分層",
        " │   └─ 熱能映射",
        " └─ 地熱反應池",
        "     ├─ 元素精煉",
        "     └─ 能源流閉環"
      ];
    } else if (currentMode === "T.C.P. Metabolic") {
      tree = [
        "T.C.P.",
        " ├─ 地脈代謝路徑",
        " │   ├─ 地脈節點代謝",
        " │   └─ 地脈壓力代謝",
        " └─ Terra-Compute Protocol",
        "     ├─ 協定推演",
        "     └─ 閉環更新"
      ];
    } else if (currentMode === "LPDDR5 Self-Heal") {
      tree = [
        "LPDDR5",
        " ├─ 暫存層錯誤掃描",
        " │   ├─ 錯誤節點定位",
        " │   └─ 錯誤映射",
        " └─ 自動修復矩陣",
        "     ├─ 修復序列",
        "     └─ 重映射閉環"
      ];
    } else {
      tree = [
        "Generic",
        " ├─ 標準初始化",
        " └─ 標準閉環"
      ];
    }

    evolveOut.textContent = tree.join("\n");
  });

  // === v1.8 演化地圖（Evolution Map） ===
  const mapBtn = document.getElementById("engine-map");
  const mapOut = document.getElementById("engine-map-output");

  mapBtn.addEventListener("click", () => {

    let map = {
      title: "",
      blocks: []
    };

    if (currentMode === "TerraCore Runtime") {
      map.title = "TerraCore Evolution Map";
      map.blocks = [
        { name: "Origin",  desc: "地脈資料流啟動" },
        { name: "Process", desc: "TerraCore 計算矩陣展開" },
        { name: "Node",    desc: "地脈推演節點生成" },
        { name: "Closure", desc: "回寫至 Runtime Matrix" }
      ];
    }

    else if (currentMode === "G.E.M.S. Energy Flow") {
      map.title = "G.E.M.S. Evolution Map";
      map.blocks = [
        { name: "Origin",  desc: "AI 廢熱收集" },
        { name: "Process", desc: "地熱反應池啟動" },
        { name: "Node",    desc: "元素精煉節點生成" },
        { name: "Closure", desc: "能源流閉環更新" }
      ];
    }

    else if (currentMode === "T.C.P. Metabolic") {
      map.title = "T.C.P. Evolution Map";
      map.blocks = [
        { name: "Origin",  desc: "地脈代謝路徑掃描" },
        { name: "Process", desc: "T.C.P. 協定映射展開" },
        { name: "Node",    desc: "代謝節點推演" },
        { name: "Closure", desc: "地脈閉環狀態更新" }
      ];
    }

    else if (currentMode === "LPDDR5 Self-Heal") {
      map.title = "LPDDR5 Evolution Map";
      map.blocks = [
        { name: "Origin",  desc: "暫存層錯誤掃描" },
        { name: "Process", desc: "修復矩陣展開" },
        { name: "Node",    desc: "修復節點生成" },
        { name: "Closure", desc: "重映射閉環更新" }
      ];
    }

    else {
      map.title = "Generic Evolution Map";
      map.blocks = [
        { name: "Origin",  desc: "標準初始化" },
        { name: "Process", desc: "標準流程展開" },
        { name: "Node",    desc: "標準節點生成" },
        { name: "Closure", desc: "標準閉環更新" }
      ];
    }

    // === Render Map ===
    let html = `
      <div style="border:1px solid #333;padding:15px;background:#111;">
        <h3 style="color:#00e0ff;margin-top:0;">${map.title}</h3>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:15px;">
    `;

    map.blocks.forEach(b => {
      html += `
        <div style="border:1px solid #444;padding:12px;background:#181818;">
          <div style="font-size:14px;color:#00e0ff;margin-bottom:6px;">${b.name}</div>
          <div style="font-size:13px;color:#ccc;">${b.desc}</div>
        </div>
      `;
    });

    html += `</div></div>`;
    mapOut.innerHTML = html;
  });

  // === v1.9 演化圖譜（Evolution Atlas） ===
  const atlasBtn = document.getElementById("engine-atlas");
  const atlasOut = document.getElementById("engine-atlas-output");

  atlasBtn.addEventListener("click", () => {

    let atlas = {
      title: "",
      layers: []
    };

    if (currentMode === "TerraCore Runtime") {
      atlas.title = "TerraCore Evolution Atlas";
      atlas.layers = [
        {
          name: "地脈資料層",
          items: [
            "地脈壓力分佈",
            "地脈節點拓撲",
            "地脈流動向量"
          ]
        },
        {
          name: "推演計算層",
          items: [
            "TerraCore 計算矩陣",
            "推演核心",
            "地脈預測模型"
          ]
        },
        {
          name: "節點生成層",
          items: [
            "地脈推演節點",
            "地脈壓力節點",
            "地脈流動節點"
          ]
        },
        {
          name: "閉環回寫層",
          items: [
            "Runtime Matrix 回寫",
            "地脈閉環更新",
            "TerraCore 狀態同步"
          ]
        }
      ];
    }

    else if (currentMode === "G.E.M.S. Energy Flow") {
      atlas.title = "G.E.M.S. Evolution Atlas";
      atlas.layers = [
        {
          name: "熱源資料層",
          items: [
            "AI 廢熱分佈",
            "熱流向量",
            "熱能密度圖"
          ]
        },
        {
          name: "反應池層",
          items: [
            "地熱反應池",
            "熱能轉換矩陣",
            "元素精煉序列"
          ]
        },
        {
          name: "元素生成層",
          items: [
            "精煉節點",
            "元素生成拓撲",
            "能量流節點"
          ]
        },
        {
          name: "閉環更新層",
          items: [
            "能源流閉環",
            "G.E.M.S. 狀態同步",
            "熱能回寫矩陣"
          ]
        }
      ];
    }

    else if (currentMode === "T.C.P. Metabolic") {
      atlas.title = "T.C.P. Evolution Atlas";
      atlas.layers = [
        {
          name: "代謝資料層",
          items: [
            "地脈代謝路徑",
            "代謝壓力分佈",
            "代謝節點拓撲"
          ]
        },
        {
          name: "協定映射層",
          items: [
            "T.C.P. 映射矩陣",
            "代謝協定序列",
            "代謝推演模型"
          ]
        },
        {
          name: "節點生成層",
          items: [
            "代謝節點生成",
            "代謝壓力節點",
            "代謝流動節點"
          ]
        },
        {
          name: "閉環更新層",
          items: [
            "地脈閉環更新",
            "T.C.P. 狀態同步",
            "代謝矩陣回寫"
          ]
        }
      ];
    }

    else if (currentMode === "LPDDR5 Self-Heal") {
      atlas.title = "LPDDR5 Evolution Atlas";
      atlas.layers = [
        {
          name: "錯誤資料層",
          items: [
            "錯誤節點分佈",
            "錯誤映射矩陣",
            "錯誤壓力圖"
          ]
        },
        {
          name: "修復矩陣層",
          items: [
            "自動修復矩陣",
            "修復序列",
            "重映射模型"
          ]
        },
        {
          name: "節點生成層",
          items: [
            "修復節點生成",
            "重映射節點",
            "暫存層節點拓撲"
          ]
        },
        {
          name: "閉環更新層",
          items: [
            "LPDDR5 狀態更新",
            "重映射閉環",
            "Runtime Matrix 回寫"
          ]
        }
      ];
    }

    else {
      atlas.title = "Generic Evolution Atlas";
      atlas.layers = [
        {
          name: "資料層",
          items: ["標準資料流", "標準拓撲", "標準向量"]
        },
        {
          name: "處理層",
          items: ["標準流程", "標準矩陣", "標準模型"]
        },
        {
          name: "節點層",
          items: ["標準節點", "標準拓撲", "標準生成"]
        },
        {
          name: "閉環層",
          items: ["標準閉環", "標準回寫", "標準同步"]
        }
      ];
    }

    let html = `
      <div style="border:1px solid #333;padding:15px;background:#111;">
        <h3 style="color:#00e0ff;margin-top:0;">${atlas.title}</h3>
    `;

    atlas.layers.forEach(layer => {
      html += `
        <div style="margin-top:15px;border:1px solid #444;padding:12px;background:#181818;">
          <div style="font-size:15px;color:#00e0ff;margin-bottom:8px;">${layer.name}</div>
      `;
      layer.items.forEach(item => {
        html += `
          <div style="font-size:13px;color:#ccc;margin-left:10px;">- ${item}</div>
        `;
      });
      html += `
        </div>
      `;
    });

    html += `
      </div>
    `;
    atlasOut.innerHTML = html;
  });

  // === v2.0 主權矩陣引擎（Matrix Sovereign Engine） ===
  const sovereignBtn = document.getElementById("engine-sovereign");
  const sovereignOut = document.getElementById("engine-sovereign-output");

  if (sovereignBtn && sovereignOut) {
    sovereignBtn.addEventListener("click", () => {

      let log = [];
      let engine = {
        mode: currentMode,
        phases: [],
        status: "idle"
      };

      // Phase 1: 自動生成矩陣
      engine.phases.push("auto-generate");
      if (currentMode === "TerraCore Runtime") {
        log.push("[Generate] 建立 TerraCore 自動生成矩陣");
        log.push("[Generate] 掃描地脈資料層與推演層");
      } else if (currentMode === "G.E.M.S. Energy Flow") {
        log.push("[Generate] 建立 G.E.M.S. 能源自動生成矩陣");
        log.push("[Generate] 掃描熱源資料層與反應池層");
      } else if (currentMode === "T.C.P. Metabolic") {
        log.push("[Generate] 建立 T.C.P. 代謝自動生成矩陣");
        log.push("[Generate] 掃描代謝資料層與協定映射層");
      } else if (currentMode === "LPDDR5 Self-Heal") {
        log.push("[Generate] 建立 LPDDR5 自動生成修復矩陣");
        log.push("[Generate] 掃描錯誤資料層與修復矩陣層");
      } else {
        log.push("[Generate] 建立 Generic 自動生成矩陣");
        log.push("[Generate] 掃描標準資料層與處理層");
      }

      // Phase 2: 自動修復矩陣
      engine.phases.push("auto-heal");
      if (currentMode === "LPDDR5 Self-Heal") {
        log.push("[Heal] 啟動 LPDDR5 自動修復序列");
        log.push("[Heal] 重映射錯誤節點與暫存層拓撲");
      } else {
        log.push("[Heal] 啟動一般矩陣自動修復序列");
        log.push("[Heal] 修復異常節點與閉環狀態");
      }

      // Phase 3: 自動優化矩陣
      engine.phases.push("auto-optimize");
      log.push("[Optimize] 掃描 Atlas 圖譜各層級負載");
      log.push("[Optimize] 調整節點權重與閉環優先序");
      log.push("[Optimize] 更新 Runtime Matrix 最終狀態");

      // Phase 4: 主權狀態確認
      engine.status = "sovereign-active";
      log.push("[Sovereign] 主權矩陣引擎已啟動");
      log.push(`[Sovereign] 當前模式：${currentMode}`);
      log.push(`[Sovereign] 已執行階段：${engine.phases.join(" → ")}`);

      sovereignOut.textContent = log.join("\n");
    });
  }

});

  // === v2.1 主權自動修復閉環（Sovereign Auto-Repair Loop） ===
  const repairBtn = document.getElementById("engine-repair");
  const repairOut = document.getElementById("engine-repair-output");

  if (repairBtn && repairOut) {
    repairBtn.addEventListener("click", () => {

      let log = [];
      let state = {
        mode: currentMode,
        anomalies: [],
        repaired: [],
        closed: false
      };

      // Phase 1: 掃描矩陣異常（狀態比較）
      log.push("[Scan] 掃描當前矩陣狀態與 Atlas 圖譜基準值");

      if (currentMode === "TerraCore Runtime") {
        state.anomalies = [
          "地脈壓力峰值超標",
          "地脈節點拓撲不穩定",
          "地脈流動向量出現反向波動"
        ];
      } else if (currentMode === "G.E.M.S. Energy Flow") {
        state.anomalies = [
          "AI 廢熱分佈過度集中",
          "地熱反應池負載過高",
          "元素精煉序列延遲"
        ];
      } else if (currentMode === "T.C.P. Metabolic") {
        state.anomalies = [
          "代謝壓力分佈失衡",
          "代謝節點拓撲出現瓶頸",
          "協定推演序列阻塞"
        ];
      } else if (currentMode === "LPDDR5 Self-Heal") {
        state.anomalies = [
          "錯誤節點分佈異常集中",
          "修復矩陣負載過高",
          "重映射閉環延遲"
        ];
      } else {
        state.anomalies = [
          "標準節點負載偏高",
          "閉環更新頻率異常",
          "一般矩陣狀態偏離基準"
        ];
      }

      if (state.anomalies.length > 0) {
        log.push("[Scan] 偵測到異常項目：");
        state.anomalies.forEach(a => log.push("  - " + a));
      } else {
        log.push("[Scan] 未偵測到明顯異常，維持監控狀態。");
      }

      // Phase 2: 生成修復節點（Auto-Repair Nodes）
      log.push("[Repair] 生成主權級修復節點並映射至 Atlas 圖譜層級");

      state.repaired = state.anomalies.map(a => {
        return "修復節點已建立：" + a;
      });

      state.repaired.forEach(r => log.push("  * " + r));

      // Phase 3: 執行閉環修復（Closure Loop）
      log.push("[Closure] 啟動閉環修復序列，回寫至 Runtime Matrix");

      if (currentMode === "LPDDR5 Self-Heal") {
        log.push("[Closure] LPDDR5 暫存層狀態重新校正");
        log.push("[Closure] 錯誤節點重映射完成");
      } else if (currentMode === "TerraCore Runtime") {
        log.push("[Closure] 地脈壓力分佈重新平衡");
        log.push("[Closure] 地脈節點拓撲穩定化完成");
      } else if (currentMode === "G.E.M.S. Energy Flow") {
        log.push("[Closure] 熱源分佈重新調整");
        log.push("[Closure] 反應池負載回到安全範圍");
      } else if (currentMode === "T.C.P. Metabolic") {
        log.push("[Closure] 代謝壓力重新分配");
        log.push("[Closure] 協定推演序列恢復正常");
      } else {
        log.push("[Closure] 一般矩陣閉環修復完成");
      }

      state.closed = true;

      // Phase 4: 主權狀態回報
      log.push("[Sovereign] 主權自動修復閉環已完成");
      log.push("[Sovereign] 當前模式：" + currentMode);
      log.push("[Sovereign] 異常項目數量：" + state.anomalies.length);
      log.push("[Sovereign] 修復節點數量：" + state.repaired.length);
      log.push("[Sovereign] 閉環狀態：" + (state.closed ? "已閉環" : "未閉環"));

      repairOut.textContent = log.join("\n");
    });
  }

  // === v2.2 主權矩陣自動優化（Sovereign Auto-Optimize Matrix） ===
  const optimizeBtn = document.getElementById("engine-optimize");
  const optimizeOut = document.getElementById("engine-optimize-output");

  if (optimizeBtn && optimizeOut) {
    optimizeBtn.addEventListener("click", () => {

      let log = [];
      let profile = {
        mode: currentMode,
        load: {},
        suggestions: [],
        applied: false
      };

      // Phase 1: 負載分析（Load Analysis）
      log.push("[Analyze] 掃描當前矩陣負載與節點分佈");

      if (currentMode === "TerraCore Runtime") {
        profile.load = {
          pressure: "高",
          topology: "複雜",
          flow: "不穩定"
        };
        log.push("[Analyze] TerraCore 地脈壓力負載：高");
        log.push("[Analyze] 地脈節點拓撲：複雜");
        log.push("[Analyze] 地脈流動向量：不穩定");
        profile.suggestions = [
          "降低高壓節點權重",
          "簡化地脈拓撲分支",
          "平衡地脈流動向量"
        ];
      } else if (currentMode === "G.E.M.S. Energy Flow") {
        profile.load = {
          heat: "集中",
          pool: "高負載",
          flow: "延遲"
        };
        log.push("[Analyze] G.E.M.S. 熱源分佈：集中");
        log.push("[Analyze] 地熱反應池負載：偏高");
        log.push("[Analyze] 能源流動：存在延遲");
        profile.suggestions = [
          "分散熱源節點負載",
          "降低反應池峰值輸入",
          "優化能源流路徑"
        ];
      } else if (currentMode === "T.C.P. Metabolic") {
        profile.load = {
          metabolism: "失衡",
          protocol: "瓶頸",
          flow: "阻塞"
        };
        log.push("[Analyze] T.C.P. 代謝壓力：失衡");
        log.push("[Analyze] 協定映射：出現瓶頸");
        log.push("[Analyze] 代謝流動：部分阻塞");
        profile.suggestions = [
          "重新分配代謝壓力",
          "重構協定映射路徑",
          "疏通代謝流動節點"
        ];
      } else if (currentMode === "LPDDR5 Self-Heal") {
        profile.load = {
          error: "集中",
          repair: "高負載",
          remap: "頻繁"
        };
        log.push("[Analyze] LPDDR5 錯誤節點：集中");
        log.push("[Analyze] 修復矩陣：高負載");
        log.push("[Analyze] 重映射頻率：偏高");
        profile.suggestions = [
          "分散錯誤節點映射",
          "降低修復矩陣瞬時負載",
          "優化重映射策略"
        ];
      } else {
        profile.load = {
          generic: "偏高",
          topology: "一般",
          flow: "一般"
        };
        log.push("[Analyze] Generic 矩陣負載：偏高");
        log.push("[Analyze] 拓撲結構：一般複雜度");
        log.push("[Analyze] 流動狀態：一般");
        profile.suggestions = [
          "降低高負載節點權重",
          "優化標準拓撲路徑",
          "平衡一般流動負載"
        ];
      }

      // Phase 2: 優化建議列出（Optimization Suggestions）
      log.push("[Optimize] 生成主權級優化建議：");
      profile.suggestions.forEach(s => log.push("  - " + s));

      // Phase 3: 套用優化（Apply Optimization）
      log.push("[Apply] 套用優化策略至 Runtime Matrix 與 Atlas 圖譜");

      if (currentMode === "TerraCore Runtime") {
        log.push("[Apply] TerraCore 地脈節點權重已重新分配");
        log.push("[Apply] 地脈拓撲分支已簡化");
      } else if (currentMode === "G.E.M.S. Energy Flow") {
        log.push("[Apply] 熱源節點負載已分散");
        log.push("[Apply] 反應池輸入峰值已降低");
      } else if (currentMode === "T.C.P. Metabolic") {
        log.push("[Apply] 代謝壓力已重新分配");
        log.push("[Apply] 協定映射路徑已重構");
      } else if (currentMode === "LPDDR5 Self-Heal") {
        log.push("[Apply] 錯誤節點映射已分散");
        log.push("[Apply] 修復矩陣負載已平衡");
      } else {
        log.push("[Apply] 一般矩陣節點權重已優化");
        log.push("[Apply] 標準拓撲路徑已調整");
      }

      profile.applied = true;

      // Phase 4: 主權優化狀態回報
      log.push("[Sovereign] 主權矩陣自動優化已完成");
      log.push("[Sovereign] 當前模式：" + currentMode);
      log.push("[Sovereign] 優化建議數量：" + profile.suggestions.length);
      log.push("[Sovereign] 優化是否已套用：" + (profile.applied ? "是" : "否"));

      optimizeOut.textContent = log.join("\n");
    });
  }

