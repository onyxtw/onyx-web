🚀 ONYX 官網 GitHub 部署與文章發佈指南

這份指南將協助您完成網站的最終部署，並教學未來如何透過簡單的文字編輯來發佈或刪除「焦點訊息」的文章。

📁 1. 目前需要的檔案結構與資料夾

您不需要額外創建複雜的資料夾，只需要確保您要上傳到 GitHub 的儲存庫（Repository）根目錄下，包含以下這些檔案即可：

您的 GitHub 儲存庫 (例如: onyx-website)
│
├── index.html        (主程式：包含所有版面、設計與動畫邏輯)
├── articles.json     (資料庫：存放所有焦點訊息的文章內容)
├── IMG_4879.PNG      (新版 Logo 圖片)
└── 其他圖片檔案       (例如如果還有用到背景圖 IMG_4642.jpg 或其他的圖)


提示：保持檔案都在同一層目錄是最簡單的做法，這樣 index.html 裡面直接呼叫檔名就不會出錯。

☁️ 2. 更新至 GitHub 的完整步驟

如果您已經有 GitHub 儲存庫（且已經開啟 GitHub Pages），請按照以下步驟更新：

登入 GitHub：進入您的網站專案儲存庫（Repository）。

上傳檔案：

點擊畫面上方的 Add file 按鈕，選擇 Upload files。

將您電腦中最新的 index.html、articles.json 以及 IMG_4879.PNG 一起拖曳到上傳區塊。

提交更改：

在下方的「Commit changes」框框中，輸入簡單的備註（例如："Update index layout and add articles JSON"）。

點擊綠色的 Commit changes 按鈕。

等待生效：GitHub Pages 通常需要 1~3 分鐘來重新編譯與部署。稍等片刻後，重新整理您的網頁（可以按 Ctrl + F5 強制重整清除快取），就能看到最新版本。

📝 3. 未來如何發佈新文章或修改內容？

未來您完全不需要碰 index.html，只要修改 articles.json 即可。

步驟說明：

進入 GitHub 您的儲存庫，點擊打開 articles.json 這個檔案。

點擊右上角的 ✏️ 鉛筆圖示 (Edit this file) 進入編輯模式。

依照 JSON 格式新增或修改文章。

點擊右上角綠色的 Commit changes... 儲存，網站就會自動更新！

💡 格式教學與注意事項

JSON 是一種結構化的資料格式，每一個 { ... } 代表一篇文章。

如何「新增」一篇文章？

請複製現有的其中一個區塊，並貼在最上方或最下方。請特別注意逗號 (,) 的使用：兩個文章區塊之間一定要有逗號，但最後一個區塊的結尾「不能」有逗號。

正確的格式範例：

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
    ...後面省略...
  }
]


欄位說明：

id: 必須是唯一的英文或數字組合（例如 "article-05"），不要重複。

date: 日期字串。

category: 文章分類標籤（例如 "TECH UPDATE" 或 "公司公告"）。

title: 文章主標題。

summary: 外層卡片上的兩三行簡介。

content: 彈出視窗內的完整文章內容。

🎨 內文 (content) 的排版小技巧：

因為 content 支援讀取 HTML 標籤，您可以利用它來豐富文章排版：

分段落：使用 <p class='mb-4'>這裡是一段文字</p> （mb-4 是 Tailwind 語法，意思是底下留空隙，讓段落分明）。

換行：使用 <br>。

粗體字：使用 <strong>這段文字會變粗體</strong>。

重點上色：使用 <span class='text-cyan-400'>這段文字會變成青藍色科技感</span>。

如何「刪除」一篇文章？

只要在編輯模式下，將不要的那個 { ... } 整個區塊刪除（包含前或後連接的逗號），再 Commit 儲存即可。

掌握了這個模式後，您就像擁有了一個專屬於自己的輕量級後台，隨時隨地都能用手機或電腦的網頁瀏覽器更新您的 ONYX 官網焦點訊息！
