# 🎨 收藏夹系统 - 项目总览

## 🌟 项目简介

这是一个基于 **React + N8N + Google Sheets** 的汽车收藏夹系统测试项目。

通过超丰富的 **24个 Emoji 卡片**，你可以直观地测试收藏功能，数据实时保存到 Google Sheets。

---

## 📸 界面预览

### 主测试界面
- 🎨 **24个精美卡片** - 每个都有独特的 Emoji 和渐变色
- 💖 **一键收藏** - 点击爱心按钮即可收藏
- 🎯 **分类管理** - 支持多个收藏夹（外观、内饰、细节、综合）
- ✨ **实时反馈** - 收藏成功/失败即时提示

### 卡片分类
```
📦 24个测试卡片
├── 🚗 外观系列 (5个)
│   ├── 智己L6 - 正45°
│   ├── 小米SU7 - 侧面
│   ├── 理想L9 - 正面
│   ├── 问界M9 - 背面
│   └── 极氪009 - 全景
│
├── 🏠 内饰系列 (5个)
│   ├── 宝马iX - 中控台
│   ├── 奔驰EQS - 仪表盘
│   ├── 蔚来ET7 - 座椅
│   ├── 极氪001 - 车机
│   └── 比亚迪汉 - 音响
│
├── 💡 细节系列 (5个)
│   ├── 奥迪Q4 - 大灯
│   ├── 特斯拉Model S - 轮毂
│   ├── 保时捷Taycan - 车门
│   ├── 沃尔沃EX90 - 天窗
│   └── Polestar 2 - 充电口
│
├── 🏔️ SUV系列 (5个)
│   ├── 坦克300 - 越野
│   ├── 路虎卫士 - 野外
│   ├── 吉普牧马人 - 山地
│   ├── 丰田普拉多 - 沙滩
│   └── 日产途乐 - 雪地
│
└── 🏁 运动系列 (4个)
    ├── 法拉利SF90 - 赛道
    ├── 兰博基尼Huracán - 起步
    ├── 迈凯伦720S - 飘移
    └── 保时捷911 - 弯道
```

---

## 🏗️ 技术架构

