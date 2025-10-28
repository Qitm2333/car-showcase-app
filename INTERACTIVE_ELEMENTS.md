# 🎮 项目可交互元素汇总

> **目的**: 记录项目中所有可交互的UI元素，方便后期查找和配置
> **最后更新**: 2025-10-27

---

## 📑 目录
1. [全局组件](#全局组件)
2. [Car Showcase 主页](#car-showcase-主页)
3. [Car Showcase 详情页](#car-showcase-详情页)
4. [收藏夹主页](#收藏夹主页)
5. [收藏夹详情页](#收藏夹详情页)
6. [AI分析页](#ai分析页)

---

## 🌐 全局组件

### 1. 搜索栏 (SearchBar)
**文件位置**: `src/components/SearchBar.tsx`

**功能说明**:
- ✅ **已实现**: 可输入文本
- ✅ **已实现**: 点击搜索图标触发搜索
- ✅ **已实现**: 支持Enter键搜索
- ⏳ **待实现**: 实际搜索逻辑（目前为占位）

**使用页面**:
- CarShowcaseMain (车型展示主页)
- CarShowcaseDetail (车型详情页)
- FavoritesMain (收藏夹主页)
- FavoritesDetail (收藏夹详情页)
- AIAnalysis (AI分析页)

**配置方法**:
```tsx
<SearchBar 
  placeholder="自定义占位文本"
  onSearch={(searchText) => {
    // 自定义搜索逻辑
    console.log("搜索:", searchText);
  }}
/>
```

**修改位置**:
- 主要逻辑: `src/components/SearchBar.tsx` 第 36-47 行

---

### 2. 语言选择器 (LanguageSelector)
**文件位置**: `src/components/LanguageSelector.tsx`

**功能说明**:
- ✅ **已实现**: 显示当前语言
- ⏳ **待实现**: 语言切换逻辑

**配置方法**:
```tsx
<LanguageSelector 
  currentLanguage="简体中文"
  onLanguageChange={(lang) => {
    // 语言切换逻辑
    console.log("切换到:", lang);
  }}
/>
```

---

### 3. 左侧导航栏 (LeftNavOverlay)
**文件位置**: `src/components/LeftNavOverlay.tsx`

**功能说明**:
- ⚠️ **需检查**: 导航菜单项的点击事件
- ⏳ **待配置**: 各菜单项的跳转逻辑

**可能的交互元素**:
- [ ] 灵感搜集菜单项
- [ ] 收藏夹菜单项
- [ ] AI分析菜单项
- [ ] 用户头像/设置

---

## 🚗 Car Showcase 主页

**文件位置**: `src/pages/CarShowcaseMain.tsx`
**布局文件**: `src/imports/inspiration-main/02车型展示ResahpeGbzLayout-1-1077.tsx`

### 1. 搜索栏
- 位置: 页面顶部
- 功能: 全局搜索（已集成SearchBar组件）
- 状态: ✅ 可输入，⏳ 搜索逻辑待实现

### 2. 语言选择器
- 位置: 页面右上角
- 功能: 切换语言
- 状态: ⏳ 待实现切换逻辑

### 3. 车型卡片 - 第一行
**文件位置**: 第 523-598 行 (Component24)

#### 3.1 Smart #1 卡片
- **代码行**: 538-543
- **点击回调**: `onClick={() => onCarClick?.("smart-1")}`
- **当前行为**: ✅ 点击跳转到 `/car-showcase/1`
- **配置位置**: `CarShowcaseMain.tsx` 第 8-10 行
```tsx
const handleCarClick = (carId: string) => {
  navigate(`/car-showcase/1`);
};
```

#### 3.2 ZEEKR 009 卡片
- **代码行**: 544-555
- **状态**: ❌ 无点击事件
- **建议**: 添加 `onClick` 事件

#### 3.3 IM6 卡片
- **代码行**: 556-567
- **状态**: ❌ 无点击事件
- **建议**: 添加 `onClick` 事件

#### 3.4 其他车型卡片
- **状态**: ❌ 需要检查并添加点击事件
- **位置**: Component24 组件内

### 4. 车型卡片 - 第二行
**文件位置**: 第 600-656 行 (Component25)

**状态**: ⚠️ 需要检查每个卡片的交互性
**建议**: 添加统一的 `onCarClick` 事件

### 5. 车型卡片 - 第三行
**文件位置**: 第 658-736 行 (Component26)

#### 5.1 Polestar 3 卡片
- **代码行**: 667-678, 676-687
- **点击回调**: `onClick={() => onCarClick?.("polarstar-3")}`
- **状态**: ✅ 已配置点击事件

#### 5.2 Geely Cowboy 卡片
- **代码行**: 689-699
- **点击回调**: `onClick={() => onCarClick?.("geely-cowboy")}`
- **状态**: ✅ 已配置点击事件

#### 5.3 Geely Azkarra 卡片
- **代码行**: 701-712
- **点击回调**: `onClick={() => onCarClick?.("geely-azkarra")}`
- **状态**: ✅ 已配置点击事件

#### 5.4 Lynk & Co Z10 卡片
- **代码行**: 724-735
- **点击回调**: `onClick={() => onCarClick?.("lynk-co-z10")}`
- **状态**: ✅ 已配置点击事件

### 6. 中部筛选栏
**文件位置**: `src/imports/inspiration-main/中部栏.tsx`

**可能的交互元素**:
- [ ] 品牌筛选按钮
- [ ] 车型分类按钮
- [ ] 排序选项
- [ ] 其他筛选器

**状态**: ⚠️ 需要详细检查

---

## 📊 交互元素统计

### Car Showcase 主页
| 元素类型 | 已实现 | 待实现 | 总计 |
|---------|--------|--------|------|
| 搜索栏 | 1 | 0 (搜索逻辑待完善) | 1 |
| 语言选择 | 1 | 0 (切换逻辑待实现) | 1 |
| 车型卡片 | 5 | 约10+ | 约15+ |
| 筛选按钮 | 0 | 待检查 | ? |

---

## 🔧 配置指南

### 如何添加车型卡片点击事件

1. **在布局文件中添加onClick**:
```tsx
// 文件: 02车型展示ResahpeGbzLayout-1-1077.tsx
<div 
  className="absolute inset-[...] cursor-pointer" 
  onClick={() => onCarClick?.("car-id")}
>
  {/* 卡片内容 */}
</div>
```

2. **在页面文件中处理点击**:
```tsx
// 文件: CarShowcaseMain.tsx
const handleCarClick = (carId: string) => {
  navigate(`/car-showcase/${carId}`);
  // 或其他逻辑
};
```

### 如何实现搜索功能

编辑 `src/components/SearchBar.tsx`:
```tsx
const handleSearch = () => {
  console.log("🔍 搜索内容:", searchText);
  
  // TODO: 实现实际搜索逻辑
  // 示例:
  // 1. 调用API搜索
  // api.search(searchText);
  
  // 2. 过滤本地数据
  // const results = data.filter(item => 
  //   item.name.includes(searchText)
  // );
  
  // 3. 导航到搜索结果页
  // navigate(`/search?q=${searchText}`);
  
  if (onSearch) {
    onSearch(searchText);
  }
};
```

---

## 📋 待办事项清单

### 高优先级
- [ ] 为所有车型卡片添加点击事件
- [ ] 实现搜索功能的实际逻辑
- [ ] 检查左侧导航栏的交互元素
- [ ] 检查中部筛选栏的按钮

### 中优先级
- [ ] 实现语言切换功能
- [ ] 添加车型卡片的悬停效果
- [ ] 添加加载状态和错误处理

### 低优先级
- [ ] 添加动画效果
- [ ] 优化移动端适配
- [ ] 添加键盘快捷键支持

---

## 💡 提示

### 快速查找交互元素
在项目中搜索以下关键词:
- `onClick`
- `onCarClick`
- `handleClick`
- `cursor-pointer`
- `button`

### 调试建议
1. 在浏览器开发者工具中查看console日志
2. 搜索栏的搜索操作会在控制台输出
3. 所有点击事件都可以添加console.log进行调试

---

**文档维护者**: AI Assistant
**项目路径**: `整合/`

