# 📊 Google Sheets 表结构完整说明

## 🗄️ 需要创建的表

需要在同一个Google Sheets文档中创建 **2个Sheet**：
1. **AIDialogues** - 存储对话记录
2. **AIReports** - 存储生成的报告

---

## 📋 表1: AIDialogues（对话记录表）

### **表名**：`AIDialogues`

### **用途**：存储每个用户的对话历史，用于左侧历史列表显示

### **字段结构**：

| 列名 | 数据类型 | 说明 | 示例值 | 是否必填 |
|------|---------|------|--------|---------|
| **dialogueID** | String | 对话唯一ID | `dlg_1704096000000` | ✅ 必填 |
| **userID** | String | 用户ID | `user_001` | ✅ 必填 |
| **title** | String | 对话标题（取首句前30字） | `我想对比极氪009和小鹏X9...` | ✅ 必填 |
| **lastMessage** | Text | 最后一条消息内容 | `好的，我将重点关注外观、内饰这些方面。` | ✅ 必填 |
| **tags** | JSON String | 提取的标签数组 | `["外观","内饰","性能"]` | ✅ 必填 |
| **timestamp** | DateTime | 最后更新时间 | `2024-01-01T10:00:00.000Z` | ✅ 必填 |

### **创建步骤**：

1. 在Google Sheets中创建新的Sheet
2. 重命名为 `AIDialogues`
3. 在第一行添加表头（复制以下内容）：

```
dialogueID	userID	title	lastMessage	tags	timestamp
```

### **示例数据**：

| dialogueID | userID | title | lastMessage | tags | timestamp |
|------------|--------|-------|-------------|------|-----------|
| dlg_1704096000000 | user_001 | 我想对比外观和内饰 | 好的，我将重点关注外观、内饰这些方面。当您准备好后，说"生成报告"... | ["外观","内饰"] | 2024-01-01T10:00:00.000Z |
| dlg_1704096100000 | user_001 | 续航和性能哪个更重要 | 这取决于您的使用场景。如果经常长途... | ["续航","性能"] | 2024-01-01T11:30:00.000Z |
| dlg_1704096200000 | user_002 | 智能化配置对比 | 我将重点关注智能化、配置这些方面... | ["智能化","配置"] | 2024-01-01T14:20:00.000Z |

### **数据格式说明**：

#### tags字段格式：
```json
["外观","内饰","性能"]
```
- 使用JSON数组格式
- 存储为字符串
- N8N使用 `JSON.stringify()` 存入，`JSON.parse()`读取

#### timestamp字段格式：
```
2024-01-01T10:00:00.000Z
```
- ISO 8601标准格式
- 包含时区信息（Z表示UTC）
- JavaScript: `new Date().toISOString()`

---

## 📋 表2: AIReports（报告记录表）

### **表名**：`AIReports`

### **用途**：存储用户生成的对比报告HTML内容

### **字段结构**：

| 列名 | 数据类型 | 说明 | 示例值 | 是否必填 |
|------|---------|------|--------|---------|
| **reportID** | String | 报告唯一ID | `report_1704096000000` | ✅ 必填 |
| **userID** | String | 用户ID | `user_001` | ✅ 必填 |
| **dialogueID** | String | 关联的对话ID | `dlg_1704096000000` | ✅ 必填 |
| **tags** | JSON String | 对比维度标签 | `["外观","内饰"]` | ✅ 必填 |
| **vehicles** | JSON String | 车型列表 | `[{"name":"极氪009"},{"name":"小鹏X9"}]` | ✅ 必填 |
| **htmlContent** | Long Text | 完整HTML源码 | `<!DOCTYPE html><html>...</html>` | ✅ 必填 |
| **createTime** | DateTime | 创建时间 | `2024-01-01T10:00:00.000Z` | ✅ 必填 |

### **创建步骤**：

1. 在同一个Google Sheets文档中创建新的Sheet
2. 重命名为 `AIReports`
3. 在第一行添加表头（复制以下内容）：

```
reportID	userID	dialogueID	tags	vehicles	htmlContent	createTime
```

### **示例数据**：

| reportID | userID | dialogueID | tags | vehicles | htmlContent | createTime |
|----------|--------|------------|------|----------|-------------|------------|
| report_1704096000000 | user_001 | dlg_1704096000000 | ["外观","内饰"] | [{"name":"极氪009"},{"name":"小鹏X9"}] | <!DOCTYPE html>... | 2024-01-01T10:05:00.000Z |

### **数据格式说明**：

#### tags字段格式：
```json
["外观","内饰","性能"]
```

#### vehicles字段格式：
```json
[
  {"name": "极氪009"},
  {"name": "小鹏X9"},
  {"name": "腾势D9"}
]
```

