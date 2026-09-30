# GitHub Copilot 實戰工作坊｜待辦清單 Web App

![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

這是在 GitHub Copilot 實戰工作坊完成的待辦清單 Web App。使用者可以新增、整理與完成待辦事項，並依需求切換主題或篩選清單。

## 線上展示

https://<你的帳號>.github.io/<你的repo名稱>/

## 功能

- 新增待辦事項，並忽略空白輸入。
- 勾選待辦事項為已完成，顯示刪除線與淡化文字；也可取消完成。
- 刪除單筆待辦事項。
- 顯示未完成項目數量，數字不受目前篩選條件影響。
- 依「全部」、「未完成」、「已完成」篩選待辦事項，並在篩選結果為空時顯示提示。
- 清除所有已完成事項；操作前顯示確認對話框，沒有已完成事項時按鈕停用。
- 切換淺色與深色模式；初次使用時依照系統的 `prefers-color-scheme` 設定，手動選擇會保存。
- 使用 `localStorage` 保存待辦事項與主題偏好，重新整理後仍可保留。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript，不使用框架或套件。
- 主題配色以 `:root` 中的自訂屬性為核心管理。
- 使用 DOM API 建立清單項目，並以 `textContent` 顯示使用者輸入。
- 使用瀏覽器 `localStorage` 保存待辦資料與主題偏好；不依賴伺服器端資料庫。

## 開發方式

- 使用 GitHub Copilot Agent Mode 協助拆解工作坊需求、實作功能並進行瀏覽器驗證。
- 透過 `.vscode/mcp.json` 設定 Microsoft Learn 與 GitHub MCP server；開發時使用 Microsoft Learn 文件工具查閱官方文件。
- 將 Issue 處理流程整理在 `.github/prompts/fix-issue.prompt.md`：先讀取並摘要 Issue、提出計畫並等待確認，再建立分支、修改程式、驗證、提交推送及建立 PR。
- 使用 `.github/copilot-instructions.md` 記錄專案的技術限制、程式風格與協作方式。

## 我學到什麼

- 把需求拆成小步驟，並以可驗證的行為逐一完成。
- 區分完整待辦資料與目前篩選結果，讓計數維持正確。
- 使用 `localStorage` 保存資料，並在新增、完成、刪除等操作後同步更新。
- 用系統偏好與 CSS 變數實作深淺色主題。
- 對批次刪除等不可逆操作加入確認流程，並以停用狀態避免無效操作。
