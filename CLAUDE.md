# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 語言設定
請使用**繁體中文**回應所有問題和對話。

## 專案概述

**Dopi Note 產品展示網站** - 純靜態網頁專案,用於展示 Dopi 語音筆記應用程式的功能與下載連結。

- **專案類型**: 靜態網頁 (無構建流程)
- **技術堆疊**: HTML5 + CSS3 + 原生 JavaScript (ES6+)
- **部署方式**: 可直接部署至靜態託管服務 (GitHub Pages, Netlify, Vercel)
- **Git 倉庫**: `git@github.com:ayrshire/dopi_webpage.git`

## 技術架構

### 核心檔案結構

```
/Users/Lynn/dopi_web/
├── index.html          # 主頁面 (單頁應用)
├── styles.css          # 主樣式表 (使用 CSS 變數系統)
├── i18n.js            # 國際化系統實作
├── locales/           # 多語言翻譯檔案 (JSON 格式)
│   ├── en.json        # 英文
│   ├── zh-TW.json     # 繁體中文
│   ├── ja.json        # 日文
│   └── es.json        # 西班牙文
└── assets/            # 靜態資源 (圖片、圖示)
```

### 國際化 (i18n) 系統

- **自動語言偵測**: localStorage → 瀏覽器語言設定 → 預設英文
- **支援語言**: en (英文)、zh-TW (繁體中文)、ja (日文)、es (西班牙文)
- **實作方式**:
  - 翻譯資料嵌入 `i18n.js` (避免額外 HTTP 請求)
  - HTML 元素使用 `data-i18n="key"` 屬性標記可翻譯內容
  - 語言切換時自動更新頁面標題、meta description、Open Graph 標籤
- **新增翻譯流程**:
  1. 在 HTML 中添加 `data-i18n="new.key"` 屬性
  2. 在 `i18n.js` 的 `translations` 物件中,為**所有語言**添加對應的鍵值對
  3. 測試語言切換功能確保所有語言都正確顯示

### CSS 設計系統

- **CSS 變數**: 定義於 `:root` 中,包含品牌色彩、尺寸、間距、字體、陰影、動畫時間
- **響應式設計**: 使用 `clamp()` 實現流暢的字體縮放,適配桌面與行動裝置
- **修改樣式時**: 優先使用現有的 CSS 變數,保持設計一致性

## 開發指令

### 本地開發

由於是純靜態專案,無需構建流程:

```bash
# 方法 1: 使用 Python 內建伺服器
python3 -m http.server 8000

# 方法 2: 使用 npx serve (需安裝 Node.js)
npx serve .

# 方法 3: 直接用瀏覽器打開 (部分功能可能受限)
open index.html
```

訪問 `http://localhost:8000` 即可預覽網站。

### Git 工作流程

```bash
# 查看當前狀態
git status

# 提交變更
git add .
git commit -m "描述變更內容"

# 推送至遠端倉庫
git push origin main
```

## 開發規範

### HTML

- 使用語義化標籤 (如 `<section>`, `<nav>`, `<footer>`)
- 需翻譯的內容必須添加 `data-i18n` 屬性
- 保持良好的可訪問性 (alt 文字、ARIA 標籤)

### CSS

- 優先使用 `:root` 中定義的 CSS 變數
- 遵循現有命名慣例 (類似 BEM 風格)
- 確保響應式設計在不同螢幕尺寸下都能正常運作

### JavaScript

- 使用 ES6+ 語法 (類別、箭頭函數、模板字串等)
- 保持程式碼模組化與可讀性
- 避免引入外部依賴,優先使用原生 API

### 多語言內容維護

**重要**: 新增或修改任何頁面內容時,必須同步更新**所有語言**的翻譯:

1. 在 `i18n.js` 的 `translations` 物件中找到對應語言區塊
2. 確保 `en`, `zh-TW`, `ja`, `es` 都有對應的翻譯
3. 測試語言切換器,確認所有語言都正確顯示新內容

### SEO 優化

- 修改內容時,同步更新 `<title>` 和 meta description
- 確保 Open Graph 標籤 (og:title, og:description) 與內容一致
- 維護語義化的 HTML 結構以利搜尋引擎索引

## 內容架構

網站分為以下主要區塊:

1. **導航列** (`<nav>`) - 品牌標誌與主要 CTA 按鈕
2. **使用場景** (`.usecase-section`) - 三個痛點場景展示
3. **功能特色** (`.features-section`) - 三大核心價值主張
4. **品牌標語** (`.tagline-section`) - 核心訊息強化
5. **應用下載** (`.download-section`) - App Store 與 Google Play 連結
6. **聯絡資訊** (`.contact-section`) - Email 與語言切換器
7. **頁尾** (`<footer>`) - 版權資訊

## 常見任務

### 更新應用程式商店連結

編輯 `index.html` 中的 `.download-section`,修改對應的 `<a>` 標籤 `href` 屬性。

### 新增使用場景

1. 在 `assets/` 中準備新的場景圖片
2. 在 `index.html` 的 `.usecase-section` 中複製現有的 `.usecase-card` 結構
3. 為新內容添加 `data-i18n` 屬性
4. 在 `i18n.js` 中新增對應的翻譯鍵值

### 修改品牌色彩

編輯 `styles.css` 中 `:root` 區塊的色彩變數:

```css
:root {
  --primary-color: #2563eb;    /* 主色調 */
  --secondary-color: #1e40af;  /* 次要色調 */
  --accent-color: #3b82f6;     /* 強調色 */
  /* ... */
}
```

## 注意事項

- `.DS_Store` 檔案應加入 `.gitignore` (macOS 系統檔案)
- 圖片檔案較大,可考慮壓縮或使用 WebP 格式提升載入速度
- 確保 YouTube 嵌入影片 ID 正確且可訪問
- 定期測試所有外部連結 (App Store, Google Play, Email)
