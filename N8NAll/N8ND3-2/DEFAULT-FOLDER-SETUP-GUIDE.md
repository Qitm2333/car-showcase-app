# 📂 默认收藏夹设置指南

## 🎯 概述

现在系统使用**预创建的默认收藏夹**，而不是没有 folderID 的收藏。每个用户都有一个专属的默认收藏夹。

---

## 📊 Google Sheets 配置

### 1️⃣ 为每个用户创建默认收藏夹

在 **`FavoriteFolders`** 表中，为每个用户添加一行默认收藏夹：

| folderID | userID | folderName | folderIcon | createTime | status |
|----------|--------|------------|------------|------------|--------|
| `folder_default_DEMO2024` | `DEMO2024` | 默认收藏夹 | 💖 | `2024-10-30T00:00:00.000Z` | `active` |
| `folder_default_TEST2024` | `TEST2024` | 默认收藏夹 | 💖 | `2024-10-30T00:00:00.000Z` | `active` |
| `folder_default_ADMIN001` | `ADMIN001` | 默认收藏夹 | 💖 | `2024-10-30T00:00:00.000Z` | `active` |
| `folder_default_GUEST001` | `GUEST001` | 默认收藏夹 | 💖 | `2024-10-30T00:00:00.000Z` | `active` |
| `folder_default_GUEST002` | `GUEST002` | 默认收藏夹 | 💖 | `2024-10-30T00:00:00.000Z` | `active` |

### 📝 字段说明

- **`folderID`**: 格式为 `folder_default_${userID}`
- **`userID`**: 用户的邀请码
- **`folderName`**: 固定为 "默认收藏夹"
- **`folderIcon`**: 建议使用 💖
- **`createTime`**: 任意日期（可以是系统启用日期）
- **`status`**: `active`

---

## 🔧 前端逻辑

### 1️⃣ 收藏对话框

用户点击收藏时，会看到：

```
💝 选择收藏夹

💖 默认收藏夹        5 项
🎨 外观收藏          12 项
🏠 内饰收藏          8 项
⚙️ 细节收藏          3 项
```

### 2️⃣ 点击"默认收藏夹"

前端会自动转换：
```typescript
// 用户点击"默认收藏夹"
folderID = 'default'

// 前端转换为实际的 folderID
actualFolderID = `folder_default_${userID}`
// 例如：folder_default_DEMO2024
```

### 3️⃣ 统计逻辑

显示收藏数量时，前端会自动识别：
```typescript
// 所有 folder_default_${userID} 格式的 folderID
// 都会被统计到"默认收藏夹"的数量中
if (fid.startsWith('folder_default_')) {
  fid = 'default';
}
```

---

## 🎨 前端改动总结

### ✅ 删除的功能
- ❌ **"💖 我的收藏"按钮** - 从 `UserHeader` 中移除
- ❌ **直接查看所有收藏的入口** - 现在通过"📂 收藏夹"页面查看

### ✅ 新增的逻辑
- ✅ 点击"默认收藏夹"时，自动使用 `folder_default_${userID}` 格式
- ✅ 统计时自动识别 `folder_default_` 开头的 folderID
- ✅ 在收藏夹列表页按文件夹分组时，默认收藏夹显示为"📁 默认收藏夹"

---

## 🔄 N8N 改动（可选）

### "添加收藏成功" 节点

更新 Code 节点，避免返回 undefined：

```javascript
const data = $input.item.json;

// 构建返回数据，确保 folderID 正确处理
const result = {
  json: {
    success: true,
    message: '收藏成功',
    data: {
      favoriteID: data.favoriteID,
      carName: data.carName,
      timestamp: data.favoriteTime
    }
  }
};

// 只有当 folderID 存在且不为空时才添加到返回数据
if (data.folderID && data.folderID !== '') {
  result.json.data.folderID = data.folderID;
}

return result;
```

### 说明
- 当 `folderID` 是 `folder_default_DEMO2024` 时，会正常返回
- 前端会正确显示"✅ 已添加到「默认收藏夹」！"

---

## 📱 用户体验

### 场景 1：第一次使用（没有自定义文件夹）
1. 点击 ❤️ 收藏按钮
2. 看到对话框：
   ```
   📂
   还没有创建收藏夹
   先保存到默认收藏夹，或者创建一个新的收藏夹吧！
   
   [💖 保存到默认]  [去创建收藏夹]
   ```
3. 点击"💖 保存到默认"
4. 成功提示：`✅ 🚗 已添加到「默认收藏夹」！`

### 场景 2：有自定义文件夹
1. 点击 ❤️ 收藏按钮
2. 看到对话框：
   ```
   💝 选择收藏夹
   
   💖 默认收藏夹        5 项
   🎨 外观收藏          12 项
   🏠 内饰收藏          8 项
   ```
3. 可以选择任意文件夹
4. 成功后显示对应的文件夹名称

### 场景 3：查看收藏
1. 点击顶部的"📂 收藏夹"按钮
2. 看到所有文件夹卡片（包括默认收藏夹）
3. 点击任意文件夹，查看该文件夹内的收藏

---

## 🎁 优势

### ✅ 数据一致性
- 所有收藏都有明确的 folderID
- 不再有"孤立"的收藏（folderID 为空）

### ✅ 用户体验
- 默认收藏夹和自定义收藏夹一样，都是"真实的文件夹"
- 可以在"📂 收藏夹"页面看到默认收藏夹的卡片
- 统计数据更准确

### ✅ 代码简化
- 不需要特殊处理 folderID 为空的情况
- 所有文件夹都可以用同样的逻辑处理

---

## ✅ 检查清单

### Google Sheets
- [ ] 为每个用户创建 `folder_default_${userID}` 记录
- [ ] `folderName` 设置为 "默认收藏夹"
- [ ] `folderIcon` 设置为 💖
- [ ] `status` 设置为 `active`

### N8N
- [ ] 更新"添加收藏成功" Code 节点（可选，但推荐）

### 前端
- [ ] ✅ 已删除"💖 我的收藏"按钮
- [ ] ✅ 已更新默认收藏夹逻辑
- [ ] ✅ 已更新统计逻辑

### 测试
- [ ] 点击"默认收藏夹"能正常保存
- [ ] 默认收藏夹显示正确的数量
- [ ] 在"📂 收藏夹"页面能看到默认收藏夹
- [ ] 点击默认收藏夹能查看收藏列表

---

## 🚀 立即开始

1. **打开 Google Sheets**
2. **进入 `FavoriteFolders` 表**
3. **为每个用户添加一行默认收藏夹**
4. **刷新前端页面**
5. **测试收藏功能**

完成！✨

