# 🔧 N8N 工作流配置指南

## 📊 第一步：创建 Google Sheets

### 1.1 创建新表格
1. 访问 [Google Sheets](https://sheets.google.com)
2. 创建新表格，命名为 `CarFavoritesSystem`

### 1.2 创建 Sheet 1: UserFavoriteFolders

**列配置：**
| 列 | 名称 | 类型 | 说明 |
|---|---|---|---|
| A | folderID | 数字 | 收藏夹ID，从1开始 |
| B | inviteCode | 文本 | 用户邀请码 |
| C | folderName | 文本 | 收藏夹名称 |
| D | description | 文本 | 描述 |
| E | createdAt | 日期时间 | 创建时间 |
| F | updatedAt | 日期时间 | 更新时间 |
| G | itemCount | 数字 | 项目数量 |

**测试数据（复制粘贴）：**
```
folderID	inviteCode	folderName	description	createdAt	updatedAt	itemCount
1	DEMO2024	🎨 外观收藏	外观图片收藏	2024-10-30 10:00:00	2024-10-30 10:00:00	0
2	DEMO2024	🏠 内饰收藏	内饰图片收藏	2024-10-30 10:00:00	2024-10-30 10:00:00	0
3	DEMO2024	⚙️ 细节收藏	细节图片收藏	2024-10-30 10:00:00	2024-10-30 10:00:00	0
4	DEMO2024	🚗 综合对比	综合对比收藏	2024-10-30 10:00:00	2024-10-30 10:00:00	0
```

### 1.3 创建 Sheet 2: UserFavoriteItems

**列配置：**
| 列 | 名称 | 类型 | 说明 |
|---|---|---|---|
| A | itemID | 数字 | 项目ID，从1开始 |
| B | folderID | 数字 | 所属收藏夹ID |
| C | inviteCode | 文本 | 用户邀请码 |
| D | carID | 数字 | 车辆ID |
| E | carName | 文本 | 车型名称 |
| F | imageURL | 文本 | 图片URL |
| G | category | 文本 | 分类 |
| H | viewType | 文本 | 视角 |
| I | addedAt | 日期时间 | 添加时间 |

**表头（复制粘贴第一行）：**
```
itemID	folderID	inviteCode	carID	carName	imageURL	category	viewType	addedAt
```

### 1.4 获取 Sheet ID
1. 打开你的 Google Sheets
2. 查看 URL：`https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
3. 复制 `YOUR_SHEET_ID` 这部分

### 1.5 设置权限
1. 点击右上角「共享」
2. 设置为「任何拥有链接的人都可以查看」（或者只给 N8N 服务账号权限）

---

## 🔧 第二步：配置 N8N 工作流

### 2.1 工作流 1：添加到收藏 ⭐

**节点流程：**
```
Webhook → Google Sheets (Read) → Code (Check Duplicate) → Google Sheets (Append) → Respond
```

**配置步骤：**

#### 节点 1: Webhook
- HTTP Method: `POST`
- Path: `add-to-favorite`
- Respond: `Using 'Respond to Webhook' Node`

#### 节点 2: Google Sheets (Read)
- Operation: `Read Rows`
- Document: 选择你的 `CarFavoritesSystem`
- Sheet: `UserFavoriteItems`
- Read All Rows

#### 节点 3: Code
- 复制以下代码：

```javascript
const input = $('Webhook').item.json.body;
const allItems = $input.all();

// 检查是否已收藏
const exists = allItems.some(item => 
  item.json.inviteCode === input.inviteCode &&
  Number(item.json.folderID) === Number(input.folderID) &&
  Number(item.json.carID) === Number(input.carID) &&
  item.json.imageURL === input.imageURL
);

if (exists) {
  return [{
    json: {
      success: false,
      message: "已经收藏过这张图片了"
    }
  }];
}

// 生成新ID
const maxID = Math.max(...allItems.map(i => Number(i.json.itemID) || 0), 0);
const newID = maxID + 1;

return [{
  json: {
    itemID: newID,
    folderID: input.folderID,
    inviteCode: input.inviteCode,
    carID: input.carID,
    carName: input.carName,
    imageURL: input.imageURL,
    category: input.category,
    viewType: input.viewType,
    addedAt: new Date().toISOString()
  }
}];
```

#### 节点 4: Google Sheets (Append)
- Operation: `Append or Update Row`
- Document: `CarFavoritesSystem`
- Sheet: `UserFavoriteItems`
- Mapping:
  - itemID: `{{ $json.itemID }}`
  - folderID: `{{ $json.folderID }}`
  - inviteCode: `{{ $json.inviteCode }}`
  - carID: `{{ $json.carID }}`
  - carName: `{{ $json.carName }}`
  - imageURL: `{{ $json.imageURL }}`
  - category: `{{ $json.category }}`
  - viewType: `{{ $json.viewType }}`
  - addedAt: `{{ $json.addedAt }}`

#### 节点 5: Respond to Webhook
- Response Body: 
```json
{
  "success": true,
  "message": "收藏成功"
}
```

**保存并激活工作流！**

复制 Webhook URL（类似 `https://your-n8n.app.n8n.cloud/webhook/add-to-favorite`）

---

### 2.2 工作流 2：获取收藏夹列表 📋

**节点流程：**
```
Webhook → Google Sheets (Read) → Code (Filter) → Respond
```

#### Code 节点代码：
```javascript
const inviteCode = $('Webhook').item.json.body.inviteCode;
const allFolders = $input.all();

const userFolders = allFolders
  .filter(item => item.json.inviteCode === inviteCode)
  .map(item => ({
    folderID: item.json.folderID,
    folderName: item.json.folderName,
    description: item.json.description,
    itemCount: item.json.itemCount || 0
  }));

return [{
  json: {
    success: true,
    folders: userFolders
  }
}];
```

---

### 2.3 工作流 3：获取收藏夹详情 📄

**节点流程：**
```
Webhook → Google Sheets (Read UserFavoriteItems) → Code (Filter) → Respond
```

#### Code 节点代码：
```javascript
const { inviteCode, folderID } = $('Webhook').item.json.body;
const allItems = $input.all();

const items = allItems
  .filter(item => 
    item.json.inviteCode === inviteCode && 
    Number(item.json.folderID) === Number(folderID)
  )
  .map(item => ({
    itemID: item.json.itemID,
    carID: item.json.carID,
    carName: item.json.carName,
    imageURL: item.json.imageURL,
    category: item.json.category,
    viewType: item.json.viewType,
    addedAt: item.json.addedAt
  }));

return [{
  json: {
    success: true,
    count: items.length,
    items: items
  }
}];
```

---

### 2.4 工作流 4：创建收藏夹 ➕

**节点流程：**
```
Webhook → Google Sheets (Read Folders) → Code (Generate ID) → Google Sheets (Append) → Respond
```

#### Code 节点代码：
```javascript
const input = $('Webhook').item.json.body;
const allFolders = $input.all();

const maxID = Math.max(...allFolders.map(i => Number(i.json.folderID) || 0), 0);
const newID = maxID + 1;

return [{
  json: {
    folderID: newID,
    inviteCode: input.inviteCode,
    folderName: input.folderName,
    description: input.description || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    itemCount: 0
  }
}];
```

---

## 🎯 第三步：更新前端配置

编辑 `src/config/api.ts`，替换为你的 N8N Webhook URL：

```typescript
export const API_ENDPOINTS = {
  GET_FAVORITE_FOLDERS: 'https://YOUR-N8N-URL/webhook/get-favorite-folders',
  GET_FAVORITE_DETAIL: 'https://YOUR-N8N-URL/webhook/get-favorite-detail',
  ADD_TO_FAVORITE: 'https://YOUR-N8N-URL/webhook/add-to-favorite',
  CREATE_FAVORITE_FOLDER: 'https://YOUR-N8N-URL/webhook/create-favorite-folder',
};
```

---

## 🧪 第四步：测试

### 测试添加收藏
```bash
curl -X POST https://YOUR-N8N-URL/webhook/add-to-favorite \
  -H "Content-Type: application/json" \
  -d '{
    "inviteCode": "DEMO2024",
    "folderID": 1,
    "carID": 1,
    "carName": "🚗 智己L6",
    "imageURL": "https://example.com/car-1.jpg",
    "category": "外观",
    "viewType": "正45°"
  }'
```

### 测试获取列表
```bash
curl -X POST https://YOUR-N8N-URL/webhook/get-favorite-folders \
  -H "Content-Type: application/json" \
  -d '{"inviteCode": "DEMO2024"}'
```

---

## ✅ 完成！

现在打开 `http://localhost:3000`，点击 ❤️ 按钮测试收藏功能！

数据会实时保存到 Google Sheets 📊

