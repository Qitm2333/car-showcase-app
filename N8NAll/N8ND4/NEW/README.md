# 🚗 AI对话分析系统 - 完整版

一个基于 N8N + Google Sheets + DeepSeek 的车型分析对话系统。

---

## 📁 文件说明

```
NEW/
├── n8n-workflow.json          # N8N 完整工作流
├── AIDialogues.csv            # Google Sheets 对话表结构
├── AIReports.csv              # Google Sheets 报告表结构
├── ai-chat-demo.html          # 前端演示界面（含调试工具）
└── README.md                  # 本文档
```

---

## 🎯 功能特性

### ✅ 已实现功能

1. **智能对话** - 基于 DeepSeek API 的 AI 对话（MVP 阶段使用模拟）
2. **历史记录** - 对话列表 + 对话详情
3. **报告生成** - 根据对话内容生成车型对比报告
4. **调试工具** - 实时查看请求/响应日志

### 🎨 核心逻辑

#### 模块1：对话处理（sendMessage）
```
用户输入 → 判断新/已有对话 → 调用 AI → 更新历史 → 返回
```

#### 模块2：报告生成（generateReport）
```
触发生成 → 读取对话历史 → 读取收藏图片 → 生成 HTML → 返回
```

#### 模块3：历史记录
- `getDialogueList` - 获取对话列表
- `getDialogueDetail` - 获取对话详情

---

## 🚀 快速开始

### 步骤1：创建 Google Sheets

1. 创建新的 Google Sheets 文档
2. 创建两个工作表：

**工作表1：AIDialogues**
```
dialogueID | userID | title | tags | createTime | conversationHistory | status
```

**工作表2：AIReports**
```
reportID | dialogueID | userID | htmlContent | createTime
```

3. 导入示例数据（可选）：
   - 使用 `AIDialogues.csv` 导入到第一个工作表
   - 使用 `AIReports.csv` 导入到第二个工作表

---

### 步骤2：配置 N8N 工作流

1. **导入工作流**：
   - 打开 N8N
   - 点击右上角 "Import"
   - 选择 `n8n-workflow.json`

2. **配置 Google Sheets 节点**（需要手动添加）：

由于工作流中缺少 Google Sheets 读写节点，你需要手动添加以下节点：

#### 节点A：保存/更新对话（连接到"更新历史"之后）
- 类型：Google Sheets
- 操作：Update or Append
- Document：选择你的 Google Sheets
- Sheet：AIDialogues
- 匹配列：dialogueID
- 字段映射：
  - `dialogueID` = `={{$json.dialogueID}}`
  - `userID` = `={{$json.userID}}`
  - `title` = `={{$json.title}}`
  - `tags` = `={{$json.tags}}`
  - `createTime` = `={{$json.createTime}}`
  - `conversationHistory` = `={{$json.conversationHistory}}`
  - `status` = `={{$json.status}}`

#### 节点B：读取对话历史（连接到"追加用户消息"之前）
- 类型：Google Sheets
- 操作：Lookup
- Document：选择你的 Google Sheets
- Sheet：AIDialogues
- 查询条件：
  - `dialogueID` = `={{$json.dialogueID}}`

#### 节点C：读取对话信息（连接到"生成HTML"之前）
- 类型：Google Sheets
- 操作：Lookup
- Document：选择你的 Google Sheets
- Sheet：AIDialogues
- 查询条件：
  - `dialogueID` = `={{$json.dialogueID}}`

#### 节点D：读取收藏图片（连接到"生成HTML"之前）
- 类型：Google Sheets
- 操作：Read
- Document：选择你的 Google Sheets
- Sheet：Favorites（你的收藏表）
- 筛选条件：
  - `userID` = `={{$json.userID}}`
  - `status` = `active`

#### 节点E：保存报告（连接到"格式化报告"之后）
- 类型：Google Sheets
- 操作：Append
- Document：选择你的 Google Sheets
- Sheet：AIReports
- 字段映射：
  - `reportID` = `={{$json.reportID}}`
  - `dialogueID` = `={{$json.dialogueID}}`
  - `userID` = `={{$json.userID}}`
  - `htmlContent` = `={{$json.htmlContent}}`
  - `createTime` = `={{$json.createTime}}`

#### 节点F：读取对话列表（连接到"准备查询"之后）
- 类型：Google Sheets
- 操作：Read
- Document：选择你的 Google Sheets
- Sheet：AIDialogues
- 筛选条件：
  - `userID` = `={{$json.userID}}`
  - `status` = `active`
- 排序：`createTime` 降序

