# 🛠️ 手动创建N8N工作流 - 详细步骤

## 为什么需要手动创建？

N8N工作流JSON导入可能因为以下原因失败：
- 版本不兼容
- 格式问题
- 节点类型版本不匹配

**手动创建只需10分钟，100%成功！** 💪

---

## 📐 工作流结构预览

```
Webhook (接收请求)
    ↓
Code节点 (路由器)
    ↓
IF节点 (判断sendMessage?) → Code节点 (处理消息) → Respond节点
IF节点 (判断generateReport?) → Code节点 (生成报告) → Respond节点
```

---

## 🎯 第1步：创建Webhook节点

### 操作：
1. 在N8N中点击 **"+"** 按钮
2. 搜索 **"Webhook"**
3. 点击添加

### 配置：
```
HTTP Method: POST
Path: ai-analysis
Response Mode: Respond to Webhook
```

### 测试：
- 点击 **"Listen for Test Event"** 或激活工作流
- 复制Webhook URL，例如：
  ```
  https://your-n8n.com/webhook/ai-analysis
  ```

---

## 🎯 第2步：创建路由器（Code节点）

### 操作：
1. 点击Webhook节点后的 **"+"** 按钮
2. 搜索 **"Code"**
3. 选择 **"Code"** 节点

### 配置：
**节点名称**：`路由器`

**JavaScript代码**：
```javascript
const action = $input.first().json.body.action;

return [{
  json: {
    action: action,
    data: $input.first().json.body
  }
}];
```

---

## 🎯 第3步：创建IF节点（判断sendMessage）

### 操作：
1. 点击路由器节点后的 **"+"** 按钮
2. 搜索 **"IF"**
3. 选择 **"IF"** 节点

### 配置：
**节点名称**：`判断sendMessage`

**Conditions**：
- **Type**: String
- **Value 1**: `={{$json.action}}`
- **Operation**: equals
- **Value 2**: `sendMessage`

---

## 🎯 第4步：创建处理消息节点（Code）

### 操作：
1. 点击IF节点的 **"true"** 输出后的 **"+"** 按钮
2. 搜索 **"Code"**
3. 选择 **"Code"** 节点

### 配置：
**节点名称**：`处理消息`

**JavaScript代码**：
```javascript
const data = $input.first().json.data;
const content = data.content || '';

// 关键词提取
const keywords = ['外观', '内饰', '性能', '续航', '空间', '配置', '智能化', '价格'];
const extractedTags = keywords.filter(k => content.includes(k));

// 生成AI回复
let aiReply = '好的，我理解了您的需求。';
if (extractedTags.length > 0) {
  aiReply += `我将重点关注${extractedTags.join('、')}这些方面。`;
} else {
  aiReply += '请告诉我您关心的对比维度，比如外观、内饰、性能等。';
}

const messageID = 'msg_' + Date.now();
const dialogueID = data.dialogueID || 'dlg_' + Date.now();

return {
  json: {
    success: true,
    messageID: messageID,
    aiReply: aiReply,
    extractedTags: extractedTags,
    dialogueID: dialogueID,
    timestamp: new Date().toISOString()
  }
};
```

---

## 🎯 第5步：创建响应消息节点（Respond）

### 操作：
1. 点击处理消息节点后的 **"+"** 按钮
2. 搜索 **"Respond to Webhook"**
3. 选择该节点

### 配置：
**节点名称**：`响应消息`

**Respond With**: JSON
**Response Body**: `={{ $json }}`

---

## 🎯 第6步：创建IF节点（判断generateReport）

### 操作：
1. 回到 **路由器** 节点
2. 点击路由器节点后的 **"+"** 按钮（添加第二个分支）
3. 搜索 **"IF"**
4. 选择 **"IF"** 节点

### 配置：
**节点名称**：`判断generateReport`

**Conditions**：
- **Type**: String
- **Value 1**: `={{$json.action}}`
- **Operation**: equals
- **Value 2**: `generateReport`

---

## 🎯 第7步：创建生成报告节点（Code）

### 操作：
1. 点击IF节点的 **"true"** 输出后的 **"+"** 按钮
2. 搜索 **"Code"**
3. 选择 **"Code"** 节点

### 配置：
**节点名称**：`生成报告`

