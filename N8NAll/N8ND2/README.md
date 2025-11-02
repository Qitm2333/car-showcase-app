# 🚗 N8N 车型筛选功能说明

## 📂 文件结构

```
N8ND2/
├── 根据GoogleSheet筛选的N8N工作流.json  # N8N工作流配置（可直接导入）
├── 测试指南.md                           # 详细的测试步骤和调试指南
└── README.md                             # 本文件
```

---

## 🎯 功能概述

这是一个完整的车型筛选系统，整合了：

- **前端筛选UI** - 品牌、车型、视角、部件、时间筛选器
- **N8N后端工作流** - 从Google Sheet读取并筛选车型数据
- **实时数据展示** - 根据筛选条件动态显示车型卡片

---

## 🔧 技术架构

```
┌─────────────────┐
│   用户界面       │ (中部栏筛选组件)
└────────┬────────┘
         │ onFilterChange
         ↓
┌─────────────────┐
│  CarShowcaseMain │ (页面逻辑)
└────────┬────────┘
         │ fetchFilteredCars
         ↓
┌─────────────────┐
│   N8N Webhook   │ (car-image-filter)
└────────┬────────┘
         │ 解析参数
         ↓
┌─────────────────┐
│  Google Sheets  │ (CarImageURLMVP用)
└────────┬────────┘
         │ 读取数据
         ↓
┌─────────────────┐
│   筛选逻辑      │ (Code节点)
└────────┬────────┘
         │ 返回结果
         ↓
┌─────────────────┐
│ FilteredCarGrid │ (动态显示)
└─────────────────┘
```

---

## 📋 N8N 工作流说明

### 节点列表

1. **Webhook接收筛选请求1**
   - 接收POST请求
   - 路径: `car-image-filter`
   - 参数: `{ brands, models, views, keyword }`

2. **解析筛选条件**
   - 验证和格式化输入参数
   - 记录筛选日志

3. **读取Google Sheet**
   - 连接: `CarSheet` (ID: 1mjs9hbxuETgarWLqKlHxhK3XQHKG2E6BmkpMs6RUghQ)
   - 工作表: `CarImageURLMVP用`

4. **执行筛选**
   - 关键词匹配 (carName)
   - 品牌匹配 (carName)
   - 车型匹配 (vehicleClass)
   - 视角匹配 (viewType)

5. **格式化响应**
   - 统计结果数量
   - 构建JSON响应

6. **返回结果1**
   - 添加CORS headers
   - 返回筛选结果

### 数据流示例

**输入：**
```json
{
  "brands": ["比亚迪"],
  "models": ["SUV"],
  "views": []
}
```

**输出：**
```json
{
  "success": true,
  "count": 2,
  "results": [
    {
      "carName": "BYD Song Plus",
      "vehicleClass": "紧凑型车SUV",
      "viewType": "正侧图",
      "imageURL": "https://..."
    }
  ]
}
```

---

## 🔗 API端点

### 生产环境

```
POST https://lynn-cafa-system.app.n8n.cloud/webhook-test/car-image-filter
```

### 请求示例

```bash
curl -X POST https://lynn-cafa-system.app.n8n.cloud/webhook-test/car-image-filter \
  -H "Content-Type: application/json" \
  -d '{
    "brands": ["比亚迪"],
    "models": ["SUV"],
    "views": ["正侧图"]
  }'
```

---

## 🚀 快速开始

### 1. 导入N8N工作流

1. 登录N8N: https://lynn-cafa-system.app.n8n.cloud
2. 点击右上角 **"+"** → **"Import from File"**
3. 选择 `根据GoogleSheet筛选的N8N工作流.json`
4. 配置Google Sheets凭证
5. 激活工作流

### 2. 配置Google Sheet

确保Google Sheet包含以下列：
- `carName` (车型名称)
- `vehicleClass` (车型类别)
- `viewType` (视角)
- `imageURL` (图片URL)

### 3. 测试前端功能

```bash
npm run dev
# 打开 http://localhost:5173/car-showcase
# 尝试选择筛选条件
```

详细测试步骤见 → [测试指南.md](./测试指南.md)

---

## 📊 Google Sheet 要求

### Sheet 名称
`CarImageURLMVP用`

### 必需列

| 列名 | 类型 | 说明 | 示例 |
|------|------|------|------|
| carName | 文本 | 车型名称（用于品牌和关键词匹配） | BYD Song Plus |
| vehicleClass | 文本 | 车型分类 | 紧凑型车SUV |
| viewType | 文本 | 视角类型 | 正侧图, 正45°, 前脸 |
| imageURL | URL | 图片地址（必须公开访问） | https://... |

### 数据示例

```csv
carName,vehicleClass,viewType,imageURL
BYD Song Plus,紧凑型车SUV,正侧图,https://example.com/byd-song-plus.jpg
ZEEKR 009,MPV,正45°,https://example.com/zeekr-009.jpg
```

---

## 🔧 前端集成文件

| 文件 | 功能 |
|------|------|
| `src/config/api.ts` | API端点配置 |
| `src/services/carFilterService.ts` | 筛选API服务层 |
| `src/imports/inspiration-main/中部栏.tsx` | 筛选UI组件 |
| `src/pages/CarShowcaseMain.tsx` | 页面逻辑和状态管理 |
| `src/components/FilteredCarGrid.tsx` | 筛选结果展示组件 |

---

## 🎨 用户体验

### 筛选流程

1. 用户点击筛选按钮（品牌/车型/视角）
2. 显示下拉菜单，选择选项
3. 页面显示 **"正在筛选..."** 加载动画
4. 0.5-2秒后显示筛选结果
5. 结果以卡片形式展示（保持原布局）

### 特殊处理

- **无筛选条件** → 显示默认12张卡片
- **有筛选条件** → 调用N8N API，显示动态结果
- **筛选失败** → 回退到默认显示
- **无结果** → 显示空状态（保留默认卡片）

---

## 📈 性能优化

- ✅ 防抖处理（避免频繁调用API）
- ✅ 优雅降级（API失败不影响用户体验）
- ✅ 加载状态（提供视觉反馈）
- ✅ 图片懒加载（按需加载图片）
- ⏳ 缓存策略（计划中）

---

## 🐛 故障排查

### N8N工作流未激活

**症状:** 点击筛选无响应  
**解决:** 登录N8N，确认工作流状态为"Active"

### Google Sheet权限问题

**症状:** N8N报错"Permission denied"  
**解决:** 在Google Sheet设置中，添加N8N服务账户的访问权限

### CORS错误

**症状:** 浏览器控制台显示CORS错误  
**解决:** 检查N8N Webhook节点的CORS配置

### 图片不显示

**症状:** 卡片显示但图片为空  
**解决:** 
1. 检查imageURL是否有效
2. 确认图片URL可公开访问
3. 检查浏览器Network标签的图片加载状态

---

## 📞 支持

遇到问题？查看：
1. [测试指南.md](./测试指南.md) - 详细测试步骤
2. 浏览器控制台日志
3. N8N工作流执行记录

---

**Happy Filtering! 🎉**