```
┌─────────────────────────────────────────────────────┐
│                    前端层 (React)                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  FavoriteTestPage.tsx                        │   │
│  │  - 24个 Emoji 卡片                           │   │
│  │  - 收藏按钮                                   │   │
│  │  - 收藏夹选择对话框                           │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  favoriteService.ts                          │   │
│  │  - API 封装                                   │   │
│  │  - 类型定义                                   │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                         ↓ HTTP POST
┌─────────────────────────────────────────────────────┐
│                   API 层 (N8N)                       │
│  ┌─────────────────────────────────────────────┐   │
│  │  Webhook 1: add-to-favorite                  │   │
│  │  Webhook 2: get-favorite-folders             │   │
│  │  Webhook 3: get-favorite-detail              │   │
│  │  Webhook 4: create-favorite-folder           │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  业务逻辑                                      │   │
│  │  - 数据验证                                    │   │
│  │  - 去重检查                                    │   │
│  │  - ID 自增                                     │   │
│  │  - 用户隔离 (inviteCode)                      │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
                         ↓ Google Sheets API
┌─────────────────────────────────────────────────────┐
│              数据层 (Google Sheets)                  │
│  ┌─────────────────────────────────────────────┐   │
│  │  Sheet 1: UserFavoriteFolders                │   │
│  │  - folderID, folderName, itemCount...        │   │
│  └─────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────┐   │
│  │  Sheet 2: UserFavoriteItems                  │   │
│  │  - itemID, carID, carName, imageURL...       │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 核心功能

### 1. 添加到收藏 ⭐
```typescript
// 点击卡片的爱心按钮
→ 弹出收藏夹选择对话框
→ 选择收藏夹（外观/内饰/细节/综合）
→ 发送 API 请求到 N8N
→ N8N 检查是否重复
→ 写入 Google Sheets
→ 返回成功提示
```

### 2. 获取收藏夹列表 📋
```typescript
// 用户登录时加载
→ 发送 inviteCode
→ N8N 查询 UserFavoriteFolders
→ 筛选该用户的收藏夹
→ 返回收藏夹数组
```

### 3. 获取收藏夹详情 📄
```typescript
// 点击收藏夹时
→ 发送 inviteCode + folderID
→ N8N 查询 UserFavoriteItems
→ 筛选该收藏夹的项目
→ 返回收藏项数组
```

### 4. 创建收藏夹 ➕
```typescript
// 点击"创建收藏夹"按钮
→ 输入收藏夹名称
→ N8N 生成新 folderID
→ 写入 UserFavoriteFolders
→ 返回新收藏夹信息
```

---

## 📊 数据结构

### UserFavoriteFolders (收藏夹表)
```typescript
interface FavoriteFolder {
  folderID: number;       // 收藏夹ID（自增）
  inviteCode: string;     // 用户邀请码（用于隔离）
  folderName: string;     // 收藏夹名称
  description: string;    // 描述
  createdAt: string;      // 创建时间
  updatedAt: string;      // 更新时间
  itemCount: number;      // 项目数量
}
```

### UserFavoriteItems (收藏项表)
```typescript
interface FavoriteItem {
  itemID: number;         // 项目ID（自增）
  folderID: number;       // 所属收藏夹ID
  inviteCode: string;     // 用户邀请码
  carID: number;          // 车辆ID
  carName: string;        // 车型名称
  imageURL: string;       // 图片URL
  category: string;       // 分类（外观/内饰/细节...）
  viewType: string;       // 视角（正45°/侧面/正面...）
  addedAt: string;        // 添加时间
}
```

---

## 📂 项目结构

```
项目根目录/
│
├── 📱 前端代码
│   ├── src/
│   │   ├── pages/
│   │   │   └── FavoriteTestPage.tsx      # 🎨 测试界面（核心）
│   │   ├── services/
│   │   │   └── favoriteService.ts        # API 服务
│   │   ├── config/
│   │   │   └── api.ts                    # 🔧 API 配置（需要修改）
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── 🔧 N8N 工作流
│   ├── n8n-workflows/
│   │   ├── 01-add-to-favorite.json       # 添加收藏
│   │   ├── 02-get-favorite-folders.json  # 获取列表
│   │   ├── 03-get-favorite-detail.json   # 获取详情
│   │   ├── 04-create-favorite-folder.json# 创建收藏夹
│   │   └── README-N8N-SETUP.md           # 详细配置说明
│
├── 📊 Google Sheets 模板
│   └── google-sheets-template/
│       ├── UserFavoriteFolders.csv       # 收藏夹表模板
│       └── UserFavoriteItems.csv         # 收藏项表模板
│
├── 🧪 测试工具
│   └── test-api.html                     # API 测试界面
│
└── 📚 文档
    ├── README.md                         # 项目说明
    ├── QUICK-START.md                    # 快速开始
    ├── CHECKLIST.md                      # 配置检查清单
    └── PROJECT-OVERVIEW.md               # 本文件
```

---

## ⚙️ 配置步骤

只需 **3 步**即可完成配置：

### 第 1 步：Google Sheets（5分钟）
```bash
1. 创建表格 CarFavoritesSystem
2. 导入两个 CSV 模板
3. 获取 Sheet ID
4. 设置权限
```

### 第 2 步：N8N 工作流（15分钟）
```bash
1. 导入 4 个工作流 JSON
2. 替换 Sheet ID
3. 激活工作流
4. 复制 Webhook URL
```

### 第 3 步：前端配置（2分钟）
```bash
1. 编辑 src/config/api.ts
2. 替换 4 个 API URL
3. 保存文件（自动热更新）
```

详细步骤请查看：
- **QUICK-START.md** - 新手友好的快速开始指南
- **CHECKLIST.md** - 逐项检查清单
- **n8n-workflows/README-N8N-SETUP.md** - N8N 详细配置

---

## 🧪 测试方法

### 方法 1：使用测试工具（推荐）
```bash
1. 打开 test-api.html
2. 输入 Webhook URL
3. 点击发送请求
4. 查看返回结果
```

### 方法 2：在测试界面测试
```bash
1. 访问 http://localhost:3000
2. 点击卡片的 ❤️ 按钮
3. 选择收藏夹
4. 查看成功提示
5. 检查 Google Sheets
```

### 方法 3：使用 curl
```bash
curl -X POST https://your-n8n-url/webhook/add-to-favorite \
  -H "Content-Type: application/json" \
  -d '{"inviteCode":"DEMO2024","folderID":1,...}'