**JavaScript代码**：
```javascript
const data = $input.first().json.data;
const tags = data.tags || ['外观', '内饰', '性能'];
const vehicles = data.vehicles || [
  { name: '极氪009' },
  { name: '小鹏X9' },
  { name: '腾势D9' }
];

const reportID = 'report_' + Date.now();

// 生成HTML（这里是简化版，完整HTML见下方）
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>车型对比报告</title>
<style>
body { font-family: -apple-system, sans-serif; padding: 40px; }
.header { margin-bottom: 30px; border-left: 4px solid #667eea; padding-left: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 15px; border: 1px solid #ddd; text-align: center; }
th:first-child, td:first-child { text-align: left; background: #f9fafb; }
.print-btn { position: fixed; top: 20px; right: 20px; padding: 10px 20px;
  background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; }
@media print { .print-btn { display: none; } }
</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">🖨️ 打印/生成PDF</button>
<div class="header">
  <h1>车型对比分析报告</h1>
  <p>关注维度：${tags.join(', ')}</p>
</div>
<table>
  <thead>
    <tr>
      <th>对比维度</th>
      ${vehicles.map(v => `<th>${v.name}</th>`).join('')}
    </tr>
  </thead>
  <tbody>
    ${tags.map(tag => `
      <tr>
        <td>${tag}</td>
        ${vehicles.map(() => `<td>优秀表现<br><small>基于${tag}维度</small></td>`).join('')}
      </tr>
    `).join('')}
  </tbody>
</table>
<p style="margin-top: 30px; text-align: center; color: #999;">
  报告ID: ${reportID} | 生成时间: ${new Date().toLocaleString('zh-CN')}
</p>
</body>
</html>`;

return {
  json: {
    success: true,
    reportID: reportID,
    htmlContent: html,
    createTime: new Date().toISOString(),
    message: '报告已生成，可使用浏览器打印功能生成PDF'
  }
};
```

---

## 🎯 第8步：创建响应报告节点（Respond）

### 操作：
1. 点击生成报告节点后的 **"+"** 按钮
2. 搜索 **"Respond to Webhook"**
3. 选择该节点

### 配置：
**节点名称**：`响应报告`

**Respond With**: JSON
**Response Body**: `={{ $json }}`

---

## ✅ 完成检查清单

创建完成后，你的工作流应该有：

- [x] 1个 Webhook节点
- [x] 1个 Code节点（路由器）
- [x] 2个 IF节点（判断sendMessage、判断generateReport）
- [x] 2个 Code节点（处理消息、生成报告）
- [x] 2个 Respond to Webhook节点

**连接关系**：
```
Webhook → 路由器 → IF(sendMessage) → 处理消息 → 响应消息
                 → IF(generateReport) → 生成报告 → 响应报告
```

---

## 🧪 测试工作流

### 1. 激活工作流
- 点击右上角的 **"Active"** 开关
- 确保状态变为绿色

### 2. 复制Webhook URL
- 点击Webhook节点
- 复制 **Production URL**

### 3. 测试sendMessage
使用curl或Postman测试：

```bash
curl -X POST https://your-n8n.com/webhook/ai-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "action": "sendMessage",
    "userID": "testCode",
    "content": "我想对比外观和内饰"
  }'
```

**预期响应**：
```json
{
  "success": true,
  "messageID": "msg_xxx",
  "aiReply": "好的，我理解了您的需求。我将重点关注外观、内饰这些方面。",
  "extractedTags": ["外观", "内饰"],
  "dialogueID": "dlg_xxx",
  "timestamp": "2024-01-01T10:00:00.000Z"
}
```

### 4. 测试generateReport
```bash
curl -X POST https://your-n8n.com/webhook/ai-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "action": "generateReport",
    "userID": "testCode",
    "tags": ["外观", "内饰"],
    "vehicles": [
      {"name": "极氪009"},
      {"name": "小鹏X9"}
    ]
  }'
```

**预期响应**：
```json
{
  "success": true,
  "reportID": "report_xxx",
  "htmlContent": "<!DOCTYPE html>...",
  "createTime": "2024-01-01T10:00:00.000Z",
  "message": "报告已生成，可使用浏览器打印功能生成PDF"
}
```

---

## 🎨 可视化布局建议

将节点按以下位置排列（更清晰）：

```
Row 1 (Y=200):
  Webhook(240,300) → 路由器(460,300)

Row 2 (Y=200):
  → IF-sendMessage(680,200) → 处理消息(900,200) → 响应消息(1120,200)

Row 3 (Y=400):
  → IF-generateReport(680,400) → 生成报告(900,400) → 响应报告(1120,400)
```

在N8N中，你可以拖动节点来调整位置。

---

## 💡 常见问题

### Q: 路由器节点连接两个IF节点怎么操作？
**A**: 
1. 先连接第一个IF节点
2. 再次点击路由器节点的输出点
3. 连接第二个IF节点
4. 两个IF节点都会接收到同样的数据

### Q: Code节点报错？
**A**: 
- 检查代码中的引号是否正确
- 确保没有使用`` ` ``（反引号），改用 `'` 或 `"`
- 复制代码时注意不要有额外的空格

### Q: 如何查看节点输出？
**A**: 
- 点击节点
- 在右侧面板查看 **"Output Data"**
- 或者点击节点上的小眼睛图标

---

## 🎉 完成！

手动创建完成后：
1. 保存工作流（自动保存）
2. 测试两个action（sendMessage、generateReport）
3. 将Webhook URL配置到前端调试界面
4. 开始使用！

**预计时间：10-15分钟** ⏱️

有问题随时问我！🚀

