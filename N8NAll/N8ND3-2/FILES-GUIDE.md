# 📁 项目文件指南

> 收藏系统项目的完整文件结构说明

---

## 📂 项目结构

```
N8ND3-2/
├── 📚 文档 (Documentation)
│   ├── START-HERE.md                    # 🚀 项目入口 - 从这里开始
│   ├── README.md                        # 📖 项目主文档
│   ├── PROJECT-OVERVIEW.md              # 🎯 项目概述
│   ├── FILES-GUIDE.md                   # 📁 本文件 - 文件指南
│   ├── CHECKLIST.md                     # ✅ 功能检查清单
│   ├── VARIABLE-NAMING.md               # 📝 命名规范
│   ├── OPTIMISTIC-UPDATE-GUIDE.md       # ⚡ 乐观更新指南
│   ├── DEFAULT-FOLDER-SETUP-GUIDE.md    # 📂 默认文件夹设置
│   └── HOW-TO-VIEW-FAVORITES.md         # 👀 使用指南
│
├── 🔧 N8N 工作流 (Workflows)
│   └── n8n-workflows/
│       ├── README-N8N-SETUP.md          # N8N 完整设置指南
│       └── FINAL-WORKFLOW.json          # 最终工作流配置
│
├── 📊 Google Sheets 模板 (Templates)
│   └── google-sheets-template/
│       ├── UPDATED-STRUCTURE.md         # 表格结构说明
│       ├── UserFavoriteFolders.csv      # 收藏夹表模板
│       └── UserFavoriteItems.csv        # 收藏项表模板
│
├── 💻 源代码 (Source Code)
│   └── src/
│       ├── App.tsx                      # 应用主入口
│       ├── main.tsx                     # React 入口
│       ├── index.css                    # 全局样式
│       │
│       ├── components/                  # 组件
│       │   ├── ProtectedRoute.tsx       # 路由保护
│       │   └── UserHeader.tsx           # 用户导航栏
│       │
│       ├── contexts/                    # 上下文
│       │   ├── UserContext.tsx          # 用户状态管理
│       │   └── FolderCacheContext.tsx   # 文件夹缓存管理
│       │
│       ├── pages/                       # 页面
│       │   ├── LoginPage.tsx            # 登录页
│       │   ├── FavoriteTestPage.tsx     # 收藏页（主页）
│       │   ├── FoldersPage.tsx          # 文件夹管理页
│       │   ├── FavoritesListPage.tsx    # 收藏列表页
│       │   └── SettingsPage.tsx         # 设置页
│       │
│       ├── services/                    # 服务
│       │   └── favoriteService.ts       # 收藏 API 调用
│       │
│       └── config/                      # 配置
│           └── api.ts                   # API 配置
│
└── ⚙️ 配置文件 (Configuration)
    ├── package.json                     # NPM 依赖
    ├── package-lock.json                # 依赖锁定
    ├── vite.config.ts                   # Vite 配置
    ├── tsconfig.json                    # TypeScript 配置
    ├── tsconfig.node.json               # Node TypeScript 配置
    ├── tailwind.config.js               # Tailwind CSS 配置
    └── postcss.config.js                # PostCSS 配置
```

---

## 📚 文档说明

### 🚀 快速开始

| 文件 | 用途 | 何时使用 |
|------|------|----------|
| `START-HERE.md` | 项目入口，包含快速开始指南 | 第一次使用项目 |
| `README.md` | 项目主文档，完整的功能说明 | 了解项目功能 |

### 📖 设置指南

| 文件 | 用途 | 何时使用 |
|------|------|----------|
| `n8n-workflows/README-N8N-SETUP.md` | N8N 完整设置教程 | 配置 N8N 工作流 |
| `DEFAULT-FOLDER-SETUP-GUIDE.md` | 默认文件夹设置 | 为新用户创建默认文件夹 |
| `google-sheets-template/UPDATED-STRUCTURE.md` | Google Sheets 结构说明 | 设置 Google Sheets |

### 🎓 技术文档

| 文件 | 用途 | 何时使用 |
|------|------|----------|
| `VARIABLE-NAMING.md` | 变量命名规范 | 开发时参考命名 |
| `OPTIMISTIC-UPDATE-GUIDE.md` | 乐观更新技术说明 | 了解前端优化策略 |
| `PROJECT-OVERVIEW.md` | 项目架构概述 | 了解技术架构 |

### ✅ 检查与使用

| 文件 | 用途 | 何时使用 |
|------|------|----------|
| `CHECKLIST.md` | 功能检查清单 | 验证所有功能正常 |
| `HOW-TO-VIEW-FAVORITES.md` | 使用说明 | 学习如何使用系统 |
| `FILES-GUIDE.md` | 文件结构指南（本文件） | 查找特定文件 |

---

## 🔧 N8N 工作流

### 核心文件

| 文件 | 用途 |
|------|------|
| `FINAL-WORKFLOW.json` | 最终的 N8N 工作流配置 |
| `README-N8N-SETUP.md` | 完整的 N8N 设置教程 |

### 工作流功能

`FINAL-WORKFLOW.json` 包含以下操作：

1. **createFolder** - 创建收藏夹
2. **listFolders** - 查看收藏夹列表
3. **add** - 添加收藏
4. **list** - 查看收藏列表（支持按文件夹筛选）
5. **delete** - 删除收藏
6. **deleteFolder** - 删除收藏夹

---

## 📊 Google Sheets 模板

### 模板文件