```

---

## 🎯 核心特性

### ✅ 用户隔离
- 通过 `inviteCode` 区分不同用户
- 每个用户只能看到自己的收藏夹
- 测试用户：`DEMO2024`

### ✅ 数据去重
- 同一图片不会重复收藏到同一文件夹
- 在 N8N 的 Code 节点中实现
- 检查条件：`inviteCode + folderID + carID + imageURL`

### ✅ 自增 ID
- `folderID` 和 `itemID` 自动生成
- 读取现有最大值 + 1
- 无需手动管理

### ✅ 实时同步
- 收藏后立即写入 Google Sheets
- 支持多端访问
- 数据永久保存

### ✅ 扩展性强
- 可以添加更多收藏夹
- 可以扩展字段（如标签、备注）
- 可以集成到现有项目

---

## 🔥 技术亮点

### 1. 无后端开发
- 使用 N8N 作为 API 层
- 无需编写服务器代码
- 可视化工作流配置

### 2. 零成本存储
- Google Sheets 免费版支持 500万个单元格
- 足够存储大量数据
- 支持在线编辑和查看

### 3. 快速原型
- 从零到上线只需 30 分钟
- 适合快速验证想法
- 易于迭代和修改

### 4. 可视化管理
- 数据存储在 Google Sheets
- 可以直接查看和编辑
- 支持导出为 Excel/CSV

---

## 📈 性能考虑

### 适用场景
✅ 个人项目、小团队项目  
✅ 原型验证、MVP 开发  
✅ 数据量 < 10万条  
✅ 并发请求 < 100/分钟  

### 不适用场景
❌ 高并发场景（> 1000/分钟）  
❌ 大数据量（> 百万条）  
❌ 需要复杂查询和聚合  
❌ 对性能要求极高的生产环境  

### 性能优化建议
- 使用 Google Sheets API 缓存
- 批量操作而非单条写入
- 考虑迁移到 PostgreSQL/MongoDB（保持 N8N）

---

## 🌈 扩展方向

### 短期（1-2周）
- [ ] 创建收藏夹列表页面
- [ ] 创建收藏夹详情页面
- [ ] 添加删除收藏功能
- [ ] 添加编辑收藏夹名称功能

### 中期（1个月）
- [ ] 添加搜索功能
- [ ] 添加标签系统
- [ ] 添加分享功能
- [ ] 添加导出功能（PDF/图片）

### 长期（3个月+）
- [ ] 迁移到专业数据库
- [ ] 添加用户系统
- [ ] 添加协作功能
- [ ] 开发移动端应用

---

## 🎓 学习价值

通过这个项目，你将学会：

1. **React 开发**
   - TypeScript 类型系统
   - 组件化开发
   - 状态管理
   - API 调用

2. **N8N 工作流**
   - Webhook 配置
   - Google Sheets 集成
   - JavaScript Code 节点
   - 工作流调试

3. **系统设计**
   - 三层架构（前端/API/数据）
   - RESTful API 设计
   - 数据建模
   - 用户隔离

4. **快速原型**
   - 零后端开发
   - 快速验证想法
   - 迭代式开发

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 许可证

MIT License

---

## 📞 联系方式

如有问题，请查看文档或提交 Issue。

---

**🎉 现在开始体验吧！**

```bash
npm install
npm run dev
```

访问 http://localhost:3000 🚀

