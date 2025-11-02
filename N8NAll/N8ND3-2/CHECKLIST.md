# ✅ 收藏夹系统配置检查清单

完成配置只需 **3 个步骤**！

---

## 📋 步骤 1：Google Sheets 配置 (5分钟)

### ☑️ 创建表格
- [ ] 访问 https://sheets.google.com
- [ ] 创建新表格，命名为 `CarFavoritesSystem`
- [ ] 复制表格 URL 中的 Sheet ID

### ☑️ 配置 Sheet 1: UserFavoriteFolders
- [ ] 重命名 Sheet1 为 `UserFavoriteFolders`
- [ ] 打开 `google-sheets-template/UserFavoriteFolders.csv`
- [ ] 复制所有内容
- [ ] 粘贴到 Google Sheets 的 A1 单元格
- [ ] 确认有 4 行数据（1个表头 + 3个测试文件夹）

### ☑️ 配置 Sheet 2: UserFavoriteItems
- [ ] 点击左下角 `+` 创建新 Sheet
- [ ] 命名为 `UserFavoriteItems`
- [ ] 打开 `google-sheets-template/UserFavoriteItems.csv`
- [ ] 复制表头
- [ ] 粘贴到 Google Sheets 的 A1 单元格
- [ ] 确认有表头行（itemID, folderID, inviteCode...）

### ☑️ 设置权限
- [ ] 点击右上角「共享」按钮
- [ ] 选择「任何拥有链接的人都可以编辑」
- [ ] 或者给 N8N 的 Google 服务账号编辑权限

### ✅ 完成！
- [ ] 记录你的 Sheet ID: `_______________________`

---

## 🔧 步骤 2：N8N 工作流配置 (15分钟)

### ☑️ 准备工作
- [ ] 确保你有 N8N 账号（可用 https://n8n.io 免费注册）
- [ ] 在 N8N 中连接 Google Sheets（凭证配置）

### ☑️ 工作流 1：添加到收藏 ⭐
- [ ] 创建新工作流，命名为「添加到收藏」
- [ ] 导入 `n8n-workflows/01-add-to-favorite.json`
- [ ] 或者按照 `n8n-workflows/README-N8N-SETUP.md` 手动创建
- [ ] 替换所有 `YOUR_GOOGLE_SHEET_ID` 为你的 Sheet ID
- [ ] 测试工作流（点击 Test Workflow）
- [ ] 激活工作流
- [ ] 复制 Webhook URL: `_______________________`

### ☑️ 工作流 2：获取收藏夹列表 📋
- [ ] 创建新工作流，命名为「获取收藏夹列表」
- [ ] 导入 `n8n-workflows/02-get-favorite-folders.json`
- [ ] 替换 `YOUR_GOOGLE_SHEET_ID`
- [ ] 激活工作流
- [ ] 复制 Webhook URL: `_______________________`

### ☑️ 工作流 3：获取收藏夹详情 📄
- [ ] 创建新工作流，命名为「获取收藏夹详情」
- [ ] 导入 `n8n-workflows/03-get-favorite-detail.json`
- [ ] 替换 `YOUR_GOOGLE_SHEET_ID`
- [ ] 激活工作流
- [ ] 复制 Webhook URL: `_______________________`

### ☑️ 工作流 4：创建收藏夹 ➕
- [ ] 创建新工作流，命名为「创建收藏夹」
- [ ] 导入 `n8n-workflows/04-create-favorite-folder.json`
- [ ] 替换 `YOUR_GOOGLE_SHEET_ID`
- [ ] 激活工作流
- [ ] 复制 Webhook URL: `_______________________`

### ✅ 完成！
- [ ] 4 个工作流都已激活
- [ ] 4 个 Webhook URL 都已复制

---

## 💻 步骤 3：前端配置 (2分钟)

### ☑️ 更新 API 配置
- [ ] 打开 `src/config/api.ts`
- [ ] 替换 `GET_FAVORITE_FOLDERS` 的 URL
- [ ] 替换 `GET_FAVORITE_DETAIL` 的 URL
- [ ] 替换 `ADD_TO_FAVORITE` 的 URL
- [ ] 替换 `CREATE_FAVORITE_FOLDER` 的 URL
- [ ] 保存文件（Vite 会自动热更新）

### ☑️ 检查开发服务器
- [ ] 确认 `npm run dev` 正在运行
- [ ] 访问 http://localhost:3000
- [ ] 看到 24 个 Emoji 卡片

### ✅ 完成！
- [ ] 前端已连接到 N8N API

---

## 🧪 步骤 4：测试验证 (5分钟)

### ☑️ 测试 1：使用 API 测试工具
- [ ] 打开 `test-api.html`
- [ ] 输入所有 4 个 Webhook URL
- [ ] 测试「添加到收藏」
- [ ] 测试「获取收藏夹列表」
- [ ] 测试「获取收藏夹详情」
- [ ] 测试「创建收藏夹」
- [ ] 所有测试都返回成功 ✅

### ☑️ 测试 2：在测试界面测试
- [ ] 访问 http://localhost:3000
- [ ] 点击任意卡片的 ❤️ 按钮
- [ ] 看到收藏夹选择对话框
- [ ] 选择「🎨 外观收藏」
- [ ] 看到成功提示「✅ 已添加到收藏夹」

### ☑️ 测试 3：验证 Google Sheets
- [ ] 打开你的 Google Sheets
- [ ] 切换到 `UserFavoriteItems` Sheet
- [ ] 看到新增了一行数据
- [ ] 数据包含：itemID, folderID, carName 等

### ☑️ 测试 4：测试去重
- [ ] 在测试界面点击同一个卡片的 ❤️
- [ ] 选择同一个收藏夹
- [ ] 看到提示「已经收藏过这张图片了」
- [ ] Google Sheets 没有重复数据

### ✅ 完成！
- [ ] 所有功能正常工作 🎉

---

## 🎯 配置完成后的效果

你现在拥有：

✅ **测试界面**
- 24 个精美的 Emoji 卡片
- 点击收藏按钮即可收藏
- 实时成功/失败提示

✅ **数据存储**
- Google Sheets 自动存储收藏数据
- 支持多用户（通过 inviteCode 隔离）
- 自动去重

✅ **API 系统**
- 4 个完整的 N8N 工作流
- RESTful API 接口
- 可扩展到其他项目

---

## ❓ 遇到问题？

### 收藏后显示"网络错误"
1. 检查 N8N 工作流是否激活
2. 检查 `src/config/api.ts` 中的 URL 是否正确
3. 打开浏览器控制台查看错误详情
4. 使用 `test-api.html` 测试 API

### Google Sheets 没有数据
1. 检查 Sheet 名称是否为 `UserFavoriteItems`（区分大小写）
2. 检查 N8N 的 Google Sheets 权限
3. 检查 Sheet ID 是否正确
4. 在 N8N 中查看工作流执行日志

### 测试界面显示空白
1. 检查开发服务器是否运行（`npm run dev`）
2. 检查浏览器控制台是否有错误
3. 确认端口 3000 没有被占用

---

## 📚 下一步

配置完成后，你可以：

1. **扩展功能**
   - 创建收藏夹列表页面
   - 创建收藏夹详情页面
   - 添加删除功能

2. **集成到现有项目**
   - 将收藏按钮添加到你的车辆列表页
   - 在详情页添加收藏功能
   - 创建用户专属收藏中心

3. **优化体验**
   - 添加加载动画
   - 优化错误提示
   - 添加收藏成功的动画效果

---

## 🎉 恭喜！

你已经完成了收藏夹系统的所有配置！

开始享受收藏功能吧 🚀

