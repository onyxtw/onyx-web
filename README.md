# 🚀 ONYX DEEP TECH STUDIO 官方網站部署指南

這份指南將協助您將 ONYX 官網部署至 Cloudflare Pages，並說明如何管理文章內容以及 AI 核心功能的設定。

## 📁 1. GitHub 儲存庫的最終檔案結構

為了確保網站功能與視覺效果完美呈現，請確保您的 GitHub 儲存庫根目錄下包含以下檔案：

```
您的 GitHub 儲存庫 (例如: onyx-website)
│
├── index.html        (網站主程式：包含所有版面、設計、動畫與核心邏輯)
├── articles.json     (文章資料庫：存放所有「焦點訊息」的文章內容)
├── IMG_4879.PNG      (ONYX 品牌 Logo)
├── IMG_4889.jpeg     (AI 聊天機器人按鈕圖示)
├── ONYX_Lidao_Aerial_1.jpg  (✨ 3D 數位地圖背景的高解析度空拍圖)
│
└── functions/        (✨ Cloudflare Pages Functions 目錄 - 確保此資料夾存在)
    └── api/
        └── chat.js   (✨ AI 核心中繼層：安全處理 Gemini API 請求，支援串流)
```

**重要提示：**
*   請務必將您選擇的**利稻村空拍圖命名為 `ONYX_Lidao_Aerial_1.jpg`**，並放置在根目錄。
*   `functions/api/chat.js` 檔案及其父資料夾 `functions/api/` 必須**精確按照上述路徑結構**建立。

## ☁️ 2. 部署至 Cloudflare Pages 的完整步驟

如果您已經有 GitHub 儲存庫並連接至 Cloudflare Pages，請按照以下步驟更新：

### **步驟一：更新 GitHub 儲存庫中的所有檔案**

1.  **登入 GitHub**：進入您的網站專案儲存庫（Repository）。
2.  **更新 `index.html`**：
    *   點擊 `index.html` 檔案。
    *   點擊右上角的 ✏️ (鉛筆圖示) 進入編輯模式。
    *   **將裡面的所有程式碼全部刪除**，然後貼上您從 Gemini 獲取到的最新 `index.html` 代碼。
    *   在下方「Commit changes」框中輸入備註（例如："Final website update with 3D map and AI streaming"），然後點擊綠色的 **Commit changes** 按鈕。
3.  **更新 `functions/api/chat.js`**：
    *   在 GitHub 儲存庫的首頁，確保 `functions/api/` 資料夾結構存在。如果不存在，點擊 **Add file** -> **Create new file**，然後在檔名框中輸入 `functions/api/chat.js`，GitHub 會自動建立資料夾。
    *   進入 `functions/api/chat.js` 檔案，點擊右上角的 ✏️ 進入編輯模式。
    *   **將裡面的所有程式碼全部刪除**，然後貼上您從 Gemini 獲取到的最新 `chat.js` 代碼（**這是支援 AI 串流的關鍵**）。
    *   提交更改 (Commit changes)。
4.  **上傳圖片檔案**：
    *   在 GitHub 儲存庫的首頁，點擊 **Add file** -> **Upload files**。
    *   將您準備好的 `ONYX_Lidao_Aerial_1.jpg`、`IMG_4879.PNG`、`IMG_4889.jpeg` (以及可選的 `grid_pattern.png` 和 `signal_dot.png`) **全部拖曳到上傳區塊**。
    *   提交更改 (Commit changes)。
5.  **更新 `articles.json`**：
    *   點擊 `articles.json` 檔案。
    *   點擊右上角的 ✏️ 進入編輯模式。
    *   將裡面的所有程式碼全部刪除，然後貼上您從 Gemini 獲取到的最新 `articles.json` 代碼。
    *   提交更改 (Commit changes)。

### **步驟二：在 Cloudflare Dashboard 設定 API 金鑰 (安全性核心)**

這一重要步驟是為了**安全地儲存您的 Google Gemini API 金鑰**，確保它不會暴露在網站的前端程式碼中。

