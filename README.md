# 🚀 ONYX DEEP TECH STUDIO 官方網站部署與維護指南 (v7.0)

這份指南將協助您將 ONYX 官網的最終完美形態部署至 Cloudflare Pages，並詳細說明如何管理文章內容以及確保 AI 核心功能的穩定運作。

## 📁 1. GitHub 儲存庫的最終檔案結構

為了確保「4D 訊號光子流動背景」、AI 串流對話與整體視覺效果能完美呈現，請確保您的 GitHub 儲存庫根目錄下**精確包含**以下檔案結構：

```text
您的 GitHub 儲存庫 (例如: onyx-website)
│
├── index.html        (網站主程式：包含所有分頁版面、3D 引擎、動畫與核心邏輯)
├── articles.json     (文章資料庫：存放所有「焦點訊息」的文章內容)
├── IMG_4879.png      (ONYX 品牌主 Logo，用於頂部導覽列，注意副檔名為小寫 .png)
├── IMG_4889.jpeg     (ONYX 品牌小 Logo，用於瀏覽器標籤 Favicon 與 AI 懸浮按鈕)
├── favicon.png       (網頁標籤備用圖示，建議與 IMG_4889.jpeg 相同圖案)
│
└── functions/        (✨ Cloudflare Pages Functions 目錄 - 確保此資料夾存在)
    └── api/
        └── chat.js   (✨ AI 核心中繼層：安全處理 Gemini API 請求，支援串流)
```

**⚠️ 重要提示：**
1.  我們已將 3D 背景升級為**純程式碼生成的「4D 訊號光子流動」**，因此**不再需要**上傳 `ONYX_Lidao_Aerial_1.jpg` 或其他網格圖片。這大幅提升了網頁載入速度。
2.  `functions/api/chat.js` 檔案及其父資料夾 `functions/api/` 必須**精確按照上述路徑結構**建立，否則 AI 聊天將無法連線。

---

## ☁️ 2. 部署至 Cloudflare Pages 的完整步驟

如果您已經有 GitHub 儲存庫並連接至 Cloudflare Pages，請按照以下步驟更新至 v7.0：

### **步驟一：更新 GitHub 儲存庫中的所有檔案**

1.  **登入 GitHub**：進入您的網站專案儲存庫（Repository）。
2.  **上傳或更新圖片檔案**：
    *   點擊 `Add file` -> `Upload files`。
    *   將最新的 `IMG_4879.png` (主 Logo) 和 `IMG_4889.jpeg` (小 Logo/AI 按鈕) 拖曳到上傳區塊。
    *   提交更改 (Commit changes)。
3.  **更新 `index.html`**：
    *   點擊 `index.html` 檔案。
    *   點擊右上角的 ✏️ (鉛筆圖示) 進入編輯模式。
    *   **將裡面的所有舊程式碼全部刪除**，然後貼上您獲取到的**最新 v7.0 `index.html` 代碼**。
    *   在下方輸入備註（例如："Update to v7.0 with 4D background and refined UI"），點擊綠色的 **Commit changes** 按鈕。
4.  **檢查並更新 `functions/api/chat.js`**：
    *   確保 `functions/api/chat.js` 存在且內容為最新支援串流 (Streaming) 的版本。如果需要更新，依照編輯 `index.html` 的方式進行替換並 Commit。
5.  **更新 `articles.json`**：
    *   確保 `articles.json` 存在且格式正確（參見後文第 3 節說明）。

### **步驟二：在 Cloudflare Dashboard 設定 API 金鑰 (安全性核心)**

*如果您之前已經設定過，且金鑰未變更，可跳過此步驟。但強烈建議再次確認。*

1.  **登入 Cloudflare Dashboard**：前往 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)。
2.  **導航至 Pages 專案**：在左側選單中，點擊 **Workers & Pages**，選擇您的 ONYX 網站專案。
3.  **進入專案設定**：點擊上方的 **設定 (Settings)** 標籤頁。
4.  **設定環境變數**：在左側子選單中，點擊 **環境變數 (Environment variables)**。
5.  **確認金鑰變數**：
    *   在「正式環境 (Production)」區塊中，確認存在名為 **`GEMINI_API_KEY`** 的變數。
    *   如果沒有，點擊「新增變數 (Add variable)」，名稱填入 `GEMINI_API_KEY`，值填入您的 Google Gemini API 金鑰，並點擊「儲存 (Save)」。

### **步驟三：重新部署 Cloudflare Pages (讓所有設定生效)**

當您在 GitHub 更新了檔案，或在 Cloudflare 修改了環境變數後，必須手動觸發重新部署。

