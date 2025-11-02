# N8N工作流手动创建 - 详细步骤（100%成功）

## 🎯 如果JSON导入失败，跟着这个步骤手动创建

创建时间：约15-20分钟

---

## 📐 工作流结构图

```
Webhook
    ↓
路由器 (Code)
    ├→ IF-SendMessage → 处理消息 (Code) → 保存对话到Sheets → 响应消息
    ├→ IF-GenerateReport → 生成报告 (Code) → 保存报告到Sheets → 响应报告
    └→ IF-GetDialogueList → 读取对话列表 → 过滤用户对话 (Code) → 响应对话列表
```

---

## 步骤1：创建Webhook节点

1. 点击 **"+"** → 搜索 **"Webhook"**
2. 配置：
   - HTTP Method: `POST`
   - Path: `ai-analysis`
   - Response Mode: `Respond to Webhook`

---

## 步骤2：创建路由器节点

1. 点击Webhook后的 **"+"** → 搜索 **"Code"**
2. 节点名称改为：`路由器`
3. 粘贴代码：
```javascript
const action = $input.first().json.body.action;
return [{json: {action: action, data: $input.first().json.body}}];
```

---

## 步骤3：创建IF-SendMessage节点

1. 点击路由器后的 **"+"** → 搜索 **"IF"**
2. 节点名称改为：`IF-SendMessage`
3. 配置条件：
   - **Value 1**: `={{ $json.action }}`
   - **Operation**: `equals`
   - **Value 2**: `sendMessage`

---

## 步骤4：创建处理消息节点

1. 点击IF-SendMessage的 **true** 分支后的 **"+"** → 搜索 **"Code"**
2. 节点名称改为：`处理消息`
3. 粘贴代码：
```javascript
const data = $input.first().json.data;
const content = data.content || '';
const keywords = ['外观', '内饰', '性能', '续航', '空间', '配置', '智能化', '价格'];
const extractedTags = keywords.filter(k => content.includes(k));

let aiReply = '好的，我理解了您的需求。';
if (extractedTags.length > 0) {
  aiReply += `我将重点关注${extractedTags.join('、')}这些方面。当您准备好后，说"生成报告"，我会为您生成专业的对比矩阵。`;
} else {
  aiReply += '请告诉我您关心的对比维度，比如外观、内饰、性能等。';
}

const messageID = 'msg_' + Date.now();
const dialogueID = data.dialogueID || 'dlg_' + Date.now();
const timestamp = new Date().toISOString();

return {
  json: {
    success: true,
    messageID: messageID,
    aiReply: aiReply,
    extractedTags: extractedTags,
    dialogueID: dialogueID,
    timestamp: timestamp,
    userID: data.userID,
    userContent: content
  }
};
```

---

## 步骤5：创建保存对话到Sheets节点

1. 点击处理消息后的 **"+"** → 搜索 **"Google Sheets"**
2. 节点名称改为：`保存对话到Sheets`
3. 配置：
   - **Credential**: 选择你的Google Sheets OAuth2凭据
   - **Operation**: `Append or Update Row`
   - **Document**: 选择你的Sheet文档
   - **Sheet**: 选择 `AIDialogues`
   - **Column to Match On**: `dialogueID`
   - **Value to Match On**: `={{ $json.dialogueID }}`
   - **Columns to Send**:
     - `dialogueID`: `={{ $json.dialogueID }}`
     - `userID`: `={{ $json.userID }}`
     - `title`: `={{ $json.userContent.substring(0, 30) }}`
     - `lastMessage`: `={{ $json.aiReply }}`
     - `tags`: `={{ JSON.stringify($json.extractedTags) }}`
     - `timestamp`: `={{ $json.timestamp }}`

---

## 步骤6：创建响应消息节点

1. 点击保存对话后的 **"+"** → 搜索 **"Respond to Webhook"**
2. 节点名称改为：`响应消息`
3. 配置：
   - **Respond With**: `JSON`
   - **Response Body**: `={{ $json }}`

