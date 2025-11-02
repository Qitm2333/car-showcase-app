# 🤖 DeepSeek API 接入指南

本文档详细说明如何将真实的 DeepSeek API 集成到 N8N 工作流中。

---

## 📋 目录

1. [获取 API Key](#1-获取-api-key)
2. [修改工作流](#2-修改工作流)
3. [测试 API](#3-测试-api)
4. [错误处理](#4-错误处理)
5. [成本优化](#5-成本优化)

---

## 1. 获取 API Key

### 步骤1: 注册 DeepSeek 账号

1. 访问 [DeepSeek 官网](https://www.deepseek.com/)
2. 点击"注册"或"登录"
3. 完成账号注册和验证

### 步骤2: 创建 API Key

1. 登录后，进入"控制台"或"API 管理"
2. 点击"创建 API Key"
3. 复制生成的 API Key（格式类似：`sk-xxxxxxxxxxxxx`）
4. **重要**: 妥善保管 API Key，不要泄露

### 步骤3: 充值（如需）

1. 查看定价信息
2. 根据需求充值

---

## 2. 修改工作流

### 方法A: 使用 HTTP Request 节点（推荐）

在 N8N 中，将"调用AI"节点（ID: `call-ai-008`）修改为 HTTP Request 节点：

#### 步骤1: 删除原有的 Code 节点

1. 找到名为"调用AI"的 Code 节点
2. 右键 → Delete

#### 步骤2: 添加 HTTP Request 节点

1. 点击 "+" 添加新节点
2. 搜索 "HTTP Request"
3. 选择并添加

#### 步骤3: 配置 HTTP Request

```yaml
节点名称: 调用DeepSeek API

Authentication: None (使用 Header 认证)

Method: POST

URL: https://api.deepseek.com/v1/chat/completions

Headers:
  - Name: Content-Type
    Value: application/json
  - Name: Authorization
    Value: Bearer sk-your-api-key-here  # 替换为你的API Key

Body Content Type: JSON

Body (JSON):
{
  "model": "deepseek-chat",
  "messages": {{JSON.stringify($json.messages)}},
  "temperature": 0.7,
  "max_tokens": 2000
}
```

#### 步骤4: 准备消息格式

在"调用AI"之前添加一个 Code 节点（命名为"准备AI消息"）：

```javascript
// 解析历史对话
const data = $input.item.json;
const conversationHistory = data.conversationHistory;

const pairs = conversationHistory.split('----').filter(s => s.trim());
const messages = [
  {
    role: 'system',
    content: '你是一个专业的汽车分析师，擅长对比分析不同车型的特点。请用简洁、专业的语言回答用户的问题。'
  }
];

for (const pair of pairs) {
  if (pair.startsWith('userSpeak:')) {
    messages.push({
      role: 'user',
      content: pair.replace('userSpeak:', '')
    });
  } else if (pair.startsWith('AISpeak:')) {
    messages.push({
      role: 'assistant',
      content: pair.replace('AISpeak:', '')
    });
  }
}

return {
  json: {
    ...data,
    messages: messages
  }
};
```

#### 步骤5: 处理 API 响应

在"调用DeepSeek API"之后添加一个 Code 节点（命名为"处理AI响应"）：

```javascript
// 提取 AI 回复
const response = $input.item.json;
const aiReply = response.choices[0].message.content;
const messageID = 'msg_' + Date.now();

return {
  json: {
    ...$('准备AI消息').item(0).json,
    aiReply: aiReply,
    messageID: messageID,
    // 保存API使用信息（可选）
    apiUsage: {
      promptTokens: response.usage.prompt_tokens,
      completionTokens: response.usage.completion_tokens,
      totalTokens: response.usage.total_tokens
    }
  }
};
```

---

### 方法B: 修改现有 Code 节点

如果你想保留 Code 节点，可以直接修改"调用AI"节点的代码：

```javascript
// ========== 调用 DeepSeek API ==========
const data = $input.item.json;
const conversationHistory = data.conversationHistory;

// 解析历史对话
const pairs = conversationHistory.split('----').filter(s => s.trim());
const messages = [
  {
    role: 'system',
    content: '你是一个专业的汽车分析师，擅长对比分析不同车型的特点。请用简洁、专业的语言回答用户的问题。'
  }
];

for (const pair of pairs) {
  if (pair.startsWith('userSpeak:')) {
    messages.push({
      role: 'user',
      content: pair.replace('userSpeak:', '')
    });
  } else if (pair.startsWith('AISpeak:')) {
    messages.push({
      role: 'assistant',
      content: pair.replace('AISpeak:', '')
    });
  }
}

// 调用 DeepSeek API
const DEEPSEEK_API_KEY = 'sk-your-api-key-here'; // ⚠️ 替换为你的API Key

try {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  const aiReply = result.choices[0].message.content;
  const messageID = 'msg_' + Date.now();

  return {
    json: {
      ...data,
      aiReply: aiReply,
      messageID: messageID,
      apiUsage: {
        promptTokens: result.usage.prompt_tokens,
        completionTokens: result.usage.completion_tokens,
        totalTokens: result.usage.total_tokens
      }
    }
  };
} catch (error) {
  // 发生错误时返回友好提示
  console.error('DeepSeek API 调用失败:', error);
  
  return {
    json: {
      ...data,
      aiReply: '抱歉，AI 服务暂时不可用，请稍后再试。',
      messageID: 'msg_' + Date.now(),
      error: error.message
    }
  };
}
```

**⚠️ 安全提示**: 不要将 API Key 硬编码在代码中！建议使用环境变量或 N8N 的凭证管理。

---

### 方法C: 使用 N8N 凭证管理（最佳实践）

#### 步骤1: 创建 DeepSeek 凭证

1. 在 N8N 界面，点击右上角 "Settings"
2. 选择 "Credentials"
3. 点击 "Add Credential"
4. 选择 "HTTP Header Auth"
5. 配置：
   ```yaml
   Name: DeepSeek API Key
   Header Name: Authorization
   Header Value: Bearer sk-your-api-key-here
   ```

#### 步骤2: 在 HTTP Request 节点中使用

```yaml
Authentication: Header Auth
Credential for Header Auth: [选择你刚创建的凭证]
```

这样 API Key 就不会暴露在工作流代码中。

---

## 3. 测试 API

### 测试步骤

1. **准备测试数据**：
   ```json
   {
     "action": "sendMessage",
     "userID": "testCode",
     "content": "请介绍一下问界M7的外观特点"
   }
   ```

2. **触发工作流**：
   - 使用 Postman 或 curl 发送 POST 请求到 Webhook
   - 或使用前端界面发送消息

3. **检查响应**：
   ```json
   {
     "success": true,
     "dialogueID": "dlg_xxx",
     "messageID": "msg_xxx",
     "aiReply": "问界M7的外观设计...",
     "title": "外观分析",
     "extractedTags": ["外观"]
   }
   ```

4. **验证数据存储**：
   - 检查 Google Sheets 中的 AIDialogues 表
   - 确认 conversationHistory 字段已更新

---

## 4. 错误处理

### 常见错误及解决方案

#### 错误1: 401 Unauthorized

```json
{
  "error": {
    "message": "Invalid authentication",
    "type": "invalid_request_error"
  }
}
```

**原因**: API Key 无效或格式错误

**解决**:
1. 检查 API Key 是否正确
2. 确认 Authorization Header 格式：`Bearer sk-xxxxx`
3. 重新生成 API Key

---

#### 错误2: 429 Rate Limit

```json
{
  "error": {
    "message": "Rate limit exceeded",
    "type": "rate_limit_error"
  }
}
```

**原因**: 请求频率超过限制

**解决**:
1. 增加请求间隔
2. 在 N8N 中添加 "Wait" 节点
3. 升级 API 套餐

---

#### 错误3: 500 Internal Server Error

**原因**: DeepSeek 服务器错误

**解决**:
1. 添加重试机制
2. 在 HTTP Request 节点中配置：
   ```yaml
   Options:
     Retry on Fail: true
     Max Retries: 3
     Wait Between Retries: 1000
   ```

---

### 错误处理代码示例

```javascript
// 在 Code 节点中添加完善的错误处理
try {
  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API Error: ${errorData.error.message}`);
  }

  const result = await response.json();
  const aiReply = result.choices[0].message.content;

  return {
    json: {
      ...data,
      aiReply: aiReply,
      messageID: 'msg_' + Date.now()
    }
  };

} catch (error) {
  console.error('DeepSeek API 调用失败:', error);
  
  // 返回友好的错误消息
  let friendlyMessage = '抱歉，AI 服务暂时不可用，请稍后再试。';
  
  if (error.message.includes('Rate limit')) {
    friendlyMessage = '请求过于频繁，请稍后再试。';
  } else if (error.message.includes('Invalid authentication')) {
    friendlyMessage = 'API 认证失败，请联系管理员。';
  }
  
  return {
    json: {
      ...data,
      aiReply: friendlyMessage,
      messageID: 'msg_' + Date.now(),
      error: error.message
    }
  };
}
```

---

## 5. 成本优化

### Token 计费说明

DeepSeek 按 Token 计费：
- **输入 Token**: 用户消息 + 历史对话 + System Prompt
- **输出 Token**: AI 生成的回复

### 优化策略

#### 策略1: 限制历史对话长度

```javascript
// 只保留最近的 N 轮对话
const MAX_HISTORY_PAIRS = 10; // 最多保留10轮对话

const pairs = conversationHistory.split('----').filter(s => s.trim());
const recentPairs = pairs.slice(-MAX_HISTORY_PAIRS * 2); // 每轮2个pair（user+assistant）

// 重新构建消息数组
const messages = [
  { role: 'system', content: '你是一个专业的汽车分析师...' }
];

for (const pair of recentPairs) {
  // ... 处理消息
}
```

#### 策略2: 压缩 System Prompt

```javascript
// 简化 System Prompt，减少不必要的描述
const messages = [
  {
    role: 'system',
    content: '你是汽车分析师，简洁回答。' // 从50字压缩到12字
  }
];
```

#### 策略3: 设置 max_tokens

```javascript
// 限制 AI 回复的最大长度
{
  model: 'deepseek-chat',
  messages: messages,
  max_tokens: 500, // 根据实际需求调整
  temperature: 0.7
}
```

#### 策略4: 使用流式响应（可选）

```javascript
// 启用流式响应，提升用户体验
{
  model: 'deepseek-chat',
  messages: messages,
  stream: true // 需要前端配合处理
}
```

---

## 📊 监控和日志

### 添加使用监控

在"处理AI响应"节点中保存 Token 使用情况：

```javascript
// 保存到 Google Sheets（可选）
const usage = {
  timestamp: new Date().toISOString(),
  dialogueID: data.dialogueID,
  promptTokens: response.usage.prompt_tokens,
  completionTokens: response.usage.completion_tokens,
  totalTokens: response.usage.total_tokens,
  cost: (response.usage.total_tokens / 1000) * 0.001 // 假设价格
};

// 可以保存到单独的 APIUsage 表
```

---

## ✅ 配置完成检查清单

- [ ] DeepSeek API Key 已获取
- [ ] API Key 已安全存储（使用凭证管理）
- [ ] "调用AI"节点已更新
- [ ] 错误处理已添加
- [ ] 测试消息发送成功
- [ ] AI 回复正常
- [ ] 历史对话上下文正确
- [ ] Token 使用已监控

---

## 🎯 下一步

1. 测试更复杂的对话场景
2. 优化 System Prompt，提升回复质量
3. 实现报告生成的 AI 增强
4. 添加多模态支持（图片识别）

---

**祝接入顺利！** 🚀

