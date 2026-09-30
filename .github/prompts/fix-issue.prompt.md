---
agent: 'agent'
description: '依 GitHub issue 編號修正待辦清單 App，並建立 Pull Request'
argument-hint: 'issueNumber=3'
---

# 任務：修正 GitHub Issue 並建立 PR

處理本 repository 中指定的 Issue：**#${input:issueNumber:要修的 issue 編號}**。

請嚴格按照以下順序執行，不要跳過步驟：

## 1. 讀取 Issue

使用 GitHub 工具讀取本 repository 的 Issue #${input:issueNumber}，並以繁體中文摘要：
- 這是 bug 還是新功能？
- 使用者遇到的問題或期望的行為是什麼？
- 預期需要修改哪些檔案？

## 2. 提出計畫並等待確認

用條列列出預計修改的檔案及變動，然後詢問使用者是否同意。等待使用者明確回覆「同意」後，才可建立分支或修改檔案。

## 3. 建立分支

確認同意後，從 `main` 建立並切換到 issue 分支：

```bash
git switch -c fix/issue-${input:issueNumber}
```

## 4. 修改程式

- 遵守 `.github/copilot-instructions.md` 的所有專案規則。
- 只修改解決 Issue 所需的檔案，不進行未要求的重構。

## 5. 說明瀏覽器驗證方式

說明使用者打開根目錄 `index.html` 後要執行哪些操作，以及應看到什麼結果，才能確認 Issue 已修正。

## 6. 提交並推送

只暫存本次 Issue 相關檔案，避免納入其他既有修改或未追蹤檔案：

```bash
git add <本次修改的檔案>
git commit -m "fix: <一句話描述修正內容> (#${input:issueNumber})"
git push -u origin fix/issue-${input:issueNumber}
```

## 7. 建立 Pull Request

使用 GitHub 工具，以 `fix/issue-${input:issueNumber}` 為來源分支、`main` 為目標分支建立 PR。

- 標題：用一句話描述修正內容。
- 內文需包含 `Closes #${input:issueNumber}`，並以「修改內容」及「如何驗證」兩節說明變更與驗證步驟。

最後回報 PR 網址。若目前沒有可用的 GitHub PR 建立工具或尚未登入，請明確說明阻礙，不要宣稱 PR 已建立。