| 文件 | 用途 |
|------|------|
| `UserFavoriteFolders.csv` | 收藏夹表结构模板 |
| `UserFavoriteItems.csv` | 收藏项表结构模板 |
| `UPDATED-STRUCTURE.md` | 表格结构详细说明 |

### 表格结构

#### FavoriteFolders 表
```
folderID | userID | folderName | folderIcon | createTime | status
```

#### Favorites 表
```
favoriteID | userID | folderID | carID | carName | imageURL | favoriteTime | status
```

---

## 💻 源代码结构

### 页面 (Pages)

| 文件 | 路由 | 功能 |
|------|------|------|
| `LoginPage.tsx` | `/` | 用户登录 |
| `FavoriteTestPage.tsx` | `/favorites` | 收藏主页（24个测试车型） |
| `FoldersPage.tsx` | `/folders` | 文件夹管理 |
| `FavoritesListPage.tsx` | `/folders/:folderID` | 查看文件夹内收藏 |
| `SettingsPage.tsx` | `/settings` | API 设置 |

### 组件 (Components)

| 文件 | 用途 |
|------|------|
| `UserHeader.tsx` | 顶部导航栏，显示用户信息和导航按钮 |
| `ProtectedRoute.tsx` | 路由保护，确保只有登录用户可访问 |

### 上下文 (Contexts)

| 文件 | 用途 |
|------|------|
| `UserContext.tsx` | 用户状态管理（登录、登出、用户信息） |
| `FolderCacheContext.tsx` | 文件夹和计数缓存管理，提供乐观更新功能 |

### 服务 (Services)

| 文件 | 用途 |
|------|------|
| `favoriteService.ts` | 所有收藏相关的 API 调用 |

### 配置 (Config)

| 文件 | 用途 |
|------|------|
| `api.ts` | API 配置，动态读取/写入 Webhook URL |

---

## ⚙️ 配置文件

### NPM 相关

| 文件 | 用途 |
|------|------|
| `package.json` | 项目依赖和脚本 |
| `package-lock.json` | 依赖版本锁定 |

### 构建工具

| 文件 | 用途 |
|------|------|
| `vite.config.ts` | Vite 配置（开发服务器、构建） |
| `tsconfig.json` | TypeScript 配置 |
| `tsconfig.node.json` | Node 环境 TypeScript 配置 |

### 样式相关

| 文件 | 用途 |
|------|------|
| `tailwind.config.js` | Tailwind CSS 配置 |
| `postcss.config.js` | PostCSS 配置 |

---

## 🎯 常用操作指南

### 🚀 第一次使用项目

1. 阅读 `START-HERE.md`
2. 按照 `n8n-workflows/README-N8N-SETUP.md` 配置 N8N
3. 运行 `npm install` 安装依赖
4. 运行 `npm run dev` 启动项目

### 📝 开发时参考

- 变量命名：`VARIABLE-NAMING.md`
- 项目架构：`PROJECT-OVERVIEW.md`
- 文件结构：本文件

### 🐛 遇到问题时

1. 检查 `CHECKLIST.md` 确认配置是否正确
2. 查看 `n8n-workflows/README-N8N-SETUP.md` 排查 N8N 配置
3. 查看浏览器控制台和 N8N 执行日志

### 🎓 学习技术实现

- 乐观更新：`OPTIMISTIC-UPDATE-GUIDE.md`
- 缓存机制：查看 `src/contexts/FolderCacheContext.tsx`
- API 设计：查看 `src/services/favoriteService.ts`

---

## 📦 依赖说明

### 核心依赖

```json
{
  "react": "^18.2.0",           // React 框架
  "react-dom": "^18.2.0",       // React DOM
  "react-router-dom": "^6.20.0", // 路由管理
  "lucide-react": "^0.292.0"    // 图标库
}
```

### 开发依赖

```json
{
  "vite": "^5.0.8",             // 构建工具
  "typescript": "^5.3.3",       // TypeScript
  "tailwindcss": "^3.3.0",      // CSS 框架
  "@vitejs/plugin-react": "^4.2.1" // React 插件
}
```

---

## 🎨 项目特色

### ⚡ 性能优化

1. **乐观更新** - 立即响应用户操作，后台同步数据
2. **缓存机制** - 减少 API 调用，提升加载速度
3. **LocalStorage** - 持久化用户登录和缓存数据

### 🎯 用户体验

1. **瞬间响应** - 添加/删除收藏瞬间完成
2. **实时计数** - 文件夹收藏数量实时更新
3. **错误回滚** - API 失败时自动恢复 UI 状态

### 🔧 技术亮点

1. **统一 Webhook** - 单个 N8N 工作流处理所有操作
2. **类型安全** - 完整的 TypeScript 类型定义
3. **模块化设计** - 清晰的代码组织和职责分离

---

## 📞 需要帮助？

- 快速开始：`START-HERE.md`
- 完整功能：`README.md`
- N8N 设置：`n8n-workflows/README-N8N-SETUP.md`
- 功能检查：`CHECKLIST.md`

---

## 🎉 项目已实现的功能

✅ 本地登录系统（5个测试账户）  
✅ 24个测试车型的收藏  
✅ 自定义收藏夹  
✅ 收藏夹内收藏管理  
✅ 删除收藏  
✅ 删除文件夹  
✅ 收藏数量统计  
✅ 缓存优化  
✅ 乐观更新  
✅ 可配置的 Webhook URL  

---

**最后更新**: 2025-10-31  
**项目状态**: ✅ 基本功能完成，已清理临时文件
