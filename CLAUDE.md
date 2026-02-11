# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 語言設定
請使用**繁體中文**回應所有問題和對話。

## 專案概述

**Dopi Note 產品展示網站** — 純靜態單頁網站,展示 Dopi 語音筆記應用程式的功能與下載連結。無構建流程、無框架依賴，直接以 HTML5 + CSS3 + 原生 JavaScript (ES6+) 編寫。

## 本地開發

```bash
python3 -m http.server 8000
# 或
npx serve .
```

訪問 `http://localhost:8000` 預覽。無需安裝依賴、無需建構步驟。

## 技術架構

### 關鍵檔案

| 檔案 | 角色 |
|------|------|
| `index.html` | 唯一頁面，所有區塊都在此檔案 |
| `styles.css` | 唯一樣式表，使用 CSS 變數系統 (`:root`) |
| `i18n.js` | 國際化系統 — **翻譯資料直接嵌入此檔案的 `LANGUAGE_DATA` 物件** |
| `locales/*.json` | 翻譯參考檔（目前未被載入，實際運行時不使用） |
| `assets/` | 圖片、App icon 等靜態資源 |

### 國際化 (i18n) 架構

這是本專案最需要理解的系統：

1. **翻譯資料來源**: `i18n.js` 頂部的 `LANGUAGE_DATA` 常數（不是 `locales/` 目錄的 JSON 檔案）
2. **I18n 類別** (`i18n.js`): 管理語言偵測、切換、DOM 更新
   - `detectLanguage()`: localStorage → 瀏覽器語言 → 預設 `en`
   - `updateContent()`: 掃描所有 `[data-i18n]` 元素並更新文字
   - `updateMetaTags()`: 同步更新 `<title>`、meta description、OG 標籤
   - `createLanguageSwitcher()`: 動態產生語言切換 UI，插入 `.contact-info`
3. **支援語言**: `en`、`zh-TW`、`ja`、`es`
4. **翻譯 key 格式**: 用點號分隔的巢狀路徑，如 `features.assistant.items.0`

**新增/修改文案時必須同步更新**:
1. HTML 元素加上 `data-i18n="key.path"`
2. 在 `i18n.js` 的 `LANGUAGE_DATA` 中，為 **4 種語言全部** 新增對應 key
3. 若涉及 meta 資訊，需更新 `meta` 和 `og` 區塊

### CSS 設計系統

- 所有設計 token 定義在 `styles.css` 的 `:root` 中（色彩用 `--brand`/`--bg`/`--text` 系列，不是 `--primary-color`）
- 字體大小使用 `clamp()` 實現流體排版（`--text-xs` ~ `--text-5xl`）
- 間距使用 `--spacing-xs` ~ `--spacing-4xl`
- 響應式斷點：1200px → 980px → 768px → 640px → 480px
- 支援 `prefers-reduced-motion` 無障礙設定

### 頁面區塊對應的 CSS class

| 區塊 | HTML 結構 | 關鍵 class |
|------|-----------|-----------|
| 導航列 | `<nav class="navbar">` | `.nav-container`, `.nav-brand`, `.nav-cta` |
| 使用場景 | `<section class="section">` | `.use-cases`, `.use-card.horizontal` |
| 功能特色 | `<section class="section">` | `.features`, `.feature-card`, `.feature-card-1/2/3` |
| 品牌標語 | `<section class="brand-slogan">` | `.section-title` |
| 應用下載 | `<section id="app-download">` | `.download-apps`, `.app-badges` |
| 聯絡/語言切換 | `<section class="contact-bar">` | `.contact-info`（語言切換器由 JS 動態插入） |

## 開發規範

- 需翻譯的內容**必須**添加 `data-i18n` 屬性，並在 `i18n.js` 的 `LANGUAGE_DATA` 中為所有 4 種語言新增翻譯
- 修改樣式時優先使用現有 CSS 變數，不要硬編碼數值
- 不引入外部 JS 依賴，使用原生 API
- 修改頁面內容時同步更新 SEO 相關標籤（透過 i18n 的 `meta` 和 `og` key）

## 注意事項

- 專案目前缺少 `.gitignore` 檔案
- `locales/*.json` 與 `i18n.js` 內的 `LANGUAGE_DATA` 可能不同步，以 `LANGUAGE_DATA` 為準
- 使用場景卡片有兩種媒體：YouTube `<iframe>` 嵌入和靜態 `<img>`，新增時注意選擇
- CSS 中存在未使用的區塊（如 `.video-hero`、`.problem-solution`），這些是保留樣式，目前 HTML 中未使用