#### htmlContent字段格式：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
...完整的HTML内容...
</body>
</html>
```
- 完整的HTML文档
- 包含所有样式和脚本
- 可以直接在浏览器中打开
- 大小约10-30KB

---

## 🔧 Google Sheets 配置步骤

### **1. 创建Google Sheets文档**

1. 访问 https://sheets.google.com
2. 点击 **"新建"** → **"空白"**
3. 重命名文档为：`AI车型分析数据库`

### **2. 创建第一个Sheet（AIDialogues）**

1. 重命名Sheet1为 `AIDialogues`
2. 在A1-F1单元格输入表头：
   ```
   dialogueID | userID | title | lastMessage | tags | timestamp
   ```
3. 选中第一行，设置为**粗体**，添加**背景色**（淡灰色）

### **3. 创建第二个Sheet（AIReports）**

1. 点击底部 **"+"** 添加新Sheet
2. 重命名为 `AIReports`
3. 在A1-G1单元格输入表头：
   ```
   reportID | userID | dialogueID | tags | vehicles | htmlContent | createTime
   ```
4. 选中第一行，设置为**粗体**，添加**背景色**（淡灰色）

### **4. 获取Google Sheets ID**

查看浏览器地址栏：
```
https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit
```

复制中间的ID（例如：`1a2b3c4d5e6f7g8h9i0j`）

### **5. 在N8N中配置**

#### 添加Google Sheets凭据：
1. N8N → Settings → Credentials
2. 点击 **"New"** → 搜索 **"Google Sheets"**
3. 选择 **"OAuth2"**
4. 按照提示完成Google账号授权

#### 配置工作流节点：
在以下节点中填入你的Sheet ID：
- **保存对话到Sheets** 节点
- **保存报告到Sheets** 节点
- **读取对话列表** 节点

将 `YOUR_GOOGLE_SHEET_ID` 替换为实际ID：
```javascript
documentId: "1a2b3c4d5e6f7g8h9i0j"
```

---

## 📐 字段宽度建议

### AIDialogues表：
| 列 | 宽度 |
|----|------|
| dialogueID | 150px |
| userID | 100px |
| title | 300px |
| lastMessage | 400px |
| tags | 150px |
| timestamp | 180px |

### AIReports表：
| 列 | 宽度 |
|----|------|
| reportID | 150px |
| userID | 100px |
| dialogueID | 150px |
| tags | 150px |
| vehicles | 200px |
| htmlContent | 600px（设为自动换行）|
| createTime | 180px |

---

## 🔍 数据查询示例

### **查询某用户的所有对话**
```
Filter: userID = "user_001"
Sort: timestamp DESC
```

### **查询某对话的所有报告**
```
Filter: dialogueID = "dlg_1704096000000"
Sort: createTime DESC
```

### **查询最近的对话**
```
Sort: timestamp DESC
Limit: 50
```

---

## 💡 注意事项

### **1. Google Sheets单元格限制**
- 单个单元格最多：**50,000 字符**
- htmlContent字段通常：**10-30KB**
- 如果HTML超过限制，需要压缩或分段存储

### **2. 数据类型建议**

#### timestamp字段：
- 格式：ISO 8601（`2024-01-01T10:00:00.000Z`）
- 时区：统一使用UTC
- 排序：按时间倒序（最新在前）

#### JSON字段：
- tags: 数组格式 `["tag1","tag2"]`
- vehicles: 对象数组格式 `[{"name":"车名"}]`
- 存储时使用 `JSON.stringify()`
- 读取时使用 `JSON.parse()`

### **3. 权限设置**

#### 开发阶段：
- 设置为 **"任何人（知道链接）都可以查看"**
- N8N通过OAuth2访问

#### 生产环境：
- 设置为 **"仅特定用户"**
- 只授权给N8N服务账号

---

## 🧪 测试数据

### **插入测试数据到AIDialogues**

复制以下内容到Sheet中：

| dialogueID | userID | title | lastMessage | tags | timestamp |
|------------|--------|-------|-------------|------|-----------|
| dlg_test_001 | user_001 | 测试对话1 | 这是一条测试消息 | ["外观"] | 2024-01-01T10:00:00.000Z |
| dlg_test_002 | user_001 | 测试对话2 | 这是另一条测试消息 | ["内饰","性能"] | 2024-01-01T11:00:00.000Z |

### **测试N8N读取**

使用curl测试getDialogueList：
```bash
curl -X POST https://your-n8n.com/webhook/ai-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "action": "getDialogueList",
    "userID": "user_001"
  }'
```

预期返回：
```json
{
  "success": true,
  "dialogues": [
    {
      "dialogueID": "dlg_test_002",
      "title": "测试对话2",
      "tags": ["内饰","性能"],
      "timestamp": "2024-01-01T11:00:00.000Z"
    },
    {
      "dialogueID": "dlg_test_001",
      "title": "测试对话1",
      "tags": ["外观"],
      "timestamp": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

---

## ✅ 完成检查清单

创建完成后，确认以下内容：

- [ ] Google Sheets文档已创建
- [ ] Sheet名称正确：`AIDialogues` 和 `AIReports`
- [ ] 表头已添加并格式化
- [ ] Sheet ID已复制
- [ ] N8N中已添加Google Sheets凭据
- [ ] N8N工作流中的Sheet ID已更新
- [ ] 已插入测试数据
- [ ] 测试数据读取成功

---

## 🎉 完成！

现在你的Google Sheets数据库已经配置完成！

**下一步**：
1. 在N8N中导入工作流
2. 配置Google Sheets凭据和ID
3. 测试三个接口（sendMessage/generateReport/getDialogueList）
4. 打开前端界面开始使用

**有问题随时问我！** 🚀