1.  **登入 Cloudflare Dashboard**：前往 [https://dash.cloudflare.com/](https://dash.cloudflare.com/)。
2.  **導航至 Pages 專案**：在左側選單中，點擊 **Workers 與 Pages**，然後選擇您的 ONYX 網站專案。
3.  **進入專案設定**：點擊上方的 **設定 (Settings)** 標籤頁。
4.  **設定環境變數**：在左側子選單中，點擊 **環境變數 (Environment variables)**。
5.  **新增金鑰變數**：
    *   在「**正式環境 (Production)**」區塊中，點擊 **新增變數 (Add variable)**。
    *   **變數名稱 (Variable name)**：請**精確輸入** `GEMINI_API_KEY` (請務必全大寫，一字不差)。
    *   **值 (Value)**：貼上您從 Google 申請的 **Gemini API 金鑰** (這通常是一串類似 `AIzaSy...` 的長字串)。
    *   點擊 **儲存 (Save)**。

### **步驟三：重新部署 Cloudflare Pages (讓所有設定生效)**

當您更新了 GitHub 檔案或 Cloudflare 環境變數後，需要指示 Cloudflare 重新構建並部署您的網站。

1.  在 Cloudflare 專案頁面中，點擊上方的 **部署 (Deployments)** 標籤頁。
2.  找到最上面最新的一筆部署紀錄。
3.  點擊該紀錄右邊的 **三個點 (...)** 圖示。
4.  選擇 **重試部署 (Retry deployment)**。
5.  等待大約 **1 到 3 分鐘**，直到部署狀態顯示為綠色的「**成功 (Success)**」。

### 🎉 **恭喜！您的 ONYX 官網已全面升級！**

現在，請開啟您的 ONYX 官方網站（建議在瀏覽器中按 **`Ctrl + F5`** 或 **`Cmd + Shift + R`** 強制重新整理並清除快取）。

您將會看到：
*   **視覺震撼的 3D 數位地圖背景**：基於利稻村空拍圖，搭配動態網格、脈衝節點與數據流動，充滿極端科技感。
*   **流暢的分頁切換與 GSAP 動畫**：所有頁面間的切換都伴隨著精緻的元素進場動畫。
*   **功能完整的數據面板**：所有環境、流量、通訊、能源數據都將正常顯示和更新。
*   **極速且智能的 AI 聊天模組**：點開右下角的 AI 助手，它將以**逐字逐句的串流方式**快速回應您的查詢。

---

## 📝 3. 未來如何發佈新文章或修改內容？

未來您更新「焦點訊息」的文章時，**完全不需要碰 `index.html` 檔案**。您只需修改 `articles.json` 即可。

### **步驟說明：**

1.  **進入 GitHub 您的儲存庫**：點擊打開 `articles.json` 這個檔案。
2.  **點擊右上角的 ✏️ 鉛筆圖示 (Edit this file)** 進入編輯模式。
3.  **依照 JSON 格式新增或修改文章**。
4.  **點擊右上角綠色的 `Commit changes...` 儲存**，網站就會自動更新！

### **💡 格式教學與注意事項：**

JSON 是一種結構化的資料格式，每一個 `{ ... }` 代表一篇文章。

**如何「新增」一篇文章？**

請複製現有的其中一個文章區塊，並貼在最上方或最下方。請特別注意**逗號 (`,`) 的使用**：兩個文章區塊之間**一定要有逗號**，但**最後一個區塊的結尾「不能」有逗號**。

**正確的格式範例：**

```json
[
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
    "summary": "探討如何利用晶體生長演算法，在無穩定電網的南橫高山區域建立高韌性的邊緣運算節點，並達到數據提純的目標...",
    "content": "<p class='mb-4'>隨著全球邊緣運算需求的急遽上升，傳統的伺服器農場已無法滿足極端環境下的即時運算需求。本研究報告深入探討了 ONYX 的核心技術「逆熵運算架構」。</p><p class='mb-4'>我們在南橫利稻村的實驗節點證實，透過模擬礦物結晶過程的演算法，我們能在初期排除 68% 的無效數據運算，大幅降低能耗。</p><p class='mb-4'>未來展望：我們將持續推動負碳協議，將伺服器廢熱導入微電網的溫室循環系統，實現真正的深科技生態共生。</p>"
  }
]
```

**欄位說明：**

*   `id`：必須是**唯一的**英文或數字組合（例如 `"article-05"`），不要重複。
*   `date`：文章發佈日期字串。
*   `category`：文章分類標籤（例如 `"TECH UPDATE"` 或 `"公司公告"`）。
*   `title`：文章主標題。
*   `summary`：顯示在外部卡片上的兩三行簡短摘要文字。
*   `content`：彈出視窗內顯示的完整文章內容。

**🎨 內文 (`content`) 的排版小技巧：**

因為 `content` 欄位支援讀取 HTML 標籤，您可以利用它來豐富文章排版：

*   **分段落**：使用 `<p class='mb-4'>這裡是一段文字</p>`（`mb-4` 是 Tailwind 語法，意思是底下留空隙，讓段落分明）。
*   **換行**：使用 `<br>`。
*   **粗體字**：使用 `<strong>這段文字會變粗體</strong>`。
*   **重點上色**：使用 `<span class='text-cyan-400'>這段文字會變成青藍色科技感</span>`。
*   **列表**：使用 `<ul><li>項目一</li><li>項目二</li></ul>`。

**如何「刪除」一篇文章？**

只要在編輯模式下，將不要的那個 `{ ... }` 整個文章區塊刪除（包含其與前後區塊連接的逗號），再 `Commit` 儲存即可。

掌握了這個模式後，您就像擁有了一個專屬於自己的輕量級後台，隨時隨地都能用手機或電腦的網頁瀏覽器更新您的 ONYX 官網焦點訊息！