1.  在 Cloudflare 專案頁面中，點擊上方的 **部署 (Deployments)** 標籤頁。
2.  找到列表中最上方（最新）的一筆部署紀錄。
3.  點擊該紀錄右邊的 **三個點 (...)** 圖示。
4.  選擇 **重試部署 (Retry deployment)**。
5.  等待大約 1 到 3 分鐘，直到部署狀態顯示為綠色的「**成功 (Success)**」。

### 🎉 恭喜！您的 ONYX 官網 v7.0 已全面升級！

請開啟您的網站，並**務必在瀏覽器中按 `Ctrl + F5` (Windows) 或 `Cmd + Shift + R` (Mac) 強制重新整理並清除快取**。

您將體驗到：
*   **系統開機儀式**：進入網站時的專屬「System Initializing」載入畫面。
*   **4D 沉浸式背景**：取代靜態圖片，由程式碼生成的「訊號光子流動與數據雲」，具備強烈的裸視 3D 與滑鼠視差效果。
*   **全域即時跑馬燈**：畫面底部的 Ticker，隨時輪播系統狀態與環境數據。
*   **極致流暢的 AI 體驗**：右下角的專屬六角形 Logo AI 按鈕，點擊後展開串流對話視窗。
*   **全新佈局**：更純粹的首頁標語、新增的戰略展示廣告窗，以及整合完善的「關於 ONYX」頁面。

---

## 📝 3. 未來如何發佈新文章或修改內容？

未來您更新「焦點訊息」的文章時，**完全不需要修改 `index.html`**。您只需編輯 `articles.json` 檔案即可。

### **步驟說明：**

1.  **進入 GitHub 您的儲存庫**：點擊打開 `articles.json` 檔案。
2.  **進入編輯模式**：點擊右上角的 ✏️ 鉛筆圖示 (Edit this file)。
3.  **修改內容**：依照 JSON 格式新增或修改文章。
4.  **儲存發佈**：點擊右上角綠色的 `Commit changes...` 儲存，Cloudflare 會自動偵測並更新您的網站（約需 1-2 分鐘）。

### **💡 格式教學與注意事項：**

JSON 是一種結構化的資料格式，每一個 `{ ... }` 代表一篇文章。

**如何「新增」一篇文章？**

請複製現有的其中一個文章區塊，並貼在最上方或最下方。請特別注意**逗號 (`,`) 的使用**：兩個文章區塊之間**一定要有逗號**，但**最後一個區塊的結尾「不能」有逗號**。

**正確的格式範例：**

```json[
  {
    "id": "article-04",
    "date": "2026-03-10",
    "category": "NEW ANNOUNCEMENT",
    "title": "這是最新發佈的文章標題",
    "summary": "顯示在外面卡片上的簡短摘要文字，吸引點擊。",
    "content": "<p class='mb-4'>這是文章的第一段。</p><p>這是文章的第二段，可以加粗體 <strong>重點文字</strong>。</p>"
  },
  {
    "id": "article-01",
    "date": "2026-03-01",
    "category": "RESEARCH REPORT",
    "title": "逆熵運算架構在極端高山環境的潛力分析",
    "summary": "探討如何利用晶體生長演算法，在極端區域建立高韌性邊緣運算節點...",
    "content": "<p class='mb-4'>隨著邊緣運算需求上升，本報告探討了 ONYX 的核心技術。</p><p class='mb-4'>透過模擬礦物結晶，我們能在初期排除無效數據。</p>"
  }
]
```

**欄位說明：**

*   `id`：必須是**唯一的**英文或數字組合（例如 `"article-05"`），不要重複。
*   `date`：文章發佈日期（顯示於卡片右上角）。
*   `category`：文章分類標籤（例如 `"TECH UPDATE"`，顯示於卡片左上角）。
*   `title`：文章主標題。
*   `summary`：顯示在外部卡片上的簡短摘要文字（建議 2-3 行）。
*   `content`：彈出視窗內顯示的完整文章內容，**支援 HTML 語法排版**。

**🎨 內文 (`content`) 的排版小技巧：**

*   **分段落**：使用 `<p class='mb-4'>文字</p>`（`mb-4` 會在段落下方留出適當空白）。
*   **換行**：使用 `<br>`。
*   **粗體字**：使用 `<strong>文字</strong>`。
*   **品牌色強調**：使用 `<span class='text-cyan-400'>科技感青色文字</span>` 或 `<span class='text-luxury-gold'>高貴金色文字</span>`。

**如何「刪除」一篇文章？**

只要在 GitHub 編輯模式下，將不要的那個 `{ ... }` 整個文章區塊刪除（包含其與前後區塊連接的逗號），再 Commit 儲存即可。

掌握此 `articles.json` 的更新方式，您就擁有了一個輕量、極速且高度客製化的內容發佈後台！
