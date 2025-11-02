# 🔍 车型直接搜索功能

## 功能概述

这个功能允许用户通过车型名称直接搜索，并获取该车型的所有图片（外观、内饰、座椅）。

## N8N工作流说明

### 工作流文件
- **文件**: `N8ND2-2/直接搜索功能.json`
- **Webhook路径**: `/get-all-car-images`
- **测试URL**: `https://lynn-cafa-system.app.n8n.cloud/webhook-test/get-all-car-images`

### 工作流程

1. **接收搜索请求**
   - Webhook接收POST请求
   - 参数: `{ "carName": "车型名称" }`

2. **模糊匹配分析**
   - 从Google Sheet读取车型数据库
   - 使用多种算法进行模糊匹配:
     - Levenshtein距离（编辑距离）
     - Jaro-Winkler相似度
     - 简单包含匹配
     - 品牌+车型分离匹配
   - 匹配阈值: 70%

3. **SerpAPI搜索（降级方案）**
   - 如果模糊匹配失败，使用SerpAPI搜索汽车之家
   - 从搜索结果中提取carID

4. **图片爬取**
   - 根据carID爬取三个分类的图片:
     - 外观 (categoryCode: 1)
     - 内饰 (categoryCode: 10)
     - 座椅 (categoryCode: 3)
   - 每个分类最多30张图片

5. **返回结果**
   - 合并所有分类的图片
   - 返回JSON格式结果

## API接口

### 请求格式

```bash
POST https://lynn-cafa-system.app.n8n.cloud/webhook-test/get-all-car-images
Content-Type: application/json

{
  "carName": "问界 M8"
}
```

### 响应格式

```json
{
  "success": true,
  "carId": "3170",
  "carName": "AITO 问界-问界M8",
  "matchType": "googlesheet_fuzzy_match",
  "totalImages": 73,
  "images": [
    {
      "url": "https://car3.autoimg.cn/cardfs/product/g30/...",
      "type": "high_quality",
      "category": "外观",
      "carName": "AITO 问界-问界M8"
    },
    ...
  ],
  "categorySummary": {
    "外观": 30,
    "内饰": 30,
    "座椅": 13
  },
  "message": "成功获取73张图片（3个分类）",
  "timestamp": "2025-10-29T12:00:00.000Z"
}
```

### 错误响应

```json
{
  "success": false,
  "error": "未能从搜索结果中提取carId",
  "code": "EXTRACTION_FAILED",
  "carName": "不存在的车型",
  "message": "未找到该车型"
}
```

## 前端集成

### 相关文件

1. **服务层** - `src/services/carSearchService.ts`
   - `searchCarImages(carName)` - 调用N8N搜索API
   - 返回类型: `N8NSearchResult`

2. **组件层** - `src/components/SearchResultGrid.tsx`
   - 显示搜索结果的图片网格
   - 使用与FilteredCarGrid相同的12卡片布局
   - 支持无限滚动

3. **页面层** - `src/pages/SearchResults.tsx`
   - 搜索结果页面
   - 路由: `/search?q=车型名称&from=来源页面`
   - 显示加载状态、搜索结果、错误提示

4. **全局搜索栏** - `src/components/SearchBar.tsx`
   - 所有页面顶部的搜索框
   - 点击搜索或按Enter触发搜索
   - 跳转到SearchResults页面

### 使用方式

用户可以在以下任意页面使用搜索功能：
- 车型展示主页 (CarShowcaseMain)
- 车型详情页 (CarShowcaseDetail)
- 收藏夹主页 (FavoritesMain)
- 收藏夹详情页 (FavoritesDetail)
- AI分析页 (AIAnalysis)

## 测试示例

### 测试用例 1: 精确匹配

```bash
curl -X POST \
  https://lynn-cafa-system.app.n8n.cloud/webhook-test/get-all-car-images \
  -H "Content-Type: application/json" \
  -d '{"carName": "问界 M8"}'
```

**预期结果**: 找到"AITO 问界-问界M8"，返回70+张图片

### 测试用例 2: 模糊匹配

```bash
curl -X POST \
  https://lynn-cafa-system.app.n8n.cloud/webhook-test/get-all-car-images \
  -H "Content-Type: application/json" \
  -d '{"carName": "问界M8"}'
```

**预期结果**: 模糊匹配成功，返回图片

### 测试用例 3: 车型不存在

```bash
curl -X POST \
  https://lynn-cafa-system.app.n8n.cloud/webhook-test/get-all-car-images \
  -H "Content-Type: application/json" \
  -d '{"carName": "不存在的车型XYZ"}'
```

**预期结果**: 返回错误信息

## 特性

✅ **模糊匹配**: 支持车型名称的模糊搜索（阈值70%）
✅ **多分类图片**: 自动获取外观、内饰、座椅三个分类的图片
✅ **降级搜索**: Google Sheet匹配失败时，自动使用SerpAPI搜索
✅ **响应式布局**: 搜索结果使用12卡片网格，支持无限滚动
✅ **统一风格**: 保持与筛选功能相同的卡片样式
✅ **全局可用**: 所有页面的搜索框均可使用

## 注意事项

1. **SerpAPI限制**: 每月有API调用次数限制，请合理使用
2. **图片加载**: 汽车之家的图片可能有防盗链，建议在后端转存
3. **搜索速度**: 完整搜索需要5-15秒，已添加加载动画提示
4. **缓存建议**: 可以在后端添加缓存机制，提高响应速度

## 后续优化建议

1. 添加搜索历史记录
2. 实现热门搜索推荐
3. 支持按分类筛选图片
4. 添加图片预览大图功能
5. 实现图片懒加载优化性能