✅ **第一条分支完成！**

---

## 步骤7：创建IF-GenerateReport节点

1. 回到 **路由器** 节点
2. 点击路由器后的 **"+"** （添加第二个分支）→ 搜索 **"IF"**
3. 节点名称改为：`IF-GenerateReport`
4. 配置条件：
   - **Value 1**: `={{ $json.action }}`
   - **Operation**: `equals`
   - **Value 2**: `generateReport`

---

## 步骤8：创建生成报告节点

1. 点击IF-GenerateReport的 **true** 分支后的 **"+"** → 搜索 **"Code"**
2. 节点名称改为：`生成报告`
3. 粘贴代码（较长，完整复制）：
```javascript
const data = $input.first().json.data;
const tags = data.tags || ['外观', '内饰', '性能'];
const vehicles = data.vehicles || [{name: '极氪009'}, {name: '小鹏X9'}, {name: '腾势D9'}];
const reportID = 'report_' + Date.now();
const timestamp = new Date().toISOString();

// 生成HTML（压缩版）
const html = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>车型对比报告</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,sans-serif;background:#fafafa;padding:60px 40px;color:#333}.container{max-width:1200px;margin:0 auto}.header{margin-bottom:40px;border-left:4px solid #667eea;padding-left:20px}.header h1{font-size:28px;font-weight:600;margin-bottom:8px}.header p{font-size:14px;color:#999}.tags{display:flex;gap:8px;margin-top:16px;flex-wrap:wrap}.tag{background:#e0e7ff;color:#4f46e5;padding:6px 14px;border-radius:16px;font-size:13px}.table-wrapper{background:white;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08)}table{width:100%;border-collapse:collapse}thead tr{background:#f8f9fc;border-bottom:1px solid #e5e7eb}th{padding:20px;text-align:center;font-weight:600;font-size:14px}th:first-child{text-align:left;width:20%}td{padding:20px;text-align:center;border-bottom:1px solid #f0f0f0;font-size:14px;line-height:1.6}td:first-child{text-align:left;font-weight:500;background:#f9fafb}.footer{margin-top:40px;padding-top:20px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#999}.print-btn{position:fixed;top:20px;right:20px;padding:12px 24px;background:#667eea;color:white;border:none;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(102,126,234,.3)}.print-btn:hover{background:#5568d3}@media print{.print-btn{display:none}body{background:white;padding:20px}tr{page-break-inside:avoid}}@page{size:A4;margin:15mm}</style></head><body><button class="print-btn" onclick="window.print()">🖨️ 打印/生成PDF</button><div class="container"><div class="header"><h1>车型对比分析报告</h1><p>Vehicle Comparison Report</p><div class="tags">' + tags.map(t => '<span class="tag">' + t + '</span>').join('') + '</div></div><div class="table-wrapper"><table><thead><tr><th>对比维度</th>' + vehicles.map(v => '<th>' + v.name + '</th>').join('') + '</tr></thead><tbody>' + tags.map(tag => '<tr><td>' + tag + '</td>' + vehicles.map(() => '<td>优秀表现<br><small style="color:#999">基于' + tag + '维度分析</small></td>').join('') + '</tr>').join('') + '</tbody></table></div><div class="footer"><p>报告生成时间：' + new Date().toLocaleString('zh-CN') + '</p><p>报告ID：' + reportID + '</p><p style="margin-top:8px;color:#667eea">💡 点击右上角按钮或按Ctrl+P，选择"另存为PDF"即可保存</p></div></div><script>document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="p"){e.preventDefault();window.print()}})</script></body></html>';

return {
  json: {
    success: true,
    reportID: reportID,
    htmlContent: html,
    createTime: timestamp,
    userID: data.userID,
    dialogueID: data.dialogueID,
    tags: JSON.stringify(tags),
    vehicles: JSON.stringify(vehicles)
  }
};
```

---

## 步骤9：创建保存报告到Sheets节点

