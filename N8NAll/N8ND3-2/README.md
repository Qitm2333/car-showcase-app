# 🎨 收藏夹功能测试系统

一个基于 **React + N8N + Google Sheets** 的汽车收藏夹系统，带有 **24个超丰富的 Emoji 卡片**！

点击 ❤️ 按钮即可收藏，数据实时保存到 Google Sheets 📊

---

## ✨ 特色功能

- 🎨 **24个精美卡片** - 外观、内饰、细节、SUV、运动车型
- 💖 **一键收藏** - 点击爱心按钮选择收藏夹
- 🎯 **分类管理** - 支持多个收藏夹分类
- ✅ **自动去重** - 同一图片不会重复收藏
- 🔔 **实时提示** - 收藏成功/失败即时反馈
- 📱 **响应式设计** - 完美适配各种屏幕

---

## 🚀 5分钟快速开始

### 1️⃣ 安装依赖
```bash
npm install
```

### 2️⃣ 启动开发服务器
```bash
npm run dev
```

### 3️⃣ 打开浏览器
访问 **http://localhost:3000** 即可看到测试界面！

> **注意**：此时收藏功能还不可用，需要先配置 N8N（见下方）

---

## 📚 完整配置指南

### 🎯 新手推荐阅读顺序

1. **QUICK-START.md** - 快速开始指南（适合新手）
2. **CHECKLIST.md** - 配置检查清单（逐项完成）
3. **n8n-workflows/README-N8N-SETUP.md** - N8N 详细配置
4. **PROJECT-OVERVIEW.md** - 项目架构和技术细节

### ⚡ 快速配置流程

```
第 1 步：Google Sheets (5分钟)
  ├─ 创建 CarFavoritesSystem 表格
  ├─ 导入 CSV 模板
  └─ 获取 Sheet ID

第 2 步：N8N 工作流 (15分钟)
  ├─ 导入 4 个工作流 JSON
  ├─ 替换 Sheet ID
  └─ 复制 Webhook URL

第 3 步：前端配置 (2分钟)
  ├─ 编辑 src/config/api.ts
  └─ 替换 API URL

✅ 完成！开始测试收藏功能
```

详细步骤请查看 **QUICK-START.md**

---

## 🧪 测试工具

### 方法 1：使用 API 测试工具
打开 `test-api.html`，输入 Webhook URL，一键测试所有 API。

### 方法 2：在测试界面测试
1. 打开 http://localhost:3000
2. 点击任意卡片的 ❤️ 按钮
3. 选择收藏夹
4. 查看 Google Sheets 是否新增数据

---

## 📦 项目结构

```
📁 项目根目录/
│
├── 📱 前端代码
│   ├── src/
│   │   ├── pages/FavoriteTestPage.tsx      # 🎨 测试界面
│   │   ├── services/favoriteService.ts     # API 服务
│   │   └── config/api.ts                   # 🔧 配置文件
│   └── package.json
│
├── 🔧 N8N 工作流
│   └── n8n-workflows/
│       ├── 01-add-to-favorite.json         # 添加收藏
│       ├── 02-get-favorite-folders.json    # 获取列表
│       ├── 03-get-favorite-detail.json     # 获取详情
│       └── 04-create-favorite-folder.json  # 创建文件夹
│
├── 📊 Google Sheets 模板
│   └── google-sheets-template/
│       ├── UserFavoriteFolders.csv
│       └── UserFavoriteItems.csv
│
├── 🧪 测试工具
│   └── test-api.html                       # API 测试界面
│
└── 📚 文档
    ├── QUICK-START.md                      # 👈 从这里开始
    ├── CHECKLIST.md                        # 配置清单
    └── PROJECT-OVERVIEW.md                 # 架构说明
```

---

## 🎨 卡片展示

### 包含 24 个测试卡片

| 分类 | 数量 | 示例 |
|------|------|------|
| 🚗 外观系列 | 5个 | 智己L6、小米SU7、理想L9... |
| 🏠 内饰系列 | 5个 | 宝马iX、奔驰EQS、蔚来ET7... |
| 💡 细节系列 | 5个 | 奥迪Q4、特斯拉、保时捷... |
| 🏔️ SUV系列 | 5个 | 坦克300、路虎卫士、吉普... |
| 🏁 运动系列 | 4个 | 法拉利、兰博基尼、迈凯伦... |

每个卡片都有：
- 独特的 Emoji 图标
- 精美的渐变色背景
- 车型名称和分类标签
- 可点击的收藏按钮

---

## ⚙️ 技术栈

- **前端**: React 18 + TypeScript + Vite
- **样式**: Tailwind CSS
- **API**: N8N 工作流
- **数据**: Google Sheets
- **路由**: React Router

---

## 🎯 核心功能

### ✅ 添加到收藏
点击 ❤️ → 选择收藏夹 → 自动保存到 Google Sheets

### ✅ 数据去重
同一图片不会重复收藏到同一文件夹

### ✅ 用户隔离
通过 `inviteCode` 区分不同用户（测试用户：DEMO2024）

### ✅ 自增 ID
`folderID` 和 `itemID` 自动生成，无需手动管理

---

## 📈 适用场景

✅ 个人项目、小团队项目  
✅ 原型验证、MVP 开发  
✅ 快速验证想法（30分钟上线）  
✅ 学习 React + N8N + Google Sheets 集成  

---

## 🔥 下一步扩展

- [ ] 创建收藏夹列表页面
- [ ] 创建收藏夹详情页面（查看已收藏的图片）
- [ ] 添加删除收藏功能
- [ ] 添加编辑收藏夹名称功能
- [ ] 添加搜索和筛选功能
- [ ] 添加导出功能（PDF/图片）

---

## 📞 获取帮助

- 📖 **快速开始**: 查看 `QUICK-START.md`
- ✅ **配置清单**: 查看 `CHECKLIST.md`
- 🔧 **N8N配置**: 查看 `n8n-workflows/README-N8N-SETUP.md`
- 🏗️ **架构说明**: 查看 `PROJECT-OVERVIEW.md`

---

## 🎉 开始使用

```bash
npm install
npm run dev
```

访问 **http://localhost:3000** 查看效果！

然后按照 **QUICK-START.md** 配置 N8N，即可体验完整的收藏功能 🚀

