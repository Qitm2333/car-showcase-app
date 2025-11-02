# 📝 变量命名规范

## ✅ 统一标准：使用大写 ID 和 URL

---

## 📊 **字段列表**

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| favoriteID | string | 收藏ID | fav_20241030_abc123 |
| userID | string | 用户ID | USER001 |
| carID | string | 车辆ID | 7684 |
| carName | string | 车型名称 | 智己L6 |
| imageURL | string | 图片URL | https://... |
| favoriteTime | string | 收藏时间 | 2024-10-30T12:34:56.789Z |
| status | string | 状态 | active / deleted |

---

## 🎯 **所有地方统一使用大写**

### ✅ Google Sheets 表头
```
favoriteID | userID | carID | carName | imageURL | favoriteTime | status
```

### ✅ N8N 工作流
```javascript
const userID = body.userID;
const carID = body.carID;
const imageURL = body.imageURL;
const favoriteID = 'fav_...';
```

### ✅ 前端代码
```typescript
// src/services/favoriteService.ts
export interface FavoriteItem {
  favoriteID: string;
  carID: string;
  carName: string;
  imageURL: string;
  favoriteTime: string;
}

await addToFavorite({
  userID: 'USER001',
  carID: '7684',
  carName: '智己L6',
  imageURL: 'https://...'
});
```

### ✅ API 请求
```json
{
  "action": "add",
  "userID": "USER001",
  "carID": "7684",
  "carName": "智己L6",
  "imageURL": "https://..."
}
```

### ✅ API 响应
```json
{
  "success": true,
  "favorites": [
    {
      "favoriteID": "fav_20241030_abc123",
      "userID": "USER001",
      "carID": "7684",
      "carName": "智己L6",
      "imageURL": "https://...",
      "favoriteTime": "2024-10-30T12:34:56.789Z"
    }
  ]
}
```

### ✅ 测试工具
```javascript
// test-favorite-api.html
const data = {
  action: 'add',
  userID: document.getElementById('addUserID').value,
  carID: document.getElementById('addCarID').value,
  carName: document.getElementById('addCarName').value,
  imageURL: document.getElementById('addImageURL').value
};
```

---

## 📁 **已更新的文件**

### 后端（N8N）
- ✅ `n8n-workflows/FINAL-WORKFLOW.json` - 使用大写

### 前端（React）
- ✅ `src/services/favoriteService.ts` - 接口和函数参数
- ✅ `src/pages/FavoriteTestPage.tsx` - 调用 API 时使用大写
- ✅ `src/pages/FavoritesListPage.tsx` - 显示和删除时使用大写

### 测试工具
- ✅ `test-favorite-api.html` - 输入框和请求数据

---

## 🧪 **测试命令（PowerShell）**

### 添加收藏
```powershell
curl -X POST https://你的N8N地址/webhook/user-favorite `
  -H "Content-Type: application/json" `
  -d '{\"action\":\"add\",\"userID\":\"USER001\",\"carID\":\"7684\",\"carName\":\"智己L6\",\"imageURL\":\"https://car3.autoimg.cn/cardfs/product/g31/M01/C4/11/1024x0_1_q95_autohomecar__ChxkPWdBKr2AMQNqAAmXHMHgKVc648.jpg\"}'
```

### 查看列表
```powershell
curl -X POST https://你的N8N地址/webhook/user-favorite `
  -H "Content-Type: application/json" `
  -d '{\"action\":\"list\",\"userID\":\"USER001\"}'
```

### 取消收藏
```powershell
curl -X POST https://你的N8N地址/webhook/user-favorite `
  -H "Content-Type: application/json" `
  -d '{\"action\":\"delete\",\"userID\":\"USER001\",\"favoriteID\":\"fav_20241030_abc123\"}'
```

---

## ❌ **错误示例（不要使用）**

### 小写（旧版本，已废弃）
```javascript
// ❌ 不要使用
{
  userId: 'USER001',   // 应该是 userID
  carId: '7684',       // 应该是 carID
  imageUrl: 'https://' // 应该是 imageURL
}
```

### 不一致（错误）
```javascript
// ❌ 不要混用
{
  userID: 'USER001',   // ✅ 大写
  carId: '7684',       // ❌ 小写
  imageURL: 'https://' // ✅ 大写
}
```

---

## 🎯 **记忆规则**

> **所有的 ID 和 URL 都用大写！**

```
ID  → ID  (大写)
URL → URL (大写)
```

**示例：**
- favoriteID ✅
- userID ✅
- carID ✅
- imageURL ✅

**错误：**
- favoriteId ❌
- userId ❌
- carId ❌
- imageUrl ❌

---

## ✅ **检查清单**

使用这个清单确保所有地方都使用了正确的变量名：

- [ ] Google Sheets 表头使用大写 ID 和 URL
- [ ] N8N 工作流代码使用大写
- [ ] 前端 TypeScript 接口使用大写
- [ ] 前端 API 调用使用大写
- [ ] 测试工具使用大写
- [ ] 文档示例使用大写

---

## 🎉 **完成！**

现在整个系统的变量命名完全统一了！

**记住：ID 和 URL 永远是大写！** 🚀