1. 点击生成报告后的 **"+"** → 搜索 **"Google Sheets"**
2. 节点名称改为：`保存报告到Sheets`
3. 配置：
   - **Credential**: 选择你的Google Sheets OAuth2凭据
   - **Operation**: `Append`
   - **Document**: 选择你的Sheet文档
   - **Sheet**: 选择 `AIReports`
   - **Columns to Send**:
     - `reportID`: `={{ $json.reportID }}`
     - `userID`: `={{ $json.userID }}`
     - `dialogueID`: `={{ $json.dialogueID }}`
     - `tags`: `={{ $json.tags }}`
     - `vehicles`: `={{ $json.vehicles }}`
     - `htmlContent`: `={{ $json.htmlContent }}`
     - `createTime`: `={{ $json.createTime }}`

---

## 步骤10：创建响应报告节点

1. 点击保存报告后的 **"+"** → 搜索 **"Respond to Webhook"**
2. 节点名称改为：`响应报告`
3. 配置：
   - **Respond With**: `JSON`
   - **Response Body**: `={{ $json }}`

✅ **第二条分支完成！**

---

## 步骤11：创建IF-GetDialogueList节点

1. 回到 **路由器** 节点
2. 点击路由器后的 **"+"** （添加第三个分支）→ 搜索 **"IF"**
3. 节点名称改为：`IF-GetDialogueList`
4. 配置条件：
   - **Value 1**: `={{ $json.action }}`
   - **Operation**: `equals`
   - **Value 2**: `getDialogueList`

---

## 步骤12：创建读取对话列表节点

1. 点击IF-GetDialogueList的 **true** 分支后的 **"+"** → 搜索 **"Google Sheets"**
2. 节点名称改为：`读取对话列表`
3. 配置：
   - **Credential**: 选择你的Google Sheets OAuth2凭据
   - **Operation**: `Read Rows`
   - **Document**: 选择你的Sheet文档
   - **Sheet**: 选择 `AIDialogues`

---

## 步骤13：创建过滤用户对话节点

1. 点击读取对话列表后的 **"+"** → 搜索 **"Code"**
2. 节点名称改为：`过滤用户对话`
3. 粘贴代码：
```javascript
const requestData = $('路由器').first().json.data;
const userID = requestData.userID;
const allDialogues = $input.all();

const userDialogues = allDialogues
  .filter(item => item.json.userID === userID)
  .sort((a, b) => new Date(b.json.timestamp) - new Date(a.json.timestamp))
  .slice(0, 50)
  .map(item => ({
    dialogueID: item.json.dialogueID,
    title: item.json.title || item.json.lastMessage?.substring(0, 30) + '...',
    tags: JSON.parse(item.json.tags || '[]'),
    timestamp: item.json.timestamp
  }));

return {json: {success: true, dialogues: userDialogues}};
```

---

## 步骤14：创建响应对话列表节点

1. 点击过滤用户对话后的 **"+"** → 搜索 **"Respond to Webhook"**
2. 节点名称改为：`响应对话列表`
3. 配置：
   - **Respond With**: `JSON`
   - **Response Body**: `={{ $json }}`

✅ **第三条分支完成！**

---

## ✅ 完成检查

创建完成后，你的工作流应该有：

- [x] 1个 Webhook节点
- [x] 1个 路由器（Code）节点
- [x] 3个 IF节点
- [x] 3个 Code节点（处理消息、生成报告、过滤用户对话）
- [x] 3个 Google Sheets节点
- [x] 3个 Respond to Webhook节点

**总计：14个节点**

---

## 🚀 激活和测试

1. 点击右上角 **"Active"** 开关
2. 复制Production Webhook URL
3. 在前端界面配置Webhook URL
4. 开始测试！

---

## 💡 提示

- 每创建一个节点后，可以点击 **"Test Node"** 测试
- Code节点可以查看输出数据
- Google Sheets节点需要先配置凭据
- 遇到错误查看右侧的执行日志

**预计创建时间：15-20分钟** ⏱️

**完成后就可以使用了！** 🎉