#### 节点G：读取对话详情（连接到"准备详情查询"之后）
- 类型：Google Sheets
- 操作：Lookup
- Document：选择你的 Google Sheets
- Sheet：AIDialogues
- 查询条件：
  - `dialogueID` = `={{$json.dialogueID}}`

3. **激活工作流**：
   - 点击右上角 "Active"
   - 复制 Webhook URL（格式：`https://your-n8n.com/webhook/ai-analysis`）

---

### 步骤3：配置前端

1. 打开 `ai-chat-demo.html`
2. 在调试工具区域修改：
   - **Webhook URL**：粘贴你的 N8N Webhook 地址
   - **User ID**：设置测试用户ID（如 `testCode`）

---

### 步骤4：测试

1. **测试对话功能**：
   - 输入："请帮我分析问界M7的外观"
   - 查看调试日志，确认请求成功
   - 查看 Google Sheets，确认数据已保存

2. **测试历史记录**：
   - 点击左侧对话列表
   - 确认可以切换不同对话

3. **测试报告生成**：
   - 在对话中提到一些标签（如"外观"、"性能"）
   - 点击"生成报告"按钮
   - 查看新窗口中的报告
   - 点击"打印/保存PDF"测试导出功能

---

## 🔧 高级配置

### 接入真实 DeepSeek API

修改工作流中的"调用AI"节点（ID: `call-ai-008`）：

```javascript
// 找到这段代码并替换：
// TODO: 这里接入真实的 DeepSeek API

// 替换为：
const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_DEEPSEEK_API_KEY' // 替换为你的API Key
  },
  body: JSON.stringify({
    model: 'deepseek-chat',
    messages: [
      { 
        role: 'system', 
        content: '你是一个专业的汽车分析师，擅长对比分析不同车型的特点。' 
      },
      ...messages
    ],
    temperature: 0.7
  })
});

const result = await response.json();
const aiReply = result.choices[0].message.content;
```

---

## 📊 数据结构说明

### conversationHistory 格式

```
userSpeak:用户输入内容----AISpeak:AI回复内容----userSpeak:下一条用户输入----AISpeak:下一条AI回复----
```

**解析规则**：
- 使用 `----` 分割
- 每段以 `userSpeak:` 或 `AISpeak:` 开头
- 前端需要解析并显示

**优点**：
- 简单易实现
- 适合 MVP 阶段
- 后期可迁移到专业数据库

---

## 🎨 前端功能说明

### 左侧：对话列表
- 显示所有历史对话
- 点击切换对话
- "新对话"按钮创建新对话

### 中间：聊天区域
- 实时对话
- 乐观更新（用户消息立即显示）
- "生成报告"按钮

### 右侧：调试工具
- 配置 Webhook URL
- 查看请求/响应日志
- 错误提示

---

## 🐛 常见问题

### Q1: 工作流导入失败？
**A**: 工作流中不包含 Google Sheets 节点配置，需要手动添加（见步骤2）。

### Q2: 前端无法连接 N8N？
**A**: 
1. 检查 Webhook URL 是否正确
2. 确认工作流已激活
3. 检查浏览器控制台是否有 CORS 错误（需要配置 N8N CORS）

### Q3: 对话历史不显示？
**A**: 
1. 检查 Google Sheets 中是否有数据
2. 确认 `getDialogueList` API 是否正常返回
3. 查看调试日志

### Q4: 生成报告没有图片？
**A**: 
- 确保 Favorites 表中有对应的车型图片
- 检查 `imageURL` 字段是否正确

---

## 🔄 后续优化方向

1. **DeepSeek API 接入** - 替换模拟 AI 为真实 API
2. **图片识别** - 支持上传车型图片进行多模态分析
3. **数据库迁移** - 从 Google Sheets 迁移到 PostgreSQL/MongoDB
4. **用户系统** - 支持多用户登录和权限管理
5. **报告模板** - 提供多种报告样式
6. **导出功能** - 支持 PDF/Word 直接导出

---

## 📝 开发日志

### 2024-11-01
- ✅ 完成基础工作流设计
- ✅ 实现对话历史存储（conversationHistory 格式）
- ✅ 实现前端调试工具
- ✅ 报告生成功能（HTML 模板）

---

## 📄 License

MIT License

---

## 💡 技术栈

- **后端**: N8N (Workflow Automation)
- **数据库**: Google Sheets (MVP)
- **AI**: DeepSeek API (待接入)
- **前端**: Vanilla JS + HTML + CSS

---

## 🤝 贡献

欢迎提交 Issue 和 PR！

---

**享受你的 AI 对话分析系统！** 🎉

